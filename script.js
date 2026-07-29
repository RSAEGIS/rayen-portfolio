/* ============================================================
   Rayen Chaouch — portfolio interactions
   GSAP + ScrollTrigger + Lenis + raw WebGL hero
   ============================================================ */

const q  = (s, c = document) => c.querySelector(s);
const qa = (s, c = document) => [...c.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------
   0. I18N — EN / FR / AR dictionary + switcher
   Scope note: nav, hero, every section title/subtitle, contact
   form and footer are fully translated. Long body paragraphs
   inside each section are left in English — translating 30+
   sections of prose reliably is a much bigger job than a language
   switcher; extend the dictionary below with more keys any time.
------------------------------------------------------------ */
const I18N = {
  en: {
    'nav.work': 'Work', 'nav.reel': 'Reel', 'nav.grade': 'Grading', 'nav.design': 'Design',
    'nav.tools': 'Toolkit', 'nav.pricing': 'Pricing', 'nav.compare': 'Compare', 'nav.talk': "Let's talk",
    'menu.about': 'About', 'menu.journey': 'Journey', 'menu.work': 'Work', 'menu.spotlight': 'Spotlight',
    'menu.reel': 'Showreel', 'menu.services': 'Services', 'menu.grade': 'Grading', 'menu.design': 'Design',
    'menu.tools': 'Toolkit', 'menu.pricing': 'Packages', 'menu.compare': 'Compare', 'menu.process': 'Process',
    'menu.clients': 'Clients', 'menu.insights': 'Insights', 'menu.faq': 'FAQ', 'menu.certs': 'Certifications',
    'menu.radar': 'Skills', 'menu.bts': 'Behind the scenes', 'menu.playground': 'Try a look',
    'menu.resources': 'Free resources', 'menu.vtestimonials': 'Client videos', 'menu.social': 'Feed',
    'menu.values': 'How I work', 'menu.gear': 'Gear', 'menu.queue': 'In progress', 'menu.press': 'Press',
    'menu.estimate': 'Estimate', 'menu.reach': 'Reach', 'menu.availability': 'Booking',
    'menu.newsletter': 'Newsletter', 'menu.contact': 'Contact',
    'hero.location': 'Tunis, TN — available for freelance',
    'hero.desc': "I turn raw footage and flat brands into cinematic motion — <b>After Effects</b>, <b>Premiere Pro</b>, <b>DaVinci Resolve</b>, <b>Photoshop</b>, <b>Illustrator</b>.",
    'hero.cta1': 'See the work', 'hero.cta2': 'Start a project', 'hero.scroll': 'scroll',
    'sec.about': 'Behind the timeline', 'sec.journey': 'The journey so far',
    'sec.journey.sub': 'Six years, one pipeline — from a first freelance gig to a studio full of retainer clients.',
    'sec.work': 'Selected work', 'sec.spotlight': 'Case study',
    'sec.spotlight.sub': 'One project, start to finish — how a single product shot became a three-platform launch.',
    'sec.services': 'What I do', 'sec.grade': 'Color grading', 'sec.design': 'Design &amp; vectors',
    'sec.tools': 'The toolkit', 'sec.pricing': 'Packages',
    'sec.pricing.sub': 'Fixed-scope packages for the most requested projects — custom quotes for anything bigger.',
    'sec.compare': 'Why not just hire an agency',
    'sec.compare.sub': 'Same three skills, no handoffs between them, no account manager in the middle.',
    'sec.process': 'The pipeline', 'sec.clients': 'Clients &amp; recognition',
    'sec.clients.sub': "Channels, agencies and brands I've cut, animated and graded for.",
    'sec.insights': 'Notes from the timeline',
    'sec.insights.sub': 'Short write-ups on motion, grading and the pipeline behind the work.',
    'sec.faq': 'Good to know', 'sec.certs': 'Certifications &amp; training',
    'sec.certs.sub': 'Formal credentials behind the six years — the software badges above are muscle memory, these are the paper trail.',
    'sec.radar': 'Skills breakdown', 'sec.radar.sub': 'Six disciplines, one pipeline. Where the hours actually go.',
    'sec.bts': 'Behind the scenes',
    'sec.bts.sub': 'Rigs, timelines and raw passes before they become the final frame. Click any tile to zoom.',
    'sec.playground': 'Try a look',
    'sec.playground.sub': 'Same frame, four looks. Tap a preset to see how much a grade can change a mood.',
    'sec.resources': 'Free resources',
    'sec.resources.sub': 'A few things from the pipeline, free to grab — no email required.',
    'sec.vtestimonials': 'Straight from clients',
    'sec.vtestimonials.sub': 'Hit play — sound off by default, tap a card to unmute.',
    'sec.social': 'On the feed', 'sec.social.sub': 'Process clips and finished frames, posted as they ship.',
    'sec.values': 'How I work', 'sec.values.sub': 'Four things that stay true no matter what the brief is.',
    'sec.gear': 'Workspace &amp; gear',
    'sec.gear.sub': 'The hardware and software behind the pipeline, for the curious.',
    'sec.queue': 'Currently in the pipeline', 'sec.queue.sub': "A live look at what's on the timeline right now.",
    'sec.press': 'Press &amp; mentions', 'sec.press.sub': 'A few places the work has shown up.',
    'sec.estimate': 'Get a rough estimate',
    'sec.estimate.sub': 'Pick what fits — this gives a ballpark before we talk specifics.',
    'sec.reach': 'Where the work travels',
    'sec.reach.sub': 'Remote-first and timezone-friendly — clients across three continents.',
    'sec.availability': 'Booking calendar', 'sec.newsletter': "Notes before they're public",
    'sec.newsletter.sub': "One short email a month — a finished project breakdown, a LUT, or a tool that saved a deadline. No spam, unsubscribe anytime.",
    'contact.name': 'Name', 'contact.name.ph': 'Your name', 'contact.email': 'Email',
    'contact.project': 'Project', 'contact.project.ph': 'What are we building?', 'contact.send': 'Send it',
    'contact.copy': 'copy', 'contact.note': 'Booking projects for the next quarter. Average reply time: a few hours.',
    'foot.role': 'Motion · Graphic · Grade', 'foot.top': 'Back to top ↑'
  },
  fr: {
    'nav.work': 'Travaux', 'nav.reel': 'Showreel', 'nav.grade': 'Étalonnage', 'nav.design': 'Design',
    'nav.tools': 'Outils', 'nav.pricing': 'Tarifs', 'nav.compare': 'Comparer', 'nav.talk': 'Discutons',
    'menu.about': 'À propos', 'menu.journey': 'Parcours', 'menu.work': 'Travaux', 'menu.spotlight': 'Étude de cas',
    'menu.reel': 'Showreel', 'menu.services': 'Services', 'menu.grade': 'Étalonnage', 'menu.design': 'Design',
    'menu.tools': 'Outils', 'menu.pricing': 'Formules', 'menu.compare': 'Comparer', 'menu.process': 'Processus',
    'menu.clients': 'Clients', 'menu.insights': 'Articles', 'menu.faq': 'FAQ', 'menu.certs': 'Certifications',
    'menu.radar': 'Compétences', 'menu.bts': 'Coulisses', 'menu.playground': 'Essayer un look',
    'menu.resources': 'Ressources gratuites', 'menu.vtestimonials': 'Vidéos clients', 'menu.social': 'Fil',
    'menu.values': 'Ma méthode', 'menu.gear': 'Matériel', 'menu.queue': 'En cours', 'menu.press': 'Presse',
    'menu.estimate': 'Estimation', 'menu.reach': 'Portée', 'menu.availability': 'Réservation',
    'menu.newsletter': 'Newsletter', 'menu.contact': 'Contact',
    'hero.location': 'Tunis, TN — disponible en freelance',
    'hero.desc': "Je transforme des images brutes et des marques plates en mouvement cinématographique — <b>After Effects</b>, <b>Premiere Pro</b>, <b>DaVinci Resolve</b>, <b>Photoshop</b>, <b>Illustrator</b>.",
    'hero.cta1': 'Voir les travaux', 'hero.cta2': 'Démarrer un projet', 'hero.scroll': 'défiler',
    'sec.about': 'Le parcours en coulisses', 'sec.journey': "Le parcours jusqu'ici",
    'sec.journey.sub': "Six ans, un seul pipeline — d'un premier contrat freelance à un studio avec des clients fidèles.",
    'sec.work': 'Travaux sélectionnés', 'sec.spotlight': 'Étude de cas',
    'sec.spotlight.sub': 'Un projet, du début à la fin — comment une photo produit est devenue une campagne sur trois plateformes.',
    'sec.services': 'Ce que je fais', 'sec.grade': 'Étalonnage couleur', 'sec.design': 'Design &amp; vecteurs',
    'sec.tools': 'La boîte à outils', 'sec.pricing': 'Formules',
    'sec.pricing.sub': 'Des formules à périmètre fixe pour les projets les plus demandés — devis sur mesure pour le reste.',
    'sec.compare': 'Pourquoi pas une agence',
    'sec.compare.sub': 'Les mêmes trois compétences, sans intermédiaire, sans chef de projet entre nous.',
    'sec.process': 'Le processus', 'sec.clients': 'Clients &amp; reconnaissance',
    'sec.clients.sub': "Chaînes, agences et marques pour qui j'ai monté, animé et étalonné.",
    'sec.insights': 'Notes de parcours',
    'sec.insights.sub': "De courts articles sur le motion design, l'étalonnage et le pipeline derrière le travail.",
    'sec.faq': 'Bon à savoir', 'sec.certs': 'Certifications &amp; formations',
    'sec.certs.sub': "Les diplômes derrière les six années — les badges logiciels ci-dessus sont l'expérience, ceci est le papier.",
    'sec.radar': 'Répartition des compétences',
    'sec.radar.sub': 'Six disciplines, un seul pipeline. Là où le temps est vraiment investi.',
    'sec.bts': 'Dans les coulisses',
    'sec.bts.sub': "Rigs, timelines et passes brutes avant de devenir l'image finale. Cliquez pour zoomer.",
    'sec.playground': 'Essayer un look',
    'sec.playground.sub': "Même image, quatre ambiances. Touchez un préréglage pour voir l'effet d'un étalonnage.",
    'sec.resources': 'Ressources gratuites',
    'sec.resources.sub': 'Quelques éléments du pipeline, gratuits — sans email requis.',
    'sec.vtestimonials': 'Directement des clients',
    'sec.vtestimonials.sub': 'Cliquez sur play — son coupé par défaut, touchez une carte pour activer le son.',
    'sec.social': 'Sur le fil', 'sec.social.sub': "Extraits du processus et images finales, publiés au fil de l'eau.",
    'sec.values': 'Ma façon de travailler', 'sec.values.sub': 'Quatre principes qui restent vrais quel que soit le brief.',
    'sec.gear': 'Poste de travail &amp; matériel',
    'sec.gear.sub': 'Le matériel et les logiciels derrière le pipeline, pour les curieux.',
    'sec.queue': 'En cours actuellement', 'sec.queue.sub': 'Un aperçu en direct de la timeline en ce moment.',
    'sec.press': 'Presse &amp; mentions', 'sec.press.sub': 'Quelques endroits où le travail est apparu.',
    'sec.estimate': 'Estimation rapide',
    'sec.estimate.sub': "Choisissez ce qui correspond — cela donne un ordre de grandeur avant d'entrer dans les détails.",
    'sec.reach': 'Là où le travail voyage',
    'sec.reach.sub': 'À distance et adapté aux fuseaux horaires — des clients sur trois continents.',
    'sec.availability': 'Calendrier de réservation', 'sec.newsletter': "Des nouvelles avant qu'elles soient publiques",
    'sec.newsletter.sub': "Un email court par mois — un projet décortiqué, une LUT, ou un outil qui a sauvé un délai. Pas de spam, désabonnement à tout moment.",
    'contact.name': 'Nom', 'contact.name.ph': 'Votre nom', 'contact.email': 'Email',
    'contact.project': 'Projet', 'contact.project.ph': "Qu'est-ce qu'on construit ?", 'contact.send': 'Envoyer',
    'contact.copy': 'copier', 'contact.note': 'Réservations pour le prochain trimestre. Délai de réponse moyen : quelques heures.',
    'foot.role': 'Motion · Graphisme · Étalonnage', 'foot.top': 'Retour en haut ↑'
  },
  ar: {
    'nav.work': 'الأعمال', 'nav.reel': 'العرض التقديمي', 'nav.grade': 'تصحيح الألوان', 'nav.design': 'التصميم',
    'nav.tools': 'الأدوات', 'nav.pricing': 'الأسعار', 'nav.compare': 'مقارنة', 'nav.talk': 'لنتحدث',
    'menu.about': 'نبذة', 'menu.journey': 'المسيرة', 'menu.work': 'الأعمال', 'menu.spotlight': 'دراسة حالة',
    'menu.reel': 'العرض التقديمي', 'menu.services': 'الخدمات', 'menu.grade': 'تصحيح الألوان', 'menu.design': 'التصميم',
    'menu.tools': 'الأدوات', 'menu.pricing': 'الباقات', 'menu.compare': 'مقارنة', 'menu.process': 'آلية العمل',
    'menu.clients': 'العملاء', 'menu.insights': 'مقالات', 'menu.faq': 'الأسئلة الشائعة', 'menu.certs': 'الشهادات',
    'menu.radar': 'المهارات', 'menu.bts': 'خلف الكواليس', 'menu.playground': 'جرّب لوك',
    'menu.resources': 'موارد مجانية', 'menu.vtestimonials': 'فيديوهات العملاء', 'menu.social': 'المتابعة',
    'menu.values': 'طريقة عملي', 'menu.gear': 'المعدات', 'menu.queue': 'قيد التنفيذ', 'menu.press': 'الصحافة',
    'menu.estimate': 'تقدير التكلفة', 'menu.reach': 'النطاق الجغرافي', 'menu.availability': 'الحجوزات',
    'menu.newsletter': 'النشرة البريدية', 'menu.contact': 'تواصل',
    'hero.location': 'تونس — متاح للعمل الحر',
    'hero.desc': "أحوّل اللقطات الخام والعلامات التجارية الجامدة إلى حركة سينمائية — <b>After Effects</b>، <b>Premiere Pro</b>، <b>DaVinci Resolve</b>، <b>Photoshop</b>، <b>Illustrator</b>.",
    'hero.cta1': 'شاهد الأعمال', 'hero.cta2': 'ابدأ مشروعًا', 'hero.scroll': 'مرر للأسفل',
    'sec.about': 'نبذة عن المسيرة', 'sec.journey': 'المسيرة حتى الآن',
    'sec.journey.sub': 'ست سنوات، خط عمل واحد — من أول مشروع حر إلى استوديو بعملاء دائمين.',
    'sec.work': 'أعمال مختارة', 'sec.spotlight': 'دراسة حالة',
    'sec.spotlight.sub': 'مشروع واحد من البداية للنهاية — كيف تحوّلت صورة منتج واحدة إلى حملة على ثلاث منصات.',
    'sec.services': 'ماذا أقدّم', 'sec.grade': 'تصحيح الألوان', 'sec.design': 'التصميم والفيكتور',
    'sec.tools': 'الأدوات المستخدمة', 'sec.pricing': 'الباقات',
    'sec.pricing.sub': 'باقات بنطاق محدد لأكثر المشاريع طلبًا — عروض أسعار مخصصة لما هو أكبر.',
    'sec.compare': 'لماذا لا توظف وكالة',
    'sec.compare.sub': 'نفس المهارات الثلاث، بدون تسليم بين فرق، وبدون مدير حساب في المنتصف.',
    'sec.process': 'آلية العمل', 'sec.clients': 'العملاء والتقدير',
    'sec.clients.sub': 'قنوات ووكالات وعلامات تجارية قمت بالمونتاج والتحريك وتصحيح الألوان لها.',
    'sec.insights': 'ملاحظات من المسيرة',
    'sec.insights.sub': 'مقالات قصيرة عن الموشن والتصحيح اللوني وخط العمل خلف الكواليس.',
    'sec.faq': 'معلومات مفيدة', 'sec.certs': 'الشهادات والتكوين',
    'sec.certs.sub': 'الشهادات الرسمية وراء السنوات الست — شارات البرامج أعلاه خبرة عملية، وهذه هي الوثائق الرسمية.',
    'sec.radar': 'توزيع المهارات', 'sec.radar.sub': 'ستة تخصصات، خط عمل واحد. أين يذهب الوقت فعليًا.',
    'sec.bts': 'خلف الكواليس',
    'sec.bts.sub': 'الإعدادات والخطوط الزمنية واللقطات الأولية قبل أن تصبح الصورة النهائية. اضغط للتكبير.',
    'sec.playground': 'جرّب لوك',
    'sec.playground.sub': 'نفس الصورة، أربعة أساليب. اضغط على إعداد لترى كيف يغيّر التصحيح اللوني الشعور العام.',
    'sec.resources': 'موارد مجانية',
    'sec.resources.sub': 'بعض الأدوات من خط العمل، مجانًا — بدون الحاجة لبريد إلكتروني.',
    'sec.vtestimonials': 'مباشرة من العملاء',
    'sec.vtestimonials.sub': 'اضغط تشغيل — الصوت مغلق افتراضيًا، اضغط على البطاقة لتفعيل الصوت.',
    'sec.social': 'على المتابعة', 'sec.social.sub': 'مقاطع من العملية وصور نهائية، تُنشر أولًا بأول.',
    'sec.values': 'طريقة عملي', 'sec.values.sub': 'أربعة مبادئ ثابتة مهما كان طلب العميل.',
    'sec.gear': 'بيئة العمل والمعدات',
    'sec.gear.sub': 'الأجهزة والبرامج وراء خط العمل، لمن يهمه الأمر.',
    'sec.queue': 'قيد التنفيذ حاليًا', 'sec.queue.sub': 'نظرة مباشرة على ما هو قيد العمل الآن.',
    'sec.press': 'الصحافة والإشارات', 'sec.press.sub': 'بعض الأماكن التي ظهر فيها العمل.',
    'sec.estimate': 'تقدير سريع للتكلفة',
    'sec.estimate.sub': 'اختر ما يناسبك — هذا يعطي فكرة تقريبية قبل الدخول في التفاصيل.',
    'sec.reach': 'أين يصل هذا العمل',
    'sec.reach.sub': 'عمل عن بعد بالكامل ومتوافق مع فروقات التوقيت — عملاء على ثلاث قارات.',
    'sec.availability': 'جدول الحجوزات', 'sec.newsletter': 'أخبار قبل أن تُنشر',
    'sec.newsletter.sub': 'بريد إلكتروني قصير كل شهر — تفكيك مشروع، أو LUT، أو أداة أنقذت موعدًا نهائيًا. بدون سبام، ويمكن إلغاء الاشتراك في أي وقت.',
    'contact.name': 'الاسم', 'contact.name.ph': 'اسمك', 'contact.email': 'البريد الإلكتروني',
    'contact.project': 'المشروع', 'contact.project.ph': 'ما الذي سنعمل عليه؟', 'contact.send': 'إرسال',
    'contact.copy': 'نسخ', 'contact.note': 'الحجوزات مفتوحة للربع القادم. متوسط وقت الرد: بضع ساعات.',
    'foot.role': 'موشن · تصميم · تصحيح ألوان', 'foot.top': 'العودة للأعلى ↑'
  }
};

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-title]').forEach(h2 => {
    const key = h2.getAttribute('data-i18n-title');
    const em = h2.querySelector('em');
    if (dict[key] != null) h2.innerHTML = (em ? em.outerHTML + ' ' : '') + dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] != null) el.placeholder = dict[key];
  });
  // keep the nav scramble effect's cached string in sync with the new language
  document.querySelectorAll('.nav__links a span, .nav__cta span').forEach(el => {
    el.dataset.origText = el.textContent;
  });

  const rtl = lang === 'ar';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  document.documentElement.classList.toggle('is-rtl', rtl);

  qa('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  try { localStorage.setItem('site-lang', lang); } catch (e) {}

  // text length changes (especially EN <-> AR) can shift section heights
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
}

