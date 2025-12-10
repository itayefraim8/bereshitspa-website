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
  applyTreatmentTexts(lang); // ✅ נוספה: תרגום כרטיסי טיפולים
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
    'card.details.li4': 'תיאום תור מראש בווטסאפ או טלפון.',
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

    'card.hero.eyebrow':
      'Специальное предложение · ограниченное число мест',
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

// רק שמות + תיאורים + מחיר לשם התרגום על הדף
const TREATMENTS_META = {
  'head-spa': {
    name: {
      he: 'טיפול הדגל – ספא ראש יפני',
      en: 'Signature Japanese Head Spa',
      ru: 'Фирменный Japanese Head Spa',
      ka: 'სიგნატურული იაპონური Head Spa'
    },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי, עיסוי קרקפת, מסכות ופינוקי מים חמימים. כולל שטיפה, מגבת חמה, סרום לקרקפת וייבוש שיער מלא.',
      en: 'Traditional Japanese ritual combining cleansing, scalp massage, masks and warm water pampering. Includes hair wash, hot towel, scalp serum and full blow-dry.',
      ru: 'Традиционный японский ритуал: очищение, массаж кожи головы, маски и тёплое водное расслабление. Включает мытьё головы, горячее полотенце, сыворотку для кожи головы и полную сушку.',
      ka: 'ტრადიციული იაპონური რიტუალი, რომელიც აერთიანებს წმენდას, თავის კანის მასაჟს, ნიღბებს და თბილ წყლის პამფერს. შეიცავს თმის დაბანას, ცხელ პირსახოცს, თავის კანის სერუმს და სრულ გამშრობას.'
    },
    price: {
      he: "60 דק' – 200₾ · 90 דק' – 250₾",
      en: '60 min – 200₾ · 90 min – 250₾',
      ru: '60 мин – 200₾ · 90 мин – 250₾',
      ka: '60 წთ – 200₾ · 90 წთ – 250₾'
    }
  },
  'facial-thai-compress': {
    name: {
      he: 'עיסוי פנים בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Facial',
      ru: 'Массаж лица с тайскими травяными компрессами',
      ka: 'სახის მასაჟი თაილანდური მცენარეულის კომპრესებით'
    },
    desc: {
      he: 'קומפרסים תאילנדים חמים מרפים את שרירי הפנים ומשפרים את זרימת הדם. כולל עיסוי פנים מעמיק, קרקפת ופלג גוף עליון.',
      en: 'Warm Thai herbal compresses relax facial muscles and improve circulation. Includes deep face massage, scalp and upper body work.',
      ru: 'Тёплые тайские травяные компрессы расслабляют мышцы лица и улучшают кровообращение. Включает глубокий массаж лица, головы и верхней части спины.',
      ka: 'თბილი თაილანდური მცენარეული კომპრესები ამშვიდებს სახის კუნთებს და აუმჯობესებს სისხლის მიმოქცევას. შეიცავს ღრმა სახის მასაჟს, თავსა და ზედა ზურგს.'
    },
    price: {
      he: "60 דק' – 150₾",
      en: '60 min – 150₾',
      ru: '60 мин – 150₾',
      ka: '60 წთ – 150₾'
    }
  },
  'facial-hot-stone': {
    name: {
      he: 'עיסוי פנים באבנים חמות',
      en: 'Hot Stone Facial',
      ru: 'Массаж лица горячими камнями',
      ka: 'სახის მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'אבני בזלת חמות נעות בעדינות על הפנים והצוואר ומשחררות מתחים. כולל עיסוי פנים, קרקפת וצוואר.',
      en: 'Warm basalt stones glide softly over the face and neck to melt tension. Includes face, scalp and neck massage.',
      ru: 'Тёплые базальтовые камни мягко скользят по лицу и шее, снимая напряжение. Включает массаж лица, кожи головы и шеи.',
      ka: 'თბილი ბაზალტის ქვები ნაზად სრიალებენ სახესა და კისერზე, ხსნიან დაძაბულობას. შეიცავს სახის, თავის კანის და კისრის მასაჟს.'
    },
    price: {
      he: "60 דק' – 160₾",
      en: '60 min – 160₾',
      ru: '60 мин – 160₾',
      ka: '60 წთ – 160₾'
    }
  },
  'facial-thai': {
    name: {
      he: 'עיסוי פנים תאילנדי מסורתי',
      en: 'Traditional Thai Face Massage',
      ru: 'Традиционный тайский массаж лица',
      ka: 'ტრადიციული ტაილანდური სახის მასაჟი'
    },
    desc: {
      he: 'עיסוי עדין עם לחיצות אנרגטיות, משחרר מתח מהפנים, הלסת והצוואר.',
      en: 'Gentle massage with energizing acupressure, releasing tension from face, jaw and neck.',
      ru: 'Мягкий массаж с энергичной акупрессурой, снимающей напряжение с лица, челюсти и шеи.',
      ka: 'მარწყვოვანი, ნაზი მასაჟი წერტილოვანი დაწოლებით – ხსნის დაძაბულობას სახიდან, ყბიდან და კისრიდან.'
    },
    price: {
      he: "30 דק' – 90₾ · 60 דק' – 150₾",
      en: '30 min – 90₾ · 60 min – 150₾',
      ru: '30 мин – 90₾ · 60 мин – 150₾',
      ka: '30 წთ – 90₾ · 60 წთ – 150₾'
    }
  },
  'facial-aroma': {
    name: {
      he: 'עיסוי פנים ארומתרפי',
      en: 'Aromatherapy Facial',
      ru: 'Ароматерапевтический массаж лица',
      ka: 'არომატერაპიული სახის მასაჟი'
    },
    desc: {
      he: 'טיפול עדין עם שמנים אתריים טהורים, מרגיע את מערכת העצבים ומעניק זוהר לעור.',
      en: 'Delicate treatment with pure essential oils that calms the nervous system and adds glow to the skin.',
      ru: 'Нежная процедура с натуральными эфирными маслами, успокаивающая нервную систему и придающая коже сияние.',
      ka: 'ნაზი პროცედურა სუფთა ეთერზეთებით – ამშვიდებს ნერვულ სისტემას და ანიჭებს კანს ბზინვარებას.'
    },
    price: {
      he: "30 דק' – 80₾ · 60 דק' – 140₾",
      en: '30 min – 80₾ · 60 min – 140₾',
      ru: '30 мин – 80₾ · 60 мин – 140₾',
      ka: '30 წთ – 80₾ · 60 წთ – 140₾'
    }
  },
  'back-basic': {
    name: {
      he: 'עיסוי גב–כתפיים–צוואר',
      en: 'Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч',
      ka: 'ზურგის, კისრის და მხრების მასაჟი'
    },
    desc: {
      he: 'עיסוי ממוקד לשחרור מתחים באזורי העומס המרכזיים – מתאים לישיבה ממושכת.',
      en: 'Focused massage to release tension in the main stress areas – ideal for long hours of sitting.',
      ru: 'Прицельный массаж для снятия напряжения в основных зонах нагрузки – идеален для тех, кто много сидит.',
      ka: 'მიზანმიმართული მასაჟი, რომელიც ხსნის დაძაბულობას უმთავრეს დატვირთულ ზონებში – შესაფერისია ხანგრძლივი ჯდომისთვის.'
    },
    price: {
      he: "60 דק' – 150₾",
      en: '60 min – 150₾',
      ru: '60 мин – 150₾',
      ka: '60 წთ – 150₾'
    }
  },
  'back-hot-stone': {
    name: {
      he: 'עיסוי גב–כתפיים–צוואר עם אבנים חמות',
      en: 'Hot Stone Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч горячими камнями',
      ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'אבני בזלת חמות חודרות לשרירים וממיסות מתחים עמוקים, בשילוב עיסוי ידני עמוק.',
      en: 'Warm basalt stones penetrate the muscles and melt deep tension, combined with deep manual massage.',
      ru: 'Тёплые базальтовые камни глубоко прогревают мышцы и снимают глубокие зажимы в сочетании с ручным массажем.',
      ka: 'თბილი ბაზალტის ქვები ღრმად აღწევს კუნთებში და ხსნის ღრმა დაძაბულობას ღრმა მანუალური მასაჟის კომბინაციით.'
    },
    price: {
      he: "60 דק' – 180₾",
      en: '60 min – 180₾',
      ru: '60 мин – 180₾',
      ka: '60 წთ – 180₾'
    }
  },
  'body-thai': {
    name: {
      he: 'עיסוי תאילנדי מסורתי',
      en: 'Traditional Thai Massage',
      ru: 'Традиционный тайский массаж',
      ka: 'ტრადიციული ტაილანდური მასაჟი'
    },
    desc: {
      he: 'טיפול עתיק ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה.',
      en: 'Ancient oil-free treatment with pressure, stretches and work on energy lines.',
      ru: 'Древняя процедура без масла с надавливаниями, растяжками и работой по энергетическим линиям.',
      ka: 'უძველესი პროცედურა ზეთის გარეშე – წერტილოვანი დაწოლა, გაჭიმვები და ენერგეტიკულ ხაზებზე მუშაობა.'
    },
    price: {
      he: "60 דק' – 170₾ · 90 דק' – 220₾",
      en: '60 min – 170₾ · 90 min – 220₾',
      ru: '60 мин – 170₾ · 90 мин – 220₾',
      ka: '60 წთ – 170₾ · 90 წთ – 220₾'
    }
  },
  'body-thai-oil': {
    name: {
      he: 'עיסוי שמן תאילנדי',
      en: 'Thai Oil Massage',
      ru: 'Тайский масляный массаж',
      ka: 'ტაილანდური ზეთოვანი მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא בשמן חם בתנועות זורמות ועמוקות, לשחרור עומס שרירי.',
      en: 'Full-body massage with warm oil, combining flowing and deeper strokes to release muscular tension.',
      ru: 'Массаж всего тела тёплым маслом с плавными и глубокими приёмами для снятия мышечного напряжения.',
      ka: 'მთლიანი სხეულის მასაჟი თბილი ზეთით – ნაზი და ღრმა მოძრაობების კომბინაცია კუნთოვანი დაძაბულობის მოსახსნელად.'
    },
    price: {
      he: "60 דק' – 180₾ · 90 דק' – 230₾",
      en: '60 min – 180₾ · 90 min – 230₾',
      ru: '60 мин – 180₾ · 90 мин – 230₾',
      ka: '60 წთ – 180₾ · 90 წთ – 230₾'
    }
  },
  'body-aroma': {
    name: {
      he: 'עיסוי ארומתרפי בשמן',
      en: 'Aromatherapy Oil Massage',
      ru: 'Аромамассаж с маслом',
      ka: 'არომატერაპიული ზეთოვანი მასაჟი'
    },
    desc: {
      he: 'שמנים אתריים טהורים בשילוב עיסוי גוף מרגיע ומלטף.',
      en: 'Pure essential oils combined with a soothing, flowing full-body massage.',
      ru: 'Натуральные эфирные масла в сочетании с мягким расслабляющим массажем всего тела.',
      ka: 'სუფთა ეთერზეთები და დამამშვიდებელი, მოლივლივე სხეულის მასაჟი.'
    },
    price: {
      he: "60 דק' – 190₾",
      en: '60 min – 190₾',
      ru: '60 мин – 190₾',
      ka: '60 წთ – 190₾'
    }
  },
  'body-thai-ther': {
    name: {
      he: 'עיסוי תאילנדי רפואי',
      en: 'Thai Therapeutic Massage',
      ru: 'Тайский лечебный массаж',
      ka: 'ტაილანდური თერაპიული მასაჟი'
    },
    desc: {
      he: 'עיסוי טיפולי עמוק עם לחיצות ממוקדות ומתיחות מדויקות – מתאים לכאבי גב וצוואר.',
      en: 'Deep therapeutic massage with focused pressure and precise stretches – ideal for back and neck issues.',
      ru: 'Глубокий лечебный массаж с прицельными надавливаниями и точными растяжками – подходит при болях в спине и шее.',
      ka: 'ღრმა თერაპიული მასაჟი მიზანმიმართული წნევით და ზუსტი გაჭიმვებით – რეკომენდებულია ზურგისა და კისრის ტკივილებზე.'
    },
    price: {
      he: "60 דק' – 230₾ · 90 דק' – 280₾",
      en: '60 min – 230₾ · 90 min – 280₾',
      ru: '60 мин – 230₾ · 90 мин – 280₾',
      ka: '60 წთ – 230₾ · 90 წთ – 280₾'
    }
  },
  'body-hot-stone': {
    name: {
      he: 'עיסוי באבנים חמות – גוף מלא',
      en: 'Full Body Hot Stone Massage',
      ru: 'Массаж горячими камнями всего тела',
      ka: 'მთლიანი სხეულის მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'אבני בזלת חמות מחליקות על הגוף וממיסות מתחים עמוקים – רוגע עמוק וזרימת דם טובה.',
      en: 'Warm basalt stones glide along the whole body, melting deep tension and improving circulation.',
      ru: 'Тёплые базальтовые камни скользят по всему телу, снимая глубокие напряжения и улучшая кровообращение.',
      ka: 'თბილი ბაზალტის ქვები სრიალებენ მთელ სხეულზე, ხსნიან ღრმა დაძაბულობას და აუმჯობესებენ სისხლის მიმოქცევას.'
    },
    price: {
      he: "60 דק' – 210₾",
      en: '60 min – 210₾',
      ru: '60 мин – 210₾',
      ka: '60 წთ – 210₾'
    }
  },
  'body-thai-comp': {
    name: {
      he: 'עיסוי גוף בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Body Massage',
      ru: 'Массаж тела с тайскими травяными компрессами',
      ka: 'ტანის მასაჟი თაილანდური მცენარეული კომპრესებით'
    },
    desc: {
      he: 'שקיות צמחים תאילנדים חמות מעניקות ריפוי טבעי, ניקוז עומק והקלה על כאבים.',
      en: 'Warm Thai herbal pouches provide natural healing, deep drainage and pain relief.',
      ru: 'Тёплые тайские травяные мешочки обеспечивают естественное восстановление, дренаж и облегчение боли.',
      ka: 'თბილი თაილანდური მცენარეული პაკეტები უზრუნველყოფენ ბუნებრივ განსაჯანსაღებლობას, ღრმა დრენაჟს და ტკივილის შემსუბუქებას.'
    },
    price: {
      he: "60 דק' – 220₾ · 90 דק' – 260₾",
      en: '60 min – 220₾ · 90 min – 260₾',
      ru: '60 мин – 220₾ · 90 мин – 260₾',
      ka: '60 წთ – 220₾ · 90 წთ – 260₾'
    }
  },
  'body-shiatsu': {
    name: {
      he: 'עיסוי שיאצו יפני',
      en: 'Japanese Shiatsu Massage',
      ru: 'Японский массаж Шиацу',
      ka: 'იაპონური შიაცუ მასაჟი'
    },
    desc: {
      he: 'עיסוי ללא שמן בלחיצות לאורך מרידיאנים – מאזן אנרגיה פנימית ומרגיע עומס נפשי.',
      en: 'Oil-free pressure massage along meridians – balances inner energy and calms the mind.',
      ru: 'Массаж без масла с нажатием по меридианам – уравновешивает внутреннюю энергию и успокаивает психику.',
      ka: 'ზეთის გარეშე წერტილოვანი მასაჟი მერიდიანების გასწვრივ – აბალანსებს შიდა ენერგიას და ამშვიდებს გონებას.'
    },
    price: {
      he: "60 דק' – 180₾ · 90 דק' – 230₾",
      en: '60 min – 180₾ · 90 min – 230₾',
      ru: '60 мин – 180₾ · 90 мин – 230₾',
      ka: '60 წთ – 180₾ · 90 წთ – 230₾'
    }
  },
  'foot-massage': {
    name: {
      he: "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי",
      en: 'Thai Foot Reflexology Massage',
      ru: 'Тайский массаж стоп (рефлексология)',
      ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი'
    },
    desc: {
      he: 'עיסוי עמוק ועדין לכפות הרגליים עם לחיצות רפלקסולוגיות, מאזן מערכות גוף שונות.',
      en: 'Deep yet gentle foot massage with reflexology pressure, balancing different body systems.',
      ru: 'Глубокий, но мягкий массаж стоп с рефлексологией, балансирующий различные системы организма.',
      ka: 'ღრმა და ნაზი მასაჟი ტერფებზე რეფლექსოლოგიური წნევით – ასწორებს სხეულის სხვადასხვა სისტემას.'
    },
    price: {
      he: "30 דק' – 80₾ · 60 דק' – 120₾",
      en: '30 min – 80₾ · 60 min – 120₾',
      ru: '30 мин – 80₾ · 60 мин – 120₾',
      ka: '30 წთ – 80₾ · 60 წთ – 120₾'
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

// ===== תרגום כרטיסי הטיפולים על הדף =====
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

    const titleEl = card.querySelector('.product-title');
    if (titleEl && nameMap) {
      titleEl.textContent =
        nameMap[lang] || nameMap.he || titleEl.textContent;
    }

    const descEl = card.querySelector('p:not(.price)');
    if (descEl && descMap) {
      descEl.textContent =
        descMap[lang] || descMap.he || descEl.textContent;
    }

    const priceEl = card.querySelector('.price');
    if (priceEl && priceMap) {
      priceEl.textContent =
        priceMap[lang] || priceMap.he || priceEl.textContent;
    }
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
