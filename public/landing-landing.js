// public/landing-landing.js
// JS משותף לדפי הנחיתה של Bereshit Spa
// שימוש ב-create-booking-session מ-server.js

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ======================
   i18n – טקסטים כלליים
   ====================== */

const STRINGS = {
  he: {
    'landing.hero.eyebrow': 'Bereshit Spa · Batumi',
    'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle': 'בחר/י טיפול, קבע/י שעה נוחה ושלם/י אונליין בתשלום מאובטח.',
    'landing.hero.cta': 'לבחירת טיפול והזמנה',

    'landing.treatments.title': 'תבחר/י את הטיפול שמתאים לך',
    'landing.treatments.subtitle': 'אפשר לשלב טיפולים שונים לביקורים חוזרים, לבוא לבד או כזוג.',

    'landing.booking.name': 'שם מלא',
    'landing.booking.phone': 'טלפון ליצירת קשר (WhatsApp)',
    'landing.booking.date': 'תאריך טיפול',
    'landing.booking.time': 'שעת טיפול',
    'landing.booking.duration': 'משך הטיפול',
    'landing.booking.notes': 'העדפות / הערות (אופציונלי)',
    'landing.booking.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. לאחר התשלום תקבל/י אישור הזמנה.',
    'landing.booking.payCta': 'מעבר לתשלום מאובטח',

    // כרטיסייה
    'card.hero.eyebrow': 'Special Offer · Bereshit Spa',
    'card.hero.title': 'כרטיסייה של 7 טיפולים מפנקים',
    'card.hero.subtitle': 'משלמים פעם אחת ונהנים מ-7 טיפולים לבחירה – לבד, כזוג או עם חברים.',
    'card.hero.cta': 'לרכישת כרטיסייה עכשיו',

    'card.details.title': 'מה כולל הכרטיסייה?',
    'card.details.li1': '7 טיפולים לבחירה מתוך תפריט הטיפולים (ראש, פנים, גב, גוף, פוט מסאז׳).',
    'card.details.li2': 'ניתן לחלוק את הכרטיסייה בין בני זוג/משפחה/חברים.',
    'card.details.li3': 'תוקף – 6 חודשים מיום הרכישה.',
    'card.details.li4': 'תיאום תורים מראש בווטסאפ או טלפון.',
    'card.details.note': 'לאחר הרכישה הכרטיסייה תירשם על שמך במערכת ותוכל/י לקבוע תורים בנוחות.',

    'card.form.title': 'רכישת כרטיסיית טיפולים',
    'card.form.name': 'שם בעל/ת הכרטיסייה',
    'card.form.phone': 'טלפון / WhatsApp',
    'card.form.startDate': 'תאריך התחלה מועדף (אופציונלי)',
    'card.form.notes': 'הערות / שמות נוספים בכרטיסייה',
    'card.form.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe.',
    'card.form.payCta': 'מעבר לתשלום מאובטח',

    // סטטוס תשלום
    'status.success.title': 'התשלום התקבל בהצלחה',
    'status.success.text': 'ההזמנה נקלטה במערכת שלנו. ניצור איתך קשר לאישור סופי ותיאום הטיפול.',
    'status.success.back': 'חזרה לאתר',
    'status.cancel.title': 'התשלום בוטל',
    'status.cancel.text': 'לא בוצע חיוב. אפשר לנסות שוב, או ליצור איתנו קשר לטיפול ידני.',
    'status.cancel.back': 'חזרה לדף הקודם'
  },

  // תרגומים קצרים – אפשר לשפר אחר כך
  en: {
    'landing.hero.eyebrow': 'Bereshit Spa · Batumi',
    'landing.hero.title': 'Japanese Head Spa & Thai Massage',
    'landing.hero.subtitle': 'Choose your treatment, pick a time and pay safely online.',
    'landing.hero.cta': 'Choose treatment & book',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle': 'You can mix different treatments and come alone or as a couple.',

    'landing.booking.name': 'Full name',
    'landing.booking.phone': 'Phone / WhatsApp',
    'landing.booking.date': 'Treatment date',
    'landing.booking.time': 'Time',
    'landing.booking.duration': 'Duration',
    'landing.booking.notes': 'Notes / preferences (optional)',
    'landing.booking.note': 'Payment is processed securely with Stripe. You will get booking confirmation after payment.',
    'landing.booking.payCta': 'Proceed to secure payment',

    'card.hero.eyebrow': 'Special Offer',
    'card.hero.title': '7-Treatment Spa Card',
    'card.hero.subtitle': 'Pay once and enjoy 7 visits – for you, your partner or friends.',
    'card.hero.cta': 'Buy the card now',

    'card.details.title': 'What is included?',
    'card.details.li1': '7 treatments from the full menu (head spa, face, back, body, foot).',
    'card.details.li2': 'Can be shared with partner / family / friends.',
    'card.details.li3': 'Valid for 6 months from purchase.',
    'card.details.li4': 'Booking by WhatsApp or phone in advance.',
    'card.details.note': 'After payment your card will be registered in our system under your name.',

    'card.form.title': 'Buy a treatment card',
    'card.form.name': 'Card holder name',
    'card.form.phone': 'Phone / WhatsApp',
    'card.form.startDate': 'Preferred start date (optional)',
    'card.form.notes': 'Notes / additional names',
    'card.form.note': 'Payment is processed securely with Stripe.',
    'card.form.payCta': 'Proceed to secure payment',

    'status.success.title': 'Payment successful',
    'status.success.text': 'Your booking has been received. We will contact you to confirm the exact time.',
    'status.success.back': 'Back to site',
    'status.cancel.title': 'Payment cancelled',
    'status.cancel.text': 'No charge has been made. You can try again or contact us directly.',
    'status.cancel.back': 'Back'
  },

  ru: {
    'landing.hero.title': 'Спа для головы и тайский массаж',
    'landing.hero.cta': 'Выбрать процедуру и записаться',
    'status.success.title': 'Оплата прошла успешно',
    'status.cancel.title': 'Оплата отменена'
  },

  ka: {
    'landing.hero.title': 'თმის სპა და ტაილანდური მასაჟი ბათუმში',
    'landing.hero.cta': 'აირჩიე პროცედურა და დაჯავშნე',
    'status.success.title': 'გადახდა წარმატებით შესრულდა',
    'status.cancel.title': 'გადახდა გაუქმდა'
  }
};

