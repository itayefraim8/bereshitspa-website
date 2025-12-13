// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כרטיסייה לווטסאפ + (וידיאו) סליידר אוטו-גלילה

const WHATSAPP_NUMBER = '972502686862';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

// ===== עזרי שפה =====
function getLang() {
  const stored = localStorage.getItem('site_lang');
  if (stored) return stored.slice(0, 2);
  const nav = (navigator.language || 'he').slice(0, 2);
  return nav || 'he';
}

function setLang(lang) {
  localStorage.setItem('site_lang', lang);
  applyLang(lang);
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';

  applyTranslations(lang);
  applyTreatmentTexts(lang); // תרגום כרטיסי טיפולים + תגיות + משכי זמן
}

// ===== מילון טקסטים (כותרות/כפתורים/טקסטים עם data-i18n) =====
const LOCAL_STRINGS = {
  he: {
    // hero
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle':
      'בחר/י טיפול, קבע/י שעה נוחה ושלים/י תשלום מאובטח בכרטיס אשראי – הכול בדף אחד.',
    'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle':
      'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',
    'landing.treatment.book': 'להזמנת הטיפול',

    // headings (לכותרות ראשיות שתוסיף ב-HTML עם data-i18n)
    'landing.section.head': 'ספא ראש',
    'landing.section.facial': 'עיסויי פנים',
    'landing.section.partial': 'עיסוי גוף חלקי',
    'landing.section.full': 'עיסוי גוף מלא',
    'landing.section.foot': 'כפות רגליים',

    // video slider (אם תוסיף ב-HTML עם data-i18n)
    'landing.video.title': 'הצצה לחוויה',
    'landing.video.subtitle': 'גללו או תנו לזה לרוץ לבד 🙂',

    // booking modal
    'landing.booking.title': 'הזמנת טיפול',
    'landing.booking.summary': 'נא לבחור טיפול מהדף, ואז למלא פרטי קשר ותאריך.',
    'landing.booking.name': 'שם מלא',
    'landing.booking.phone': 'טלפון ליצירת קשר (WhatsApp)',
    'landing.booking.date': 'תאריך טיפול',
    'landing.booking.time': 'שעת טיפול',
    'landing.booking.chooseTime': 'בחר/י שעה',
    'landing.booking.duration': 'משך הטיפול',
    'landing.booking.notes': 'העדפות / הערות (אופציונלי)',
    'landing.booking.note':
      'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. אישור הזמנה יישלח אליך אוטומטית.',
    'landing.booking.payCta': 'מעבר לתשלום מאובטח',

    // card landing
    'card.hero.eyebrow': 'Special Offer · Limited Slots',
    'card.hero.title': 'כרטיסייה של 7 טיפולים מפנקים',
    'card.hero.subtitle':
      'משלמים פעם אחת, נהנים מ-7 ביקורים ב-Bereshit Spa. אפשר לשלב טיפולים שונים ולהעביר לחברים/משפחה.',
    'card.hero.cta': 'לרכישת כרטיסייה עכשיו',

    'card.details.title': 'מה כולל הכרטיסייה?',
    'card.details.li1': '7 טיפולים לבחירה מתוך תפריט הטיפולים המלא.',
    'card.details.li2': 'אפשר לפצל בין בני משפחה / זוג / חברים.',
    'card.details.li3': 'תוקף הכרטיסייה – 6 חודשים מיום הרכישה.',
    'card.details.li4': 'תיאום תור מראש בווטסאפ או טלפון.',
    'card.details.note':
      'לאחר התשלום תקבלו אישור רכישה למייל/ווטסאפ, והכרטיסייה תירשם על שמכם במערכת שלנו.',

    'card.form.title': 'רכישת כרטיסייה',
    'card.form.name': 'שם מלא',
    'card.form.phone': 'טלפון / WhatsApp',
    'card.form.startDate': 'תאריך התחלה מועדף (אופציונלי)',
    'card.form.notes': 'הערות / שמות נוספים בכרטיסייה',
    'card.form.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe.',
    'card.form.payCta': 'מעבר לתשלום מאובטח'
  },

  en: {
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title': 'Japanese Head Spa & Thai Body Massages – Boutique Level',
    'landing.hero.subtitle':
      'Choose your treatment, pick a time and complete secure card payment – all in one page.',
    'landing.hero.cta': 'Choose treatment & book now',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle':
      'All treatments are done by professional Thai therapists, in a quiet atmosphere with relaxing music.',
    'landing.treatment.book': 'Book this treatment',

    'landing.section.head': 'Head Spa',
    'landing.section.facial': 'Facial Massages',
    'landing.section.partial': 'Partial Body Massage',
    'landing.section.full': 'Full Body Massage',
    'landing.section.foot': 'Foot Massage',

    'landing.video.title': 'A peek into the experience',
    'landing.video.subtitle': 'Swipe or let it play automatically 🙂',

    'landing.booking.title': 'Treatment booking',
    'landing.booking.summary':
      'Please select a treatment from the page, then fill in your contact details and date.',
    'landing.booking.name': 'Full name',
    'landing.booking.phone': 'Phone / WhatsApp',
    'landing.booking.date': 'Treatment date',
    'landing.booking.time': 'Treatment time',
    'landing.booking.chooseTime': 'Choose time',
    'landing.booking.duration': 'Treatment duration',
    'landing.booking.notes': 'Preferences / notes (optional)',
    'landing.booking.note':
      'Payment is processed via secure Stripe credit card. A confirmation will be sent automatically.',
    'landing.booking.payCta': 'Proceed to secure payment',

    'card.hero.eyebrow': 'Special Offer · Limited Slots',
    'card.hero.title': '7-Treatment Punch Card',
    'card.hero.subtitle':
      'Pay once and enjoy 7 visits at Bereshit Spa. Mix different treatments and share with family or friends.',
    'card.hero.cta': 'Buy the punch card now',

    'card.details.title': 'What does the card include?',
    'card.details.li1': '7 treatments to choose from our full treatment menu.',
    'card.details.li2': 'You can share between family members / couples / friends.',
    'card.details.li3': 'Card validity – 6 months from purchase date.',
    'card.details.li4': 'Appointments are scheduled in advance via WhatsApp or phone.',
    'card.details.note':
      'After payment you will receive a confirmation by email/WhatsApp and the card will be registered in your name.',

    'card.form.title': 'Punch card purchase',
    'card.form.name': 'Full name',
    'card.form.phone': 'Phone / WhatsApp',
    'card.form.startDate': 'Preferred start date (optional)',
    'card.form.notes': 'Notes / additional names on the card',
    'card.form.note': 'Payment is processed via secure Stripe credit card.',
    'card.form.payCta': 'Proceed to secure payment'
  },

  ru: {
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Батуми',
    'landing.hero.title': 'Японский Head Spa и тайский массаж тела в формате бутика',
    'landing.hero.subtitle':
      'Выберите процедуру, удобное время и оплатите банковской картой на одной странице.',
    'landing.hero.cta': 'Выбрать процедуру и записаться',

    'landing.treatments.title': 'Выберите процедуру',
    'landing.treatments.subtitle':
      'Все процедуры выполняют профессиональные мастера из Таиланда, в тихой атмосфере и под расслабляющую музыку.',
    'landing.treatment.book': 'Записаться на процедуру',

    'landing.section.head': 'Head Spa',
    'landing.section.facial': 'Массаж лица',
    'landing.section.partial': 'Частичный массаж тела',
    'landing.section.full': 'Массаж всего тела',
    'landing.section.foot': 'Массаж стоп',

    'landing.video.title': 'Немного о процессе',
    'landing.video.subtitle': 'Листайте или включите автопрокрутку 🙂',

    'landing.booking.title': 'Бронирование процедуры',
    'landing.booking.summary':
      'Пожалуйста, выберите процедуру на странице и заполните контакты и дату.',
    'landing.booking.name': 'Полное имя',
    'landing.booking.phone': 'Телефон / WhatsApp',
    'landing.booking.date': 'Дата процедуры',
    'landing.booking.time': 'Время процедуры',
    'landing.booking.chooseTime': 'Выберите время',
    'landing.booking.duration': 'Длительность процедуры',
    'landing.booking.notes': 'Пожелания / примечания (необязательно)',
    'landing.booking.note':
      'Оплата проводится банковской картой через защищённый сервис Stripe. Подтверждение придёт автоматически.',
    'landing.booking.payCta': 'Перейти к безопасной оплате',

    'card.hero.eyebrow': 'Специальное предложение · ограниченное число мест',
    'card.hero.title': 'Абонемент на 7 процедур',
    'card.hero.subtitle':
      'Оплачиваете один раз – получаете 7 визитов в Bereshit Spa. Можно комбинировать процедуры и делиться с близкими.',
    'card.hero.cta': 'Купить абонемент',

    'card.details.title': 'Что входит в абонемент?',
    'card.details.li1': '7 процедур на выбор из полного меню.',
    'card.details.li2': 'Можно делить между семьёй, парой или друзьями.',
    'card.details.li3': 'Срок действия – 6 месяцев с даты покупки.',
    'card.details.li4': 'Предварительная запись по WhatsApp или телефону.',
    'card.details.note':
      'После оплаты вы получите подтверждение по email/WhatsApp, а абонемент будет зарегистрирован на ваше имя.',

    'card.form.title': 'Покупка абонемента',
    'card.form.name': 'Полное имя',
    'card.form.phone': 'Телефон / WhatsApp',
    'card.form.startDate': 'Предпочитаемая дата начала (необязательно)',
    'card.form.notes': 'Примечания / дополнительные имена в абонементе',
    'card.form.note': 'Оплата проводится банковской картой через защищённый Stripe.',
    'card.form.payCta': 'Перейти к безопасной оплате'
  },

  ka: {
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – ბათუმი',
    'landing.hero.title': 'იაპონური Head Spa და ტაილანდური მასაჟი ბუტიკურ გარემოში',
    'landing.hero.subtitle':
      'აირჩიეთ პროცედურა, დაგეგმეთ დრო და განახორციელეთ უსაფრთხო ბარათით გადახდა — ერთ გვერდზე.',
    'landing.hero.cta': 'აირჩიეთ პროცედურა და დაჯავშნეთ',

    'landing.treatments.title': 'აირჩიეთ სასურველი პროცედურა',
    'landing.treatments.subtitle':
      'ყველა პროცედურას ასრულებენ პროფესიონალი თაილანდელი თერაპევტები, მშვიდ გარემოში და დამამშვიდებელი მუსიკით.',
    'landing.treatment.book': 'დაჯავშნა',

    'landing.section.head': 'Head Spa',
    'landing.section.facial': 'სახის მასაჟები',
    'landing.section.partial': 'ნაწილობრივი სხეულის მასაჟი',
    'landing.section.full': 'მთლიანი სხეულის მასაჟი',
    'landing.section.foot': 'ფეხის მასაჟი',

    'landing.video.title': 'მცირე შთაბეჭდილება',
    'landing.video.subtitle': 'გადაასრიალეთ ან ჩართეთ ავტოგადახვევა 🙂',

    'landing.booking.title': 'პროცედურის დაჯავშნა',
    'landing.booking.summary':
      'გთხოვთ, პირველ რიგში აირჩიოთ პროცედურა და შემდეგ შეავსოთ საკონტაქტო ინფორმაცია და თარიღი.',
    'landing.booking.name': 'სრული სახელი',
    'landing.booking.phone': 'ტელეფონი / WhatsApp',
    'landing.booking.date': 'პროცედურის თარიღი',
    'landing.booking.time': 'პროცედურის დრო',
    'landing.booking.chooseTime': 'აირჩიეთ დრო',
    'landing.booking.duration': 'პროცედურის ხანგრძლივობა',
    'landing.booking.notes': 'სურვილები / შენიშვნები (არასავალდებულო)',
    'landing.booking.note':
      'გადახდა ხორციელდება უსაფრთხოდ, Stripe-ის ბარათის გადახდის სისტემით. დადასტურება ავტომატურად გამოგეგზავნებათ.',
    'landing.booking.payCta': 'გადასვლა უსაფრთხო გადახდაზე',

    'card.hero.eyebrow': 'სპეციალური შეთავაზება · შეზღუდული რაოდენობა',
    'card.hero.title': '7 პროცედურის აბონემენტი',
    'card.hero.subtitle':
      'ერთხელ იხდით და 7 ვიზიტს იღებთ Bereshit Spa-ში. შეგიძლიათ შეუთავსოთ სხვადასხვა პროცედურები და გააზიარო ოჯახის წევრებთან ან მეგობრებთან.',
    'card.hero.cta': 'აბონემენტის ყიდვა',

    'card.details.title': 'რა შედის აბონემენტში?',
    'card.details.li1': '7 პროცედურა ჩვენი სრული მენის არჩევანიდან.',
    'card.details.li2': 'შესაძლებელია ოჯახის, წყვილის ან მეგობრების შორის განაწილება.',
    'card.details.li3': 'ვადა – 6 თვე შეძენის დღიდან.',
    'card.details.li4': 'წინასწარი ჩაწერა WhatsApp-ით ან ტელეფონით.',
    'card.details.note':
      'გადახდის შემდეგ მიიღებთ დადასტურებას Email-ით/WhatsApp-ით და აბონემენტი დარეგისტრირდება თქვენს სახელზე.',

    'card.form.title': 'აბონემენტის ყიდვა',
    'card.form.name': 'სრული სახელი',
    'card.form.phone': 'ტელეფონი / WhatsApp',
    'card.form.startDate': 'სასურველი დაწყების თარიღი (არასავალდებულო)',
    'card.form.notes': 'შენიშვნები / დამატებითი სახელები აბონემენტზე',
    'card.form.note': 'გადახდა ხდება უსაფრთხოდ Stripe-ის ბარათის სისტემით.',
    'card.form.payCta': 'გადასვლა უსაფრთხო გადახდაზე'
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
}

// ===== ווטסאפ – טקסטים להודעה =====
const WA_TEMPLATES_TREATMENT = {
  he:
    'שלום, אני מעוניין לקבוע טיפול ב-Bereshit Spa:\nטיפול: {TREATMENT}\nמשך: {DURATION}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en:
    'Hello, I would like to book a treatment at Bereshit Spa:\nTreatment: {TREATMENT}\nDuration: {DURATION}\n\nPlease contact me to coordinate date and time.',
  ru:
    'Здравствуйте! Я хочу записаться на процедуру в Bereshit Spa:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka:
    'გამარჯობა, მსურს პროცედურის დაჯავშნა Bereshit Spa-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
};

const WA_TEMPLATES_CARD = {
  he:
    'שלום, אני מעוניין לרכוש כרטיסייה של 7 טיפולים ב-Bereshit Spa.\nפרטים: {CARD}\nמחיר: {PRICE}\n\nאשמח שתיצרו איתי קשר להמשך.',
  en:
    'Hello, I would like to purchase a 7-treatment card at Bereshit Spa.\nDetails: {CARD}\nPrice: {PRICE}\n\nPlease contact me to complete the purchase.',
  ru:
    'Здравствуйте! Я хочу приобрести абонемент на 7 процедур в Bereshit Spa.\nДетали: {CARD}\nЦена: {PRICE}\n\nПожалуйста, свяжитесь со мной для оформления.',
  ka:
    'გამარჯობა, მსურს 7 პროცედურის აბონემენტის შეძენა Bereshit Spa-ში.\nდეტალები: {CARD}\nფასი: {PRICE}\n\nგთხოვთ, დამიკავშირდეთ შესაძენად.'
};

// ===== טקסט חובה ל"עיסוי גוף מלא" בכל תיאורי הגוף המלא =====
const FULL_BODY_PHRASE = {
  he: 'עיסוי גוף מלא – מכפות הרגליים ועד הכתפיים, צוואר ראש ופנים',
  en: 'Full body massage – from feet up to shoulders, neck, head and face.',
  ru: 'Массаж всего тела — от стоп до плеч, включая шею, голову и лицо.',
  ka: 'მთლიანი სხეულის მასაჟი — ტერფებიდან მხრებამდე, კისრის, თავის და სახის ჩათვლით.'
};

function ensureFullBodyPhrase(text, lang) {
  const phrase = FULL_BODY_PHRASE[lang] || FULL_BODY_PHRASE.he;
  const cleaned = String(text || '').trim();

  if (!cleaned) return phrase;
  if (cleaned.includes(phrase)) return cleaned;

  // מוסיפים נקודה לפני המשפט אם צריך
  const needsPunct = !/[.!?…:]$/.test(cleaned);
  return `${cleaned}${needsPunct ? '.' : ''} ${phrase}`;
}

// ===== תרגום משכי זמן בכפתורי radio =====
function translateDurationLabel(raw, lang) {
  const s = String(raw || '').trim();

  // Patterns we expect: "60 דק'" / "30 דק'"
  const m = s.match(/^(\d+)\s*דק'?$/);
  if (!m) return s;

  const n = m[1];

  if (lang === 'he') return `${n} דק'`;
  if (lang === 'ru') return `${n} мин`;
  if (lang === 'ka') return `${n} წთ`;
  return `${n} min`; // en/default
}

// ===== תרגום כרטיסי הטיפולים על הדף =====
// כולל: שם, תיאור, מחיר, תגית עליונה (.tag), משכי זמן (radio span)
function applyTreatmentTexts(lang) {
  document.querySelectorAll('.product-card').forEach((card) => {
    const btn = card.querySelector('[data-treatment-key]');
    if (!btn) return;

    const key = btn.getAttribute('data-treatment-key');
    const meta = TREATMENTS_META[key];
    if (!meta) return;

    const nameMap = meta.name || {};
    const descMap = meta.desc || {};
    const priceMap = meta.price || {};
    const tagMap = meta.tag || {};

    // title
    const titleEl = card.querySelector('.product-title');
    if (titleEl && nameMap) {
      titleEl.textContent = nameMap[lang] || nameMap.he || titleEl.textContent;
    }

    // desc
    const descEl = card.querySelector('p:not(.price)');
    if (descEl && descMap) {
      let descText = descMap[lang] || descMap.he || descEl.textContent;

      // כל מה שמתחיל ב-body- = גוף מלא → מוסיפים משפט חובה
      if (key && key.startsWith('body-')) {
        descText = ensureFullBodyPhrase(descText, lang);
      }

      descEl.textContent = descText;
    }

    // price
    const priceEl = card.querySelector('.price');
    if (priceEl && priceMap) {
      priceEl.textContent = priceMap[lang] || priceMap.he || priceEl.textContent;
    }

    // tag
    const tagEl = card.querySelector('.tag');
    if (tagEl && tagMap) {
      tagEl.textContent = tagMap[lang] || tagMap.he || tagEl.textContent;
    }

    // duration labels
    card.querySelectorAll('.duration-options label span').forEach((span) => {
      span.textContent = translateDurationLabel(span.textContent, lang);
    });
  });
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

// ===== כפתורי טיפולים → ווטסאפ =====
function setupTreatmentButtons() {
  const buttons = document.querySelectorAll('[data-book-btn]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = getLang();
      const key = btn.getAttribute('data-treatment-key');
      const group = btn.getAttribute('data-radio-group');

      const meta = TREATMENTS_META[key] || {};
      const nameMap = meta.name || {};
      const treatmentName =
        nameMap[lang] ||
        nameMap.he ||
        (btn.closest('.product-card')?.querySelector('.product-title')?.textContent.trim() ??
          'Treatment');

      let duration = '';
      if (group) {
        const span = document.querySelector(`input[name="${group}"]:checked + span`) || null;
        if (span) duration = span.textContent.trim();
      }

      const template = WA_TEMPLATES_TREATMENT[lang] || WA_TEMPLATES_TREATMENT.he;
      const text = template.replace('{TREATMENT}', treatmentName).replace('{DURATION}', duration || '');

      const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
}

// ===== כפתור הכרטיסייה → ווטסאפ =====
function setupCardButtons() {
  const btn = document.querySelector('[data-card-book-btn]');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = getLang();
    const key = btn.getAttribute('data-card-key') || 'card7';

    const meta = CARD_META[key] || {};
    const nameMap = meta.name || {};
    const priceMap = meta.price || {};

    const cardName = nameMap[lang] || nameMap.he || '7-Treatment Card';
    const price = priceMap[lang] || priceMap.he || '';

    const template = WA_TEMPLATES_CARD[lang] || WA_TEMPLATES_CARD.he;
    const text = template.replace('{CARD}', cardName).replace('{PRICE}', price);

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// ===== סליידר וידיאו: אוטו-גלילה =====
// תומך בשתי תצורות ב-HTML:
// 1) <div class="video-slider" data-video-slider> ... </div>
// 2) <div data-video-slider class="..."> ... </div>
function setupVideoSliderAutoScroll() {
  const sliders = document.querySelectorAll('[data-video-slider], .video-slider');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    // הגדרות (אפשר לשנות דרך data-*)
    const intervalMs = Number(slider.getAttribute('data-auto-ms') || 3500);
    const pauseOnHover = (slider.getAttribute('data-pause-hover') || 'true') !== 'false';
    const smooth = (slider.getAttribute('data-smooth') || 'true') !== 'false';

    const getSlides = () =>
      Array.from(slider.querySelectorAll('[data-video-slide], .video-slide, .slide, > *')).filter(
        (el) => el && el.nodeType === 1
      );

    let timer = null;
    let idx = 0;

    function scrollToIndex(i) {
      const slides = getSlides();
      if (!slides.length) return;

      idx = ((i % slides.length) + slides.length) % slides.length;
      const target = slides[idx];

      const left = target.offsetLeft;
      slider.scrollTo({
        left,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    function findClosestIndex() {
      const slides = getSlides();
      if (!slides.length) return 0;

      const x = slider.scrollLeft;
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((s, i) => {
        const dist = Math.abs(s.offsetLeft - x);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      return best;
    }

    function start() {
      stop();
      timer = window.setInterval(() => {
        idx = findClosestIndex();
        scrollToIndex(idx + 1);
      }, intervalMs);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    if (pauseOnHover) {
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
    }

    let userInteracting = false;
    const interactionStart = () => {
      userInteracting = true;
      stop();
    };
    const interactionEnd = () => {
      userInteracting = false;
      start();
    };

    slider.addEventListener('pointerdown', interactionStart, { passive: true });
    slider.addEventListener('pointerup', interactionEnd, { passive: true });
    slider.addEventListener('touchstart', interactionStart, { passive: true });
    slider.addEventListener('touchend', interactionEnd, { passive: true });

    let scrollT = null;
    slider.addEventListener(
      'scroll',
      () => {
        if (userInteracting) return;
        if (scrollT) window.clearTimeout(scrollT);
        scrollT = window.setTimeout(() => {
          idx = findClosestIndex();
        }, 120);
      },
      { passive: true }
    );

    const slides = getSlides();
    if (slides.length >= 2) start();
  });
}

/* ===== ✅ HERO SLIDER (heroSlider / .js-slider) =====
   עובד עם ה-HTML שכבר יש לך:
   <section id="heroSlider" class="promo-slider promo-full js-slider" data-autoplay="4500">
     <div class="slides">
       <article class="promo-slide is-video" data-video="Videos/spa.mp4"> ... </article>
       ...
     </div>
     <button class="slider-btn prev">‹</button>
     <button class="slider-btn next">›</button>
     <div class="dots"></div>
   </section>
*/
function setupHeroSlider() {
  const sliders = document.querySelectorAll('.js-slider');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const slidesWrap = slider.querySelector('.slides');
    const slides = Array.from(slidesWrap?.querySelectorAll('.promo-slide') || []);
    if (slides.length === 0) return;

    const btnPrev = slider.querySelector('.slider-btn.prev');
    const btnNext = slider.querySelector('.slider-btn.next');
    const dotsWrap = slider.querySelector('.dots');

    const autoplayMs = Number(slider.getAttribute('data-autoplay') || 0);
    let idx = 0;
    let timer = null;

    // ודא שיש וידאו ברקע לכל slide
    slides.forEach((s) => {
      if (s.classList.contains('is-video') && s.dataset.video) {
        const already = s.querySelector('video');
        if (!already) {
          const v = document.createElement('video');
          v.src = s.dataset.video;
          v.muted = true;
          v.playsInline = true;
          v.autoplay = true;
          v.loop = true;
          v.preload = 'metadata';
          s.prepend(v);
        }
      }
    });

    function pauseAllExcept(activeIndex) {
      slides.forEach((s, i) => {
        const v = s.querySelector('video');
        if (!v) return;
        if (i === activeIndex) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          try { v.pause(); } catch {}
        }
      });
    }

    function setActive(i) {
      idx = ((i % slides.length) + slides.length) % slides.length;

      slides.forEach((s, si) => s.classList.toggle('is-active', si === idx));
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.dot').forEach((d, di) => d.classList.toggle('is-active', di === idx));
      }

      pauseAllExcept(idx);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'dot';
        b.setAttribute('aria-label', `Slide ${i + 1}`);
        b.addEventListener('click', () => {
          stop();
          setActive(i);
          start();
        });
        dotsWrap.appendChild(b);
      });
    }

    function start() {
      stop();
      if (!autoplayMs || autoplayMs < 1200) return;
      timer = window.setInterval(() => setActive(idx + 1), autoplayMs);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    // init
    buildDots();
    slides.forEach((s) => s.classList.remove('is-active'));
    setActive(0);
    start();

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        stop();
        setActive(idx - 1);
        start();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        stop();
        setActive(idx + 1);
        start();
      });
    }

    // pause on hover
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
  });
}

// ===== נתוני הטיפולים לתרגום (שם + תיאור + מחיר + תגית) =====
const TREATMENTS_META = {
  'head-spa': {
    tag: { he: '👑 Japanese Head Spa', en: '👑 Japanese Head Spa', ru: '👑 Japanese Head Spa', ka: '👑 Japanese Head Spa' },
    name: { he: 'טיפול הדגל – ספא ראש יפני', en: 'Signature Japanese Head Spa', ru: 'Signature Japanese Head Spa', ka: 'Signature Japanese Head Spa' },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי, עיסוי קרקפת, מסכות ופינוקי מים חמימים. כולל שטיפה, מגבת חמה, סרום לקרקפת וייבוש שיער מלא.',
      en: 'Traditional Japanese ritual combining cleansing, scalp massage, masks and warm water pampering. Includes hair wash, hot towel, scalp serum and full blow-dry.',
      ru: 'Традиционный японский ритуал: очищение, массаж кожи головы, маски и тёплое водное расслабление. Включает мытьё головы, горячее полотенце, сыворотку для кожи головы и полную сушку.',
      ka: 'ტრადიციული იაპონური რიტუალი, რომელიც აერთიანებს წმენდას, თავის კანის მასაჟს, ნიღბებს და თბილ წყლის პამფერს. შეიცავს თმის დაბანას, ცხელ პირსახოცს, თავის კანის სერუმს და სრულ გამშრობას.'
    },
    price: { he: "60 דק' – 200₾ · 90 דק' – 250₾", en: '60 min – 200₾ · 90 min – 250₾', ru: '60 мин – 200₾ · 90 мин – 250₾', ka: '60 წთ – 200₾ · 90 წთ – 250₾' }
  },

  'facial-thai-compress': {
    tag: { he: '🌼 Thai Herbal Compress Facial', en: '🌼 Thai Herbal Compress Facial', ru: '🌼 Thai Herbal Compress Facial', ka: '🌼 Thai Herbal Compress Facial' },
    name: { he: 'עיסוי פנים בקומפרסים תאילנדים', en: 'Thai Herbal Compress Facial', ru: 'Массаж лица с тайскими травяными компрессами', ka: 'სახის მასაჟი თაილანდური მცენარეულის კომპრესებით' },
    desc: {
      he: 'קומפרסים תאילנדים חמים מרפים את שרירי הפנים ומשפרים את זרימת הדם. כולל עיסוי פנים מעמיק, קרקפת ופלג גוף עליון.',
      en: 'Warm Thai herbal compresses relax facial muscles and improve circulation. Includes deep face massage, scalp and upper body work.',
      ru: 'Тёплые тайские травяные компрессы расслабляют мышцы лица и улучшают кровообращение. Включает глубокий массаж лица, головы и верхней части спины.',
      ka: 'თბილი თაილანდური მცენარეული კომპრესები ამშვიდებს სახის კუნთებს და აუმჯობესებს სისხლის მიმოქცევას. შეიცავს ღრმა სახის მასაჟს, თავსა და ზედა ზურგს.'
    },
    price: { he: "60 דק' – 150₾", en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'facial-hot-stone': {
    tag: { he: '🔥 Hot Stone Facial', en: '🔥 Hot Stone Facial', ru: '🔥 Hot Stone Facial', ka: '🔥 Hot Stone Facial' },
    name: { he: 'עיסוי פנים באבנים חמות', en: 'Hot Stone Facial', ru: 'Массаж лица горячими камнями', ka: 'სახის მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'אבני בזלת חמות נעות בעדינות על הפנים והצוואר ומשחררות מתחים. כולל עיסוי פנים, קרקפת וצוואר.',
      en: 'Warm basalt stones glide softly over the face and neck to melt tension. Includes face, scalp and neck massage.',
      ru: 'Тёплые базальтовые камни мягко скользят по лицу и шее, снимая напряжение. Включает массаж лица, кожи головы и шеи.',
      ka: 'თბილი ბაზალტის ქვები ნაზად სრიალებენ სახესა და კისერზე, ხსნიან დაძაბულობას. შეიცავს სახის, თავის კანის და კისრის მასაჟს.'
    },
    price: { he: "60 דק' – 160₾", en: '60 min – 160₾', ru: '60 мин – 160₾', ka: '60 წთ – 160₾' }
  },

  'facial-thai': {
    tag: { he: '🌺 Traditional Thai Face Massage', en: '🌺 Traditional Thai Face Massage', ru: '🌺 Traditional Thai Face Massage', ka: '🌺 Traditional Thai Face Massage' },
    name: { he: 'עיסוי פנים תאילנדי מסורתי', en: 'Traditional Thai Face Massage', ru: 'Традиционный тайский массаж лица', ka: 'ტრადიციული ტაილანდური სახის მასაჟი' },
    desc: {
      he: 'עיסוי עדין עם לחיצות אנרגטיות, משחרר מתח מהפנים, הלסת והצוואר.',
      en: 'Gentle massage with energizing acupressure, releasing tension from face, jaw and neck.',
      ru: 'Мягкий массаж с энергичной акупрессурой, снимающей напряжение с лица, челюсти и шеи.',
      ka: 'ნაზი მასაჟი წერტილოვანი დაწოლებით – ხსნის დაძაბულობას სახიდან, ყბიდან და კისრიდან.'
    },
    price: { he: "30 דק' – 90₾ · 60 דק' – 150₾", en: '30 min – 90₾ · 60 min – 150₾', ru: '30 мин – 90₾ · 60 мин – 150₾', ka: '30 წთ – 90₾ · 60 წთ – 150₾' }
  },

  'facial-aroma': {
    tag: { he: '🌿 Aromatherapy Facial', en: '🌿 Aromatherapy Facial', ru: '🌿 Aromatherapy Facial', ka: '🌿 Aromatherapy Facial' },
    name: { he: 'עיסוי פנים ארומתרפי', en: 'Aromatherapy Facial', ru: 'Ароматерапевтический массаж лица', ka: 'არომატერაპიული სახის მასაჟი' },
    desc: {
      he: 'טיפול עדין עם שמנים אתריים טהורים, מרגיע את מערכת העצבים ומעניק זוהר לעור.',
      en: 'Delicate treatment with pure essential oils that calms the nervous system and adds glow to the skin.',
      ru: 'Нежная процедура с натуральными эфирными маслами, успокаивающая нервную систему и придающая коже сияние.',
      ka: 'ნაზი პროცედურა სუფთა ეთერზეთებით – ამშვიდებს ნერვულ სისტემას და ანიჭებს კანს ბზინვარებას.'
    },
    price: { he: "30 דק' – 80₾ · 60 דק' – 140₾", en: '30 min – 80₾ · 60 min – 140₾', ru: '30 мин – 80₾ · 60 мин – 140₾', ka: '30 წთ – 80₾ · 60 წთ – 140₾' }
  },

  'back-basic': {
    tag: { he: '💆‍♂️ Back–Neck–Shoulders', en: '💆‍♂️ Back–Neck–Shoulders', ru: '💆‍♂️ Back–Neck–Shoulders', ka: '💆‍♂️ Back–Neck–Shoulders' },
    name: { he: 'עיסוי גב–כתפיים–צוואר', en: 'Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч', ka: 'ზურგის, კისრის და მხრების მასაჟი' },
    desc: {
      he: 'עיסוי ממוקד לשחרור מתחים באזורי העומס המרכזיים – מתאים לישיבה ממושכת.',
      en: 'Focused massage to release tension in the main stress areas – ideal for long hours of sitting.',
      ru: 'Прицельный массаж для снятия напряжения в основных зонах нагрузки – идеален для тех, кто много сидит.',
      ka: 'მიზანმიმართული მასაჟი, რომელიც ხსნის დაძაბულობას უმთავრეს დატვირთულ ზონებში – შესაფერისია ხანგრძლივი ჯდომისთვის.'
    },
    price: { he: "60 דק' – 150₾", en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: { he: '🔥 Hot Stone Back Massage', en: '🔥 Hot Stone Back Massage', ru: '🔥 Hot Stone Back Massage', ka: '🔥 Hot Stone Back Massage' },
    name: { he: 'עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'אבני בזלת חמות חודרות לשרירים וממיסות מתחים עמוקים, בשילוב עיסוי ידני עמוק.',
      en: 'Warm basalt stones penetrate the muscles and melt deep tension, combined with deep manual massage.',
      ru: 'Тёплые базальтовые камни глубоко прогревают мышцы и снимают глубокие зажимы в сочетании с ручным массажем.',
      ka: 'თბილი ბაზალტის ქვები ღრმად აღწევს კუნთებში და ხსნის ღრმა დაძაბულობას ღრმა მანუალური მასაჟის კომბინაციით.'
    },
    price: { he: "60 דק' – 180₾", en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  // ===== גוף מלא (body-*) — כאן יתווסף אוטומטית המשפט: "עיסוי גוף מלא – ..." =====
  'body-thai': {
    tag: { he: '🇹🇭 Traditional Thai Massage', en: '🇹🇭 Traditional Thai Massage', ru: '🇹🇭 Traditional Thai Massage', ka: '🇹🇭 Traditional Thai Massage' },
    name: { he: 'עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
      he: 'טיפול עתיק ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה לאורך כל הגוף.',
      en: 'Ancient oil-free treatment with pressure, stretches and work on energy lines throughout the body.',
      ru: 'Древняя процедура без масла с надавливаниями, растяжками и работой по энергетическим линиям по всему телу.',
      ka: 'უძველესი პროცედურა ზეთის გარეშე – წერტილოვანი დაწოლა, გაჭიმვები და ენერგეტიკულ ხაზებზე მუშაობა მთელ სხეულზე.'
    },
    price: { he: "60 דק' – 170₾ · 90 דק' – 220₾", en: '60 min – 170₾ · 90 min – 220₾', ru: '60 мин – 170₾ · 90 мин – 220₾', ka: '60 წთ – 170₾ · 90 წთ – 220₾' }
  },

  'body-thai-oil': {
    tag: { he: '🇹🇭 Thai Oil Massage', en: '🇹🇭 Thai Oil Massage', ru: '🇹🇭 Thai Oil Massage', ka: '🇹🇭 Thai Oil Massage' },
    name: { he: 'עיסוי שמן תאילנדי', en: 'Thai Oil Massage', ru: 'Тайский масляный массаж', ka: 'ტაილანდური ზეთოვანი მასაჟი' },
    desc: {
      he: 'עיסוי בשמן חם בתנועות זורמות ועמוקות לשחרור עומס שרירי ולהרפיה עמוקה.',
      en: 'Warm oil massage combining flowing and deeper strokes to release muscular tension and relax deeply.',
      ru: 'Массаж тёплым маслом с плавными и глубокими приёмами для снятия мышечного напряжения и глубокого расслабления.',
      ka: 'თბილი ზეთის მასაჟი – ნაზი და ღრმა მოძრაობების კომბინაცია კუნთოვანი დაძაბულობის მოსახსნელად და ღრმა რელაქსაციისთვის.'
    },
    price: { he: "60 דק' – 180₾ · 90 דק' – 230₾", en: '60 min – 180₾ · 90 min – 230₾', ru: '60 мин – 180₾ · 90 мин – 230₾', ka: '60 წთ – 180₾ · 90 წთ – 230₾' }
  },

  'body-aroma': {
    tag: { he: '🌿 Aromatherapy Oil Massage', en: '🌿 Aromatherapy Oil Massage', ru: '🌿 Aromatherapy Oil Massage', ka: '🌿 Aromatherapy Oil Massage' },
    name: { he: 'עיסוי ארומתרפי בשמן', en: 'Aromatherapy Oil Massage', ru: 'Аромамассаж с маслом', ka: 'არომატერაპიული ზეთოვანი მასაჟი' },
    desc: {
      he: 'שמנים אתריים טהורים המותאמים אישית לצורך שלך – הרגעה, שחרור מתחים או איזון אנרגטי.',
      en: 'Pure essential oils tailored to your needs — calming, stress relief or energy balance.',
      ru: 'Натуральные эфирные масла, подобранные под ваши потребности — успокоение, снятие стресса или баланс энергии.',
      ka: 'სუფთა ეთერზეთები, ინდივიდუალურად შერჩეული თქვენს საჭიროებაზე — დამშვიდება, სტრესის მოხსნა ან ენერგიის ბალანსი.'
    },
    price: { he: "60 דק' – 190₾", en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-thai-ther': {
    tag: { he: '🇹🇭 Thai Therapeutic Massage', en: '🇹🇭 Thai Therapeutic Massage', ru: '🇹🇭 Thai Therapeutic Massage', ka: '🇹🇭 Thai Therapeutic Massage' },
    name: { he: 'עיסוי תאילנדי רפואי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'ტაილანდური თერაპიული მასაჟი' },
    desc: {
      he: 'עיסוי טיפולי עמוק עם לחיצות ממוקדות ומתיחות מדויקות – מתאים לכאבי גב וצוואר ונוקשות כרונית.',
      en: 'Deep therapeutic massage with focused pressure and precise stretches — ideal for back/neck pain and chronic stiffness.',
      ru: 'Глубокий лечебный массаж с прицельными надавливаниями и точными растяжками — подходит при болях в спине/шее и хронической скованности.',
      ka: 'ღრმა თერაპიული მასაჟი მიზანმიმართული წნევით და ზუსტი გაჭიმვებით — რეკომენდებულია ზურგისა/კისრის ტკივილებსა და ქრონიკულ დაჭიმულობაზე.'
    },
    price: { he: "60 דק' – 230₾ · 90 דק' – 280₾", en: '60 min – 230₾ · 90 min – 280₾', ru: '60 мин – 230₾ · 90 мин – 280₾', ka: '60 წთ – 230₾ · 90 წთ – 280₾' }
  },

  'body-hot-stone': {
    tag: { he: '🔥 Hot Stone Massage', en: '🔥 Hot Stone Massage', ru: '🔥 Hot Stone Massage', ka: '🔥 Hot Stone Massage' },
    name: { he: 'עיסוי באבנים חמות – גוף מלא', en: 'Full Body Hot Stone Massage', ru: 'Массаж горячими камнями всего тела', ka: 'მთლიანი სხეულის მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'אבני בזלת חמות מחליקות על הגוף וממיסות מתחים עמוקים – חימום נעים, רוגע עמוק וזרימת דם טובה.',
      en: 'Warm basalt stones glide along the body to melt deep tension — cozy warmth, deep relaxation and improved circulation.',
      ru: 'Тёплые базальтовые камни скользят по телу и снимают глубокие зажимы — приятное тепло, глубокое расслабление и улучшение кровообращения.',
      ka: 'თბილი ბაზალტის ქვები სრიალებენ სხეულზე და ხსნიან ღრმა დაძაბულობას — სასიამოვნო სითბო, ღრმა რელაქსაცია და უკეთესი სისხლის მიმოქცევა.'
    },
    price: { he: "60 דק' – 210₾", en: '60 min – 210₾', ru: '60 мин – 210₾', ka: '60 წთ – 210₾' }
  },

  'body-thai-comp': {
    tag: { he: '🌼 Thai Herbal Compress Massage', en: '🌼 Thai Herbal Compress Massage', ru: '🌼 Thai Herbal Compress Massage', ka: '🌼 Thai Herbal Compress Massage' },
    name: { he: 'עיסוי גוף בקומפרסים תאילנדים', en: 'Thai Herbal Compress Body Massage', ru: 'Массаж тела с тайскими травяными компрессами', ka: 'ტანის მასაჟი თაილანდური მცენარეული კომპრესებით' },
    desc: {
      he: 'שקיות צמחים תאילנדים חמות מעניקות ריפוי טבעי, שחרור כאבים והקלה על נוקשות שרירים.',
      en: 'Warm Thai herbal pouches provide natural relief, muscle release and deep relaxation.',
      ru: 'Тёплые тайские травяные мешочки дают естественное облегчение, снимают напряжение мышц и расслабляют.',
      ka: 'თბილი თაილანდური მცენარეული პაკეტები უზრუნველყოფენ ბუნებრივ შემსუბუქებას, კუნთების მოდუნებას და ღრმა რელაქსაციას.'
    },
    price: { he: "60 דק' – 220₾ · 90 דק' – 260₾", en: '60 min – 220₾ · 90 min – 260₾', ru: '60 мин – 220₾ · 90 мин – 260₾', ka: '60 წთ – 220₾ · 90 წთ – 260₾' }
  },

  'body-shiatsu': {
    tag: { he: '🇯🇵 Shiatsu Massage', en: '🇯🇵 Shiatsu Massage', ru: '🇯🇵 Shiatsu Massage', ka: '🇯🇵 Shiatsu Massage' },
    name: { he: 'עיסוי שיאצו יפני', en: 'Japanese Shiatsu Massage', ru: 'Японский массаж Шиацу', ka: 'იაპონური შიაცუ მასაჟი' },
    desc: {
      he: 'עיסוי ללא שמן בלחיצות לאורך מרידיאנים (קווי אנרגיה) – מאזן אנרגיה פנימית ומרגיע עומס נפשי ופיזי.',
      en: 'Oil-free pressure massage along meridians (energy lines) — balances inner energy and calms body and mind.',
      ru: 'Массаж без масла с нажатием по меридианам (энергетическим линиям) — балансирует энергию и успокаивает тело и разум.',
      ka: 'ზეთის გარეშე წერტილოვანი მასაჟი მერიდიანების (ენერგიის ხაზების) გასწვრივ — აბალანსებს ენერგიას და ამშვიდებს სხეულსა და გონებას.'
    },
    price: { he: "60 דק' – 180₾ · 90 דק' – 230₾", en: '60 min – 180₾ · 90 min – 230₾', ru: '60 мин – 180₾ · 90 мин – 230₾', ka: '60 წთ – 180₾ · 90 წთ – 230₾' }
  },

  'foot-massage': {
    tag: { he: '🦶 Thai Foot Massage', en: '🦶 Thai Foot Massage', ru: '🦶 Thai Foot Massage', ka: '🦶 Thai Foot Massage' },
    name: { he: "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי", en: 'Thai Foot Reflexology Massage', ru: 'Тайский массаж стоп (рефлексология)', ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי עמוק ועדין לכפות הרגליים עם לחיצות רפלקסולוגיות, מאזן מערכות גוף שונות.',
      en: 'Deep yet gentle foot massage with reflexology pressure, balancing different body systems.',
      ru: 'Глубокий, но мягкий массаж стоп с рефлексологией, балансирующий различные системы организма.',
      ka: 'ღრმა და ნაზი მასაჟი ტერფებზე რეფლექსოლოგიური წნევით – ასწორებს სხეულის სხვადასხვა სისტემას.'
    },
    price: { he: "30 דק' – 80₾ · 60 דק' – 120₾", en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
  }
};

const CARD_META = {
  card7: {
    name: {
      he: 'כרטיסייה של 7 טיפולים',
      en: '7-Treatment Punch Card',
      ru: 'Абонемент на 7 процедур',
      ka: '7 პროცედურის აბონემენტი'
    },
    price: {
      he: 'המחיר לפי מה שתקבע בטקסט באתר',
      en: 'Price as listed on the website',
      ru: 'Цена согласно информации на сайте',
      ka: 'ფასი — როგორც საიტზეა მითითებული'
    }
  }
};

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);

  setupLangButtons();
  setupTreatmentButtons();
  setupCardButtons();

  // ✅ סליידר hero עם וידאו (הקטע ששברת קודם) — עכשיו עובד ומעוצב
  setupHeroSlider();

  // ✅ סליידר וידיאו: אוטו-גלילה (לסליידרים מהסוג האחר, אם תוסיף)
  setupVideoSliderAutoScroll();
});
