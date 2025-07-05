// 1) Función para mostrar/ocultar pantallas
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.toggle('active', s.id === id));
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAgenda    = document.getElementById('btnAgenda');
  const btnBack      = document.getElementById('backFromAgenda');
  const optionsDiv   = document.getElementById('agendaOptions');
  const iframe       = document.getElementById('agendaFrame');

  // 2) Cuando pulsan “Agenda”: vamos a la pantalla de agenda
  btnAgenda.addEventListener('click', () => {
    showScreen('agendaScreen');
    optionsDiv.style.display = 'flex';
    iframe.src = ''; // limpio cualquier src previo
  });

  // 3) Cada botón del sub-menú carga su URL y oculta el menú
  optionsDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      iframe.src = url;
      optionsDiv.style.display = 'none';
    });
  });

  // 4) “Volver al menú” regresa a la pantalla principal
  btnBack.addEventListener('click', () => {
    showScreen('menu');
    // Preparamos para la próxima vez que entren en Agenda
    optionsDiv.style.display = 'flex';
    iframe.src = '';
  });
});
