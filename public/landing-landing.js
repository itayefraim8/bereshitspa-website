// ================================
// Utils
// ================================
const WHATSAPP_NUMBER = "972502686862";

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getLang() {
  return document.documentElement.lang || "he";
}

// ================================
// Signature Treatments Data
// ================================
const SIGNATURE_TREATMENTS = {
  "head-spa": {
    name: {
      he: "Japanese Head Spa | ספא ראש יפני",
      en: "Japanese Head Spa",
      ru: "Японский Head Spa",
      ka: "იაპონური Head Spa"
    },
    desc: {
      he: "טיפול יפני מסורתי לניקוי הקרקפת, עיסוי ממוקד ופינוק מים חמימים.",
      en: "Traditional Japanese scalp cleansing and massage therapy.",
      ru: "Традиционный японский уход за кожей головы.",
      ka: "ტრადიციული იაპონური სკალპის თერაპია."
    },
    price: "200₾",
    duration: "60 דק׳"
  },

  "body-vitamin-e": {
    name: {
      he: "Thai Vitamin E Cream Massage | עיסוי תאילנדי עם קרם ויטמין E",
      en: "Thai Vitamin E Cream Massage",
      ru: "Тайский массаж с кремом Vitamin E",
      ka: "ტაილანდური მასაჟი Vitamin E კრემით"
    },
    desc: {
      he: "עיסוי תאילנדי מזין לעור, מרגיע ומשפר גמישות.",
      en: "Nourishing Thai massage with Vitamin E cream.",
      ru: "Питательный тайский массаж с витамином E.",
      ka: "ტაილანდური მასაჟი კანის ღრმა კვებით."
    },
    price: "175₾",
    duration: "60 דק׳"
  },

  "body-thai-ther": {
    name: {
      he: "Thai Therapeutic Massage | עיסוי תאילנדי טיפולי",
      en: "Thai Therapeutic Massage",
      ru: "Терапевтический тайский массаж",
      ka: "თერაპიული ტაილანდური მასაჟი"
    },
    desc: {
      he: "עיסוי עומק ממוקד לכאבי גב, צוואר ושרירים תפוסים.",
      en: "Deep therapeutic Thai massage for pain relief.",
      ru: "Глубокий терапевтический массаж.",
      ka: "ღრმა თერაპიული მასაჟი."
    },
    price: "230₾",
    duration: "60 דק׳"
  },

  "body-sports": {
    name: {
      he: "Sports Massage | עיסוי ספורט",
      en: "Sports Massage",
      ru: "Спортивный массаж",
      ka: "სპორტული მასაჟი"
    },
    desc: {
      he: "עיסוי אינטנסיבי להתאוששות ומניעת פציעות.",
      en: "Intensive massage for recovery and injury prevention.",
      ru: "Интенсивный массаж для восстановления.",
      ka: "ინტენსიური მასაჟი აღდგენისთვის."
    },
    price: "240₾",
    duration: "60 דק׳"
  },

  "body-karsai": {
    name: {
      he: "Karsai Massage | עיסוי תאילנדי קארסאי",
      en: "Karsai Massage",
      ru: "Массаж Карсай",
      ka: "კარსაის მასაჟი"
    },
    desc: {
      he: "טיפול תאילנדי מתקדם לאיזון אנרגטי עמוק.",
      en: "Advanced Thai energy balancing treatment.",
      ru: "Продвинутый энергетический массаж.",
      ka: "ღრმა ენერგეტიკული თერაპია."
    },
    price: "260₾",
    duration: "60 דק׳"
  },

  "body-thai-comp": {
    name: {
      he: "Thai Herbal Compress Massage | עיסוי בקומפרסים צמחיים",
      en: "Thai Herbal Compress Massage",
      ru: "Тайский массаж с травяными компрессами",
      ka: "ტაილანდური მცენარეული კომპრესის მასაჟი"
    },
    desc: {
      he: "קומפרסים חמים עם צמחי מרפא תאילנדיים.",
      en: "Warm herbal compress Thai massage.",
      ru: "Теплый массаж травяными мешочками.",
      ka: "თბილი მცენარეული კომპრესები."
    },
    price: "220₾",
    duration: "60 דק׳"
  },

  "foot-reflexology": {
    name: {
      he: "Thai Reflexology Foot Massage | רפלקסולוגיה תאילנדית",
      en: "Thai Reflexology Foot Massage",
      ru: "Тайская рефлексология стоп",
      ka: "ტაილანდური ფეხის რეფლექსოლოგია"
    },
    desc: {
      he: "עיסוי כפות רגליים ממוקד עם לחיצות עמוקות.",
      en: "Focused Thai reflexology foot massage.",
      ru: "Глубокий массаж стоп.",
      ka: "ფეხის ღრმა მასაჟი."
    },
    price: "140₾",
    duration: "60 דק׳"
  }
};

// ================================
// Build Signature Slider
// ================================
function buildSignatureSlides(lang) {
  document.querySelectorAll(".signature-slide").forEach(slide => {
    const key = slide.dataset.treatmentKey;
    const data = SIGNATURE_TREATMENTS[key];
    if (!data) return;

    slide.querySelector(".signature-name").textContent = data.name[lang];
    slide.querySelector(".signature-desc").textContent = data.desc[lang];
    slide.querySelector(".signature-price").textContent = data.price;
    slide.querySelector(".signature-duration").textContent = data.duration;
  });
}

// ================================
// WhatsApp buttons
// ================================
function setupSignatureWhatsAppButtons() {
  document.querySelectorAll("[data-book-btn]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const key = btn.dataset.treatmentKey;
      const lang = getLang();
      const t = SIGNATURE_TREATMENTS[key];
      if (!t) return;

      const msg =
        `שלום 👋\n` +
        `אשמח להזמין:\n` +
        `${t.name[lang]}\n` +
        `משך: ${t.duration}\n` +
        `מחיר: ${t.price}`;

      window.open(waLink(msg), "_blank");
    });
  });
}

// ================================
// Signature Slider Logic
// ================================
function setupSignatureSlider() {
  const slider = document.getElementById("signatureSlider");
  if (!slider) return;

  const track = slider.querySelector(".signature-track");
  const slides = [...slider.querySelectorAll(".signature-slide")];
  const prev = slider.querySelector(".signature-nav.prev");
  const next = slider.querySelector(".signature-nav.next");

  let index = 0;

  function update() {
    track.style.transform = `translateX(${index * -100}%)`;
  }

  prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  next.onclick = () => {
    index = (index + 1) % slides.length;
    update();
  };
}

// ================================
// Init
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  buildSignatureSlides(lang);
  setupSignatureWhatsAppButtons();
  setupSignatureSlider();
});
