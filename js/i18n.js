/**
 * i18n.js — Estiellart
 * Traducciones ES/EN usando selectores CSS.
 * No requiere data-i18n en el HTML — el mapa de selectores
 * vive acá y aplica las traducciones al DOM al cambiar de idioma.
 */
'use strict';

const LANG_KEY = 'estiellart-lang';

// =============================================================
// MAPA DE TRADUCCIONES
// key: selector CSS | value: { es, en, html? }
// html:true → usa innerHTML en vez de textContent
// ph:true   → actualiza el atributo placeholder
// =============================================================
const i18nMap = [
  // ── NAV (todas las páginas) ───────────────────────────────
  { s: '.nav__link[data-page="gallery"]',     es: 'Galería',        en: 'Gallery' },
  { s: '.nav__link[data-page="commissions"]', es: 'Comisiones',     en: 'Commissions' },
  { s: '.nav__link[data-page="contact"]',     es: 'Contacto',       en: 'Contact' },
  { s: '#nav-commission-cta',                 es: '✦ Pedir comisión', en: '✦ Commission me' },

  // ── FOOTER (todas las páginas) ────────────────────────────
  { s: '.footer__copyright', es: '© 2025 Estiellart. Todos los derechos reservados.', en: '© 2025 Estiellart. All rights reserved.' },
  { s: '.footer__anti-ai',   es: '🚫 Prohibido el uso de mis ilustraciones para entrenar IAs.', en: '🚫 Using my illustrations to train AIs is strictly forbidden.' },
  { s: '.footer__link--privacy', es: 'Términos y Condiciones', en: 'Terms & Conditions' },

  // ── INDEX — HERO ──────────────────────────────────────────
  { s: '.hero__eyebrow', es: '✦ Ilustradora Digital', en: '✦ Digital Illustrator' },
  { s: '#hero-title', html: true,
    es: 'Arte que cuenta<br /><span class="hero__title--accent">tu historia.</span>',
    en: 'Art that tells<br /><span class="hero__title--accent">your story.</span>' },
  { s: '.hero__description',
    es: 'Bienvenid@ a mi pequeño espacio en internet. Aquí encontrarás mis comisiones, galería, precios y todo lo que necesitás saber para encargar tu ilustración.',
    en: 'Welcome to my little corner of the internet. Here you\'ll find commissions, gallery, prices and everything you need to know to order your illustration.' },
  { s: '#hero-commission-btn', es: '✦ Ver comisiones', en: '✦ View commissions' },
  { s: '.hero__actions .btn--ghost', es: 'Ver galería', en: 'View gallery' },
  { s: '#hero-badge-text',          es: 'Comisiones abiertas', en: 'Commissions open' },

  // ── INDEX — GALLERY ───────────────────────────────────────
  { s: '.gallery > .container > .gallery__header .label', es: 'Portafolio', en: 'Portfolio' },
  { s: '#gallery-title',   es: 'Galería', en: 'Gallery' },
  { s: '.gallery__subtitle', es: 'Una mezcla curada de semi-realismo, chibis, ternurines y más.', en: 'A curated mix of semi-realism, chibis, ternurines and more.' },
  { s: '#filter-all',       es: 'Todo',          en: 'All' },
  { s: '#filter-semi',      es: 'Semi Realista',  en: 'Semi Realistic' },

  // ── INDEX — BENTO ─────────────────────────────────────────
  { s: '.shop-bento .label',        es: 'Comisiones ✦', en: 'Commissions ✦' },
  { s: '#commissions-bento-title', html: true, es: 'Tu personaje,<br/>mi pincel.', en: 'Your character,<br/>my brushes.' },
  { s: '.shop-bento__description', html: true,
    es: 'Desde sketches rápidos hasta ilustraciones full color. Chibis, ternurines, semi-realismo y más — desde <strong>$5 USD</strong>.',
    en: 'From quick sketches to full color illustrations. Chibis, ternurines, semi-realism and more — starting at <strong>$5 USD</strong>.' },
  { s: '#bento-commission-btn', es: 'Ver todos los precios ✦', en: 'See all prices ✦' },

  // ── COMMISSIONS — HEADER ──────────────────────────────────
  { s: '.store-header .label', es: 'Precios y servicios', en: 'Prices & services' },
  { s: '#store-title', html: true,
    es: 'Comisiones & <span class="store-header__title--accent">Precios</span>',
    en: 'Commissions & <span class="store-header__title--accent">Prices</span>' },
  { s: '.store-header__description',
    es: 'Ilustraciones digitales de personajes, sketches, chibis, ternurines y más. Para uso personal. Pago 100% por PayPal antes de comenzar.',
    en: 'Digital character illustrations, sketches, chibis, ternurines and more. For personal use. 100% payment via PayPal before starting.' },
  { s: '.store-header__status-text', es: 'Comisiones Abiertas', en: 'Commissions Open' },

  // ── COMMISSIONS — PRICE TABLE ─────────────────────────────
  { s: '.tiers > .container > .tiers__header .label', es: 'Estilos disponibles', en: 'Available styles' },
  { s: '#tiers-title', es: 'Tabla de Precios', en: 'Price List' },
  { s: '#price-sketch-bw .price-block__title span:last-child',   es: 'Sketch en Blanco y Negro', en: 'B&W Sketch' },
  { s: '#price-sketch-color .price-block__title span:last-child', es: 'Sketch con Color', en: 'Color Sketch' },
  { s: '#price-extras .price-block__title span:last-child',       es: 'Extras y Opciones especiales', en: 'Extras & Special Options' },
  { s: '#price-full-color .price-block__note',   es: 'Tiempo estimado: 1 a 4 semanas', en: 'Estimated time: 1 to 4 weeks' },
  { s: '#price-sketch-bw .price-block__note',    es: 'Tiempo estimado: 1 a 2 semanas', en: 'Estimated time: 1 to 2 weeks' },
  { s: '#price-sketch-color .price-block__note', es: 'Tiempo estimado: 1 a 2 semanas', en: 'Estimated time: 1 to 2 weeks' },
  { s: '#price-chibis .price-block__note',       es: 'Tiempo estimado: 1 semana', en: 'Estimated time: 1 week' },
  { s: '#price-ternurines .price-block__note',   es: 'Tiempo estimado: 1 semana', en: 'Estimated time: 1 week' },
  { s: '#price-porcelanitas .price-block__note', es: 'Tiempo estimado: 1 a 2 semanas', en: 'Estimated time: 1 to 2 weeks' },
  { s: '#price-extras .price-block__note',       es: 'Tiempo estimado: 1 semana', en: 'Estimated time: 1 week' },
  { s: '.tier-card--popular .tier-card__badge',  es: 'Más completo', en: 'Most complete' },
  // Todos los botones de tier cards
  { s: '.tier-card__cta', all: true, es: 'Pedir ✦', en: 'Order ✦' },
  // Tier descriptions (Full Color)
  { s: '#tier-fullcolor-bust .tier-card__description',     es: 'Retrato desde el pecho/busto',       en: 'Chest-up portrait' },
  { s: '#tier-fullcolor-half .tier-card__description',     es: 'Personaje hasta la cintura',          en: 'Waist-up character' },
  { s: '#tier-fullcolor-full .tier-card__description',     es: 'Personaje de cuerpo entero',          en: 'Full body character' },
  { s: '#tier-sketchbw-bust .tier-card__description',      es: 'Boceto desde el pecho',               en: 'Chest-up sketch' },
  { s: '#tier-sketchbw-half .tier-card__description',      es: 'Boceto hasta la cintura',             en: 'Waist-up sketch' },
  { s: '#tier-sketchbw-full .tier-card__description',      es: 'Boceto de cuerpo entero',             en: 'Full body sketch' },
  { s: '#tier-sketchcolor-bust .tier-card__description',   es: 'Boceto coloreado (busto)',             en: 'Colored sketch (bust)' },
  { s: '#tier-sketchcolor-half .tier-card__description',   es: 'Boceto coloreado (medio cuerpo)',      en: 'Colored sketch (half body)' },
  { s: '#tier-sketchcolor-full .tier-card__description',   es: 'Boceto coloreado (cuerpo entero)',     en: 'Colored sketch (full body)' },
  { s: '#tier-chibi-simple-1-2 .tier-card__description',   es: 'Chibi simple coloreado',              en: 'Simple colored chibi' },
  { s: '#tier-chibi-simple-3-4 .tier-card__description',   es: 'Chibi simple — grupo',                en: 'Simple chibi — group' },
  { s: '#tier-chibi-full-1-2 .tier-card__description',     es: 'Chibi full color',                    en: 'Full color chibi' },
  { s: '#tier-ternurin-1 .tier-card__description',         es: 'Diseño singular adorable',             en: 'Single cute design' },
  { s: '#tier-ternurin-2 .tier-card__description',         es: 'Pareja o duo',                        en: 'Couple or duo' },
  { s: '#tier-ternurin-bebe .tier-card__description',      es: 'Versión mini/bebé',                   en: 'Mini/baby version' },
  { s: '#tier-porce-headshot .tier-card__description',     es: 'Retrato estilo porcelana',             en: 'Porcelain-style portrait' },
  { s: '#tier-porce-half .tier-card__description',         es: 'Medio cuerpo estilo porcelana',       en: 'Porcelain-style half body' },
  { s: '#tier-porce-full .tier-card__description',         es: 'Cuerpo entero estilo porcelana',      en: 'Porcelain-style full body' },
  { s: '#tier-ych-relicario .tier-card__description',      es: 'Colores, texto y fondo personalizable', en: 'Colors, text and background customizable' },
  { s: '#tier-lineart .tier-card__description',            es: 'Solo el lineart finalizado',           en: 'Finished lineart only' },
  { s: '#tier-flatcolor .tier-card__description',          es: 'Lineart + colores planos',             en: 'Lineart + flat colors' },
  // Price notes
  { s: '.price-notes__title', es: 'Notas importantes sobre precios', en: 'Important notes about pricing' },
  { s: '.price-notes__list li:nth-child(1)', es: '✦ Todos los precios son para uso personal.', en: '✦ All prices are for personal use.' },
  { s: '.price-notes__list li:nth-child(2)', es: '✦ Personaje extra: +50% del precio base.', en: '✦ Extra character: +50% of the base price.' },
  { s: '.price-notes__list li:nth-child(3)', es: '✦ Fondo simple incluido. Fondos complicados tienen costo extra.', en: '✦ Simple background included. Complex backgrounds have an extra cost.' },
  { s: '.price-notes__list li:nth-child(4)', es: '✦ Pago por PayPal. Si el precio supera $20 USD, se permite pagar 50% al inicio y 50% al finalizar.', en: '✦ Payment via PayPal. If the price exceeds $20 USD, you can pay 50% upfront and 50% before delivery.' },
  { s: '.price-notes__list li:nth-child(5)', es: '✦ Para uso comercial, consultá directamente.', en: '✦ For commercial use, ask me directly.' },
  { s: '.price-notes__list li:nth-child(6)', es: '🚫 Prohibido ingresar las ilustraciones a cualquier IA.', en: '🚫 Using the illustrations in any AI is strictly forbidden.' },
  { s: '.price-notes .btn--ghost', es: 'Leer Términos y Condiciones completos →', en: 'Read full Terms & Conditions →' },

  // ── COMMISSIONS — PROCESS ─────────────────────────────────
  { s: '.process .label',         es: 'Cómo funciona', en: 'How it works' },
  { s: '#process-title',          es: 'El Proceso Creativo', en: 'The Creative Process' },
  { s: '#step-inquiry .process__step-title', es: 'Consulta', en: 'Inquiry' },
  { s: '#step-inquiry .process__step-description', es: 'Compartís tu visión: tipo de comisión, cantidad de personajes y todo el material de referencia (poses, expresiones, ambientación, etc).', en: 'Share your vision: commission type, number of characters and all reference material you have (poses, expressions, settings, etc).' },
  { s: '#step-draft .process__step-title',       es: 'Boceto', en: 'Sketch' },
  { s: '#step-draft .process__step-description', es: 'Preparo el boceto de composición para que revisés la pose general. Hasta 3 propuestas de composición incluidas.', en: 'I prepare the composition sketch so you can review the general pose. Up to 3 composition proposals included.' },
  { s: '#step-refine .process__step-title',       es: 'Delineado & Color', en: 'Lineart & Color' },
  { s: '#step-refine .process__step-description', es: 'Enviamos avances del delineado y el color base para tus revisiones. El resultado final se revisa antes de la entrega en alta resolución.', en: 'I send lineart and base color drafts for your revisions. The final result is reviewed before high-resolution delivery.' },
  { s: '#step-delivery .process__step-title',       es: 'Entrega', en: 'Delivery' },
  { s: '#step-delivery .process__step-description', es: 'La ilustración finalizada se envía por correo o Google Drive (disponible 30 días). ¡Tu arte listo para usar y disfrutar!', en: 'The finished illustration is sent via email or Google Drive (available for 30 days). Your art, ready to use and enjoy!' },

  // ── COMMISSIONS — CTA ────────────────────────────────────
  { s: '.commission-cta .label', es: '¿Todo listo?', en: 'Ready to start?' },
  { s: '#cta-title', html: true,
    es: '¡Hagamos algo<br /><span class="hero__title--accent">hermoso juntos!</span>',
    en: 'Let\'s make something<br /><span class="hero__title--accent">beautiful together!</span>' },
  { s: '.commission-cta__desc', es: 'Enviame un mensaje contándome tu idea y te respondo en menos de 48 horas.', en: 'Send me a message with your idea and I\'ll reply within 48 hours.' },
  { s: '#cta-contact-btn', es: '✦ Contactar ahora', en: '✦ Contact me now' },

  // ── CONTACT — HEADER ─────────────────────────────────────
  { s: '.contact-header .label', es: 'Hablemos', en: 'Let\'s talk' },
  { s: '#contact-title', html: true,
    es: 'Empecemos algo <span class="contact-header__title--accent">hermoso.</span>',
    en: 'Let\'s start something <span class="contact-header__title--accent">beautiful.</span>' },
  { s: '.contact-header__description', es: '¿Tenés una idea en mente? Contame tu visión, personaje y estilo preferido y te respondo a la brevedad.', en: 'Have an idea in mind? Tell me your vision, character and preferred style and I\'ll get back to you shortly.' },

  // ── CONTACT — FORM ───────────────────────────────────────
  { s: '.contact__form-header .label',  es: 'Solicitud de Comisión', en: 'Commission Request' },
  { s: '#contact-form-title',            es: 'Enviar Mensaje', en: 'Send a Message' },
  { s: 'label[for="name"]',             es: 'Nombre / Alias', en: 'Name / Alias' },
  { s: '#name',              ph: true,   es: 'Tu nombre o alias artístico', en: 'Your name or artistic alias' },
  { s: 'label[for="email"]',            es: 'Correo Electrónico', en: 'Email Address' },
  { s: '#email',             ph: true,   es: 'tucorreo@ejemplo.com', en: 'your@email.com' },
  { s: 'label[for="subject"]',          es: 'Tipo de Comisión', en: 'Commission Type' },
  { s: '#subject option[value=""]',     es: 'Seleccioná el tipo', en: 'Select a type' },
  { s: '#subject option[value="sketch-bw"]',    es: 'Sketch en B&N', en: 'B&W Sketch' },
  { s: '#subject option[value="sketch-color"]', es: 'Sketch con Color', en: 'Color Sketch' },
  { s: '#subject option[value="otro"]',         es: 'Otro / Consulta general', en: 'Other / General inquiry' },
  { s: 'label[for="message"]',          es: 'Descripción de tu comisión', en: 'Commission description' },
  { s: '#message',           ph: true,   es: 'Contame tu idea: personaje, pose, expresión, colores, referencias... ¡todo suma!', en: 'Tell me your idea: character, pose, expression, colors, references... everything helps!' },
  { s: '#form-submit-btn',              es: '✦ Enviar solicitud', en: '✦ Send request' },

  // ── CONTACT — SIDEBAR ────────────────────────────────────
  { s: '.contact-details__title',                                 es: 'Información de Contacto', en: 'Contact Information' },
  { s: '.contact-details__item:nth-child(1) .label',             es: 'Tiempo de respuesta', en: 'Response time' },
  { s: '.contact-details__item:nth-child(1) .contact-details__value', es: 'Generalmente en menos de 48 horas hábiles', en: 'Usually within 48 business hours' },
  { s: '.contact-details__item:nth-child(2) .label',             es: 'Método de Pago', en: 'Payment Method' },
  { s: '.contact-details__item:nth-child(2) .contact-details__value', es: 'PayPal · Pago antes de comenzar', en: 'PayPal · Payment before starting' },
  { s: '.contact-details__item:nth-child(3) .label',             es: 'Estado actual', en: 'Current status' },
  { s: '.contact-socials__title',                                 es: 'Redes Sociales', en: 'Social Media' },
  { s: '.contact-featured__caption p',                            es: 'Cada trazo cuenta una historia. ✦', en: 'Every stroke tells a story. ✦' },

  // ── CONTACT — TOS ────────────────────────────────────────
  { s: '.tos .label',     es: 'Legal', en: 'Legal' },
  { s: '#tos-title',      es: 'Términos y Condiciones', en: 'Terms & Conditions' },
  { s: '#tos-do .tos__block-title',      es: '✅ Acepto dibujar (I Do)',   en: '✅ I accept / I Do' },
  { s: '#tos-dont .tos__block-title',    es: '🚫 No acepto (I Don\'t)',    en: '🚫 I don\'t accept / I Don\'t' },
  { s: '#tos-rules .tos__block-title',   es: '📜 Reglas y Proceso',        en: '📜 Rules & Process' },
  { s: '#tos-refunds .tos__block-title', es: '💸 Reembolsos',             en: '💸 Refunds' },
  { s: '#tos-rights .tos__block-title',  es: '⚖️ Derechos de Uso',        en: '⚖️ Usage Rights' },
  // I Do items
  { s: '#tos-do li:nth-child(1)', es: 'Personajes (personas reales, OC\'s, etc.)', en: 'Characters (real people, OC\'s, etc.)' },
  { s: '#tos-do li:nth-child(2)', es: 'Furry (diseños sencillos)', en: 'Furry (simple designs)' },
  { s: '#tos-do li:nth-child(3)', es: 'Fan arts', en: 'Fan arts' },
  { s: '#tos-do li:nth-child(4)', es: 'Selfship', en: 'Selfship' },
  { s: '#tos-do li:nth-child(5)', es: 'Hojas estilo journal', en: 'Journal-style pages' },
  { s: '#tos-do li:nth-child(6)', es: 'Curis', en: 'Curis' },
  { s: '#tos-do li:nth-child(7)', es: 'Mascotas', en: 'Pets' },
  { s: '#tos-do li:nth-child(8)', es: 'Fondos naturales', en: 'Natural backgrounds' },
  // I Don't items
  { s: '#tos-dont li:nth-child(1)', es: 'Mecha', en: 'Mecha' },
  { s: '#tos-dont li:nth-child(2)', es: 'Gore', en: 'Gore' },
  { s: '#tos-dont li:nth-child(3)', es: 'NSFW', en: 'NSFW' },
  { s: '#tos-dont li:nth-child(4)', es: 'Ilustraciones que inciten al odio', en: 'Illustrations that incite hatred' },
  { s: '#tos-dont li:nth-child(5)', es: 'Recolorear o imitar el estilo de otro artista', en: 'Recoloring or imitating another artist\'s style' },
  // Refunds
  { s: '#tos-refunds li:nth-child(1)', es: 'Solo se realizan reembolsos si yo no puedo finalizar el trabajo.', en: 'Refunds are only issued if I cannot finish the work.' },
  { s: '#tos-refunds li:nth-child(2)', es: 'No se realizan reembolsos por insatisfacción con el resultado final.', en: 'No refunds are issued due to dissatisfaction with the final result.' },
  { s: '#tos-refunds li:nth-child(3)', es: 'Asegurate de darme todos los detalles durante el proceso para que el resultado sea satisfactorio.', en: 'Make sure to give me all the details during the process so the result is satisfactory.' },
  // Rights
  { s: '#tos-rights li:nth-child(1)', es: 'Los derechos de mis ilustraciones me pertenecen. El precio cubre la creación, no la venta de derechos.', en: 'I retain all rights to my illustrations. The price covers creation, not the sale of rights.' },
  { s: '#tos-rights li:nth-child(2)', html: true, es: 'El precio base es para <strong>uso personal</strong> (no podés vender el producto terminado).', en: 'The base price is for <strong>personal use</strong> (you cannot sell the finished product).' },
  { s: '#tos-rights li:nth-child(3)', html: true, es: 'Para <strong>uso comercial</strong>, consultá directamente para llegar a un acuerdo.', en: 'For <strong>commercial use</strong>, ask me directly to reach an agreement.' },
  { s: '#tos-rights li:nth-child(4)', html: true, es: '🚫 Está <strong>rotundamente prohibido</strong> ingresar mis ilustraciones a cualquier IA.', en: '🚫 It is <strong>strictly forbidden</strong> to use my illustrations in any AI.' },
];

// =============================================================
// MOTOR DE i18n
// =============================================================
function applyTranslations(lang) {
  i18nMap.forEach(({ s, es, en, html, ph, all }) => {
    const text = lang === 'en' ? en : es;
    if (!text) return;

    const elements = all ? document.querySelectorAll(s) : [document.querySelector(s)];
    elements.forEach((el) => {
      if (!el) return;
      if (ph)        el.placeholder = text;
      else if (html) el.innerHTML   = text;
      else           el.textContent  = text;
    });
  });

  // Botón de idioma: muestra a cuál idioma vas a cambiar
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = lang === 'en' ? 'ES' : 'EN';

  // Actualizar el atributo lang del documento
  document.documentElement.lang = lang === 'en' ? 'en' : 'es';
}

function getLang() {
  return localStorage.getItem('estiellart-lang') || 'es';
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getLang();
  if (currentLang !== 'es') applyTranslations(currentLang);

  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = getLang() === 'es' ? 'en' : 'es';
    localStorage.setItem('estiellart-lang', next);
    applyTranslations(next);
  });
});
