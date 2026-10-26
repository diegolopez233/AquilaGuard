'use strict';

// 1. Configuración. Demo local: no usa red ni almacenamiento permanente.
const $ = id => document.getElementById(id);
const pages = ['inicio', 'revisar', 'alertas', 'resumen', 'ajustes'];
const types = {
  enlace: {
    label: 'Pega un enlace ficticio',
    help: 'Incluye http:// o https:// y un dominio. Máximo 2000 caracteres. No abriremos la dirección.',
    example: 'https://banc0.example/validar',
    neutral: 'https://biblioteca.example/horarios'
  },
  correo: {
    label: 'Pega el contenido de un correo ficticio',
    help: 'Pega el asunto o el texto del correo, no solo una dirección. Entre 5 y 2000 caracteres.',
    example: 'Asunto: cuenta suspendida. Es urgente, entrega tu clave en https://cuenta.example',
    neutral: 'La biblioteca informa que el taller de lectura comienza el jueves.'
  },
  mensaje: {
    label: 'Pega un mensaje o SMS ficticio',
    help: 'Escribe entre 5 y 2000 caracteres. Usa datos inventados.',
    example: 'Premio disponible: envía tu clave para recibirlo hoy.',
    neutral: 'El taller de lectura comienza el jueves a las diez.'
  },
  telefono: {
    label: 'Ingresa un teléfono ficticio',
    help: 'Entre 7 y 15 dígitos. Se permiten + al inicio, espacios, paréntesis y guiones. No llamaremos ni consultaremos reportes.',
    example: '+1 202 555 0100',
    neutral: '+1 202 555 0101'
  }
};

// 2. Estado de la pestaña. Recargar elimina esta lista y las preferencias.
const session = [];
let currentType = 'enlace';
let timer = null;

// Estas operaciones se comparten para evitar repetir cambios del formulario.
function setBusy(busy) {
  $('analyze').disabled = busy;
  $('scan-input').disabled = busy;
  $('analyze').textContent = busy ? 'Revisando ejemplo…' : 'Analizar ejemplo';
}

function cancel() {
  clearTimeout(timer);
  timer = null;
  setBusy(false);
}

function resetFeedback(message = '') {
  $('input-error').textContent = '';
  $('scan-input').removeAttribute('aria-invalid');
  $('result').hidden = true;
  $('status').textContent = message;
  $('clear-status').textContent = '';
}

