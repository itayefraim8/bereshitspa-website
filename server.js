// server/server.js
import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ✅ חשוב לפרוקסי/Load Balancer (כדי ש-req.protocol ו-X-Forwarded-* יעבדו נכון)
app.set('trust proxy', 1);

// סטטיק: אם יש 'public' בתוך server נגיש משם; אחרת ../public
const staticDir = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : path.join(__dirname, '..', 'public');

app.use(express.static(staticDir));

// ===== Stripe Setup =====
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY) : null;

// דומיין בסיסי ברירת מחדל. יוחלף דינמית אם לא מוגדר .env (ראה getDomain)
const DOMAIN = process.env.PUBLIC_DOMAIN || 'http://localhost:4242';
const CURRENCY = (process.env.CURRENCY || 'ils').toLowerCase();

if (!stripe) {
  console.warn('[WARN] STRIPE_SECRET_KEY לא הוגדר. השרת יעבוד במצב דמו (ללא סליקה).');
} else {
  const isTest = STRIPE_KEY.startsWith('sk_test_');
  console.log(`[Stripe] מצב ${isTest ? 'TEST' : 'LIVE'} • מטבע: ${CURRENCY}`);
}

// ✅ חישוב דינמי של הדומיין אם אין PUBLIC_DOMAIN (עוזר בפרודקשן מאחורי פרוקסי)
function getDomain(req) {
  // עדיפות ל-PUBLIC_DOMAIN אם הוגדר
  if (process.env.PUBLIC_DOMAIN) return process.env.PUBLIC_DOMAIN;

  // אם יש Origin (קריאה מהדפדפן)
  const origin = req.headers.origin;
  if (origin && /^https?:\/\//i.test(origin)) return origin.replace(/\/+$/, '');

  // חישוב ידני מ-proto/host
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toString();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || 'localhost:4242').toString();
  return `${proto}://${host}`;
}

// ===== מוצרים לדוגמה (עדכן לשמות/מחירים שלך) =====
// amount באגורות (ש"ח * 100) / לַרי * 100 – תלוי במטבע ב־CURRENCY
const PRODUCTS = [
  { id:'PROD-1',  name:'סרום חומצה היאלורונית 30ml', amount:11900 },
  { id:'PROD-2',  name:'קרם לילה רטינול 50ml',       amount:16900 },
  { id:'PROD-3',  name:'שמן ורדים 15ml',             amount: 8900 },
  { id:'PROD-4',  name:'מסכת חימר ירוק 75ml',        amount: 9900 },
  { id:'PROD-5',  name:'קרם עיניים 15ml',            amount:13900 },
  { id:'PROD-6',  name:'סרום ויטמין C 30ml',         amount:15900 },
  { id:'PROD-7',  name:'קרם לחות היאלורוני 50ml',    amount:14900 },
  { id:'PROD-8',  name:'גליל ג׳ייד לעיסוי פנים',     amount: 7900 },
  { id:'PROD-9',  name:'מסכת לחות היידרה 75ml',      amount:10900 },
  { id:'PROD-10', name:'טונר מרענן 200ml',            amount: 6900 },
  { id:'PROD-11', name:'מגן שמש SPF50 50ml',          amount:12900 },
  { id:'PROD-12', name:'פילינג עדין אנזימטי 75ml',   amount:11900 },
  { id:'PROD-13', name:'קיט טיפוח בסיסי (3 פריטים)', amount:24900 },
  { id:'PROD-14', name:'סרום ניאצינמיד 30ml',        amount:12900 },
  { id:'PROD-15', name:'גואשה מאבן ורודה',           amount: 6900 }
];

function mapCartToLineItems(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error('Cart is empty or invalid');
  }
  return cart.map(row => {
    const p = PRODUCTS.find(x => x.id === row.id);
    if (!p) throw new Error(`Unknown product id: ${row.id}`);
    const qty = Math.max(1, Number(row.qty || 1));
    return {
      price_data: {
        currency: CURRENCY,
        unit_amount: p.amount,
        product_data: { name: p.name }
      },
      quantity: qty
    };
  });
}

// ===== Routes =====