function initI18n() {
  let saved = 'en';
  try { saved = localStorage.getItem('site-lang') || 'en'; } catch (e) {}
  applyLanguage(saved);
  qa('.lang__btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
}
if (reduced) document.documentElement.classList.add('reduced');

// without the animation libraries the page must still be fully readable
if (typeof gsap === 'undefined') {
  document.documentElement.classList.add('no-anim');
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('is-loading');
    const l = document.getElementById('loader');
    if (l) l.remove();
  });
  throw new Error('GSAP failed to load — running without animations');
}

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   ASSET WATCH — lazy-loaded and broken images finish resolving
   (load or error) well after the initial page load, which quietly
   changes the page's height after ScrollTrigger already measured
   every section's position. Left unchecked, every trigger below
   the offending image stays desynced for the rest of the session,
   so content scrolled past its (stale) reveal point never appears.
   Re-measure any time an image settles, anywhere on the page.
------------------------------------------------------------ */
let assetRefreshId;
function queueAssetRefresh() {
  clearTimeout(assetRefreshId);
  assetRefreshId = setTimeout(() => { ScrollTrigger.refresh(); }, 180);
}
document.addEventListener('load', e => {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') queueAssetRefresh();
}, true);
document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') queueAssetRefresh();
}, true);

/* ------------------------------------------------------------
   1. SMOOTH SCROLL
------------------------------------------------------------ */
let lenis = null;
function initScroll() {
  if (reduced || typeof Lenis === 'undefined') return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
  lenis.on('scroll', ScrollTrigger.update);
  // a throw inside a ticker callback kills gsap's rAF loop and freezes every
  // animation on the page — lenis never gets the chance to do that
  gsap.ticker.add(t => { try { lenis.raf(t * 1000); } catch (e) { console.warn(e); } });
  gsap.ticker.lagSmoothing(0);

  qa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      // bare "#" placeholders (social icons still pointing nowhere) aren't scroll targets —
      // document.querySelector('#') actually throws, so bail out before it gets there
      if (!href || href.length < 2) return;
      const target = q(href);
      if (!target) return;
      e.preventDefault();
      document.body.classList.remove('menu-open');
      lenis.start(); // the burger stops lenis while the menu is open
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    });
  });
}