function getLang() {
  const stored = localStorage.getItem('landing_lang');
  if (stored) return stored;
  const nav = (navigator.language || 'he').slice(0,2).toLowerCase();
  return ['he','en','ru','ka'].includes(nav) ? nav : 'he';
}

function setLang(lang) {
  if (!['he','en','ru','ka'].includes(lang)) lang = 'he';
  localStorage.setItem('landing_lang', lang);
  applyTranslations(lang);
  // עדכון מצב כפתורים
  $$('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function t(key, lang = getLang()) {
  return STRINGS[lang]?.[key] || STRINGS.he[key] || '';
}

function applyTranslations(lang = getLang()) {
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!key) return;
    const text = t(key, lang);
    if (!text) return;
    if ('placeholder' in el && el.tagName === 'INPUT') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });
}

/* ======================
   מיפוי טיפולים + מחירים
   ====================== */

const TREATMENTS = {
  'head-spa': {
    name: '👑 ספא ראש יפני',
    options: [
      { id: '60', label: '60 דק׳', price: 200 },
      { id: '90', label: '90 דק׳', price: 250 }
    ]
  },
  'facial-thai-compress': {
    name: '🌼 עיסוי פנים בקומפרסים תאילנדים',
    options: [{ id: '60', label: '60 דק׳', price: 150 }]
  },
  'facial-hot-stone': {
    name: '🔥 עיסוי פנים באבנים חמות',
    options: [{ id: '60', label: '60 דק׳', price: 160 }]
  },
  'facial-thai': {
    name: '🌺 עיסוי פנים תאילנדי מסורתי',
    options: [
      { id: '30', label: '30 דק׳', price: 90 },
      { id: '60', label: '60 דק׳', price: 150 }
    ]
  },
  'facial-aroma': {
    name: '🌿 עיסוי פנים ארומתרפי',
    options: [
      { id: '30', label: '30 דק׳', price: 80 },
      { id: '60', label: '60 דק׳', price: 140 }
    ]
  },
  'back-basic': {
    name: '💆‍♂️ עיסוי גב–כתפיים–צוואר',
    options: [{ id: '60', label: '60 דק׳', price: 150 }]
  },
  'back-hot-stone': {
    name: '🔥 גב–כתפיים–צוואר עם אבנים חמות',
    options: [{ id: '60', label: '60 דק׳', price: 180 }]
  },
  'body-thai': {
    name: '🇹🇭 עיסוי תאילנדי מסורתי',
    options: [
      { id: '60', label: '60 דק׳', price: 170 },
      { id: '90', label: '90 דק׳', price: 220 }
    ]
  },
  'body-thai-oil': {
    name: '🇹🇭 Thai Oil Massage',
    options: [
      { id: '60', label: '60 דק׳', price: 180 },
      { id: '90', label: '90 דק׳', price: 230 }
    ]
  },
  'body-aroma': {
    name: '🌿 Aromatherapy Oil Massage',
    options: [{ id: '60', label: '60 דק׳', price: 190 }]
  },
  'body-thai-ther': {
    name: '🇹🇭 Thai Therapeutic Massage',
    options: [
      { id: '60', label: '60 דק׳', price: 230 },
      { id: '90', label: '90 דק׳', price: 280 }
    ]
  },
  'body-hot-stone': {
    name: '🔥 Hot Stone Massage',
    options: [{ id: '60', label: '60 דק׳', price: 210 }]
  },
  'body-thai-comp': {
    name: '🌼 Thai Herbal Compress Massage – גוף',
    options: [
      { id: '60', label: '60 דק׳', price: 220 },
      { id: '90', label: '90 דק׳', price: 260 }
    ]
  },
  'body-shiatsu': {
    name: '🇯🇵 Shiatsu Massage',
    options: [
      { id: '60', label: '60 דק׳', price: 180 },
      { id: '90', label: '90 דק׳', price: 230 }
    ]
  },
  'foot-massage': {
    name: '🦶 פוט מסאז׳ – כפות רגליים',
    options: [
      { id: '30', label: '30 דק׳', price: 80 },
      { id: '60', label: '60 דק׳', price: 120 }
    ]
  }
};

