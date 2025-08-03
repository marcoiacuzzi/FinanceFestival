// 1) Función para mostrar/ocultar pantallas
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.toggle('active', s.id === id));
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAgenda    = document.getElementById('btnAgenda');
  const btnBack      = document.getElementById('backFromAgenda');
  const optionsDiv   = document.getElementById('agendaOptions');
  const agendaImage  = document.getElementById('agendaImage');

  // 2) Mostrar pantalla de agenda
  btnAgenda.addEventListener('click', () => {
    showScreen('agendaScreen');
    optionsDiv.style.display = 'flex';
    agendaImage.style.display = 'none'; // ocultar imagen previa
    agendaImage.src = '';
  });

  // 3) Mostrar imagen correspondiente según el botón
  optionsDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      let imageSrc = '';

      if (btn.classList.contains('btn-main'))     imageSrc = 'main.png';
      if (btn.classList.contains('btn-tradifi'))  imageSrc = 'tradifi.png';
      if (btn.classList.contains('btn-defi'))     imageSrc = 'defi.png';

      if (imageSrc) {
        agendaImage.src = imageSrc;
        agendaImage.style.display = 'block';
      }

      optionsDiv.style.display = 'none';
    });
  });

  // 4) Volver al menú
  btnBack.addEventListener('click', () => {
    showScreen('menu');
    optionsDiv.style.display = 'flex';
    agendaImage.style.display = 'none';
    agendaImage.src = '';
  });
});
