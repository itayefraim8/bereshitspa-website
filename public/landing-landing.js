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
  document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';
  applyTranslations(lang);
  applyTreatmentTexts(lang); // ✅ תרגום כרטיסי טיפולים (כולל תגיות)
}

// ===== מילון טקסטים (רק הכתוביות והכפתורים) =====
const LOCAL_STRINGS = {
  he: {
    // hero
    'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
    'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
    'landing.hero.subtitle': 'בחר/י טיפול, קבע/י שעה נוחה ותאם/י את ההזמנה בקלות בווטסאפ או בטלפון – הכול בדף אחד.',
    'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

    // treatments
    'landing.treatments.title': 'בחר/י טיפול מפנק',
    'landing.treatments.subtitle': 'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',
    'landing.treatment.book': 'להזמנת הטיפול',

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
    'landing.booking.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. אישור הזמנה יישלח אליך אוטומטית.',
    'landing.booking.payCta': 'מעבר לתשלום מאובטח',

    // card landing
    'card.hero.eyebrow': 'Special Offer · Limited Slots',
    'card.hero.title': 'כרטיסייה של 7 טיפולים מפנקים',
    'card.hero.subtitle': 'משלמים פעם אחת, נהנים מ-7 ביקורים ב-Bereshit Spa. אפשר לשלב טיפולים שונים ולהעביר לחברים/משפחה.',
    'card.hero.cta': 'לרכישת כרטיסייה עכשיו',

    'card.details.title': 'מה כולל הכרטיסייה?',
    'card.details.li1': '7 טיפולים לבחירה מתוך תפריט הטיפולים המלא.',
    'card.details.li2': 'אפשר לפצל בין בני משפחה / זוג / חברים.',
    'card.details.li3': 'תוקף הכרטיסייה – 6 חודשים מיום הרכישה.',
    'card.details.li4': 'תיאום תור מראש בווטסאפ או טלפון.',
    'card.details.note': 'לאחר התשלום תקבלו אישור רכישה למייל/ווטסאפ, והכרטיסייה תירשם על שמכם במערכת שלנו.',

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
    'landing.hero.subtitle': 'Choose a treatment, pick a convenient time, and easily confirm via WhatsApp or phone — all in one page.',
    'landing.hero.cta': 'Choose treatment & book now',

    'landing.treatments.title': 'Choose your treatment',
    'landing.treatments.subtitle': 'All treatments are performed by professional Thai therapists, in a quiet atmosphere with relaxing music.',
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

    'card.hero.eyebrow': 'Special Offer · Limited Slots',
    'card.hero.title': '7-Treatment Punch Card',
    'card.hero.subtitle': 'Pay once and enjoy 7 visits at Bereshit Spa. Mix different treatments and share with family or friends.',
    'card.hero.cta': 'Buy the punch card now',

    'card.details.title': 'What does the card include?',
    'card.details.li1': '7 treatments to choose from our full treatment menu.',
    'card.details.li2': 'You can share between family members / couples / friends.',
    'card.details.li3': 'Card validity – 6 months from purchase date.',
    'card.details.li4': 'Appointments are scheduled in advance via WhatsApp or phone.',
    'card.details.note': 'After payment you will receive a confirmation by email/WhatsApp and the card will be registered in your name.',

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
    'landing.hero.subtitle': 'Выберите процедуру, удобное время и легко подтвердите запись через WhatsApp или по телефону — всё на одной странице.',
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

    'card.hero.eyebrow': 'Специальное предложение · ограниченное число мест',
    'card.hero.title': 'Абонемент на 7 процедур',
    'card.hero.subtitle': 'Оплачиваете один раз – получаете 7 визитов в Bereshit Spa. Можно комбинировать процедуры и делиться с близкими.',
    'card.hero.cta': 'Купить абонемент',

    'card.details.title': 'Что входит в абонемент?',
    'card.details.li1': '7 процедур на выбор из полного меню.',
    'card.details.li2': 'Можно делить между семьёй, парой или друзьями.',
    'card.details.li3': 'Срок действия – 6 месяцев с даты покупки.',
    'card.details.li4': 'Предварительная запись по WhatsApp или телефону.',
    'card.details.note': 'После оплаты вы получите подтверждение по email/WhatsApp, а абонемент будет зарегистрирован на ваше имя.',

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
    'landing.hero.subtitle': 'აირჩიეთ პროცედურა, დაგეგმეთ კომფორტული დრო და მარტივად დაადასტურეთ WhatsApp-ით ან ტელეფონით — ერთ გვერდზე.',
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

    'card.hero.eyebrow': 'სპეციალური შეთავაზება · შეზღუდული რაოდენობა',
    'card.hero.title': '7 პროცედურის აბონემენტი',
    'card.hero.subtitle': 'ერთხელ იხდით და 7 ვიზიტს იღებთ Bereshit Spa-ში. შეგიძლიათ შეუთავსოთ სხვადასხვა პროცედურები და გააზიარო ოჯახის წევრებთან ან მეგობრებთან.',
    'card.hero.cta': 'აბონემენტის ყიდვა',

    'card.details.title': 'რა შედის აბონემენტში?',
    'card.details.li1': '7 პროცედურა ჩვენი სრული მენის არჩევანიდან.',
    'card.details.li2': 'შესაძლებელია ოჯახის, წყვილის ან მეგობრების შორის განაწილება.',
    'card.details.li3': 'ვადა – 6 თვე შეძენის დღიდან.',
    'card.details.li4': 'წინასწარი ჩაწერა WhatsApp-ით ან ტელეფონით.',
    'card.details.note': 'გადახდის შემდეგ მიიღებთ დადასტურებას Email-ით/WhatsApp-ით და აბონემენტი დარეგისტრირდება თქვენს სახელზე.',

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

// ===== מטא טיפולים (שם/תגית/תיאור/מחיר) =====
const TREATMENTS_META = {
  'head-spa': {
    tag: {
      he: '👑 ספא ראש יפני',
      en: '👑 Japanese Head Spa',
      ru: '👑 Japanese Head Spa',
      ka: '👑 Japanese Head Spa'
    },
    name: {
      he: 'טיפול הדגל – ספא ראש יפני',
      en: 'Signature Japanese Head Spa',
      ru: 'Фирменный Japanese Head Spa',
      ka: 'სიგნატურული იაპონური Head Spa'
    },
    desc: {
      he: 'עיסוי יפני מסורתי המשלב ניקוי, עיסוי קרקפת, מסכות ופינוקי מים חמימים. הטכניקה ממריצה את זרימת הדם, מחזקת את שורשי השיער ומרגיעה עומקים. כולל שטיפה, מגבת חמה, סרום לקרקפת וייבוש שיער מלא. מסיים במנוחה קצרה עם תה וניחוח ארומטי עדין. (90 דק\' כולל עיסוי ידיים ורגליים)',
      en: 'A traditional Japanese ritual combining cleansing, scalp massage, masks and warm-water pampering. The technique boosts circulation, strengthens hair roots and deeply relaxes. Includes hair wash, hot towel, scalp serum and a full blow-dry. Finished with a short rest with tea and a gentle aromatic scent. (90 min includes hand & foot massage.)',
      ru: 'Традиционный японский ритуал: очищение, массаж кожи головы, маски и тёплое водное расслабление. Техника улучшает кровообращение, укрепляет корни волос и глубоко успокаивает. Включает мытьё головы, горячее полотенце, сыворотку для кожи головы и полную сушку. В завершение — короткий отдых с чаем и лёгким ароматом. (90 минут включает массаж рук и ног.)',
      ka: 'ტრადიციული იაპონური რიტუალი, რომელიც აერთიანებს წმენდას, თავის კანის მასაჟს, ნიღბებს და თბილ წყლის პამფერს. ტექნიკა აძლიერებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ღრმად ამშვიდებს. შეიცავს თმის დაბანას, ცხელ პირსახოცს, თავის კანის სერუმს და სრულ გაშრობას. დასრულება — მოკლე დასვენებით, ჩაისთან ერთად და მსუბუქი არომატით. (90 წთ მოიცავს ხელებისა და ფეხების მასაჟს.)'
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
      ru: '🌼 Thai Herbal Compress Facial',
      ka: '🌼 Thai Herbal Compress Facial'
    },
    name: {
      he: 'עיסוי פנים בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Facial',
      ru: 'Массаж лица с тайскими травяными компрессами',
      ka: 'სახის მასაჟი თაილანდური მცენარეულის კომპრესებით'
    },
    desc: {
      he: 'קומפרסים תאילנדיים חמים מרפים את שרירי הפנים ומשפרים את זרימת הדם. החום מעודד ספיגת לחות ומעניק לעור תחושת רכות והתחדשות טבעית. כולל עיסוי פנים מעמיק, עיסוי קרקפת מרגיע ועבודה על פלג גוף עליון. טיפול חמים, מפנק ועוטף שמעניק רוגע עמוק.',
      en: 'Warm Thai herbal compresses relax facial muscles and improve circulation. The heat supports hydration absorption and leaves the skin feeling soft and naturally renewed. Includes a deep facial massage, calming scalp massage, and work on the upper body. A warm, pampering treatment that brings deep relaxation.',
      ru: 'Тёплые тайские травяные компрессы расслабляют мышцы лица и улучшают кровообращение. Тепло способствует впитыванию влаги и дарит коже мягкость и естественное обновление. Включает глубокий массаж лица, успокаивающий массаж кожи головы и работу с верхней частью тела. Тёплая, обволакивающая процедура для глубокого расслабления.',
      ka: 'თბილი თაილანდური მცენარეული კომპრესები ამშვიდებს სახის კუნთებს და აუმჯობესებს სისხლის მიმოქცევას. სითბო ხელს უწყობს ტენიანობის უკეთ შეწოვას და ანიჭებს კანს რბილობასა და ბუნებრივ განახლებას. შეიცავს ღრმა სახის მასაჟს, დამამშვიდებელ თავის მასაჟს და ზედა ტანის დამუშავებას. თბილი, მოფერებითი პროცედურა ღრმა რელაქსაციისთვის.'
    },
    price: {
      he: "60 דק' – 150₾",
      en: '60 min – 150₾',
      ru: '60 мин – 150₾',
      ka: '60 წთ – 150₾'
    }
  },

  'facial-hot-stone': {
    tag: {
      he: '🔥 אבנים חמות לפנים',
      en: '🔥 Hot Stone Facial',
      ru: '🔥 Hot Stone Facial',
      ka: '🔥 Hot Stone Facial'
    },
    name: {
      he: 'עיסוי פנים באבנים חמות',
      en: 'Hot Stone Facial',
      ru: 'Массаж лица горячими камнями',
      ka: 'სახის მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'אבני בזלת חמות נעות בעדינות על הפנים והצוואר ומשחררות מתחים. כולל עיסוי פנים, קרקפת, צוואר ופלג גוף עליון. החום משפר זרימת דם, מרכך שרירים ומעניק שחרור עמוק. מתאים במיוחד לעומס נפשי ועייפות באזור הראש.',
      en: 'Warm basalt stones gently glide over the face and neck to release tension. Includes face, scalp, neck and upper-body massage. The heat improves circulation, softens muscles and provides deep release — ideal for mental overload and head-area fatigue.',
      ru: 'Тёплые базальтовые камни мягко скользят по лицу и шее, снимая напряжение. Включает массаж лица, кожи головы, шеи и верхней части тела. Тепло улучшает кровообращение, размягчает мышцы и даёт глубокое освобождение — особенно подходит при стрессе и усталости в области головы.',
      ka: 'თბილი ბაზალტის ქვები ნაზად სრიალებენ სახესა და კისერზე და ხსნიან დაძაბულობას. შეიცავს სახის, თავის, კისრის და ზედა ტანის მასაჟს. სითბო აუმჯობესებს სისხლის მიმოქცევას, არბილებს კუნთებს და იძლევა ღრმა განტვირთვას — განსაკუთრებით კარგია ფსიქიკური დატვირთვისა და თავის არეში დაღლილობის დროს.'
    },
    price: {
      he: "60 דק' – 160₾",
      en: '60 min – 160₾',
      ru: '60 мин – 160₾',
      ka: '60 წთ – 160₾'
    }
  },

  'facial-thai': {
    tag: {
      he: '🌺 עיסוי פנים תאילנדי',
      en: '🌺 Traditional Thai Face Massage',
      ru: '🌺 Traditional Thai Face Massage',
      ka: '🌺 Traditional Thai Face Massage'
    },
    name: {
      he: 'עיסוי פנים תאילנדי מסורתי',
      en: 'Traditional Thai Face Massage',
      ru: 'Традиционный тайский массаж лица',
      ka: 'ტრადიციული ტაილანდური სახის მასაჟი'
    },
    desc: {
      he: 'עיסוי עדין המבוסס על טכניקות תאילנדיות עתיקות ולחיצות אנרגטיות. משחרר מתח מהפנים, הלסת והצוואר. בגרסת 60 דקות כולל גם עיסוי כתפיים ופלג גוף עליון. מעודד רגיעה, זרימה ואיזון עצבי עמוק.',
      en: 'A gentle massage based on ancient Thai techniques and energizing acupressure. Releases tension from the face, jaw and neck. The 60-minute version also includes shoulders and upper-body massage. Promotes relaxation, flow and deep nervous-system balance.',
      ru: 'Нежный массаж на основе древних тайских техник и энергетического точечного воздействия. Снимает напряжение с лица, челюсти и шеи. В версии 60 минут также включает массаж плеч и верхней части тела. Способствует расслаблению, улучшению циркуляции и глубокому балансу нервной системы.',
      ka: 'ნაზი მასაჟი ძველი ტაილანდური ტექნიკებისა და ენერგეტიკული წერტილოვანი დაწოლების საფუძველზე. ხსნის დაძაბულობას სახიდან, ყბიდან და კისრიდან. 60-წუთიანი ვერსია დამატებით მოიცავს მხრებისა და ზედა ტანის მასაჟსაც. ხელს უწყობს რელაქსაციას, „დინებას“ და ნერვული სისტემის ღრმა ბალანსს.'
    },
    price: {
      he: "30 דק' – 90₾ · 60 דק' – 150₾",
      en: '30 min – 90₾ · 60 min – 150₾',
      ru: '30 мин – 90₾ · 60 мин – 150₾',
      ka: '30 წთ – 90₾ · 60 წთ – 150₾'
    }
  },

  'facial-aroma': {
    tag: {
      he: '🌿 ארומתרפיה לפנים',
      en: '🌿 Aromatherapy Facial',
      ru: '🌿 Aromatherapy Facial',
      ka: '🌿 Aromatherapy Facial'
    },
    name: {
      he: 'עיסוי פנים ארומתרפי',
      en: 'Aromatherapy Facial',
      ru: 'Ароматерапевтический массаж лица',
      ka: 'არომატერაპიული სახის მასაჟი'
    },
    desc: {
      he: 'טיפול עדין עם שמנים אתריים טהורים המותאמים לנשימה ולעור הפנים. מרגיע את מערכת העצבים ומשפר את זרימת הדם בעור. בגרסת 60 דקות כולל עיסוי כתפיים עמוק וקרקפת מורחבת. מעניק תחושת רכות, זוהר ואיזון רגשי עמוק.',
      en: 'A delicate treatment with pure essential oils tailored for breathing and facial skin. Calms the nervous system and improves skin circulation. The 60-minute version includes deep shoulder massage and extended scalp work. Leaves the skin soft and glowing, with a deep emotional balance.',
      ru: 'Нежная процедура с чистыми эфирными маслами, подобранными для дыхания и кожи лица. Успокаивает нервную систему и улучшает кровообращение кожи. В версии 60 минут включает глубокий массаж плеч и расширенный массаж кожи головы. Дарит мягкость, сияние и глубокий эмоциональный баланс.',
      ka: 'ნაზი პროცედურა სუფთა ეთერზეთებით, რომლებიც მორგებულია სუნთქვასა და სახის კანზე. ამშვიდებს ნერვულ სისტემას და აუმჯობესებს კანის სისხლის მიმოქცევას. 60-წუთიანი ვერსია მოიცავს ღრმა მხრების მასაჟს და გახანგრძლივებულ თავის მასაჟს. ანიჭებს რბილობას, ბზინვარებას და ღრმა ემოციურ ბალანსს.'
    },
    price: {
      he: "30 דק' – 80₾ · 60 דק' – 140₾",
      en: '30 min – 80₾ · 60 min – 140₾',
      ru: '30 мин – 80₾ · 60 мин – 140₾',
      ka: '30 წთ – 80₾ · 60 წთ – 140₾'
    }
  },

  'back-basic': {
    tag: {
      he: '💆‍♂️ גב–כתפיים–צוואר',
      en: '💆‍♂️ Back–Neck–Shoulders',
      ru: '💆‍♂️ Спина–Шея–Плечи',
      ka: '💆‍♂️ ზურგი–კისერი–მხრები'
    },
    name: {
      he: 'עיסוי גב–כתפיים–צוואר',
      en: 'Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч',
      ka: 'ზურგის, კისრის და მხრების მასაჟი'
    },
    desc: {
      he: 'עיסוי ממוקד לשחרור מתחים וחסימות באזורי העומס המרכזיים. משחרר שרירים תפוסים ומחזיר גמישות ותנועתיות טבעית. כולל לחיצות עמוקות ותנועות ארוכות לשחרור מדויק ומיידי. מומלץ לכאבי צוואר, ישיבה ממושכת ועומס יומיומי.',
      en: 'A focused massage to release tension and blockages in the main stress areas. Loosens tight muscles and restores natural flexibility and mobility. Combines deep pressure with long strokes for fast, precise relief. Recommended for neck pain, long hours of sitting, and daily stress.',
      ru: 'Прицельный массаж для снятия напряжения и блоков в основных зонах нагрузки. Расслабляет зажатые мышцы и возвращает естественную гибкость и подвижность. Сочетает глубокие надавливания и длинные движения для точного и быстрого облегчения. Рекомендуется при болях в шее, длительном сидении и ежедневной нагрузке.',
      ka: 'მიზანმიმართული მასაჟი, რომელიც ხსნის დაძაბულობასა და „ბლოკებს“ მთავარი დატვირთვის ზონებში. ათავისუფლებს დაჭიმულ კუნთებს და აბრუნებს ბუნებრივ მოქნილობასა და მოძრაობას. აერთიანებს ღრმა წნევას და გრძელ მოძრაობებს სწრაფი და ზუსტი შედეგისთვის. რეკომენდებულია კისრის ტკივილის, ხანგრძლივი ჯდომისა და ყოველდღიური სტრესის დროს.'
    },
    price: {
      he: "60 דק' – 150₾",
      en: '60 min – 150₾',
      ru: '60 мин – 150₾',
      ka: '60 წთ – 150₾'
    }
  },

  'back-hot-stone': {
    tag: {
      he: '🔥 אבנים חמות לגב',
      en: '🔥 Hot Stone Back Massage',
      ru: '🔥 Hot Stone Back Massage',
      ka: '🔥 Hot Stone Back Massage'
    },
    name: {
      he: 'עיסוי גב–כתפיים–צוואר עם אבנים חמות',
      en: 'Hot Stone Back–Neck–Shoulders Massage',
      ru: 'Массаж спины, шеи и плеч горячими камнями',
      ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'אבני בזלת חמות חודרות לשרירים וממיסות מתחים עמוקים. החום מאפשר עבודה יעילה ובטוחה על אזורי עומס וכאב כרוני. משלב עיסוי ידני מעמיק ליצירת הרפיה מלאה של פלג הגוף העליון. מומלץ לעומס חוזר, כאבים כרוניים ומתח נפשי.',
      en: 'Warm basalt stones penetrate the muscles and melt deep tension. The heat allows safe, effective work on stress zones and chronic pain. Combined with deep manual massage for full upper-body relaxation. Recommended for recurring overload, chronic pain, and mental stress.',
      ru: 'Тёплые базальтовые камни глубоко прогревают мышцы и снимают глубокие зажимы. Тепло позволяет безопасно и эффективно работать с зонами нагрузки и хронической болью. В сочетании с глубоким ручным массажем даёт полное расслабление верхней части тела. Рекомендуется при повторяющихся нагрузках, хронических болях и стрессе.',
      ka: 'თბილი ბაზალტის ქვები ღრმად ათბობს კუნთებს და ხსნის ღრმა დაძაბულობას. სითბო უზრუნველყოფს უსაფრთხო და ეფექტურ მუშაობას დატვირთვის ზონებსა და ქრონიკულ ტკივილზე. კომბინირებულია ღრმა მანუალური მასაჟით ზედა ტანის სრული განტვირთვისთვის. რეკომენდებულია განმეორებადი დატვირთვის, ქრონიკული ტკივილისა და ფსიქიკური სტრესის დროს.'
    },
    price: {
      he: "60 דק' – 180₾",
      en: '60 min – 180₾',
      ru: '60 мин – 180₾',
      ka: '60 წთ – 180₾'
    }
  },

  'body-thai': {
    tag: {
      he: '🇹🇭 עיסוי תאילנדי מסורתי',
      en: '🇹🇭 Traditional Thai Massage',
      ru: '🇹🇭 Traditional Thai Massage',
      ka: '🇹🇭 Traditional Thai Massage'
    },
    name: {
      he: 'עיסוי תאילנדי מסורתי',
      en: 'Traditional Thai Massage',
      ru: 'Традиционный тайский массаж',
      ka: 'ტრადიციული ტაილანდური მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. טיפול עתיק ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה (Sen). משפר גמישות, מפיג עומס ומחזיר תנועה חופשית לגוף. הטכניקה מעוררת זרימה אנרגטית ומעניקה חיוניות עמוקה.',
      en: 'Full-body massage from feet to head, including a face massage. An ancient oil-free treatment combining pressure, stretches and work on energy lines (Sen). Improves flexibility, relieves overload and restores free movement. The technique awakens energetic flow and brings deep vitality.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Древняя процедура без масла с надавливаниями, растяжками и работой по энергетическим линиям (Sen). Улучшает гибкость, снимает нагрузку и возвращает свободное движение. Техника активирует энергетический поток и дарит глубокую бодрость.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. უძველესი პროცედურა ზეთის გარეშე — აერთიანებს წნევას, გაჭიმვებს და ენერგეტიკულ ხაზებზე მუშაობას (Sen). აუმჯობესებს მოქნილობას, ამცირებს დატვირთვას და აბრუნებს თავისუფალ მოძრაობას. ტექნიკა აღვიძებს ენერგეტიკულ დინებას და ანიჭებს ღრმა სიცოცხლისუნარიანობას.'
    },
    price: {
      he: "60 דק' – 170₾ · 90 דק' – 220₾",
      en: '60 min – 170₾ · 90 min – 220₾',
      ru: '60 мин – 170₾ · 90 мин – 220₾',
      ka: '60 წთ – 170₾ · 90 წთ – 220₾'
    }
  },

  'body-thai-oil': {
    tag: {
      he: '🇹🇭 עיסוי שמן תאילנדי',
      en: '🇹🇭 Thai Oil Massage',
      ru: '🇹🇭 Thai Oil Massage',
      ka: '🇹🇭 Thai Oil Massage'
    },
    name: {
      he: 'עיסוי שמן תאילנדי',
      en: 'Thai Oil Massage',
      ru: 'Тайский масляный массаж',
      ka: 'ტაილანდური ზეთოვანი მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. עיסוי גוף מלא בשמן חם בתנועות זורמות ועמוקות. משלב לחיצות תאילנדיות להמסה של מתח ועומס שרירי. מאזן את מערכת העצבים ומשרה רוגע מפנק בכל הגוף.',
      en: 'Full-body massage from feet to head, including a face massage. A full-body warm-oil massage with flowing and deep strokes. Combines Thai pressure techniques to melt tension and muscular overload. Balances the nervous system and brings a soothing, pampering calm.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Массаж тёплым маслом с плавными и глубокими движениями. Сочетает тайские техники давления для снятия напряжения и мышечной нагрузки. Балансирует нервную систему и дарит расслабление всему телу.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. თბილი ზეთით სრულსხეულიანი მასაჟი — მოლივლივე და ღრმა მოძრაობებით. აერთიანებს ტაილანდურ წნევით ტექნიკებს დაძაბულობისა და კუნთოვანი დატვირთვის მოსახსნელად. აბალანსებს ნერვულ სისტემას და ქმნის მოფერებით, დამამშვიდებელ განცდას.'
    },
    price: {
      he: "60 דק' – 180₾ · 90 דק' – 230₾",
      en: '60 min – 180₾ · 90 min – 230₾',
      ru: '60 мин – 180₾ · 90 мин – 230₾',
      ka: '60 წთ – 180₾ · 90 წთ – 230₾'
    }
  },

  'body-aroma': {
    tag: {
      he: '🌿 עיסוי ארומתרפי בשמן',
      en: '🌿 Aromatherapy Oil Massage',
      ru: '🌿 Aromatherapy Oil Massage',
      ka: '🌿 Aromatherapy Oil Massage'
    },
    name: {
      he: 'עיסוי ארומתרפי בשמן',
      en: 'Aromatherapy Oil Massage',
      ru: 'Аромамассаж с маслом',
      ka: 'არომატერაპიული ზეთოვანი მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. שמנים אתריים טהורים בשילוב עיסוי גוף מרגיע ומלטף. הריחות הטבעיים מאזנים את מערכת העצבים ומפחיתים מתחים. התנועות האיטיות מרפות עומס שרירי ויוצרות תחושת שלווה עמוקה.',
      en: 'Full-body massage from feet to head, including a face massage. Pure essential oils combined with a soothing, flowing massage. Natural aromas help balance the nervous system and reduce stress. Slow movements release muscular tension and create a deep sense of peace.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Чистые эфирные масла в сочетании с мягким расслабляющим массажем. Натуральные ароматы балансируют нервную систему и снижают стресс. Медленные движения снимают мышечное напряжение и создают глубокое чувство покоя.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. სუფთა ეთერზეთები და დამამშვიდებელი, მოლივლივე მასაჟი. ბუნებრივი არომატები აბალანსებს ნერვულ სისტემას და ამცირებს სტრესს. ნელი მოძრაობები ხსნის კუნთოვან დაძაბულობას და ქმნის ღრმა სიმშვიდეს.'
    },
    price: {
      he: "60 דק' – 190₾",
      en: '60 min – 190₾',
      ru: '60 мин – 190₾',
      ka: '60 წთ – 190₾'
    }
  },

  'body-thai-ther': {
    tag: {
      he: '🇹🇭 עיסוי תאילנדי רפואי',
      en: '🇹🇭 Thai Therapeutic Massage',
      ru: '🇹🇭 Thai Therapeutic Massage',
      ka: '🇹🇭 Thai Therapeutic Massage'
    },
    name: {
      he: 'עיסוי תאילנדי רפואי',
      en: 'Thai Therapeutic Massage',
      ru: 'Тайский лечебный массаж',
      ka: 'ტაილანდური თერაპიული მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. עיסוי טיפולי עמוק המשלב לחיצות ממוקדות ומתיחות מדויקות. מטפל בכאבי גב, צוואר וכתפיים ובשרירים תפוסים כרונית. מעודד שיקום תנועתי והקלה אמיתית ומתמשכת.',
      en: 'Full-body massage from feet to head, including a face massage. A deep therapeutic massage combining focused pressure and precise stretches. Treats back, neck and shoulder pain and chronically tight muscles. Supports mobility recovery and long-lasting relief.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Глубокий лечебный массаж с прицельным давлением и точными растяжками. Помогает при болях в спине, шее и плечах и хронических зажимах. Способствует восстановлению подвижности и длительному облегчению.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. ღრმა თერაპიული მასაჟი მიზანმიმართული წნევით და ზუსტი გაჭიმვებით. მუშაობს ზურგის, კისრისა და მხრების ტკივილზე და ქრონიკულად დაჭიმულ კუნთებზე. ხელს უწყობს მოძრაობის აღდგენას და ხანგრძლივ შვებას.'
    },
    price: {
      he: "60 דק' – 230₾ · 90 דק' – 280₾",
      en: '60 min – 230₾ · 90 min – 280₾',
      ru: '60 мин – 230₾ · 90 мин – 280₾',
      ka: '60 წთ – 230₾ · 90 წთ – 280₾'
    }
  },

  'body-hot-stone': {
    tag: {
      he: '🔥 עיסוי אבנים חמות',
      en: '🔥 Hot Stone Massage',
      ru: '🔥 Hot Stone Massage',
      ka: '🔥 Hot Stone Massage'
    },
    name: {
      he: 'עיסוי באבנים חמות – גוף מלא',
      en: 'Full Body Hot Stone Massage',
      ru: 'Массаж горячими камнями всего тела',
      ka: 'მთლიანი სხეულის მასაჟი ცხელ ქვებთან'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. אבני בזלת חמות מחליקות על הגוף וממיסות מתחים עמוקים. החום חודר לרקמות ומעניק רוגע עמוק וזרימת דם טובה. מאפשר עבודה רכה אך יעילה על עייפות וכאבים.',
      en: 'Full-body massage from feet to head, including a face massage. Warm basalt stones glide over the body and melt deep tension. Heat penetrates tissues, brings profound calm and supports healthy circulation. Gentle yet effective for fatigue and aches.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Тёплые базальтовые камни скользят по телу и снимают глубокое напряжение. Тепло проникает в ткани, дарит глубокое расслабление и улучшает кровообращение. Мягко, но эффективно при усталости и болях.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. თბილი ბაზალტის ქვები სრიალებენ სხეულზე და ხსნიან ღრმა დაძაბულობას. სითბო ღრმად აღწევს ქსოვილებში, იძლევა ღრმა რელაქსაციას და აუმჯობესებს სისხლის მიმოქცევას. ნაზი, მაგრამ ეფექტური დაღლილობისა და ტკივილებისთვის.'
    },
    price: {
      he: "60 דק' – 210₾",
      en: '60 min – 210₾',
      ru: '60 мин – 210₾',
      ka: '60 წთ – 210₾'
    }
  },

  'body-thai-comp': {
    tag: {
      he: '🌼 קומפרסים תאילנדיים',
      en: '🌼 Thai Herbal Compress Massage',
      ru: '🌼 Thai Herbal Compress Massage',
      ka: '🌼 Thai Herbal Compress Massage'
    },
    name: {
      he: 'עיסוי גוף בקומפרסים תאילנדים',
      en: 'Thai Herbal Compress Body Massage',
      ru: 'Массаж тела с тайскими травяными компрессами',
      ka: 'ტანის მასაჟი თაილანდური მცენარეული კომპრესებით'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. שקיות צמחים תאילנדיים חמות מעניקות ריפוי טבעי וניקוז עומק. החום והעשבים מרגיעים כאבים, מפחיתים דלקת ומשפרים חיוניות. משלב עיסוי עשיר להעצמת תחושת השחרור.',
      en: 'Full-body massage from feet to head, including a face massage. Warm Thai herbal pouches provide natural healing and deep drainage. Heat and herbs soothe pain, reduce inflammation and boost vitality. Combined with a rich massage to enhance the feeling of release.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Тёплые тайские травяные мешочки дают естественное восстановление и глубокий дренаж. Тепло и травы снимают боль, уменьшают воспаление и повышают жизненный тонус. В сочетании с насыщенным массажем усиливает ощущение освобождения.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. თბილი თაილანდური ბალახეულის პაკეტები უზრუნველყოფს ბუნებრივ განკურნებას და ღრმა დრენაჟს. სითბო და ბალახები ამშვიდებს ტკივილს, ამცირებს ანთებას და ზრდის ენერგიას. კომბინირებულია მდიდარ მასაჟთან განტვირთვის ეფექტის გასაძლიერებლად.'
    },
    price: {
      he: "60 דק' – 220₾ · 90 דק' – 260₾",
      en: '60 min – 220₾ · 90 min – 260₾',
      ru: '60 мин – 220₾ · 90 мин – 260₾',
      ka: '60 წთ – 220₾ · 90 წთ – 260₾'
    }
  },

  'body-shiatsu': {
    tag: {
      he: '🇯🇵 שיאצו יפני',
      en: '🇯🇵 JP Shiatsu Massage',
      ru: '🇯🇵 JP Shiatsu Massage',
      ka: '🇯🇵 JP Shiatsu Massage'
    },
    name: {
      he: 'עיסוי שיאצו יפני',
      en: 'Japanese Shiatsu Massage',
      ru: 'Японский массаж Шиацу',
      ka: 'იაპონური შიაცუ მასაჟი'
    },
    desc: {
      he: 'עיסוי גוף מלא מכף רגל ועד ראש כולל עיסוי פנים. עיסוי ללא שמן המתבצע בלחיצות לאורך מרידיאני הגוף. מאזן אנרגיה פנימית ומשחרר עומס מהמערכת העצבית. מתאים לעייפות, מתח נפשי וחוסר ריכוז.',
      en: 'Full-body massage from feet to head, including a face massage. An oil-free pressure massage along the body’s meridians. Balances inner energy and releases load from the nervous system. Ideal for fatigue, mental stress and lack of focus.',
      ru: 'Массаж всего тела от стоп до головы, включая массаж лица. Массаж без масла с надавливаниями по меридианам тела. Балансирует внутреннюю энергию и снимает нагрузку с нервной системы. Подходит при усталости, стрессе и снижении концентрации.',
      ka: 'მთლიანი სხეულის მასაჟი ტერფებიდან თავამდე, მათ შორის სახის მასაჟით. ზეთის გარეშე წერტილოვანი მასაჟი სხეულის მერიდიანების გასწვრივ. აბალანსებს შიდა ენერგიას და ამცირებს ნერვული სისტემის დატვირთვას. შესაფერისია დაღლილობის, ფსიქიკური სტრესისა და კონცენტრაციის დაქვეითების დროს.'
    },
    price: {
      he: "60 דק' – 180₾ · 90 דק' – 230₾",
      en: '60 min – 180₾ · 90 min – 230₾',
      ru: '60 мин – 180₾ · 90 мин – 230₾',
      ka: '60 წთ – 180₾ · 90 წთ – 230₾'
    }
  },

  'foot-massage': {
    tag: {
      he: '🦶 פוט מסאז\'',
      en: '🦶 Thai Foot Massage',
      ru: '🦶 Thai Foot Massage',
      ka: '🦶 Thai Foot Massage'
    },
    name: {
      he: "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי",
      en: 'Thai Foot Reflexology Massage',
      ru: 'Тайский массаж стоп (рефлексология)',
      ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი'
    },
    desc: {
      he: 'עיסוי עמוק ועדין המשלב טכניקות תאילנדיות ולחיצות רפלקסולוגיות. מפעיל נקודות השתקפות, משפר זרימת דם ומאזן מערכות גוף שונות. מרפה עומסים מצטברים ומעניק רוגע עמוק לגוף ולנפש. מומלץ לאחר הליכה מרובה, עמידה ממושכת או יום עמוס.',
      en: 'A deep yet gentle massage combining Thai techniques and reflexology pressure. Activates reflection points, improves circulation and balances different body systems. Releases accumulated tension and brings deep relaxation to body and mind. Recommended after lots of walking, long standing, or a busy day.',
      ru: 'Глубокий и мягкий массаж, сочетающий тайские техники и рефлексологические надавливания. Активирует рефлекторные точки, улучшает кровообращение и балансирует различные системы организма. Снимает накопившуюся нагрузку и дарит глубокое расслабление. Рекомендуется после длительной ходьбы, долгого стояния или напряжённого дня.',
      ka: 'ღრმა და ნაზი მასაჟი, რომელიც აერთიანებს ტაილანდურ ტექნიკებსა და რეფლექსოლოგიურ წნევას. ააქტიურებს რეფლექსურ წერტილებს, აუმჯობესებს სისხლის მიმოქცევას და აბალანსებს სხეულის სხვადასხვა სისტემას. ხსნის დაგროვილ დატვირთვას და იძლევა ღრმა სიმშვიდეს სხეულსა და გონებაში. რეკომენდებულია ბევრი სიარულის, ხანგრძლივი დგომის ან დატვირთული დღის შემდეგ.'
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

    const tagMap = meta.tag || {};
    const nameMap = meta.name || {};
    const descMap = meta.desc || {};
    const priceMap = meta.price || {};

    const tagEl = card.querySelector('.tag');
    if (tagEl && tagMap) {
      tagEl.textContent = tagMap[lang] || tagMap.he || tagEl.textContent;
    }

    const titleEl = card.querySelector('.product-title');
    if (titleEl && nameMap) {
      titleEl.textContent = nameMap[lang] || nameMap.he || titleEl.textContent;
    }

    const descEl = card.querySelector('p:not(.price)');
    if (descEl && descMap) {
      descEl.textContent = descMap[lang] || descMap.he || descEl.textContent;
    }

    const priceEl = card.querySelector('.price');
    if (priceEl && priceMap) {
      priceEl.textContent = priceMap[lang] || priceMap.he || priceEl.textContent;
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
        (btn.closest('.product-card')?.querySelector('.product-title')?.textContent.trim() ?? 'Treatment');

      let duration = '';
      if (group) {
        const span = document.querySelector(`input[name="${group}"]:checked + span`) || null;
        if (span) duration = span.textContent.trim();
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
  setupCardButtons();
});
