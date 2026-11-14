/* جام‌کاران جهان‌دیده — رفتار تعاملی سایت */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IMG = {
  "h0": "assets/img-44c811d308.jpg",
  "h1": "assets/img-e57233377e.jpg",
  "h2": "assets/img-d57ebc9587.jpg",
  "h3": "assets/img-dfc5db2e59.jpg",
  "h4": "assets/img-97838fbb65.jpg",
  "tem": "assets/img-eb8e34ba81.jpg",
  "lam": "assets/img-a95549d4c8.jpg",
  "san": "assets/img-e6fdcb9295.jpg",
  "mir": "assets/img-aa43724e11.jpg",
  "p0": "assets/img-50522feea6.png",
  "p1": "assets/img-49c3ba7b10.png",
  "p2": "assets/img-ff0a5f490e.png",
  "p3": "assets/img-01bfe23cad.png",
  "v0": "assets/img-ae834eef21.jpg",
  "v1": "assets/img-793fd24ca8.jpg",
  "v2": "assets/img-576c1eeff9.jpg",
  "ab": "assets/img-1a2aaad882.jpg",
  "bg": "assets/img-71dd236196.jpg"
};
  const GAL = {
  "a1594": "assets/img-3fff09587c.jpg",
  "l2211": "assets/img-254a66baf8.jpg",
  "l1610": "assets/img-7f039ad691.jpg",
  "l2034": "assets/img-3f588976da.jpg",
  "l2035": "assets/img-7ec9af9818.jpg",
  "l2040": "assets/img-a85b47892f.jpg",
  "l2212": "assets/img-abd900315b.jpg",
  "l2213": "assets/img-003067c5c5.jpg",
  "s2067": "assets/img-24c1565ace.jpg",
  "s2070": "assets/img-46d5bc641d.jpg",
  "s2208": "assets/img-b373a20751.jpg",
  "s2209": "assets/img-f0f05d00ca.jpg",
  "s2210": "assets/img-18f784c82b.jpg",
  "m2107": "assets/img-d36520d56b.jpg",
  "m2193": "assets/img-e6c926d5af.jpg",
  "m2207": "assets/img-3bae283575.jpg"
};
  const GALLERY = {
  "tem": [
    "a1594",
    "l2211",
    "l2212",
    "l2213"
  ],
  "lam": [
    "l2211",
    "l1610",
    "l2034",
    "l2035",
    "l2040",
    "l2212",
    "l2213"
  ],
  "san": [
    "s2067",
    "s2070",
    "s2208",
    "s2209",
    "s2210"
  ],
  "mir": [
    "m2107",
    "m2193",
    "m2207"
  ]
};

  /* ---------- تصاویر پس‌زمینه‌ای که از طریق CSS inline می‌آیند ---------- */
  const setBg = (el, src) => { el.style.backgroundImage = `url(${src})`; };
  /* تصویر کارت‌ها: اگر نسبت عکس با کارت تفاوت زیادی داشته باشد، کامل و بدون برش با پس‌زمینه‌ی تار نمایش داده می‌شود */
  function fitCard(el, src) {
    const img = new Image();
    img.onload = () => {
      const card = el.closest('.card');
      const target = card.clientWidth / card.clientHeight;
      if (Math.abs(img.naturalWidth / img.naturalHeight / target - 1) > .3) {
        el.classList.add('fit');
        el.style.setProperty('--bg', `url(${src})`);
      } else setBg(el, src);
    };
    img.src = src;
  }
  $$('.card .im').forEach((e, i) => fitCard(e, IMG[['tem', 'lam', 'san', 'mir'][i]]));
  $$('#th > div').forEach((e, i) => setBg(e, IMG['h' + i]));
  $$('.sl').forEach((e, i) => setBg(e, IMG['v' + i]));
  setBg($('.ph'), IMG.ab);
  setBg($('.wbg'), IMG.bg);

  /* ---------- هدر، ناوبری و دکمه‌ی شناور ارتباط ---------- */
  const header = $('#hd');
  const contactBtn = $('#contactBtn');
  const contact = $('#contact');
  const spy = ['about', 'prod', 'est', 'faq'].map(id => [id, document.getElementById(id)]);
  const why = $('.why');
  const reasons = $$('.r', why);

  function revealReasons() {
    const r = why.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight * .6)));
    reasons.forEach((e, i) => e.classList.toggle('on', p >= i / reasons.length * .9 + .05));
    const shown = reasons.filter(e => e.classList.contains('on')).length;
    reasons.forEach((e, i) => e.classList.toggle('cur', shown > 0 && i === shown - 1));
    $('#wn').textContent = '۰' + Math.max(1, shown).toLocaleString('fa-IR');
    $('.wbar u').style.width = (shown / reasons.length * 100) + '%';
  }

  function onScroll() {
    header.classList.toggle('sc', scrollY > 60);
    contactBtn.classList.toggle('side', scrollY > 140);
    const atContact = contact.getBoundingClientRect().top < innerHeight * .85;
    contactBtn.classList.toggle('gone', atContact);
    if (atContact || scrollY <= 140) contactBtn.classList.remove('open');
    let current = '';
    spy.forEach(([id, el]) => { if (el.getBoundingClientRect().top < innerHeight * .4) current = id; });
    if (contact.getBoundingClientRect().top < innerHeight * .4) current = '';
    $$('nav a').forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + current));
    revealReasons();
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const goContact = () => contact.scrollIntoView({ behavior: 'smooth' });
  contactBtn.addEventListener('click', e => {
    if (e.target.closest('.mi')) return;
    if (contactBtn.classList.contains('side')) contactBtn.classList.toggle('open');
    else goContact();
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('#contactBtn')) contactBtn.classList.remove('open');
  });

  /* ---------- اسلایدر اول ---------- */
  const SLIDES = [
    ['شیشه سکوریت؛ ترکیب زیبایی و ایمنی', 'راهکاری مدرن برای فضاهای معماری و ساختمانی، با ظاهری یکپارچه و شفافیت چشم نواز.', 'نمای ساختمان', 'شیشه های پنجره'],
    ['شفافیت بیشتر، دید بازتر', 'شیشه های مناسب نرده و جان‌پناه برای بالکن، تراس و راه‌پله؛ با حفظ جلوه مدرن، فضا و دید بصری باز.', 'تامین ایمنی', 'جان پناه'],
    ['فضاهای روشن با طراحی یکپارچه', 'انتخابی کاربردی برای دفاتر، محیط های تجاری و فضاهای داخلی؛برای تفکیک فضا بدون حس بسته و سنگین.', 'پارتیشن', 'شخصی سازی فضا'],
    ['جزئیاتی که طراحی را کامل می کنند', 'شیشه برای میز، ویترین و اجزای دکوراتیو؛ با امکان انتخاب رنگ، ضخامت و پرداخت لبه متناسب با طرح و نیاز پروژه.', 'دکوراسیون', 'مبلمان'],
    ['شیشه لوازم خانگی،با دقت در جزئیات', 'شیشه صفحه گاز،هود،فر و طبقات یخچال؛ تولید شیشه متناسب با نوع کاربرد، ابعاد و مشخصات مورد نیاز هر محصول.', 'لوازم خانگی', 'صفحه هود و اجاق گاز']
  ];
  const heroImages = $$('#fi img');
  const heroThumbs = $$('#th > div');
  const heroTexts = ['#hT', '#hP', '#l1', '#l2'].map(s => $(s));
  let current = 0;

  function showSlide(i) {
    current = i;
    heroImages.forEach((e, j) => e.classList.toggle('on', j === i));
    heroTexts.forEach((e, k) => {
      e.textContent = SLIDES[i][k];
      e.style.animation = 'none';
      void e.offsetWidth;
      e.style.animation = '';
    });
    heroThumbs.forEach((d, j) => {
      const order = (j - i + 5) % 5;
      const wasHidden = d.dataset.o === '0' || d.dataset.o === undefined;
      if (order === 0) {
        d.style.opacity = 0;
        d.style.pointerEvents = 'none';
        d.style.transform = 'rotate(-25deg) scale(.6)';
        d.style.setProperty('--p', -1);
      } else {
        if (wasHidden) {
          d.style.transition = 'none';
          d.style.setProperty('--p', 4);
          d.style.opacity = 0;
          d.style.transform = 'rotate(40deg) scale(.6)';
          void d.offsetWidth;
          d.style.transition = '';
        }
        d.style.pointerEvents = '';
        d.style.opacity = 1;
        d.style.transform = 'none';
        d.style.setProperty('--p', order - 1);
      }
      d.dataset.o = order;
    });
  }
  heroThumbs.forEach((d, j) => d.addEventListener('click', () => showSlide(j)));
  showSlide(0);
  setInterval(() => showSlide((current + 1) % 5), 6000);

  /* برش گوشه‌گرد کادر اسلایدر (فرورفتگی دکمه‌ها و تامبنیل‌ها) */
  const frame = $('#fr');
  const notch = $('.notch');
  const imageBox = $('.fi');
  function clipHero() {
    const W = frame.clientWidth, H = frame.clientHeight, u = W / 100;
    if (!W) return;
    frame.style.setProperty('--u', u + 'px');
    const nr = notch.getBoundingClientRect();
    const nw = Math.round(nr.width), nh = Math.round(nr.height);
    const mobile = matchMedia('(max-width:800px)').matches;
    const pts = [[nw > 0 ? nw : 0, 0], [W, 0]];
    if (!mobile) {
      const y1 = H - 15.1 * u, y0 = y1 - (2 * Math.max(18, 3 * u) + 25.2 * u);
      pts.push([W, y0], [74 * u, y0], [74 * u, y1], [W, y1]);
    }
    pts.push([W, H], [0, H]);
    if (nw > 0) pts.push([0, nh], [nw, nh]);
    const R = 32, n = pts.length;
    const unit = (p, q) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
    let d = '';
    pts.forEach((v, i) => {
      const a = pts[(i + n - 1) % n], b = pts[(i + 1) % n];
      const r = Math.min(R, Math.hypot(a[0] - v[0], a[1] - v[1]) / 2, Math.hypot(b[0] - v[0], b[1] - v[1]) / 2);
      const ua = unit(v, a), ub = unit(v, b);
      d += (i ? 'L' : 'M') + (v[0] + ua[0] * r).toFixed(1) + ' ' + (v[1] + ua[1] * r).toFixed(1) +
        'Q' + v[0].toFixed(1) + ' ' + v[1].toFixed(1) + ' ' + (v[0] + ub[0] * r).toFixed(1) + ' ' + (v[1] + ub[1] * r).toFixed(1);
    });
    imageBox.style.clipPath = `path('${d}Z')`;
  }
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(clipHero);
    ro.observe(frame);
    ro.observe(notch);
  }
  addEventListener('resize', clipHero);
  addEventListener('load', clipHero);
  clipHero();

  $('.dip').addEventListener('click', e => {
    e.preventDefault();
    $('#about').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- ظاهر شدن تدریجی بخش‌ها هنگام اسکرول ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .12 });
    $$('.rv').forEach(e => io.observe(e));
  } else {
    $$('.rv').forEach(e => e.classList.add('in'));
  }

  /* ---------- کارت‌های محصول و پنجره‌ی جزئیات ---------- */
  const PRODUCTS = [
    {
      key: 'tem', title: 'سکوریت', en: 'Tempered Glass',
      desc: 'شیشه سکوریت از طریق فرآیند حرارتی ویژه تولید می‌شود که مقاومت آن را در برابر ضربه و تغییرات دمایی نسبت به شیشه معمولی افزایش می‌دهد. در صورت شکست، شیشه به قطعات کوچک‌تری تبدیل می‌شود که خطر آسیب‌دیدگی را کاهش می‌دهند.',
      uses: ['درب‌های شیشه‌ای', 'پارتیشن‌های اداری و تجاری', 'ویترین فروشگاه‌ها', 'فضاهای داخلی و معماری', 'کاربردهای دکوراتیو متناسب با مشخصات پروژه']
    },
    {
      key: 'lam', title: 'لمینت', en: 'Laminated Glass',
      desc: 'شیشه لمینت از اتصال دو یا چند لایه شیشه با یک لایه میانی ساخته می‌شود. لایه میانی پس از شکست، به نگه داشتن بخش زیادی از قطعات شیشه کمک می‌کند و بسته به ساختار محصول، می‌تواند به ایمنی و کاهش عبور صدا نیز کمک کند.',
      uses: ['شیشه‌های ایمنی ساختمان', 'نورگیرها و برخی سطوح شیشه‌ای بالاسری', 'ویترین‌ها و فضاهای نیازمند نگه‌داری قطعات پس از شکست', 'برخی کاربردهای معماری و دکوراسیون']
    },
    {
      key: 'san', title: 'سندبلانست', en: 'Sandblasted Glass',
      desc: 'شیشه سندبلاست با ایجاد سطحی مات و نیمه‌شفاف، عبور نور را حفظ می‌کند و در عین حال دید مستقیم را محدود می‌سازد. این ویژگی آن را به گزینه‌ای کاربردی برای فضاهایی تبدیل می‌کند که به ترکیبی از نور و حریم خصوصی نیاز دارند.',
      uses: ['پارتیشن‌های اداری', 'درب‌های داخلی', 'فضاهای مسکونی و تجاری', 'دکوراسیون داخلی', 'طرح‌های مات و تزئینی روی شیشه']
    },
    {
      key: 'mir', title: 'آینه', en: 'Mirror',
      desc: 'آینه با بازتاب نور و تصویر، علاوه بر کاربرد روزمره، یکی از عناصر مهم در طراحی داخلی و دکوراسیون است. استفاده از آینه می‌تواند به افزایش روشنایی بصری و ایجاد حس عمق در فضا کمک کند.',
      uses: ['دکوراسیون داخلی', 'فضاهای مسکونی', 'فروشگاه‌ها و فضاهای تجاری', 'طراحی دیوارهای دکوراتیو', 'پروژه‌های سفارشی معماری']
    }
  ];
  const modal = $('#mod');
  const modalAccordions = $$('.acc', modal);
  const gallery = $('.col3');
  const bigImage = $('.chk');
  bigImage.classList.add('fb');

  function setAccordion(acc, open) {
    acc.classList.toggle('o', open);
    acc.querySelector('b').textContent = open ? '−' : '+';
  }
  modalAccordions.forEach(acc => acc.querySelector('button').addEventListener('click', () => setAccordion(acc, !acc.classList.contains('o'))));

  function showBig(id) {
    bigImage.style.opacity = 0;
    setTimeout(() => { bigImage.style.setProperty('--bg', `url(${GAL[id]})`); bigImage.style.opacity = 1; }, 200);
  }
  function openProduct(p) {
    $('#mT').textContent = p.title;
    $('#mE').textContent = p.en;
    $('#mD').textContent = p.desc;
    $('#mA').innerHTML = p.uses.join('<br>');
    setAccordion(modalAccordions[0], true);
    setAccordion(modalAccordions[1], false);
    gallery.innerHTML = '';
    GALLERY[p.key].forEach((id, j) => {
      const t = document.createElement('div');
      t.className = 'th2' + (j ? '' : ' on');
      t.style.backgroundImage = `url(${GAL[id]})`;
      t.addEventListener('click', () => {
        $$('.th2', gallery).forEach(x => x.classList.remove('on'));
        t.classList.add('on');
        showBig(id);
      });
      gallery.append(t);
    });
    bigImage.style.setProperty('--bg', `url(${GAL[GALLERY[p.key][0]]})`);
    gallery.scrollTop = 0;
    modal.classList.add('open');
  }
  const closeModal = () => modal.classList.remove('open');
  $('.win .x').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  $$('.card').forEach((card, i) => {
    card.addEventListener('click', e => {
      if (e.target.closest('.more')) return;
      const was = card.classList.contains('hv');
      $$('.card.hv').forEach(x => x.classList.remove('hv'));
      if (!was) card.classList.add('hv');
    });
    $('.more', card).addEventListener('click', () => openProduct(PRODUCTS[i]));
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.card')) $$('.card.hv').forEach(x => x.classList.remove('hv'));
  });

  /* ---------- مشخصات شیشه ---------- */
  const SPEC_IMAGES = ['p0', 'p1', 'p3', 'p2'];
  const specItems = $$('.sp');
  const specImage = $('#spi');
  specImage.classList.add('fb');
  function showSpec(i) {
    specItems.forEach((s, j) => s.classList.toggle('o', i === j));
    specImage.style.opacity = 0;
    specImage.style.transform = 'scale(.96)';
    setTimeout(() => {
      specImage.style.setProperty('--bg', `url(${IMG[SPEC_IMAGES[i]]})`);
      specImage.style.opacity = 1;
      specImage.style.transform = 'none';
    }, 300);
  }
  specItems.forEach((s, i) => s.addEventListener('click', () => showSpec(i)));
  showSpec(0);

  /* ---------- اسلایدر خدمات تخصصی ---------- */
  const track = $('#sw');
  const slides = $$('.sl');
  const dots = $$('#dots b');
  function nearestSlide() {
    const t = track.getBoundingClientRect(), c = t.left + t.width / 2;
    let best = 0, min = Infinity;
    slides.forEach((s, i) => {
      const r = s.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - c);
      if (d < min) { min = d; best = i; }
    });
    return best;
  }
  function goSlide(i) {
    const a = slides[i].getBoundingClientRect(), t = track.getBoundingClientRect();
    track.scrollBy({ left: (a.left + a.width / 2) - (t.left + t.width / 2), behavior: 'smooth' });
  }
  function markCurrent() {
    const n = nearestSlide();
    dots.forEach((d, j) => d.classList.toggle('on', j === n));
    slides.forEach((s, j) => s.classList.toggle('cur', j === n));
  }
  track.addEventListener('scroll', markCurrent);
  markCurrent();
  dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
  $('.sa.prev').addEventListener('click', () => goSlide((nearestSlide() + slides.length - 1) % slides.length));
  $('.sa.next').addEventListener('click', () => goSlide((nearestSlide() + 1) % slides.length));
  let dragX = null, dragStart = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    dragX = e.clientX; dragStart = track.scrollLeft;
    track.style.scrollSnapType = 'none'; track.style.cursor = 'grabbing';
  });
  addEventListener('pointermove', e => { if (dragX !== null) track.scrollLeft = dragStart - (e.clientX - dragX); });
  addEventListener('pointerup', () => {
    if (dragX === null) return;
    dragX = null; track.style.scrollSnapType = ''; track.style.cursor = '';
  });

  /* ---------- تخمین قیمت (قیمت‌ها از لیست قیمت مجموعه؛ میلیون ریال به ازای هر متر مربع) ---------- */
  const THICK = [4, 5, 6, 8, 10, 12];
  const NA = null;
  const GLASS = { n: [NA, 13, 16, 20, 22], s: [NA, NA, 17, NA, 24], b: [NA, NA, 19, NA, NA], d: [NA, NA, 22, NA, 35], k: [NA, 32, 34.6, 37.5, 40.8], pw: [NA, NA, 39, NA, 45] };
  const TEMPER_PLAIN = [3.2, 3.75, 4.4, 5.6, 7.1];
  const TEMPER_PRINT = [19, 19.5, 20, 22.5, 25];
  const DIAMOND = [.5, .63, .7, .88, 1];
  const FILM = [['۰/۳۸', 20], ['۰/۵۰', 22], ['۰/۷۶', 26], ['۱/۵۲', 38]];
  const TYPES = ['معمولی', 'سوپرکلیر', 'آینه', 'لاکوبل'];
  const TYPE_COLORS = [['سفید', 'برنز', 'دودی', 'مشکی'], ['سفید'], ['سفید', 'تینت برنز', 'تینت طلایی', 'تینت مشکی', 'تینت رز گلد'], ['مشکی', 'سفید', 'رنگ سفارشی']];
  const GLASS_KEY = [['n', 'b', 'd', null], ['s'], [null, null, null, null, null], ['k', 'pw', null]];
  const CUT_SURCHARGE = .15; /* برش بر اساس الگو: ۱۵٪ افزایش قیمت شیشه */
  const RIAL_TO_TOMAN = 1e5; /* میلیون ریال → تومان */
  const fa = n => Math.round(n).toLocaleString('fa-IR');

  const est = $('.ec');
  const E = id => $('#' + id, est);
  const inv = $('.inv', est);
  const S = { w: 0, h: 0, q: 1, th: 2, co: 0, ty: 0, sv: {}, lt: 0, ll: 0, lf: 0 };
  const typeBtns = $$('#ety button', est);
  let colorBtns = [];
  const ltBtns = $$('#lt button', est), llBtns = $$('#ll button', est), lfBtns = $$('#lf button', est);
  const ticks = $$('#tk span', est);

  const normalizeDigits = s => s
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[٫،,]/g, '.').replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  ['eh', 'ew', 'eq'].forEach(id => E(id).addEventListener('input', e => {
    const v = normalizeDigits(e.target.value);
    if (v !== e.target.value) e.target.value = v;
    S.h = +E('eh').value || 0; S.w = +E('ew').value || 0; S.q = Math.max(1, +E('eq').value || 1);
    calc();
  }));
  E('eth').addEventListener('input', e => { S.th = +e.target.value; calc(); });
  ticks.forEach((t, i) => t.addEventListener('click', () => { S.th = i; calc(); }));
  function renderColors() {
    const box = E('eco');
    box.innerHTML = '';
    colorBtns = TYPE_COLORS[S.ty].map((name, i) => {
      const b = document.createElement('button');
      b.textContent = name;
      b.addEventListener('click', () => { S.co = i; calc(); });
      box.append(b);
      return b;
    });
  }
  typeBtns.forEach((b, i) => b.addEventListener('click', () => { S.ty = i; S.co = 0; renderColors(); calc(); }));
  ltBtns.forEach((b, i) => b.addEventListener('click', () => { S.lt = i; if (S.sv['لمینت']) S.th = 1 + i; calc(); }));
  llBtns.forEach((b, i) => b.addEventListener('click', () => { S.ll = i; calc(); }));
  lfBtns.forEach((b, i) => b.addEventListener('click', () => { S.lf = i; calc(); }));
  $$('#esv input[type=checkbox]', est).forEach(c => c.addEventListener('change', () => {
    S.sv[c.dataset.k] = c.checked;
    c.closest('.sv3').classList.toggle('on', c.checked);
    E('lo').classList.toggle('on', !!S.sv['لمینت']);
    calc();
  }));
  $('.dt', est).addEventListener('click', () => {
    inv.classList.toggle('open');
    if (inv.classList.contains('open')) setTimeout(() => inv.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 520);
  });
  $('button.pr', est).addEventListener('click', goContact);

  function calc() {
    const laminated = !!S.sv['لمینت'];
    if (laminated) { S.th = Math.min(2, Math.max(1, S.th)); S.lt = S.th - 1; }
    E('eth').value = S.th;
    const th = S.th, idx = th < 5 ? th : -1;
    const area = S.w * S.h / 1e4 * S.q, perimeter = 2 * (S.w + S.h) / 100 * S.q;
    const rows = [];
    let total = 0;
    const add = (label, detail, value) => { rows.push([label, detail, value]); if (value) total += value; };
    let glassValue = null;

    [[colorBtns, S.co], [typeBtns, S.ty], [ltBtns, S.lt], [llBtns, S.ll], [lfBtns, S.lf]].forEach(([btns, on]) => btns.forEach((b, i) => b.classList.toggle('on', i === on)));
    ticks.forEach((t, i) => { t.classList.toggle('on', i === th); t.classList.toggle('dis', laminated && i !== 1 && i !== 2); });
    E('eth').style.setProperty('--p', (th / 5 * 100) + '%');
    E('ewarn').textContent = th === 0 && (Math.max(S.w, S.h) > 200 || Math.min(S.w, S.h) > 100)
      ? 'از سفارش ۴ میلی‌متر بیش از ۲۰۰×۱۰۰ سانتی‌متر معذوریم.' : '';

    if (area > 0) {
      const key = GLASS_KEY[S.ty][S.co];
      const price = idx >= 0 && key ? GLASS[key][idx] : null;
      const sheets = laminated ? (S.ll ? 3 : 2) : 1;
      glassValue = price ? area * price * RIAL_TO_TOMAN * sheets : null;
      add('شیشه ' + TYPES[S.ty] + ' — ' + TYPE_COLORS[S.ty][S.co] + '، ' + fa(THICK[th]) + ' میلی‌متر',
        fa(area) + ' متر مربع' + (sheets > 1 ? ' × ' + fa(sheets) + ' شیشه' : ''),
        glassValue);
      Object.keys(S.sv).filter(k => S.sv[k]).forEach(k => {
        let value = null, detail = '';
        if (k === 'سکوریت') {
          const fee = idx >= 0 ? (S.ty === 3 ? TEMPER_PRINT : TEMPER_PLAIN)[idx] : null;
          value = fee ? area * fee * RIAL_TO_TOMAN : null; detail = fa(area) + ' متر مربع';
        } else if (k === 'لمینت') {
          value = area * FILM[S.lf][1] * RIAL_TO_TOMAN;
          detail = 'طلق ' + FILM[S.lf][0] + '، ' + (S.ll ? '۳' : '۲') + ' لایه، ' + (S.lt ? '۶' : '۵') + ' میلی‌متر';
        } else if (k === 'دیاموند') {
          const fee = idx >= 0 ? DIAMOND[idx] : null;
          value = fee ? perimeter * fee * RIAL_TO_TOMAN : null; detail = fa(perimeter) + ' متر لبه';
        } else if (k === 'برش بر اساس الگو') {
          value = glassValue ? glassValue * CUT_SURCHARGE : null;
          detail = '۱۵٪ افزایش قیمت شیشه';
        }
        add('خدمات جانبی — ' + k, detail, value);
      });
    }
    E('pr').textContent = total ? fa(total) : '۰۰۰,۰۰۰,۰۰۰';
    inv.innerHTML = area > 0
      ? rows.map(r => `<div class="ir"><span>${r[0]}<small>${r[1]}</small></span><b>${r[2] ? fa(r[2]) + ' تومان' : 'پس از استعلام'}</b></div>`).join('') +
        `<div class="ir tot"><span>جمع کل (تخمینی)</span><b>${fa(total)} تومان</b></div>`
      : '<div class="ir"><span>طول و عرض را وارد کنید تا فاکتور تخمینی نمایش داده شود.</span></div>';
  }
  renderColors();
  calc();

  /* ---------- سؤالات متداول ---------- */
  $$('#fq .acc').forEach(acc => acc.querySelector('button').addEventListener('click', () => {
    const open = !acc.classList.contains('o');
    acc.classList.toggle('o', open);
    acc.querySelector('b').textContent = open ? '−' : '+';
  }));
})();
