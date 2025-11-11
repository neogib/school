// Cukierek albo psikus
function trickOrTreat() {
  const treats = [
    "🍬 Dostałeś cukierka!",
    "🍭 Słodki lizak dla Ciebie!",
    "🍫 Czekolada! Mniam!",
    "👻 Psikus! Duch Cię przestraszył!",
    "🦇 Nietoperz ukradł Twoje słodycze!",
    "🎃 Dynia daje Ci podwójną porcję!",
    "🕷️ Pająk wspiął się na Twój cukierek!",
    "🧙‍♀️ Wiedźma zaklęła Twoje słodycze!",
  ];
  const result = treats[Math.floor(Math.random() * treats.length)];
  document.getElementById("result").textContent = result;

  // Animacja przycisku
  const btn = event.target;
  btn.style.transform = "scale(0.95)";
  setTimeout(() => (btn.style.transform = "scale(1)"), 100);
}
