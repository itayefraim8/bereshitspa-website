// script.js — כולל תשלום בכרטיס אשראי (Stripe Checkout) + i18n הודעות ללא מחיקת קוד קיים
(function () {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const toILS = (n) => `₾${Number(n).toFixed(0)}`;

  // ==== i18n helpers (ללא תלות ב-index.html) ====
  const getLang = () => (localStorage.getItem('site_lang') || (navigator.language||'he').slice(0,2)).replace(/[^a-z]/gi,'');
  const LOCAL_STRINGS = {
    
    he: {
      'cart.empty':'העגלה ריקה.',
      'wa.greeting':'שלום, אני מעוניין/ת לבצע הזמנה:',
      'wa.total':'סה״כ:',
      'stripe.no_mapped':'לא נמצאו מוצרים במיפוי לתשלום. אנא עדכן/י את המיפוי או הסיר/י פריטים שאינם נתמכים.',
      'stripe.mapping_warn_head':'שימו לב: יש פריטים שאינם מוגדרים לתשלום בכרטיס:',
      'stripe.mapping_warn_cta':'להמשיך לשלם עבור הפריטים הנתמכים בלבד?',
      'stripe.session_missing_url':'נוצרה Session אך לא התקבלה כתובת תשלום.',
      'stripe.error_prefix':'שגיאה ביצירת תשלום: ',
      'contact.sent':'הטופס נשלח בהצלחה!',
      'contact.mail_subject':'פנייה מאתר ברגמוט',
      'video.load_error':'לא ניתן לטעון את הווידאו. בדקו את הנתיב וה־HTTPS/Content-Type.',
      'slider.dot_aria':'שקופית',
      'cart.empty.alert':'העגלה ריקה.',

      /* Why Us */
      'why.title':'למה לבחור דווקא בנו',

      'why.point1.title':'טיפול אמיתי מהלב',
      'why.point1.text':'מטפלות ומטפלים תאילנדים מקצועיים.\nהתאמה אישית לכל לקוח – כי כל גוף הוא אחר.\nאווירה רגועה וחמימה שעוטפת מהרגע הראשון.\nתוצאות שמרגישים מיד – בגוף ובראש.',

      'why.point2.title':'לא עוד “טיפול” – חוויה מלאה',
      'why.point2.text':'שילוב של טכניקות יפניות ותאילנדיות ברמה גבוהה.\nשירות אישי, רגיש ומקצועי לכל אורך הדרך.\nמרחב שמאפשר לנשום, להרפות ולהרגיש נעים.\nרגע של שקט אמיתי בתוך היום.',

      'why.point3.title':'צוות מנוסה ומוסמך',
      'why.point3.text':'ניסיון רב במגע טיפולי.\nעבודה מדויקת שמבינה עומס וכאבים באמת.\nסטנדרט נקי ומוקפד ללא פשרות.\nתוצאות שמורגשות ולא רק “נחמד”.',

      'why.point4.title':'מגע שהוא ריפוי',
      'why.point4.text':'מגע מדויק ולא חזק סתם.\nהתאמה למה שהגוף באמת צריך היום.\nשילוב בין מסורת עתיקה לגישות מודרניות.\nתחושת קלילות שמלווה אותך שעות אחרי.',

      'why.point5.title':'שקט, ניקיון ופרטיות',
      'why.point5.text':'מרחב נקי ומסודר שמרגיש טוב בעיניים.\nכל תשומת הלב מטפל/ת–לקוח בזמן הטיפול.\nרוגע שלא פוגשים בכל מקום.\nוגם חיוך בסוף – מובטח.',

      'why.point6.title':'טקס של רוגע והתחדשות',
      'why.point6.text':'כל טיפול מרגיש כמו טקס קטן של איזון פנימי.\nשימוש בשמנים איכותיים וקומפרסים תאילנדיים.\nשילוב נעים של ריח, מגע ונשימה.\nחוויה שמחברת אותך לעצמך.',

      'why.point7.title':'אנחנו רואים אותך',
      'why.point7.text':'לא עוד “עוד לקוח” – כל אחד מקבל יחס אישי.\nמטפלים שמקשיבים באמת לצרכים שלך.\nגישה עדינה, מקצועית ומכילה.\nפשוט טיפול שבא ממקום של אכפתיות.',

      'why.point8.title':'הפסקה לנשמה באמצע היום',
      'why.point8.text':'טיפול קצר שמחזיר אנרגיה לשאר היום.\nאווירה שקטה שמנתקת מהעומס.\nהתאוששות מהירה בראש ובגוף.\nרגע קטן שמרגיש כמו חופש גדול.',

      'why.point9.title':'מיקום מושלם בבטומי',
      'why.point9.text':'קרוב, נוח וקל להגיע.\nבלי פקקים, בלי חניה מסובכת.\nמגיעים, נרגעים ויוצאים כמו חדשים.\nפשוט קל ונעים לכל אחד.',

      'why.point10.title':'סטנדרט ספא בינלאומי',
      'why.point10.text':'איכות טיפולים, אווירה ושירות ברמה של ספא מוביל בעולם.\nהתייחסות מדויקת לכל פרט.\nחוויה שמרגישה מושקעת ואמיתית.\nהכול קרוב ונוח – בלי לטוס לשום מקום.',

      'why.point11.title':'נגיעה מהעולם הגדול',
      'why.point11.text':'טכניקות מתאילנד ויפן.\nחום ושירות ברוח ישראלית.\nשילוב שמייצר טיפול ייחודי שאין בשום ספא אחר.\nחוויה שאי אפשר לחקות.',

      'why.point12.title':'ליווי לפני ואחרי הטיפול',
      'why.point12.text':'הסבר מלא לפני הטיפול.\nטיפים לשימור התוצאה לאחריו.\nמענה לכל שאלה גם אחרי הביקור.\nכדי שההשפעה הטובה תישאר איתך לאורך זמן.',

      'why.more':'למידע נוסף',
      'why.cta':'קביעת תור'

    },

    en: {
      'cart.empty':'Your cart is empty.',
      'wa.greeting':'Hello, I would like to place an order:',
      'wa.total':'Total:',
      'stripe.no_mapped':'No mapped items for card payment. Please update the mapping or remove unsupported items.',
      'stripe.mapping_warn_head':'Note: some items are not configured for card payment:',
      'stripe.mapping_warn_cta':'Proceed with supported items only?',
      'stripe.session_missing_url':'Checkout session created but no payment URL was returned.',
      'stripe.error_prefix':'Payment creation error: ',
      'contact.sent':'Form sent successfully!',
      'contact.mail_subject':'Inquiry from Bergamot website',
      'video.load_error':'Unable to load the video. Check the path and HTTPS/Content-Type.',
      'slider.dot_aria':'Slide',
      'cart.empty.alert':'Your cart is empty.',

      /* Why Us – English */
      'why.title':'Why Choose Us',

      'why.point1.title':'Care From the Heart',
      'why.point1.text':'Professional Thai therapists.\nPersonalised treatment for every body.\nA warm, calm atmosphere from the first moment.\nResults you feel immediately – in body and mind.',

      'why.point2.title':'Not Just a “Treatment” – A Full Experience',
      'why.point2.text':'A blend of Japanese and Thai techniques.\nPersonal, attentive and professional service.\nA space that lets you breathe, release and feel good.\nA true moment of peace in the middle of the day.',

      'why.point3.title':'Experienced & Certified Team',
      'why.point3.text':'Extensive therapeutic-touch experience.\nPrecise work that truly understands tension and pain.\nHigh hygiene standards with no compromises.\nResults you can genuinely feel.',

      'why.point4.title':'A Touch That Heals',
      'why.point4.text':'Precise, not forceful, touch.\nAdapted to what your body needs today.\nA blend of ancient tradition and modern methods.\nA feeling of lightness that stays with you.',

      'why.point5.title':'Calm, Clean & Private',
      'why.point5.text':'A tidy, pleasant treatment space.\nFull therapist attention during the session.\nA rare level of quiet and privacy.\nAnd yes — a smile at the end.',

      'why.point6.title':'A Ritual of Relaxation & Renewal',
      'why.point6.text':'Each session feels like a small inner-reset ritual.\nQuality oils and warm Thai herbal compresses.\nA soothing mix of scent, touch and breath.\nAn experience that reconnects you to yourself.',

      'why.point7.title':'We Truly See You',
      'why.point7.text':'No “just another client”.\nReal listening and personalised care.\nGentle, professional and supportive approach.\nA treatment driven by genuine care.',

      'why.point8.title':'A Mid-Day Pause for the Soul',
      'why.point8.text':'A short treatment that restores energy.\nQuiet atmosphere that disconnects from stress.\nFast recovery for body and mind.\nA small moment that feels like a big vacation.',

      'why.point9.title':'Perfect Location in Batumi',
      'why.point9.text':'Easy to reach, easy to return.\nNo traffic, no parking headaches.\nArrive, relax and leave renewed.\nSimply comfortable for everyone.',

      'why.point10.title':'International Spa Standard',
      'why.point10.text':'Treatments, atmosphere and service matching top world-class spas.\nAttention to every detail.\nAn experience that feels premium and authentic.\nAll close to home — no flights needed.',

      'why.point11.title':'A Touch of the World',
      'why.point11.text':'Techniques from Thailand and Japan.\nWarm, welcoming Israeli-style hospitality.\nA unique combination found nowhere else.\nAn experience impossible to imitate.',

      'why.point12.title':'Guidance Before & After Your Treatment',
      'why.point12.text':'Full explanation before the session.\nTips for keeping the results afterwards.\nSupport even after your visit.\nSo the benefits stay with you longer.',

      'why.more':'Learn more',
      'why.cta':'Book an appointment'

    },

    ru: {
      'cart.empty':'Корзина пуста.',
      'wa.greeting':'Здравствуйте! Хочу оформить заказ:',
      'wa.total':'Итого:',
      'stripe.no_mapped':'Нет сопоставленных товаров для оплаты картой. Обновите сопоставление или удалите неподдерживаемые позиции.',
      'stripe.mapping_warn_head':'Внимание: некоторые позиции не настроены для оплаты картой:',
      'stripe.mapping_warn_cta':'Продолжить только с поддерживаемыми товарами?',
      'stripe.session_missing_url':'Сессия создана, но ссылка на оплату не получена.',
      'stripe.error_prefix':'Ошибка при создании оплаты: ',
      'contact.sent':'Форма успешно отправлена!',
      'contact.mail_subject':'Запрос с сайта Bergamot',
      'video.load_error':'Не удалось загрузить видео. Проверьте путь и HTTPS/Content-Type.',
      'slider.dot_aria':'Слайд',
      'cart.empty.alert':'Корзина пуста.',

      /* Why Us – Russian */
      'why.title':'Почему выбирают нас',

      'why.point1.title':'Забота от всего сердца',
      'why.point1.text':'Профессиональные тайские терапевты.\nИндивидуальный подход к каждому телу.\nТёплая и спокойная атмосфера с первой минуты.\nРезультаты ощущаются сразу — в теле и душе.',

      'why.point2.title':'Не просто «процедура» — полноценный опыт',
      'why.point2.text':'Сочетание японских и тайских техник высокого уровня.\nЛичное, внимательное и профессиональное обслуживание.\nПространство, в котором легко расслабиться.\nМомент настоящего покоя среди дня.',

      'why.point3.title':'Опытный и сертифицированный персонал',
      'why.point3.text':'Большой опыт лечебного массажа.\nТочное понимание боли и напряжения.\nВысокие стандарты чистоты и порядка.\nРезультаты, которые действительно чувствуются.',

      'why.point4.title':'Прикосновение, которое исцеляет',
      'why.point4.text':'Точное и мягкое воздействие.\nПодстройка под то, что вашему телу нужно сегодня.\nСлияние древних традиций и современных подходов.\nЧувство лёгкости, сохраняющееся надолго.',

      'why.point5.title':'Тишина, чистота и приватность',
      'why.point5.text':'Чистое, уютное пространство.\nПолное внимание терапевта во время сеанса.\nСпокойствие, которое редко где встретишь.\nИ да — улыбка в конце гарантирована.',

      'why.point6.title':'Ритуал спокойствия и обновления',
      'why.point6.text':'Каждый сеанс — маленький ритуал внутреннего баланса.\nКачественные масла и тёплые тайские компрессы.\nГармония аромата, дыхания и прикосновения.\nОпыт, который возвращает к себе.',

      'why.point7.title':'Мы действительно видим вас',
      'why.point7.text':'Вы — не «очередной клиент».\nНастоящее внимание и индивидуальный подход.\nНежная, профессиональная и заботливая работа.\nПроцедура с искренним участием.',

      'why.point8.title':'Пауза для души среди дня',
      'why.point8.text':'Короткий сеанс, который восстанавливает силы.\nСпокойная атмосфера, отключающая от стресса.\nБыстрое облегчение для тела и ума.\nНебольшой момент, ощущающийся как отпуск.',

      'why.point9.title':'Идеальное расположение в Батуми',
      'why.point9.text':'Легко добраться — легко вернуться.\nБез пробок, без сложной парковки.\nПриходите, расслабьтесь и уходите обновлёнными.\nУдобно и приятно для всех.',

      'why.point10.title':'Международный спа-уровень',
      'why.point10.text':'Качество процедур и сервиса на уровне ведущих мировых спа.\nВнимание к каждой детали.\nОпыт, который ощущается премиальным.\nИ всё это — рядом с домом.',

      'why.point11.title':'Прикосновение мира',
      'why.point11.text':'Техники из Таиланда и Японии.\nТёплый приём в израильском стиле.\nУникальное сочетание, которого нет больше нигде.\nОпыт, который невозможно повторить.',

      'why.point12.title':'Поддержка до и после сеанса',
      'why.point12.text':'Понятное объяснение перед процедурой.\nРекомендации для сохранения результата.\nПоддержка и после вашего визита.\nЧтобы эффект оставался с вами дольше.',

      'why.more':'Подробнее',
      'why.cta':'Записаться'

    },

    ka: {
      'cart.empty':'კალათა ცარიელია.',
      'wa.greeting':'გამარჯობა, მსურს შეკვეთის გაფორმება:',
      'wa.total':'ჯამი:',
      'stripe.no_mapped':'ბარათით გადახდისათვის შეუსაბამო პროდუქტებია. განაახლეთ მიმაგრება ან წაშალეთ მიუღებელი ერთეულები.',
      'stripe.mapping_warn_head':'ყურადღება: ზოგიერთი ერთეული ბარათით გადახდაზე არ არის მორგებული:',
      'stripe.mapping_warn_cta':'გავაგრძელო მხოლოდ მხარდაჭერილი ერთეულებით?',
      'stripe.session_missing_url':'შექმნილია Checkout სესია, მაგრამ გადახდის ბმული ვერ მოიძებნა.',
      'stripe.error_prefix':'გადახდის შექმნის შეცდომა: ',
      'contact.sent':'ფორმა წარმატებით გაიგზავნა!',
      'contact.mail_subject':'მოთხოვნა Bergamot-ის საიტიდან',
      'video.load_error':'ვიდეო ვერ იტვირთება. შეამოწმეთ ბილიკი და HTTPS/Content-Type.',
      'slider.dot_aria':'სლაიდი',
      'cart.empty.alert':'კალათა ცარიელია.',

      /* Why Us – Georgian */
      'why.title':'რატომ ჩვენ',

      'why.point1.title':'ზრუნვა გულით',
      'why.point1.text':'პროფესიონალი ტაიელი თერაპევტები.\nინდივიდუალური მიდგომა თითოეულ სხეულთან.\nთბილი და მშვიდი გარემო პირველივე წუთიდან.\nშედეგი, რომელიც მაშინვე იგრძნობა — სხეულშიც და გონებაშიც.',

      'why.point2.title':'არ არის უბრალოდ „პროცედურა“ — ეს გამოცდილებაა',
      'why.point2.text':'იაპონური და ტაილანდური ტექნიკების შერწყმა.\nპირადი, ყურადღებიანი და პროფესიონალური მომსახურება.\nსივრცე, სადაც შეგიძლია ამოისუნთქო და მოდუნდე.\nმშვიდი პაუზა დღის შუაგულში.',

      'why.point3.title':'გამოცდილი და სანდო გუნდი',
      'why.point3.text':'დიდი გამოცდილება თერაპიულ შეხებაში.\nსწორი და ზუსტი მუშაობა სხეულის ნამდვილი საჭიროების მიხედვით.\nსისუფთავის 높은 სტანდარტი.\nრეალური შედეგი, რომელსაც იგრძნობთ.',

      'why.point4.title':'შეხება, რომელიც კურნავს',
      'why.point4.text':'რბილი, მაგრამ ეფექტური შეხება.\nმიესადაგება სხეულის დღევანდელ მდგომარეობას.\nტრადიციებისა და თანამედროვე მიდგომების შერწყმა.\nსიმსუბუქის გრძნობა, რომელიც დიდხანს გრძელდება.',

      'why.point5.title':'სიმშვიდე, სისუფთავე და კონფიდენციალურობა',
      'why.point5.text':'სუფთა, მოწესრიგებული სივრცე.\nთერაპევტის სრული ყურადღება.\nსიმშვიდე, რომელიც იშვიათად გვხვდება.\nდა ბოლოს — ღიმილი.',

      'why.point6.title':'დამშვიდების პატარა რიტუალი',
      'why.point6.text':'ყოველი სეანსი პატარა შიდა ბალანსის რიტუალს ჰგავს.\nხარისხიანი ზეთები და თბილი ტაილანდური კომპრესები.\nსუნი, შეხება და სუნთქვა ერთიანად.\nგამოცდილება, რომელიც გაწონასწორებს.',

      'why.point7.title':'ჩვენ ნამდვილად გისმენთ',
      'why.point7.text':'თქვენ არ ხართ „უბრალოდ კიდევ ერთი კლიენტი“.\nჭეშმარიტი ყურადღება და ინდივიდუალური მიდგომა.\nნაზი, პროფესიონალური და მზრუნველი პროცედურა.\nსერვისი, რომელიც გულიდან მოდის.',

      'why.point8.title':'პატარა პაუზა დღის შუაგულში',
      'why.point8.text':'მოკლე, მაგრამ ენერგიის მაბრუნებელი სეანსი.\nმშვიდი გარემო, რომელიც სტრესისგან აშორებს.\nსწრაფი აღდგენა სხეულისთვის და გონებისთვის.\nპატარა მომენტი, რომელიც დიდ დასვენებად იგრძნობა.',

      'why.point9.title':'მოსახერხებელი მდებარეობა ბათუმში',
      'why.point9.text':'ადვილად მისადგომი — ადვილად დასაბრუნებელი.\nგარეშე საცობები და პარკინგის პრობლემა.\nმოდიხართ, ისვენებთ და ახალდგები გადიხართ.\nმარტივი და სასიამოვნო ყველასთვის.',

      'why.point10.title':'სპა სტანდარტი საერთაშორისო დონეზე',
      'why.point10.text':'პროცედურების ხარისხი და მომსახურება მსოფლიო დონის სპას ადარებს.\nყურადღება დეტალებზე.\nგამოცდილება, რომელიც პრემიუმად იგრძნობა.\nდა ყველაფერი — აქვე, ბათუმში.',

      'why.point11.title':'სხვა კულტურების შეხება',
      'why.point11.text':'ტაილანდური და იაპონური ტექნიკები.\nთბილი და მეგობრული მომსახურება.\nუნიკალური კომბინაცია, რომელიც სხვაგან ვერ ნახავთ.\nგამოცდილება, რომელიც დასამახსოვრებელია.',

      'why.point12.title':'მხარდაჭერა სეანსამდე და შემდეგ',
      'why.point12.text':'გასაგები ახსნა პროცედურამდე.\nრჩევები შედეგის შესანარჩუნებლად.\nმხარდაჭერა ვიზიტის შემდეგაც.\nფასიანი ეფექტი უფრო დიდხანს დაგრჩეთ.',

      'why.more':'დამატებითი ინფორმაცია',
      'why.cta':'ჩაწერა'

    }
  };

  
  const t = (key) => {
    const lang = getLang();
    const pack = LOCAL_STRINGS[lang] || LOCAL_STRINGS.he;
    return (pack && pack[key]) || LOCAL_STRINGS.he[key] || key;
  };

  // === עגלת קניות (localStorage) ===
  const LS_KEY = 'bergamot_cart';
  const saveCart = (cart) => localStorage.setItem(LS_KEY, JSON.stringify(cart));
  const loadCart = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } };
  let CART = loadCart();

  // === ניווט טאבים ===
  window.openTab = function (evt, tabId) {
    // מסתיר את כל הסקשנים
    $$('.tabcontent').forEach(el => el.style.display = 'none');

    // מוריד active מכל הכפתורים
    $$('.tablink, .navlink, .subnavlink').forEach(btn => btn.classList.remove('active'));

    // מציג את הטאב הרצוי
    const target = document.getElementById(tabId);
    if (target) {
      target.style.display = 'block';
      ensureVideoMounted(target);
    }

    // מסמן כפתור אקטיבי
    if (evt?.currentTarget) {
      evt.currentTarget.classList.add('active');
    } else {
      $(`[onclick*="${tabId}"]`)?.classList.add('active');
    }

    // 🔎 מוצא כותרת בתוך הסקשן (אפשר גם h1 / h2 / h3)
    const heading =
      target?.querySelector('[data-scroll-target]') ||
      target?.querySelector('h1, h2, h3');

    if (heading) {
      // מי הקונטיינר שגולל? main / page-root / body / document
      const container =
        document.querySelector('main') ||
        document.querySelector('.page-root') ||
        document.scrollingElement ||
        document.body;

      // חישוב מיקום הכותרת יחסית לקונטיינר
      const headingRect   = heading.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect ? container.getBoundingClientRect() : { top: 0 };
      const currentScroll = (container === document.body || container === document.documentElement)
        ? window.scrollY
        : container.scrollTop;

      const offset = 80; // רווח קטן מהטופ (מתחת להדר)
      const top = headingRect.top - containerRect.top + currentScroll - offset;

      // גלילה אל הכותרת
      if (container === document.body || container === document.documentElement) {
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        container.scrollTo({ top, behavior: 'smooth' });
      }

      // נגישות
      heading.setAttribute('tabindex','-1');
      heading.focus?.();
    }

    // סוגר תפריטי משנה
    closeAllSubmenus();
  };


  function openFromHash(){
    const hash = location.hash.replace('#','');
    if (!hash) return;
    const btn = $(`[onclick*="${hash}"]`);
    if (btn) btn.click(); else window.openTab(null, hash);
  }

  // === לוגו — fallback ===
  function initLogoFallback() {
    const img = $('#siteLogo'); if (!img) return;
    const bases = ['images/bergamot','images/Bergamot','images/Bergamot%20Logo','images/Bergamot Logo','images/Bergamot_Logo','images/bergamot logo','images/logo','images/Logo'];
    const exts  = ['.PNG','.png','.jpg','.jpeg','.svg','.webp'];
    const candidates=[]; for (const b of bases) for (const e of exts) candidates.push(`${b}${e}`);
    let idx=0;
    const tryNext=()=>{ if (idx>=candidates.length){ img.remove(); return; } const nextSrc=candidates[idx++]; img.onerror=tryNext; img.src=nextSrc; };
    img.addEventListener('error',()=>{ img.removeEventListener('error',tryNext); tryNext(); },{once:true});
  }

  // === תפריטי משנה ===
  function closeAllSubmenus(exceptItem){
    $$('.nav-item.has-submenu').forEach(item => {
      if (item !== exceptItem) {
        item.classList.remove('open');
        const btn = $('.navlink', item);
        if (btn) btn.setAttribute('aria-expanded','false');
      }
    });
  }
  function setupNavHover(){
    const nav = $('#primary-nav'); if (!nav) return;
    const items = $$('.nav-item.has-submenu', nav);
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        closeAllSubmenus(item); item.classList.add('open');
        const btn = $('.navlink', item); if (btn) btn.setAttribute('aria-expanded','true');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('open');
        const btn = $('.navlink', item); if (btn) btn.setAttribute('aria-expanded','false');
      });
      const btn = $('.navlink', item);
      btn?.addEventListener('click', (e) => {
        if (window.matchMedia('(hover: none)').matches) {
          e.preventDefault();
          const isOpen = item.classList.contains('open');
          closeAllSubmenus(isOpen ? null : item);
          item.classList.toggle('open', !isOpen);
          btn.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });
    document.addEventListener('click', (e) => {
      const inside = e.target.closest('#primary-nav');
      if (!inside) closeAllSubmenus();
    });
  }

  // === סליידרים (הירו/גלריה/טסטמוניאלס) ===
  function makeSlider(root, opts = {}) {
    if (!root) return null;
    const slidesWrap = root.querySelector('.slides');
    let slides = slidesWrap
      ? Array.from(slidesWrap.querySelectorAll('.promo-slide, .testi-slide, .slide'))
      : Array.from(root.querySelectorAll('.promo-slide, .testi-slide, .slide'));
    const prevBtn = root.querySelector('.prev'), nextBtn = root.querySelector('.next'), dotsWrap = root.querySelector('.dots');

    slides.forEach(s => {
      const file = s.dataset.video?.trim();
      const hasVideoTag = !!s.querySelector('video');
      if (file && !hasVideoTag) {
        const v = document.createElement('video');
        v.className = 'slide-video';
        v.muted = true; v.playsInline = true; v.loop = true; v.preload = 'metadata';
        Object.assign(v.style, { position:'absolute', inset:'0', width:'100%', height:'100%', objectFit:'cover', zIndex:'0' });
        const src = document.createElement('source'); src.src = encodeURI(file); src.type='video/mp4'; v.appendChild(src);
        s.appendChild(v);
      }
      const overlay = s.querySelector('.promo-overlay'); if (overlay) { overlay.style.position='relative'; overlay.style.zIndex='1'; }
    });

    let i = 0, len = slides.length, autoplayMs = Number(root.dataset.autoplay || opts.autoplay || 0), timer = null;
    slides.forEach((s, idx) => { s.style.position='absolute'; s.style.inset='0'; s.style.transition='opacity .35s ease'; s.style.opacity = idx===0 ? '1':'0'; });
    if (slidesWrap) { slidesWrap.style.position='relative'; slidesWrap.style.minHeight = slides[0]?.offsetHeight ? `${slides[0].offsetHeight}px` : '320px'; }

    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      dots = slides.map((_, idx) => {
        const b = document.createElement('button'); b.type='button'; b.setAttribute('aria-label',`${t('slider.dot_aria')} ${idx+1}`); b.addEventListener('click', () => go(idx));
        dotsWrap.appendChild(b); return b;
      });
    }

    function handleVideoPlayback() {
      slides.forEach((s, idx) => {
        const v = s.querySelector('video'); if (!v) return;
        if (vidSupportsAutoplay()) {
          if (idx === i) { v.muted = true; const p = v.play(); if (p?.catch) p.catch(()=>{}); }
          else { v.pause(); try{ v.currentTime = 0; }catch{} }
        }
      });
    }
    function vidSupportsAutoplay(){ return true; }
    function paint(){ slides.forEach((s, idx)=> s.style.opacity = idx===i?'1':'0'); dots.forEach((d, idx)=> d.classList.toggle('active', idx===i)); handleVideoPlayback(); }
    function go(n){ i = (n+len)%len; paint(); restart(); }
    function next(){ go(i+1); } function prev(){ go(i-1); }
    prevBtn?.addEventListener('click', prev); nextBtn?.addEventListener('click', next);
    function start(){ if (!autoplayMs || len<=1) return; stop(); timer = setInterval(next, autoplayMs); }
    function stop(){ if (timer) clearInterval(timer), timer=null; }
    function restart(){ stop(); start(); }
    root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop); root.addEventListener('focusout', start);

    slides.forEach(s => { const styleBg = s.getAttribute('style')||''; const match = styleBg.match(/--bg:\s*url\(([^)]+)\)/); if (match) s.style.backgroundImage=`url(${match[1]})`; });

    paint(); start(); return { next, prev, go, stop, start };
  }

  // === קריאת כרטיס מוצר מהדום ===
  function readCardData(card){
    const sku=card.dataset.sku||'';
    const title=card.dataset.title||card.querySelector('.product-title')?.textContent?.trim()||'מוצר';
    const price=Number(card.dataset.price||card.querySelector('.price')?.textContent?.replace(/[^\d.]/g,'')||0);
    const qty=Math.max(1, Number(card.querySelector('.qty')?.value||1));
    return {sku,title,price,qty};
  }

  // === פעולות עגלה ===
  function addToCart(item){ const ex=CART.find(i=>i.sku===item.sku); if (ex) ex.qty+=item.qty; else CART.push(item); saveCart(CART); renderCartTable(); }
  function removeFromCart(sku){ CART=CART.filter(i=>i.sku!==sku); saveCart(CART); renderCartTable(); }
  function updateQty(sku,qty){ const it=CART.find(i=>i.sku===sku); if (!it) return; it.qty=Math.max(1,qty); saveCart(CART); renderCartTable(false); }
  const cartSubtotal = () => CART.reduce((s,i)=>s+i.price*i.qty,0);

  function renderCartTable(scroll=false){
    const tbody=$('#cartTable tbody'), subtotalEl=$('#cartSubtotal'); if (!tbody||!subtotalEl) return;
    tbody.innerHTML='';
    if (CART.length===0){
      const tr=document.createElement('tr'); const td=document.createElement('td'); td.colSpan=5; td.className='muted'; td.textContent=t('cart.empty'); tr.appendChild(td); tbody.appendChild(tr);
    } else {
      CART.forEach(it=>{
        const tr=document.createElement('tr');
        tr.innerHTML = `
          <td>${it.title}</td>
          <td>${toILS(it.price)}</td>
          <td><input type="number" min="1" value="${it.qty}" class="qty-input"></td>
          <td>${toILS(it.price*it.qty)}</td>
          <td><button class="btn-outline">הסר</button></td>`;
        tr.querySelector('.qty-input').addEventListener('change',e=>updateQty(it.sku,Number(e.target.value||1)));
        tr.querySelector('.btn-outline').addEventListener('click',()=>removeFromCart(it.sku));
        tbody.appendChild(tr);
      });
    }
    subtotalEl.textContent=toILS(cartSubtotal());
    if (scroll){ openTab(null,'cart'); $('#cart')?.scrollIntoView({behavior:'smooth', block:'start'}); }
  }

  function clearCart(){ CART=[]; saveCart(CART); renderCartTable(); }

  // === תשלום דרך וואטסאפ ===
  function checkoutWhatsApp(){
    if (CART.length===0){ alert(t('cart.empty.alert')); return; }
    const phone='972501234567';
    const lines=CART.map(i=>`• ${i.title} × ${i.qty} — ₾${(i.price*i.qty).toFixed(0)}`);
    const txt=`${t('wa.greeting')}\n${lines.join('\n')}\n${t('wa.total')} ₾${cartSubtotal().toFixed(0)}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`,'_blank');
  }

  // === תשלום בכרטיס אשראי (Stripe Checkout) ===

  // השרת שלנו (Express) שרץ על 4242 – חשוב URL מוחלט כשמגישים את האתר מ־5500
  const API_BASE = 'http://localhost:4242';

  // מיפוי SKU → מזהה מוצר בצד השרת (בשרת מוגדרים אותם מזהים בדיוק)
  const SKU_TO_SERVER_ID = {
    'PROD-1':'PROD-1','PROD-2':'PROD-2','PROD-3':'PROD-3','PROD-4':'PROD-4','PROD-5':'PROD-5',
    'PROD-6':'PROD-6','PROD-7':'PROD-7','PROD-8':'PROD-8','PROD-9':'PROD-9','PROD-10':'PROD-10',
    'PROD-11':'PROD-11','PROD-12':'PROD-12','PROD-13':'PROD-13','PROD-14':'PROD-14','PROD-15':'PROD-15'
  };

  // (לא חובה לפעולה – נשאר אצלך אם תרצה/י להציג מחירים מקומיים)
  const DISPLAY = {
    'PROD-1':  { name: 'סרום חומצה היאלורונית 30ml',   price: 119.00 },
    'PROD-2':  { name: 'קרם לילה רטינול 50ml',          price: 169.00 },
    'PROD-3':  { name: 'שמן ורדים 15ml',                price:  89.00 },
    'PROD-4':  { name: 'מסכת חימר ירוק 75ml',           price:  99.00 },
    'PROD-5':  { name: 'קרם עיניים 15ml',               price: 139.00 },
    'PROD-6':  { name: 'סרום ויטמין C 30ml',            price: 159.00 },
    'PROD-7':  { name: 'קרם לחות היאלורוני 50ml',      price: 149.00 },
    'PROD-8':  { name: 'גליל ג׳ייד לעיסוי פנים',        price:  79.00 },
    'PROD-9':  { name: 'מסכת לחות היידרה 75ml',         price: 109.00 },
    'PROD-10': { name: 'טונר מרענן 200ml',              price:  69.00 },
    'PROD-11': { name: 'מגן שמש SPF50 50ml',            price: 129.00 },
    'PROD-12': { name: 'פילינג עדין אנזימטי 75ml',      price: 119.00 },
    'PROD-13': { name: 'קיט טיפוח בסיסי (3 פריטים)',    price: 249.00 },
    'PROD-14': { name: 'סרום ניאצינמיד 30ml',           price: 129.00 },
    'PROD-15': { name: 'גואשה מאבן ורודה',              price:  69.00 },
  };

  function mapCartForServer(){
    const mapped = [];
    const unsupported = [];
    for (const row of CART) {
      const serverId = SKU_TO_SERVER_ID[row.sku];
      if (!serverId) { unsupported.push(row); continue; }
      mapped.push({ id: serverId, qty: Math.max(1, Number(row.qty||1)) });
    }
    return { mapped, unsupported };
  }

  async function payWithCard(){
    if (CART.length===0){ alert(t('cart.empty.alert')); return; }
    const { mapped, unsupported } = mapCartForServer();
    if (!mapped.length){
      alert(t('stripe.no_mapped'));
      return;
    }
    if (unsupported.length){
      const names = unsupported.map(i=>`${i.title} (SKU: ${i.sku})`).join('\n• ');
      const msg = `${t('stripe.mapping_warn_head')}\n• ${names}\n\n${t('stripe.mapping_warn_cta')}`;
      if (!confirm(msg)) return;
    }

    try{
      const resp = await fetch(`${API_BASE}/create-checkout-session`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          cart: mapped,
          customerInfo: { name:'', phone:'', pickupNotes:'' }
        })
      });

      // נקרא כטקסט תחילה לטיפול טוב יותר בשגיאות
      const raw = await resp.text();
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch { /* ignore parse error */ }

      if (!resp.ok) throw new Error(data?.error?.message || `Server error (${resp.status})`);
      if (data?.url) window.location.href = data.url;
      else alert(t('stripe.session_missing_url'));
    } catch(err){
      console.error('payWithCard error:', err);
      alert(t('stripe.error_prefix') + (err.message || err));
    }
  }

  // === טופס צור קשר ===
  function setupContactForm(){
    const form=$('#contactForm'); if (!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      if (window.emailjs && typeof emailjs.send==='function'){
        try{
          const SERVICE_ID='YOUR_SERVICE_ID', TEMPLATE_ID='YOUR_TEMPLATE_ID';
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, { from_name:data.name, from_email:data.email, phone:data.phone||'', message:data.message||'' });
          alert(t('contact.sent')); form.reset(); return;
        }catch(err){ console.warn('EmailJS error:', err); }
      }

      // ✅ שורות טלפון ומייל + שליחה לכתובת info@bereshitspa.com
      const mailto = `mailto:info@bereshitspa.com?subject=${encodeURIComponent(t('contact.mail_subject'))}&body=${encodeURIComponent(
        `שם: ${data.name}\nטלפון: ${data.phone || ''}\nמייל: ${data.email}\n\nהודעה:\n${data.message || ''}`
      )}`;
      window.location.href=mailto;
    });
  }

  // === וידאו בדפי טיפול ===
  function ensureVideoMounted(section){
    if (!section || !section.classList.contains('treatment')) return;
    if (section.__videoMounted) return;
    const srcEmbed = section.dataset.embed?.trim();
    const srcFile  = section.dataset.file?.trim();
    const slot = $('.video-slot', section); if (!slot) return;

    // ✅ EMBED (YouTube / Vimeo וכד') – גודל נורמלי, לא מסך מלא
    if (srcEmbed) {
      const iframe = document.createElement('iframe');
      iframe.src = srcEmbed;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.setAttribute('allowfullscreen','');
      Object.assign(iframe.style, {
        width: '100%',
        maxWidth: '720px',
        display: 'block',
        margin: '0 auto 1.5rem',
        aspectRatio: '16 / 9',
        border: 'none',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#000'
      });
      slot.replaceWith(iframe);
      section.__videoMounted = true;
      return;
    }

    // ✅ קובץ וידיאו מקומי – גודל נורמלי, בתוך הסקשן
    if (srcFile) {
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      Object.assign(video.style, {
        width: '100%',
        maxWidth: '720px',
        display: 'block',
        margin: '0 auto 1.5rem',
        aspectRatio: '16 / 9',
        borderRadius: '12px',
        background: '#000',
        objectFit: 'cover'
      });
      video.setAttribute('controlsList','nodownload');

      const source = document.createElement('source');
      source.src = encodeURI(srcFile);
      source.type = 'video/mp4';
      video.appendChild(source);

      video.addEventListener('error', () => {
        const msg = document.createElement('div');
        msg.className='muted';
        Object.assign(msg.style, {
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto 1.5rem',
          padding: '12px',
          textAlign: 'center',
          borderRadius: '12px',
          background: 'rgba(0,0,0,.5)',
          color: '#fff',
          boxSizing: 'border-box'
        });
        msg.textContent=t('video.load_error');
        slot.replaceWith(msg);
      }, { once:true });

      slot.replaceWith(video);
      section.__videoMounted = true;
    }
  }
  function mountAllTreatmentVideos(){ $$('.treatment').forEach(ensureVideoMounted); }


  /* ================================
     ✅ NEW: i18n ללשוניות/תתי־נושאים
     ================================ */
  const TAB_LABELS = {
    // ✓ שינוי כאן בלבד: עברית עודכנה ל"ספא ראש יפני"
    'services-head-spa': { he:'ספא ראש יפני – חוויה מלכותית לקרקפת ולנשמה', en:'Japanese Head Spa – A Royal Experience for the Scalp and Soul', ru:'Японское Хэд-спа – Королевский уход для кожи головы и души', ka:'იაპონური თავის სპა – სამეფო გამოცდილება სკალპისა და სულისთვის' },
    'services-hot-stones': { he:'עיסוי פנים באבנים חמות', en:'Hot Stones Facial', ru:'Уход с горячими камнями', ka:'ცხელი ქვებით სახის თერაპია' },
    'services-thai-pads':  { he:'עיסוי פנים קומפרסורים  תאילנדים', en:'Thai Herbal Pads Facial', ru:'Уход с тайскими травяными мешочками', ka:'თაილანდური ბალახის პადებით თერაპია' },
    'services-aroma-stress': { he:'טיפול ארומה לשחרור סטרס', en:'Aroma Anti-Stress', ru:'Арома-антистресс', ka:'არომა ანტი-სტრესი' },
    'services-tibetan-bowls': { he:'קול ושקט פנימי (קערות טיבטיות)', en:'Sound & Inner Calm (Tibetan Bowls)', ru:'Звук и внутренний покой (тибетские чаши)', ka:'ხმის თერაპია (ტიბეტური ჭიქები)' },

    'pro-classic-comedones': { he:'טיפול קלאסי (הוצאת קומודונים)', en:'Classic Facial (Comedones)', ru:'Классический уход (комедоны)', ka:'კლასიკური ფეშალი (კომედონები)' },
    'pro-rf':                 { he:'עיסוי פנים מתקדם ב-RF – מיצוק וזוהר', en:'Advanced RF Facial – Firm & Glow', ru:'RF-уход – упругость и сияние', ka:'RF ფეშალი – გამკაცრება და ბზინვარება' },
    'pro-epn':                { he:'EPN מיקרו-מחטים – מיצוק וטשטוש קמטוטים', en:'EPN Microneedling – Firming & Fine Lines', ru:'Микронидлинг EPN – упругость и морщины', ka:'EPN მიკროსუიჩები – გამკაცრება' },
    'pro-frf-mn':             { he:'צלקות – Fractional RF Microneedling', en:'Scars – Fractional RF Microneedling', ru:'Шрамы – фракционный RF-микронидлинг', ka:'ნაიარევები – ფრაქციული RF' },
    'pro-pigmentation':       { he:'פיגמנטציה – Fractional / Q-Switch', en:'Pigmentation – Fractional / Q-Switch', ru:'Пигментация – Fractional / Q-Switch', ka:'პიგმენტაცია – ფრაქციული / Q-Switch' },

    'blog-routines':     { he:'שגרת טיפוח (בוקר/ערב)', en:'Routines (AM/PM)', ru:'Рутины (утро/вечер)', ka:'რუტინები (დილა/საღამო)' },
    'blog-skin-type':    { he:'לפי סוג עור', en:'By Skin Type', ru:'По типу кожи', ka:'კანის ტიპით' },
    'blog-concern':      { he:'לפי דאגה', en:'By Concern', ru:'По проблеме', ka:'პრობლემის მიხედვით' },
    'blog-actives':      { he:'רכיבים פעילים', en:'Active Ingredients', ru:'Активные ингредиенты', ka:'აქტიური ინგრედიენტები' },
    'blog-home-guides':  { he:'מדריכים לבית', en:'At-Home Guides', ru:'Домашние руководства', ka:'სახლის გზამკვლევები' },
    'blog-before-after': { he:'לפני/אחרי טיפול', en:'Before/After', ru:'До/После', ka:'მანამდე/შემდეგ' },
    'blog-aroma':        { he:'ארומתרפיה ורווחה', en:'Aromatherapy & Wellness', ru:'Ароматерапия и благополучие', ka:'არომათერაპია და ველნესი' },
    'blog-myths':        { he:'מיתוסים ובדיקות אמת', en:'Myths & Fact-Checks', ru:'Мифы და факты', ka:'მითები და ფაქტები' }
  };

  function applyTabLabels(lang) {
    Object.entries(TAB_LABELS).forEach(([tabId, labels]) => {
      const el = document.querySelector(`[onclick*="${tabId}"]`);
      if (!el) return;
      const txt = labels[lang] || labels.he;
      // שומר תתי-אלמנטים (badges וכו') אם קיימים
      if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
        el.firstChild.nodeValue = txt + ' ';
      } else {
        el.textContent = txt;
      }
    });
  }


  /* ==================================
     ✅ NEW: i18n למוצרי חנות לפי SKU
     ================================== */
  const PRODUCTS_I18N = {
    'PROD-1': {
      name:{ he:'סרום חומצה היאלורונית 30ml', en:'Hyaluronic Acid Serum 30ml', ru:'Сыворотка с гиалуроновой кислотой 30 мл', ka:'ჰიალურონის შრატი 30 მლ' },
      tag :{ he:'לחות עמוקה', en:'Deep Hydration', ru:'Глубокое увлажнение', ka:'ღრმა დატენიანება' },
      desc:{ he:'לחות אינטנסיבית למראה עור רענן.', en:'Intense hydration for a fresh look.', ru:'Интенсивное увлажнение для свежего вида.', ka:'ინტენსიური დატენიანება კანის სიწკრივისთვის.' }
    },
    'PROD-2': {
      name:{ he:'קרם לילה רטינול 50ml', en:'Retinol Night Cream 50ml', ru:'Ночной крем с ретинолом 50 мл', ka:'რეტინოლის ღამის კრემი 50 მლ' },
      tag :{ he:'אנטי-אייג׳ינג', en:'Anti-Aging', ru:'Антивозрастной', ka:'אַנטი-ეიჯინგი' },
      desc:{ he:'תמיכה בהחלקת מרקם והאצת התחדשות.', en:'Helps smooth texture and boost renewal.', ru:'Сглаживает текстуру и ускоряет обновление.', ka:'ტექსტურის გასწორებას და განახლებას უწყობს ხელს.' }
    },
    'PROD-3': {
      name:{ he:'שמן ורדים 15ml', en:'Rose Oil 15ml', ru:'Масло розы 15 мл', ka:'ვარდის ზეთი 15 მლ' },
      tag :{ he:'ארומה', en:'Aroma', ru:'Арома', ka:'არომა' },
      desc:{ he:'ניחוח עדין ותמיכה בהרגעת העור.', en:'Delicate aroma; calms the skin.', ru:'Нежный аромат; успокаивает кожу.', ka:'დელიკატური სურნელი, ამშვიდებს კანს.' }
    },
    'PROD-4': {
      name:{ he:'מסכת חימר ירוק 75ml', en:'Green Clay Mask 75ml', ru:'Маска с зелёной глиной 75 мл', ka:'მწვანე თიხის ნიღაბი 75 მლ' },
      tag :{ he:'איזון', en:'Balance', ru:'Баланс', ka:'ბალანსი' },
      desc:{ he:'ניקוי עמוק וספיחת שומן עודף.', en:'Deep cleansing and sebum absorption.', ru:'Глубокое очищение и абсорбция себума.', ka:'ღრმა წმენდა და ცხიმის შთანთქმა.' }
    },
    'PROD-5': {
      name:{ he:'קרם עיניים 15ml', en:'Eye Cream 15ml', ru:'Крем для век 15 мл', ka:'თვალის კრემი 15 მლ' },
      tag :{ he:'אזור העיניים', en:'Eye Area', ru:'Зона вокруг глаз', ka:'თვალის ზონა' },
      desc:{ he:'סיוע למראה רענן באזור עדין.', en:'Helps refresh the delicate area.', ru:'Освежает деликатную зону вокруг глаз.', ka:'ეხმარება ნაზი ზონის განახლებას.' }
    },
    'PROD-6': {
      name:{ he:'סרום ויטמין C 30ml', en:'Vitamin C Serum 30ml', ru:'Сыворотка с витамином C 30 мл', ka:'ვიტამინ C შრატი 30 მლ' },
      tag :{ he:'זוהר', en:'Glow', ru:'Сияние', ka:'ბზინვარება' },
      desc:{ he:'תמיכה באחידות גוון ובהירות.', en:'Supports even tone and brightness.', ru:'Выравнивает тон и придаёт сияние.', ka:'ტონის ერთგვაროვნებას და ნათებას უწყობს ხელს.' }
    },
    'PROD-7': {
      name:{ he:'קרם לחות היאלורוני 50ml', en:'Hyaluronic Moisturizing Cream 50ml', ru:'Увлажняющий крем с гиалуроновой кислотой 50 мл', ka:'ჰიალურონის დატენიანებელი კრემი 50 მლ' },
      tag :{ he:'לחות', en:'Hydration', ru:'Увлажнение', ka:'დატენიანება' },
      desc:{ he:'קרם קליל לעור צמא – מעניק לחות ורכות לאורך היום.', en:'Lightweight cream for thirsty skin; lasting hydration.', ru:'Лёгкий крем для жаждущей кожи; длительное увлажнение.', ka:'თხელი კრემი მშრალი კანისთვის – ხანგრძლივი დატენიანება.' }
    },
    'PROD-8': {
      name:{ he:'גליל ג׳ייד לעיסוי פנים', en:'Jade Facial Roller', ru:'Нефритовый роллер для лица', ka:'ჯადე როლერი სახისთვის' },
      tag :{ he:'אביזר', en:'Accessory', ru:'Аксессуар', ka:'აქსესუარი' },
      desc:{ he:'מסייע להרגעה ולעיסוי עדין לשיפור המראה והזרימה.', en:'Soothing, gentle massage to boost circulation and glow.', ru:'Успокаивающий мягкий массаж для сияния და микроциркуляции.', ka:'მშვიდი, რბილი მასაჟი – ბზინვარებისა და მიმოქცევის გასაძლიერებლად.' }
    },
    'PROD-9': {
      name:{ he:'מסכת לחות היידרה 75ml', en:'Hydra Moisture Mask 75ml', ru:'Увлажняющая маска Hydra 75 мл', ka:'ჰიდრა დატენიანების ნიღაბი 75 მლ' },
      tag :{ he:'לחות', en:'Hydration', ru:'Увлажнение', ka:'დატენიანება' },
      desc:{ he:'מסכה עשירה למילוי לחות ושיקום מיידי.', en:'Rich mask that replenishes moisture and restores softness.', ru:'Питательная маска: восполняет влагу, возвращает мягкость.', ka:'ნოყიერი ნიღაბი, აძლევს სწრაფ დატენიანებას და რბილობას.' }
    },
    'PROD-10': {
      name:{ he:'טונר מרענן 200ml', en:'Refreshing Toner 200ml', ru:'Освежающий тонер 200 мл', ka:'გამანათებელი ტონერი 200 მლ' },
      tag :{ he:'ריענון', en:'Refresh', ru:'Свежесть', ka:'განახლება' },
      desc:{ he:'מאזן את העור ומכין לספיגת חומרים פעילים.', en:'Balances skin and preps for active ingredients.', ru:'Балансирует кожу и подготавливает к активным средствам.', ka:'აბალანსებს კანს და ამზადებს აქტიური ინგრედიენტებისთვის.' }
    },
    'PROD-11': {
      name:{ he:'מגן שמש SPF50 50ml', en:'Sunscreen SPF50 50ml', ru:'Солнцезащитный крем SPF50 50 мл', ka:'მზისგან დამცავი SPF50 50 მლ' },
      tag :{ he:'הגנה מהשמש', en:'Sun Protection', ru:'Защита от солнца', ka:'მზის დაცვა' },
      desc:{ he:'הגנה רחבת־טווח UVA/UVB, מרקם נעים ולא שמנוני.', en:'Broad-spectrum UVA/UVB protection; comfortable, non-greasy.', ru:'Широкий спектр UVA/UVB; комфортная нежирная ტექსტურა.', ka:'ფართო სპექტრის UVA/UVB დაცვა, მსუბუქი ტექსტურა.' }
    },
    'PROD-12': {
      name:{ he:'פילינג עדין אנזימטי 75ml', en:'Gentle Enzyme Peel 75ml', ru:'Деликатный энзимный пилинг 75 мл', ka:'რბილი ფერმენტული პილინგი 75 მლ' },
      tag :{ he:'ניקוי', en:'Exfoliation', ru:'Экფოლიация', ka:'ექსფოლიაცია' },
      desc:{ he:'מסיר תאים מתים בעדינות לקבלת מראה חלק וזוהר.', en:'Gently lifts dead cells for smooth, glowing skin.', ru:'Деликатно удаляет ороговевшие клетки для гладкости და сияния.', ka:'რბილად აშორებს მკვდარ უჯრედებს – გლუვი, ნათელი კანი.' }
    },
    'PROD-13': {
      name:{ he:'קיט טיפוח בסיסי (3 פריטים)', en:'Basic Skincare Kit (3 items)', ru:'Базовый набор ухода (3 предмета)', ka:'საბაზისო სკინკერის კიტი (3 ერთეული)' },
      tag :{ he:'סט', en:'Set', ru:'Набор', ka:'კიტი' },
      desc:{ he:'שלישייה מושלמת להתחלה: ניקוי, לחות והגנה.', en:'Perfect trio to start: cleanse, hydrate, protect.', ru:'Идеальное трио: очищение, увлажнение, защита.', ka:'იდეალური სამეული: წმენდა, დატენიანება, დაცვა.' }
    },
    'PROD-14': {
      name:{ he:'סרום ניאצינמיד 30ml', en:'Niacinamide Serum 30ml', ru:'Сыворотка с ниацинамидом 30 мл', ka:'ნიკოცინამიდის შრატი 30 მლ' },
      tag :{ he:'איזון', en:'Balance', ru:'Балანს', ka:'ბალანსი' },
      desc:{ he:'מסייע באיזון שומן, מראה נקבוביות ואחידות גוון.', en:'Helps balance oil, refine pores and even tone.', ru:'Сбалансирует себум, сужает поры и выравнивает тон.', ka:'აბალანსებს ცხიმს, ამცირებს ფორებს და აძლევს ერთგვაროვან ტონს.' }
    },
    'PROD-15': {
      name:{ he:'גואשה מאבן ורודה', en:'Rose Quartz Gua Sha', ru:'Гуаша из розового кварца', ka:'როზ ქუარცის გუა-შა' },
      tag :{ he:'אביזר', en:'Accessory', ru:'Аксессуар', ka:'აქსესუარი' },
      desc:{ he:'כלי מסאז׳ לקידום זרימה והרפיית מתחים בפנים.', en:'Massage tool to boost circulation and relieve facial tension.', ru:'Инструмент для массажа: улучшает кровоток и снимает напряжение.', ka:'მასაჟის იარაღი – აუმჯობესებს მიმოქცევას და ამშვიდებს დაჭიმულობას.' }
    }
  };

  function applyProductI18n(lang) {
    document.querySelectorAll('.product-card').forEach(card=>{
      const sku = card.dataset.sku;
      const d = PRODUCTS_I18N[sku]; if (!d) return;

      const titleEl = card.querySelector('.product-title');
      if (titleEl) {
        const tagEl = titleEl.querySelector('.tag');
        if (tagEl && d.tag) tagEl.textContent = d.tag[lang] || d.tag.he;

        const nameTxt = (d.name && (d.name[lang] || d.name.he)) || '';
        if (titleEl.firstChild && titleEl.firstChild.nodeType === Node.TEXT_NODE) {
          titleEl.firstChild.nodeValue = nameTxt + ' ';
        } else {
          titleEl.insertAdjacentText('afterbegin', nameTxt + ' ');
        }
      }

      const descEl = card.querySelector('.muted');
      if (descEl && d.desc) descEl.textContent = d.desc[lang] || d.desc.he;
    });
  }

  /* ==================================
     ✅ NEW: מודל הזמנת טיפול ותשלום
     ================================== */
  function setupBookingModal() {
    const modal  = $('#bookingModal');
    if (!modal) return; // אם אין מודל ב־HTML – לא לעשות כלום

    const backdrop       = modal.querySelector('.booking-backdrop');
    const dialog         = modal.querySelector('.booking-dialog');
    const closeBtn       = modal.querySelector('.booking-close');
    const form           = $('#bookingForm', modal);
    const treatmentEl    = $('#bookingTreatmentName');
    const basePriceEl    = $('#bookingBasePrice');
    const addonWrapper   = $('#bookingAddonWrapper');
    const addonPriceEl   = $('#bookingAddonPrice');
    const addonOptionRow = $('#addonOptionRow');

    let current = { name:'', base:0, addon:0 };

    function openModal() {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');

      if (form) form.reset();

      const hasAddon = current.addon > 0;
      if (addonWrapper)   addonWrapper.style.display   = hasAddon ? 'inline' : 'none';
      if (addonOptionRow) addonOptionRow.style.display = hasAddon ? 'inline-flex' : 'none';

      const baseRadio = modal.querySelector('input[name="durationOption"][value="base"]');
      if (baseRadio) baseRadio.checked = true;

      setTimeout(() => dialog?.focus?.(), 20);
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }

    backdrop?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // חיבור כל הכפתורים שיש להם .book-btn
    $$('.book-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const el = e.currentTarget;

        const name  = el.getAttribute('data-treatment') || 'טיפול בספא';
        const base  = Number(el.getAttribute('data-base')  || '0');
        const addon = Number(el.getAttribute('data-addon') || '0');

        current = { name, base, addon };

        if (treatmentEl) treatmentEl.textContent = name;
        if (basePriceEl) basePriceEl.textContent = base.toFixed(0);
        if (addonPriceEl) addonPriceEl.textContent = addon.toFixed(0);

        openModal();
      });
    });

    // שליחת טופס – כרגע רק הדגמה (alert), בהמשך נחבר ל־Stripe
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      const useAddon   = data.durationOption === 'addon' && current.addon > 0;
      const finalPrice = useAddon ? current.base + current.addon : current.base;
      const duration   = useAddon ? 'מורחב' : 'בסיסי';

      alert(
        'הזמנה התקבלה:\n\n' +
        `טיפול: ${current.name}\n` +
        `שם: ${data.name}\n` +
        `טלפון: ${data.phone}\n` +
        `תאריך: ${data.date} שעה: ${data.time}\n` +
        `משך: ${duration}\n` +
        `מחיר לתשלום: ${finalPrice}₾\n\n` +
        '(חיבור למסך תשלום אשראי יתוסף בשלב הבא)'
      );

      closeModal();
    });
  }

  // === אתחול דף ===
  document.addEventListener('DOMContentLoaded', () => {
    // לוגו מחזיר לדף הבית
    $('.site-header .brand')?.addEventListener('click',(e)=>{
      e.preventDefault();
      openTab(e,'home');
    });

    // ניווט ותפריטי משנה
    setupNavHover();

    // סליידרים
    makeSlider($('#heroSlider'));
    makeSlider($('#gallery1'));
    makeSlider($('#testiSlider'));
    makeSlider($('#whySlider'), { autoPlayMs: 4000, pauseOnHover: true });

    // הוספה לעגלה מכל כרטיס מוצר
    $$('.add-to-cart').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        const card = e.currentTarget.closest('.product-card');
        if (!card) return;
        addToCart(readCardData(card));
      });
    });

    // קיצור דרך לצפייה בעגלה
    $$('.product-card .btn-outline').forEach(btn=>{
      btn.addEventListener('click',(e)=>{
        e.preventDefault();
        renderCartTable(true);
      });
    });

    // פעולות עגלה
    $('#clearCartBtn')?.addEventListener('click', clearCart);
    $('#checkoutBtn')?.addEventListener('click', checkoutWhatsApp);

    // תשלום בכרטיס עבור מוצרים (החנות)
    $('#payCardBtn')?.addEventListener('click', payWithCard);

    // ✅ כפתורי "הזמנת עיסוי ותשלום" – מעבר לעמוד checkout.html
    $$('.book-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const treatment = btn.dataset.treatment || 'עיסוי בספא';
        const base  = Number(btn.dataset.base  || 0);
        const addon = Number(btn.dataset.addon || 0);

        // שומרים גם finalPrice ו-duration ברירת מחדל = בסיסי
        const bookingMeta = {
          treatment,
          base,
          addon,
          finalPrice: base,   // מחיר ברירת מחדל לתשלום
          duration: 'base'    // "בסיסי" כברירת מחדל
        };

        localStorage.setItem('bereshit_booking', JSON.stringify(bookingMeta));
        window.location.href = 'checkout.html';
      });
    });

    // i18n ללשוניות ולמוצרים
    const langNow = getLang();
    applyTabLabels(langNow);
    applyProductI18n(langNow);
    // ✅ דגלי שפה – האזנה לכפתורי .lang-btn
    $$('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (!lang) return;

        // שמירת השפה המועדפת
        localStorage.setItem('site_lang', lang);

        // רענון הדף כדי שה־i18n יתעדכן
        location.reload();
      });
    });

    // שאר אתחולים
    renderCartTable();
    setupContactForm();
    initLogoFallback();
    mountAllTreatmentVideos();

    // בחירת טיפול מתוך האודות → פתיחת מודאל בחירה + כפתור "המשך"
    const selectorModal      = document.getElementById("treatmentSelectorModal");
    const openSelector       = document.getElementById("openTreatmentSelector");
    const closeSelector      = document.getElementById("closeSelector");
    const confirmTreatment   = document.getElementById("confirmTreatment");
    const selectField        = document.getElementById("treatmentSelect");

    if (selectorModal && openSelector && closeSelector && confirmTreatment && selectField) {

      // פתיחת חלון בחירת הטיפולים
      openSelector.addEventListener("click", () => {
        selectorModal.style.display = "block";
      });

      // סגירה
      closeSelector.addEventListener("click", () => {
        selectorModal.style.display = "none";
      });

      // ✅ כפתור "המשך" – מושך מחירים ישירות מהסקשן המתאים (מהכפתור .book-btn)
      confirmTreatment.addEventListener("click", () => {
        const option = selectField.options[selectField.selectedIndex];
        const label  = option ? option.textContent.trim() : '';

        if (!label) {
          alert("נא לבחור טיפול מהרשימה.");
          return;
        }

        // 1. מיפוי טקסט בסיסי של הטיפול → ה-id של הסקשן
        const LABEL_TO_SECTION = {
          // ספא ראש
          'ספא ראש יפני': 'services-head-spa',

          // 🌸 עיסויי פנים
          'עיסוי פנים בקומפרסים תאילנדיים': 'services-thai-compress',
          'עיסוי פנים באבנים חמות':         'services-hot-stones',
          'עיסוי פנים תאילנדי מסורתי':      'services-thai-facial',
          'עיסוי פנים ארומתרפי':            'services-aroma-facial',

          // 💆‍♂️ גב–כתפיים–צוואר
          'עיסוי גב–כתפיים–צוואר':               'services-back-massage',
          'עיסוי גב–כתפיים–צוואר עם אבנים חמות': 'services-back-hotstones',

          // 🧘‍♀️ גוף מלא
          'עיסוי גוף מלא':                       'services-full-body', // אם תרצה – קטגוריה
          'עיסוי תאילנדי מסורתי':                'thai-traditional',
          'עיסוי שמן תאילנדי':                   'thai-oil',
          'עיסוי ארומתרפי':                      'thai-aroma',
          'עיסוי תאילנדי רפואי':                 'thai-therapeutic',
          'עיסוי באבנים חמות':                   'hot-stone-body',
          'עיסוי קומפרסים תאילנדי חמים בצמחי מרפא': 'thai-compress',
          'עיסוי שיאצו':                         'shiatsu',

          // 🦶 כפות רגליים
          "פוט מסאז' – עיסוי כפות רגליים תאילנדי רפלקסולוגי": 'foot-massage'
        };

        // קודם ננסה התאמה ישירה
        let sectionId = LABEL_TO_SECTION[label];

        // אם לא נמצא – ננסה התאמה לפי "הטקסט מתחיל ב..."
        if (!sectionId) {
          const normalized = label.replace(/\s+/g, ' ').trim();
          for (const [key, id] of Object.entries(LABEL_TO_SECTION)) {
            if (normalized.startsWith(key)) {
              sectionId = id;
              break;
            }
          }
        }

        if (!sectionId) {
          alert(
            'לא נמצא טיפול תואם לטקסט: ' + label +
            '\nבדוק שהטקסט ב<select> מתחיל כמו המפתח במפה LABEL_TO_SECTION.'
          );
          return;
        }

        // 2. מוצאים את כפתור .book-btn בסקשן המתאים ולוקחים ממנו את המחירים
        const btn = document.querySelector(`#${sectionId} .book-btn`);
        if (!btn) {
          alert('לא נמצא כפתור הזמנת טיפול בסקשן #' + sectionId);
          return;
        }

        const treatmentName = btn.dataset.treatment || label;
        const base  = Number(btn.dataset.base  || 0);
        const addon = Number(btn.dataset.addon || 0);

        if (!base) {
          alert('לא נמצא מחיר בסיס לטיפול הזה (data-base בכפתור .book-btn הוא 0 או חסר).');
          return;
        }

        // 3. שמירה ב-localStorage – כמו בכפתורי .book-btn
        const bookingMeta = {
          treatment:  treatmentName,
          base,
          addon,
          finalPrice: base,   // ברירת מחדל: בסיסי
          duration:   'base'
        };

        localStorage.setItem('bereshit_booking', JSON.stringify(bookingMeta));

        // 4. מעבר ל-checkout
        selectorModal.style.display = "none";
        window.location.href = 'checkout.html';
      });
    }

    openFromHash();
  });
})();