/* ------------------------------------------------------------
   2. HERO WEBGL — flowing fbm noise + duotone grade
------------------------------------------------------------ */
function initGL() {
  const canvas = q('#gl');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true });
  if (!gl) { canvas.style.background = 'radial-gradient(60% 60% at 50% 40%, #1b1013, #07070a)'; return; }

  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

  const FS = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_mouse;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x),
               mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 st = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);

    float t = u_time * 0.055;
    vec2 mo = (u_mouse - 0.5) * 0.55;

    // domain-warped flow field
    vec2 w = vec2(fbm(st*1.6 + vec2(t, -t) + mo), fbm(st*1.6 + vec2(4.7 - t, 1.3 + t) - mo));
    float f = fbm(st*2.1 + w*1.7 + t*0.6);

    // cinematic teal / orange duotone
    vec3 shadow = vec3(0.035, 0.045, 0.062);
    vec3 mid    = vec3(0.055, 0.19, 0.235);
    vec3 hi     = vec3(1.0, 0.29, 0.08);

    vec3 col = mix(shadow, mid, smoothstep(0.28, 0.72, f));
    col = mix(col, hi, pow(smoothstep(0.62, 0.98, f), 2.2) * 0.9);

    // anamorphic streak through the centre
    float streak = exp(-pow(abs(st.y - 0.02 + w.y*0.06) * 9.0, 2.0));
    col += hi * streak * 0.12;

    // soft light pool that follows the mouse
    float pool = exp(-length(st - mo*1.6) * 2.4);
    col += mid * pool * 0.55;

    // scanline breath + vignette
    col *= 1.0 - 0.06 * sin(gl_FragCoord.y * 1.6 + u_time);
    col *= smoothstep(1.25, 0.25, length(st) * 1.05);

    // dither to kill banding
    col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }`;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
  window.addEventListener('pointermove', e => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = 1 - e.clientY / window.innerHeight;
  });

  const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  function resize() {
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 })
    .observe(canvas);

  const start = performance.now();
  (function frame() {
    if (visible) {
      mouse.x += (mouse.tx - mouse.x) * .05;
      mouse.y += (mouse.ty - mouse.y) * .05;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
  })();
}

/* ------------------------------------------------------------
   3. TEXT SPLITTING
------------------------------------------------------------ */
function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  return [...text].map(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(s);
    return s;
  });
}
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  return words.map((w, i) => {
    const s = document.createElement('span');
    s.className = 'w';
    s.textContent = w;
    el.appendChild(s);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return s;
  });
}

/* ------------------------------------------------------------
   4. PRELOADER -> HERO INTRO
------------------------------------------------------------ */
/* the intro must never be able to leave the page half-revealed:
   whatever happens (throttled tab, stalled rAF, slow assets) these timelines
   are forced to their end state after a few seconds. */
const introTls = [];
function guardIntro(tl) {
  introTls.push(tl);
  tl.eventCallback('onComplete', () => {
    const i = introTls.indexOf(tl);
    if (i > -1) introTls.splice(i, 1);
  });
}
function finishIntro() {
  while (introTls.length) introTls.pop().progress(1, false).kill();
  document.body.classList.remove('is-loading');
  const l = q('#loader');
  if (l) l.remove();
  gsap.set('.hero__title .char', { clearProps: 'all' });
  gsap.set('.nav', { clearProps: 'all' });
  ScrollTrigger.refresh();
}
document.addEventListener('visibilitychange', () => { if (document.hidden) finishIntro(); });

function initLoader() {
  const loader = q('#loader');
  const bar = q('#loaderBar');
  const count = q('#loaderCount');
  const letters = qa('#loader .loader__name span');

  const state = { v: 0 };
  const tl = gsap.timeline();

  tl.to(letters, { y: '0%', duration: 1, stagger: .045, ease: 'expo.out' }, 0)
    .to(state, {
      v: 100, duration: 2.1, ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(state.v);
        count.textContent = String(n).padStart(2, '0');
        bar.style.width = n + '%';
      }
    }, .25)
    .to(letters, { y: '-110%', duration: .7, stagger: .02, ease: 'expo.inOut' }, '+=.1')
    .to(loader, {
      yPercent: -100, duration: 1.1, ease: 'expo.inOut',
      onStart: () => document.body.classList.remove('is-loading'),
      onComplete: () => { loader.remove(); ScrollTrigger.refresh(); setTimeout(settleReveals, 250); }
    }, '-=.35')
    .add(heroIntro, '-=.75');

  guardIntro(tl);
  setTimeout(finishIntro, 8000);
}

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  qa('.hero__title [data-split]').forEach((el, i) => {
    const chars = splitChars(el);
    tl.from(chars, { yPercent: 118, rotate: 5, duration: 1.25, stagger: .026 }, i * .09);
  });
  tl.from('.hero__top .tag', { y: 18, opacity: 0, duration: .9, stagger: .1 }, .1)
    .from('.hero__desc, .hero__actions', { y: 26, opacity: 0, duration: 1, stagger: .12 }, .5)
    .from('.hero__scroll', { opacity: 0, duration: .8 }, .9);

  tl.add(initHeroTitle);
  guardIntro(tl);
}

/* the headline keeps living after the intro: breathing wave, characters that
   react to the pointer, lines that drift apart on scroll, and an occasional
   glitch on the outlined word. */
function initHeroTitle() {
  const lines = qa('.hero__title .line');
  const chars = qa('.hero__title .char');
  if (!chars.length || reduced) return;

  // idle breathing wave
  gsap.to(chars, {
    yPercent: -7, duration: 1.9, ease: 'sine.inOut',
    repeat: -1, yoyo: true, stagger: { each: .045, from: 'start' }
  });

  // characters lift and warm up around the pointer
  const hero = q('.hero');

  gsap.set(chars, {
  scale: 1
  });

  const setters = chars.map(c => ({
    el: c,
    sx: gsap.quickTo(c, "scaleX", {
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto"
    }),
    sy: gsap.quickTo(c, "scaleY", {
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto"
    })
  }));
  hero.addEventListener('pointermove', e => {
    setters.forEach(({ el, sx, sy }) => {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      const k = gsap.utils.clamp(0, 1, 1 - d / 150);
      const v = 1 + k * .14;
      sx(v);
      sy(v);
      el.style.color = k > .5 ? 'var(--acc)' : '';
    });
  });
  hero.addEventListener('pointerleave', () => {
  setters.forEach(({ el, s }) => {
    // Only call s if it is a function to prevent the TypeError
    if (typeof s === 'function') s(1);
    el.style.color = '';
  });
});

  // lines drift at different speeds while the hero scrolls away
  lines.forEach((l, i) => {
    gsap.to(l, {
      xPercent: i % 2 ? 9 : -7, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 }
    });
  });

  // glitch pass on the outlined word every few seconds
  const alt = q('.hero__title .line--alt .line__in');
  if (alt) {
    const glitch = gsap.timeline({ repeat: -1, repeatDelay: 5, paused: true });
    glitch.to(alt, { skewX: 9, x: 6, duration: .06, ease: 'none' })
      .to(alt, { skewX: -7, x: -5, opacity: .7, duration: .06 })
      .to(alt, { skewX: 0, x: 0, opacity: 1, duration: .08 })
      .to(alt, { x: 3, duration: .05 })
      .to(alt, { x: 0, duration: .05 });
    gsap.delayedCall(3, () => glitch.play());
  }
}

/* ------------------------------------------------------------
   5. SCROLL REVEALS
------------------------------------------------------------ */
/* Anchor jumps can skip over a reveal entirely — its trigger never fires and the
   element stays in its hidden start state. This settles anything already passed. */
function settleReveals() {
  ScrollTrigger.getAll().forEach(st => {
    const a = st.animation;
    if (!a || st.vars.scrub || a.isActive()) return;
    // settle any trigger that is already in or past its start point
    if (st.progress > 0 || st.isActive) {
      a.progress(1);
      a.render(a.duration(), false, true); // force, in case a refresh reverted the render
    }
  });
}

function initReveals() {
  let settleId;
  const queueSettle = () => {
    clearTimeout(settleId);
    settleId = setTimeout(settleReveals, 160);
  };
  window.addEventListener('scroll', queueSettle, { passive: true });
  ScrollTrigger.addEventListener('refresh', queueSettle);

  // generic fades
  qa('[data-anim="fade"]').forEach(el => {
    if (el.closest('.hero')) return; // handled by the intro timeline
    gsap.fromTo(el, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true, invalidateOnRefresh: true }
    });
  });

  // section titles, char by char
  qa('[data-anim="lines"]').forEach(el => {
    const label = el.querySelector('em');
    const chars = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
    if (chars.length) {
      const span = document.createElement('span');
      span.textContent = chars[0].textContent.trim();
      chars[0].replaceWith(span);
      // Arabic script is cursive — wrapping each letter in its own span breaks
      // letter joining/shaping, so Arabic gets a plain reveal instead of a char split
      if (document.documentElement.getAttribute('lang') === 'ar') {
        gsap.from(span, {
          yPercent: 40, opacity: 0, duration: .9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      } else {
        const cs = splitChars(span);
        gsap.from(cs, {
          yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: .018,
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      }
    }
    if (label) gsap.from(label, { opacity: 0, x: -14, duration: .8, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // staggered lists
  qa('[data-anim="stagger"]').forEach(el => {
    if (!el.children.length) return; // populated later by JS (e.g. #availStrip) — animated separately, once it has content
    gsap.fromTo(el.children, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: .9, ease: 'expo.out', stagger: .08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true, invalidateOnRefresh: true }
    });
  });

  // work rows
  gsap.utils.toArray('.row').forEach(row => {
    gsap.from(row, {
      y: 60, opacity: 0, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: row, start: 'top 92%' }
    });
  });

  // image clip reveal + parallax
  qa('.reveal-img').forEach(box => {
    gsap.to(box, {
      clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.out',
      scrollTrigger: { trigger: box, start: 'top 85%' }
    });
    gsap.to(box.querySelector('img'), {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // word-by-word highlight
  qa('[data-words]').forEach(el => {
    const words = splitWords(el);
    gsap.to(words, {
      opacity: 1, ease: 'none', stagger: 1,
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: true }
    });
  });

  // software skill meters + pointer-tracked card light
  qa('.soft').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => el.classList.add('is-in')
    });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // counters
  qa('[data-count]').forEach(el => {
    const to = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const o = { v: 0 };
    gsap.to(o, {
      v: to, duration: 1.8, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  // process line draw
  const line = q('#stepsLine');
  if (line) {
    gsap.to(line, {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 80%', scrub: .4 }
    });
  }

  // journey timeline: line draws down as you scroll, each node lights up as it passes
  const journeyLine = q('#journeyProgress');
  if (journeyLine) {
    gsap.to(journeyLine, {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: '.journey__body', start: 'top 75%', end: 'bottom 75%', scrub: .4 }
    });
  }
  qa('.journey__item').forEach(item => {
    gsap.to(item, {
      opacity: 1, y: 0, duration: .9, ease: 'expo.out',
      scrollTrigger: {
        trigger: item, start: 'top 78%',
        onEnter: () => item.classList.add('is-in'),
        onLeaveBack: () => item.classList.remove('is-in')
      }
    });
  });

  // steps micro-parallax
  qa('.step').forEach((s, i) => {
    gsap.from(s, {
      x: i % 2 ? 40 : -40, opacity: 0, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: s, start: 'top 88%' }
    });
  });

  // contact headline
  qa('.contact__big [data-split]').forEach((el, i) => {
    const chars = splitChars(el);
    gsap.from(chars, {
      yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: .02,
      scrollTrigger: { trigger: '.contact__big', start: 'top 80%' }, delay: i * .08
    });
  });

  // hero parallax on scroll
  gsap.to('.hero__inner', {
    yPercent: 14, opacity: .25, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

/* ------------------------------------------------------------
   6. TICKER — velocity skew + infinite loop
------------------------------------------------------------ */
function initTicker() {
  const track = q('#tickerTrack');
  if (!track) return;
  // slow enough to actually read, and it stops while you hover it
  const loop = gsap.to(track, { xPercent: -50, duration: 55, ease: 'none', repeat: -1 });
  const ticker = track.parentElement;
  ticker.addEventListener('pointerenter', () => gsap.to(loop, { timeScale: 0, duration: .5 }));
  ticker.addEventListener('pointerleave', () => gsap.to(loop, { timeScale: 1, duration: .6 }));

  const rows = qa('.ticker__row');
  let last = 0;
  ScrollTrigger.create({
    onUpdate: self => {
      const v = gsap.utils.clamp(-14, 14, self.getVelocity() / 220);
      if (Math.abs(v - last) > .3) {
        last = v;
        gsap.to(rows, { skewX: v, duration: .5, ease: 'power2.out', overwrite: true });
      }
    }
  });
}

/* ------------------------------------------------------------
   7. HORIZONTAL SERVICES
------------------------------------------------------------ */
function initServices() {
  const track = q('#servicesTrack');
  const pin = q('#servicesPin');
  const prog = q('#servicesProgress');
  if (!track || !pin) return;

  const build = () => {
    const distance = track.scrollWidth - window.innerWidth + 40;
    if (distance <= 0) return;
    gsap.to(track, {
      x: -distance, ease: 'none',
      scrollTrigger: {
        trigger: '.services',
        start: 'top top',
        end: () => '+=' + (distance + window.innerHeight * .5),
        pin: pin,
        scrub: .6,
        invalidateOnRefresh: true,
        onUpdate: self => { if (prog) prog.style.width = (self.progress * 100).toFixed(1) + '%'; }
      }
    });
  };
  build();
}

/* ------------------------------------------------------------
   8. CUSTOM CURSOR + MAGNETIC
------------------------------------------------------------ */
function initCursor() {
  const cur = q('.cursor');
  if (!cur || window.matchMedia('(pointer:coarse)').matches) return;
  const dot = q('.cursor__dot'), ring = q('.cursor__ring');

  const xTo = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3' });
  const yTo = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3' });
  const rxTo = gsap.quickTo(ring, 'x', { duration: .55, ease: 'power3' });
  const ryTo = gsap.quickTo(ring, 'y', { duration: .55, ease: 'power3' });

  window.addEventListener('pointermove', e => {
    xTo(e.clientX); yTo(e.clientY); rxTo(e.clientX); ryTo(e.clientY);
  });

  qa('.hoverable, a, button').forEach(el => {
    const mode = el.dataset.cursor;
    el.addEventListener('mouseenter', () => {
      cur.classList.add(mode === 'view' ? 'is-view' : mode === 'hide' ? 'is-hide' : 'is-hover');
    });
    el.addEventListener('mouseleave', () => cur.classList.remove('is-view', 'is-hide', 'is-hover'));
  });

  // magnetic buttons
  qa('.magnetic').forEach(el => {
    const strength = 26;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: ((e.clientX - r.left) / r.width - .5) * strength,
        y: ((e.clientY - r.top) / r.height - .5) * strength * .6,
        duration: .5, ease: 'power3.out'
      });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.4)' }));
  });
}

/* ------------------------------------------------------------
   9. WORK — cursor-following video preview + filters
------------------------------------------------------------ */
function initWork() {
  const list = q('#workList');
  const preview = q('#preview');
  const video = q('#previewVideo');
  if (!list) return;

  if (preview && !window.matchMedia('(pointer:coarse)').matches) {
    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: .85 });
    const xTo = gsap.quickTo(preview, 'x', { duration: .55, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: .55, ease: 'power3' });
    const pointer = { x: -1, y: -1 };
    let current = null;

    // the row under the pointer drives the preview — survives scrolling and pinning
    const sync = () => {
      if (pointer.x < 0) return;
      const el = document.elementFromPoint(pointer.x, pointer.y);
      const row = el && el.closest ? el.closest('.row') : null;
      if (row === current) return;
      current = row;
      if (row) {
        list.classList.add('is-hovering');
        const src = row.dataset.media;
        if (src && !video.src.endsWith(src)) video.src = src;
        video.play().catch(() => {});
        gsap.to(preview, { opacity: 1, scale: 1, duration: .5, ease: 'expo.out', overwrite: 'auto' });
      } else {
        list.classList.remove('is-hovering');
        gsap.to(preview, { opacity: 0, scale: .85, duration: .35, ease: 'power2.out', overwrite: 'auto' });
      }
    };

    window.addEventListener('pointermove', e => {
      pointer.x = e.clientX; pointer.y = e.clientY;
      xTo(e.clientX); yTo(e.clientY);
      sync();
    });
    window.addEventListener('scroll', sync, { passive: true });
  }

  // filters
  const chips = qa('#filters .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const f = chip.dataset.filter;
      qa('.row', list).forEach(row => {
        const show = f === 'all' || row.dataset.cat === f;
        if (show) {
          row.classList.remove('is-out');
          gsap.fromTo(row, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .55, ease: 'expo.out' });
        } else {
          gsap.to(row, {
            opacity: 0, y: -12, duration: .3,
            onComplete: () => row.classList.add('is-out')
          });
        }
      });
      ScrollTrigger.refresh();
    });
  });
}

/* ------------------------------------------------------------
   10. COLOR GRADING COMPARE
------------------------------------------------------------ */
function initCompare() {
  const wrap = q('#compare');
  if (!wrap) return;
  const before = q('#compareBefore');
  const handle = q('#compareHandle');
  let dragging = false;

  const set = clientX => {
    const r = wrap.getBoundingClientRect();
    const pct = gsap.utils.clamp(0, 100, ((clientX - r.left) / r.width) * 100);
    gsap.to(before, { width: pct + '%', duration: dragging ? .06 : .5, ease: 'power2.out', overwrite: true });
    gsap.to(handle, { left: pct + '%', duration: dragging ? .06 : .5, ease: 'power2.out', overwrite: true });
  };

  wrap.addEventListener('pointerdown', e => { dragging = true; wrap.setPointerCapture(e.pointerId); set(e.clientX); });
  wrap.addEventListener('pointermove', e => { if (dragging) set(e.clientX); });
  wrap.addEventListener('pointerup', e => { dragging = false; wrap.releasePointerCapture(e.pointerId); });
  wrap.addEventListener('pointercancel', () => { dragging = false; });
  wrap.addEventListener('mousemove', e => { if (!dragging) set(e.clientX); });
  wrap.addEventListener('mouseleave', () => { if (!dragging) set(wrap.getBoundingClientRect().left + wrap.offsetWidth / 2); });

  // reveal on scroll
  gsap.from(wrap, {
    scale: .94, opacity: 0, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: wrap, start: 'top 85%' }
  });
}

/* ------------------------------------------------------------
   11. NAV BEHAVIOUR + MENU
------------------------------------------------------------ */
function initNav() {
  const nav = q('#nav');
  const burger = q('#burger');
  let lastY = 0;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: () => {
      const y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 80);
      nav.classList.toggle('is-hidden', y > lastY + 4 && y > 400 && !document.body.classList.contains('menu-open'));
      lastY = y;
    }
  });

  burger?.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  // scroll progress
  const bar = q('#progressBar');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => { if (bar) bar.style.width = (self.progress * 100).toFixed(2) + '%'; }
  });
}

/* ------------------------------------------------------------
   12. SMALL BITS — clock, copy, form, year
------------------------------------------------------------ */
function initBits() {
  const clock = q('#clock');
  if (clock) {
    const tick = () => {
      const now = new Date();
      const tn = new Date(now.getTime() + (60 + now.getTimezoneOffset()) * 60000);
      clock.textContent = tn.toTimeString().slice(0, 8);
    };
    tick(); setInterval(tick, 1000);
  }

  const year = q('#year');
  if (year) year.textContent = new Date().getFullYear();

  const copy = q('#copyMail');
  copy?.addEventListener('click', async () => {
    const mail = copy.dataset.mail;
    const label = copy.querySelector('i');
    try { await navigator.clipboard.writeText(mail); } catch { /* ignore */ }
    label.textContent = 'copied';
    gsap.fromTo(copy, { scale: .98 }, { scale: 1, duration: .5, ease: 'elastic.out(1,.4)' });
    setTimeout(() => { label.textContent = 'copy'; }, 1800);
  });

  const form = q('#form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const note = q('#formNote');
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('msg')) {
      note.textContent = 'Fill every field, please.';
      note.style.color = '#ff3c14';
      gsap.fromTo(form, { x: -6 }, { x: 0, duration: .5, ease: 'elastic.out(1,.35)' });
      return;
    }
    note.style.color = '';
    note.textContent = 'Opening your mail app…';
    const body = encodeURIComponent(`${data.get('msg')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:rayenchaouch42@gmail.com?subject=${encodeURIComponent('New project — ' + data.get('name'))}&body=${body}`;
    form.reset();
    setTimeout(() => { note.textContent = 'Thanks — talk soon.'; }, 1200);
  });
}

/* ------------------------------------------------------------
   13. SHOWREEL — the scroll drives the playhead
------------------------------------------------------------ */
function initReel() {
  const section = q('#reel');
  const video = q('#reelVideo');
  if (!section || !video) return;

  const bar = q('#reelBar');
  const tc = q('#reelTc');
  let playing = false;

  const frames = t => {
    const f = Math.floor((t % 1) * 25);
    const s = Math.floor(t) % 60;
    const m = Math.floor(t / 60) % 60;
    const pad = n => String(n).padStart(2, '0');
    return `00:${pad(m)}:${pad(s)}:${pad(f)}`;
  };

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      if (bar) bar.style.width = (self.progress * 100).toFixed(2) + '%';
      if (playing || !video.duration) return;
      const t = self.progress * (video.duration - .05);
      video.currentTime = t;
      if (tc) tc.textContent = frames(t);
    }
  });

  // title + meta land as the section takes the screen
  const st = { trigger: section, start: 'top 70%', once: true };
  qa('.reel__title [data-split]').forEach((el, i) => {
    gsap.from(splitChars(el), {
      yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: .04,
      delay: i * .1, scrollTrigger: st
    });
  });
  gsap.from('.reel__meta span', { y: 20, opacity: 0, duration: .8, stagger: .08, ease: 'expo.out', delay: .35, scrollTrigger: st });
  gsap.from('.reel__play', { scale: .6, opacity: 0, duration: .9, ease: 'expo.out', delay: .3, scrollTrigger: st });

  gsap.to('.reel__title', {
    scale: 1.14, opacity: .18, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: .5 }
  });

  q('#reelPlay')?.addEventListener('click', () => {
    playing = !playing;
    section.classList.toggle('is-playing', playing);
    if (playing) {
      video.loop = true;
      video.play().catch(() => {});
      gsap.to('.reel__copy', { opacity: .12, duration: .8, ease: 'power2.out' });
    } else {
      video.pause();
      gsap.to('.reel__copy', { opacity: 1, duration: .8, ease: 'power2.out' });
    }
  });

  video.addEventListener('timeupdate', () => {
    if (playing && tc) tc.textContent = frames(video.currentTime);
  });
}

/* ------------------------------------------------------------
   14. DESIGN GALLERY — column parallax, velocity skew, lightbox
------------------------------------------------------------ */
function initGallery() {
  const cols = qa('#galCols .gal__col');
  if (!cols.length) return;

  if (!reduced && window.matchMedia('(min-width:900px)').matches) {
    cols.forEach(col => {
      gsap.to(col, {
        yPercent: +col.dataset.gspeed || 0, ease: 'none',
        scrollTrigger: { trigger: '#galCols', start: 'top bottom', end: 'bottom top', scrub: .8 }
      });
    });

    // images lean into the scroll direction
    const items = qa('.gal__item img');
    const skew = gsap.quickTo(items, 'skewY', { duration: .5, ease: 'power3' });
    ScrollTrigger.create({
      onUpdate: self => skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -700))
    });
  }

  gsap.from('.gal__item', {
    y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: .07,
    scrollTrigger: { trigger: '#galCols', start: 'top 80%' }
  });

  // lightbox
  const lb = q('#lb');
  const img = q('#lbImg');
  const close = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  };
  qa('.gal__item').forEach(fig => {
    fig.addEventListener('click', () => {
      img.src = fig.dataset.full;
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
    });
  });
  q('#lbClose')?.addEventListener('click', close);
  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('is-open')) close(); });
}

/* ------------------------------------------------------------
   15. FAQ ACCORDION
------------------------------------------------------------ */
function initFaq() {
  const items = qa('#acc .acc__item');
  items.forEach(item => {
    const btn = q('.acc__q', item);
    const panel = q('.acc__a', item);
    btn.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      items.forEach(other => {
        if (other === item) return;
        other.classList.remove('is-open');
        gsap.to(q('.acc__a', other), { height: 0, duration: .45, ease: 'power2.inOut' });
      });
      item.classList.toggle('is-open', !open);
      gsap.to(panel, {
        height: open ? 0 : 'auto', duration: .55, ease: 'power2.inOut',
        onComplete: () => ScrollTrigger.refresh()
      });
    });
  });
}

/* ------------------------------------------------------------
   16. CLIENTS / AWARDS reveals
------------------------------------------------------------ */
function initClients() {
  qa('.logos__cell').forEach(cell => {
    cell.addEventListener('pointermove', e => {
      const r = cell.getBoundingClientRect();
      gsap.to(cell, {
        x: (e.clientX - r.left - r.width / 2) * .12,
        y: (e.clientY - r.top - r.height / 2) * .12,
        duration: .5, ease: 'power3.out', overwrite: 'auto'
      });
    });
    cell.addEventListener('pointerleave', () => {
      gsap.to(cell, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.5)', overwrite: 'auto' });
    });
  });

  qa('.award').forEach(a => {
    gsap.from(a, {
      xPercent: -3, opacity: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: a, start: 'top 90%' }
    });
  });
}

/* ------------------------------------------------------------
   17. MAGNETIC BUTTONS + ACTIVE NAV LINK
------------------------------------------------------------ */
function initMagnetic() {
  if (reduced) return;

  qa('.btn, .nav__cta, .chip, .copy').forEach(el => {
    const xTo = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * .3);
      yTo((e.clientY - r.top - r.height / 2) * .5);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  const links = qa('.nav__links a[href^="#"]');
  links.forEach(link => {
    const target = q(link.getAttribute('href'));
    if (!target) return;
    ScrollTrigger.create({
      trigger: target, start: 'top 55%', end: 'bottom 55%',
      onToggle: self => link.classList.toggle('is-current', self.isActive)
    });
  });
}

/* ------------------------------------------------------------
   18. TILT CARDS — pointer-driven 3D tilt for pricing + insights
------------------------------------------------------------ */
function initTilt() {
  const cards = qa('.tilt');
  if (!cards.length || reduced || window.matchMedia('(pointer:coarse)').matches) return;

  cards.forEach(card => {
    // registers rotationX/rotationY/y on the transform cache up front — without this,
    // GSAP has nothing to reset from and warns on every quickTo call
    gsap.set(card,{
    transformPerspective:800,
    rotationX:0,
    rotationY:0,
    scale:1,
    x:0,
    y:0
    });

    // quickTo's reset step needs the canonical property name — "rotateX"/"rotateY"
    // are aliases for rotationX/rotationY and aren't tracked under that key, which
    // is what triggered the "not eligible for reset" warnings on every pointermove.
    const rx = gsap.quickTo(card, "rotationX", {
      duration: .5,
      ease: "power3.out"
    });

    const ry = gsap.quickTo(card, "rotationY", {
      duration: .5,
      ease: "power3.out"
    });
    const ty = gsap.quickTo(card,"y",{duration:.5,ease:"power3"});

    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      rx(py * -8);
      ry(px * 10);
      ty(-4);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); ty(0); });
  });
}

/* ------------------------------------------------------------
   19. SCROLL-TO-TOP — appears past the fold, ring shows page progress
------------------------------------------------------------ */
function initScrollTop() {
  const btn = q('#toTop');
  const ring = q('#toTopRing');
  if (!btn) return;

  const circumference = 2 * Math.PI * 20; // matches the SVG circle's r=20
  if (ring) ring.style.strokeDasharray = String(circumference);

  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      btn.classList.toggle('is-visible', self.progress > .06);
      if (ring) ring.style.strokeDashoffset = String(circumference * (1 - self.progress));
    }
  });

  btn.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.3 });
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

/* ------------------------------------------------------------
   20. NAV SCRAMBLE — hovering a nav link decodes it from noise
------------------------------------------------------------ */
function initScramble() {
  if (reduced) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&+-/\\';
  qa('.nav__links a span, .nav__cta span').forEach(el => {
    el.dataset.origText = el.textContent; // canonical text; i18n switcher updates this when it changes the language
    let raf = null, frame = 0;
    const total = 10;

    el.addEventListener('mouseenter', () => {
      const original = el.dataset.origText;
      if (raf) cancelAnimationFrame(raf);
      frame = 0;
      const scramble = () => {
        frame++;
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            const reveal = i < (frame / total) * original.length;
            return reveal ? original[i] : chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        if (frame < total) raf = requestAnimationFrame(scramble);
        else el.textContent = original;
      };
      scramble();
    });
    el.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      el.textContent = el.dataset.origText;
    });
  });
}

/* ------------------------------------------------------------
   21. BUTTON RIPPLE — a quick radial fade from the click point
------------------------------------------------------------ */
function initRipple() {
  qa('.btn').forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.style.cssText = `
        position:absolute; left:${e.clientX - r.left}px; top:${e.clientY - r.top}px;
        width:8px; height:8px; margin:-4px 0 0 -4px; border-radius:50%;
        background:rgba(255,255,255,.55); pointer-events:none; z-index:2;
      `;
      btn.appendChild(dot);
      gsap.to(dot, {
        scale: 22, opacity: 0, duration: .7, ease: 'power2.out',
        onComplete: () => dot.remove()
      });
    });
  });
}

/* ------------------------------------------------------------
   22. CURSOR TRAIL — a short comet tail of fading dots on desktop
------------------------------------------------------------ */
function initCursorTrail() {
  if (reduced || window.matchMedia('(pointer:coarse)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed; inset:0; z-index:8500; pointer-events:none; mix-blend-mode:screen;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

  const dots = [];
  let mx = w / 2, my = h / 2, active = false, hideT = null;

  window.addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    active = true;
    clearTimeout(hideT);
    hideT = setTimeout(() => { active = false; }, 2000);
  });

  function loop() {
    ctx.clearRect(0, 0, w, h);
    if (active) {
      dots.push({ x: mx, y: my, life: 1 });
    }
    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i];
      d.life -= .045;
      if (d.life <= 0) { dots.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, 2.4 * d.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,60,20,${d.life * .5})`;
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ------------------------------------------------------------
   23. NOW STRIP — cycles through a few current-status lines
------------------------------------------------------------ */
function initNow() {
  const el = q('#nowText');
  if (!el) return;
  const lines = [
    'grading a 6-part brand campaign, delivery next week',
    'building a kinetic-type rig for an agency retainer client',
    'open for one more project slot in August',
    'rebuilding the pipeline that made this exact page'
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % lines.length;
    if (reduced) { el.textContent = lines[i]; return; }
    gsap.to(el, {
      opacity: 0, y: -6, duration: .35, ease: 'power2.in',
      onComplete: () => {
        el.textContent = lines[i];
        gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' });
      }
    });
  }, 5000);
}

