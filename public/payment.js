// public/payment.js

// ===== קונפיגורציה =====
const API_BASE = 'http://localhost:4242'; // השרת של Express (npm run dev)
const ILS = n => `${Number(n).toFixed(2)} ₾`;

// מוצרי השרת (תואם ל-server.js)
const PRODUCTS = {
  'serum-anti-aging': { name: 'סרום אנטי-אייג׳ינג 30ml', price: 129.00 },
  'face-cream':       { name: 'קרם פנים טבעי 50ml',      price:  99.00 },
  'massage-stone':    { name: 'טיפול באבנים חמות — קופון', price: 179.00 }
};

// מיפוי SKU מהאתר הראשי -> מזהי השרת
// מיפוי SKU -> מזהה מוצר בצד השרת (זהה כדי למנוע טעויות)
const SKU_TO_SERVER_ID = {
  'PROD-1':  'PROD-1',  // סרום חומצה היאלורונית 30ml – ₾119
  'PROD-2':  'PROD-2',  // קרם לילה רטינול 50ml – ₾169
  'PROD-3':  'PROD-3',  // שמן ורדים 15ml – ₾89
  'PROD-4':  'PROD-4',  // מסכת חימר ירוק 75ml – ₾99
  'PROD-5':  'PROD-5',  // קרם עיניים 15ml – ₾139
  'PROD-6':  'PROD-6',  // סרום ויטמין C 30ml – ₾159
  'PROD-7':  'PROD-7',  // קרם לחות היאלורוני 50ml – ₾149
  'PROD-8':  'PROD-8',  // גליל ג׳ייד – ₾79
  'PROD-9':  'PROD-9',  // מסכת לחות היידרה 75ml – ₾109
  'PROD-10': 'PROD-10', // טונר מרענן 200ml – ₾69
  'PROD-11': 'PROD-11', // מגן שמש SPF50 50ml – ₾129
  'PROD-12': 'PROD-12', // פילינג אנזימטי 75ml – ₾119
  'PROD-13': 'PROD-13', // קיט טיפוח בסיסי – ₾249
  'PROD-14': 'PROD-14', // סרום ניאצינמיד 30ml – ₾129
  'PROD-15': 'PROD-15'  // גואשה – ₾69
};


const LS_KEY = 'bergamot_cart';

// קורא את העגלה מ-localStorage של האתר הראשי וממיר לפורמט השרת
function readCartFromLocalStorage() {
  try {
    const arr = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    return arr
      .map(item => {
        const id = SKU_TO_SERVER_ID[item.sku];
        const qty = Math.max(1, Number(item.qty || 1));
        return id ? { id, qty } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

// מצב עגלה (בפורמט השרת)
let cart = readCartFromLocalStorage();

// אלמנטים
const productsEl = document.getElementById('products');
const subtotalEl = document.getElementById('subtotal');
const payBtn = document.getElementById('payBtn');
const errEl = document.getElementById('err');

// רנדר סל
function renderCart() {
  if (!cart.length) {
    productsEl.innerHTML = '<span class="muted">העגלה ריקה (מהאתר הראשי). הוסיפו מוצרים מהחנות.</span>';
    subtotalEl.textContent = ILS(0);
    payBtn.disabled = true;
    return;
  }
  payBtn.disabled = false;

  const html = cart.map(row => {
    const p = PRODUCTS[row.id];
    const line = (p.price * row.qty).toFixed(2);
    return `<span class="pill" title="${p.name}">${p.name} × ${row.qty} — ${line} ₾</span>`;
  }).join('');
  productsEl.innerHTML = html;

  const subtotal = cart.reduce((sum, r) => sum + (PRODUCTS[r.id]?.price || 0) * r.qty, 0);
  subtotalEl.textContent = ILS(subtotal);
}
renderCart();

// יצירת Session של Stripe והפניה לעמוד התשלום
async function createCheckout() {
  errEl.style.display = 'none';

  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!cart.length) {
    errEl.textContent = 'העגלה ריקה.';
    errEl.style.display = 'block';
    return;
  }
  if (!name || !phone) {
    errEl.textContent = 'נא למלא שם וטלפון.';
    errEl.style.display = 'block';
    return;
  }

  payBtn.disabled = true;
  const prevText = payBtn.textContent;
  payBtn.textContent = 'מפנה לדף תשלום…';

  try {
    const res = await fetch(`${API_BASE}/create-checkout-session`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        cart, // [{id, qty}, ...]
        customerInfo: { name, phone, pickupNotes: notes }
      })
    });

    const raw = await res.text();
    let data = {};
    try { data = JSON.parse(raw); } catch {}

    if (!res.ok) {
      throw new Error(data?.error?.message || `שגיאה בצד שרת (${res.status})`);
    }

    if (data?.url) {
      window.location.href = data.url; // מעבר ל-Stripe Checkout
    } else {
      throw new Error('לא התקבלה כתובת תשלום מהשרת.');
    }
  } catch (e) {
    errEl.textContent = e.message || 'שגיאה לא צפויה';
    errEl.style.display = 'block';
    payBtn.disabled = false;
    payBtn.textContent = prevText;
  }
}

payBtn.addEventListener('click', createCheckout);

// עזרת דיבוג קלה
console.log('payment.js loaded. origin=', location.origin, 'cart=', cart);
