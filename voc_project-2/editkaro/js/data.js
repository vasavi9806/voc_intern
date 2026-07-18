/* ==========================================================================
   EDITKARO.IN — content data
   Replace thumb/video values with real client assets when available.
   thumb: any image URL. video: a YouTube video ID used for the modal preview
   (defaults to a royalty-free sample reel — swap in the real client link).
   ========================================================================== */
window.EK_CATEGORIES = [
  { slug: "short-form", label: "Short Form" },
  { slug: "long-form", label: "Long Form" },
  { slug: "gaming", label: "Gaming Videos" },
  { slug: "football", label: "Football Edits" },
  { slug: "ecommerce", label: "eCommerce Ads" },
  { slug: "documentary", label: "Documentary Style" },
  { slug: "color-grading", label: "Color Grading" },
  { slug: "anime", label: "Anime Videos" },
  { slug: "ads", label: "Ads" }
];

var SAMPLE_VIDEO = "aqz-KE-bpKQ"; // placeholder reel — swap per project

window.EK_PROJECTS = [
  { id: 1, title: "Late Night Study Hacks", category: "short-form", aspect: "vertical", seed: "ek-sf-1", client: "StudySprint", video: SAMPLE_VIDEO },
  { id: 2, title: "3 Second Hook Series", category: "short-form", aspect: "vertical", seed: "ek-sf-2", client: "Bloomwear", video: SAMPLE_VIDEO },
  { id: 3, title: "Day in the Life — Founder Cut", category: "short-form", aspect: "vertical", seed: "ek-sf-3", client: "Nomad Roast Co.", video: SAMPLE_VIDEO },

  { id: 4, title: "The Bootstrapped Files, Ep. 4", category: "long-form", aspect: "wide", seed: "ek-lf-1", client: "Founders Weekly", video: SAMPLE_VIDEO },
  { id: 5, title: "Building in Public — Full Talk", category: "long-form", aspect: "wide", seed: "ek-lf-2", client: "DevSouth Conf", video: SAMPLE_VIDEO },

  { id: 6, title: "Ranked Grind Montage", category: "gaming", aspect: "vertical", seed: "ek-gm-1", client: "Vex Esports", video: SAMPLE_VIDEO },
  { id: 7, title: "Boss Fight Highlight Reel", category: "gaming", aspect: "wide", seed: "ek-gm-2", client: "Nightfall Studios", video: SAMPLE_VIDEO },
  { id: 8, title: "Squad Wipe Compilation", category: "gaming", aspect: "vertical", seed: "ek-gm-3", client: "Vex Esports", video: SAMPLE_VIDEO },

  { id: 9, title: "Matchday Recap — Derby Week", category: "football", aspect: "wide", seed: "ek-fb-1", client: "United Turf FC", video: SAMPLE_VIDEO },
  { id: 10, title: "Golazo Compilation Vol. 9", category: "football", aspect: "vertical", seed: "ek-fb-2", client: "Kickabout League", video: SAMPLE_VIDEO },

  { id: 11, title: "Sneaker Drop — 15 Sec Cutdown", category: "ecommerce", aspect: "vertical", seed: "ek-ec-1", client: "Solestride", video: SAMPLE_VIDEO },
  { id: 12, title: "Unboxing to Add-to-Cart Ad", category: "ecommerce", aspect: "vertical", seed: "ek-ec-2", client: "Bloomwear", video: SAMPLE_VIDEO },
  { id: 13, title: "Product Hero Loop", category: "ecommerce", aspect: "wide", seed: "ek-ec-3", client: "Northwick Home", video: SAMPLE_VIDEO },

  { id: 14, title: "Voices of the Old Quarter", category: "documentary", aspect: "wide", seed: "ek-doc-1", client: "Independent Release", video: SAMPLE_VIDEO },
  { id: 15, title: "The Last Print Shop", category: "documentary", aspect: "wide", seed: "ek-doc-2", client: "Heritage Films Co.", video: SAMPLE_VIDEO },

  { id: 16, title: "Golden Hour Grade Study", category: "color-grading", aspect: "wide", seed: "ek-cg-1", client: "Lumen Weddings", video: SAMPLE_VIDEO },
  { id: 17, title: "Teal & Amber Travel Grade", category: "color-grading", aspect: "vertical", seed: "ek-cg-2", client: "Wander Studio", video: SAMPLE_VIDEO },

  { id: 18, title: "Ronin: Episode 1 AMV", category: "anime", aspect: "wide", seed: "ek-an-1", client: "Fan Project", video: SAMPLE_VIDEO },
  { id: 19, title: "Sakura Arc Recap Edit", category: "anime", aspect: "vertical", seed: "ek-an-2", client: "OtakuVerse", video: SAMPLE_VIDEO },

  { id: 20, title: "App Launch — 30 Sec Spot", category: "ads", aspect: "wide", seed: "ek-ad-1", client: "Fintra App", video: SAMPLE_VIDEO },
  { id: 21, title: "Festive Sale Teaser", category: "ads", aspect: "vertical", seed: "ek-ad-2", client: "Northwick Home", video: SAMPLE_VIDEO }
];

// Placeholder team — replace with real photos/bios any time.
window.EK_TEAM = [
  { name: "Ariana Kessler", role: "Founder & Creative Director", img: "https://i.pravatar.cc/400?img=47" },
  { name: "Rohan Malhotra", role: "Head of Video Editing", img: "https://i.pravatar.cc/400?img=13" },
  { name: "Priya Anand", role: "Social Media Strategist", img: "https://i.pravatar.cc/400?img=32" },
  { name: "Diego Fuentes", role: "Motion Designer", img: "https://i.pravatar.cc/400?img=51" },
  { name: "Naomi Okoye", role: "Colorist", img: "https://i.pravatar.cc/400?img=25" },
  { name: "Kabir Sen", role: "Paid Ads Lead", img: "https://i.pravatar.cc/400?img=60" },
  { name: "Elena Petrova", role: "Client Success Manager", img: "https://i.pravatar.cc/400?img=45" },
  { name: "Yusuf Rahman", role: "Sound Designer", img: "https://i.pravatar.cc/400?img=68" }
];