/* ------------------------------------------------------------
   24. TAB-BLUR NUDGE — the browser tab calls you back when you wander off
------------------------------------------------------------ */
function initTabNudge() {
  const original = document.title;
  let t = null;
  window.addEventListener('blur', () => {
    t = setTimeout(() => { document.title = "👋 still here? — " + original; }, 1200);
  });
  window.addEventListener('focus', () => {
    clearTimeout(t);
    document.title = original;
  });
}

/* ------------------------------------------------------------
   25. SKILLS RADAR — polygon draws in and breathes gently
------------------------------------------------------------ */
function initRadar() {
  const shape = q('#radarShape');
  if (!shape) return;
  gsap.set(shape, { transformOrigin: '200px 200px' });
  gsap.to(shape, {
    scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '#radarChart', start: 'top 80%' },
    onComplete: () => {
      if (reduced) return;
      gsap.to(shape, { scale: 1.02, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }
  });
}

/* ------------------------------------------------------------
   26. GRADE PLAYGROUND — swap CSS look presets on a still frame
------------------------------------------------------------ */
function initPlayground() {
  const img = q('#pgImg');
  const tag = q('#pgTag');
  const btns = qa('.pg-btn');
  if (!img || !btns.length) return;

  const labels = {
    none: 'Original', cinematic: 'Cinematic teal/orange',
    bleach: 'Bleach bypass', vintage: 'Vintage film', noir: 'Noir'
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const look = btn.dataset.look;
      img.className = look === 'none' ? '' : `look-${look}`;
      tag.textContent = labels[look] || 'Original';
      btns.forEach(b => b.classList.toggle('is-active', b === btn));
      gsap.fromTo(tag, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' });
    });
  });

  gsap.from('.playground__frame', {
    scale: .96, opacity: 0, duration: 1.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.playground', start: 'top 80%' }
  });
}

