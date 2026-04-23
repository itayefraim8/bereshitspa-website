// landing-landing.js — i18n + כפתורי טיפול לווטסאפ + כרטיסייה לווטסאפ

const WHATSAPP_NUMBER = '995599078676';
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

  // ✅ אם הסליידר כבר אותחל – רענון (כדי לחשב מידות מחדש אחרי שינוי כיוון)
  if (window.__flagshipSlider?.refresh) window.__flagshipSlider.refresh();

  // ✅ הפיכת חיצי הסליידר בהתאם ל-RTL / LTR
  const prevIcon = document.querySelector('.flagship-slider__nav--prev');
  const nextIcon = document.querySelector('.flagship-slider__nav--next');

  if (prevIcon && nextIcon) {
    const isRTL = document.documentElement.dir === 'rtl';
    prevIcon.textContent = isRTL ? '›' : '‹';
    nextIcon.textContent = isRTL ? '‹' : '›';
  }
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

    // flagship
    'landing.flagship.title': 'טיפולי הדגל שלנו',
    'landing.flagship.subtitle': '6 טיפולים מובילים — בחרו את הטיפול שלכם והזמינו בווטסאפ.',

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

    // footer
    'footer.hours.title': 'שעות פעילות',
    'footer.hours.sun': 'יום ראשון: 11:00–22:00',
    'footer.hours.mon': 'יום שני: 11:00–22:00',
    'footer.hours.tue': 'יום שלישי: 11:00–22:00',
    'footer.hours.wed': 'יום רביעי: 11:00–22:00',
    'footer.hours.thu': 'יום חמישי: 11:00–22:00',
    'footer.hours.fri': 'יום שישי: 11:00 – כניסת שבת',
    'footer.hours.sat': 'מוצ״ש: חצי שעה לאחר יציאת שבת',

    'footer.location.title': 'מיקום וכתובת',
    'footer.location.address1': 'Vaja Pshavela 8',
    'footer.location.address2': 'Batumi, Georgia',
    'footer.location.navigate': 'ניווט למיקום',
    'footer.location.whatsapp': 'WhatsApp להזמנות',

    'footer.bottom.copy': '© Bereshit Spa · כל הזכויות שמורות'
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

    'landing.flagship.title': 'Our Flagship Treatments',
    'landing.flagship.subtitle': '6 best-sellers — choose your treatment and book via WhatsApp.',

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

    // footer
    'footer.hours.title': 'Opening Hours',
    'footer.hours.sun': 'Sunday: 11:00–22:00',
    'footer.hours.mon': 'Monday: 11:00–22:00',
    'footer.hours.tue': 'Tuesday: 11:00–22:00',
    'footer.hours.wed': 'Wednesday: 11:00–22:00',
    'footer.hours.thu': 'Thursday: 11:00–22:00',
    'footer.hours.fri': 'Friday: 11:00 – Until Shabbat begins',
    'footer.hours.sat': 'Saturday night: Half an hour after Shabbat ends',

    'footer.location.title': 'Location & Address',
    'footer.location.address1': 'Vaja Pshavela 8',
    'footer.location.address2': 'Batumi, Georgia',
    'footer.location.navigate': 'Navigate to location',
    'footer.location.whatsapp': 'WhatsApp for bookings',

    'footer.bottom.copy': '© Bereshit Spa · All Rights Reserved'
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

    'landing.flagship.title': 'Наши флагманские процедуры',
    'landing.flagship.subtitle': '6 хитов — выберите процедуру и запишитесь через WhatsApp.',

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

    // footer
    'footer.hours.title': 'Часы работы',
    'footer.hours.sun': 'Воскресенье: 11:00–22:00',
    'footer.hours.mon': 'Понедельник: 11:00–22:00',
    'footer.hours.tue': 'Вторник: 11:00–22:00',
    'footer.hours.wed': 'Среда: 11:00–22:00',
    'footer.hours.thu': 'Четверг: 11:00–22:00',
    'footer.hours.fri': 'Пятница: 11:00 – До наступления шаббата',
    'footer.hours.sat': 'Субботний вечер: Через полчаса после окончания шаббата',

    'footer.location.title': 'Местоположение и адрес',
    'footer.location.address1': 'Vaja Pshavela 8',
    'footer.location.address2': 'Batumi, Georgia',
    'footer.location.navigate': 'Открыть маршрут',
    'footer.location.whatsapp': 'WhatsApp для бронирования',

    'footer.bottom.copy': '© Bereshit Spa · Все права защищены'
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

    'landing.flagship.title': 'ჩვენი მთავარი პროცედურები',
    'landing.flagship.subtitle': '6 ყველაზე პოპულარული — აირჩიეთ და დაჯავშნეთ WhatsApp-ით.',

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

    // footer
    'footer.hours.title': 'სამუშაო საათები',
    'footer.hours.sun': 'კვირა: 11:00–22:00',
    'footer.hours.mon': 'ორშაბათი: 11:00–22:00',
    'footer.hours.tue': 'სამშაბათი: 11:00–22:00',
    'footer.hours.wed': 'ოთხშაბათი: 11:00–22:00',
    'footer.hours.thu': 'ხუთშაბათი: 11:00–22:00',
    'footer.hours.fri': 'პარასკევი: 11:00 – შაბათის დაწყებამდე',
    'footer.hours.sat': 'შაბათის საღამო: შაბათის დასრულებიდან ნახევარი საათის შემდეგ',

    'footer.location.title': 'მდებარეობა და მისამართი',
    'footer.location.address1': 'Vaja Pshavela 8',
    'footer.location.address2': 'Batumi, Georgia',
    'footer.location.navigate': 'გეზის გახსნა',
    'footer.location.whatsapp': 'WhatsApp დაჯავშნისთვის',

    'footer.bottom.copy': '© Bereshit Spa · ყველა უფლება დაცულია'
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

