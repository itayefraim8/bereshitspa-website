// landing-landing.js — i18n + Booking + Stripe Checkout עבור דפי הנחיתה
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // -----------------------
  // שפה / כיווניות
  // -----------------------
  const getLang = () =>
    (localStorage.getItem('site_lang') || (navigator.language || 'he'))
      .slice(0, 2)
      .replace(/[^a-z]/gi, '') || 'he';

  const setHtmlLangDir = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';
  };

  const currentLang = getLang();
  setHtmlLangDir(currentLang);

  // הפעלת דגלים (מתגי שפה)
  const langButtons = $$('.lang-btn[data-lang]');
  langButtons.forEach(btn => {
    const lang = btn.dataset.lang;
    if (lang === currentLang) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      localStorage.setItem('site_lang', lang);
      // רענון כדי שכל הדף יעבור לשפה
      location.reload();
    });
  });

  // -----------------------
  // מילון i18n
  // -----------------------
  const STRINGS = {
    he: {
      // META / HERO
      'landing.meta.title': 'Bereshit Spa – דף נחיתה טיפולים',
      'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
      'landing.hero.title': 'ספא ראש יפני ועיסויי גוף תאילנדיים ברמת בוטיק',
      'landing.hero.subtitle': 'בחר/י טיפול, קבע/י שעה נוחה ושלים/י תשלום מאובטח בכרטיס אשראי – הכול בדף אחד.',
      'landing.hero.cta': 'לבחור טיפול ולהזמין עכשיו',

      'landing.treatments.title': 'בחר/י טיפול מפנק',
      'landing.treatments.subtitle': 'כל הטיפולים מתבצעים על-ידי צוות תאילנדי מקצועי, באווירה שקטה ומוסיקה מרגיעה.',

      // משכים
      'landing.dur.30': "30 דק'",
      'landing.dur.60': "60 דק'",
      'landing.dur.90': "90 דק'",

      // טיפולים – תגים, כותרות, תיאורים, מחירים
      'landing.t.head.tag': '👑 Japanese Head Spa',
      'landing.t.head.title': 'טיפול הדגל – ספא ראש יפני',
      'landing.t.head.desc': 'טיפול יפני מסורתי המשלב ניקוי, עיסוי קרקפת, מסכות ופינוקי מים חמימים. כולל שטיפה, מגבת חמה, סרום לקרקפת וייבוש שיער מלא.',
      'landing.t.head.price': "60 דק' – 200₾ · 90 דק' – 250₾",

      'landing.t.faceCompress.tag': '🌼 Thai Herbal Compress Facial',
      'landing.t.faceCompress.title': 'עיסוי פנים בקומפרסים תאילנדים',
      'landing.t.faceCompress.desc': 'קומפרסים תאילנדים חמים מרפים את שרירי הפנים ומשפרים את זרימת הדם. כולל עיסוי פנים מעמיק, קרקפת ופלג גוף עליון.',
      'landing.t.faceCompress.price': "60 דק' – 150₾",

      'landing.t.faceHotStone.tag': '🔥 Hot Stone Facial',
      'landing.t.faceHotStone.title': 'עיסוי פנים באבנים חמות',
      'landing.t.faceHotStone.desc': 'אבני בזלת חמות נעות בעדינות על הפנים והצוואר ומשחררות מתחים. כולל עיסוי פנים, קרקפת וצוואר.',
      'landing.t.faceHotStone.price': "60 דק' – 160₾",

      'landing.t.faceThai.tag': '🌺 Traditional Thai Face Massage',
      'landing.t.faceThai.title': 'עיסוי פנים תאילנדי מסורתי',
      'landing.t.faceThai.desc': 'עיסוי עדין עם לחיצות אנרגטיות, משחרר מתח מהפנים, הלסת והצוואר.',
      'landing.t.faceThai.price': "30 דק' – 90₾ · 60 דק' – 150₾",

      'landing.t.faceAroma.tag': '🌿 Aromatherapy Facial',
      'landing.t.faceAroma.title': 'עיסוי פנים ארומתרפי',
      'landing.t.faceAroma.desc': 'טיפול עדין עם שמנים אתריים טהורים, מרגיע את מערכת העצבים ומעניק זוהר לעור.',
      'landing.t.faceAroma.price': "30 דק' – 80₾ · 60 דק' – 140₾",

      'landing.t.backBasic.tag': '💆‍♂️ Back–Neck–Shoulders',
      'landing.t.backBasic.title': 'עיסוי גב–כתפיים–צוואר',
      'landing.t.backBasic.desc': 'עיסוי ממוקד לשחרור מתחים באזורי העומס המרכזיים – מתאים לישיבה ממושכת.',
      'landing.t.backBasic.price': "60 דק' – 150₾",

      'landing.t.backHotStone.tag': '🔥 Hot Stone Back Massage',
      'landing.t.backHotStone.title': 'עיסוי גב–כתפיים–צוואר עם אבנים חמות',
      'landing.t.backHotStone.desc': 'אבני בזלת חמות חודרות לשרירים וממיסות מתחים עמוקים, בשילוב עיסוי ידני עמוק.',
      'landing.t.backHotStone.price': "60 דק' – 180₾",

      'landing.t.bodyThai.tag': '🇹🇭 Traditional Thai Massage',
      'landing.t.bodyThai.title': 'עיסוי תאילנדי מסורתי',
      'landing.t.bodyThai.desc': 'טיפול עתיק ללא שמן המשלב לחיצות, מתיחות ועבודה על קווי האנרגיה.',
      'landing.t.bodyThai.price': "60 דק' – 170₾ · 90 דק' – 220₾",

      'landing.t.bodyThaiOil.tag': '🇹🇭 Thai Oil Massage',
      'landing.t.bodyThaiOil.title': 'עיסוי שמן תאילנדי',
      'landing.t.bodyThaiOil.desc': 'עיסוי גוף מלא בשמן חם בתנועות זורמות ועמוקות, לשחרור עומס שרירי.',
      'landing.t.bodyThaiOil.price': "60 דק' – 180₾ · 90 דק' – 230₾",

      'landing.t.bodyAroma.tag': '🌿 Aromatherapy Oil Massage',
      'landing.t.bodyAroma.title': 'עיסוי ארומתרפי בשמן',
      'landing.t.bodyAroma.desc': 'שמנים אתריים טהורים בשילוב עיסוי גוף מרגיע ומלטף.',
      'landing.t.bodyAroma.price': "60 דק' – 190₾",

      'landing.t.bodyThaiTher.tag': '🇹🇭 Thai Therapeutic Massage',
      'landing.t.bodyThaiTher.title': 'עיסוי תאילנדי רפואי',
      'landing.t.bodyThaiTher.desc': 'עיסוי טיפולי עמוק עם לחיצות ממוקדות ומתיחות מדויקות – מתאים לכאבי גב וצוואר.',
      'landing.t.bodyThaiTher.price': "60 דק' – 230₾ · 90 דק' – 280₾",

      'landing.t.bodyHotStone.tag': '🔥 Hot Stone Massage',
      'landing.t.bodyHotStone.title': 'עיסוי באבנים חמות – גוף מלא',
      'landing.t.bodyHotStone.desc': 'אבני בזלת חמות מחליקות על הגוף וממיסות מתחים עמוקים – רוגע עמוק וזרימת דם טובה.',
      'landing.t.bodyHotStone.price': "60 דק' – 210₾",

      'landing.t.bodyThaiComp.tag': '🌼 Thai Herbal Compress Massage',
      'landing.t.bodyThaiComp.title': 'עיסוי גוף בקומפרסים תאילנדים',
      'landing.t.bodyThaiComp.desc': 'שקיות צמחים תאילנדים חמות מעניקות ריפוי טבעי, ניקוז עומק והקלה על כאבים.',
      'landing.t.bodyThaiComp.price': "60 דק' – 220₾ · 90 דק' – 260₾",

      'landing.t.bodyShiatsu.tag': '🇯🇵 Shiatsu Massage',
      'landing.t.bodyShiatsu.title': 'עיסוי שיאצו יפני',
      'landing.t.bodyShiatsu.desc': 'עיסוי ללא שמן בלחיצות לאורך מרידיאנים – מאזן אנרגיה פנימית ומרגיע עומס נפשי.',
      'landing.t.bodyShiatsu.price': "60 דק' – 180₾ · 90 דק' – 230₾",

      'landing.t.foot.tag': '🦶 Thai Foot Massage',
      'landing.t.foot.title': "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי",
      'landing.t.foot.desc': 'עיסוי עמוק ועדין לכפות הרגליים עם לחיצות רפלקסולוגיות, מאזן מערכות גוף שונות.',
      'landing.t.foot.price': "30 דק' – 80₾ · 60 דק' – 120₾",

      'landing.t.bookBtn': 'להזמנת הטיפול',

      // מודאל הזמנה טיפולים
      'landing.booking.title': 'הזמנת טיפול',
      'landing.booking.summaryPlaceholder': 'נא לבחור טיפול מהדף, ואז למלא פרטי קשר ותאריך.',
      'landing.booking.name': 'שם מלא',
      'landing.booking.phone': 'טלפון ליצירת קשר (WhatsApp)',
      'landing.booking.date': 'תאריך טיפול',
      'landing.booking.time': 'שעת טיפול',
      'landing.booking.timePlaceholder': 'בחר/י שעה',
      'landing.booking.duration': 'משך הטיפול',
      'landing.booking.notes': 'העדפות / הערות (אופציונלי)',
      'landing.booking.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe. אישור הזמנה יישלח אליך אוטומטית.',
      'landing.booking.payCta': 'מעבר לתשלום מאובטח',

      'landing.booking.summary': (name, mins, price) =>
        `נבחר: ${name} · משך ${mins} דק' · מחיר ${price}₾`,

      // כרטיסייה – META + HERO + פרטים
      'card.meta.title': 'Bereshit Spa – כרטיסיית טיפולים',
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
      'card.details.priceText': 'מחיר כרטיסייה: 7 טיפולים – 1,200₾ (במקום 1,400₾).',
      'card.details.note':
        'לאחר התשלום תקבלו אישור רכישה למייל/ווטסאפ, והכרטיסייה תירשם על שמכם במערכת שלנו.',

      // כרטיסייה – טופס
      'card.form.title': 'רכישת כרטיסייה',
      'card.form.summary':
        'נא למלא פרטי קשר, תאריך התחלה מועדף ואנחנו נשריין עבורך את הכרטיסייה.',
      'card.form.name': 'שם מלא',
      'card.form.phone': 'טלפון / WhatsApp',
      'card.form.startDate': 'תאריך התחלה מועדף (אופציונלי)',
      'card.form.notes': 'הערות / שמות נוספים בכרטיסייה',
      'card.form.note': 'התשלום מתבצע בכרטיס אשראי מאובטח דרך Stripe.',
      'card.form.payCta': 'מעבר לתשלום מאובטח',

      // טקסטים כלליים לשגיאות / התראות
      'common.error.generic': 'אירעה שגיאה. אנא נסה/י שוב או צור/י קשר עם הספא.',
      'common.error.missingTreatment': 'לא נמצא טיפול מתאים. אנא רענן/י את הדף.',
      'common.error.requiredFields': 'נא למלא את כל השדות החובה (שם, טלפון, תאריך ושעה).'
    },

    // -------- אנגלית --------
    en: {
      'landing.meta.title': 'Bereshit Spa – Treatment Booking',
      'landing.hero.eyebrow': 'Japanese Head Spa & Thai Massage – Batumi',
      'landing.hero.title': 'Japanese Head Spa & Thai Body Massages',
      'landing.hero.subtitle': 'Choose a treatment, pick a time and pay securely by card – all in one page.',
      'landing.hero.cta': 'Choose a treatment & book',

      'landing.treatments.title': 'Choose Your Treatment',
      'landing.treatments.subtitle':
        'All treatments are performed by professional Thai therapists, in a quiet atmosphere with relaxing music.',

      'landing.dur.30': '30 min',
      'landing.dur.60': '60 min',
      'landing.dur.90': '90 min',

      'landing.t.head.tag': '👑 Japanese Head Spa',
      'landing.t.head.title': 'Signature Treatment – Japanese Head Spa',
      'landing.t.head.desc':
        'Traditional Japanese ritual with cleansing, scalp massage, masks and warm water pampering. Includes wash, hot towel, scalp serum and full hair drying.',
      'landing.t.head.price': '60 min – 200₾ · 90 min – 250₾',

      'landing.t.faceCompress.tag': '🌼 Thai Herbal Compress Facial',
      'landing.t.faceCompress.title': 'Thai Herbal Compress Facial',
      'landing.t.faceCompress.desc':
        'Warm Thai herbal compresses relax the facial muscles and improve circulation. Includes deep facial massage, scalp and upper body.',
      'landing.t.faceCompress.price': '60 min – 150₾',

      'landing.t.faceHotStone.tag': '🔥 Hot Stone Facial',
      'landing.t.faceHotStone.title': 'Hot Stone Facial',
      'landing.t.faceHotStone.desc':
        'Smooth basalt stones glide gently over the face and neck to melt away tension. Includes facial, scalp and neck massage.',
      'landing.t.faceHotStone.price': '60 min – 160₾',

      'landing.t.faceThai.tag': '🌺 Traditional Thai Face Massage',
      'landing.t.faceThai.title': 'Traditional Thai Face Massage',
      'landing.t.faceThai.desc':
        'Gentle massage with energetic acupressure, releasing tension from face, jaw and neck.',
      'landing.t.faceThai.price': '30 min – 90₾ · 60 min – 150₾',

      'landing.t.faceAroma.tag': '🌿 Aromatherapy Facial',
      'landing.t.faceAroma.title': 'Aromatherapy Facial Massage',
      'landing.t.faceAroma.desc':
        'Delicate treatment with pure essential oils, calming the nervous system and giving the skin a healthy glow.',
      'landing.t.faceAroma.price': '30 min – 80₾ · 60 min – 140₾',

      'landing.t.backBasic.tag': '💆‍♂️ Back–Neck–Shoulders',
      'landing.t.backBasic.title': 'Back–Neck–Shoulder Massage',
      'landing.t.backBasic.desc':
        'Focused massage for releasing tension in the main stress areas – ideal for long sitting.',
      'landing.t.backBasic.price': '60 min – 150₾',

      'landing.t.backHotStone.tag': '🔥 Hot Stone Back Massage',
      'landing.t.backHotStone.title': 'Hot Stone Back–Neck–Shoulder Massage',
      'landing.t.backHotStone.desc':
        'Warm basalt stones melt deep tension combined with deep manual massage.',
      'landing.t.backHotStone.price': '60 min – 180₾',

      'landing.t.bodyThai.tag': '🇹🇭 Traditional Thai Massage',
      'landing.t.bodyThai.title': 'Traditional Thai Massage',
      'landing.t.bodyThai.desc':
        'Ancient treatment without oil combining acupressure, stretches and work along energy lines.',
      'landing.t.bodyThai.price': '60 min – 170₾ · 90 min – 220₾',

      'landing.t.bodyThaiOil.tag': '🇹🇭 Thai Oil Massage',
      'landing.t.bodyThaiOil.title': 'Thai Oil Massage',
      'landing.t.bodyThaiOil.desc':
        'Full body massage with warm oil in flowing deep strokes to release muscular load.',
      'landing.t.bodyThaiOil.price': '60 min – 180₾ · 90 min – 230₾',

      'landing.t.bodyAroma.tag': '🌿 Aromatherapy Oil Massage',
      'landing.t.bodyAroma.title': 'Aromatherapy Oil Massage',
      'landing.t.bodyAroma.desc':
        'Pure essential oils combined with a soothing full-body massage.',
      'landing.t.bodyAroma.price': '60 min – 190₾',

      'landing.t.bodyThaiTher.tag': '🇹🇭 Thai Therapeutic Massage',
      'landing.t.bodyThaiTher.title': 'Thai Therapeutic Massage',
      'landing.t.bodyThaiTher.desc':
        'Deep therapeutic massage with focused pressure and precise stretches – ideal for back and neck pain.',
      'landing.t.bodyThaiTher.price': '60 min – 230₾ · 90 min – 280₾',

      'landing.t.bodyHotStone.tag': '🔥 Hot Stone Massage',
      'landing.t.bodyHotStone.title': 'Full Body Hot Stone Massage',
      'landing.t.bodyHotStone.desc':
        'Warm basalt stones glide across the body, melting deep tension and improving circulation.',
      'landing.t.bodyHotStone.price': '60 min – 210₾',

      'landing.t.bodyThaiComp.tag': '🌼 Thai Herbal Compress Massage',
      'landing.t.bodyThaiComp.title': 'Thai Herbal Compress Body Massage',
      'landing.t.bodyThaiComp.desc':
        'Warm Thai herbal pouches provide natural relief, drainage and pain reduction.',
      'landing.t.bodyThaiComp.price': '60 min – 220₾ · 90 min – 260₾',

      'landing.t.bodyShiatsu.tag': '🇯🇵 Shiatsu Massage',
      'landing.t.bodyShiatsu.title': 'Japanese Shiatsu Massage',
      'landing.t.bodyShiatsu.desc':
        'Oil-free massage with pressure along meridians – balancing inner energy and calming the mind.',
      'landing.t.bodyShiatsu.price': '60 min – 180₾ · 90 min – 230₾',

      'landing.t.foot.tag': '🦶 Thai Foot Massage',
      'landing.t.foot.title': 'Thai Foot Reflexology Massage',
      'landing.t.foot.desc':
        'Deep yet gentle work on the feet with reflexology points that balance internal systems.',
      'landing.t.foot.price': '30 min – 80₾ · 60 min – 120₾',

      'landing.t.bookBtn': 'Book this treatment',

      'landing.booking.title': 'Book a Treatment',
      'landing.booking.summaryPlaceholder':
        'Please choose a treatment from the list and then fill your details and preferred date.',
      'landing.booking.name': 'Full name',
      'landing.booking.phone': 'Phone / WhatsApp',
      'landing.booking.date': 'Treatment date',
      'landing.booking.time': 'Treatment time',
      'landing.booking.timePlaceholder': 'Select time',
      'landing.booking.duration': 'Duration',
      'landing.booking.notes': 'Preferences / notes (optional)',
      'landing.booking.note':
        'Payment is processed via secure Stripe card payment. Booking confirmation will be sent automatically.',
      'landing.booking.payCta': 'Proceed to secure payment',

      'landing.booking.summary': (name, mins, price) =>
        `Selected: ${name} · ${mins} min · ${price}₾`,

      'card.meta.title': 'Bereshit Spa – 7-Treatment Card',
      'card.hero.eyebrow': 'Special Offer · Limited Slots',
      'card.hero.title': '7-Treatment Spa Card',
      'card.hero.subtitle':
        'Pay once, enjoy 7 visits at Bereshit Spa. You can mix different treatments and share with family or friends.',
      'card.hero.cta': 'Buy the card now',

      'card.details.title': 'What is included?',
      'card.details.li1': '7 treatments of your choice from the full menu.',
      'card.details.li2': 'Can be shared between partners, family or friends.',
      'card.details.li3': 'Validity – 6 months from purchase date.',
      'card.details.li4': 'Appointment booking via WhatsApp or phone.',
      'card.details.priceText': 'Card price: 7 treatments – 1,200₾ (instead of 1,400₾).',
      'card.details.note':
        'After payment, you will receive a confirmation by email/WhatsApp, and the card will be registered under your name.',

      'card.form.title': 'Buy a Treatment Card',
      'card.form.summary':
        'Please fill your details and preferred start date and we will reserve the card for you.',
      'card.form.name': 'Full name',
      'card.form.phone': 'Phone / WhatsApp',
      'card.form.startDate': 'Preferred start date (optional)',
      'card.form.notes': 'Notes / additional names on the card',
      'card.form.note': 'Payment is processed via secure Stripe card payment.',
      'card.form.payCta': 'Proceed to secure payment',

      'common.error.generic': 'An error occurred. Please try again or contact the spa.',
      'common.error.missingTreatment': 'Could not find the selected treatment. Please refresh the page.',
      'common.error.requiredFields': 'Please fill all required fields (name, phone, date and time).'
    },

    // -------- רוסית --------
    ru: {
      'landing.meta.title': 'Bereshit Spa – бронирование процедур',
      'landing.hero.eyebrow': 'Японский Head Spa и тайский массаж – Батуми',
      'landing.hero.title': 'Японский Head Spa и тайские массажи тела',
      'landing.hero.subtitle':
        'Выберите процедуру, время и оплатите картой через безопасную систему – всё на одной странице.',
      'landing.hero.cta': 'Выбрать процедуру и забронировать',

      'landing.treatments.title': 'Выберите процедуру',
      'landing.treatments.subtitle':
        'Все процедуры выполняются профессиональными мастерами из Таиланда, в спокойной атмосфере и под расслабляющую музыку.',

      'landing.dur.30': '30 мин',
      'landing.dur.60': '60 мин',
      'landing.dur.90': '90 мин',

      'landing.t.head.tag': '👑 Japanese Head Spa',
      'landing.t.head.title': 'Фирменная процедура – японский Head Spa',
      'landing.t.head.desc':
        'Традиционный японский ритуал: очищение, массаж кожи головы, маски и тёплая водная релаксация. Включает мытьё, тёплое полотенце, сыворотку для кожи головы и полную сушку волос.',
      'landing.t.head.price': '60 мин – 200₾ · 90 мин – 250₾',

      'landing.t.faceCompress.tag': '🌼 Thai Herbal Compress Facial',
      'landing.t.faceCompress.title': 'Тайский травяной компресс для лица',
      'landing.t.faceCompress.desc':
        'Тёплые травяные компрессы расслабляют мышцы лица и улучшают кровообращение. Включает глубокий массаж лица, кожи головы и верхней части тела.',
      'landing.t.faceCompress.price': '60 мин – 150₾',

      'landing.t.faceHotStone.tag': '🔥 Hot Stone Facial',
      'landing.t.faceHotStone.title': 'Массаж лица горячими камнями',
      'landing.t.faceHotStone.desc':
        'Гладкие горячие камни мягко движутся по лицу и шее, снимая напряжение. Включает массаж лица, головы и шеи.',
      'landing.t.faceHotStone.price': '60 мин – 160₾',

      'landing.t.faceThai.tag': '🌺 Traditional Thai Face Massage',
      'landing.t.faceThai.title': 'Традиционный тайский массаж лица',
      'landing.t.faceThai.desc':
        'Мягкий массаж с точечными нажатиями, снимает напряжение с лица, челюсти и шеи.',
      'landing.t.faceThai.price': '30 мин – 90₾ · 60 мин – 150₾',

      'landing.t.faceAroma.tag': '🌿 Aromatherapy Facial',
      'landing.t.faceAroma.title': 'Арома-массаж лица',
      'landing.t.faceAroma.desc':
        'Нежная процедура с эфирными маслами, успокаивает нервную систему и придаёт коже сияние.',
      'landing.t.faceAroma.price': '30 мин – 80₾ · 60 мин – 140₾',

      'landing.t.backBasic.tag': '💆‍♂️ Back–Neck–Shoulders',
      'landing.t.backBasic.title': 'Массаж спины, шеи и плеч',
      'landing.t.backBasic.desc':
        'Целенаправленный массаж для снятия напряжения в основных зонах нагрузки – идеально при сидячей работе.',
      'landing.t.backBasic.price': '60 мин – 150₾',

      'landing.t.backHotStone.tag': '🔥 Hot Stone Back Massage',
      'landing.t.backHotStone.title': 'Массаж спины с горячими камнями',
      'landing.t.backHotStone.desc':
        'Горячие базальтовые камни прорабатывают глубокие слои мышц, в сочетании с ручным массажем.',
      'landing.t.backHotStone.price': '60 мин – 180₾',

      'landing.t.bodyThai.tag': '🇹🇭 Traditional Thai Massage',
      'landing.t.bodyThai.title': 'Традиционный тайский массаж',
      'landing.t.bodyThai.desc':
        'Древняя техника без масла: надавливания, растяжки и работа по энергетическим линиям.',
      'landing.t.bodyThai.price': '60 мин – 170₾ · 90 мин – 220₾',

      'landing.t.bodyThaiOil.tag': '🇹🇭 Thai Oil Massage',
      'landing.t.bodyThaiOil.title': 'Тайский масляный массаж',
      'landing.t.bodyThaiOil.desc':
        'Массаж всего тела тёплым маслом с глубокими и плавными движениями для снятия мышечного напряжения.',
      'landing.t.bodyThaiOil.price': '60 мин – 180₾ · 90 мин – 230₾',

      'landing.t.bodyAroma.tag': '🌿 Aromatherapy Oil Massage',
      'landing.t.bodyAroma.title': 'Арома-массаж всего тела',
      'landing.t.bodyAroma.desc':
        'Эфирные масла в сочетании с расслабляющим массажем всего тела.',
      'landing.t.bodyAroma.price': '60 мин – 190₾',

      'landing.t.bodyThaiTher.tag': '🇹🇭 Thai Therapeutic Massage',
      'landing.t.bodyThaiTher.title': 'Тайский лечебный массаж',
      'landing.t.bodyThaiTher.desc':
        'Глубокий лечебный массаж с точечными нажатиями и растяжками – подходит при болях в спине и шее.',
      'landing.t.bodyThaiTher.price': '60 мин – 230₾ · 90 мин – 280₾',

      'landing.t.bodyHotStone.tag': '🔥 Hot Stone Massage',
      'landing.t.bodyHotStone.title': 'Массаж горячими камнями – всё тело',
      'landing.t.bodyHotStone.desc':
        'Горячие базальтовые камни скользят по телу, расслабляя мышцы и улучшая кровообращение.',
      'landing.t.bodyHotStone.price': '60 мин – 210₾',

      'landing.t.bodyThaiComp.tag': '🌼 Thai Herbal Compress Massage',
      'landing.t.bodyThaiComp.title': 'Массаж тела с тайскими травяными компрессами',
      'landing.t.bodyThaiComp.desc':
        'Тёплые травяные мешочки дают естественный лечебный эффект, дренаж и снятие боли.',
      'landing.t.bodyThaiComp.price': '60 мин – 220₾ · 90 мин – 260₾',

      'landing.t.bodyShiatsu.tag': '🇯🇵 Shiatsu Massage',
      'landing.t.bodyShiatsu.title': 'Японский массаж шиацу',
      'landing.t.bodyShiatsu.desc':
        'Массаж без масла с надавливаниями по меридианам – балансирует энергию и успокаивает.',
      'landing.t.bodyShiatsu.price': '60 мин – 180₾ · 90 мин – 230₾',

      'landing.t.foot.tag': '🦶 Thai Foot Massage',
      'landing.t.foot.title': 'Тайский массаж стоп (рефлексология)',
      'landing.t.foot.desc':
        'Глубокий, но мягкий массаж стоп с рефлексологическими точками, который гармонизирует работу органов.',
      'landing.t.foot.price': '30 мин – 80₾ · 60 мин – 120₾',

      'landing.t.bookBtn': 'Забронировать процедуру',

      'landing.booking.title': 'Бронирование процедуры',
      'landing.booking.summaryPlaceholder':
        'Выберите процедуру на странице, затем заполните контактные данные и дату.',
      'landing.booking.name': 'Полное имя',
      'landing.booking.phone': 'Телефон / WhatsApp',
      'landing.booking.date': 'Дата процедуры',
      'landing.booking.time': 'Время процедуры',
      'landing.booking.timePlaceholder': 'Выберите время',
      'landing.booking.duration': 'Продолжительность',
      'landing.booking.notes': 'Пожелания / примечания (необязательно)',
      'landing.booking.note':
        'Оплата проводится безопасно через Stripe банковской картой. Подтверждение будет отправлено автоматически.',
      'landing.booking.payCta': 'Перейти к безопасной оплате',

      'landing.booking.summary': (name, mins, price) =>
        `Вы выбрали: ${name} · ${mins} мин · ${price}₾`,

      'card.meta.title': 'Bereshit Spa – абонемент на 7 процедур',
      'card.hero.eyebrow': 'Специальное предложение · Количество мест ограничено',
      'card.hero.title': 'Абонемент на 7 расслабляющих процедур',
      'card.hero.subtitle':
        'Вы платите один раз и получаете 7 посещений Bereshit Spa. Можно комбинировать разные процедуры и делиться с близкими.',
      'card.hero.cta': 'Купить абонемент',

      'card.details.title': 'Что входит в абонемент?',
      'card.details.li1': '7 процедур на выбор из полного меню.',
      'card.details.li2': 'Можно делиться с партнёром, семьёй или друзьями.',
      'card.details.li3': 'Срок действия – 6 месяцев с момента покупки.',
      'card.details.li4': 'Запись по WhatsApp или телефону.',
      'card.details.priceText': 'Цена абонемента: 7 процедур – 1,200₾ (вместо 1,400₾).',
      'card.details.note':
        'После оплаты вы получите подтверждение по email/WhatsApp, а абонемент будет оформлен на ваше имя.',

      'card.form.title': 'Покупка абонемента',
      'card.form.summary':
        'Пожалуйста, заполните контактные данные и желаемую дату начала, и мы активируем абонемент.',
      'card.form.name': 'Полное имя',
      'card.form.phone': 'Телефон / WhatsApp',
      'card.form.startDate': 'Желаемая дата начала (необязательно)',
      'card.form.notes': 'Примечания / дополнительные имена в абонементе',
      'card.form.note': 'Оплата проводится безопасно через Stripe банковской картой.',
      'card.form.payCta': 'Перейти к безопасной оплате',

      'common.error.generic': 'Произошла ошибка. Пожалуйста, попробуйте ещё раз или свяжитесь со спа.',
      'common.error.missingTreatment': 'Не удалось найти выбранную процедуру. Обновите страницу.',
      'common.error.requiredFields':
        'Пожалуйста, заполните все обязательные поля (имя, телефон, дата и время).'
    },

    // -------- גאורגית --------
    ka: {
      'landing.meta.title': 'Bereshit Spa – პროცედურის დაჯავშნა',
      'landing.hero.eyebrow': 'იაპონური Head Spa და თაილანდური მასაჟი – ბათუმი',
      'landing.hero.title': 'იაპონური Head Spa და თაილანდური ტანის მასაჟები',
      'landing.hero.subtitle':
        'აირჩიეთ პროცედურა, სასურველი დრო და გადაიხადეთ ბარათით უსაფრთხოდ – ყველაფერი ერთი გვერდიდან.',
      'landing.hero.cta': 'აირჩიეთ პროცედურა და დაჯავშნეთ',

      'landing.treatments.title': 'აირჩიეთ პროცედურა',
      'landing.treatments.subtitle':
        'ყველა პროცედურას ასრულებენ პროფესიონალი თაილანდელი სპეციალისტები, მშვიდ გარემოში და დასასვენებელი მუსიკით.',

      'landing.dur.30': '30 წთ',
      'landing.dur.60': '60 წთ',
      'landing.dur.90': '90 წთ',

      'landing.t.head.tag': '👑 Japanese Head Spa',
      'landing.t.head.title': 'სიგნატურული პროცედურა – იაპონური Head Spa',
      'landing.t.head.desc':
        'ტრადიციული იაპონური რიტუალი: წმენდა, თავის კანის მასაჟი, ნიღბები და თბილი წყლის რელაქსი. შედის: დაბანა, ცხელი პირსახოცი, სერუმი თავის კანისთვის და თმის სრულად გაშრობა.',
      'landing.t.head.price': '60 წთ – 200₾ · 90 წთ – 250₾',

      'landing.t.faceCompress.tag': '🌼 Thai Herbal Compress Facial',
      'landing.t.faceCompress.title': 'სახის მასაჟი ტაილანდური კომპრესებით',
      'landing.t.faceCompress.desc':
        'თბილი ბალახის კომპრესები ამშვიდებს სახის კუნთებს და აუმჯობესებს სისხლის მიმოქცევას. შედის ღრმა სახის მასაჟი, თავის კანი და ზედა სხეულის ნაწილი.',
      'landing.t.faceCompress.price': '60 წთ – 150₾',

      'landing.t.faceHotStone.tag': '🔥 Hot Stone Facial',
      'landing.t.faceHotStone.title': 'სახის მასაჟი ცხელი ქვებით',
      'landing.t.faceHotStone.desc':
        'გლუვი ცხელი ქვები ნაზად სრიალებს სახეზე და კისერზე, ხსნის დაძაბულობას. შედის სახის, თავისა და კისრის მასაჟი.',
      'landing.t.faceHotStone.price': '60 წთ – 160₾',

      'landing.t.faceThai.tag': '🌺 Traditional Thai Face Massage',
      'landing.t.faceThai.title': 'ტრადიციული თაილანდური სახის მასაჟი',
      'landing.t.faceThai.desc':
        'ნაზი მასაჟი წერტილოვანი დაჭერებით, ხსნის დაძაბულობას სახიდან, ყბიდან და კისრიდან.',
      'landing.t.faceThai.price': '30 წთ – 90₾ · 60 წთ – 150₾',

      'landing.t.faceAroma.tag': '🌿 Aromatherapy Facial',
      'landing.t.faceAroma.title': 'არომათერაპიული სახის მასაჟი',
      'landing.t.faceAroma.desc':
        'ნაზი პროცედურა ეთერზეთებით, ამშვიდებს ნერვულ სისტემას და ანიჭებს კანს ნათებას.',
      'landing.t.faceAroma.price': '30 წთ – 80₾ · 60 წთ – 140₾',

      'landing.t.backBasic.tag': '💆‍♂️ Back–Neck–Shoulders',
      'landing.t.backBasic.title': 'ზურგის, კისრისა და მხრების მასაჟი',
      'landing.t.backBasic.desc':
        'ფოკუსირებული მასაჟი ძირითადი დატვირთვის ზონებისთვის – იდეალურია ხანგრძლივი ჯდომისას.',
      'landing.t.backBasic.price': '60 წთ – 150₾',

      'landing.t.backHotStone.tag': '🔥 Hot Stone Back Massage',
      'landing.t.backHotStone.title': 'ზურგის მასაჟი ცხელი ქვებით',
      'landing.t.backHotStone.desc':
        'ცხელი ბაზალტის ქვები ღრმად ამუშავებს კუნთებს, ხელით ღრმა მასაჟთან ერთად.',
      'landing.t.backHotStone.price': '60 წთ – 180₾',

      'landing.t.bodyThai.tag': '🇹🇭 Traditional Thai Massage',
      'landing.t.bodyThai.title': 'ტრადიციული თაილანდური მასაჟი',
      'landing.t.bodyThai.desc':
        'ძველი ტექნიკა ზეთის გარეშე: წერტილოვანი დაჭერები, გაჭიმვები და მუშაობა ენერგიის ხაზებზე.',
      'landing.t.bodyThai.price': '60 წთ – 170₾ · 90 წთ – 220₾',

      'landing.t.bodyThaiOil.tag': '🇹🇭 Thai Oil Massage',
      'landing.t.bodyThaiOil.title': 'თაილანდური ზეთის მასაჟი',
      'landing.t.bodyThaiOil.desc':
        'სრული ტანის მასაჟი თბილი ზეთით, ღრმა და დინამიური მოძრაობებით, კუნთების დაძაბულობის მოსახსნელად.',
      'landing.t.bodyThaiOil.price': '60 წთ – 180₾ · 90 წთ – 230₾',

      'landing.t.bodyAroma.tag': '🌿 Aromatherapy Oil Massage',
      'landing.t.bodyAroma.title': 'არომათერაპიული ზეთის მასაჟი',
      'landing.t.bodyAroma.desc':
        'ეთერზეთები კომბინაციაში სხეულის დამამშვიდებელ მასაჟთან.',
      'landing.t.bodyAroma.price': '60 წთ – 190₾',

      'landing.t.bodyThaiTher.tag': '🇹🇭 Thai Therapeutic Massage',
      'landing.t.bodyThaiTher.title': 'თაილანდური თერაპიული მასაჟი',
      'landing.t.bodyThaiTher.desc':
        'ღრმა თერაპიული მასაჟი ფოკუსირებული წერტილებით და ზუსტი გაჭიმვებით – შესაფერისი ზურგისა და კისრის ტკივილისთვის.',
      'landing.t.bodyThaiTher.price': '60 წთ – 230₾ · 90 წთ – 280₾',

      'landing.t.bodyHotStone.tag': '🔥 Hot Stone Massage',
      'landing.t.bodyHotStone.title': 'სრული ტანის მასაჟი ცხელი ქვებით',
      'landing.t.bodyHotStone.desc':
        'ცხელი ბაზალტის ქვები სრიალებენ მთელ სხეულზე, ხსნიან ღრმა დაძაბულობას და აუმჯობესებენ სისხლის მიმოქცევას.',
      'landing.t.bodyHotStone.price': '60 წთ – 210₾',

      'landing.t.bodyThaiComp.tag': '🌼 Thai Herbal Compress Massage',
      'landing.t.bodyThaiComp.title': 'ტანის მასაჟი თაილანდური ბალახის კომპრესებით',
      'landing.t.bodyThaiComp.desc':
        'თბილი ბალახის შეკვრები უზრუნველყოფენ ბუნებრივ გამოჯანმრთელებას, დრეინაჟს და ტკივილის შემცირებას.',
      'landing.t.bodyThaiComp.price': '60 წთ – 220₾ · 90 წთ – 260₾',

      'landing.t.bodyShiatsu.tag': '🇯🇵 Shiatsu Massage',
      'landing.t.bodyShiatsu.title': 'იაპონური შიაცუს მასაჟი',
      'landing.t.bodyShiatsu.desc':
        'მასაჟი ზეთის გარეშე, წერტილოვანი დაჭერებით მერიedianებზე – აბალანსებს ენერგიას და ამშვიდებს გონებას.',
      'landing.t.bodyShiatsu.price': '60 წთ – 180₾ · 90 წთ – 230₾',

      'landing.t.foot.tag': '🦶 Thai Foot Massage',
      'landing.t.foot.title': 'ტაილანდური ფეხის (რეფლექსოლოგიური) მასაჟი',
      'landing.t.foot.desc':
        'ღრმა, მაგრამ ნაზი მასაჟი ტერფებზე, რეფლექსოლოგიური წერტილებით, რომელიც ბალანსირებს შინაგან სისტემებს.',
      'landing.t.foot.price': '30 წთ – 80₾ · 60 წთ – 120₾',

      'landing.t.bookBtn': 'დაჯავშნა',

      'landing.booking.title': 'პროცედურის დაჯავშნა',
      'landing.booking.summaryPlaceholder':
        'აირჩიეთ პროცედურა და შემდეგ შეავსეთ თქვენი მონაცემები და სასურველი თარიღი.',
      'landing.booking.name': 'სრული სახელი',
      'landing.booking.phone': 'ტელეფონი / WhatsApp',
      'landing.booking.date': 'პროცედურის თარიღი',
      'landing.booking.time': 'დაწყების დრო',
      'landing.booking.timePlaceholder': 'აირჩიეთ დრო',
      'landing.booking.duration': 'ხანგრძლივობა',
      'landing.booking.notes': 'სურვილები / შენიშვნები (არასავალდებულო)',
      'landing.booking.note':
        'გადახდა ხორციელდება უსაფრთხოდ Stripe-ის ბარათის სისტემით. დაჯავშნის დადასტურება მოგივათ ავტომატურად.',
      'landing.booking.payCta': 'გადასვლა უსაფრთხო გადახდაზე',

      'landing.booking.summary': (name, mins, price) =>
        `არჩეული პროცედურა: ${name} · ${mins} წთ · ${price}₾`,

      'card.meta.title': 'Bereshit Spa – 7 პროცედურის აბონემენტი',
      'card.hero.eyebrow': 'სპეციალური შეთავაზება · შეზღუდული რაოდენობა',
      'card.hero.title': '7-პროცედურული სპა-აბონემენტი',
      'card.hero.subtitle':
        'ერთჯერადი გადახდა – 7 ვიზიტი Bereshit Spa-ში. შეგიძლიათ შეურჩიოთ სხვადასხვა პროცედურები და გაუზიაროთ ახლობლებს.',
      'card.hero.cta': 'აბონემენტის ყიდვა',

      'card.details.title': 'რა შედის აბონემენტში?',
      'card.details.li1': '7 პროცედურა თქვენი არჩევით სრული მენიუდან.',
      'card.details.li2': 'შეგიძლიათ გაუზიაროთ პარტნიორს, ოჯახს ან მეგობრებს.',
      'card.details.li3': 'ვადიანობა – 6 თვე შეძენის დღიდან.',
      'card.details.li4': 'დაჯავშნა WhatsApp-ით ან ტელეფონით.',
      'card.details.priceText': 'აბონემენტის ფასი: 7 პროცედურა – 1,200₾ (ნაცვლად 1,400₾).',
      'card.details.note':
        'გადახდის შემდეგ მიიღებთ დადასტურებას email-ით/WhatsApp–ით, ხოლო აბონემენტი დარეგისტრირდება თქვენს სახელზე.',

      'card.form.title': 'აბონემენტის შეძენა',
      'card.form.summary':
        'გთხოვთ შეავსოთ საკონტაქტო მონაცემები და სასურველი დაწყების თარიღი – ჩვენ ჩავწერთ აბონემენტს თქვენზე.',
      'card.form.name': 'სრული სახელი',
      'card.form.phone': 'ტელეფონი / WhatsApp',
      'card.form.startDate': 'სასურველი დაწყების თარიღი (არასავალდებულო)',
      'card.form.notes': 'შენიშვნები / დამატებითი სახელები აბონემენტზე',
      'card.form.note': 'გადახდა ხორციელდება უსაფრთხოდ Stripe-ის ბარათით.',
      'card.form.payCta': 'გადასვლა უსაფრთხო გადახდაზე',

      'common.error.generic': 'შეცდომა მოხდა. გთხოვთ სცადოთ თავიდან ან დაუკავშირდეთ სპა-ს.',
      'common.error.missingTreatment':
        'არჩეული პროცედურა ვერ მოიძებნა. გთხოვთ განაახლოთ გვერდი.',
      'common.error.requiredFields':
        'გთხოვთ შეავსოთ ყველა სავალდებულო ველი (სახელი, ტელეფონი, თარიღი და დრო).'
    }
  };

  function t(key) {
    const lang = currentLang;
    const dict = STRINGS[lang] || STRINGS.he;
    let val = dict[key] || STRINGS.he[key];
    return val;
  }

  // מפעיל i18n לכל data-i18n
  function applyI18n() {
    document.title = t('landing.meta.title') || document.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (!val) return;

      // פונקציות (summary) לא משויכות ישירות כאן – נטפל בהן דינמית
      if (typeof val === 'function') return;

      el.textContent = val;
    });

    // כותרת לדף כרטיסייה אם אנחנו עליו
    if (document.getElementById('cardBookingForm')) {
      const metaTitle = t('card.meta.title');
      if (metaTitle) document.title = metaTitle;
    }
  }

  applyI18n();

  // -----------------------
  // מיפוי טיפולים + מחירים + Price IDs (למילוי ידני בהמשך)
  // -----------------------
  const TREATMENTS = {
    // key תואם ל-data-treatment-key
    'head-spa': {
      nameKey: 'landing.t.head.title',
      basePrices: { 60: 200, 90: 250 },
      stripePrices: {
        // מלא כאן את ה-Price IDs האמיתיים שלך אם תרצה:
        // 60: 'price_XXXX_HeadSpa60',
        // 90: 'price_XXXX_HeadSpa90'
      }
    },
    'facial-thai-compress': {
      nameKey: 'landing.t.faceCompress.title',
      basePrices: { 60: 150 },
      stripePrices: {
        // 60: 'price_XXXX_FaceCompress60'
      }
    },
    'facial-hot-stone': {
      nameKey: 'landing.t.faceHotStone.title',
      basePrices: { 60: 160 },
      stripePrices: {}
    },
    'facial-thai': {
      nameKey: 'landing.t.faceThai.title',
      basePrices: { 30: 90, 60: 150 },
      stripePrices: {}
    },
    'facial-aroma': {
      nameKey: 'landing.t.faceAroma.title',
      basePrices: { 30: 80, 60: 140 },
      stripePrices: {}
    },
    'back-basic': {
      nameKey: 'landing.t.backBasic.title',
      basePrices: { 60: 150 },
      stripePrices: {}
    },
    'back-hot-stone': {
      nameKey: 'landing.t.backHotStone.title',
      basePrices: { 60: 180 },
      stripePrices: {}
    },
    'body-thai': {
      nameKey: 'landing.t.bodyThai.title',
      basePrices: { 60: 170, 90: 220 },
      stripePrices: {}
    },
    'body-thai-oil': {
      nameKey: 'landing.t.bodyThaiOil.title',
      basePrices: { 60: 180, 90: 230 },
      stripePrices: {}
    },
    'body-aroma': {
      nameKey: 'landing.t.bodyAroma.title',
      basePrices: { 60: 190 },
      stripePrices: {}
    },
    'body-thai-ther': {
      nameKey: 'landing.t.bodyThaiTher.title',
      basePrices: { 60: 230, 90: 280 },
      stripePrices: {}
    },
    'body-hot-stone': {
      nameKey: 'landing.t.bodyHotStone.title',
      basePrices: { 60: 210 },
      stripePrices: {}
    },
    'body-thai-comp': {
      nameKey: 'landing.t.bodyThaiComp.title',
      basePrices: { 60: 220, 90: 260 },
      stripePrices: {}
    },
    'body-shiatsu': {
      nameKey: 'landing.t.bodyShiatsu.title',
      basePrices: { 60: 180, 90: 230 },
      stripePrices: {}
    },
    'foot-massage': {
      nameKey: 'landing.t.foot.title',
      basePrices: { 30: 80, 60: 120 },
      stripePrices: {}
    }
  };

  // כרטיסיית 7 טיפולים – מיפוי
  const CARD_OFFERS = {
    card7: {
      nameKey: 'card.hero.title',
      price: 1200,
      stripePriceId: '' // כאן תוכל לשים price_XXXX לכרטיסייה
    }
  };

  // מיידע את הטקסט של מחיר הכרטיסייה אם אנחנו בדף שלה
  (function initCardPriceText() {
    const el = $('#cardPriceText');
    if (!el) return;
    const offer = CARD_OFFERS.card7;
    if (!offer) return;
    // כבר כתבנו טקסט ב-i18n, אבל אם תרצה חישוב דינמי אפשר להשתמש ב-offer.price
    const txt = t('card.details.priceText') || `7 treatments card – ${offer.price}₾`;
    el.textContent = txt;
  })();

  // -----------------------
  // לוגיקת מודאל טיפולים
  // -----------------------
  const bookingModal = $('#bookingModal');
  const bookingForm = $('#bookingForm');
  const bookingSummary = $('#bookingSummary');
  const bookingDurations = $('#bookingDurations');

  let currentBooking = null;

  function openBookingModal(treatmentKey, durationMinutes) {
    const cfg = TREATMENTS[treatmentKey];
    if (!cfg) {
      alert(t('common.error.missingTreatment'));
      return;
    }

    const mins = Number(durationMinutes) || Number(Object.keys(cfg.basePrices)[0]);
    const price = cfg.basePrices[mins];
    const name = typeof t(cfg.nameKey) === 'function' ? t(cfg.nameKey)() : t(cfg.nameKey) || '';

    currentBooking = {
      treatmentKey,
      mins,
      price,
      name,
      // נשמור גם priceId אם תרצה להשתמש בו בעתיד
      priceId: cfg.stripePrices && cfg.stripePrices[mins] ? cfg.stripePrices[mins] : ''
    };

    // סיכום במודאל
    const summaryFn = t('landing.booking.summary');
    if (typeof summaryFn === 'function') {
      bookingSummary.textContent = summaryFn(currentBooking.name, currentBooking.mins, currentBooking.price);
    } else {
      bookingSummary.textContent = `${currentBooking.name} · ${currentBooking.mins} · ${currentBooking.price}₾`;
    }

    // יצירת כפתורי משך בתוך המודאל
    if (bookingDurations) {
      bookingDurations.innerHTML = '';
      Object.keys(cfg.basePrices).forEach(mStr => {
        const m = Number(mStr);
        const lbl = document.createElement('label');
        lbl.className = 'booking-duration-pill';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'bookingDuration';
        input.value = String(m);
        if (m === mins) input.checked = true;

        const span = document.createElement('span');
        let durKey;
        if (m === 30) durKey = 'landing.dur.30';
        else if (m === 60) durKey = 'landing.dur.60';
        else if (m === 90) durKey = 'landing.dur.90';
        span.textContent = t(durKey) || `${m} min`;

        lbl.appendChild(input);
        lbl.appendChild(span);
        bookingDurations.appendChild(lbl);

        input.addEventListener('change', () => {
          currentBooking.mins = m;
          currentBooking.price = cfg.basePrices[m];
          currentBooking.priceId = cfg.stripePrices && cfg.stripePrices[m] ? cfg.stripePrices[m] : '';
          const sFn = t('landing.booking.summary');
          if (typeof sFn === 'function') {
            bookingSummary.textContent = sFn(currentBooking.name, currentBooking.mins, currentBooking.price);
          }
        });
      });
    }

    if (bookingModal) {
      bookingModal.classList.remove('hidden');
      bookingModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('hidden');
    bookingModal.setAttribute('aria-hidden', 'true');
  }

  // קליקים על כפתורי "להזמנת הטיפול"
  $$('[data-book-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.treatmentKey;
      const group = btn.dataset.radioGroup;
      let mins = null;
      if (group) {
        const checked = document.querySelector(`input[name="${group}"]:checked`);
        if (checked) mins = Number(checked.value);
      }
      openBookingModal(key, mins);
    });
  });

  // כפתורי סגירה של המודאל
  $$('[data-booking-close]').forEach(btn => {
    btn.addEventListener('click', closeBookingModal);
  });

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // שליחת הטופס לשרת – יצירת Session ל-Stripe
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentBooking) {
        alert(t('common.error.missingTreatment'));
        return;
      }

      const name = bookingForm.elements['name'].value.trim();
      const phone = bookingForm.elements['phone'].value.trim();
      const date = bookingForm.elements['date'].value;
      const time = bookingForm.elements['time'].value;
      const notes = bookingForm.elements['notes'].value.trim();

      if (!name || !phone || !date || !time) {
        alert(t('common.error.requiredFields'));
        return;
      }

      try {
        const payload = {
          treatment: currentBooking.name,
          finalPrice: currentBooking.price,
          name,
          phone,
          date,
          time,
          notes,
          duration: `${currentBooking.mins}`,
          basePrice: currentBooking.price,
          addonPrice: 0,
          // לא חובה, אבל ישלח כמטא–דאטה אם תשנה backend בעתיד
          stripePriceId: currentBooking.priceId || ''
        };

        const res = await fetch('/create-booking-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        const data = await res.json();
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Missing session URL');
        }
      } catch (err) {
        console.error('booking error:', err);
        alert(t('common.error.generic'));
      }
    });
  }

  // -----------------------
  // לוגיקת כרטיסייה – cardBookingModal
  // -----------------------
  const cardModal = $('#cardBookingModal');
  const cardForm = $('#cardBookingForm');
  const cardSummary = $('#cardBookingSummary');

  let currentCard = null;

  function openCardModal(cardKey) {
    const offer = CARD_OFFERS[cardKey];
    if (!offer) {
      alert(t('common.error.generic'));
      return;
    }
    const name = t(offer.nameKey) || '7 Treatments Card';
    currentCard = {
      key: cardKey,
      name,
      price: offer.price,
      priceId: offer.stripePriceId || ''
    };

    if (cardSummary) {
      cardSummary.textContent =
        `${name} – ${offer.price}₾`;
    }

    if (cardModal) {
      cardModal.classList.remove('hidden');
      cardModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCardModal() {
    if (!cardModal) return;
    cardModal.classList.add('hidden');
    cardModal.setAttribute('aria-hidden', 'true');
  }

  $$('[data-card-book-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.cardKey || 'card7';
      openCardModal(key);
    });
  });

  $$('[data-card-booking-close]').forEach(btn => {
    btn.addEventListener('click', closeCardModal);
  });

  if (cardModal) {
    cardModal.addEventListener('click', (e) => {
      if (e.target === cardModal) closeCardModal();
    });
  }

  if (cardForm) {
    cardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const offer = currentCard || CARD_OFFERS.card7;
      if (!offer) {
        alert(t('common.error.generic'));
        return;
      }

      const name = cardForm.elements['name'].value.trim();
      const phone = cardForm.elements['phone'].value.trim();
      const date = cardForm.elements['date'].value;
      const notes = cardForm.elements['notes'].value.trim();

      if (!name || !phone) {
        alert(t('common.error.requiredFields'));
        return;
      }

      try {
        const payload = {
          treatment: offer.name || t(offer.nameKey),
          finalPrice: offer.price,
          name,
          phone,
          date,
          time: '', // לכרטיסייה אין שעה ספציפית
          notes,
          duration: '',
          basePrice: offer.price,
          addonPrice: 0,
          stripePriceId: offer.priceId || '',
          type: 'card7'
        };

        const res = await fetch('/create-booking-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Missing session URL');
        }
      } catch (err) {
        console.error('card booking error:', err);
        alert(t('common.error.generic'));
      }
    });
  }
})();