// יצירת Session לתשלום (Stripe Checkout) או הפניה דמו אם אין מפתח
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart = [], customerInfo = {} } = req.body || {};

    // אם אין מפתח Stripe — מצב דמו: מחזירים קישור הצלחה ישיר
    if (!stripe) {
      const demoDomain = getDomain(req) || DOMAIN;
      return res.json({
        id: 'demo_session',
        url: `${demoDomain}/success.html?session_id=demo`
      });
    }

    const line_items = mapCartToLineItems(cart);

    // ✅ דומיין דינמי לפי הבקשה (או מה-ENV אם הוגדר)
    const domain = getDomain(req) || DOMAIN;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'required',

      // מדינות מותרות לכתובת משלוח
      shipping_address_collection: { allowed_countries: ['IL', 'GE'] },

      // אפשרויות משלוח
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'איסוף עצמי',
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: CURRENCY },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 }
            }
          }
        },
        {
          shipping_rate_data: {
            display_name: 'שליח עד הבית',
            type: 'fixed_amount',
            fixed_amount: { amount: 2500, currency: CURRENCY }, // 25.00 ₾
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 7 }
            }
          }
        }
      ],

      line_items,

      // מידע עזר
      metadata: {
        customer_name: customerInfo.name || '',
        customer_phone: customerInfo.phone || '',
        pickup_notes: customerInfo.pickupNotes || ''
      },

      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('[create-checkout-session] Error:', err);
    res.status(400).json({ error: { message: err.message } });
  }
});

/* ===== ✅ נתיב חדש: יצירת Session לעיסויי ספא (booking) ===== */
app.post('/create-booking-session', async (req, res) => {
  try {
    const {
      treatment,
      finalPrice,
      name,
      phone,
      date,
      time,
      notes,
      duration,
      basePrice,
      addonPrice
    } = req.body || {};

    // אם אין Stripe – מצב דמו
    if (!stripe) {
      const demoDomain = getDomain(req) || DOMAIN;
      return res.json({
        id: 'demo_booking_session',
        url: `${demoDomain}/success.html?session_id=demo_booking`
      });
    }

    const amountNumber = Number(finalPrice || 0);
    if (!treatment || !amountNumber || amountNumber <= 0) {
      return res.status(400).json({ error: { message: 'Missing treatment or finalPrice' } });
    }

    const domain = getDomain(req) || DOMAIN;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: Math.round(amountNumber * 100),
            product_data: {
              name: treatment,
              description: `Client: ${name || ''}, Phone: ${phone || ''}, Date: ${date || ''} ${time || ''}`
            }
          },
          quantity: 1
        }
      ],
      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`,
      metadata: {
        type: 'treatment_booking',
        treatment: treatment || '',
        duration: duration || '',
        basePrice: String(basePrice ?? ''),
        addonPrice: String(addonPrice ?? ''),
        finalPrice: String(amountNumber),
        name: name || '',
        phone: phone || '',
        date: date || '',
        time: time || '',
        notes: notes || ''
      }
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('[create-booking-session] Error:', err);
    res.status(400).json({ error: { message: err.message } });
  }
});

/* ===== ✅ נתיב: שליפת פרטי Session לפי query (?session_id=) ===== */
app.get('/session', async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: { message: 'Missing session_id' } });
    }

    // מצב דמו – אין Stripe
    if (!stripe) {
      return res.json({
        session: {
          id: session_id,
          currency: CURRENCY,
          amount_total: null,
          metadata: {}
        }
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id.toString(), {
      expand: ['payment_intent']
    });

    res.json({ session });
  } catch (err) {
    console.error('[GET /session] Error:', err);
    res.status(400).json({ error: { message: err.message } });
  }
});

/* ===== ✅ נתיב חדש: שליפת Session לפי /checkout-session/:id  ===== */
/* זה מה ש-success.html שלך קורא אליו: fetch('/checkout-session/' + sessionId) */
app.get('/checkout-session/:id', async (req, res) => {
  try {
    const session_id = req.params.id;

    if (!session_id) {
      return res.status(400).json({ error: { message: 'Missing session_id' } });
    }

    // מצב דמו – אין Stripe
    if (!stripe) {
      return res.json({
        session: {
          id: session_id,
          currency: CURRENCY,
          amount_total: null,
          metadata: {}
        }
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id.toString(), {
      expand: ['payment_intent']
    });

    res.json({ session });
  } catch (err) {
    console.error('[GET /checkout-session/:id] Error:', err);
    res.status(400).json({ error: { message: err.message } });
  }
});

// בדיקת חיים
app.get('/health', (_, res) => res.json({ ok: true }));

// ===== Start Server =====
const PORT = Number(process.env.PORT || 4242);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Serving static from: ${staticDir}`);
  console.log(`Base DOMAIN (env or default): ${DOMAIN}`);
});
