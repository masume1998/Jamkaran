'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuToggle = $('.menu-toggle');
const navigation = $('#navigation');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', open);
  navigation.classList.toggle('open', open);
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') === 'false'));
$$('a', navigation).forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    setMenu(false);
    menuToggle.focus();
  }
});
const goContact = () => { $('#contact').scrollIntoView(); };

const heroThumbs = $$('.hero-gallery button');
heroThumbs.forEach(button => button.addEventListener('click', () => {
  heroThumbs.forEach(thumb => thumb.setAttribute('aria-pressed', thumb === button));
  const image = $('#hero-photo');
  image.alt = button.getAttribute('aria-label');
  image.src = button.dataset.photo;
}));

const products = [
  {
    "key": "tem",
    "title": "سکوریت",
    "en": "Tempered Glass",
    "desc": "شیشه سکوریت از طریق فرآیند حرارتی ویژه تولید می‌شود که مقاومت آن را در برابر ضربه و تغییرات دمایی نسبت به شیشه معمولی افزایش می‌دهد. در صورت شکست، شیشه به قطعات کوچک‌تری تبدیل می‌شود که خطر آسیب‌دیدگی را کاهش می‌دهند.",
    "uses": [
      "درب‌های شیشه‌ای",
      "پارتیشن‌های اداری و تجاری",
      "ویترین فروشگاه‌ها",
      "فضاهای داخلی و معماری",
      "کاربردهای دکوراتیو متناسب با مشخصات پروژه"
    ],
    "gal": [
      "tem0",
      "tem1"
    ]
  },
  {
    "key": "lam",
    "title": "لمینت",
    "en": "Laminated Glass",
    "desc": "شیشه لمینت از اتصال دو یا چند لایه شیشه با یک لایه میانی ساخته می‌شود. لایه میانی پس از شکست، به نگه داشتن بخش زیادی از قطعات شیشه کمک می‌کند و بسته به ساختار محصول، می‌تواند به ایمنی و کاهش عبور صدا نیز کمک کند.",
    "uses": [
      "شیشه‌های ایمنی ساختمان",
      "نورگیرها و برخی سطوح شیشه‌ای بالاسری",
      "ویترین‌ها و فضاهای نیازمند نگه‌داری قطعات پس از شکست",
      "برخی کاربردهای معماری و دکوراسیون"
    ],
    "gal": [
      "lam0",
      "lam1"
    ]
  },
  {
    "key": "mir",
    "title": "آینه",
    "en": "Mirror",
    "desc": "آینه با بازتاب نور و تصویر، علاوه بر کاربرد روزمره، یکی از عناصر مهم در طراحی داخلی و دکوراسیون است. استفاده از آینه می‌تواند به افزایش روشنایی بصری و ایجاد حس عمق در فضا کمک کند.",
    "uses": [
      "دکوراسیون داخلی",
      "فضاهای مسکونی",
      "فروشگاه‌ها و فضاهای تجاری",
      "طراحی دیوارهای دکوراتیو",
      "پروژه‌های سفارشی معماری"
    ],
    "gal": [
      "mir0",
      "mir1"
    ]
  },
  {
    "key": "san",
    "title": "سندبلاست",
    "en": "Frosted Glass",
    "desc": "شیشه سندبلاست با ایجاد سطحی مات و نیمه‌شفاف، عبور نور را حفظ می‌کند و در عین حال دید مستقیم را محدود می‌سازد. این ویژگی آن را به گزینه‌ای کاربردی برای فضاهایی تبدیل می‌کند که به ترکیبی از نور و حریم خصوصی نیاز دارند.",
    "uses": [
      "پارتیشن و درب‌های داخلی",
      "فضاهای اداری و مسکونی که به حریم خصوصی نیاز دارند",
      "دکوراسیون داخلی و طرح‌های تزئینی"
    ],
    "gal": [
      "san0",
      "san1"
    ]
  },
  {
    "key": "print",
    "title": "چاپ سفارشی",
    "en": "Custom Printed Glass",
    "desc": "با چاپ طرح، تصویر و نقش دلخواه روی شیشه، جلوه‌ای متفاوت و اختصاصی به فضاهای معماری و دکوراسیون ببخشید. چاپ سفارشی امکان اجرای ایده‌های متنوع و هماهنگی شیشه با سبک طراحی پروژه شما را فراهم می‌کند.",
    "uses": [
      "دیوارپوش و فضاهای دکوراتیو",
      "پارتیشن و دکوراسیون داخلی",
      "ویترین و فضاهای تجاری",
      "پروژه‌های سفارشی معماری"
    ],
    "gal": [
      "print0",
      "print1"
    ]
  },
  {
    "key": "cut",
    "title": "برش با الگو",
    "en": "Pattern Cutting",
    "desc": "برای طرح‌هایی فراتر از ابعاد و فرم‌های استاندارد، برش شیشه بر اساس الگوی موردنظر شما انجام می‌شود. این قابلیت امکان اجرای فرم‌های خاص و جزئیات سفارشی را در پروژه‌های دکوراتیو و معماری فراهم می‌کند.",
    "uses": [
      "میز و مبلمان شیشه‌ای با فرم خاص",
      "آینه و شیشه‌های دکوراتیو",
      "پروژه‌های سفارشی معماری"
    ],
    "gal": [
      "cut0",
      "cut1"
    ]
  },
  {
    "key": "diamond",
    "title": "پرداخت دیاموند",
    "en": "Diamond Edge Polish",
    "desc": "پرداخت لبه شیشه، علاوه بر ایجاد ظاهری تمیز و دقیق، متناسب با نوع کاربرد و طراحی پروژه انتخاب می‌شود.",
    "uses": [
      "لبه آینه و شیشه‌های دکوراتیو",
      "میز و مبلمان شیشه‌ای",
      "درب و پارتیشن",
      "شیشه‌هایی که لبه آن‌ها در معرض دید است"
    ],
    "gal": [
      "diamond0",
      "diamond1"
    ]
  }
];
const gallery = {
  "tem0": "assets/32b577a22c25e53b.jpg",
  "tem1": "assets/c768cb9d407b700f.jpg",
  "lam0": "assets/8f0bc36bf5db2e2d.jpg",
  "lam1": "assets/bb7aa11276363a68.jpg",
  "mir0": "assets/29ced426beb54c07.jpg",
  "mir1": "assets/4b1b2d9c9e5b15b9.jpg",
  "san0": "assets/23ad4d0db2d76f51.jpg",
  "san1": "assets/1c0e075e1546912c.jpg",
  "print0": "assets/13334f11c4de0a39.jpg",
  "print1": "assets/4b112613133d09fc.jpg",
  "cut0": "assets/4bd65123beed392a.jpg",
  "cut1": "assets/957c654bcc83126b.jpg",
  "diamond0": "assets/b9e900ed88b7928e.jpg",
  "diamond1": "assets/76bd3915235811fc.jpg"
};
const specImages = ["assets/774b36bb7109e28b.png", "assets/b8446af4c18ef5f6.png", "assets/c0489bc812db7096.png", "assets/dbec2d7f8d86a31c.png", "assets/a2d95db6a06c2bd6.png"];
const dialog = $('#product-dialog');
const productPhoto = $('#product-photo');
const galleryControls = $('#product-gallery');
$$('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products[Number(button.dataset.product)];
  $('#product-name').textContent = product.title;
  $('#product-english').textContent = product.en;
  $('#product-description').textContent = product.desc;
  $('#product-uses').replaceChildren(...product.uses.map(use => {
    const item = document.createElement('li');
    item.textContent = use;
    return item;
  }));
  galleryControls.replaceChildren();
  const thumbnails = product.gal.map((id, index) => {
    const thumb = document.createElement('button');
    const image = document.createElement('img');
    image.src = gallery[id];
    image.alt = '';
    thumb.setAttribute('aria-label', 'نمای ' + (index + 1).toLocaleString('fa-IR'));
    thumb.append(image);
    galleryControls.append(thumb);
    thumb.addEventListener('click', () => selectPhoto(index));
    return thumb;
  });
  function selectPhoto(index) {
    productPhoto.src = gallery[product.gal[index]];
    productPhoto.alt = product.title + '، نمای ' + (index + 1).toLocaleString('fa-IR');
    thumbnails.forEach((thumb, i) => thumb.setAttribute('aria-pressed', i === index));
  }
  selectPhoto(0);
  dialog.showModal();
}));
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const specs = $$('.sp');
specs.forEach((detail, index) => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  specs.forEach(item => { if (item !== detail) item.open = false; });
  $('#spi').style.backgroundImage = 'url(' + specImages[index] + ')';
  $('#spcap').textContent = $('summary', detail).textContent;
}));

