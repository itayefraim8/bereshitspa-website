// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כפתור וואטסאפ צף + Video Slider + Signature Slider (price + WA booking)

const WHATSAPP_NUMBER = '972502686862';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const SUPPORTED_LANGS = new Set(['he', 'en', 'ru', 'ka']);

// ===== עזרי שפה =====
function getLang() {
  const stored = localStorage.getItem('site_lang');
  if (stored && SUPPORTED_LANGS.has(stored.slice(0, 2))) return stored.slice(0, 2);

  // ✅ ברירת מחדל: עברית
  return 'he';
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.has(lang)) lang = 'he';
  localStorage.setItem('site_lang', lang);
  applyLang(lang);
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';

  applyTranslations(lang);
  applyTreatmentTexts(lang);
  applySignatureTexts(lang);          // ✅ NEW: signature slider texts + prices
  applyDurationLabels(lang);
  applyWhatsAppFloatLink(lang);
}

// ===== מילון טקסטים =====
const LOCAL_STRINGS = {
  he: {
    'landing.page.title': 'Bereshit Spa – דף נחיתה טיפולים',

    // hero
    'landing.hero.eyebrow': 'ספא ראש יפני ועיסוי תאילנדי – בטומי',
    'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle': 'בחר/י טיפול, קבע/י שעה נוחה ותאם/י את ההזמנה בקלות בווטסאפ או בטלפון – הכול בדף אחד.',
    'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle': 'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',
    'landing.treatment.book': 'להזמנת הטיפול',

    // section headings
    'landing.section.face.title': '✨ עיסויי פנים',
    'landing.section.back.title': '💆‍♂️ עיסוי גב – כתפיים – צוואר',
    'landing.section.body.title': '🧘‍♂️ עיסוי גוף מלא',
    'landing.section.body.subtitle': 'הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
    'landing.section.foot.title': '🦶 טיפולי כפות רגליים',

    // booking modal (נשאר לעתיד)
    'landing.booking.title': 'הזמנת טיפול',
    'landing.booking.summary': 'נא לבחור טיפול מהדף, ואז למלא פרטי קשר ותאריך.',
    'landing.booking.name': 'שם מלא',
    'landing.booking.phone': 'טלפון ליצירת קשר (WhatsApp)',
    'landing.booking.date': 'תאריך טיפול',
    'landing.booking.time': 'שעת טיפול',
    'landing.booking.chooseTime': 'בחר/י שעה',
    'landing.booking.duration': 'משך הטיפול',
    'landing.booking.notes': 'העדפות / הערות (אופציונלי)',
    'landing.booking.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. אישור הזמנה יישלח אליך אוטומטית.',
    'landing.booking.payCta': 'מעבר לתשלום מאובטח',
  },

  en: {
    'landing.page.title': 'Bereshit Spa – Treatments Landing Page',

    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title': 'Japanese Head Spa & Thai Body Massages – Boutique Level',
    'landing.hero.subtitle': 'Choose your treatment, pick a time, and confirm easily via WhatsApp or phone – all in one page.',
    'landing.hero.cta': 'Choose treatment & book now',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle': 'All treatments are done by professional Thai therapists, in a quiet atmosphere with relaxing music.',
    'landing.treatment.book': 'Book this treatment',

    'landing.section.face.title': '✨ Facial Treatments',
    'landing.section.back.title': '💆‍♂️ Back–Neck–Shoulders',
    'landing.section.body.title': '🧘‍♂️ Full Body Massage',
    'landing.section.body.subtitle': 'This is a full-body treatment and also includes a gentle face massage.',
    'landing.section.foot.title': '🦶 Foot Treatments',

    'landing.booking.title': 'Treatment booking',
    'landing.booking.summary': 'Please select a treatment from the page, then fill in your contact details and date.',
    'landing.booking.name': 'Full name',
    'landing.booking.phone': 'Phone / WhatsApp',
    'landing.booking.date': 'Treatment date',
    'landing.booking.time': 'Treatment time',
    'landing.booking.chooseTime': 'Choose time',
    'landing.booking.duration': 'Treatment duration',
    'landing.booking.notes': 'Preferences / notes (optional)',
    'landing.booking.note': 'Payment is processed via secure Stripe credit card. A confirmation will be sent automatically.',
    'landing.booking.payCta': 'Proceed to secure payment',
  },

  ru: {
    'landing.page.title': 'Bereshit Spa — Лендинг процедур',

    'landing.hero.eyebrow': 'Японский Head Spa и тайский массаж — Батуми',
    'landing.hero.title': 'Японский Head Spa и тайский массаж тела в формате бутика',
    'landing.hero.subtitle': 'Выберите процедуру, удобное время и подтвердите запись через WhatsApp или по телефону — всё на одной странице.',
    'landing.hero.cta': 'Выбрать процедуру и записаться',

    'landing.treatments.title': 'Выберите процедуру',
    'landing.treatments.subtitle': 'Все процедуры выполняют профессиональные мастера из Таиланда, в тихой атмосфере и под расслабляющую музыку.',
    'landing.treatment.book': 'Записаться на процедуру',

    'landing.section.face.title': '✨ Процедуры для лица',
    'landing.section.back.title': '💆‍♂️ Спина–шея–плечи',
    'landing.section.body.title': '🧘‍♂️ Массаж всего тела',
    'landing.section.body.subtitle': 'Процедура выполняется как массаж всего тела и также включает мягкий массаж лица.',
    'landing.section.foot.title': '🦶 Процедуры для стоп',

    'landing.booking.title': 'Бронирование процедуры',
    'landing.booking.summary': 'Пожалуйста, выберите процедуру на странице и заполните контакты и дату.',
    'landing.booking.name': 'Полное имя',
    'landing.booking.phone': 'Телефон / WhatsApp',
    'landing.booking.date': 'Дата процедуры',
    'landing.booking.time': 'Время процедуры',
    'landing.booking.chooseTime': 'Выберите время',
    'landing.booking.duration': 'Длительность процедуры',
    'landing.booking.notes': 'Пожелания / примечания (необязательно)',
    'landing.booking.note': 'Оплата проводится банковской картой через защищённый сервис Stripe. Подтверждение придёт автоматически.',
    'landing.booking.payCta': 'Перейти к безопасной оплате',
  },

  ka: {
    'landing.page.title': 'Bereshit Spa — პროცედურების ლენდინგი',

    'landing.hero.eyebrow': 'იაპონური Head Spa და ტაილანდური მასაჟი — ბათუმი',
    'landing.hero.title': 'იაპონური Head Spa და ტაილანდური მასაჟი ბუტიკურ გარემოში',
    'landing.hero.subtitle': 'აირჩიეთ პროცედურა, დრო და მარტივად დაადასტურეთ WhatsApp-ით ან ტელეფონით — ერთ გვერდზე.',
    'landing.hero.cta': 'აირჩიეთ პროცედურა და დაჯავშნეთ',

    'landing.treatments.title': 'აირჩიეთ სასურველი პროცედურა',
    'landing.treatments.subtitle': 'ყველა პროცედურას ასრულებენ პროფესიონალი თაილანდელი თერაპევტები, მშვიდ გარემოში და დამამშვიდებელი მუსიკით.',
    'landing.treatment.book': 'დაჯავშნა',

    'landing.section.face.title': '✨ სახის პროცედურები',
    'landing.section.back.title': '💆‍♂️ ზურგი–კისერი–მხრები',
    'landing.section.body.title': '🧘‍♂️ მთლიანი სხეულის მასაჟი',
    'landing.section.body.subtitle': 'პროცედურა სრულდება როგორც მთლიანი სხეულის მასაჟი და ასევე მოიცავს სახის ნაზ მასაჟს.',
    'landing.section.foot.title': '🦶 ფეხის პროცედურები',

    'landing.booking.title': 'პროცედურის დაჯავშნა',
    'landing.booking.summary': 'გთხოვთ, პირველ რიგში აირჩიოთ პროცედურა და შემდეგ შეავსოთ საკონტაქტო ინფორმაცია და თარიღი.',
    'landing.booking.name': 'სრული სახელი',
    'landing.booking.phone': 'ტელეფონი / WhatsApp',
    'landing.booking.date': 'პროცედურის თარიღი',
    'landing.booking.time': 'პროცედურის დრო',
    'landing.booking.chooseTime': 'აირჩიეთ დრო',
    'landing.booking.duration': 'პროცედურის ხანგრძლივობა',
    'landing.booking.notes': 'სურვილები / შენიშვნები (არასავალდებულო)',
    'landing.booking.note': 'გადახდა ხორციელდება უსაფრთხოდ, Stripe-ის ბარათის გადახდის სისტემით. დადასტურება ავტომატურად გამოგეგზავნებათ.',
    'landing.booking.payCta': 'გადასვლა უსაფრთხო გადახდაზე',
  }
};