// ✅ תרגום יחידת דקות + פורמט תצוגה
const DURATION_I18N = {
  he: { unit: "דק׳", fmt: (m) => `${m} דק׳` },
  en: { unit: 'min', fmt: (m) => `${m} min` },
  ru: { unit: 'мин', fmt: (m) => `${m} мин` },
  ka: { unit: 'წთ', fmt: (m) => `${m} წთ` }
};

// ✅ שמות + תיאורים + מחיר + תג (כדי לתרגם גם tag)
const TREATMENTS_META = {
  // ===== HEAD SPA =====
  'head-spa': {
    tag: {
      he: '🌸 ספא ראש יפני',
      en: '🌸 Japanese Head Spa',
      ru: '🌸 Японский Head Spa',
      ka: '🌸 იაპონური Head Spa'
    },
    name: {
      he: 'Japanese Head Spa | ספא ראש יפני',
      en: 'Japanese Head Spa',
      ru: 'Японский Head Spa',
      ka: 'იაპონური Head Spa'
    },
    desc: {
      he: 'טיפול יפני מסורתי המשלב ניקוי יסודי של הקרקפת, עיסוי ממוקד, מסכות טיפוליות ופינוקי מים חמימים. הטכניקה ממריצה את זרימת הדם לקרקפת, מחזקת את שורשי השיער ומרגיעה עומסים נפשיים. כולל שטיפה עמוקה, מגבת חמה, סרום ייעודי לקרקפת וייבוש שיער מלא. הטיפול מסתיים במנוחה קצרה עם תה וניחוח ארומטי עדין.',
      en: 'A traditional Japanese treatment combining deep scalp cleansing, focused massage, dedicated masks, and warm water pampering. Boosts circulation, supports hair roots, and reduces mental stress. Includes deep wash, hot towel, scalp serum, and full blow-dry. Ends with a short rest and gentle aroma.',
      ru: 'Традиционная японская процедура: глубокое очищение кожи головы, точечный массаж, маски и тёплая водная терапия. Улучшает кровообращение, укрепляет корни волос и снимает стресс. Включает мытьё, горячее полотенце, сыворотку и полную сушку. Завершается коротким отдыхом с ароматом.',
      ka: 'ტრადიციული იაპონური პროცედურა: თავის კანის ღრმა წმენდა, მიზნობრივი მასაჟი, ნიღბები და თბილი წყლის თერაპია. აუმჯობესებს სისხლის მიმოქცევას, ამაგრებს თმის ფესვებს და ამცირებს სტრესს. მოიცავს დაბანას, ცხელ პირსახოცს, სერუმს და სრულ გაშრობას. სრულდება მოკლე დასვენებით და ნაზი არომატით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  // ===== BODY / BACK =====
  'back-basic': {
    tag: { he: '💪 עיסוי תאילנדי עמוק בשמן', en: '💪 Deep Thai Oil Back–Neck–Shoulders', ru: '💪 Глубокий тайский масляный (спина–шея–плечи)', ka: '💪 ღრმა თაილანდური ზეთოვანი (ზურგი–კיסერი–მხრები)' },
    name: { he: 'Deep Thai Oil Back–Neck–Shoulders Massage | עיסוי תאילנדי עמוק בשמן', en: 'Deep Thai Oil Back–Neck–Shoulders Massage', ru: 'Глубокий тайский масляный массаж спины, шеи и плеч', ka: 'ღრმა თაილანდური ზეთოვანი მასაჟი ზურგის, კისრისა და მხრების' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי בשמן המתמקד באזורי עומס מרכזיים. משלב לחיצות עמוקות, עבודה מדויקת עם אמות ומרפקים. מסייע בהפחתת כאבי צוואר, כתפיים וגב עליון. מתאים לעומס יומיומי וישיבה ממושכת.',
      en: 'Therapeutic Thai oil massage focusing on key tension areas. Combines deep pressure and precise forearm/elbow work. Helps reduce neck, shoulder and upper-back pain—great for daily load and long sitting.',
      ru: 'Лечебный тайский массаж с маслом: глубокое давление и работа предплечьями/локтями. Помогает уменьшить боль в шее, плечах и верхней части спины. Идеально при сидячей нагрузке.',
      ka: 'თერაპიული თაილანდური ზეთოვანი მასაჟი: ღრმა წნევა და იდაყვებით/მაჯებით ზუსტი მუშაობა. ამცირებს კისრის, მხრების და ზედა ზურგის დაძაბულობას. კარგია ხანგრძლივი ჯდომისას.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'back-hot-stone': {
    tag: { he: '🔥 עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: '🔥 Hot Stone Back–Neck–Shoulders', ru: '🔥 Горячие камни (спина–шея–плечи)', ka: '🔥 ცხელი ქვები (ზურგი–კისერი–მხრები)' },
    name: { he: 'Hot Stone Back–Neck–Shoulders Massage | עיסוי גב–כתפיים–צוואר עם אבנים חמות', en: 'Hot Stone Back–Neck–Shoulders Massage', ru: 'Массаж спины, шеи и плеч горячими камнями', ka: 'ზურგის, კისრის და მხრების მასაჟი ცხელ ქვებთან' },
    desc: {
      he: 'עיסוי ממוקד המשלב עבודה ידנית עם אבני בזלת חמימות. החום מאפשר שחרור עמוק ובטוח של שרירים תפוסים. מפחית מתח נפשי וכאבים כרוניים בפלג הגוף העליון. יוצר הרפיה מלאה ותחושת קלילות.',
      en: 'Focused massage combining manual work with warm basalt stones. Heat enables deep, safe release of tight muscles—great for upper-body tension and chronic discomfort. Creates full relaxation and lightness.',
      ru: 'Прицельный массаж с тёплыми базальтовыми камнями. Тепло помогает безопасно снять глубокие зажимы и напряжение в верхней части тела. Даёт полное расслабление и лёгкость.',
      ka: 'მიზანმიმართული მასაჟი თბილი ბაზალტის ქვებით. სითბო უსაფრთხოდ ხსნის ღრმა დაჭიმულობას ზედა სხეულში და ქმნის სრულ რელაქსაციას.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

  // ===== FULL BODY =====
  'body-aloe-vera': {
    tag: { he: '🌿 עיסוי תאילנדי עם אלוורה', en: '🌿 Thai Aloe Vera Massage', ru: '🌿 Тайский массаж с алоэ вера', ka: '🌿 თაილანდური მასაჟი ალოე ვერათი' },
    name: { he: 'Thai Aloe Vera Massage | עיסוי תאילנדי עם אלוורה', en: 'Thai Aloe Vera Massage', ru: 'Тайский массаж с алоэ вера', ka: 'თაილანდური მასაჟი ალოე ვერათი' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב ג׳ל אלוורה טבעי. האלוורה מרגיעה, מקררת ומזינה את העור תוך שמירה על לחות וגמישות. מתאים במיוחד לעור רגיש ולאחר חשיפה לשמש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage with natural aloe vera gel. Aloe cools, soothes and nourishes the skin while supporting hydration and elasticity—great for sensitive skin and after sun exposure. Full-body treatment including a gentle face massage.',
      ru: 'Нежный тайский массаж с натуральным гелем алоэ вера. Алоэ охлаждает, успокаивает и питает кожу, поддерживая увлажнение и эластичность—особенно после солнца и при чувствительной коже. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ალოე ვერას გელით. ალოე აგრილებს, ამშვიდებს და კვებავს კანს, ხელს უწყობს დატენიანებასა და ელასტიურობას—განსაკუთრებით მზის შემდეგ და მგრძნობიარე კანზე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-vitamin-e': {
    tag: { he: '✨ עיסוי תאילנדי עם קרם ויטמין E', en: '✨ Thai Vitamin E Cream Massage', ru: '✨ Тайский массаж с кремом Vitamin E', ka: '✨ თაილანდური მასაჟი Vitamin E კრემით' },
    name: { he: 'Thai Vitamin E Cream Massage | עיסוי תאילנדי עם קרם ויטמין E', en: 'Thai Vitamin E Cream Massage', ru: 'Тайский массаж с кремом Vitamin E', ka: 'თაილანდური მასაჟი Vitamin E კრემით' },
    desc: {
      he: 'עיסוי תאילנדי בשילוב קרם מועשר בויטמין E להזנה עמוקה של העור. מסייע בשיפור גמישות ובהפחתת יובש. משלב רוגע וטיפוח קוסמטי. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A Thai massage with Vitamin E-enriched cream for deep skin nourishment. Helps improve elasticity and reduce dryness, combining relaxation with cosmetic care. Full-body treatment including a gentle face massage.',
      ru: 'Тайский массаж с кремом, обогащённым витамином E, для глубокого питания кожи. Помогает улучшить эластичность и уменьшить сухость. Полный массаж тела с мягким массажем лица.',
      ka: 'თაილანდური მასაჟი Vitamin E-ით გამდიდრებული კრემით კანის ღრმა კვებისთვის. აუმჯობესებს ელასტიურობას და ამცირებს სიმშრალეს. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-Thai Oil Massage': {
    tag: { he: '🧘 Thai Oil Massage', en: '🧘 Thai Oil Massage', ru: '🧘 Тайский массаж с маслом', ka: '🧘 თაილანდური ზეთოვანი მასაჟი' },
    name: { he: 'Thai Oil Massage | עיסוי תאילנדי בשמן', en: 'Thai Oil Massage', ru: 'Тайский масляный массаж', ka: 'ტაილანდური ზეთოვანი მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא בשמן איכותי בתנועות ארוכות, רכות וזורמות. משלב טכניקה תאילנדית להרפיה עמוקה, שחרור מתחים ושיפור זרימה. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A full-body oil massage with long, flowing strokes and Thai technique for deep relaxation, tension release and improved circulation. Full-body treatment including a gentle face massage.',
      ru: 'Массаж всего тела с маслом: плавные движения и тайская техника для глубокого расслабления, снятия напряжения и улучшения кровообращения. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის ზეთოვანი მასაჟი — გრძელი, მოლივლივე მოძრაობებით და ტაილანდური ტექნიკით ღრმა რელაქსაციისთვის და დაძაბულობის მოსახსნელად. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'body-coconut-oil': {
    tag: { he: '🥥 עיסוי תאילנדי עם שמן קוקוס', en: '🥥 Thai Coconut Oil Massage', ru: '🥥 Тайский массаж с кокосовым маслом', ka: '🥥 თაილანდური მასაჟი ქოქოსის ზეთით' },
    name: { he: 'Thai Coconut Oil Massage | עיסוי תאילנדי עם שמן קוקוס', en: 'Thai Coconut Oil Massage', ru: 'Тайский массаж с кокосовым маслом', ka: 'თაილანდური მასაჟი ქოქოსის ზეთით' },
    desc: {
      he: 'עיסוי תאילנדי עדין בשילוב שמן קוקוס טבעי המזין את העור ומעניק לחות עמוקה. התנועות זורמות ומאזנות את הגוף והנפש. מתאים במיוחד לעור יבש או רגיש. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A gentle Thai massage with natural coconut oil for deep hydration and skin nourishment. Flowing strokes balance body and mind—especially suitable for dry or sensitive skin. Full-body treatment including a gentle face massage.',
      ru: 'Нежный тайский массаж с натуральным кокосовым маслом для питания кожи и глубокого увлажнения. Плавные движения балансируют тело и ум. Подходит для сухой и чувствительной кожи. Полный массаж тела с мягким массажем лица.',
      ka: 'ნაზი თაილანდური მასაჟი ბუნებრივი ქოქოსის ზეთით ღრმა დატენიანებისა და კვებისთვის. მოლივლივე მოძრაობები აბალანსებს სხეულსა და გონებას. კარგია მშრალი/მგრძნობიარე კანისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-thai': {
    tag: { he: '🇹🇭 עיסוי תאילנדי מסורתי', en: '🇹🇭 Traditional Thai Massage', ru: '🇹🇭 Традиционный тайский массаж', ka: '🇹🇭 ტრადიციული ტაილანდური' },
    name: { he: 'Traditional Thai Massage | עיסוי תאילנדי מסורתי', en: 'Traditional Thai Massage', ru: 'Традиционный тайский массаж', ka: 'ტრადიციული ტაილანდური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי ללא שמן. משלב לחיצות, מתיחות ועבודה על קווי האנרגיה (Sen). משפר גמישות, זרימה וחיוניות. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Traditional oil-free Thai massage combining pressure, stretching and work on energy lines (Sen). Improves flexibility, circulation and vitality. Full-body treatment including a gentle face massage.',
      ru: 'Традиционный тайский массаж без масла: надавливания, растяжки и работа по энергетическим линиям (Sen). Улучшает гибкость и тонус. Полный массаж тела с мягким массажем лица.',
      ka: 'ტრადიციული თაილანდური მასაჟი ზეთის გარეშე: წნევა, გაჭიმვები და ენერგეტიკულ ხაზებზე (Sen) მუშაობა. აუმჯობესებს მოქნილობას და სიცოცხლისუნარიანობას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
  },

  'body-thai-balm': {
    tag: { he: '🔥 עיסוי תאילנדי עם באלם', en: '🔥 Thai Balm Massage', ru: '🔥 Тайский массаж с бальзамом', ka: '🔥 თაილანდური მასაჟი ბალზამით' },
    name: { he: 'Thai Balm Massage | עיסוי תאילנדי עם באלם', en: 'Thai Balm Massage', ru: 'Тайский массаж с бальзамом', ka: 'თაილანდური მასაჟი ბალზამით' },
    desc: {
      he: 'עיסוי תאילנדי ממוקד עם באלם תאילנדי ייעודי. מסייע בהפחתת כאבים, נוקשות ודלקות מקומיות. מתבצע בלחיצות עמוקות על אזורי עומס. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A focused Thai massage using a dedicated Thai balm. Helps reduce pain, stiffness and local inflammation with deep pressure on key tension areas. Full-body treatment including a gentle face massage.',
      ru: 'Тайский массаж с бальзамом: глубокие надавливания на зоны напряжения, помогает уменьшить боль и скованность. Полный массаж тела с мягким массажем лица.',
      ka: 'თაილანდური მასაჟი სპეციალური ბალზამით — ღრმა წერტილოვანი მუშაობა დაძაბულობის ზონებზე. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-thai-ther': {
    tag: { he: '🩺 עיסוי תאילנדי טיפולי', en: '🩺 Thai Therapeutic Massage', ru: '🩺 Лечебный тайский массаж', ka: '🩺 თერაპიული თაილანდური' },
    name: { he: 'Thai Therapeutic Massage | עיסוי תאילנדי טיפולי', en: 'Thai Therapeutic Massage', ru: 'Тайский лечебный массаж', ka: 'ტაილანდური თერაპიული მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי טיפולי עמוק וממוקד. מטפל בכאבי גב, צוואר ושרירים תפוסים כרונית. משפר טווח תנועה ומפחית עומסים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A deep, focused therapeutic Thai massage targeting back/neck pain and chronically tight muscles. Improves range of motion and reduces overload. Full-body treatment including a gentle face massage.',
      ru: 'Глубокий лечебный тайский массаж: спина/шея и хронические зажимы. Улучшает подвижность и снижает нагрузку. Полный массаж тела с мягким массажем лица.',
      ka: 'ღრმა თერაპიული თაილანდური მასაჟი — ზურგი/კისერი და ქრონიკული დაჭიმულობა. აუმჯობესებს მოძრაობას და ამცირებს დატვირთვას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  'body-sports': {
    tag: { he: '🏃 עיסוי ספורט', en: '🏃 Sports Massage', ru: '🏃 Спортивный массаж', ka: '🏃 სპორტული მასაჟი' },
    name: { he: 'Sports Massage | עיסוי ספורט', en: 'Sports Massage', ru: 'Спортивный массаж', ka: 'სპორტული მასაჟი' },
    desc: {
      he: 'עיסוי אינטנסיבי לשחרור עומסים מפעילות גופנית. משלב טכניקות עומק ומתיחות. מסייע בהתאוששות ומניעת פציעות. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An intensive massage for athletic load relief. Combines deep techniques and stretching to support recovery and injury prevention. Full-body treatment including a gentle face massage.',
      ru: 'Интенсивный массаж для снятия нагрузки после тренировок. Глубокие техники и растяжки помогают восстановлению и профилактике травм. Полный массаж тела с мягким массажем лица.',
      ka: 'ინტენსიური მასაჟი ფიზიკური დატვირთვის შემდეგ — ღრმა ტექნიკებითა და გაჭიმვებით. ეხმარება აღდგენასა და ტრავმების პრევენციას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-deep-tissue-cream': {
    tag: { he: '💪 עיסוי תאילנדי עמוק (דיפ טישיו) – פרימיום', en: '💪 Deep Tissue Thai Massage (Premium)', ru: '💪 Глубокий тайский массаж (Премиум)', ka: '💪 ღრმა თაილანდური მასაჟი (Premium)' },
    name: { he: 'Deep Tissue Thai Massage | עיסוי תאילנדי עמוק (דיפ טישיו) – פרימיום', en: 'Deep Tissue Thai Massage', ru: 'Глубокий тайский массаж', ka: 'ღრმა თაილანდური მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי עמוק במיוחד לשכבות השריר הפנימיות. משלב לחץ חזק וטכניקות עומק לטיפול בעומסים וכאבים כרוניים. מיועד למטופלים מנוסים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An extra-deep Thai massage targeting inner muscle layers. Strong pressure and deep techniques for chronic load and ongoing pain. Intended for experienced clients. Full-body treatment including a gentle face massage.',
      ru: 'Очень глубокий тайский массаж, работающий с внутренними слоями мышц. Сильное давление и глубокие техники при хронической нагрузке и болях. Для опытных клиентов. Полный массаж тела с мягким массажем лица.',
      ka: 'განსაკუთრებით ღრმა თაილანდური მასაჟი შიდა კუნთოვან შრეებზე. ძლიერი წნევა და ღრმა ტექნიკები ქრონიკული დატვირთვისა და ტკივილისთვის. გამოცდილ კლიენტებზეა გათვლილი. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
  },

  'body-hot-stone': {
    tag: { he: '🔥 עיסוי אבנים חמות', en: '🔥 Hot Stone Massage', ru: '🔥 Массаж горячими камнями', ka: '🔥 ცხელი ქვების მასაჟი' },
    name: { he: 'Hot Stone Massage | עיסוי אבנים חמות', en: 'Hot Stone Massage', ru: 'Массаж горячими камнями', ka: 'ცხელი ქვების მასაჟი' },
    desc: {
      he: 'עיסוי גוף מלא באמצעות אבני בזלת חמימות. החום חודר לרקמות ומשחרר מתחים עמוקים. משפר זרימת דם ומרפה שרירים. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'A full-body massage using warm basalt stones. Heat penetrates tissues, releases deep tension and improves circulation. Full-body treatment including a gentle face massage.',
      ru: 'Массаж всего тела тёплыми базальтовыми камнями. Тепло снимает глубокие зажимы и улучшает кровообращение. Полный массаж тела с мягким массажем лица.',
      ka: 'მთლიანი სხეულის მასაჟი თბილი ბაზალტის ქვებით. სითბო ხსნის ღრმა დაძაბულობას და აუმჯობესებს სისხლის მიმოქცევას. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 200₾', en: '60 min – 200₾', ru: '60 мин – 200₾', ka: '60 წთ – 200₾' }
  },

  'body-thai-comp': {
    tag: { he: '🌼 עיסוי תאילנדי בקומפרסים צמחיים', en: '🌼 Thai Herbal Compress Massage', ru: '🌼 Травяные компрессы', ka: '🌼 მცენარეული კომპრესი' },
    name: { he: 'Thai Herbal Compress Massage | עיסוי תאילנדי בקומפרסים צמחיים', en: 'Thai Herbal Compress Massage', ru: 'Массаж травяными компрессами', ka: 'მცენარეული კომპრესის მასაჟი' },
    desc: {
      he: 'עיסוי מסורתי עם שקיות צמחים תאילנדיים מחוממות. החום והעשבים מסייעים בהרגעת כאבים והפחתת דלקת. משולב עם עיסוי ידני עמוק. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'Traditional massage with heated Thai herbal compresses. Heat and herbs help soothe pain and reduce inflammation, combined with deep manual massage. Full-body treatment including a gentle face massage.',
      ru: 'Традиционный массаж с подогретыми тайскими травяными мешочками. Тепло и травы помогают уменьшить боль и воспаление, в сочетании с глубоким ручным массажем. Полный массаж тела с мягким массажем лица.',
      ka: 'ტრადიციული მასაჟი გახურებული თაილანდური მცენარეული კომპრესებით. სითბო და მცენარეები ამშვიდებს ტკივილს და ამცირებს ანთებას, ერთიანდება ღრმა მანუალურ მასაჟთან. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 190₾', en: '60 min – 190₾', ru: '60 мин – 190₾', ka: '60 წთ – 190₾' }
  },

  'body-karsai': {
    tag: { he: '⚡ עיסוי תאילנדי קארסאי – פרימיום', en: '⚡ Karsai Massage (Premium)', ru: '⚡ Карсай массаж (Премиум)', ka: '⚡ Karsai მასაჟი (Premium)' },
    name: { he: 'Karsai Massage | עיסוי תאילנדי קארסאי – פרימיום', en: 'Karsai Massage', ru: 'Карсай массаж', ka: 'Karsai მასაჟი' },
    desc: {
      he: 'עיסוי תאילנדי מסורתי מתקדם מהרפואה העתיקה. מתמקד באזורים אנרגטיים עמוקים. טיפול עוצמתי ונישתי המיועד למטופלים מנוסים בלבד. הטיפול מתבצע כעיסוי גוף מלא וכולל גם עיסוי פנים.',
      en: 'An advanced traditional Thai treatment focusing on deep energetic areas. A powerful niche treatment intended for experienced clients only. Full-body treatment including a gentle face massage.',
      ru: 'Продвинутая традиционная тайская процедура с фокусом на глубокие энергетические зоны. Мощная нишевая процедура — только для опытных клиентов. Полный массаж тела с мягким массажем лица.',
      ka: 'განვითარებული ტრადიციული თაილანდური პროცედურა ღრმა ენერგეტიკულ ზონებზე ფოკუსით. ძლიერი ნიშური პროცედურა მხოლოდ გამოცდილ კლიენტებისთვის. მთლიანი სხეულის პროცედურა, სახის ნაზი მასაჟის ჩათვლით.'
    },
    price: { he: '60 דק׳ – 180₾', en: '60 min – 180₾', ru: '60 мин – 180₾', ka: '60 წთ – 180₾' }
  },

'body-thai-relax-oil': {
  tag: { he: '🌿 עיסוי תאילנדי מרגיע', en: '🌿 Thai Relax Oil Massage', ru: '🌿 Тайский расслабляющий ойл-массаж', ka: '🌿 ტაილანდური რელაქს ზეთოვანი მასაჟი' },
  name: { he: 'Thai Relax Oil Massage | עיסוי תאילנדי מרגיע', en: 'Thai Relax Oil Massage', ru: 'Thai Relax Oil Massage | Тайский расслабляющий массаж', ka: 'Thai Relax Oil Massage | ტაილანდური დამამშვიდებელი მასაჟი' },
  desc: {
    he: 'עיסוי גוף מלא בסגנון תאילנדי רגוע, בקצב איטי וזורם עם שמנים איכותיים ומגע עמוק ועדין. משחרר מתחים, מרפה את השרירים ומאזן את מערכת העצבים. מתאים למי שמחפש חוויית רוגע עמוקה ופינוק אמיתי.',
    en: 'A full-body Thai-style relaxation massage performed in a slow, flowing rhythm using high-quality oils and gentle yet deep touch. Releases tension, relaxes muscles, and balances the nervous system. Ideal for deep relaxation and true indulgence.',
    ru: 'Расслабляющий тайский массаж всего тела в медленном и плавном ритме с использованием качественных масел и мягкого, но глубокого воздействия. Снимает напряжение, расслабляет мышцы и гармонизирует нервную систему. Идеален для глубокого отдыха и удовольствия.',
    ka: 'მთლიანი სხეულის ტაილანდური რელაქს მასაჟი ნელი და მოლივლივე რიტმით, მაღალი ხარისხის ზეთებისა და რბილი, თუმცა ღრმა შეხების გამოყენებით. ამცირებს დაძაბულობას, ამშვიდებს კუნთებს და აბალანსებს ნერვულ სისტემას. იდეალურია ღრმა მოდუნებისა და ნამდვილი სიამოვნებისთვის.'
  },
  price: { he: '60 דק׳ – 150₾', en: '60 min – 150₾', ru: '60 мин – 150₾', ka: '60 წთ – 150₾' }
},

'body-thai-hot-oil': {
  tag: { he: '🔥 עיסוי תאילנדי בשמן חם', en: '🔥 Thai Hot Oil Massage', ru: '🔥 Тайский массаж горячим маслом', ka: '🔥 ტაილანდური მასაჟი ცხელი ზეთით' },
  name: { he: 'Thai Hot Oil Massage | עיסוי תאילנדי בשמן חם', en: 'Thai Hot Oil Massage', ru: 'Thai Hot Oil Massage | Тайский массаж горячим маслом', ka: 'Thai Hot Oil Massage | ტაილანდური მასაჟი ცხელი ზეთით' },
  desc: {
    he: 'עיסוי גוף מלא בטכניקות תאילנדיות זורמות בשילוב שמן חם ואיכותי. החום מסייע בהרפיית השרירים ומאפשר עבודה עמוקה ונעימה יותר. התנועות מדויקות ואיטיות, משחררות מתחים ומשפרות את זרימת הדם. הטיפול כולל גם עיסוי פנים עדין.',
    en: 'A full-body massage using flowing Thai techniques with warm, high-quality oil. The heat relaxes muscles and allows deeper, more comfortable work. Slow, precise movements release tension and improve circulation. Includes a gentle face massage.',
    ru: 'Массаж всего тела с использованием плавных тайских техник и тёплого качественного масла. Тепло расслабляет мышцы и позволяет работать глубже и комфортнее. Медленные точные движения снимают напряжение и улучшают кровообращение. Включает мягкий массаж лица.',
    ka: 'მთლიანი სხეულის მასაჟი მოლივლივე ტაილანდური ტექნიკებით და თბილი, მაღალი ხარისხის ზეთით. სითბო ამშვიდებს კუნთებს და იძლევა უფრო ღრმა და კომფორტულ მუშაობას. ნელი და ზუსტი მოძრაობები ხსნის დაძაბულობას და აუმჯობესებს სისხლის მიმოქცევას. მოიცავს სახის ნაზ მასაჟს.'
  },
  price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
},

'body-aroma-oil-therapeutic': {
  tag: { he: '🌿 עיסוי ארומתרפי – פרימיום', en: '🌿 Aroma Oil Therapeutic Massage (Premium)', ru: '🌿 Арома ойл-массаж (Премиум)', ka: '🌿 არომა ზეთოვანი მასაჟი (Premium)' },
  name: { he: 'Aroma Oil Therapeutic Massage | עיסוי ארומתרפי בשמנים אתריים', en: 'Aroma Oil Therapeutic Massage', ru: 'Ароматерапевтический ойл-массаж', ka: 'არომათერაპიული ზეთოვანი მასაჟი' },
  desc: {
    he: 'עיסוי גוף מלא בטכניקות תאילנדיות זורמות. שילוב שמנים אתריים טבעיים בהתאמה אישית. ניחוח השמנים מרגיע את הגוף והנפש. הטיפול כולל גם עיסוי פנים עדין.',
    en: 'A full-body massage using flowing Thai techniques. Combined with natural essential oils selected personally. The aroma calms body and mind. Includes a gentle face massage.',
    ru: 'Массаж всего тела с использованием плавных тайских техник. Натуральные эфирные масла подбираются индивидуально. Аромат расслабляет тело и разум. Включает мягкий массаж лица.',
    ka: 'მთლიანი სხეულის მასაჟი მოლივლივე ტაილანდური ტექნიკებით. გამოყენებულია ბუნებრივი ეთერზეთები ინდივიდუალური შერჩევით. არომატი ამშვიდებს სხეულსა და გონებას. მოიცავს სახის ნაზ მასაჟს.'
  },
  price: { he: '60 דק׳ – 170₾', en: '60 min – 170₾', ru: '60 мин – 170₾', ka: '60 წთ – 170₾' }
},

'foot-massage': {
  tag: { he: '🦶 טיפולי כפות רגליים', en: '🦶 Thai Foot Massage', ru: '🦶 Тайский массаж стоп', ka: '🦶 ტაილანდური ფეხის მასაჟი' },
  name: { he: 'Thai Foot Massage | עיסוי כפות רגליים', en: 'Thai Foot Massage', ru: 'Thai Foot Massage', ka: 'Thai Foot Massage' },
  desc: {
    he: 'עיסוי כפות רגליים מרגיע לשחרור עייפות. משפר זרימת דם ומעניק תחושת קלילות.',
    en: 'A relaxing Thai foot massage to release fatigue, improve circulation and create a light feeling.',
    ru: 'Расслабляющий тайский массаж стоп для снятия усталости и улучшения кровообращения.',
    ka: 'დამამშვიდებელი ტაილანდური ფეხის მასაჟი დაღლილობის მოსახსნელად და სისხლის მიმოქცევის გასაუმჯობესებლად.'
  },
  price: { he: '30 דק׳ – 80₾ · 60 דק׳ – 120₾', en: '30 min – 80₾ · 60 min – 120₾', ru: '30 мин – 80₾ · 60 мин – 120₾', ka: '30 წთ – 80₾ · 60 წთ – 120₾' }
},

  'foot-reflexology': {
    tag: { he: '🦶 עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: '🦶 Thai Reflexology Foot Massage', ru: '🦶 Тайская рефлексология стоп', ka: '🦶 თაილანდური რეფლექსოლოგია ფეხზე' },
    name: { he: 'Thai Reflexology Foot Massage | עיסוי תאילנדי כפות רגליים רפלקסולוגי', en: 'Thai Reflexology Foot Massage', ru: 'Тайский массаж стоп (рефлексология)', ka: 'ტაილანდური ფეხის რეფლექსოლოგიური მასაჟი' },
    desc: {
      he: 'עיסוי רפלקסולוגי תאילנדי עם לחיצות עמוקות ומשחה חריפה. משפיע על מערכות הגוף דרך נקודות השתקפות בכפות הרגליים. טיפול ממוקד ויעיל.',
      en: 'A Thai reflexology foot treatment with deep pressure and a warming balm. Influences body systems through reflex points in the feet—focused and effective.',
      ru: 'Тайская рефлексология стоп: глубокие надавливания и разогревающий бальзам. Воздействует на системы организма через рефлекторные точки стоп—точно и эффективно.',
      ka: 'თაილანდური რეფლექსოლოგია ფეხზე — ღრმა წნევა და გამათბობელი ბალზამი. მოქმედებს რეფლექსურ წერტილებზე და ხელს უწყობს საერთო ბალანსს.'
    },
    price: { he: '60 דק׳ – 140₾', en: '60 min – 140₾', ru: '60 мин – 140₾', ka: '60 წთ – 140₾' }
  }
};

// ===== תרגום כרטיסי הטיפולים על הדף (כולל tag) =====
function applyTreatmentTexts(lang) {
  // ✅ תומך גם בכרטיסי סליידר הדגל
  document.querySelectorAll('.product-card, .flagship-card').forEach((card) => {
    const btn = card.querySelector('[data-treatment-key]');
    if (!btn) return;

    const key = btn.getAttribute('data-treatment-key');
    const meta = TREATMENTS_META[key];
    if (!meta) return;

    const tagEl = card.querySelector('.tag');
    if (tagEl && meta.tag) {
      tagEl.textContent = meta.tag[lang] || meta.tag.he || tagEl.textContent;
    }

    const titleEl = card.querySelector('.product-title');
    if (titleEl && meta.name) {
      titleEl.textContent = meta.name[lang] || meta.name.he || titleEl.textContent;
    }

    // בכרטיסי הדגל יש class ייעודי לתיאור, ובכרטיסי grid נשאר כמו שהיה
    const descEl = card.querySelector('.flagship-desc') || card.querySelector('p:not(.price)');
    if (descEl && meta.desc) {
      descEl.textContent = meta.desc[lang] || meta.desc.he || descEl.textContent;
    }

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
        (btn.closest('.product-card, .flagship-card')?.querySelector('.product-title')?.textContent.trim() ?? 'Treatment');

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

// ===== Video Slider =====
function setupVideoSlider() {
  const slider = document.querySelector('.video-slider');
  if (!slider) return;

  const track = slider.querySelector('.video-slider__track');
  const slides = Array.from(slider.querySelectorAll('.video-slide'));
  if (!track || slides.length <= 1) return;

  const prevBtn = slider.querySelector('.video-slider__nav--prev');
  const nextBtn = slider.querySelector('.video-slider__nav--next');
  const dotsWrap = slider.querySelector('.video-slider__dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.video-slider__dot')) : [];

  let index = 0;
  let timer = null;

  function pauseAllVideos() {
    slides.forEach((s) => {
      const v = s.querySelector('video');
      if (!v) return;
      try { v.pause(); } catch (_) {}
    });
  }

  async function playActiveVideo() {
    const active = slides[index];
    const v = active ? active.querySelector('video') : null;
    if (!v) return;
    try { await v.play(); } catch (_) {}
  }

  function setActiveDot() {
    if (!dots.length) return;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

function goTo(i) {
  const max = slides.length;
  index = (i + max) % max;

  // ✅ תמיד מזיזים שמאלה ב־100% לכל שקף (זה עובד נכון גם ב־RTL)
  track.style.transform = `translateX(${-index * 100}%)`;
  setDots();
}


  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(next, 5500);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

const isRTL = document.documentElement.dir === 'rtl';

if (prevBtn) prevBtn.addEventListener('click', () => {
  stopAuto();
  isRTL ? next() : prev();   // ✅ ב-RTL "שמאל" מתקדם קדימה
  startAuto();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
  stopAuto();
  isRTL ? prev() : next();   // ✅ ב-RTL "ימין" חוזר אחורה
  startAuto();
});


  if (dots.length && dots.length === slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
}

// ===== Flagship Treatments Slider (responsive + works with variable widths) =====
function setupFlagshipSlider() {
  const viewport = document.getElementById('flagshipSlider'); // זה ה-viewport אצלך
  if (!viewport) return;

  const slider = viewport.closest('.flagship-slider') || viewport; // עוטף כדי למצוא חצים/דוטים תמיד
  const track = viewport.querySelector('.flagship-slider__track');
  const slides = Array.from(viewport.querySelectorAll('.flagship-slide'));
  if (!track || slides.length <= 1) return;

  const prevBtn = slider.querySelector('.flagship-slider__nav--prev');
  const nextBtn = slider.querySelector('.flagship-slider__nav--next');
  const dots = Array.from(slider.querySelectorAll('.flagship-slider__dot'));

  let index = 0;
  let timer = null;

  function setDots() {
    if (!dots.length) return;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i, smooth = true) {
    const max = slides.length;
    index = (i + max) % max;

    // ✅ רספונסיבי אמיתי: לא תלוי ב-100% ולא נשבר עם gap/רוחבים משתנים
    slides[index].scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest'
    });

    setDots();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(next, 6000);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  if (dots.length === slides.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });
  }

  // עצירה בהובר (בדסקטופ)
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // מאפשר ריענון כשמשנים שפה / dir
  window.__flagshipSlider = { refresh: () => goTo(index, false) };

  goTo(0, false);
  startAuto();
}

// ===== אתחול =====
document.addEventListener('DOMContentLoaded', () => {
  const lang = getLang();
  applyLang(lang);
  setupLangButtons();
  setupTreatmentButtons();
  setupVideoSlider();
  // setupVideoSlider(); // לא צריך לסליידר טיפולים
  setupFlagshipSlider();
});