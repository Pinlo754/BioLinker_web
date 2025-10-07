import TubesCursor from "./script_0.js";

const app = TubesCursor(document.getElementById("canvas"), {
  tubes: {
    colors: ["#f967fb", "#53bc28", "#6958d5"],
    lights: {
      intensity: 200,
      colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
    },
  },
  
});

document.body.addEventListener("click", () => {
  const colors = randomColors(3);
  const lightsColors = randomColors(4);
  console.log(colors, lightsColors);
  app.tubes.setColors(colors);
  
  app.tubes.setLightsColors(lightsColors);

});

document.addEventListener('DOMContentLoaded', function () {
    const url = '/green-gradient.png'; // file trong folder public => truy cập từ root
    const applyBg = (el) => {
        if (!el) return;
        el.style.backgroundImage = `url("${url}")`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center center';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundAttachment = 'fixed'; // cố định
        el.style.backgroundColor = '#0b3'; // fallback màu nếu ảnh không load
    };
    applyBg(document.documentElement); // <html>
    applyBg(document.body); // <body>
});

function randomColors(count) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}