function t(key, lang) {
  const l = LOCAL_STRINGS[lang] || LOCAL_STRINGS.he;
  return l[key] || LOCAL_STRINGS.he[key] || null;
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = t(key, lang);
    if (val) el.textContent = val;
  });

  // ✅ עדכון title בדפדפן
  const titleEl = document.querySelector('title[data-i18n-title]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n-title');
    const val = t(key, lang);
    if (val) document.title = val;
  }
}

// ===== ווטסאפ – טקסטים להודעה =====
const WA_TEMPLATES_TREATMENT = {
  he: 'שלום, אני מעוניין לקבוע טיפול ב-Bereshit Spa:\nטיפול: {TREATMENT}\nמשך: {DURATION}\nמחיר: {PRICE}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en: 'Hello, I would like to book a treatment at Bereshit Spa:\nTreatment: {TREATMENT}\nDuration: {DURATION}\nPrice: {PRICE}\n\nPlease contact me to coordinate date and time.',
  ru: 'Здравствуйте! Я хочу записаться на процедуру в Bereshit Spa:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\nЦена: {PRICE}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka: 'გამარჯობა, მსურს პროცედურის დაჯავშნა Bereshit Spa-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\nფასი: {PRICE}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
};

// ✅ הודעה כללית לכפתור וואטסאפ צף
const WA_TEMPLATES_GENERAL = {
  he: 'שלום, הגעתי לדף של Bereshit Spa ואשמח לתאם טיפול.',
  en: 'Hello, I found Bereshit Spa and would like to book a treatment.',
  ru: 'Здравствуйте! Я нашёл(ла) Bereshit Spa и хочу записаться на процедуру.',
  ka: 'გამარჯობა, Bereshit Spa-ის გვერდიდან გწერთ და მსურს პროცედურის დაჯავშნა.'
};