/* ------------------------------------------------------------
   27. VIDEO TESTIMONIALS — tap to play with sound, one at a time
------------------------------------------------------------ */
function initVideoWall() {
  const cards = qa('.vcard');
  if (!cards.length) return;

  cards.forEach(card => {
    const video = q('video', card);
    const btn = q('.vcard__play', card);
    if (!video.src) video.src = card.dataset.media;

    btn.addEventListener('click', () => {
      cards.forEach(other => {
        if (other === card) return;
        const v = q('video', other);
        v.pause(); v.muted = true;
        other.classList.remove('is-playing');
      });
      video.muted = false;
      video.play().catch(() => {});
      card.classList.add('is-playing');
    });

    video.addEventListener('click', () => {
      if (video.paused) return;
      video.muted = !video.muted;
    });
  });
}

/* ------------------------------------------------------------
   28. AVAILABILITY STRIP — next 7 days, a couple pre-booked
------------------------------------------------------------ */
function initAvailability() {
  const strip = q('#availStrip');
  const nextEl = q('#availNext');
  if (!strip) return;

  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const bookedOffsets = new Set([1, 4]); // deterministic, no layout shift on refresh
  let firstOpenLabel = null;

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const isBooked = bookedOffsets.has(i);
    const day = document.createElement('div');
    day.className = 'avail__day ' + (isBooked ? 'is-booked' : 'is-open');
    day.innerHTML = `
      <span class="avail__wd">${wd[d.getDay()]}</span>
      <span class="avail__dt">${d.getDate()}</span>
      <span class="avail__st">${isBooked ? 'Booked' : 'Open'}</span>
    `;
    if (!isBooked) {
      if (!firstOpenLabel) firstOpenLabel = `${wd[d.getDay()]} ${d.getDate()}`;
      day.addEventListener('click', () => {
        qa('.avail__day', strip).forEach(o => o.classList.remove('is-selected'));
        day.classList.add('is-selected');
        const target = q('#contact');
        if (target) {
          if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2 });
          else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }
        setTimeout(() => q('input[name="name"]')?.focus(), reduced ? 0 : 700);
      });
    }
    strip.appendChild(day);
  }
  if (nextEl) nextEl.textContent = firstOpenLabel
    ? `Next open slot — ${firstOpenLabel}. Tap a day to jump to the form.`
    : 'Fully booked this week — get in touch for the week after.';

  // built after initReveals already ran, so it gets its own reveal here
  gsap.fromTo(strip.children, { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: .9, ease: 'expo.out', stagger: .08,
    scrollTrigger: { trigger: strip, start: 'top 88%' }
  });
}

