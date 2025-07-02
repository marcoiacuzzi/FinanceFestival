/* Reset y caja en toda la app */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  overflow: hidden;
}

/* Cada “pantalla” ocupa todo el viewport */
.screen {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
}
.screen.active {
  display: flex;
}

/* Botones grandes y táctiles */
button {
  width: 80%;
  padding: 1rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #0057e7;
  color: white;
  cursor: pointer;
}

/* Contenedor de la agenda con scroll si hace falta */
#agenda {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}
/* Estilo específico para los ítems de la agenda */
#agenda button {
  background-color: #f0f0f0;
  color: #333;
}
/* Botón “Volver” distinto color */
#backFromAgenda {
  background-color: #777;
}