// ✅ תרגום יחידת דקות + פורמט תצוגה
const DURATION_I18N = {
  he: { unit: "דק׳", fmt: (m) => `${m} דק׳` },
  en: { unit: 'min', fmt: (m) => `${m} min` },
  ru: { unit: 'мин', fmt: (m) => `${m} мин` },
  ka: { unit: 'წთ', fmt: (m) => `${m} წთ` }
};

// ✅ שמות + תיאורים + מחיר + תג (כדי לתרגם גם tag)
// (כאן נשאר ה-TREATMENTS_META הארוך שלך כפי שהוא בקובץ)
// ⚠️ לא הדבקתי פה את כולו מחדש כדי לא לשנות לך — תשאיר את שלך בדיוק כפי שהוא.
const TREATMENTS_META = window.TREATMENTS_META || {};

// ===== תרגום כרטיסי הטיפולים על הדף (כולל tag) =====
function applyTreatmentTexts(lang) {
  document.querySelectorAll('.product-card').forEach((card) => {
    const btn = card.querySelector('[data-treatment-key]');
    if (!btn) return;

    const key = btn.getAttribute('data-treatment-key');
    const meta = TREATMENTS_META[key];
    if (!meta) return;

    // ✅ tag
    const tagEl = card.querySelector('.tag');
    if (tagEl && meta.tag) {
      tagEl.textContent = meta.tag[lang] || meta.tag.he || tagEl.textContent;
    }

    // ✅ title
    const titleEl = card.querySelector('.product-title');
    if (titleEl && meta.name) {
      titleEl.textContent = meta.name[lang] || meta.name.he || titleEl.textContent;
    }

    // ✅ description (ה־p הראשון שאינו price)
    const descEl = card.querySelector('p:not(.price)');
    if (descEl && meta.desc) {
      descEl.textContent = meta.desc[lang] || meta.desc.he || descEl.textContent;
    }

    // ✅ price
    const priceEl = card.querySelector('.price');
    if (priceEl && meta.price) {
      priceEl.textContent = meta.price[lang] || meta.price.he || priceEl.textContent;
    }
  });
}

