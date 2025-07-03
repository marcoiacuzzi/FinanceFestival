
// 2) Muestra/oculta pantallas
function showScreen(id) {
  document.querySelectorAll('.screen')
          .forEach(s => s.classList.toggle('active', s.id === id));
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAgenda    = document.getElementById('btnAgenda');
  const btnBack      = document.getElementById('backFromAgenda');
  const optionsDiv   = document.getElementById('agendaOptions');
  const iframe       = document.getElementById('agendaFrame');

  // Al pulsar “Agenda” vamos al sub-menú
  btnAgenda.addEventListener('click', () => {
    showScreen('agendaScreen');
    // Limpiamos el iframe hasta que escojan una pestaña
    iframe.src = '';
  });

  // Botón “Volver”
  btnBack.addEventListener('click', () => {
    showScreen('menu');
  });

  // Cada botón del sub-menú cambia la URL del iframe
  optionsDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      iframe.src = url;
    });
  });
});
