document.addEventListener('DOMContentLoaded', () => {
  const btnAgenda    = document.getElementById('btnAgenda');
  const btnBack      = document.getElementById('backFromAgenda');
  const optionsDiv   = document.getElementById('agendaOptions');
  const iframe       = document.getElementById('agendaFrame');

  // Pulsar “Agenda” → muestro la pantalla de agenda y dejo el submenú
  btnAgenda.addEventListener('click', () => {
    showScreen('agendaScreen');
    // Opcional: limpiar src antiguo
    iframe.src = '';
    // Me aseguro de que el sub-menú se vea al entrar
    optionsDiv.style.display = 'flex';
  });

  // Cada botón del sub-menú carga la URL y oculta el menú
  optionsDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      iframe.src = btn.dataset.url;
      // Oculto el sub-menú para que el iframe suba arriba
      optionsDiv.style.display = 'none';
    });
  });

  // “Volver” vuelve al menú principal y resetea todo
  btnBack.addEventListener('click', () => {
    showScreen('menu');
    // Si vuelves a Agenda, querrás ver otra vez las opciones
    optionsDiv.style.display = 'flex';
    iframe.src = '';
  });
});