// 3. Navegación y selección del contenido.
function showPage(focus = true) {
  const requested = location.hash.slice(1);
  const target = pages.includes(requested) ? requested : 'inicio';

  document.querySelectorAll('main>section').forEach(section => {
    section.hidden = section.id !== target;
  });
  document.querySelectorAll('nav a').forEach(link => {
    if (link.hash === '#' + target) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  document.title = target.charAt(0).toUpperCase() + target.slice(1) + ' | Aquila Guard';
  $('page-title').textContent = {
    inicio: 'Tu orientación digital', revisar: 'Revisa un contenido',
    alertas: 'Centro de alertas', resumen: 'Resumen de tu actividad', ajustes: 'Tus preferencias'
  }[target];
  if (focus) $('h-' + target).focus({ preventScroll: true });
  window.scrollTo(0, 0);
  render();
}

function setType() {
  cancel();
  currentType = document.querySelector('[name=tipo]:checked').value;
  const config = types[currentType];
  $('input-label').textContent = config.label;
  $('input-help').textContent = config.help;
  $('scan-input').value = '';
  const inputModes = { telefono: 'tel', enlace: 'url' };
  $('scan-input').inputMode = inputModes[currentType] || 'text';
  resetFeedback();
}

function sample(key) {
  cancel();
  $('scan-input').value = types[currentType][key];
  resetFeedback('Ejemplo ficticio cargado. Puedes editarlo.');
  $('scan-input').focus();
}

// 4. Reglas puras: reciben datos y devuelven datos, sin tocar la pantalla.
function isValidLink(text) {
  // URL() normaliza barras ausentes o extra. Aquí exigimos la forma anunciada.
  if (!/^https?:\/\/[^/\\]/i.test(text) || /\\/.test(text)) return false;
  try {
    const url = new URL(text);
    return ['http:', 'https:'].includes(url.protocol)
      && url.hostname.includes('.')
      && !/\s/.test(text)
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}

function validate(type, text) {
  if (!text.trim()) return 'Ingresa un ejemplo antes de analizar.';
  if (text.length > 2000) return 'El contenido supera 2000 caracteres. Acórtalo e inténtalo otra vez.';

  if (type === 'enlace' && !isValidLink(text)) {
    return 'Escribe una dirección completa como https://biblioteca.example/horarios, sin espacios ni credenciales.';
  }
  if (type === 'telefono') {
    const digits = text.replace(/\D/g, '').length;
    if (!/^\+?[\d\s()-]+$/.test(text) || digits < 7 || digits > 15) {
      return 'Escribe entre 7 y 15 dígitos, con + inicial, espacios, guiones o paréntesis si los necesitas.';
    }
  }
  if (['correo', 'mensaje'].includes(type) && text.length < 5) {
    return 'Agrega al menos 5 caracteres de contenido para este ejemplo.';
  }
  return '';
}

function evaluate(type, text) {
  if (type === 'telefono') {
    return {
      title: 'Identidad del teléfono no comprobada',
      reasons: ['Solo revisamos su formato. No consultamos reputación, reportes ni titularidad.'],
      signal: false,
      recommend: 'Si te contacta una supuesta institución, verifica su identidad por un canal oficial que ya conozcas.'
    };
  }

  const reasons = [];
  const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  for (const word of ['urgente', 'suspendida', 'bloqueo', 'clave', 'premio']) {
    if (new RegExp('\\b' + word + '\\b').test(normalized)) {
      reasons.push('El texto contiene «' + word + '», una palabra incluida en las reglas de esta demo.');
    }
  }
  if (normalized.includes('banc0')) {
    reasons.push('El texto contiene «banc0», patrón ficticio de sustitución de letras.');
  }
  if (normalized.includes('http://')) {
    reasons.push('El ejemplo incluye http sin cifrado. Esto no determina la legitimidad del sitio.');
  }

  const signal = reasons.length > 0;
  return {
    title: signal ? 'Señales para revisar en este ejemplo' : 'Sin señales de las reglas de ejemplo',
    reasons: signal ? reasons : ['Ninguno de los patrones locales coincide. Estas reglas son limitadas y pueden omitir contenidos peligrosos.'],
    signal,
    recommend: signal
      ? 'Haz una pausa. No entregues claves. Consulta por un canal oficial conocido antes de responder.'
      : 'Mantén la cautela y verifica la identidad por un canal oficial conocido.'
  };
}

// 5. Un envío válido simula 600 ms de trabajo y luego registra el resultado.
function analyze(event) {
  event.preventDefault();
  if (timer) return;

  const text = $('scan-input').value.trim();
  const type = currentType;
  const error = validate(type, text);
  $('input-error').textContent = error;
  $('scan-input').setAttribute('aria-invalid', error ? 'true' : 'false');
  $('result').hidden = true;
  if (error) {
    $('status').textContent = '';
    $('scan-input').focus();
    return;
  }

  const fail = $('fail-demo').checked;
  setBusy(true);
  $('status').textContent = 'Simulación en curso. Duración prevista: 0,6 segundos.';
  timer = setTimeout(() => {
    cancel();
    if (fail) {
      $('status').textContent = 'Error simulado de demostración. Desmarca la opción y vuelve a analizar. Conservamos tu entrada.';
      return;
    }
    const result = evaluate(type, text);
    session.unshift({ ...result, type, text, reviewed: false, id: session.length + 1 });
    showResult(result, type, text);
    render();
  }, 600);
}

// textContent muestra la entrada como texto: no interpreta HTML del usuario.
function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function showResult(result, type, text) {
  $('clear-status').textContent = '';
  $('result-title').textContent = result.title;
  $('result-input').textContent = types[type].label + ': ' + text;
  $('reasons').replaceChildren(...result.reasons.map(reason => element('li', reason)));
  $('recommend').textContent = result.recommend;
  $('result').hidden = false;
  $('status').textContent = 'Resultado de ejemplo disponible.';
  if (!$('revisar').hidden) $('result-title').focus();
}

// 6. Alertas y Resumen siempre se calculan desde la misma lista de sesión.
function createAlert(item, index) {
  const article = document.createElement('article');
  const heading = element('h2', 'Ejemplo ' + item.id + ' · ' + item.title);
  const content = element('p', item.text);
  const status = element('p', item.reviewed ? 'Revisada' : 'Sin revisar');
  const label = item.reviewed
    ? 'Marcar ejemplo ' + item.id + ' sin revisar'
    : 'Marcar ejemplo ' + item.id + ' como revisado';
  const button = element('button', label);
  button.onclick = () => {
    item.reviewed = !item.reviewed;
    render();
    $('review-status').textContent = 'Ejemplo ' + item.id + (item.reviewed ? ' marcado como revisado.' : ' marcado sin revisar.');
    $('alert-list').querySelectorAll('button')[index].focus();
  };
  article.append(heading, content, status, button);
  return article;
}

function render() {
  const cards = session.length
    ? session.map(createAlert)
    : [element('p', 'Aún no hay resultados. Comienza en Revisar.')];
  $('alert-list').replaceChildren(...cards);

  const unread = session.filter(item => !item.reviewed).length;
  $('mark').disabled = unread === 0;
  $('total').textContent = session.length;
  $('signals').textContent = session.filter(item => item.signal).length;
  $('unread').textContent = unread;
  renderDashboard(unread);
}

// La portada y sus gráficos usan la misma sesión; no hay métricas inventadas.
function renderDashboard(unread) {
  const counts = {
    total: session.length, signals: session.filter(item => item.signal).length,
    unread, reviewed: session.length - unread
  };
  document.querySelectorAll('[data-count]').forEach(node => {
    node.textContent = counts[node.dataset.count];
  });
  document.querySelectorAll('[data-meter]').forEach(node => {
    node.style.width = (counts.total ? counts[node.dataset.meter] / counts.total * 100 : 0) + '%';
  });
  for (const type of Object.keys(types)) {
    const count = session.filter(item => item.type === type).length;
    document.querySelector('[data-type-count="' + type + '"]').textContent = count;
    document.querySelector('[data-type-bar="' + type + '"]').style.height =
      (counts.total ? count / counts.total * 100 : 0) + '%';
  }
  const recent = session.slice(0, 3).map(item => {
    const row = document.createElement('div');
    row.className = 'activity';
    const number = element('span', String(item.id).padStart(2, '0'));
    number.className = 'ico';
    const body = document.createElement('div');
    body.append(element('b', item.title), element('small', item.text));
    const state = element('span', item.type === 'telefono' ? 'Solo formato' : item.signal ? 'Con señales' : 'Sin patrones');
    state.className = item.signal ? 'risk flagged' : 'risk';
    row.append(number, body, state);
    return row;
  });
  const empty = element('p', 'Aún no hay resultados. Comienza en Revisar.');
  empty.className = 'empty-state';
  $('recent-list').replaceChildren(...(recent.length ? recent : [empty]));
}

function markAllReviewed() {
  session.forEach(item => { item.reviewed = true; });
  render();
  $('review-status').textContent = 'Todas las fichas de ejemplo están marcadas como revisadas.';
  $('review-status').tabIndex = -1;
  $('review-status').focus();
}

function clearSession() {
  cancel();
  session.length = 0;
  $('scan-input').value = '';
  resetFeedback();
  // Ocultar el panel no borra sus textos del DOM.
  for (const id of ['result-title', 'result-input', 'reasons', 'recommend']) {
    $(id).textContent = '';
  }
  $('fail-demo').checked = false;
  $('review-status').textContent = '';
  render();
  $('clear-status').textContent = 'Sesión borrada. No quedan fichas ni contenido ingresado en la demo.';
}

// 7. Conectar los controles existentes. No cambia HTML, estilos ni textos.
window.addEventListener('hashchange', showPage);
document.querySelectorAll('[name=tipo]').forEach(input => input.addEventListener('change', setType));
document.querySelectorAll('[data-review-type]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('[name=tipo][value="' + link.dataset.reviewType + '"]').checked = true;
    setType();
  });
});
$('scan-form').addEventListener('submit', analyze);
$('scan-input').oninput = () => { $('clear-status').textContent = ''; };
$('example').onclick = () => sample('example');
$('neutral').onclick = () => sample('neutral');
$('mark').onclick = markAllReviewed;
$('clear').onclick = clearSession;

$('retry').onclick = () => {
  $('result').hidden = true;
  $('scan-input').value = '';
  $('status').textContent = 'Listo para otro ejemplo.';
  $('scan-input').focus();
};
$('tour').onclick = () => {
  $('tour-help').hidden = false;
  $('tour').setAttribute('aria-expanded', 'true');
  $('tour-help').scrollIntoView({ block: 'nearest' });
};
$('tour').setAttribute('aria-expanded', 'false');
$('tour').setAttribute('aria-controls', 'tour-help');
$('large-text').onchange = event => document.documentElement.classList.toggle('large', event.target.checked);
$('privacy').onclick = () => {
  const open = $('privacy-content').hidden;
  $('privacy-content').hidden = !open;
  $('privacy').setAttribute('aria-expanded', String(open));
};

// 8. Inicio: preparar el formulario sin desplazar el foco del navegador.
setType();
showPage(false);
