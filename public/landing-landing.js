// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כרטיסייה לווטסאפ

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
  document.documentElement.dir =
    lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations(lang);
}

// ===== מילון טקסטים (רק הכתוביות והכפתורים) =====
const LOCAL_STRINGS = {
  he: {
    // hero
    'landing.hero.eyebrow':
      'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title':
      'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle':
      'בחר/י טיפול, קבע/י שעה נוחה ושלים/י תשלום מאובטח בכרטיס אשראי – הכול בדף אחד.',
    'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle':
      'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',
    'landing.treatment.book': 'להזמנת הטיפול',

    // booking modal
    'landing.booking.title': 'הזמנת טיפול',
    'landing.booking.summary':
      'נא לבחור טיפול מהדף, ואז למלא פרטי קשר ותאריך.',
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
    'card.details.li1':
      '7 טיפולים לבחירה מתוך תפריט הטיפולים המלא.',
    'card.details.li2':
      'אפשר לפצל בין בני משפחה / זוג / חברים.',
    'card.details.li3': 'תוקף הכרטיסייה – 6 חודשים מיום הרכישה.',
    'card.details.li4':
      'תיאום תור מראש בווטסאפ או טלפון.',
    'card.details.note':
      'לאחר התשלום תקבלו אישור רכישה למייל/ווטסאפ, והכרטיסייה תירשם על שמכם במערכת שלנו.',

    'card.form.title': 'רכישת כרטיסייה',
    'card.form.name': 'שם מלא',
    'card.form.phone': 'טלפון / WhatsApp',
    'card.form.startDate': 'תאריך התחלה מועדף (אופציונלי)',
    'card.form.notes': 'הערות / שמות נוספים בכרטיסייה',
    'card.form.note':
      'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe.',
    'card.form.payCta': 'מעבר לתשלום מאובטח'
  },

  en: {
    'landing.hero.eyebrow':
      'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title':
      'Japanese Head Spa & Thai Body Massages – Boutique Level',
    'landing.hero.subtitle':
      'Choose your treatment, pick a time and complete secure card payment – all in one page.',
    'landing.hero.cta': 'Choose treatment & book now',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle':
      'All treatments are done by professional Thai therapists, in a quiet atmosphere with relaxing music.',
    'landing.treatment.book': 'Book this treatment',

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
    'card.details.li1':
      '7 treatments to choose from our full treatment menu.',
    'card.details.li2':
      'You can share between family members / couples / friends.',
    'card.details.li3':
      'Card validity – 6 months from purchase date.',
    'card.details.li4':
      'Appointments are scheduled in advance via WhatsApp or phone.',
    'card.details.note':
      'After payment you will receive a confirmation by email/WhatsApp and the card will be registered in your name.',

    'card.form.title': 'Punch card purchase',
    'card.form.name': 'Full name',
    'card.form.phone': 'Phone / WhatsApp',
    'card.form.startDate': 'Preferred start date (optional)',
    'card.form.notes':
      'Notes / additional names on the card',
    'card.form.note':
      'Payment is processed via secure Stripe credit card.',
    'card.form.payCta': 'Proceed to secure payment'
  },

  ru: {
    'landing.hero.eyebrow':
      'Japanese Head Spa & Thai Massage – Батуми',
    'landing.hero.title':
      'Японский Head Spa и тайский массаж тела в формате бутика',
    'landing.hero.subtitle':
      'Выберите процедуру, удобное время и оплатите банковской картой на одной странице.',
    'landing.hero.cta': 'Выбрать процедуру и записаться',

    'landing.treatments.title': 'Выберите процедуру',
    'landing.treatments.subtitle':
      'Все процедуры выполняют профессиональные мастера из Таиланда, в тихой атмосфере и под расслабляющую музыку.',
    'landing.treatment.book': 'Записаться на процедуру',

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
    'card.details.li1':
      '7 процедур на выбор из полного меню.',
    'card.details.li2':
      'Можно делить между семьёй, парой или друзьями.',
    'card.details.li3':
      'Срок действия – 6 месяцев с даты покупки.',
    'card.details.li4':
      'Предварительная запись по WhatsApp или телефону.',
    'card.details.note':
      'После оплаты вы получите подтверждение по email/WhatsApp, а абонемент будет зарегистрирован на ваше имя.',

    'card.form.title': 'Покупка абонемента',
    'card.form.name': 'Полное имя',
    'card.form.phone': 'Телефон / WhatsApp',
    'card.form.startDate': 'Предпочитаемая дата начала (необязательно)',
    'card.form.notes':
      'Примечания / дополнительные имена в абонементе',
    'card.form.note':
      'Оплата проводится банковской картой через защищённый Stripe.',
    'card.form.payCta': 'Перейти к безопасной оплате'
  },

  ka: {
    'landing.hero.eyebrow':
      'Japanese Head Spa & Thai Massage – ბათუმი',
    'landing.hero.title':
      'იაპონური Head Spa და ტაილანდური მასაჟი ბუტიკურ გარემოში',
    'landing.hero.subtitle':
      'აირჩიეთ პროცედურა, დაგეგმეთ დრო და განახორციელეთ უსაფრთხო ბარათით გადახდა — ერთ გვერდზე.',
    'landing.hero.cta': 'აირჩიეთ პროცედურა და დაჯავშნეთ',

    'landing.treatments.title': 'აირჩიეთ სასურველი პროცედურა',
    'landing.treatments.subtitle':
      'ყველა პროცედურას ასრულებენ პროფესიონალი თაილანდელი თერაპევტები, მშვიდ გარემოში და დამამშვიდებელი მუსიკით.',
    'landing.treatment.book': 'დაჯავშნა',

    'landing.booking.title': 'პროცედურის დაჯავშნა',
    'landing.booking.summary':
      'გთხოვთ, პირველ რიგში აირჩიოთ პროცედურა და შემდეგ შეავსოთ საკონტაქტო ინფორმაცია და თარიღი.',
    'landing.booking.name': 'სრული სახელი',
    'landing.booking.phone': 'ტელეფონი / WhatsApp',
    'landing.booking.date': 'პროცედურის თარიღი',
    'landing.booking.time': 'პროცედურის დრო',
    'landing.booking.chooseTime': 'აირჩიეთ დრო',
    'landing.booking.duration': 'პროცედურის ხანგრძლივობა',
    'landing.booking.notes':
      'სურვილები / შენიშვნები (არასავალდებულო)',
    'landing.booking.note':
      'გადახდა ხორციელდება უსაფრთხოდ, Stripe-ის ბარათის გადახდის სისტემით. დადასტურება ავტომატურად გამოგეგზავნებათ.',
    'landing.booking.payCta': 'გადასვლა უსაფრთხო გადახდაზე',

    'card.hero.eyebrow': 'სპეციალური შეთავაზება · შეზღუდული რაოდენობა',
    'card.hero.title': '7 პროცედურის აბონემენტი',
    'card.hero.subtitle':
      'ერთხელ იხდით და 7 ვიზიტს იღებთ Bereshit Spa-ში. შეგიძლიათ შეუთავსოთ სხვადასხვა პროცედურები და გააზიარო ოჯახის წევრებთან ან მეგობრებთან.',
    'card.hero.cta': 'აბონემენტის ყიდვა',

    'card.details.title': 'რა შედის აბონემენტში?',
    'card.details.li1':
      '7 პროცედურა ჩვენი სრული მენის არჩევანიდან.',
    'card.details.li2':
      'შესაძლებელია ოჯახის, წყვილის ან მეგობრების შორის განაწილება.',
    'card.details.li3':
      'ვადა – 6 თვე შეძენის დღიდან.',
    'card.details.li4':
      'წინასწარი ჩაწერა WhatsApp-ით ან ტელეფონით.',
    'card.details.note':
      'გადახდის შემდეგ მიიღებთ დადასტურებას Email-ით/WhatsApp-ით და აბონემენტი დარეგისტრირდება თქვენს სახელზე.',

    'card.form.title': 'აბონემენტის ყიდვა',
    'card.form.name': 'სრული სახელი',
    'card.form.phone': 'ტელეფონი / WhatsApp',
    'card.form.startDate': 'სასურველი დაწყების თარიღი (არასავალდებულო)',
    'card.form.notes':
      'შენიშვნები / დამატებითი სახელები აბონემენტზე',
    'card.form.note':
      'გადახდა ხდება უსაფრთხოდ Stripe-ის ბარათის სისტემით.',
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
  he: 'שלום, אני מעוניין לקבוע טיפול ב-Bereshit Spa:\nטיפול: {TREATMENT}\nמשך: {DURATION}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en: 'Hello, I would like to book a treatment at Bereshit Spa:\nTreatment: {TREATMENT}\nDuration: {DURATION}\n\nPlease contact me to coordinate date and time.',
  ru: 'Здравствуйте! Я хочу записаться на процедуру в Bereshit Spa:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka: 'გამარჯობა, მსურს პროცედურის დაჯავშნა Bereshit Spa-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
};

const WA_TEMPLATES_CARD = {
  he: 'שלום, אני מעוניין לרכוש כרטיסייה של 7 טיפולים ב-Bereshit Spa.\nפרטים: {CARD}\nמחיר: {PRICE}\n\nאשמח שתיצרו איתי קשר להמשך.',
  en: 'Hello, I would like to purchase a 7-treatment card at Bereshit Spa.\nDetails: {CARD}\nPrice: {PRICE}\n\nPlease contact me to complete the purchase.',
  ru: 'Здравствуйте! Я хочу приобрести абонемент на 7 процедур в Bereshit Spa.\nДетали: {CARD}\nЦена: {PRICE}\n\nПожалуйста, свяжитесь со мной для оформления.',
  ka: 'გამარჯობა, მსურს 7 პროცედურის აბონემენტის შეძენა Bereshit Spa-ში.\nდეტალები: {CARD}\nფასი: {PRICE}\n\nგთხოვთ, დამიკავშირდეთ შესაძენად.'
};

// רק שמות הטיפולים וכרטיסייה – לשם ההודעה
const TREATMENTS_META = {
  'head-spa': {
    name: {
      he: 'טיפול הדגל – ספא ראש יפני',
      en: 'Signature Japanese Head Spa',
      ru: 'Фирменный Japanese Head Spa',
      ka: 'სიგნატურული იაპონური Head Spa'
    }
  },
  'facial-thai-compress': {
    name: {
      he: 'עיסוי פנים בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Facial',
      ru: 'Массаж лица с тайскими компрессами',
      ka: 'სასიამოვნო სახის მასაჟი თაილანდური კომპრესებით'
    }
  },
  'facial-hot-stone': {
    name: {
      he: 'עיסוי פנים באבנים חמות',
      en: 'Hot Stone Facial',
      ru: 'Массаж лица горячими камнями',
      ka: 'სახის მასაჟი ცხელ ქვებთან ერთად'
    }
  },
  'facial-thai': {
    name: {
      he: 'עיסוי פנים תאילנדי מסורתי',
      en: 'Traditional Thai Face Massage',
      ru: 'Традиционный тайский массаж лица',
      ka: 'ტრადიციული ტაილანდური სახის მასაჟი'
    }
  },
  'facial-aroma': {
    name: {
      he: 'עיסוי פנים ארומתרפי',
      en: 'Aromatherapy Facial',
      ru: 'Ароматерапевтический массаж лица',
      ka: 'არომატერაპიული სახის მასაჟი'
    }
  },
  'back-basic': {
    name: {
      he: 'עיסוי גב–כתפיים–צוואר',
      en: 'Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч',
      ka: 'ზურგის, კისრის და მხრების მასაჟი'
    }
  },
  'back-hot-stone': {
    name: {
      he: 'עיסוי גב–כתפיים–צוואר עם אבנים חמות',
      en: 'Hot Stone Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч горячими камнями',
      ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან'
    }
  },
  'body-thai': {
    name: {
      he: 'עיסוי תאילנדי מסורתי',
      en: 'Traditional Thai Massage',
      ru: 'Традиционный тайский массаж',
      ka: 'ტრადიციული ტაილანდური მასაჟი'
    }
  },
  'body-thai-oil': {
    name: {
      he: 'עיסוי שמן תאילנדי',
      en: 'Thai Oil Massage',
      ru: 'Тайский масляный массаж',
      ka: 'ტაილანდური ზეთოვანი მასაჟი'
    }
  },
  'body-aroma': {
    name: {
      he: 'עיסוי ארומתרפי בשמן',
      en: 'Aromatherapy Oil Massage',
      ru: 'Аромамассаж с маслом',
      ka: 'არომატერაპიული ზეთოვანი მასაჟი'
    }
  },
  'body-thai-ther': {
    name: {
      he: 'עיסוי תאילנדי רפואי',
      en: 'Thai Therapeutic Massage',
      ru: 'Тайский лечебный массаж',
      ka: 'ტაილანდური თერაპიული მასაჟი'
    }
  },
  'body-hot-stone': {
    name: {
      he: 'עיסוי באבנים חמות – גוף מלא',
      en: 'Full Body Hot Stone Massage',
      ru: 'Массаж горячими камнями всего тела',
      ka: 'მთლიანი სხეულის მასაჟი ცხელ ქვებთან'
    }
  },
  'body-thai-comp': {
    name: {
      he: 'עיסוי גוף בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Body Massage',
      ru: 'Массаж тела с тайскими травяными компрессами',
      ka: 'ტანის მასაჟი თაილანდური კომპრესებით'
    }
  },
  'body-shiatsu': {
    name: {
      he: 'עיסוי שיאצו יפני',
      en: 'Japanese Shiatsu Massage',
      ru: 'Японский массаж Шиацу',
      ka: 'იაპონური შიაცუ მასაჟი'
    }
  },
  'foot-massage': {
    name: {
      he: "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי",
      en: 'Thai Foot Reflexology Massage',
      ru: 'Тайский массаж стоп (рефлексология)',
      ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი'
    }
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
        (btn.closest('.product-card')?.querySelector('.product-title')
          ?.textContent.trim() ??
          'Treatment');

      let duration = '';
      if (group) {
        const span =
          document.querySelector(
            `input[name="${group}"]:checked + span`
          ) || null;
        if (span) duration = span.textContent.trim();
      }

      const template =
        WA_TEMPLATES_TREATMENT[lang] ||
        WA_TEMPLATES_TREATMENT.he;
      const text = template
        .replace('{TREATMENT}', treatmentName)
        .replace('{DURATION}', duration || '');

      const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(
        text
      )}`;
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

    const cardName =
      nameMap[lang] || nameMap.he || '7-Treatment Card';
    const price =
      priceMap[lang] || priceMap.he || '';

    const template =
      WA_TEMPLATES_CARD[lang] || WA_TEMPLATES_CARD.he;
    const text = template
      .replace('{CARD}', cardName)
      .replace('{PRICE}', price);

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
  });
}

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  setupLangButtons();
  setupTreatmentButtons();
  setupCardButtons();
});
