// 1) Configuración de Google Sheets
//    Reemplaza el ID por el tuyo (el que copiaste entre /d/ y /edit)
const SHEET_ID = '1PBCymQB0foj89czOTRWGCZYDOtNE5rkuJrJnXjjrtpQ';
//    Y pon aquí el nombre exacto de la pestaña de tu hoja
const SHEET_NAME = 'Agenda';

// URL para obtener JSON desde la hoja publicada
const urlAgenda = 
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

// 2) Función para fetch y parsear el JSON de Google
async function fetchAgenda() {
  const res  = await fetch(urlAgenda);
  const text = await res.text();
  // Google envuelve el JSON entre paréntesis: extraemos solo el objeto
  const json = JSON.parse(text.match(/(?<=\().*(?=\);)/)[0]);
  return json.table.rows;
}

// 3) Renderiza la agenda dentro del <div id="agenda">
async function renderAgenda() {
  const rows      = await fetchAgenda();
  const container = document.getElementById('agenda');
  container.innerHTML = ''; // limpia contenido previo

  rows.forEach(r => {
    // r.c[0] => primera columna (Hora), r.c[1] => segunda columna (Tema)
    const hora = r.c[0]?.v || '';
    const tema = r.c[1]?.v || '';
    const btn  = document.createElement('button');
    btn.textContent = `${hora} — ${tema}`;
    container.appendChild(btn);
  });
}

// 4) Muestra la “pantalla” cuyo id recibe, ocultando las demás
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.toggle('active', s.id === id);
  });
}

// 5) Al arrancar la página, conectamos botones y lógica
document.addEventListener('DOMContentLoaded', () => {
  // Botón del menú que abre la agenda
  document.getElementById('btnAgenda').addEventListener('click', () => {
    showScreen('agendaScreen');
    renderAgenda();
  });

  // Botón de “volver” dentro de la pantalla de agenda
  document.getElementById('backFromAgenda').addEventListener('click', () => {
    showScreen('menu');
  });
});