// ✅ NEW: תרגום + מחיר בתוך סליידר "טיפולי הדגל" + קוביות
function applySignatureTexts(lang) {
  const slider = document.getElementById('signatureSlider');
  if (!slider) return;

  slider.querySelectorAll('.signature-slide[data-treatment-key]').forEach((slide) => {
    const key = slide.getAttribute('data-treatment-key');
    const meta = TREATMENTS_META[key];
    if (!meta) return;

    const tagEl = slide.querySelector('.signature-tag');
    const nameEl = slide.querySelector('.signature-name');
    const descEl = slide.querySelector('.signature-desc');
    const priceEl = slide.querySelector('.signature-price');

    if (tagEl && meta.tag) tagEl.textContent = meta.tag[lang] || meta.tag.he || tagEl.textContent;
    if (nameEl && meta.name) nameEl.textContent = meta.name[lang] || meta.name.he || nameEl.textContent;
    if (descEl && meta.desc) descEl.textContent = meta.desc[lang] || meta.desc.he || descEl.textContent;
    if (priceEl && meta.price) priceEl.textContent = meta.price[lang] || meta.price.he || priceEl.textContent;
  });
}

// ✅ תרגום "30/60/90" לכל השפות
function applyDurationLabels(lang) {
  const d = DURATION_I18N[lang] || DURATION_I18N.he;
  document.querySelectorAll('.duration-options span[data-min]').forEach((span) => {
    const m = Number(span.getAttribute('data-min') || '0');
    if (!m) return;
    span.textContent = d.fmt(m);
  });
}