(() => {
  /* ---------- تخمین قیمت (قیمت‌ها از لیست قیمت مجموعه؛ میلیون ریال به ازای هر متر مربع) ---------- */
  const THICK = [5, 6, 8, 10];
  const NA = null;
  /* قیمت‌ها از لیست قیمت مجموعه (میلیون ریال به ازای هر متر مربع) */
  const GLASS = { n: [13, 16, 20, 22], s: [NA, 17, NA, 24], b: [NA, 19, NA, NA], d: [NA, 22, NA, 35], k: [34, 37, 39.5, 43], pw: [NA, 41, NA, 47] };
  const TEMPER_PLAIN = [3.75, 4.4, 5.6, 7.1];
  const TEMPER_PRINT = [21.5, 22, 24.5, 27];
  const DIAMOND = [.63, .7, .88, 1];
  const FILM = [['۰/۳۸', 35], ['۰/۵۰', NA], ['۰/۷۶', 45], ['۱/۵۲', 65]];
  const TYPES = ['معمولی', 'سوپرکلیر', 'آینه', 'لاکوبل'];
  /* رنگ‌بندی ثابت است؛ فقط گزینه‌های نامناسب برای هر نوع شیشه غیرفعال می‌شوند */
  const COLORS = ['سفید', 'تینت برنز', 'تینت دودی', 'تینت مشکی', 'تینت طلایی', 'تینت رز گلد', 'مشکی', 'رنگ سفارشی'];
  const COLOR_OK = [[0, 1, 2, 3], [0], [0, 1, 3, 4, 5], [6, 0, 7]];
  const GLASS_KEY = [{ 0: 'n', 1: 'b', 2: 'd' }, { 0: 's' }, {}, { 6: 'k', 0: 'pw' }];
  const MIRROR_THICK = [1]; /* آینه: ۶ میلی‌متر */
  const CUT_SURCHARGE = .15; /* برش بر اساس الگو: ۱۵٪ افزایش قیمت شیشه */
  const RIAL_TO_TOMAN = 1e5; /* میلیون ریال → تومان */
  const fa = n => Math.round(n).toLocaleString('fa-IR');
  const measure = n => n.toLocaleString('fa-IR', { maximumSignificantDigits: 6 });

  const est = $('.ec');
  const E = id => $('#' + id, est);
  const inv = $('.inv', est);
  const S = { src: 0, w: 0, h: 0, q: 1, th: 1, co: 0, ty: 0, sv: {}, lt: 0, ll: 0, lf: 0 };
  const typeBtns = $$('#ety button', est);
  const srcBtns = $$('#esrc button', est);
  srcBtns.forEach((b, i) => b.addEventListener('click', () => { S.src = i; calc(); }));
  const FREE_KEYS = ['سکوریت', 'برش بر اساس الگو', 'دیاموند', 'چاپ سفارشی'];
  $$('#esv label', est).forEach(l => { const sm = l.querySelector('small'); sm.dataset.o = sm.textContent; });
  const ltBtns = $$('#lt button', est), llBtns = $$('#ll button', est), lfBtns = $$('#lf button', est);
  const ticks = $$('#tk span', est);

  const colorBox = E('eco');
  colorBox.innerHTML = '';
  colorBox.className = 'seg cs';
  const colorBtns = COLORS.map((name, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = name.replace(/^تینت\s*/, '');
    b.addEventListener('click', () => { if (!b.disabled) { S.co = i; calc(); } });
    colorBox.append(b);
    return b;
  });

  const normalizeDigits = value => value.trim()
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[٫،,]/g, '.');
  function readNumber(id, whole = false) {
    const value = normalizeDigits(E(id).value);
    const format = whole ? /^\d+$/ : /^(?:\d+(?:\.\d*)?|\.\d+)$/;
    const number = Number(value);
    return format.test(value) && Number.isFinite(number) && number > 0 && (!whole || Number.isSafeInteger(number)) ? number : 0;
  }
  ['eh', 'ew', 'eq'].forEach(id => E(id).addEventListener('input', () => {
    S.h = readNumber('eh');
    S.w = readNumber('ew');
    S.q = readNumber('eq', true);
    calc();
  }));
  E('eth').addEventListener('input', e => { S.th = +e.target.value; calc(); });
  ticks.forEach((t, i) => {
    t.setAttribute('role', 'button');
    t.tabIndex = 0;
    const pick = () => { if (!t.classList.contains('dis')) { S.th = i; calc(); } };
    t.addEventListener('click', pick);
    t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });
  typeBtns.forEach((b, i) => b.addEventListener('click', () => {
    S.ty = i;
    if (!COLOR_OK[i].includes(S.co)) S.co = COLOR_OK[i][0];
    calc();
  }));
  ltBtns.forEach((b, i) => b.addEventListener('click', () => { S.lt = i; if (S.sv['لمینت']) S.th = i; calc(); }));
  llBtns.forEach((b, i) => b.addEventListener('click', () => { S.ll = i; calc(); }));
  lfBtns.forEach((b, i) => b.addEventListener('click', () => { S.lf = i; calc(); }));
  $$('#esv input[type=checkbox]', est).forEach(c => c.addEventListener('change', () => {
    S.sv[c.dataset.k] = c.checked;
    c.closest('.sv3').classList.toggle('on', c.checked);
    E('lo').classList.toggle('on', !!S.sv['لمینت']);
    calc();
  }));
  $('.dt', est).addEventListener('click', () => {
    const expanded = inv.classList.toggle('open');
    $('.dt', est).setAttribute('aria-expanded', expanded);
  });
  $('button.pr', est).addEventListener('click', goContact);

  function selectOption(button, active) {
    button.classList.toggle('on', active);
    button.setAttribute('aria-pressed', active);
  }

  function calc() {
    const laminated = !!S.sv['لمینت'], mirror = S.ty === 2;
    if (mirror && !MIRROR_THICK.includes(S.th)) S.th = 1;
    if (laminated) { S.th = Math.min(1, Math.max(0, S.th)); if (mirror) S.th = 1; S.lt = S.th; }
    E('eth').disabled = mirror;
    E('eth').max = laminated ? 1 : 3;
    E('eth').value = S.th;
    const th = S.th, idx = th;
    const area = S.w / 100 * (S.h / 100) * S.q, perimeter = 2 * (S.w + S.h) / 100 * S.q;
    const rows = [];
    let total = 0, glassValue = null;
    const add = (label, detail, value, note) => { rows.push([label, detail, value, note]); if (value) total += value; };
    const own = S.src === 1;

    typeBtns.forEach((b, i) => selectOption(b, i === S.ty));
    colorBtns.forEach((b, i) => { selectOption(b, i === S.co); b.disabled = !COLOR_OK[S.ty].includes(i); });
    [[ltBtns, S.lt], [llBtns, S.ll], [lfBtns, S.lf]].forEach(([btns, on]) => btns.forEach((b, i) => selectOption(b, i === on)));
    ticks.forEach((t, i) => {
      const disabled = (laminated && i > 1) || (mirror && !MIRROR_THICK.includes(i));
      t.classList.toggle('on', i === th);
      t.classList.toggle('dis', disabled);
      t.setAttribute('aria-disabled', disabled);
      t.setAttribute('aria-pressed', i === th);
      t.tabIndex = disabled ? -1 : 0;
    });
    E('eth').style.setProperty('--p', (th / 3 * 100) + '%');
    E('eth').setAttribute('aria-valuetext', fa(THICK[th]) + ' میلی‌متر');
    E('ewarn').textContent = ['eh', 'ew', 'eq'].some(id => E(id).value.trim() && !readNumber(id, id === 'eq'))
      ? 'طول و عرض باید عدد مثبت و تعداد باید عدد صحیح مثبت باشد.' : '';
    srcBtns.forEach((b, i) => selectOption(b, i === S.src));
    ltBtns[0].disabled = mirror;
    E('esvn').textContent = own ? 'اجرت سکوریت، برش، دیاموند و چاپ برای شیشه خام شما جدا محاسبه می‌شود' : 'سکوریت، برش، دیاموند و چاپ برای شیشه‌ای که از جام‌کاران می‌خرید پیش‌فرض و بدون اجرت انجام می‌شود';
    $$('#esv label', est).forEach(l => { const k = l.querySelector('input').dataset.k, sm = l.querySelector('small'); sm.textContent = (!own && FREE_KEYS.includes(k)) ? 'بدون اجرت' : sm.dataset.o; });

    const valid = area > 0 && Number.isFinite(area) && Number.isFinite(perimeter) && Number.isFinite(Math.max(area, perimeter) * 1e9);
    if (valid) {
      const key = GLASS_KEY[S.ty][S.co];
      const price = idx >= 0 && key ? GLASS[key][idx] : null;
      const sheets = laminated ? (S.ll ? 3 : 2) : 1;
      const refValue = price ? area * price * RIAL_TO_TOMAN * sheets : null;
      glassValue = own ? null : refValue;
      if (own) add('شیشه خام (تأمین‌شده توسط مشتری) — ' + TYPES[S.ty] + '، ' + fa(THICK[th]) + ' میلی‌متر', measure(area) + ' متر مربع', 0, 'بدون هزینه شیشه');
      else add('شیشه ' + TYPES[S.ty] + ' — ' + COLORS[S.co] + '، ' + fa(THICK[th]) + ' میلی‌متر',
        measure(area) + ' متر مربع' + (sheets > 1 ? ' × ' + fa(sheets) + ' شیشه' : ''), glassValue);
      Object.keys(S.sv).filter(k => S.sv[k]).forEach(k => {
        let value = null, detail = '';
        if (k === 'سکوریت') {
          const fee = idx >= 0 ? (S.ty === 3 ? TEMPER_PRINT : TEMPER_PLAIN)[idx] : null;
          value = fee ? area * fee * RIAL_TO_TOMAN : null; detail = measure(area) + ' متر مربع';
        } else if (k === 'لمینت') {
          const film = FILM[S.lf][1];
          value = film ? area * film * RIAL_TO_TOMAN : null;
          detail = 'طلق ' + FILM[S.lf][0] + '، ' + (S.ll ? '۳' : '۲') + ' لایه، ' + (S.lt ? '۶' : '۵') + ' میلی‌متر';
        } else if (k === 'دیاموند') {
          const fee = idx >= 0 ? DIAMOND[idx] : null;
          value = fee ? perimeter * fee * RIAL_TO_TOMAN : null; detail = measure(perimeter) + ' متر لبه';
        } else if (k === 'برش بر اساس الگو') {
          value = refValue ? refValue * CUT_SURCHARGE : null;
          detail = '۱۵٪ افزایش قیمت شیشه';
        }
        if (!own && FREE_KEYS.includes(k)) { add('خدمات جانبی — ' + k, detail, 0, 'بدون اجرت'); return; }
        add('خدمات جانبی — ' + k, detail, value);
      });
    }
    const pending = rows.some(row => row[2] === null);
    E('pr').textContent = valid ? (pending && !total ? 'پس از استعلام' : fa(total)) : '—';
    E('unit').hidden = !valid || (pending && !total);
    $('.bc small', est).textContent = pending && total ? 'مبلغ بخش‌های قابل محاسبه' : 'قیمت حدودی';
    if (pending) E('ewarn').textContent = 'قیمت بعضی از موارد پس از استعلام مشخص می‌شود.';
    inv.innerHTML = valid
      ? rows.map((r, i) => `<div class="ir" style="--i:${i}"><span>${r[0]}<small>${r[1]}</small></span><b>${r[3] ? r[3] : r[2] ? fa(r[2]) + ' تومان' : 'پس از استعلام'}</b></div>`).join('') +
        `<div class="ir tot" style="--i:${rows.length}"><span>${pending ? "مبلغ بخش‌های قابل محاسبه" : "جمع کل (تخمینی)"}</span><b>${pending && !total ? "پس از استعلام" : fa(total) + " تومان"}</b></div>`
      : '<div class="ir"><span>طول و عرض را وارد کنید تا فاکتور تخمینی نمایش داده شود.</span></div>';
  }
  calc();

  /* ---------- تب‌ها: تخمین قیمت / مشاور انتخاب شیشه ---------- */
  const tabs = $$('.etabs .tab');
  function showTab(t) {
    tabs.forEach(b => {
      const active = b.dataset.t === t;
      b.classList.toggle('on', active);
      b.setAttribute('aria-selected', active);
      b.tabIndex = active ? 0 : -1;
    });
    $('#pane-calc').classList.toggle('on', t === 'calc');
    $('#pane-adv').classList.toggle('on', t === 'adv');
  }
  tabs.forEach((b, index) => {
    const panel = $('#pane-' + b.dataset.t);
    b.id = 'tab-' + b.dataset.t;
    b.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', b.id);
    b.addEventListener('click', () => showTab(b.dataset.t));
    b.addEventListener('keydown', event => {
      const indices = { ArrowLeft: 1 - index, ArrowRight: 1 - index, Home: 0, End: 1 };
      if (!(event.key in indices)) return;
      event.preventDefault();
      const next = tabs[indices[event.key]];
      showTab(next.dataset.t);
      next.focus();
    });
  });
  showTab('calc');

  /* ---------- مشاور انتخاب شیشه (منطق قانون‌محور؛ همه‌چیز روی دستگاه کاربر اجرا می‌شود) ---------- */
  const SIZE_TH = [{ mm: 6, th: 1 }, { mm: 8, th: 2 }, { mm: 10, th: 3 }];
  function recommendAdvisor(use, size, pri) {
    const t = SIZE_TH[size], mm = fa(t.mm);
    const big = size === 2 && ![3, 5, 6].includes(use);
    let r;
    if (use === 6) r = { title: 'لمینت ۶ میل، ۲ لایه + سکوریت', line: 'شیشه چندلایه که بعد از شکست در جای خودش می‌ماند.', reasons: ['بعد از شکست، قطعات سر جایش می‌ماند', 'برای سقف و نورگیر، ایمنی در اولویت است'], warn: 'ابعاد و بار سقف را با کارشناس بررسی کنید.', ap: { ty: 0, th: 1, sv: ['لمینت', 'سکوریت'] } };
    else if (use === 5) r = { title: 'لمینت ۶ میل، ۲ لایه + سکوریت', line: 'شیشه چندلایه و ایمن برای جان‌پناه.', reasons: ['برای جان‌پناه، ایمنی بعد از شکست مهم است', 'دید باز می‌ماند و فضا بسته نمی‌شود'], warn: size === 2 ? 'ابعاد بزرگ است؛ نصب و مهار جان‌پناه را با کارشناس بررسی کنید.' : '', ap: { ty: 0, th: 1, sv: ['لمینت', 'سکوریت'] } };
    else if (use === 3) r = { title: 'آینه ۶ میل', line: 'آینه برای دکور و فضاهای داخلی.', reasons: ['بازتاب نور و حس عمق بیشتر', 'برای دکور و دیوار دکوراتیو مناسب است'], warn: 'قیمت آینه در تخمین قیمت نیست و پس از استعلام اعلام می‌شود.', ap: { ty: 2, th: 1, sv: [] } };
    else if (use === 2 || use === 1) {
      const privacy = pri === 2;
      r = privacy
        ? { title: `سکوریت سندبلاست (${mm} میل)`, line: 'شیشه مات و مقاوم که نور را عبور می‌دهد.', reasons: use === 2 ? ['نور می‌گذرد ولی دید مستقیم محدود است', 'مقاوم در برابر ضربه و تغییر دما'] : ['نور می‌گذرد و حریم خصوصی حفظ می‌شود', 'برای پارتیشن و درب داخلی مناسب است'], ap: { ty: 0, th: t.th, sv: ['سندبلاست'] } }
        : { title: `سکوریت شفاف (${mm} میل)`, line: 'شیشه شفاف و مقاوم در برابر ضربه و گرما.', reasons: use === 2 ? ['مقاوم در برابر ضربه و تغییر دما', 'بعد از شکست به قطعات کوچک‌تر تبدیل می‌شود'] : ['تفکیک فضا بدون حس بسته و سنگین', 'مقاوم در برابر ضربه و تغییر دما'], ap: { ty: 0, th: t.th, sv: [] } };
    } else if (use === 4) r = { title: `سکوریت سوپرکلیر (${mm} میل)`, line: 'شیشه خیلی شفاف با ته‌رنگ سبز کمتر.', reasons: ['شفافیت بیشتر و ته‌رنگ سبز کمتر', 'رنگ کالا طبیعی‌تر دیده می‌شود'], ap: { ty: 1, th: t.th, sv: [] } };
    else if (use === 7) r = { title: `سکوریت (${mm} میل) + دیاموند`, line: 'شیشه مقاوم با لبه پرداخت‌شده.', reasons: ['مقاوم در برابر ضربه', 'لبه پرداخت‌شده، تمیز و دقیق'], ap: { ty: 0, th: t.th, sv: ['دیاموند'] } };
    else if (pri === 1) r = { title: `سکوریت سوپرکلیر (${mm} میل)`, line: 'شیشه خیلی شفاف با ته‌رنگ سبز کمتر.', reasons: ['شفافیت بیشتر و ته‌رنگ سبز کمتر', 'دید بازتر و نور بیشتر'], ap: { ty: 1, th: t.th, sv: [] } };
    else r = { title: `سکوریت (${mm} میل)`, line: 'شیشه شفاف و ایمن برای پنجره و نما.', reasons: pri === 3 ? ['ترکیب زیبایی و ایمنی', 'ارزان‌تر از سوپرکلیر، با همان ایمنی'] : ['ترکیب زیبایی و ایمنی'], ap: { ty: 0, th: t.th, sv: [] } };
    r.reasons = r.reasons.slice(0, 2);
    r.warns = [r.warn, big ? 'برای ابعاد بالای ۲ مترمربع، ضخامت ۱۰ میل پیشنهاد می‌شود؛ شیشه ۴ میل برای این ابعاد مناسب نیست.' : ''].filter(Boolean);
    return r;
  }

  const answers = { use: null, size: null, pri: null };
  let lastRec = null;
  function advise() {
    if (answers.use === null || answers.size === null || answers.pri === null) return;
    const r = lastRec = recommendAdvisor(answers.use, answers.size, answers.pri), box = $('#ares');
    box.hidden = false;
    box.innerHTML = `<div class="rt">پیشنهاد ما: ${r.title}</div><p class="rl">${r.line}</p><ul>${r.reasons.map(x => `<li>${x}</li>`).join('')}</ul>${r.warns.map(w => `<p class="rw">${w}</p>`).join('')}<div class="ra"><button type="button" class="ra-main" id="advApply">تخمین قیمت با همین مشخصات</button><button type="button" class="ra-alt" id="advCopy">کپی نتیجه مشاور</button></div>`;
    $('#advApply').addEventListener('click', applyAdvice);
    $('#advCopy').addEventListener('click', copyAdvice);
    box.classList.remove('pop'); void box.offsetWidth; box.classList.add('pop');
  }
  $$('.advisor .chips').forEach(box => $$('button', box).forEach((b, i) => b.addEventListener('click', () => {
    answers[box.dataset.q] = i;
    $$('button', box).forEach((x, j) => selectOption(x, j === i));
    advise();
  })));

  function applyAdvice() {
    if (!lastRec) return;
    const a = lastRec.ap;
    S.ty = a.ty; S.co = 0; S.th = a.th; S.sv = {};
    $$('#esv input[type=checkbox]', est).forEach(c => {
      const on = a.sv.includes(c.dataset.k);
      c.checked = on; S.sv[c.dataset.k] = on;
      c.closest('.sv3').classList.toggle('on', on);
    });
    E('lo').classList.toggle('on', !!S.sv['لمینت']);
    if (S.sv['لمینت']) { S.lt = 1; S.ll = 0; S.lf = 0; }
    calc();
    showTab('calc');
    $('#tab-calc').focus({ preventScroll: true });
    $('#est').scrollIntoView();
  }
  function copyAdvice() {
    if (!lastRec) return;
    const text = `مشاور جام‌کاران: ${lastRec.title} — ${lastRec.reasons.join('؛ ')}${lastRec.warns.length ? ' — ' + lastRec.warns.join(' ') : ''}`;
    const b = $('#advCopy');
    const done = () => { b.textContent = 'کپی شد ✓'; setTimeout(() => { b.textContent = 'کپی نتیجه مشاور'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => window.prompt('متن را کپی کنید:', text));
    else window.prompt('متن را کپی کنید:', text);
  }

})();