// כרטיסיות/מבצעים – דוגמה לכרטיסייה אחת
const CARD_OFFERS = {
  card7: {
    name: 'כרטיסייה של 7 טיפולים',
    price: 1200 // <-- לשנות למחיר הסופי שתרצה ב־₾
  }
};

/* ======================
   הזמנת טיפול – מודאל
   ====================== */

function initTreatmentBooking() {
  const modal = $('#bookingModal');
  if (!modal) return; // הדף הנוכחי אינו דף טיפולים

  const summaryEl = $('#bookingSummary');
  const durationsWrap = $('#bookingDurations');
  const form = $('#bookingForm');

  let currentKey = null;
  let currentOptions = [];

  // פתיחת מודאל
  $$('[data-book-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.treatmentKey;
      const radioGroup = btn.dataset.radioGroup;
      if (!key || !TREATMENTS[key]) return;

      currentKey = key;
      const treatment = TREATMENTS[key];
      currentOptions = treatment.options;

      // קביעת משך שנבחר מראש מהכפתור (אם יש רדיואים בקארד)
      let selectedId = treatment.options[0].id;
      if (radioGroup) {
        const checked = $(`input[name="${radioGroup}"]:checked`);
        if (checked) selectedId = checked.value;
      }

      $('#bookingTitle').textContent = treatment.name;
      if (summaryEl) {
        summaryEl.innerHTML = `${treatment.name} · <span>${getPriceLabel(treatment, selectedId)}</span>`;
      }

      // בניית כפתורי משך
      durationsWrap.innerHTML = '';
      treatment.options.forEach(opt => {
        const id = `dur-${key}-${opt.id}`;
        const label = document.createElement('label');
        label.className = 'duration-chip';
        label.innerHTML = `
          <input type="radio" name="booking-duration" value="${opt.id}" ${opt.id === selectedId ? 'checked' : ''}>
          <span>${opt.label} · ${opt.price}₾</span>
        `;
        durationsWrap.appendChild(label);
      });

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden','false');
    });
  });

  // סגירה
  $$('[data-booking-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }

  // שליחת טופס -> קריאה לשרת /create-booking-session
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentKey || !TREATMENTS[currentKey]) return;

    const treatment = TREATMENTS[currentKey];
    const formData = new FormData(form);

    const durId = formData.get('booking-duration') || treatment.options[0].id;
    const durOpt = treatment.options.find(o => String(o.id) === String(durId)) || treatment.options[0];

    const payload = {
      treatment: treatment.name,
      duration: durOpt.label,
      finalPrice: durOpt.price,
      basePrice: durOpt.price,
      addonPrice: 0,
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      date: formData.get('date') || '',
      time: formData.get('time') || '',
      notes: formData.get('notes') || ''
    };

    try {
      const res = await fetch('/create-booking-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        alert('שגיאה ביצירת תשלום. נסה/י שוב או צרו קשר בווטסאפ.');
        console.error('Booking error', data);
      }
    } catch (err) {
      console.error(err);
      alert('לא הצלחנו להתחבר לשרת. בדוק/י חיבור או נסה/י מאוחר יותר.');
    }
  });

  function getPriceLabel(treatment, id) {
    const opt = treatment.options.find(o => String(o.id) === String(id)) || treatment.options[0];
    return `${opt.label} · ${opt.price}₾`;
  }
}

