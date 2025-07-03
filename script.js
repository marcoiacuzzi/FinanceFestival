// 1) Configuración: tu Sheet ID
const SHEET_ID = '1PBCymQB0foj89czOTRWGCZYDOtNE5rkuJrJnXjjrtpQ';

// 2) Listado de pestañas
const SHEET_TABS = {
  main:    'Main',
  tradiFi: 'Workshop TradiFi',
  defi:    'Workshop DeFi'
};

// 3) Construye la URL para la pestaña seleccionada
function sheetUrl(tabName) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}`
       + `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
}

// 4) Obtiene las filas de la pestaña
async function fetchSheet(tabName) {
  const res  = await fetch(sheetUrl(tabName));
  const text = await res.text();
  const json = JSON.parse(text.match(/(?<=\().*(?=\);)/)[0]);
  return json.table.rows;
}

// 5) Dibuja las 3 opciones iniciales
function renderAgendaOptions() {
  const container = document.getElementById('agenda');
  container.innerHTML = '';
  [
    { key: 'main',    text: 'Agenda Main',             cls: 'btn-main'   },
    { key: 'tradiFi', text: 'Agenda Workshop TradiFi', cls: 'btn-tradifi'},
    { key: 'defi',    text: 'Agenda Workshop DeFi',    cls: 'btn-defi'   }
  ].forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.text;
    btn.classList.add(item.cls);
    btn.onclick = () => loadAndShow(item.key);
    container.appendChild(btn);
  });
}

// 6) Carga y formatea las filas de la pestaña elegida
async function loadAndShow(key) {
  const rows = await fetchSheet(SHEET_TABS[key]);
  const container = document.getElementById('agenda');
  container.innerHTML = '';

  rows.forEach(r => {
    const hora        = r.c[0]?.v || '';
    const titulo      = r.c[1]?.v || '';
    const ponente     = r.c[2]?.v || '';
    const sala        = r.c[3]?.v || '';
    const descripcion = r.c[4]?.v || '';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'agenda-item';
    itemDiv.innerHTML = `
      <div class="agenda-time">${hora}</div>
      <div class="agenda-details">
        <h3>${titulo}</h3>
        <p class="agenda-speaker">${ponente}</p>
        <p class="agenda-location">${sala}</p>
        ${descripcion ? `<p class="agenda-desc">${descripcion}</p>` : ''}
      </div>`;
    container.appendChild(itemDiv);
  });
}

// 7) Muestra/oculta pantallas
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.toggle('active', s.id === id));
}

// 8) Enlaza eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const btnAgenda = document.getElementById('btnAgenda');
  const btnBack   = document.getElementById('backFromAgenda');

  btnAgenda.addEventListener('click', () => {
    showScreen('agendaScreen');
    renderAgendaOptions();
  });

  btnBack.addEventListener('click', () => {
    showScreen('menu');
  });
});
