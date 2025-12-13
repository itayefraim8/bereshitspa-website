// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כרטיסייה לווטסאפ

const WHATSAPP_NUMBER = '972502686862';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const SUPPORTED_LANGS = new Set(['he', 'en', 'ru', 'ka']);

// ===== עזרי שפה =====
function getLang() {
  const stored = localStorage.getItem('site_lang');
  if (stored && SUPPORTED_LANGS.has(stored.slice(0, 2))) return stored.slice(0, 2);

  // ✅ ברירת מחדל: עברית (כדי שלא יתחיל באנגלית)
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
  applyDurationLabels(lang); // ✅ חדש: תרגום 30/60/90 דקות לכל השפות
}

// ===== מילון טקסטים =====
const LOCAL_STRINGS = {
  he: {
    // hero
    'landing.hero.eyebrow': 'ספא ראש יפני ועיסוי תאילנדי – בטומי',
    'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle': 'בחר/י טיפול, קבע/י שעה נוחה ותאם/י את ההזמנה בקלות בווטסאפ או בטלפון – הכול בדף אחד.',
    'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle': 'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',
    'landing.treatment.book': 'להזמנת הטיפול',

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
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title': 'Japanese Head Spa & Thai Body Massages – Boutique Level',
    'landing.hero.subtitle': 'Choose your treatment, pick a time, and confirm easily via WhatsApp or phone – all in one page.',
    'landing.hero.cta': 'Choose treatment & book now',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle': 'All treatments are done by professional Thai therapists, in a quiet atmosphere with relaxing music.',
    'landing.treatment.book': 'Book this treatment',

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
    // ✅ תיקון: שלא יישאר "Japanese Head Spa" באנגלית
    'landing.hero.eyebrow': 'Японский Head Spa и тайский массаж — Батуми',
    'landing.hero.title': 'Японский Head Spa и тайский массаж тела в формате бутика',
    'landing.hero.subtitle': 'Выберите процедуру, удобное время и подтвердите запись через WhatsApp или по телефону — всё на одной странице.',
    'landing.hero.cta': 'Выбрать процедуру и записаться',

    'landing.treatments.title': 'Выберите процедуру',
    'landing.treatments.subtitle': 'Все процедуры выполняют профессиональные мастера из Таиланда, в тихой атмосфере и под расслабляющую музыку.',
    'landing.treatment.book': 'Записаться на процедуру',

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
    'landing.hero.eyebrow': 'იაპონური Head Spa და ტაილანდური მასაჟი — ბათუმი',
    'landing.hero.title': 'იაპონური Head Spa და ტაილანდური მასაჟი ბუტიკურ გარემოში',
    'landing.hero.subtitle': 'აირჩიეთ პროცედურა, დრო და მარტივად დაადასტურეთ WhatsApp-ით ან ტელეფონით — ერთ გვერდზე.',
    'landing.hero.cta': 'აირჩიეთ პროცედურა და დაჯავშნეთ',

    'landing.treatments.title': 'აირჩიეთ სასურველი პროცედურა',
    'landing.treatments.subtitle': 'ყველა პროცედურას ასრულებენ პროფესიონალი თაილანდელი თერაპევტები, მშვიდ გარემოში და დამამშვიდებელი მუსიკით.',
    'landing.treatment.book': 'დაჯავშნა',

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
}

// ===== ווטסאפ – טקסטים להודעה =====
const WA_TEMPLATES_TREATMENT = {
  he: 'שלום, אני מעוניין לקבוע טיפול ב-Bereshit Spa:\nטיפול: {TREATMENT}\nמשך: {DURATION}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en: 'Hello, I would like to book a treatment at Bereshit Spa:\nTreatment: {TREATMENT}\nDuration: {DURATION}\n\nPlease contact me to coordinate date and time.',
  ru: 'Здравствуйте! Я хочу записаться на процедуру в Bereshit Spa:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka: 'გამარჯობა, მსურს პროცედურის დაჯავშნა Bereshit Spa-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
};

// ✅ נשאר אופציונלי, לא מפריע אם אין כרטיסייה ב-HTML
const WA_TEMPLATES_CARD = {
  he: 'שלום, אני מעוניין לרכוש כרטיסייה של 7 טיפולים ב-Bereshit Spa.\nפרטים: {CARD}\nמחיר: {PRICE}\n\nאשמח שתיצרו איתי קשר להמשך.',
  en: 'Hello, I would like to purchase a 7-treatment card at Bereshit Spa.\nDetails: {CARD}\nPrice: {PRICE}\n\nPlease contact me to complete the purchase.',
  ru: 'Здравствуйте! Я хочу приобрести абонемент на 7 процедур в Bereshit Spa.\nДетали: {CARD}\nЦена: {PRICE}\n\nПожалуйста, свяжитесь со мной для оформления.',
  ka: 'გამარჯობა, მსურს 7 პროცედურის აბონემენტის შეძენა Bereshit Spa-ში.\nდეტალები: {CARD}\nფასი: {PRICE}\n\nგთხოვთ, დამიკავშირდეთ შესაძენად.'
};

// ✅ תרגום יחידת דקות + פורמט תצוגה
const DURATION_I18N = {
  he: { unit: "דק'", fmt: (m) => `${m} דק'` },
  en: { unit: 'min', fmt: (m) => `${m} min` },
  ru: { unit: 'мин', fmt: (m) => `${m} мин` },
  ka: { unit: 'წთ', fmt: (m) => `${m} წთ` }
};

// ✅ שמות + תיאורים + מחיר + תג (כדי לתרגם גם tag)
const TREATMENTS_META = {
  'head-spa': {
    tag: {
      he: '👑 ספא ראש יפני',
      en: '👑 Japanese Head Spa',
      ru: '👑 Японский Head Spa',
      ka: '👑 იაპონური Head Spa'
    },
    name: {
      he: 'טיפול הדגל – ספא ראש יפני',
      en: 'Signature Japanese Head Spa',
      ru: 'Фирменный японский Head Spa',
      ka: 'სიგნატურული იაპონური Head Spa'
    },
    desc: {
      he: 'עיסוי יפני מסורתי המשלב ניקוי, עיסוי קרקפת, מסכות ופינוקי מים חמימים. הטכניקה ממריצה את זרימת הדם, מחזקת את שורשי השיער ומרגיעה עומקים. כולל שטיפה, מגבת חמה, סרום לקרקפת וייבוש שיער מלא. מסיים במנוחה קצרה עם תה וניחוח ארומטי עדין. (90 דק׳ כולל עיסוי ידיים ורגליים)',
      en: 'Traditional Japanese head ritual combining cleansing, scalp massage, masks and warm water pampering. Boosts circulation, supports hair roots and deeply relaxes. Includes wash, hot towel, scalp serum and full blow-dry. Ends with a short rest with tea and a gentle aromatic scent. (90 min includes hand & foot massage)',
      ru: 'Традиционный японский ритуал для головы: очищение, массаж кожи головы, маски и тёплая водная терапия. Улучшает кровообращение, укрепляет корни волос и глубоко расслабляет. Включает мытьё, горячее полотенце, сыворотку и полную сушку. Завершается отдыхом с чаем и лёгким ароматом. (90 мин включает массаж рук и ног)',
      ka: 'ტრადიციული იაპონური Head Spa რიტუალი: წმენდა, თავის კანის მასაჟი, ნიღბები და თბილი წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ღრმად ამშვიდებს. მოიცავს დაბანას, ცხელ პირსახოცს, სერუმს და სრულ გაშრობას. სრულდება მოკლე დასვენებით ჩაით და ნაზი არომატით. (90 წთ მოიცავს ხელებისა და ფეხების მასაჟს)'
    },
    price: {
      he: "60 דק' – 200₾ · 90 דק' – 250₾",
      en: '60 min – 200₾ · 90 min – 250₾',
      ru: '60 мин – 200₾ · 90 мин – 250₾',
      ka: '60 წთ – 200₾ · 90 წთ – 250₾'
    }
  },

  'facial-thai-compress': {
    tag: {
      he: '🌼 קומפרסים תאילנדיים לפנים',
      en: '🌼 Thai Herbal Compress Facial',
      ru: '🌼 Травяные компрессы (лицо)',
      ka: '🌼 მცენარეული კომპრესი (სახე)'
    },
    name: {
      he: 'עיסוי פנים בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Facial',
      ru: 'Массаж лица с тайскими травяными компрессами',
      ka: 'სახის მასაჟი თაილანდური მცენარეულის კომპრესებით'
    },
    desc: {
      he: 'קומפרסים תאילנדיים חמים מרפים את שרירי הפנים ומשפרים את זרימת הדם. החום מעודד ספיגת לחות ומעניק לעור תחושת רכות והתחדשות טבעית. כולל עיסוי פנים מעמיק, עיסוי קרקפת מרגיע ועבודה על פלג גוף עליון. טיפול חמים, מפנק ועוטף שמעניק רוגע עמוק.',
      en: 'Warm Thai herbal compresses relax facial muscles and improve circulation. The heat supports moisture absorption and leaves the skin soft and naturally renewed. Includes deep face massage, calming scalp massage and upper-body work. A warm, cocooning treatment for deep relaxation.',
      ru: 'Тёплые тайские травяные компрессы расслабляют мышцы лица и улучшают кровообращение. Тепло способствует увлажнению и дарит коже мягкость и естественное обновление. Включает глубокий массаж лица, расслабляющий массаж головы и работу с верхней частью тела. Тёплая, обволакивающая процедура для глубокого спокойствия.',
      ka: 'თბილი თაილანდური მცენარეული კომპრესები ამშვიდებს სახის კუნთებს და აუმჯობესებს სისხლის მიმოქცევას. სითბო ხელს უწყობს ტენიანობის უკეთ შეწოვას და აძლევს კანს რბილობასა და ბუნებრივ განახლებას. მოიცავს ღრმა სახის მასაჟს, დამამშვიდებელ თავის კანის მასაჟს და ზედა სხეულზე მუშაობას. თბილი, შემომხვევი პროცედურა ღრმა რელაქსაციისთვის.'
    },
    price: { he: "60 דק' – 150₾", en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'facial-hot-stone': {
    tag: {
      he: '🔥 אבנים חמות לפנים',
      en: '🔥 Hot Stone Facial',
      ru: '🔥 Горячие камни (лицо)',
      ka: '🔥 ცხელი ქვები (სახე)'
    },
    name: { he: 'עיסוי פנים באבנים חמות', en: 'Hot Stone Facial', ru: 'Массаж лица горячими камнями', ka: 'სახის მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'אבני בזלת חמות נעות בעדינות על הפנים והצוואר ומשחררות מתחים. כולל עיסוי פנים, קרקפת, צוואר ופלג גוף עליון. החום משפר זרימת דם, מרכך שרירים ומעניק שחרור עמוק. מתאים במיוחד לעומס נפשי ועייפות באזור הראש.',
      en: 'Warm basalt stones glide gently over the face and neck, releasing tension. Includes face, scalp, neck and upper-body massage. Heat improves circulation, softens muscles and provides deep release—especially helpful for mental stress and head fatigue.',
      ru: 'Тёплые базальтовые камни мягко проходят по лицу и шее, снимая напряжение. Включает массаж лица, головы, шеи и верхней части тела. Тепло улучшает кровообращение, смягчает мышцы и даёт глубокое расслабление—особенно при стрессе и усталости в области головы.',
      ka: 'თბილი ბაზალტის ქვები ნაზად მოძრაობენ სახესა და კისერზე და ხსნიან დაძაბულობას. მოიცავს სახის, თავის კანის, კისრის და ზედა სხეულის მასაჟს. სითბო აუმჯობესებს სისხლის მიმოქცევას, არბილებს კუნთებს და იძლევა ღრმა განტვირთვას — განსაკუთრებით გონებრივი დატვირთვისა და თავის არეში დაღლილობისას.'
    },
    price: { he: "60 דק' – 160₾", en: '60 min – 160₾', ru: '60 мин – 160₾', ka: '60 წთ – 160₾' }
  },

  'facial-thai': {
    tag: {
      he: '🌺 עיסוי פנים תאילנדי',
      en: '🌺 Traditional Thai Face Massage',
      ru: '🌺 Тайский массаж лица',
      ka: '🌺 ტაილანდური სახის მასაჟი'
    },
    name: { he: 'עיסוי פנים תאילנדי מסורתי', en: 'Traditional Thai Face Massage', ru: 'Традиционный тайский массаж лица', ka: 'ტრადიციული ტაილანდური სახის მასაჟი' },
    desc: {
      he: 'עיסוי עדין המבוסס על טכניקות תאילנדיות עתיקות ולחיצות אנרגטיות. משחרר מתח מהפנים, הלסת והצוואר. בגרסת 60 דקות כולל גם עיסוי כתפיים ופלג גוף עליון. מעודד רגיעה, זרימה ואיזון עצבי עמוק.',
      en: 'Gentle massage based on ancient Thai techniques and energizing acupressure. Releases tension from the face, jaw and neck. The 60-minute version also includes shoulders and upper body. Encourages calm, flow and deep nervous-system balance.',
      ru: 'Нежный массаж на основе древних тайских техник и энергетической акупрессуры. Снимает напряжение с лица, челюсти и шеи. Версия на 60 минут также включает плечи и верхнюю часть тела. Способствует расслаблению, «течению» и глубокому балансу нервной системы.',
      ka: 'ნაზი მასაჟი ძველი ტაილანდური ტექნიკებით და ენერგიული წერტილოვანი დაწოლით. ხსნის დაძაბულობას სახიდან, ყბიდან და კისრიდან. 60-წუთიანი ვერსია დამატებით მოიცავს მხრებსა და ზედა სხეულს. ხელს უწყობს რელაქსაციას, ნაკადს და ნერვული სისტემის ღრმა ბალანსს.'
    },
    price: { he: "30 דק' – 90₾ · 60 דק' – 150₾", en: '30 min – 90₾ · 60 min – 150₾', ru: '30 мин – 90₾ · 60 мин – 150₾', ka: '30 წთ – 90₾ · 60 წთ – 150₾' }
  },

  'facial-aroma': {
    tag: {
      he: '🌿 ארומתרפיה לפנים',
      en: '🌿 Aromatherapy Facial',
      ru: '🌿 Арома-массаж (лицо)',
      ka: '🌿 არომათერაპია (სახე)'
    },
    name: { he: 'עיסוי פנים ארומתרפי', en: 'Aromatherapy Facial', ru: 'Ароматерапевтический массаж лица', ka: 'არომატერაპიული სახის მასაჟი' },
    desc: {
      he: 'טיפול עדין עם שמנים אתריים טהורים המותאמים לנשימה ולעור הפנים. מרגיע את מערכת העצבים ומשפר את זרימת הדם בעור. בגרסת 60 דקות כולל עיסוי כתפיים עמוק וקרקפת מורחבת. מעניק תחושת רכות, זוהר ואיזון רגשי עמוק.',
      en: 'A delicate treatment with pure essential oils tailored for breathing and facial skin. Calms the nervous system and improves circulation in the skin. The 60-minute version includes deep shoulder work and extended scalp massage. Leaves you soft, glowing and emotionally balanced.',
      ru: 'Нежная процедура с чистыми эфирными маслами, подобранными для дыхания и кожи лица. Успокаивает нервную систему и улучшает кровообращение в коже. Версия на 60 минут включает глубокий массаж плеч и расширенный массаж головы. Дарит мягкость, сияние и глубокий эмоциональный баланс.',
      ka: 'ნაზი პროცედურა სუფთა ეთერზეთებით, რომლებიც მორგებულია სუნთქვასა და სახის კანს. ამშვიდებს ნერვულ სისტემას და აუმჯობესებს სისხლის მიმოქცევას კანში. 60-წუთიანი ვერსია მოიცავს ღრმა მხრების მასაჟს და გაფართოებულ თავის კანის მასაჟს. ანიჭებს რბილობას, ბზინვარებას და ღრმა ემოციურ ბალანსს.'
    },
    price: { he: "30 דק' – 80₾ · 60 דק' – 140₾", en: '30 min – 80₾ · 60 min – 140₾', ru: '30 мин – 80₾ · 60 мин – 140₾', ka: '30 წთ – 80₾ · 60 წთ – 140₾' }
  },

  'back-basic': {
    tag: {
      he: '💆‍♂️ גב–צוואר–כתפיים',
      en: '💆‍♂️ Back–Neck–Shoulders',
      ru: '💆‍♂️ Спина–шея–плечи',
      ka: '💆‍♂️ ზურგი–კისერი–მხრები'
    },
    name: { he: 'עיסוי גב–כתפיים–צוואר', en: 'Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч', ka: 'ზურგის, კისრის და მხრების მასაჟი' },
    desc: {
      he: 'עיסוי ממוקד לשחרור מתחים וחסימות באזורי העומס המרכזיים. משחרר שרירים תפוסים ומחזיר גמישות ותנועתיות טבעית. כולל לחיצות עמוקות ותנועות ארוכות לשחרור מדויק ומיידי. מומלץ לכאבי צוואר, ישיבה ממושכת ועומס יומיומי.',
      en: 'Focused massage to release tension and blockages in key stress areas. Loosens tight muscles and restores natural flexibility and mobility. Includes deep pressure and long strokes for precise, immediate relief. Recommended for neck pain, long sitting and daily load.',
      ru: 'Прицельный массаж для снятия напряжения и блоков в основных зонах нагрузки. Расслабляет зажатые мышцы и возвращает естественную гибкость и подвижность. Включает глубокие надавливания и длинные движения для точного и быстрого облегчения. Рекомендуется при боли в шее, длительном сидении и ежедневной нагрузке.',
      ka: 'მიზანმიმართული მასაჟი დაძაბულობისა და ბლოკების მოსახსნელად დატვირთულ ზონებში. ათავისუფლებს დაჭიმულ კუნთებს და აბრუნებს ბუნებრივ მოქნილობასა და მოძრაობას. მოიცავს ღრმა წნევას და გრძელ მოძრაობებს სწრაფი, ზუსტი განტვირთვისთვის. რეკომენდებულია კისრის ტკივილის, ხანგრძლივი ჯდომისა და ყოველდღიური დატვირთვისას.'
    },
    price: { he: "60 דק' – 150₾", en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: {
      he: '🔥 אבנים חמות לגב',
      en: '🔥 Hot Stone Back Massage',
      ru: '🔥 Горячие камни (спина)',
      ka: '🔥 ცხელი ქვები (ზურგი)'
    },
    name: { he: 'עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'אבני בזלת חמות חודרות לשרירים וממיסות מתחים עמוקים. החום מאפשר עבודה יעילה ובטוחה על אזורי עומס וכאב כרוני. משלב עיסוי ידני מעמיק ליצירת הרפיה מלאה של פלג הגוף העליון. מומלץ לעומס חוזר, כאבים כרוניים ומתח נפשי.',
      en: 'Warm basalt stones penetrate the muscles and melt deep tension. Heat allows effective, safe work on chronic pain and overload areas. Combined with deep manual massage for complete upper-body relaxation. Recommended for recurring load, chronic pain and mental stress.',
      ru: 'Тёплые базальтовые камни глубоко прогревают мышцы и снимают глубокие зажимы. Тепло позволяет эффективно и безопасно работать с зонами хронической боли и перегрузки. В сочетании с глубоким ручным массажем обеспечивает полное расслабление верхней части тела. Рекомендуется при повторяющихся нагрузках, хронических болях и стрессе.',
      ka: 'თბილი ბაზალტის ქვები ღრმად ათბობს კუნთებს და ხსნის ღრმა დაძაბულობას. სითბო საშუალებას იძლევა ეფექტურად და უსაფრთხოდ ვიმუშაოთ ქრონიკული ტკივილისა და გადატვირთვის ზონებზე. ერთიანდება ღრმა მანუალურ მასაჟთან ზედა სხეულის სრული რელაქსაციისთვის. რეკომენდებულია განმეორებადი დატვირთვის, ქრონიკული ტკივილისა და სტრესისას.'
    },
    price: { he: "60 דק' – 180₾", en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  'body-thai': {
    tag: {
      he: '🇹🇭 עיסוי תאילנדי מסורתי',
      en: '🇹🇭 Traditional Thai Massage',
      ru: '🇹🇭 Традиционный тайский массаж',
      ka: '🇹🇭 ტრადიციული ტაილანდური'
    },
    name: { he: 'עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nטיפול עתיק ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה (Sen). משפר גמישות, מפיג עומס ומחזיר תנועה חופשית לגוף. הטכניקה מעוררת זרימה אנרגטית ומעניקה חיוניות עמוקה.",
      en: "Full-body massage from feet to head, including face massage.\nAncient oil-free treatment combining pressure, stretches and work on energy lines (Sen). Improves flexibility, relieves load and restores free movement. Awakens energy flow and brings deep vitality.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nДревняя процедура без масла: надавливания, растяжки и работа по энергетическим линиям (Sen). Улучшает гибкость, снимает нагрузку и возвращает свободное движение. Активирует энергетический поток и дарит глубокую жизненную силу.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nუძველესი პროცედურა ზეთის გარეშე: წნევა, გაჭიმვები და ენერგეტიკულ ხაზებზე (Sen) მუშაობა. აუმჯობესებს მოქნილობას, ხსნის დატვირთვას და აბრუნებს თავისუფალ მოძრაობას. ააქტიურებს ენერგიის ნაკადს და აძლევს ღრმა სიცოცხლისუნარიანობას."
    },
    price: { he: "60 דק' – 170₾ · 90 דק' – 220₾", en: '60 min – 170₾ · 90 min – 220₾', ru: '60 мин – 170₾ · 90 мин – 220₾', ka: '60 წთ – 170₾ · 90 წთ – 220₾' }
  },

  'body-thai-oil': {
    tag: {
      he: '🇹🇭 עיסוי שמן תאילנדי',
      en: '🇹🇭 Thai Oil Massage',
      ru: '🇹🇭 Тайский масляный',
      ka: '🇹🇭 ზეთოვანი მასაჟი'
    },
    name: { he: 'עיסוי שמן תאילנדי', en: 'Thai Oil Massage', ru: 'Тайский масляный массаж', ka: 'ტაილანდური ზეთოვანი მასაჟი' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nעיסוי גוף מלא בשמן חם בתנועות זורמות ועמוקות. משלב לחיצות תאילנדיות להמסה של מתח ועומס שרירי. מאזן את מערכת העצבים ומשרה רוגע מפנק בכל הגוף.",
      en: "Full-body massage from feet to head, including face massage.\nFull-body warm-oil massage with flowing and deeper strokes. Includes Thai pressure to melt tension and muscular load. Balances the nervous system and brings soothing relaxation throughout the body.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nМассаж всего тела тёплым маслом: плавные и глубокие движения. С тайскими надавливаниями для снятия напряжения и мышечной нагрузки. Балансирует нервную систему и дарит расслабление всему телу.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nთბილი ზეთით მთლიანი სხეულის მასაჟი — ნაზი და ღრმა მოძრაობებით. შეიცავს ტაილანდურ წნევას დაძაბულობისა და კუნთოვანი დატვირთვის მოსახსნელად. აბალანსებს ნერვულ სისტემას და აძლევს სხეულს სრულ რელაქსაციას."
    },
    price: { he: "60 דק' – 180₾ · 90 דק' – 230₾", en: '60 min – 180₾ · 90 min – 230₾', ru: '60 мин – 180₾ · 90 мин – 230₾', ka: '60 წთ – 180₾ · 90 წთ – 230₾' }
  },

  'body-aroma': {
    tag: {
      he: '🌿 עיסוי ארומתרפי',
      en: '🌿 Aromatherapy Oil Massage',
      ru: '🌿 Арома-массаж',
      ka: '🌿 არომა მასაჟი'
    },
    name: { he: 'עיסוי ארומתרפי בשמן', en: 'Aromatherapy Oil Massage', ru: 'Аромамассаж с маслом', ka: 'არომატერაპიული ზეთოვანი მასაჟი' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nשמנים אתריים טהורים בשילוב עיסוי גוף מרגיע ומלטף. הריחות הטבעיים מאזנים את מערכת העצבים ומפחיתים מתחים. התנועות האיטיות מרפות עומס שרירי ויוצרות תחושת שלווה עמוקה.",
      en: "Full-body massage from feet to head, including face massage.\nPure essential oils combined with a soothing, flowing body massage. Natural aromas balance the nervous system and reduce stress. Slow movements release muscular load and create deep peace.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nЧистые эфирные масла и мягкий расслабляющий массаж. Природные ароматы балансируют нервную систему и снижают стресс. Медленные движения снимают мышечную нагрузку и дарят глубокое спокойствие.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nსუფთა ეთერზეთები და დამამშვიდებელი, მოლივლივე სხეულის მასაჟი. ბუნებრივი არომატები აბალანსებს ნერვულ სისტემას და ამცირებს სტრესს. ნელი მოძრაობები ხსნის კუნთოვან დატვირთვას და ქმნის ღრმა სიმშვიდეს."
    },
    price: { he: "60 דק' – 190₾", en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-thai-ther': {
    tag: {
      he: '🇹🇭 עיסוי תאילנדי רפואי',
      en: '🇹🇭 Thai Therapeutic Massage',
      ru: '🇹🇭 Лечебный тайский',
      ka: '🇹🇭 თერაპიული'
    },
    name: { he: 'עיסוי תאילנדי רפואי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'ტაილანდური თერაპიული მასაჟი' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nעיסוי טיפולי עמוק המשלב לחיצות ממוקדות ומתיחות מדויקות. מטפל בכאבי גב, צוואר וכתפיים ובשרירים תפוסים כרונית. מעודד שיקום תנועתי והקלה אמיתית ומתמשכת.",
      en: "Full-body massage from feet to head, including face massage.\nDeep therapeutic massage combining focused pressure and precise stretches. Addresses back, neck and shoulder pain and chronically tight muscles. Encourages mobility recovery and lasting relief.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nГлубокий лечебный массаж: прицельные надавливания и точные растяжки. Помогает при боли в спине, шее и плечах и хронических зажимах. Способствует восстановлению подвижности и длительному облегчению.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nღრმა თერაპიული მასაჟი მიზანმიმართული წნევით და ზუსტი გაჭიმვებით. ეხმარება ზურგის, კისრისა და მხრების ტკივილს და ქრონიკულად დაჭიმულ კუნთებს. ხელს უწყობს მოძრაობის აღდგენას და ხანგრძლივ შვებას."
    },
    price: { he: "60 דק' – 230₾ · 90 דק' – 280₾", en: '60 min – 230₾ · 90 min – 280₾', ru: '60 мин – 230₾ · 90 мин – 280₾', ka: '60 წთ – 230₾ · 90 წთ – 280₾' }
  },

  'body-hot-stone': {
    tag: {
      he: '🔥 אבנים חמות – גוף',
      en: '🔥 Hot Stone Massage',
      ru: '🔥 Горячие камни',
      ka: '🔥 ცხელი ქვები'
    },
    name: { he: 'עיסוי באבנים חמות – גוף מלא', en: 'Full Body Hot Stone Massage', ru: 'Массаж горячими камнями всего тела', ka: 'მთლიანი სხეულის მასაჟი ცხელ ქვებთან' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nאבני בזלת חמות מחליקות על הגוף וממיסות מתחים עמוקים. החום חודר לרקמות ומעניק רוגע עמוק וזרימת דם טובה. מאפשר עבודה רכה אך יעילה על עייפות וכאבים.",
      en: "Full-body massage from feet to head, including face massage.\nWarm basalt stones glide along the body and melt deep tension. Heat penetrates tissues, brings deep calm and improves circulation. Gentle yet effective for fatigue and aches.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nТёплые базальтовые камни скользят по телу и снимают глубокое напряжение. Тепло проникает в ткани, даёт глубокое расслабление и улучшает кровообращение. Мягко, но эффективно при усталости и болях.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nთბილი ბაზალტის ქვები სრიალებენ სხეულზე და ხსნიან ღრმა დაძაბულობას. სითბო აღწევს ქსოვილებში, ქმნის ღრმა რელაქსაციას და აუმჯობესებს სისხლის მიმოქცევას. ნაზი, მაგრამ ეფექტური დაღლილობისა და ტკივილებისას."
    },
    price: { he: "60 דק' – 210₾", en: '60 min – 210₾', ru: '60 мин – 210₾', ka: '60 წთ – 210₾' }
  },

  'body-thai-comp': {
    tag: {
      he: '🌼 קומפרסים תאילנדיים – גוף',
      en: '🌼 Thai Herbal Compress Massage',
      ru: '🌼 Травяные компрессы',
      ka: '🌼 მცენარეული კომპრესი'
    },
    name: { he: 'עיסוי גוף בקומפרסים תאילנדים', en: 'Thai Herbal Compress Body Massage', ru: 'Массаж тела с тайскими травяными компрессами', ka: 'ტანის მასაჟი თაილანდური მცენარეული კომპრესებით' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nשקיות צמחים תאילנדיים חמות מעניקות ריפוי טבעי וניקוז עומק. החום והעשבים מרגיעים כאבים, מפחיתים דלקת ומשפרים חיוניות. משלב עיסוי עשיר להעצמת תחושת השחרור.",
      en: "Full-body massage from feet to head, including face massage.\nWarm Thai herbal pouches provide natural healing and deep drainage. Heat and herbs soothe pain, reduce inflammation and boost vitality. Combined with rich massage for an enhanced release.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nТёплые мешочки с тайскими травами дают природное восстановление и глубокий дренаж. Тепло и травы снимают боль, уменьшают воспаление и повышают жизненный тонус. В сочетании с насыщенным массажем усиливает ощущение освобождения.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nთბილი თაილანდური მცენარეული პაკეტები უზრუნველყოფენ ბუნებრივ განკურნებას და ღრმა დრენაჟს. სითბო და მცენარეები ამშვიდებს ტკივილს, ამცირებს ანთებას და ზრდის ენერგიას. ერთიანდება მდიდარ მასაჟთან, რათა გაძლიერდეს განტვირთვის შეგრძნება."
    },
    price: { he: "60 דק' – 220₾ · 90 דק' – 260₾", en: '60 min – 220₾ · 90 min – 260₾', ru: '60 мин – 220₾ · 90 мин – 260₾', ka: '60 წთ – 220₾ · 90 წთ – 260₾' }
  },

  'body-shiatsu': {
    tag: {
      he: '🇯🇵 שיאצו יפני',
      en: '🇯🇵 JP Shiatsu Massage',
      ru: '🇯🇵 Шиацу (Япония)',
      ka: '🇯🇵 შიაცუ'
    },
    name: { he: 'עיסוי שיאצו יפני', en: 'Japanese Shiatsu Massage', ru: 'Японский массаж Шиацу', ka: 'იაპონური შიაცუ მასაჟი' },
    desc: {
      he: "עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים.\nעיסוי ללא שמן המתבצע בלחיצות לאורך מרידיאני הגוף. מאזן אנרגיה פנימית ומשחרר עומס מהמערכת העצבית. מתאים לעייפות, מתח נפשי וחוסר ריכוז.",
      en: "Full-body massage from feet to head, including face massage.\nOil-free pressure work along body meridians. Balances inner energy and relieves nervous-system overload. Great for fatigue, stress and low focus.",
      ru: "Массаж всего тела от стоп до головы, включая массаж лица.\nМассаж без масла с надавливаниями по меридианам тела. Балансирует внутреннюю энергию и снимает нагрузку с нервной системы. Подходит при усталости, стрессе и снижении концентрации.",
      ka: "მთლიანი სხეულის მასაჟი ფეხიდან თავამდე, სახის მასაჟის ჩათვლით.\nზეთის გარეშე წერტილოვანი მასაჟი მერიდიანების გასწვრივ. აბალანსებს შიდა ენერგიას და ამცირებს ნერვული სისტემის გადატვირთვას. შესაფერისია დაღლილობის, სტრესისა და კონცენტრაციის კლებისას."
    },
    price: { he: "60 דק' – 180₾ · 90 דק' – 230₾", en: '60 min – 180₾ · 90 min – 230₾', ru: '60 мин – 180₾ · 90 мин – 230₾', ka: '60 წთ – 180₾ · 90 წთ – 230₾' }
  },

  'foot-massage': {
    tag: {
      he: '🦶 עיסוי כפות רגליים',
      en: '🦶 Thai Foot Massage',
      ru: '🦶 Тайский массаж стоп',
      ka: '🦶 ფეხის მასაჟი'
    },
    name: { he: "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי", en: 'Thai Foot Reflexology Massage', ru: 'Тайский массаж стоп (рефлексология)', ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי עמוק ועדין המשלב טכניקות תאילנדיות ולחיצות רפלקסולוגיות. מפעיל נקודות השתקפות, משפר זרימת דם ומאזן מערכות גוף שונות. מרפה עומסים מצטברים ומעניק רוגע עמוק לגוף ולנפש. מומלץ לאחר הליכה מרובה, עמידה ממושכת או יום עמוס.',
      en: 'Deep yet gentle massage combining Thai techniques and reflexology pressure. Activates reflex points, improves circulation and balances body systems. Releases built-up stress and brings deep calm. Recommended after lots of walking, long standing or a busy day.',
      ru: 'Глубокий и мягкий массаж с тайскими техниками и рефлексологическими надавливаниями. Активирует точки отражения, улучшает кровообращение и балансирует системы организма. Снимает накопившееся напряжение и приносит глубокое спокойствие. Рекомендуется после долгой ходьбы, длительного стояния или насыщенного дня.',
      ka: 'ღრმა და ნაზი მასაჟი ტაილანდური ტექნიკებით და რეფლექსოლოგიური წნევით. ააქტიურებს რეფლექსურ წერტილებს, აუმჯობესებს სისხლის მიმოქცევას და აბალანსებს სხეულის სისტემებს. ხსნის დაგროვილ დაძაბულობას და აძლევს ღრმა სიმშვიდეს. რეკომენდებულია ბევრი სიარულის, ხანგრძლივი დგომის ან დატვირთული დღის შემდეგ.'
    },
    price: { he: "30 דק' – 80₾ · 60 דק' – 120₾", en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
  }
};

// ✅ (אופציונלי) מטא לכרטיסייה — לא מפריע אם אין כפתור ב-HTML
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

    // title
    const titleEl = card.querySelector('.product-title');
    if (titleEl && meta.name) {
      titleEl.textContent = meta.name[lang] || meta.name.he || titleEl.textContent;
    }

    // description (ה־p הראשון שאינו price)
    const descEl = card.querySelector('p:not(.price)');
    if (descEl && meta.desc) {
      descEl.textContent = meta.desc[lang] || meta.desc.he || descEl.textContent;
    }

    // price
    const priceEl = card.querySelector('.price');
    if (priceEl && meta.price) {
      priceEl.textContent = meta.price[lang] || meta.price.he || priceEl.textContent;
    }
  });
}

// ✅ תרגום "60 דק' / 90 דק'" לכל השפות
function applyDurationLabels(lang) {
  const d = DURATION_I18N[lang] || DURATION_I18N.he;

  // לא שובר אם אין data-min
  document.querySelectorAll('.duration-options span[data-min]').forEach((span) => {
    const m = Number(span.getAttribute('data-min') || '0');
    if (!m) return;
    span.textContent = d.fmt(m);
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
      const treatmentName =
        (meta.name && (meta.name[lang] || meta.name.he)) ||
        (btn.closest('.product-card')?.querySelector('.product-title')?.textContent.trim() ?? 'Treatment');

      let duration = '';
      if (group) {
        const selectedSpan = document.querySelector(`input[name="${group}"]:checked + span`);
        if (selectedSpan) duration = selectedSpan.textContent.trim();
      }

      const template = WA_TEMPLATES_TREATMENT[lang] || WA_TEMPLATES_TREATMENT.he;
      const text = template
        .replace('{TREATMENT}', treatmentName)
        .replace('{DURATION}', duration || '');

      const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
}

// ✅ כפתור כרטיסייה → ווטסאפ (לא מפריע אם אין כפתור כזה ב-HTML)
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
    const text = template
      .replace('{CARD}', cardName)
      .replace('{PRICE}', price);

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  setupLangButtons();
  setupTreatmentButtons();
  setupCardButtons(); // ✅ נוסף בלי למחוק כלום
});
