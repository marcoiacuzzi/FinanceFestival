document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM listo (debug script)");
  
  const btn = document.getElementById('btnAgenda');
  if (!btn) {
    console.error("❌ No encontré el botón #btnAgenda");
    return;
  }
  console.log("🔍 btnAgenda encontrado:", btn);
  
  btn.addEventListener('click', () => {
    console.log("🎯 ¡Click capturado en Agenda!");
    alert("Has pulsado el botón Agenda (modo debug)");
  });
});