/* ======================
   כרטיסייה – מודאל ותשלום
   ====================== */

function initCardBooking() {
  const modal = $('#cardBookingModal');
  if (!modal) return; // לא בדף כרטיסייה

  const summaryEl = $('#cardBookingSummary');
  const form = $('#cardBookingForm');
  const priceText = $('#cardPriceText');

  let currentKey = null;

  // מציג מחיר בכרטיסייה בדף עצמו
  const card = CARD_OFFERS.card7;
  if (card && priceText) {
    priceText.textContent = `מחיר כרטיסייה: ${card.price}₾ (כולל 7 טיפולים)`;
  }

  $$('[data-card-book-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.cardKey;
      if (!key || !CARD_OFFERS[key]) return;
      currentKey = key;
      const offer = CARD_OFFERS[key];
      $('#cardBookingTitle').textContent = offer.name;
      if (summaryEl) {
        summaryEl.textContent = `${offer.name} – ${offer.price}₾`;
      }
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden','false');
    });
  });

  $$('[data-card-booking-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentKey || !CARD_OFFERS[currentKey]) return;

    const offer = CARD_OFFERS[currentKey];
    const formData = new FormData(form);

    const payload = {
      treatment: offer.name,
      duration: 'כרטיסייה',
      finalPrice: offer.price,
      basePrice: offer.price,
      addonPrice: 0,
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      date: formData.get('date') || '',
      time: '',
      notes: formData.get('notes') || ''
    };

    try {
      const res = await fetch('/create-booking-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        alert('שגיאה ביצירת תשלום. נסה/י שוב או צרו קשר בווטסאפ.');
        console.error('Card booking error', data);
      }
    } catch (err) {
      console.error(err);
      alert('לא הצלחנו להתחבר לשרת. בדוק/י חיבור או נסה/י מאוחר יותר.');
    }
  });
}

/* ======================
   הפעלה
   ====================== */

document.addEventListener('DOMContentLoaded', () => {
  // i18n
  applyTranslations();
  setLang(getLang());
  $$('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // הזמנת טיפולים
  initTreatmentBooking();

  // כרטיסייה
  initCardBooking();
});
