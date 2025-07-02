// 1) Datos: define aquí tu agenda y tus preguntas
const agendaItems = [
  { hora: '10:00', tema: 'Bienvenida y apertura' },
  { hora: '10:30', tema: 'Finanzas Tradicionales' }
  // añade más ítems según tu evento
];

const quizQuestions = [
  {
    pregunta: '¿A qué hora empieza la charla de Blockchain?',
    opciones: ['11:00','11:30','12:00'],
    correcta: 1
  }
  // añade más preguntas aquí
];

// 2) Mostrar agenda
const agendaDiv = document.getElementById('agenda');
agendaItems.forEach(item => {
  const btn = document.createElement('button');
  btn.textContent = `${item.hora} – ${item.tema}`;
  agendaDiv.appendChild(btn);
});

// 3) Mostrar trivia
let current = 0, score = 0;
const quizDiv = document.getElementById('quiz');
function showQuestion() {
  quizDiv.innerHTML = '';
  const q = quizQuestions[current];
  const p = document.createElement('p');
  p.textContent = q.pregunta;
  quizDiv.appendChild(p);

  q.opciones.forEach((opt, i) => {
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = ()=> {
      if (i === q.correcta) score++;
      current++;
      if (current < quizQuestions.length) showQuestion();
      else quizDiv.innerHTML = `<p>¡Terminaste! Puntuación: ${score}/${quizQuestions.length}</p>`;
    };
    quizDiv.appendChild(b);
  });
}
showQuestion();
