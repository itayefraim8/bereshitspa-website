// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כפתור וואטסאפ צף + Video Slider

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
  he: 'שלום, אני מעוניין לקבוע טיפול ב-Bereshit Spa:\nטיפול: {TREATMENT}\nמשך: {DURATION}\n\nאשמח שתיצרו איתי קשר לתיאום תאריך ושעה.',
  en: 'Hello, I would like to book a treatment at Bereshit Spa:\nTreatment: {TREATMENT}\nDuration: {DURATION}\n\nPlease contact me to coordinate date and time.',
  ru: 'Здравствуйте! Я хочу записаться на процедуру в Bereshit Spa:\nПроцедура: {TREATMENT}\nДлительность: {DURATION}\n\nПожалуйста, свяжитесь со мной для согласования даты и времени.',
  ka: 'გამარჯობა, მსურს პროცედურის დაჯავშნა Bereshit Spa-ში:\nპროცედურა: {TREATMENT}\nხანგრძლივობა: {DURATION}\n\nგთხოვთ, დამიკავშირდეთ თარიღისა და დროის დასაზუსტებლად.'
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
const TREATMENTS_META = {
  'head-spa': {
    tag: {
      he: '👑 טיפול הדגל – ספא ראש יפני',
      en: '👑 Signature Japanese Head Spa',
      ru: '👑 Фирменный японский Head Spa',
      ka: '👑 სიგნატურული იაპონური Head Spa'
    },
    name: {
      he: 'Japanese Head Spa | ספא ראש יפני',
      en: 'Japanese Head Spa',
      ru: 'Японский Head Spa',
      ka: 'იაპონური Head Spa'
    },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי עמוק של הקרקפת, עיסוי ממוקד, מסכות ייעודיות ופינוקי מים. הטכניקה ממריצה את זרימת הדם, מחזקת את שורשי השיער ומרגיעה עומסים נפשיים. כולל שטיפה יסודית, מגבת חמה, סרום לקרקפת וייבוש שיער מלא. הטיפול מסתיים במנוחה קצרה עם תה וניחוח ארומטי עדין.',
      en: 'A traditional Japanese treatment combining deep scalp cleansing, focused massage, dedicated masks, and water pampering. Boosts circulation, supports hair roots, and eases mental stress. Includes thorough wash, hot towel, scalp serum, and full blow-dry. Ends with a short rest with tea and a gentle aroma.',
      ru: 'Традиционная японская процедура: глубокое очищение кожи головы, точечный массаж, специальные маски и водная терапия. Улучшает кровообращение, укрепляет корни волос и снимает стресс. Включает тщательное мытьё, горячее полотенце, сыворотку и полную сушку. Завершается коротким отдыхом с чаем и лёгким ароматом.',
      ka: 'ტრადიციული იაპონური პროცედურა: თავის კანის ღრმა წმენდა, მიზნობრივი მასაჟი, სპეციალური ნიღბები და წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ამცირებს სტრესს. მოიცავს სრულ დაბანას, ცხელ პირსახოცს, თავის კანის სერუმს და სრულ გაშრობას. სრულდება მოკლე დასვენებით ჩაით და ნაზი არომატით.'
    },
    price: {
      he: '60 דק׳ – 200₾ · 90 דק׳ – 250₾ (כולל עיסוי ידיים ורגליים)',
      en: '60 min – 200₾ · 90 min – 250₾ (includes hand & foot massage)',
      ru: '60 мин – 200₾ · 90 мин – 250₾ (включает массаж рук и ног)',
      ka: '60 წთ – 200₾ · 90 წთ – 250₾ (მოიცავს ხელებისა და ფეხების მასაჟს)'
    }
  },

  // NOTE: משאירים את המפתח הקיים 'facial-thai-compress' כדי לא לשבור HTML/כפתורים
  'facial-thai-compress': {
    tag: {
      he: '🌼 עיסוי פנים תאילנדי בצמחי מרפא ושמנים',
      en: '🌼 Thai Herbal Facial Therapy',
      ru: '🌼 Тайская травяная терапия лица',
      ka: '🌼 თაილანდური მცენარეული სახის თერაპია'
    },
    name: {
      he: 'Thai Herbal Facial Therapy | עיסוי פנים תאילנדי בצמחי מרפא ושמנים',
      en: 'Thai Herbal Facial Therapy',
      ru: 'Тайская травяная терапия лица',
      ka: 'თაილანდური მცენარეული სახის თერაპია'
    },
    desc: {
      he: 'עיסוי פנים תאילנדי עדין המשלב שמנים, אידוי צמחי ולחיצות רכות. מבוסס על טכניקות מסורתיות המותאמות במיוחד לעור הפנים. משפר זרימת דם, תומך בניקוז טבעי ומרגיע את מערכת העצבים. כולל עיסוי פנים מעמיק, קרקפת מרגיעה ועבודה על פלג גוף עליון.',
      en: 'A gentle Thai facial combining oils, herbal steam, and soft pressure. Based on traditional techniques adapted for facial skin. Improves circulation, supports natural drainage, and calms the nervous system. Includes deep face massage, relaxing scalp work, and upper-body treatment.',
      ru: 'Нежный тайский массаж лица с маслами, травяным паром и мягкими надавливаниями. Основан на традиционных техниках, адаптированных для кожи лица. Улучшает кровообращение, поддерживает естественный дренаж и успокаивает нервную систему. Включает глубокий массаж лица, расслабляющий массаж головы и работу с верхней частью тела.',
      ka: 'ნაზი თაილანდური სახის მასაჟი ზეთებით, მცენარეული ორთქლით და რბილი წნევით. ეფუძნება ტრადიციულ ტექნიკებს, რომლებიც მორგებულია სახის კანზე. აუმჯობესებს სისხლის მიმოქცევას, ხელს უწყობს ბუნებრივ დრენაჟს და ამშვიდებს ნერვულ სისტემას. მოიცავს ღრმა სახის მასაჟს, დამამშვიდებელ თავის კანის მასაჟს და ზედა სხეულზე მუშაობას.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'facial-hot-stone': {
    tag: { he: '🔥 עיסוי פנים באבנים חמות', en: '🔥 Hot Stone Facial', ru: '🔥 Горячие камни (лицо)', ka: '🔥 ცხელი ქვები (სახე)' },
    name: { he: 'Hot Stone Facial | עיסוי פנים באבנים חמות', en: 'Hot Stone Facial', ru: 'Массаж лица горячими камнями', ka: 'სახის მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'עיסוי פנים מרגיע באמצעות אבני בזלת חמות המונחות ומונעות בעדינות. החום חודר לשרירים, משחרר מתחים ומרפה אזורי עומס בפנים ובצוואר. כולל עיסוי פנים, קרקפת, צוואר ופלג גוף עליון. מתאים במיוחד לעייפות נפשית ולמתח מצטבר באזור הראש.',
      en: 'A soothing facial using warm basalt stones placed and moved gently. Heat penetrates muscles, releasing tension in the face and neck. Includes face, scalp, neck and upper-body work. Especially helpful for mental fatigue and accumulated head-area stress.',
      ru: 'Расслабляющий массаж лица тёплыми базальтовыми камнями. Тепло проникает в мышцы и снимает напряжение в лице и шее. Включает массаж лица, головы, шеи и верхней части тела. Особенно подходит при усталости и накопленном стрессе в области головы.',
      ka: 'დამამშვიდებელი სახის მასაჟი თბილი ბაზალტის ქვებით. სითბო ღრმად აღწევს კუნთებში და ხსნის დაძაბულობას სახესა და კისერზე. მოიცავს სახის, თავის კანის, კისრის და ზედა სხეულის მასაჟს. განსაკუთრებით სასარგებლოა გონებრივი დაღლილობისა და თავის არეში დაგროვილი სტრესისას.'
    },
    price: { he: '60 דק׳ – 160₾', en: '60 min – 160₾', ru: '60 мин – 160₾', ka: '60 წთ – 160₾' }
  },

  'facial-thai': {
    tag: { he: '🌺 עיסוי פנים תאילנדי מסורתי', en: '🌺 Traditional Thai Face Massage', ru: '🌺 Тайский массаж лица', ka: '🌺 ტაილანდური სახის მასაჟი' },
    name: { he: 'Traditional Thai Face Massage | עיסוי פנים תאילנדי מסורתי', en: 'Traditional Thai Face Massage', ru: 'Традиционный тайский массаж лица', ka: 'ტრადიციული ტაილანდური სახის მასაჟი' },
    desc: {
      he: 'עיסוי עדין המבוסס על טכניקות תאילנדיות עתיקות ולחיצות אנרגטיות. מתמקד בפנים, בלסת ובצוואר לשחרור מתחים עמוקים. בגרסת 60 דקות משולב גם עיסוי כתפיים ופלג גוף עליון. מעודד רגיעה עמוקה, איזון עצבי וזרימה אנרגטית טבעית.',
      en: 'A gentle massage based on ancient Thai techniques and energetic acupressure. Focuses on face, jaw and neck to release deep tension. The 60-minute version also includes shoulders and upper body. Encourages deep relaxation, nervous-system balance and natural energy flow.',
      ru: 'Нежный массаж на основе древних тайских техник и энергетической акупрессуры. Фокус на лице, челюсти и шее для снятия глубокого напряжения. Версия 60 минут включает также плечи и верхнюю часть тела. Способствует глубокому расслаблению, балансу нервной системы и естественному потоку энергии.',
      ka: 'ნაზი მასაჟი ძველი ტაილანდური ტექნიკებით და ენერგიული წერტილოვანი დაწოლით. კონცენტრირდება სახეზე, ყბასა და კისერზე ღრმა დაძაბულობის მოსახსნელად. 60-წუთიანი ვერსია ასევე მოიცავს მხრებსა და ზედა სხეულს. ხელს უწყობს ღრმა რელაქსაციას, ნერვული სისტემის ბალანსს და ბუნებრივ ენერგეტიკულ ნაკადს.'
    },
    price: { he: '30 דק׳ – 90₾ · 60 דק׳ – 150₾', en: '30 min – 90₾ · 60 min – 150₾', ru: '30 мин – 90₾ · 60 мин – 150₾', ka: '30 წთ – 90₾ · 60 წთ – 150₾' }
  },

  'facial-aroma': {
    tag: { he: '🌿 עיסוי פנים ארומתרפי', en: '🌿 Aromatherapy Facial Massage', ru: '🌿 Арома-массаж лица', ka: '🌿 არომატერაპიული სახის მასაჟი' },
    name: { he: 'Aromatherapy Facial Massage | עיסוי פנים ארומתרפי', en: 'Aromatherapy Facial Massage', ru: 'Ароматерапевтический массаж лица', ka: 'არომატერაპიული სახის მასაჟი' },
    desc: {
      he: 'עיסוי פנים עדין עם שמנים אתריים טהורים המותאמים לעור הפנים ולנשימה. התנועות הרכות מרגיעות את מערכת העצבים ומשפרות את זרימת הדם. בגרסת 60 דקות כולל עיסוי כתפיים עמוק וקרקפת מורחבת. מעניק תחושת רכות, זוהר ואיזון רגשי עמוק.',
      en: 'A gentle facial with pure essential oils tailored to facial skin and breathing. Soft movements calm the nervous system and improve circulation. The 60-minute version includes deep shoulders and extended scalp work. Leaves you soft, glowing and emotionally balanced.',
      ru: 'Нежный массаж лица с чистыми эфирными маслами, подобранными для кожи и дыхания. Мягкие движения успокаивают нервную систему и улучшают кровообращение. Версия 60 минут включает глубокий массаж плеч и расширенный массаж головы. Дарит мягкость, сияние и глубокий эмоциональный баланс.',
      ka: 'ნაზი სახის მასაჟი სუფთა ეთერზეთებით, მორგებული სახის კანზე და სუნთქვაზე. რბილი მოძრაობები ამშვიდებს ნერვულ სისტემას და აუმჯობესებს სისხლის მიმოქცევას. 60-წუთიანი ვერსია მოიცავს ღრმა მხრების მასაჟს და გაფართოებულ თავის კანის მასაჟს. ანიჭებს რბილობას, ბზინვარებას და ღრმა ემოციურ ბალანსს.'
    },
    price: { he: '30 דק׳ – 80₾ · 60 דק׳ – 140₾', en: '30 min – 80₾ · 60 min – 140₾', ru: '30 мин – 80₾ · 60 мин – 140₾', ka: '30 წთ – 80₾ · 60 წთ – 140₾' }
  },

  'back-basic': {
    tag: { he: '💆‍♂️ עיסוי תאילנדי עמוק בשמן גב–כתפיים–צוואר', en: '💆‍♂️ Deep Thai Oil Back–Neck–Shoulders', ru: '💆‍♂️ Глубокий тайский масляный (спина–шея–плечи)', ka: '💆‍♂️ ღრმა თაილანდური ზეთოვანი (ზურგი–კისერი–მხრები)' },
    name: { he: 'Deep Thai Oil Back–Neck–Shoulders Massage | עיסוי תאילנדי עמוק בשמן גב–כתפיים–צוואר', en: 'Deep Thai Oil Back–Neck–Shoulders Massage', ru: 'Глубокий тайский масляный массаж спины, шеи и плеч', ka: 'ღრმა თაილანდური ზეთოვანი მასაჟი ზურგის, კისრისა და მხრების' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי בשמן המתמקד בשכבות השריר העמוקות של הגב העליון, הכתפיים והצוואר. משלב לחיצות חזקות, עבודה עם מרפקים ואמות ותנועות שמן איטיות ומדויקות. מיועד לשחרור עומסים כרוניים, קשרים שריריים ומתחים יומיומיים. מסייע בהפחתת כאבים, שיפור טווח תנועה ותחושת הקלה עמוקה.',
      en: 'Therapeutic Thai oil massage focusing on deep layers of the upper back, shoulders and neck. Combines strong pressure, elbows/forearms and slow precise oil strokes. Designed to release chronic load, muscle knots and daily tension. Helps reduce pain and improve range of motion.',
      ru: 'Лечебный тайский массаж с маслом, направленный на глубокие слои верхней части спины, плеч и шеи. Сильные надавливания, работа локтями и предплечьями, медленные точные движения. Для снятия хронической нагрузки, узлов и ежедневного напряжения. Помогает уменьшить боль и улучшить подвижность.',
      ka: 'თერაპიული თაილანდური ზეთოვანი მასაჟი, რომელიც ფოკუსირდება ზედა ზურგის, მხრებისა და კისრის ღრმა შრეებზე. აერთიანებს ძლიერ წნევას, იდაყვებით/მაჯებით მუშაობას და ნელ, ზუსტ ზეთოვან მოძრაობებს. გათვლილია ქრონიკული დატვირთვისა და კუნთოვანი კვანძების მოსახსნელად. ეხმარება ტკივილის შემცირებას და მოძრაობის დიაპაზონის გაუმჯობესებას.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: { he: '🔥 עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: '🔥 Hot Stone Back–Neck–Shoulders', ru: '🔥 Горячие камни (спина–шея–плечи)', ka: '🔥 ცხელი ქვები (ზურგი–კისერი–მხრები)' },
    name: { he: 'Hot Stone Back–Neck–Shoulders Massage | עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'עיסוי ממוקד המשלב עבודה ידנית עם אבני בזלת חמות. החום חודר לרקמות ומאפשר שחרור עמוק ובטוח של שרירים תפוסים. מתאים במיוחד לכאבים כרוניים, עומס חוזר ומתח נפשי. יוצר הרפיה מלאה של פלג הגוף העליון.',
      en: 'Focused massage combining manual work with warm basalt stones. Heat penetrates tissues for deep, safe release of tight muscles. Especially suitable for chronic pain, recurring overload and mental stress. Creates full upper-body relaxation.',
      ru: 'Прицельный массаж с ручной техникой и тёплыми базальтовыми камнями. Тепло проникает в ткани и помогает безопасно снять глубокие зажимы. Особенно подходит при хронических болях, повторяющихся нагрузках и стрессе. Дает полное расслабление верхней части тела.',
      ka: 'მიზანმიმართული მასაჟი, რომელიც აერთიანებს მანუალურ ტექნიკას და თბილ ბაზალტის ქვებს. სითბო ღრმად აღწევს ქსოვილებში და ხელს უწყობს დაჭიმული კუნთების უსაფრთხო განტვირთვას. განსაკუთრებით კარგია ქრონიკული ტკივილის, განმეორებადი დატვირთვისა და სტრესისას. ქმნის ზედა სხეულის სრულ რელაქსაციას.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  'body-thai': {
    tag: { he: '🇹🇭 עיסוי תאילנדי מסורתי', en: '🇹🇭 Traditional Thai Massage', ru: '🇹🇭 Традиционный тайский массаж', ka: '🇹🇭 ტრადიციული ტაილანდური' },
    name: { he: 'Traditional Thai Massage | עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה (Sen). משפר גמישות, מפיג עומסים ומחזיר תנועה חופשית לגוף. מעורר זרימה אנרגטית ומעניק תחושת חיוניות עמוקה. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'Traditional oil-free Thai massage combining pressure, stretches and work on energy lines (Sen). Improves flexibility, relieves load and restores free movement. Awakens energy flow and brings deep vitality. This is a full-body treatment and also includes a gentle face massage.',
      ru: 'Традиционный тайский массаж без масла: надавливания, растяжки и работа по энергетическим линиям (Sen). Улучшает гибкость, снимает нагрузку и возвращает свободу движений. Активирует поток энергии и дарит жизненный тонус. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'ტრადიციული თაილანდური მასაჟი ზეთის გარეშე: წნევა, გაჭიმვები და ენერგეტიკულ ხაზებზე (Sen) მუშაობა. აუმჯობესებს მოქნილობას, ხსნის დატვირთვას და აბრუნებს თავისუფალ მოძრაობას. ააქტიურებს ენერგიის ნაკადს და აძლევს სიცოცხლისუნარიანობას. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: { he: '60 דק׳ – 190₾ · 90 דק׳ – 230₾', en: '60 min – 190₾ · 90 min – 230₾', ru: '60 мин – 190₾ · 90 мин – 230₾', ka: '60 წთ – 190₾ · 90 წთ – 230₾' }
  },

  'body-thai-oil': {
    tag: { he: '🇹🇭 עיסוי תאילנדי בשמן', en: '🇹🇭 Thai Oil Massage', ru: '🇹🇭 Тайский масляный массаж', ka: '🇹🇭 ტაილანდური ზეთოვანი მასაჟი' },
    name: { he: 'Thai Oil Massage | עיסוי תאילנדי בשמן', en: 'Thai Oil Massage', ru: 'Тайский масляный массаж', ka: 'ტაილანდური ზეთოვანი მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא בשמן בתנועות זורמות ועמוקות. משלב לחיצות תאילנדיות להמסה של מתח ועומס שרירי. מאזן את מערכת העצבים ומשרה רוגע בכל הגוף. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'Full-body oil massage with flowing, deeper strokes. Combines Thai pressure to melt tension and muscular load. Balances the nervous system and brings calm throughout the body. Full-body treatment including a gentle face massage.',
      ru: 'Массаж всего тела с маслом: плавные и глубокие движения. С тайскими надавливаниями для снятия напряжения и мышечной нагрузки. Балансирует нервную систему и приносит расслабление всему телу. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის ზეთოვანი მასაჟი — მოლივლივე და ღრმა მოძრაობებით. შეიცავს ტაილანდურ წნევას დაძაბულობისა და კუნთოვანი დატვირთვის მოსახსნელად. აბალანსებს ნერვულ სისტემას და ქმნის სიმშვიდეს მთელ სხეულში. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 180₾ · 90 דק׳ – 230₾', en: '60 min – 180₾ · 90 min – 230₾', ru: '60 мин – 180₾ · 90 мин – 230₾', ka: '60 წთ – 180₾ · 90 წთ – 230₾' }
  },

  'body-aroma': {
    tag: { he: '🌿 עיסוי ארומתרפי בשמנים אתריים', en: '🌿 Aromatherapy Oil Massage', ru: '🌿 Аромамассаж с маслами', ka: '🌿 არომატერაპიული ზეთოვანი მასაჟი' },
    name: { he: 'Aromatherapy Oil Massage | עיסוי ארומתרפי בשמנים אתריים', en: 'Aromatherapy Oil Massage', ru: 'Ароматерапевтический массаж с маслом', ka: 'არომატერაპიული ზეთოვანი მასაჟი' },
    desc: {
      he: 'עיסוי גוף רגוע ועדין עם שמנים אתריים טהורים. הריחות הטבעיים מאזנים את מערכת העצבים ומפחיתים מתח. התנועות האיטיות יוצרות תחושת שלווה והרפיה עמוקה. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'A calm, gentle body massage with pure essential oils. Natural aromas balance the nervous system and reduce stress. Slow movements create deep peace and relaxation. Full-body treatment including a gentle face massage.',
      ru: 'Спокойный, нежный массаж тела с чистыми эфирными маслами. Природные ароматы балансируют нервную систему и снижают стресс. Медленные движения создают глубокое расслабление. Полный массаж тела с мягким массажем лица.',
      ka: 'მშვიდი და ნაზი სხეულის მასაჟი სუფთა ეთერზეთებით. ბუნებრივი არომატები აბალანსებს ნერვულ სისტემას და ამცირებს სტრესს. ნელი მოძრაობები ქმნის ღრმა რელაქსაციას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾ · 90 דק׳ – 220₾', en: '60 min – 170₾ · 90 min – 220₾', ru: '60 мин – 170₾ · 90 мин – 220₾', ka: '60 წთ – 170₾ · 90 წთ – 220₾' }
  },
// 1) הוסף ל-TREATMENTS_META (בתוך landing-landing.js)
  'body-aloe-vera': {
    tag: {
      he: '🌿 עיסוי תאילנדי עם אלוורה',
      en: '🌿 Thai Aloe Vera Massage',
      ru: '🌿 Тайский массаж с алоэ вера',
      ka: '🌿 თაილანდური მასაჟი ალოე ვერათი'
    },
    name: {
      he: 'Thai Aloe Vera Massage | עיסוי תאילנדי עם אלוורה',
      en: 'Thai Aloe Vera Massage',
      ru: 'Тайский массаж с алоэ вера',
      ka: 'თაილანდური მასაჟი ალოე ვერათი'
    },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב ג׳ל אלוורה טבעי. האלוורה מרגיעה, מקררת ומזינה את העור תוך שמירה על לחות וגמישות. התנועות הרכות משחררות מתחים שריריים קלים. מתאים במיוחד לעור רגיש ולאחר חשיפה לשמש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage combined with natural aloe vera gel. Aloe soothes, cools and nourishes the skin while supporting hydration and elasticity. Soft strokes release mild muscular tension. Especially suitable for sensitive skin and after sun exposure. This is a full-body treatment and also includes a face massage.',
      ru: 'Нежный тайский массаж с натуральным гелем алоэ вера. Алоэ успокаивает, охлаждает и питает кожу, сохраняя увлажнение и эластичность. Мягкие движения снимают лёгкое мышечное напряжение. Особенно подходит для чувствительной кожи и после солнца. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ალოე ვერას გელით. ალოე ამშვიდებს, აგრილებს და კვებავს კანს, ხელს უწყობს დატენიანებასა და ელასტიურობას. რბილი მოძრაობები ხსნის მსუბუქ კუნთოვან დაძაბულობას. განსაკუთრებით კარგია მგრძნობიარე კანისთვის და მზეზე ყოფნის შემდეგ. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: {
      he: '60 דק׳ – 170₾ · 90 דק׳ – 220₾',
      en: '60 min – 170₾ · 90 min – 220₾',
      ru: '60 мин – 170₾ · 90 мин – 220₾',
      ka: '60 წთ – 170₾ · 90 წთ – 220₾'
    }
  },

  'body-vitamin-e': {
    tag: {
      he: '✨ עיסוי תאילנדי עם קרם ויטמין E',
      en: '✨ Thai Vitamin E Cream Massage',
      ru: '✨ Тайский массаж с кремом Vitamin E',
      ka: '✨ თაილანდური მასაჟი ვიტამინ E-ის კრემით'
    },
    name: {
      he: 'Thai Vitamin E Cream Massage | עיסוי תאילנדי עם קרם ויטמין E',
      en: 'Thai Vitamin E Cream Massage',
      ru: 'Тайский массаж с кремом Vitamin E',
      ka: 'თაილანდური მასაჟი ვიტამინ E-ის კრემით'
    },
    desc: {
      he: 'עיסוי תאילנדי בשילוב קרם מועשר בויטמין E להזנה עמוקה של העור. מסייע בשיפור גמישות העור ובהפחתת יובש. משלב רוגע וטיפוח קוסמטי. יוצר תחושת רכות והרפיה כללית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A Thai massage combined with a Vitamin E enriched cream for deep skin nourishment. Helps improve elasticity and reduce dryness. Blends relaxation with cosmetic care, leaving the skin soft and the body deeply relaxed. This is a full-body treatment and also includes a face massage.',
      ru: 'Тайский массаж с кремом, обогащённым витамином E, для глубокого питания кожи. Помогает улучшить эластичность и уменьшить сухость. Сочетает расслабление и косметический уход, дарит мягкость и общее расслабление. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'თაილანდური მასაჟი ვიტამინ E-ით გამდიდრებული კრემით კანის ღრმა კვებისთვის. ეხმარება ელასტიურობის გაუმჯობესებასა და სიმშრალის შემცირებას. აერთიანებს რელაქსაციასა და კოსმეტიკურ მოვლას, ქმნის რბილობისა და საერთო განტვირთვის შეგრძნებას. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: {
      he: '60 דק׳ – 175₾ · 90 דק׳ – 225₾',
      en: '60 min – 175₾ · 90 min – 225₾',
      ru: '60 мин – 175₾ · 90 мин – 225₾',
      ka: '60 წთ – 175₾ · 90 წთ – 225₾'
    }
  },

  'body-relaxing-oil': {
    tag: {
      he: '🧘 עיסוי שמן מרגיע',
      en: '🧘 Relaxing Oil Massage',
      ru: '🧘 Расслабляющий массаж с маслом',
      ka: '🧘 დამამშვიდებელი ზეთოვანი მასაჟი'
    },
    name: {
      he: 'Relaxing Oil Massage | עיסוי שמן מרגיע',
      en: 'Relaxing Oil Massage',
      ru: 'Расслабляющий массаж с маслом',
      ka: 'დამამშვიდებელი ზეთოვანი მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא בשמן איכותי בתנועות ארוכות, רכות וזורמות. מתמקד בהרפיה עמוקה של מערכת העצבים ובהפחתת סטרס. משחרר מתחים קלים ומשרה תחושת שלווה ואיזון. מתאים למי שמחפש חוויה עדינה ולא אינטנסיבית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A full-body massage with quality oil using long, soft, flowing strokes. Focuses on deep nervous-system relaxation and stress reduction. Releases mild tension and creates a sense of calm and balance. Ideal for those seeking a gentle, non-intensive experience. This is a full-body treatment and also includes a face massage.',
      ru: 'Массаж всего тела с качественным маслом: длинные мягкие и плавные движения. Фокус на глубоком расслаблении нервной системы и снижении стресса. Снимает лёгкое напряжение и дарит ощущение спокойствия и баланса. Подходит тем, кто ищет мягкую, неинтенсивную процедуру. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'მთლიანი სხეულის მასაჟი ხარისხიანი ზეთით — გრძელი, რბილი და მოლივლივე მოძრაობებით. ფოკუსირდება ნერვული სისტემის ღრმა რელაქსაციასა და სტრესის შემცირებაზე. ხსნის მსუბუქ დაძაბულობას და ქმნის სიმშვიდისა და ბალანსის შეგრძნებას. იდეალურია მათთვის, ვინც ეძებს ნაზ, არაინტენსიურ გამოცდილებას. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: {
      he: '60 דק׳ – 180₾ · 90 דק׳ – 230₾',
      en: '60 min – 180₾ · 90 min – 230₾',
      ru: '60 мин – 180₾ · 90 мин – 230₾',
      ka: '60 წთ – 180₾ · 90 წთ – 230₾'
    }
  },

  'body-coconut-oil': {
    tag: {
      he: '🥥 עיסוי תאילנדי עם שמן קוקוס',
      en: '🥥 Thai Coconut Oil Massage',
      ru: '🥥 Тайский массаж с кокосовым маслом',
      ka: '🥥 თაილანდური მასაჟი ქოქოსის ზეთით'
    },
    name: {
      he: 'Thai Coconut Oil Massage | עיסוי תאילנדי עם שמן קוקוס',
      en: 'Thai Coconut Oil Massage',
      ru: 'Тайский массаж с кокосовым маслом',
      ka: 'თაილანდური მასაჟი ქოქოსის ზეთით'
    },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב שמן קוקוס טבעי. מזין את העור, מעניק לחות עמוקה ותחושת רכות ממושכת. התנועות זורמות ומאזנות את הגוף והנפש. מתאים במיוחד לעור יבש או רגיש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage combined with natural coconut oil. Nourishes the skin, provides deep hydration and lasting softness. Flowing movements balance body and mind. Especially suitable for dry or sensitive skin. This is a full-body treatment and also includes a face massage.',
      ru: 'Нежный тайский массаж с натуральным кокосовым маслом. Питает кожу, обеспечивает глубокое увлажнение и длительную мягкость. Плавные движения гармонизируют тело и ум. Особенно подходит для сухой или чувствительной кожи. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ქოქოსის ზეთით. კვებავს კანს, აძლევს ღრმა დატენიანებას და ხანგრძლივ რბილობას. მოლივლივე მოძრაობები აბალანსებს სხეულსა და გონებას. განსაკუთრებით კარგია მშრალი ან მგრძნობიარე კანისთვის. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: {
      he: '60 דק׳ – 175₾ · 90 דק׳ – 225₾',
      en: '60 min – 175₾ · 90 min – 225₾',
      ru: '60 мин – 175₾ · 90 мин – 225₾',
      ka: '60 წთ – 175₾ · 90 წთ – 225₾'
    }
  },

  'body-sports': {
    tag: {
      he: '🏃 עיסוי ספורט',
      en: '🏃 Sports Massage',
      ru: '🏃 Спортивный массаж',
      ka: '🏃 სპორტული მასაჟი'
    },
    name: {
      he: 'Sports Massage | עיסוי ספורט',
      en: 'Sports Massage',
      ru: 'Спортивный массаж',
      ka: 'სპორტული მასაჟი'
    },
    desc: {
      he: 'עיסוי אינטנסיבי לשחרור עומסים מפעילות גופנית. משלב טכניקות עומק ומתיחות. מסייע בהתאוששות ומניעת פציעות. מתאים לספורטאים ולאנשים פעילים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An intensive massage to release load from physical activity. Combines deep techniques and stretches. Supports recovery and injury prevention. Suitable for athletes and active people. This is a full-body treatment and also includes a face massage.',
      ru: 'Интенсивный массаж для снятия нагрузки после физической активности. Сочетает глубокие техники и растяжки. Помогает восстановлению и профилактике травм. Подходит спортсменам и активным людям. Это массаж всего тела и он также включает мягкий массаж лица.',
      ka: 'ინტენსიური მასაჟი ფიზიკური აქტივობით გამოწვეული დატვირთვის მოსახსნელად. აერთიანებს ღრმა ტექნიკებს და გაჭიმვებს. ეხმარება აღდგენასა და ტრავმების პრევენციას. შესაფერისია სპორტსმენებისთვის და აქტიური ადამიანებისთვის. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
    },
    price: {
      he: '60 דק׳ – 240₾ · 90 דק׳ – 290₾',
      en: '60 min – 240₾ · 90 min – 290₾',
      ru: '60 мин – 240₾ · 90 мин – 290₾',
      ka: '60 წთ – 240₾ · 90 წთ – 290₾'
    }
  },

'body-swedish': {
  tag: {
    he: '🇸🇪 עיסוי שוודי',
    en: '🇸🇪 Swedish Massage',
    ru: '🇸🇪 Шведский массаж',
    ka: '🇸🇪 შვედური მასაჟი'
  },
  name: {
    he: 'Swedish Massage | עיסוי שוודי',
    en: 'Swedish Massage',
    ru: 'Шведский массаж',
    ka: 'შვედური მასაჟი'
  },
  desc: {
    he: 'עיסוי גוף מלא קלאסי בתנועות ארוכות, לישה עדינה והנעות זורמות לשחרור מתחים והרגעה עמוקה. משפר זרימת דם, מסייע בהפחתת עומס שרירי ומחזיר תחושת קלילות ורעננות. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
    en: 'A classic full-body massage with long flowing strokes, gentle kneading, and smooth movements for deep relaxation. Improves circulation, helps reduce muscular load, and restores a light, refreshed feeling. This is a full-body treatment and also includes a gentle face massage.',
    ru: 'Классический массаж всего тела: длинные плавные движения, мягкое разминание и ритмичные техники для глубокого расслабления. Улучшает кровообращение, снижает мышечную нагрузку и возвращает ощущение лёгкости и свежести. Это массаж всего тела и он также включает мягкий массаж лица.',
    ka: 'კლასიკური მთლიანი სხეულის მასაჟი გრძელი მოლივლივე მოძრაობებით, რბილი ზელვით და ნაზი ტექნიკებით ღრმა რელაქსაციისთვის. აუმჯობესებს სისხლის მიმოქცევას, ამცირებს კუნთოვან დატვირთვას და აბრუნებს სიმსუბუქისა და სიგრილის შეგრძნებას. ეს არის მთლიანი სხეულის პროცედურა და ასევე მოიცავს სახის ნაზ მასაჟს.'
  },
  price: {
    he: '60 דק׳ – 160₾ · 90 דק׳ – 210₾',
    en: '60 min – 160₾ · 90 min – 210₾',
    ru: '60 мин – 160₾ · 90 мин – 210₾',
    ka: '60 წთ – 160₾ · 90 წთ – 210₾'
  }
},

  'body-thai-balm': {
    tag: { he: '🇹🇭 עיסוי תאילנדי עם באלם', en: '🇹🇭 Thai Balm Massage', ru: '🇹🇭 Тайский массаж с бальзамом', ka: '🇹🇭 თაილანდური მასაჟი ბალზამით' },
    name: { he: 'Thai Balm Massage | עיסוי תאילנדי עם באלם', en: 'Thai Balm Massage', ru: 'Тайский массаж с бальзамом', ka: 'თაილანდური მასაჟი ბალზამით' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד המשלב שימוש בבאלם תאילנדי ייעודי. מסייע בהפחתת כאבים, נוקשות ועומס שרירי. מתאים במיוחד לשרירים תפוסים ועומס פיזי. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'A focused Thai massage using a dedicated Thai balm. Helps reduce pain, stiffness and muscular load—especially for tight muscles and physical strain. Full-body treatment including a gentle face massage.',
      ru: 'Прицельный тайский массаж с использованием специального тайского бальзама. Помогает уменьшить боль, скованность и мышечную нагрузку. Особенно подходит при зажатых мышцах и физической усталости. Полный массаж тела с мягким массажем лица.',
      ka: 'მიზანმიმართული თაილანდური მასაჟი სპეციალური თაილანდური ბალზამით. ეხმარება ტკივილის, სიმყარესა და კუნთოვანი დატვირთვის შემცირებაში. განსაკუთრებით კარგია დაჭიმული კუნთებისა და ფიზიკური გადაღლისას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 190₾ · 90 דק׳ – 240₾', en: '60 min – 190₾ · 90 min – 240₾', ru: '60 мин – 190₾ · 90 мин – 240₾', ka: '60 წთ – 190₾ · 90 წთ – 240₾' }
  },

  'body-thai-hot-oil': {
    tag: { he: '🔥 עיסוי תאילנדי בשמן חם', en: '🔥 Thai Hot Oil Massage', ru: '🔥 Тайский массаж горячим маслом', ka: '🔥 თაილანდური მასაჟი თბილი ზეთით' },
    name: { he: 'Thai Hot Oil Massage | עיסוי תאילנדי בשמן חם', en: 'Thai Hot Oil Massage', ru: 'Тайский массаж горячим маслом', ka: 'თაილანდური მასაჟი თბილი ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי עם שמן המחומם בעדינות לטמפרטורה נעימה. החום מסייע בשחרור שרירים עמוקים ובהפחתת מתחים. יוצר הרפיה עמוקה ותחושת איזון כללית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'A Thai massage using gently warmed oil. The heat helps release deep muscles and reduce tension, creating deep relaxation and overall balance. Full-body treatment including a gentle face massage.',
      ru: 'Тайский массаж с мягко подогретым маслом. Тепло помогает расслабить глубокие мышцы и снизить напряжение, создавая глубокую релаксацию и чувство баланса. Полный массаж тела с мягким массажем лица.',
      ka: 'თაილანდური მასაჟი ნაზად გათბობილი ზეთით. სითბო ხელს უწყობს ღრმა კუნთების განტვირთვას და დაძაბულობის შემცირებას, ქმნის ღრმა რელაქსაციას და საერთო ბალანსს. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 190₾ · 90 דק׳ – 240₾', en: '60 min – 190₾ · 90 min – 240₾', ru: '60 мин – 190₾ · 90 мин – 240₾', ka: '60 წთ – 190₾ · 90 წთ – 240₾' }
  },

  'body-thai-ther': {
    tag: { he: '🇹🇭 עיסוי תאילנדי טיפולי', en: '🇹🇭 Thai Therapeutic Massage', ru: '🇹🇭 Лечебный тайский массаж', ka: '🇹🇭 თერაპიული თაილანდური' },
    name: { he: 'Thai Therapeutic Massage | עיסוי תאילנדי טיפולי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'ტაილანდური თერაპიული მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי עמוק המשלב לחיצות ומתיחות מדויקות. מתמקד בכאבי גב, צוואר וכתפיים ובשרירים תפוסים כרונית. מעודד שיקום תנועתי והקלה אמיתית ומתמשכת. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'Deep therapeutic Thai massage with focused pressure and precise stretches. Targets back, neck and shoulders and chronically tight muscles. Encourages mobility recovery and lasting relief. Full-body treatment including a gentle face massage.',
      ru: 'Глубокий лечебный тайский массаж: прицельные надавливания и точные растяжки. Фокус на боли в спине, шее и плечах и хронических зажимах. Способствует восстановлению подвижности и длительному облегчению. Полный массаж тела с мягким массажем лица.',
      ka: 'ღრმა თერაპიული თაილანდური მასაჟი მიზნობრივი წნევით და ზუსტი გაჭიმვებით. ფოკუსირდება ზურგის/კისრის/მხრების ტკივილზე და ქრონიკულად დაჭიმულ კუნთებზე. ხელს უწყობს მოძრაობის აღდგენას და ხანგრძლივ შვებას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 230₾ · 90 דק׳ – 280₾', en: '60 min – 230₾ · 90 min – 280₾', ru: '60 мин – 230₾ · 90 мин – 280₾', ka: '60 წთ – 230₾ · 90 წთ – 280₾' }
  },

  'body-deep-tissue-cream': {
    tag: { he: '💪 עיסוי תאילנדי עמוק (דיפ טישיו) עם קרם – פרימיום', en: '💪 Deep Tissue Thai Massage with Cream (Premium)', ru: '💪 Глубокий тайский массаж с кремом (Премиум)', ka: '💪 ღრმა თაილანდური მასაჟი კრემით (Premium)' },
    name: { he: 'Deep Tissue Thai Massage with Cream | עיסוי תאילנדי עמוק (דיפ טישיו) עם קרם – פרימיום', en: 'Deep Tissue Thai Massage with Cream', ru: 'Глубокий тайский массаж с кремом', ka: 'ღრმა თაილანდური მასაჟი კრემით' },
    desc: {
      he: 'עיסוי תאילנדי עמוק במיוחד המתמקד בשכבות השריר הפנימיות. משלב טכניקות לחץ חזקות עם קרם ייעודי לעבודה טיפולית מדויקת. מיועד לעומס כרוני, ספורטאים וכאבים מתמשכים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'An extra-deep Thai massage targeting inner muscle layers. Combines strong pressure techniques with a dedicated cream for precise therapeutic work. Ideal for chronic load, athletes and ongoing pain. Full-body treatment including a gentle face massage.',
      ru: 'Очень глубокий тайский массаж, работающий с внутренними слоями мышц. Сочетает сильные техники давления с специальным кремом для точной терапевтической работы. Подходит при хронической нагрузке, спортсменам и при длительных болях. Полный массаж тела с мягким массажем лица.',
      ka: 'განსაკუთრებით ღრმა თაილანდური მასაჟი შიდა კუნთოვან შრეებზე. აერთიანებს ძლიერ წნევას და სპეციალურ კრემს ზუსტი თერაპიული მუშაობისთვის. იდეალურია ქრონიკული დატვირთვის, სპორტსმენებისა და ხანგრძლივი ტკივილისას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 250₾ · 90 דק׳ – 300₾', en: '60 min – 250₾ · 90 min – 300₾', ru: '60 мин – 250₾ · 90 мин – 300₾', ka: '60 წთ – 250₾ · 90 წთ – 300₾' }
  },

  'body-cannabis-oil': {
    tag: { he: '🌿 עיסוי תאילנדי עם שמן קנאביס', en: '🌿 Thai Cannabis Oil Massage', ru: '🌿 Тайский массаж с маслом каннабиса', ka: '🌿 თაილანდური მასაჟი კანაბისის ზეთით' },
    name: { he: 'Thai Cannabis Oil Massage | עיסוי תאילנדי עם שמן קנאביס', en: 'Thai Cannabis Oil Massage', ru: 'Тайский массаж с маслом каннабиса', ka: 'თაილანდური მასაჟი კანაბისის ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי מתקדם בשילוב שמן קנאביס ייעודי. מסייע בהפחתת כאבים, דלקות ומתחים שריריים. מתאים במיוחד לכאבים כרוניים ועומס פיזי מתמשך. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'An advanced Thai massage with dedicated cannabis oil. Helps reduce pain, inflammation and muscle tension. Especially suitable for chronic pain and ongoing physical load. Full-body treatment including a gentle face massage.',
      ru: 'Продвинутый тайский массаж со специальным маслом каннабиса. Помогает уменьшить боль, воспаление и мышечное напряжение. Особенно подходит при хронических болях и длительной физической нагрузке. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული თაილანდური მასაჟი სპეციალური კანაბისის ზეთით. ეხმარება ტკივილის, ანთებისა და კუნთოვანი დაძაბულობის შემცირებას. განსაკუთრებით კარგია ქრონიკული ტკივილისა და ხანგრძლივი ფიზიკური დატვირთვისას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 230₾ · 90 דק׳ – 280₾', en: '60 min – 230₾ · 90 min – 280₾', ru: '60 мин – 230₾ · 90 мин – 280₾', ka: '60 წთ – 230₾ · 90 წთ – 280₾' }
  },

  'body-hot-stone': {
    tag: { he: '🔥 עיסוי אבנים חמות', en: '🔥 Hot Stone Massage', ru: '🔥 Массаж горячими камнями', ka: '🔥 ცხელი ქვების მასაჟი' },
    name: { he: 'Hot Stone Massage | עיסוי אבנים חמות', en: 'Hot Stone Massage', ru: 'Массаж горячими камнями', ka: 'ცხელი ქვების მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא באמצעות אבני בזלת חמות. החום חודר לרקמות, משחרר מתחים עמוקים ומשפר זרימת דם. מאפשר עבודה רכה אך יעילה על עייפות וכאבים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'A full-body massage using warm basalt stones. Heat penetrates tissues, releases deep tension and improves circulation. Gentle yet effective for fatigue and aches. Full-body treatment including a gentle face massage.',
      ru: 'Массаж всего тела тёплыми базальтовыми камнями. Тепло проникает в ткани, снимает глубокие зажимы и улучшает кровообращение. Мягко, но эффективно при усталости и болях. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის მასაჟი თბილი ბაზალტის ქვებით. სითბო აღწევს ქსოვილებში, ხსნის ღრმა დაძაბულობას და აუმჯობესებს სისხლის მიმოქცევას. ნაზი, მაგრამ ეფექტური დაღლილობისა და ტკივილებისას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 210₾', en: '60 min – 210₾', ru: '60 мин – 210₾', ka: '60 წთ – 210₾' }
  },

  'body-thai-comp': {
    tag: { he: '🌼 עיסוי תאילנדי בקומפרסים צמחיים', en: '🌼 Thai Herbal Compress Massage', ru: '🌼 Травяные компрессы', ka: '🌼 მცენარეული კომპრესი' },
    name: { he: 'Thai Herbal Compress Massage | עיסוי תאילנדי בקומפרסים צמחיים', en: 'Thai Herbal Compress Massage', ru: 'Массаж травяными компрессами', ka: 'მცენარეული კომპრესის მასაჟი' },
    desc: {
      he: 'עיסוי מסורתי עם שקיות צמחים תאילנדיים מחוממות. החום והעשבים מסייעים בהרגעת כאבים, הפחתת דלקת ושחרור עומסים. משולב עם עיסוי ידני להעצמת תחושת הריפוי. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'Traditional massage with heated Thai herbal compresses. Heat and herbs help soothe pain, reduce inflammation and release overload. Combined with manual massage to enhance the healing effect. Full-body treatment including a gentle face massage.',
      ru: 'Традиционный массаж с подогретыми тайскими травяными мешочками. Тепло и травы помогают уменьшить боль, воспаление и снять перегрузку. В сочетании с ручным массажем усиливает эффект восстановления. Полный массаж тела с мягким массажем лица.',
      ka: 'ტრადიციული მასაჟი გახურებული თაილანდური მცენარეული კომპრესებით. სითბო და მცენარეები ამშვიდებს ტკივილს, ამცირებს ანთებას და ხსნის დატვირთვას. ერთიანდება მანუალურ მასაჟთან, რათა გაძლიერდეს აღდგენის ეფექტი. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 220₾ · 90 דק׳ – 260₾', en: '60 min – 220₾ · 90 min – 260₾', ru: '60 мин – 220₾ · 90 мин – 260₾', ka: '60 წთ – 220₾ · 90 წთ – 260₾' }
  },

  'body-karsai': {
    tag: { he: '🇹🇭 עיסוי תאילנדי קארסאי – פרימיום', en: '🇹🇭 Karsai Massage (Premium)', ru: '🇹🇭 Карсай массаж (Премиум)', ka: '🇹🇭 Karsai მასაჟი (Premium)' },
    name: { he: 'Karsai Massage | עיסוי תאילנדי קארסאי – פרימיום', en: 'Karsai Massage', ru: 'Карсай массаж', ka: 'Karsai მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי מתקדם מהרפואה העתיקה. מתמקד באזורים אנרגטיים עמוקים לאיזון וחיזוק הגוף. טיפול עוצמתי ונישתי המיועד למטופלים מנוסים בלבד. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'An advanced traditional Thai treatment from ancient medicine. Focuses on deep energetic areas for balance and strengthening. A powerful niche treatment intended for experienced clients only. Full-body treatment including a gentle face massage.',
      ru: 'Продвинутая традиционная тайская процедура из древней медицины. Фокус на глубоких энергетических зонах для баланса и укрепления. Мощная нишевая процедура — только для опытных клиентов. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული ტრადიციული თაილანდური პროცედურა უძველესი მედიცინიდან. ფოკუსირდება ღრმა ენერგეტიკულ ზონებზე ბალანსისა და გაძლიერებისთვის. ძლიერი, ნიშური პროცედურა მხოლოდ გამოცდილ კლიენტებისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 260₾ · 90 דק׳ – 320₾', en: '60 min – 260₾ · 90 min – 320₾', ru: '60 мин – 260₾ · 90 мин – 320₾', ka: '60 წთ – 260₾ · 90 წთ – 320₾' }
  },

  'foot-massage': {
    tag: { he: '🦶 פוט מסאז’ – עיסוי כפות רגליים (מרגיע)', en: '🦶 Foot Massage (Relaxing)', ru: '🦶 Массаж стоп (расслабляющий)', ka: '🦶 ფეხის მასაჟი (დამამშვიდებელი)' },
    name: { he: 'Foot Massage | פוט מסאז’ – עיסוי כפות רגליים (מרגיע)', en: 'Foot Massage', ru: 'Массаж стоп', ka: 'ფეხის მასაჟი' },
    desc: {
      he: 'עיסוי כפות רגליים עדין ומרגיע לשחרור עייפות והרפיה כללית.',
      en: 'A gentle, relaxing foot massage to release fatigue and bring overall relaxation.',
      ru: 'Нежный расслабляющий массаж стоп для снятия усталости и общего расслабления.',
      ka: 'ნაზი, დამამშვიდებელი ფეხის მასაჟი დაღლილობის მოსახსნელად და საერთო რელაქსაციისთვის.'
    },
    price: { he: '30 דק׳ – 80₾ · 60 דק׳ – 120₾', en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
  },

  'foot-reflexology': {
    tag: { he: '🦶 עיסוי תאילנדי כפות רגליים רפלקסולוגי – טיפולי', en: '🦶 Thai Reflexology Foot Massage (Therapeutic)', ru: '🦶 Тайская рефлексология стоп (лечебная)', ka: '🦶 თაილანდური რეფლექსოლოგია ფეხზე (თერაპიული)' },
    name: { he: 'Thai Reflexology Foot Massage | עיסוי תאילנדי כפות רגליים רפלקסולוגי – טיפולי', en: 'Thai Reflexology Foot Massage', ru: 'Тайский массаж стоп (рефлексология)', ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד לכפות הרגליים המבוסס על רפלקסולוגיה. מתבצע עם משחה תאילנדית חריפה ולחיצות עמוקות על נקודות השתקפות. מסייע בהמרצת זרימת הדם, שחרור עומסים והשפעה מערכתית.',
      en: 'A focused Thai foot treatment based on reflexology. Performed with a Thai warming balm and deep pressure on reflex points. Helps stimulate circulation, release load and support whole-body balance.',
      ru: 'Прицельная тайская процедура для стоп на основе рефлексологии. Выполняется с тайским разогревающим бальзамом и глубокими надавливаниями на рефлекторные точки. Помогает улучшить кровообращение, снять нагрузку и поддержать системный баланс.',
      ka: 'ფოკუსირებული თაილანდური ფეხის პროცედურა რეფლექსოლოგიის საფუძველზე. სრულდება თაილანდური გამათბობელი ბალზამით და ღრმა წერტილოვანი წნევით. ეხმარება სისხლის მიმოქცევის სტიმულაციას, დატვირთვის მოხსნას და სხეულის ბალანსს.'
    },
    price: { he: '60 דק׳ – 140₾', en: '60 min – 140₾', ru: '60 мин – 140₾', ka: '60 წთ – 140₾' }
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

function setupVideoSlider() {
  const viewport = document.getElementById('videoSlider');
  if (!viewport) return;

  const track = viewport.querySelector('.video-slider__track');
  const slides = [...viewport.querySelectorAll('.video-slide')];
  const prev = viewport.querySelector('.video-slider__nav--prev');
  const next = viewport.querySelector('.video-slider__nav--next');

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
        video.currentTime = 0;
      }
    });
  }

  function resize() {
    const w = viewport.clientWidth;
    slides.forEach(s => s.style.width = `${w}px`);
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

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  setupLangButtons();
  setupTreatmentButtons();

  // ✅ סליידר וידאו — מפעילים רק כאן (פעם אחת)
  setupSimpleVideoSlider();
});