/* ------------------------------------------------------------
   29. NEWSLETTER FORM
------------------------------------------------------------ */
function initNewsletter() {
  const form = q('#nlForm');
  if (!form) return;
  const note = q('#nlNote');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = new FormData(form).get('email');
    if (!email || !email.includes('@')) {
      note.textContent = 'That email doesn\u2019t look right.';
      note.style.color = 'var(--acc)';
      gsap.fromTo(form, { x: -6 }, { x: 0, duration: .5, ease: 'elastic.out(1,.35)' });
      return;
    }
    note.style.color = '';
    note.textContent = 'Subscribed \u2014 first note lands next month.';
    form.reset();
    gsap.fromTo(note, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' });
  });
}

/* ------------------------------------------------------------
   30. CURRENT QUEUE — progress bars fill in as they enter view
------------------------------------------------------------ */
function initQueue() {
  qa('.qitem__bar i').forEach(bar => {
    const target = +bar.dataset.progress || 0;
    gsap.to(bar, {
      width: target + '%', duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: bar, start: 'top 92%' }
    });
  });
}

/* ------------------------------------------------------------
   31. INSTANT ESTIMATE — pick options, get a live ballpark price
------------------------------------------------------------ */
function initEstimate() {
  const typeGroup = q('#estType');
  const scopeGroup = q('#estScope');
  const rushGroup = q('#estRush');
  const out = q('#estValue');
  if (!typeGroup || !scopeGroup || !rushGroup || !out) return;

  const groups = [typeGroup, scopeGroup, rushGroup];
  const state = { v: +q('.eg-btn.is-active', typeGroup).dataset.price };

  const calc = () => {
    const price = +q('.eg-btn.is-active', typeGroup).dataset.price;
    const scopeMult = +q('.eg-btn.is-active', scopeGroup).dataset.mult;
    const rushMult = +q('.eg-btn.is-active', rushGroup).dataset.mult;
    const total = Math.round((price * scopeMult * rushMult) / 5) * 5;
    gsap.to(state, {
      v: total, duration: .6, ease: 'power2.out',
      onUpdate: () => { out.textContent = Math.round(state.v); }
    });
  };

  groups.forEach(group => {
    qa('.eg-btn', group).forEach(btn => {
      btn.addEventListener('click', () => {
        qa('.eg-btn', group).forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        calc();
      });
    });
  });
}

/* ------------------------------------------------------------
   BOOT
------------------------------------------------------------ */
window.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initScroll();
  initGL();
  initCursor();
  initNav();
  initTicker();
  initReveals();
  initServices();
  initWork();
  initCompare();
  initReel();
  initGallery();
  initFaq();
  initClients();
  initMagnetic();
  initTilt();
  initScrollTop();
  initScramble();
  initRipple();
  initCursorTrail();
  initNow();
  initTabNudge();
  initRadar();
  initPlayground();
  initVideoWall();
  initAvailability();
  initNewsletter();
  initQueue();
  initEstimate();
  initBits();
  initLoader();
  window.addEventListener('load', () => { ScrollTrigger.refresh(); setTimeout(settleReveals, 300); });
  // Anton/Inter/JetBrains Mono swap in late and can reflow text-driven section
  // heights (FAQ answers, the about copy) after ScrollTrigger already measured them
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { ScrollTrigger.refresh(); setTimeout(settleReveals, 200); });
  }
});