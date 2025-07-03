// 1) Configuración: tu Sheet ID
const SHEET_ID = '1PBCymQB0foj89czOTRWGCZYDOtNE5rkuJrJnXjjrtpQ';

// 2) Listado de pestañas
const SHEET_TABS = {
  main:   'Main',
  tradiFi:'Workshop TradiFi',
  defi:   'Workshop DeFi'
};

// 3) Construye la URL para una pestaña concreta
function sheetUrl(tabName) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}`
    + `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
}

// 4) Fetch y parseo de cualquier pestaña
async function fetchSheet(tabName) {
  const res  = await fetch(sheetUrl(tabName));
  const text = await res.text();
  const json = JSON.parse(text.match(/(?<=\().*(?=\);)/)[0]);
  return json.table.rows;  // filas con .c[0].v, .c[1].v ...
}

// 5) Mostrar las 3 opciones de agenda
function renderAgendaOptions() {
  const container = document.getElementById('agenda');
  container.innerHTML = ''; 
  const items = [
    { key: 'main',    text: 'Agenda Main',            cls: 'btn-main'   },
    { key: 'tradiFi', text: 'Agenda Workshop TradiFi',cls: 'btn-tradifi'},
    { key: 'defi',    text: 'Workshop DeFi',         cls: 'btn-defi'   }
  ];
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.text;
    btn.classList.add(item.cls);
    btn.onclick = () => loadAndShow(item.key);
    container.appendChild(btn);
  });
}

// 6) Carga y muestra los ítems de la pestaña seleccionada
async function loadAndShow(key) {
  const rows = await fetchSheet(SHEET_TABS[key]);
  const container = document.getElementById('agenda');
  container.innerHTML = '';
  rows.forEach(r => {
    const hora = r.c[0]?.v||'';
    const tema = r.c[1]?.v||'';
    const btn  = document.createElement('button');
    btn.textContent = `${hora} — ${tema}`;
    container.appendChild(btn);
  });
}

// 7) Muestra/oculta pantallas
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.toggle('active', s.id === id));
}

// 8) Conexión de eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnAgenda').addEventListener('click', () => {
    showScreen('agendaScreen');
    renderAgendaOptions();
  });
  document.getElementById('backFromAgenda').addEventListener('click', () => {
    showScreen('menu');
  });
});