// ===== כפתור וואטסאפ צף: לינק + הודעה לפי שפה =====
function applyWhatsAppFloatLink(lang) {
  const wa = document.querySelector('a.wa-float');
  if (!wa) return;

  const msg = (WA_TEMPLATES_GENERAL[lang] || WA_TEMPLATES_GENERAL.he);
  wa.href = `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}

// ===== חיבור כפתורי שפה (דגלים) =====
function setupLangButtons() {
  document.querySelectorAll('.lang-btn[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
    });
  });
}

// ===== WhatsApp URL builder (טיפול) =====
function buildTreatmentWhatsAppUrl({ lang, treatmentKey, treatmentName, durationText, priceText }) {
  const template = WA_TEMPLATES_TREATMENT[lang] || WA_TEMPLATES_TREATMENT.he;

  const meta = TREATMENTS_META[treatmentKey] || {};
  const price = priceText ||
    (meta.price && (meta.price[lang] || meta.price.he)) ||
    '';

  const duration = durationText || '';
  const text = template
    .replace('{TREATMENT}', treatmentName || '')
    .replace('{DURATION}', duration || '')
    .replace('{PRICE}', price || '');

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

// ===== כפתורי טיפולים → ווטסאפ (כולל signature slider) =====
function setupTreatmentButtons() {
  const buttons = document.querySelectorAll('[data-book-btn]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const lang = getLang();
      const key = btn.getAttribute('data-treatment-key');

      // 1) שם טיפול
      const meta = TREATMENTS_META[key] || {};
      const treatmentName =
        (meta.name && (meta.name[lang] || meta.name.he)) ||
        (btn.closest('.product-card')?.querySelector('.product-title')?.textContent.trim()) ||
        (btn.closest('.signature-slide')?.querySelector('.signature-name')?.textContent.trim()) ||
        'Treatment';

      // 2) משך: או מתוך radio-group או duration-fixed
      let duration = '';

      const fixed = btn.getAttribute('data-duration-fixed') || btn.closest('.signature-slide')?.getAttribute('data-duration-fixed');
      if (fixed) {
        const m = Number(fixed);
        if (m) duration = (DURATION_I18N[lang] || DURATION_I18N.he).fmt(m);
      }

      const group = btn.getAttribute('data-radio-group');
      if (!duration && group) {
        const selectedSpan = document.querySelector(`input[name="${group}"]:checked + span`);
        if (selectedSpan) duration = selectedSpan.textContent.trim();
      }

      // 3) מחיר: מה-meta או מה-DOM של signature/product
      const priceText =
        (btn.closest('.product-card')?.querySelector('.price')?.textContent.trim()) ||
        (btn.closest('.signature-slide')?.querySelector('.signature-price')?.textContent.trim()) ||
        ((meta.price && (meta.price[lang] || meta.price.he)) || '');

      const url = buildTreatmentWhatsAppUrl({
        lang,
        treatmentKey: key,
        treatmentName,
        durationText: duration,
        priceText
      });

      window.open(url, '_blank');
    });
  });
}

// ===== Video Slider =====
// שמרתי את הפונקציה שלך כמו שהיא (עם id videoSlider וכו')
function setupVideoSlider() {
  const viewport = document.getElementById('videoSlider');
  if (!viewport) return;

  // תומך גם אם העטיפה היא video-slider וה-view בתוך viewport
  const track =
    viewport.querySelector('.video-slider__track') ||
    viewport.querySelector('.vslider__track');

  const slides =
    [...viewport.querySelectorAll('.video-slide')] ||
    [...viewport.querySelectorAll('.vslide')];

  const prev = viewport.querySelector('.video-slider__nav--prev') || viewport.querySelector('.vslider__nav--prev');
  const next = viewport.querySelector('.video-slider__nav--next') || viewport.querySelector('.vslider__nav--next');

  if (!track || !slides.length || !prev || !next) return;

  let index = 0;

  function update() {
    const w = viewport.clientWidth;
    track.style.transform = `translateX(${-index * w}px)`;

    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (!video) return;

      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
        try { video.currentTime = 0; } catch (_) {}
      }
    });
  }

  function resize() {
    const w = viewport.clientWidth;
    slides.forEach(s => (s.style.width = `${w}px`));
    track.style.width = `${w * slides.length}px`;
    update();
  }

  prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  next.onclick = () => {
    index = (index + 1) % slides.length;
    update();
  };

  window.addEventListener('resize', resize);
  resize();
}

// ✅ Backward-compat: בקובץ הישן קראת ל-setupSimpleVideoSlider()
function setupSimpleVideoSlider() {
  setupVideoSlider();
}

// ===== Signature Slider =====
function setupSignatureSlider() {
  const slider = document.getElementById('signatureSlider');
  if (!slider) return;

  const track = slider.querySelector('.signature-track');
  const slides = slider.querySelectorAll('.signature-slide');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  if (!track || !slides.length || !prev || !next) return;

  let index = 0;

  function update() {
    track.style.transform = `translateX(${index * -100}%)`;
  }

  prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  next.onclick = () => {
    index = (index + 1) % slides.length;
    update();
  };
}

// ===== "קוביות" לסליידר טיפולי דגל (סטייל דרך JS בלי למחוק CSS) =====
// מוסיף קלאס אם תרצה להרחיב CSS בעתיד
function enhanceSignatureCards() {
  const slider = document.getElementById('signatureSlider');
  if (!slider) return;
  slider.querySelectorAll('.signature-slide').forEach((slide) => {
    slide.classList.add('is-cube');
  });
}

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);

  setupLangButtons();
  setupTreatmentButtons();

  // ✅ סליידר וידאו — מפעילים רק כאן (פעם אחת)
  setupSimpleVideoSlider();

  // ✅ סליידר טיפולי דגל
  setupSignatureSlider();
  enhanceSignatureCards();
});
