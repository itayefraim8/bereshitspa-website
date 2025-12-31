// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כפתור וואטסאפ צף + Video Slider + Signature Slider

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
  applySignatureTexts(lang);
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

    // signature
    'landing.signature.title': 'טיפולי הדגל שלנו',
    'signature.headspa': 'טיפול יפני מסורתי המשלב ניקוי עמוק של הקרקפת, עיסוי ממוקד, מסכות ייעודיות ופינוקי מים. ממריץ זרימת דם, מחזק שורשי שיער ומרגיע עומסים נפשיים. כולל שטיפה, מגבת חמה, סרום וייבוש מלא. מסתיים במנוחה עם תה וניחוח ארומטי.',
    'signature.reflexology': 'עיסוי תאילנדי ממוקד לכפות הרגליים המבוסס על רפלקסולוגיה. מתבצע עם משחה תאילנדית חריפה ולחיצות עמוקות על נקודות השתקפות. מסייע בהמרצת זרימת הדם ובהשפעה מערכתית.',
    'signature.sports': 'עיסוי אינטנסיבי לשחרור עומסים מפעילות גופנית. משלב טכניקות עומק ומתיחות. מסייע בהתאוששות ומניעת פציעות. עיסוי גוף מלא.',
    'signature.karsai': 'עיסוי תאילנדי מתקדם מהרפואה העתיקה. מתמקד באזורים אנרגטיים עמוקים לאיזון וחיזוק הגוף. טיפול עוצמתי ונישתי למטופלים מנוסים בלבד. עיסוי גוף מלא.',
    'signature.vitamine': 'עיסוי תאילנדי עם קרם מועשר בויטמין E להזנה עמוקה של העור. משפר גמישות, מפחית יובש ומשלב רוגע וטיפוח קוסמטי. עיסוי גוף מלא.',

    // section headings (נשאר לעתיד אם תשתמש)
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

    // signature
    'landing.signature.title': 'Our Signature Treatments',
    'signature.headspa': 'A traditional Japanese treatment combining deep scalp cleansing, focused massage, dedicated masks, and water pampering. Boosts circulation, supports hair roots, and eases mental stress. Includes wash, hot towel, serum and full blow-dry. Ends with tea and a gentle aroma.',
    'signature.reflexology': 'A focused Thai foot treatment based on reflexology, using warming balm and deep pressure on reflex points. Helps stimulate circulation and supports whole-body balance.',
    'signature.sports': 'An intensive massage to release load from physical activity. Combines deep techniques and stretches. Supports recovery and injury prevention. Full-body massage.',
    'signature.karsai': 'An advanced Thai treatment from ancient medicine, focusing on deep energetic areas for balance and strengthening. A powerful niche treatment for experienced clients only. Full-body massage.',
    'signature.vitamine': 'A Thai massage with Vitamin E cream for deep skin nourishment. Improves elasticity, reduces dryness and blends relaxation with cosmetic care. Full-body massage.',

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

    // signature
    'landing.signature.title': 'Наши фирменные процедуры',
    'signature.headspa': 'Традиционная японская процедура: глубокое очищение кожи головы, точечный массаж, специальные маски и водная терапия. Улучшает кровообращение, укрепляет корни волос и снимает стресс. Включает полотенце, сыворотку и полную сушку. Завершается чаем и лёгким ароматом.',
    'signature.reflexology': 'Тайская рефлексология стоп: согревающий бальзам и глубокие надавливания на рефлекторные точки. Помогает улучшить кровообращение и системный баланс.',
    'signature.sports': 'Интенсивный массаж для снятия нагрузки после физической активности. Глубокие техники и растяжки. Поддерживает восстановление и профилактику травм. Массаж всего тела.',
    'signature.karsai': 'Продвинутая тайская процедура из древней медицины с фокусом на глубоких энергетических зонах для баланса и укрепления. Мощная нишевая процедура для опытных клиентов. Массаж всего тела.',
    'signature.vitamine': 'Тайский массаж с кремом Vitamin E для глубокого питания кожи. Улучшает эластичность, снижает сухость и сочетает расслабление с уходом. Массаж всего тела.',

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

    // signature
    'landing.signature.title': 'ჩვენი სიგნატურული პროცედურები',
    'signature.headspa': 'ტრადიციული იაპონური პროცედურა: თავის კანის ღრმა წმენდა, მიზნობრივი მასაჟი, სპეციალური ნიღბები და წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას და ამცირებს სტრესს. მოიცავს ცხელ პირსახოცს, სერუმს და სრულ გაშრობას. სრულდება ჩაით და ნაზი არომატით.',
    'signature.reflexology': 'ფოკუსირებული თაილანდური ფეხის რეფლექსოლოგია გამათბობელი ბალზამით და ღრმა წერტილოვანი წნევით. ხელს უწყობს სისხლის მიმოქცევასა და სხეულის ბალანსს.',
    'signature.sports': 'ინტენსიური მასაჟი ფიზიკური აქტივობით გამოწვეული დატვირთვის მოსახსნელად. აერთიანებს ღრმა ტექნიკებს და გაჭიმვებს. ეხმარება აღდგენასა და ტრავმების პრევენციას. მთლიანი სხეულის მასაჟი.',
    'signature.karsai': 'განვითარებული თაილანდური პროცედურა უძველესი მედიცინიდან, ფოკუსით ღრმა ენერგეტიკულ ზონებზე ბალანსისა და გაძლიერებისთვის. ძლიერი ნიშური პროცედურა გამოცდილ კლიენტებისთვის. მთლიანი სხეულის მასაჟი.',
    'signature.vitamine': 'თაილანდური მასაჟი ვიტამინ E-ის კრემით კანის ღრმა კვებისთვის. აუმჯობესებს ელასტიურობას, ამცირებს სიმშრალეს და აერთიანებს რელაქსაციასა და მოვლას. მთლიანი სხეულის მასაჟი.',

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
    tag: { he: '👑 טיפול הדגל – ספא ראש יפני', en: '👑 Signature Japanese Head Spa', ru: '👑 Фирменный японский Head Spa', ka: '👑 სიგნატურული იაპონური Head Spa' },
    name: { he: 'Japanese Head Spa | ספא ראש יפני', en: 'Japanese Head Spa', ru: 'Японский Head Spa', ka: 'იაპონური Head Spa' },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי עמוק של הקרקפת, עיסוי ממוקד, מסכות ייעודיות ופינוקי מים. הטכניקה ממריצה את זרימת הדם, מחזקת את שורשי השיער ומרגיעה עומסים נפשיים. כולל שטיפה יסודית, מגבת חמה, סרום לקרקפת וייבוש שיער מלא. הטיפול מסתיים במנוחה קצרה עם תה וניחוח ארומטי עדין.',
      en: 'A traditional Japanese treatment combining deep scalp cleansing, focused massage, dedicated masks, and water pampering. Boosts circulation, supports hair roots, and eases mental stress. Includes thorough wash, hot towel, scalp serum, and full blow-dry. Ends with a short rest with tea and a gentle aroma.',
      ru: 'Традиционная японская процедура: глубокое очищение кожи головы, точечный массаж, специальные маски и водная терапия. Улучшает кровообращение, укрепляет корни волос и снимает стресс. Включает тщательное мытьё, горячее полотенце, сыворотку и полную сушку. Завершается коротким отдыхом с чаем и лёгким ароматом.',
      ka: 'ტრადიციული იაპონური პროცედურა: თავის კანის ღრმა წმენდა, მიზნობრივი მასაჟი, სპეციალური ნიღბები და წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ამცირებს სტრესს. მოიცავს სრულ დაბანას, ცხელ პირსახოცს, თავის კანის სერუმს და სრულ გაშრობას. სრულდება მოკლე დასვენებით ჩაით და ნაზი არომატით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  'facial-thai-compress': {
    tag: { he: '🌼 עיסוי פנים תאילנדי בצמחי מרפא ושמנים', en: '🌼 Thai Herbal Facial Therapy', ru: '🌼 Тайская травяная терапия лица', ka: '🌼 თაილანდური მცენარეული სახის თერაპია' },
    name: { he: 'Thai Herbal Facial Therapy | עיסוי פנים תאילנדי בצמחי מרפא ושמנים', en: 'Thai Herbal Facial Therapy', ru: 'Тайская травяная терапия лица', ka: 'თაილანდური მცენარეული სახის თერაპია' },
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
    tag: { he: '💪 עיסוי תאילנדי עמוק בשמן', en: '💪 Deep Thai Oil Massage', ru: '💪 Глубокий тайский масляный', ka: '💪 ღრმა თაილანდური ზეთოვანი' },
    name: { he: 'Deep Thai Oil Back–Neck–Shoulders Massage | עיסוי תאילנדי עמוק בשמן', en: 'Deep Thai Oil Back–Neck–Shoulders Massage', ru: 'Глубокий тайский масляный (спина–шея–плечи)', ka: 'ღრმა თაილანდური ზეთოვანი (ზურგი–კისერი–მხრები)' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי בשמן המתמקד באזורי עומס מרכזיים. משלב לחיצות עמוקות, עבודה מדויקת עם אמות ומרפקים. מסייע בהפחתת כאבי צוואר, כתפיים וגב עליון. מתאים לעומס יומיומי וישיבה ממושכת.',
      en: 'Therapeutic Thai oil massage focusing on key tension areas. Combines deep pressure and precise forearm/elbow work. Helps reduce neck, shoulders and upper-back pain. Great for daily overload and prolonged sitting.',
      ru: 'Лечебный тайский массаж с маслом, фокус на ключевых зонах напряжения. Глубокие надавливания и работа предплечьями/локтями. Помогает уменьшить боль в шее, плечах и верхней части спины. Отлично при сидячей работе.',
      ka: 'თერაპიული თაილანდური ზეთოვანი მასაჟი ძირითადი დაძაბულობის ზონებზე. აერთიანებს ღრმა წნევას და ზუსტ მუშაობას წინამხრით/იდაყვით. ეხმარება კისრის, მხრების და ზედა ზურგის ტკივილის შემცირებას.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: { he: '🔥 עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: '🔥 Hot Stone Back–Neck–Shoulders', ru: '🔥 Горячие камни (спина–шея–плечи)', ka: '🔥 ცხელი ქვები (ზურგი–კისერი–მხრები)' },
    name: { he: 'Hot Stone Back–Neck–Shoulders Massage | עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'עיסוי ממוקד המשלב עבודה ידנית עם אבני בזלת חמימות. החום מאפשר שחרור עמוק ובטוח של שרירים תפוסים. מפחית מתח נפשי וכאבים כרוניים בפלג הגוף העליון. יוצר הרפיה מלאה ותחושת קלילות.',
      en: 'Focused massage combining manual work with warm basalt stones. Heat enables a deep, safe release of tight muscles. Reduces stress and chronic pain in the upper body.',
      ru: 'Прицельный массаж с тёплыми базальтовыми камнями. Тепло помогает глубоко и безопасно снять зажимы, уменьшает стресс и хроническую боль в верхней части тела.',
      ka: 'მიზანმიმართული მასაჟი თბილი ბაზალტის ქვებით. სითბო ეხმარება ღრმა და უსაფრთხო განტვირთვას, ამცირებს სტრესსა და ქრონიკულ ტკივილს ზედა სხეულში.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  'body-aloe-vera': {
    tag: { he: '🌿 עיסוי תאילנדי עם אלוורה', en: '🌿 Thai Aloe Vera Massage', ru: '🌿 Тайский массаж с алоэ вера', ka: '🌿 თაილანდური მასაჟი ალოე ვერათი' },
    name: { he: 'Thai Aloe Vera Massage | עיסוי תאילנדי עם אלוורה', en: 'Thai Aloe Vera Massage', ru: 'Тайский массаж с алоэ вера', ka: 'თაილანდური მასაჟი ალოე ვერათი' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב ג׳ל אלוורה טבעי. האלוורה מרגיעה, מקררת ומזינה את העור תוך שמירה על לחות וגמישות. התנועות הרכות משחררות מתחים שריריים קלים. מתאים במיוחד לעור רגיש ולאחר חשיפה לשמש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage combined with natural aloe vera gel. Aloe soothes, cools and nourishes the skin while supporting hydration and elasticity. Soft strokes release mild muscular tension. Especially suitable for sensitive skin and after sun exposure. Full-body treatment including a face massage.',
      ru: 'Нежный тайский массаж с натуральным гелем алоэ вера. Алоэ успокаивает, охлаждает и питает кожу. Особенно подходит для чувствительной кожи и после солнца. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ალოე ვერას გელით. განსაკუთრებით კარგია მგრძნობიარე კანისთვის და მზეზე ყოფნის შემდეგ. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-vitamin-e': {
    tag: { he: '✨ עיסוי תאילנדי עם קרם ויטמין E', en: '✨ Thai Vitamin E Cream Massage', ru: '✨ Тайский массаж с кремом Vitamin E', ka: '✨ თაილანდური მასაჟი ვიტამინ E-ის კრემით' },
    name: { he: 'Thai Vitamin E Cream Massage | עיסוי תאילנדי עם קרם ויטמין E', en: 'Thai Vitamin E Cream Massage', ru: 'Тайский массаж с кремом Vitamin E', ka: 'თაილანდური მასაჟი ვიტამინ E-ის კრემით' },
    desc: {
      he: 'עיסוי תאילנדי בשילוב קרם מועשר בויטמין E להזנה עמוקה של העור. מסייע בשיפור גמישות העור ובהפחתת יובש. משלב רוגע וטיפוח קוסמטי. יוצר תחושת רכות והרפיה כללית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A Thai massage with Vitamin E enriched cream for deep skin nourishment. Helps improve elasticity and reduce dryness. Full-body treatment including a face massage.',
      ru: 'Тайский массаж с кремом, обогащённым витамином E, для глубокого питания кожи. Полный массаж тела с мягким массажем лица.',
      ka: 'თაილანდური მასაჟი ვიტამინ E-ით გამდიდრებული კრემით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 175₾', en: '60 min – 175₾', ru: '60 мин – 175₾', ka: '60 წთ – 175₾' }
  },

  'body-relaxing-oil': {
    tag: { he: '🧘 עיסוי שמן מרגיע', en: '🧘 Relaxing Oil Massage', ru: '🧘 Расслабляющий массаж с маслом', ka: '🧘 დამამშვიდებელი ზეთოვანი მასაჟი' },
    name: { he: 'Relaxing Oil Massage | עיסוי שמן מרגיע', en: 'Relaxing Oil Massage', ru: 'Расслабляющий массаж с маслом', ka: 'დამამშვიდებელი ზეთოვანი მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא בשמן איכותי בתנועות ארוכות, רכות וזורמות. מתמקד בהרפיה עמוקה של מערכת העצבים ובהפחתת סטרס. משחרר מתחים קלים ומשרה תחושת שלווה ואיזון. מתאים למי שמחפש חוויה עדינה ולא אינטנסיבית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Full-body oil massage with long, soft, flowing strokes. Focuses on deep relaxation and stress reduction. Full-body treatment including a face massage.',
      ru: 'Массаж всего тела с маслом: мягкие плавные движения для глубокого расслабления и снижения стресса. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის ზეთოვანი მასაჟი რბილი, მოლივლივე მოძრაობებით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  'body-coconut-oil': {
    tag: { he: '🥥 עיסוי תאילנדי עם שמן קוקוס', en: '🥥 Thai Coconut Oil Massage', ru: '🥥 Тайский массаж с кокосовым маслом', ka: '🥥 თაილანდური მასაჟი ქოქოსის ზეთით' },
    name: { he: 'Thai Coconut Oil Massage | עיסוי תאילנדי עם שמן קוקוס', en: 'Thai Coconut Oil Massage', ru: 'Тайский массаж с кокосовым маслом', ka: 'თაილანდური მასაჟი ქოქოსის ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב שמן קוקוס טבעי. מזין את העור, מעניק לחות עמוקה ותחושת רכות ממושכת. התנועות זורמות ומאזנות את הגוף והנפש. מתאים במיוחד לעור יבש או רגיש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Gentle Thai massage with natural coconut oil. Nourishes skin and provides deep hydration. Full-body treatment including a face massage.',
      ru: 'Нежный тайский массаж с натуральным кокосовым маслом. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ქოქოსის ზეთით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 175₾', en: '60 min – 175₾', ru: '60 мин – 175₾', ka: '60 წთ – 175₾' }
  },

  'body-thai': {
    tag: { he: '🇹🇭 עיסוי תאילנדי מסורתי', en: '🇹🇭 Traditional Thai Massage', ru: '🇹🇭 Традиционный тайский массаж', ka: '🇹🇭 ტრადიციული ტაილანდური მასაჟი' },
    name: { he: 'Traditional Thai Massage | עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי ללא שמן. משלב לחיצות, מתיחות ועבודה על קווי האנרגיה (Sen). משפר גמישות, זרימה וחיוניות. עיסוי פעיל ודינמי. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Traditional oil-free Thai massage with pressure, stretches and energy lines (Sen). Improves flexibility and vitality. Full-body treatment including a face massage.',
      ru: 'Традиционный тайский массаж без масла: надавливания, растяжки и энергетические линии (Sen). Полный массаж тела с мягким массажем лица.',
      ka: 'ტრადიციული თაილანდური მასაჟი ზეთის გარეშე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 190₾', en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-thai-balm': {
    tag: { he: '🔥 עיסוי תאילנדי עם באלם', en: '🔥 Thai Balm Massage', ru: '🔥 Тайский массаж с бальзамом', ka: '🔥 თაილანდური მასაჟი ბალზამით' },
    name: { he: 'Thai Balm Massage | עיסוי תאילנדי עם באלם', en: 'Thai Balm Massage', ru: 'Тайский массаж с бальзамом', ka: 'თაილანდური მასაჟი ბალზამით' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד עם באלם תאילנדי ייעודי. מסייע בהפחתת כאבים, נוקשות ודלקות מקומיות. מתבצע בלחיצות עמוקות על אזורי עומס. מתאים לשרירים תפוסים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Focused Thai massage using a dedicated balm to ease pain and stiffness. Full-body treatment including a face massage.',
      ru: 'Прицельный тайский массаж с бальзамом для снижения боли и скованности. Полный массаж тела с мягким массажем лица.',
      ka: 'მიზანმიმართული თაილანდური მასაჟი ბალზამით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 190₾', en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-thai-ther': {
    tag: { he: '🩺 עיסוי תאילנדי טיפולי', en: '🩺 Thai Therapeutic Massage', ru: '🩺 Лечебный тайский массаж', ka: '🩺 თერაპიული თაილანდური მასაჟი' },
    name: { he: 'Thai Therapeutic Massage | עיסוי תאילנדי טיפולי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'თაილანდური თერაპიული მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי עמוק וממוקד. מטפל בכאבי גב, צוואר ושרירים תפוסים כרונית. משפר טווח תנועה ומפחית עומסים. מיועד למי שמחפש טיפול אמיתי. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Deep therapeutic Thai massage for chronic tightness and pain. Full-body treatment including a face massage.',
      ru: 'Глубокий лечебный тайский массаж для хронических зажимов и боли. Полный массаж тела с мягким массажем лица.',
      ka: 'ღრმა თერაპიული თაილანდური მასაჟი. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 230₾', en: '60 min – 230₾', ru: '60 мин – 230₾', ka: '60 წთ – 230₾' }
  },

  'body-sports': {
    tag: { he: '🏃 עיסוי ספורט', en: '🏃 Sports Massage', ru: '🏃 Спортивный массаж', ka: '🏃 სპორტული მასაჟი' },
    name: { he: 'Sports Massage | עיסוי ספורט', en: 'Sports Massage', ru: 'Спортивный массаж', ka: 'სპორტული მასაჟი' },
    desc: {
      he: 'עיסוי אינטנסיבי לשחרור עומסים מפעילות גופנית. משלב טכניקות עומק ומתיחות. מסייע בהתאוששות ומניעת פציעות. מתאים לספורטאים ולאנשים פעילים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An intensive massage combining deep techniques and stretches. Supports recovery and injury prevention. Full-body treatment including a face massage.',
      ru: 'Интенсивный массаж: глубокие техники и растяжки для восстановления. Полный массаж тела с мягким массажем лица.',
      ka: 'ინტენსიური მასაჟი აღდგენისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 240₾', en: '60 min – 240₾', ru: '60 мин – 240₾', ka: '60 წთ – 240₾' }
  },

  'body-deep-tissue-cream': {
    tag: { he: '💪 עיסוי תאילנדי עמוק עם קרם', en: '💪 Deep Tissue Thai Massage with Cream', ru: '💪 Глубокий тайский массаж с кремом', ka: '💪 ღრმა თაილანდური მასაჟი კრემით' },
    name: { he: 'Deep Tissue Thai Massage with Cream | עיסוי תאילנדי עמוק עם קרם', en: 'Deep Tissue Thai Massage with Cream', ru: 'Глубокий тайский массаж с кремом', ka: 'ღრმა თაილანდური მასაჟი კრემით' },
    desc: {
      he: 'עיסוי תאילנדי עמוק במיוחד לשכבות השריר הפנימיות. משלב לחץ חזק עם קרם ייעודי. מטפל בעומסים וכאבים כרוניים. מיועד למטופלים מנוסים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Extra-deep Thai massage with dedicated cream for chronic load. Full-body treatment including a face massage.',
      ru: 'Очень глубокий тайский массаж с кремом при хронической нагрузке. Полный массаж тела с мягким массажем лица.',
      ka: 'განსაკუთრებით ღრმა თაილანდური მასაჟი კრემით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 250₾', en: '60 min – 250₾', ru: '60 мин – 250₾', ka: '60 წთ – 250₾' }
  },

  'body-cannabis-oil': {
    tag: { he: '🌿 עיסוי תאילנדי עם שמן קנאביס', en: '🌿 Thai Cannabis Oil Massage', ru: '🌿 Тайский массаж с маслом каннабиса', ka: '🌿 თაილანდური მასაჟი კანაბისის ზეთით' },
    name: { he: 'Thai Cannabis Oil Massage | עיסוי תאילנדי עם שמן קנאביס', en: 'Thai Cannabis Oil Massage', ru: 'Тайский массаж с маслом каннабиса', ka: 'თაილანდური მასაჟი კანაბისის ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי מתקדם בשמן קנאביס ייעודי. מסייע בהפחתת כאבים, דלקות ומתח שרירי. מתאים לכאבים כרוניים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Advanced Thai massage with dedicated cannabis oil for pain/tension relief. Full-body treatment including a face massage.',
      ru: 'Продвинутый тайский массаж со специальным маслом каннабиса. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული თაილანდური მასაჟი კანაბისის ზეთით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 230₾', en: '60 min – 230₾', ru: '60 мин – 230₾', ka: '60 წთ – 230₾' }
  },

  'body-hot-stone': {
    tag: { he: '🔥 עיסוי אבנים חמות', en: '🔥 Hot Stone Massage', ru: '🔥 Массаж горячими камнями', ka: '🔥 ცხელი ქვების მასაჟი' },
    name: { he: 'Hot Stone Massage | עיסוי אבנים חמות', en: 'Hot Stone Massage', ru: 'Массаж горячими камнями', ka: 'ცხელი ქვების მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא באמצעות אבני בזלת חמימות. החום חודר לרקמות ומשחרר מתחים עמוקים. משפר זרימת דם ומרפה שרירים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Full-body massage using warm basalt stones. Full-body treatment including a face massage.',
      ru: 'Массаж всего тела тёплыми базальтовыми камнями. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის მასაჟი თბილი ბაზალტის ქვებით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 210₾', en: '60 min – 210₾', ru: '60 мин – 210₾', ka: '60 წთ – 210₾' }
  },

  'body-thai-comp': {
    tag: { he: '🌼 עיסוי תאילנדי בקומפרסים צמחיים', en: '🌼 Thai Herbal Compress Massage', ru: '🌼 Травяные компрессы', ka: '🌼 მცენარეული კომპრესი' },
    name: { he: 'Thai Herbal Compress Massage | עיסוי תאילנדי בקומפרסים צמחיים', en: 'Thai Herbal Compress Massage', ru: 'Массаж травяными компрессами', ka: 'მცენარეული კომპრესის მასაჟი' },
    desc: {
      he: 'עיסוי מסורתי עם שקיות צמחים תאילנדיים מחוממות. החום והעשבים מסייעים בהרגעת כאבים והפחתת דלקת. משולב עם עיסוי ידני עמוק. חוויה טיפולית ייחודית. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Traditional massage with heated Thai herbal compresses, combined with deep manual work. Full-body treatment including a face massage.',
      ru: 'Традиционный массаж с подогретыми травяными мешочками и глубокой ручной техникой. Полный массаж тела с мягким массажем лица.',
      ka: 'ტრადიციული მასაჟი გახურებული მცენარეული კომპრესებით. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 220₾', en: '60 min – 220₾', ru: '60 мин – 220₾', ka: '60 წთ – 220₾' }
  },

  'body-karsai': {
    tag: { he: '⚡ עיסוי תאילנדי קארסאי', en: '⚡ Karsai Massage', ru: '⚡ Карсай массаж', ka: '⚡ Karsai მასაჟი' },
    name: { he: 'Karsai Massage | עיסוי תאילנדי קארסאי', en: 'Karsai Massage', ru: 'Карсай массаж', ka: 'Karsai მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי מתקדם מהרפואה העתיקה. מתמקד באזורים אנרגטיים עמוקים. טיפול עוצמתי ונישתי. מיועד למטופלים מנוסים בלבד. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Advanced Thai treatment focusing on deep energetic areas. Powerful niche treatment for experienced clients. Full-body treatment including a face massage.',
      ru: 'Продвинутая тайская процедура с фокусом на глубоких энергетических зонах. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული თაილანდური პროცედურა ღრმა ენერგეტიკულ ზონებზე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 260₾', en: '60 min – 260₾', ru: '60 мин – 260₾', ka: '60 წთ – 260₾' }
  },

  'foot-massage': {
    tag: { he: '🦶 טיפולי כפות רגליים', en: '🦶 Foot Massage', ru: '🦶 Массаж стоп', ka: '🦶 ფეხის მასაჟი' },
    name: { he: 'Foot Massage | פוט מסאז’ – עיסוי כפות רגליים', en: 'Foot Massage', ru: 'Массаж стоп', ka: 'ფეხის მასაჟი' },
    desc: {
      he: 'עיסוי כפות רגליים מרגיע לשחרור עייפות. משפר זרימת דם ומעניק תחושת קלילות.',
      en: 'Relaxing foot massage to release fatigue. Improves circulation and leaves you feeling light.',
      ru: 'Расслабляющий массаж стоп для снятия усталости. Улучшает кровообращение и даёт ощущение лёгкости.',
      ka: 'დამამშვიდებელი ფეხის მასაჟი დაღლილობის მოსახსნელად. აუმჯობესებს სისხლის მიმოქცევას და ქმნის სიმსუბუქის შეგრძნებას.'
    },
    price: { he: '30 דק׳ – 80₾ · 60 דק׳ – 120₾', en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
  },

  'foot-reflexology': {
    tag: { he: '🦶 עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: '🦶 Thai Reflexology Foot Massage', ru: '🦶 Тайская рефлексология стоп', ka: '🦶 თაილანდური ფეხის რეფლექსოლოგია' },
    name: { he: 'Thai Reflexology Foot Massage | עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: 'Thai Reflexology Foot Massage', ru: 'Тайская рефлексология стоп', ka: 'თაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד לכפות הרגליים המבוסס על רפלקסולוגיה. מתבצע עם משחה תאילנדית חריפה ולחיצות עמוקות על נקודות השתקפות. מסייע בהמרצת זרימת הדם ובהשפעה מערכתית.',
      en: 'Focused Thai foot treatment based on reflexology with warming balm and deep pressure on reflex points.',
      ru: 'Фокусная тайская рефлексология стоп с разогревающим бальзамом и глубокими надавливаниями.',
      ka: 'ფოკუსირებული თაილანდური ფეხის რეფლექსოლოგია გამათბობელი ბალზამით და ღრმა წერტილოვანი წნევით.'
    },
    price: { he: '60 דק׳ – 140₾', en: '60 min – 140₾', ru: '60 мин – 140₾', ka: '60 წთ – 140₾' }
  },

  'body-swedish': {
    tag: { he: '🇸🇪 עיסוי שוודי', en: '🇸🇪 Swedish Massage', ru: '🇸🇪 Шведский массаж', ka: '🇸🇪 შვედური მასაჟი' },
    name: { he: 'Swedish Massage | עיסוי שוודי', en: 'Swedish Massage', ru: 'Шведский массаж', ka: 'შვედური მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא קלאסי בתנועות ארוכות, לישה עדינה והנעות זורמות לשחרור מתחים והרגעה עמוקה. משפר זרימת דם, מסייע בהפחתת עומס שרירי ומחזיר תחושת קלילות ורעננות. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי עדין באזור הפנים.',
      en: 'A classic full-body massage with long flowing strokes and gentle kneading for deep relaxation. Improves circulation and restores a light, refreshed feeling. Full-body treatment including a gentle face massage.',
      ru: 'Классический массаж всего тела: длинные плавные движения и мягкое разминание. Улучшает кровообращение и возвращает ощущение лёгкости. Полный массаж тела с мягким массажем лица.',
      ka: 'კლასიკური მთლიანი სხეულის მასაჟი გრძელი მოლივლივე მოძრაობებით. აუმჯობესებს სისხლის მიმოქცევას და აბრუნებს სიმსუბუქის შეგრძნებას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 160₾', en: '60 min – 160₾', ru: '60 мин – 160₾', ka: '60 წთ – 160₾' }
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

// ===== כפתורי טיפולים → ווטסאפ (שם טיפול + משך) =====
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
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

// ===== Signature slider translations (בלי לשנות HTML) =====
function applySignatureTexts(lang) {
  const slider = document.getElementById('signatureSlider');
  if (!slider) return;

  // כותרות H3 לפי סדר השקופיות
  const titlesByLang = {
    he: [
      'ספא ראש יפני',
      'עיסוי תאילנדי רפלקסולוגי לכפות הרגליים',
      'עיסוי ספורט',
      'עיסוי תאילנדי קארסאי – פרימיום',
      'עיסוי תאילנדי עם קרם ויטמין E'
    ],
    en: [
      'Japanese Head Spa',
      'Thai Reflexology Foot Massage',
      'Sports Massage',
      'Karsai Massage (Premium)',
      'Thai Vitamin E Cream Massage'
    ],
    ru: [
      'Японский Head Spa',
      'Тайская рефлексология стоп',
      'Спортивный массаж',
      'Карсай массаж (Премиум)',
      'Тайский массаж с кремом Vitamin E'
    ],
    ka: [
      'იაპონური Head Spa',
      'თაილანდური ფეხის რეფლექსოლოგია',
      'სპორტული მასაჟი',
      'Karsai მასაჟი (Premium)',
      'თაილანდური მასაჟი ვიტამინ E-ის კრემით'
    ]
  };

  const list = titlesByLang[lang] || titlesByLang.he;
  const h3s = slider.querySelectorAll('.signature-slide h3');
  h3s.forEach((h3, i) => {
    if (list[i]) h3.textContent = list[i];
  });
}

// ===== Video Slider (Responsive + dots + swipe + RTL safe) =====
function setupSimpleVideoSlider() {
  const viewport = document.getElementById('videoSlider');
  if (!viewport) return;

  const track = viewport.querySelector('.video-slider__track');
  const slides = Array.from(viewport.querySelectorAll('.video-slide'));
  const prev = viewport.querySelector('.video-slider__nav--prev');
  const next = viewport.querySelector('.video-slider__nav--next');
  const dotsWrap = viewport.querySelector('.video-slider__dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.video-slider__dot')) : [];

  if (!track || !slides.length) return;

  let index = 0;
  let startX = 0;
  let startY = 0;
  let isPointerDown = false;

  // קובע סימן תנועה לפי RTL/LTR כדי ש"Next" תמיד יתקדם טבעי
  function dirSign() {
    return (document.documentElement.dir === 'rtl') ? 1 : -1;
  }

  function setActiveDot(i) {
    dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
  }

  function setActiveSlide(i) {
    slides.forEach((s, si) => s.classList.toggle('is-active', si === i));
  }

  function playOnlyActive() {
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

  function updateTransform() {
    // אנחנו מזיזים לפי רוחב ה-viewport, עם תמיכה RTL/LTR
    const w = viewport.clientWidth;
    track.style.transform = `translateX(${dirSign() * index * w}px)`;

    setActiveDot(index);
    setActiveSlide(index);
    playOnlyActive();
  }

  function resize() {
    const w = viewport.clientWidth;

    // רוחב לכל slide + track
    slides.forEach((s) => (s.style.width = `${w}px`));
    track.style.width = `${w * slides.length}px`;

    // חשוב: מנרמל ל-index הנוכחי אחרי שינוי גודל
    updateTransform();
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    updateTransform();
  }

  function goNext() { goTo(index + 1); }
  function goPrev() { goTo(index - 1); }

  if (prev) prev.addEventListener('click', goPrev);
  if (next) next.addEventListener('click', goNext);

  // dots click
  dots.forEach((d, i) => {
    d.addEventListener('click', () => goTo(i));
  });

  // swipe (pointer)
  viewport.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  viewport.addEventListener('pointerup', (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // אם המשתמש גלל אנכי - לא נוגעים
    if (Math.abs(dy) > Math.abs(dx)) return;

    // סף החלקה
    const threshold = Math.max(40, viewport.clientWidth * 0.12);

    if (dx > threshold) {
      // החלקה ימינה: ב-LTR זה Prev, ב-RTL זה Next
      if (document.documentElement.dir === 'rtl') goNext();
      else goPrev();
    } else if (dx < -threshold) {
      // החלקה שמאלה: ב-LTR זה Next, ב-RTL זה Prev
      if (document.documentElement.dir === 'rtl') goPrev();
      else goNext();
    }
  });

  // אם יצא מהאלמנט תוך כדי
  viewport.addEventListener('pointercancel', () => { isPointerDown = false; });

  // resize handler (עם debounce קל)
  let rAF = null;
  window.addEventListener('resize', () => {
    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(resize);
  });

  // init
  resize();
}

// ===== Signature slider (כבר היה אצלך, נשאר; רק מעט חיזוק לרספונסיביות/RTL) =====
function setupSignatureSlider() {
  const slider = document.getElementById('signatureSlider');
  if (!slider) return;

  const track = slider.querySelector('.signature-track');
  const slides = slider.querySelectorAll('.signature-slide');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  if (!track || !slides.length) return;

  let index = 0;

  function dirSign() {
    return (document.documentElement.dir === 'rtl') ? 1 : -1;
  }

  function update() {
    // כל שקופית 100% רוחב — הכיוון משתנה לפי RTL/LTR
    track.style.transform = `translateX(${dirSign() * index * 100}%)`;
  }

  function goPrev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  function goNext() {
    index = (index + 1) % slides.length;
    update();
  }

  if (prev) prev.onclick = goPrev;
  if (next) next.onclick = goNext;

  update();
}

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);

  setupLangButtons();
  setupTreatmentButtons();

  // ✅ סליידר וידאו — רספונסיבי + dots + swipe
  setupSimpleVideoSlider();

  // ✅ סליידר signature
  setupSignatureSlider();
});
