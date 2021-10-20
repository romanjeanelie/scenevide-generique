import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);

const sonGenerique = document.querySelector("audio");
const btnEl = document.querySelector("button");
const titleEl = document.querySelector(".title");
const titleSVG = document.querySelector(".title-svg");
const pathEls = titleSVG.querySelectorAll("path");
const groupSVG = document.getElementById("LA_SCENE_EST_VIDE").querySelector("g");

let isPlay = false;

btnEl.addEventListener("click", () => {
  if (!isPlay) {
    sonGenerique.play();
    isPlay = true;
  } else {
    sonGenerique.pause();
    isPlay = false;
  }
});

const svgns = "http://www.w3.org/2000/svg";
const tl = gsap.timeline({ paused: true });
pathEls.forEach((path, i) => {
  path.style.opacity = 0;
  // CIRCLE
  // const point = document.createElementNS(svgns, "circle");
  // const x = 80 + 30 * i;
  // const color = "#FBFAF5";
  // point.setAttributeNS(null, "id", "points");
  // point.setAttributeNS(null, "cx", x);
  // point.setAttributeNS(null, "cy", 100);
  // point.setAttributeNS(null, "r", 10);
  // point.style.fill = color;

  // RECT
  const point = document.createElementNS(svgns, "rect");
  const x = -20 + 40 * i;
  const y = -130;
  const width = 35;
  const height = 400;
  const color = "#FBFAF5";
  point.setAttributeNS(null, "id", "points");
  point.setAttributeNS(null, "x", x);
  point.setAttributeNS(null, "y", y);
  point.setAttributeNS(null, "width", width);
  point.setAttributeNS(null, "height", height);
  point.style.fill = color;

  groupSVG.appendChild(point);

  MorphSVGPlugin.convertToPath("#points");
});

const pointsSVG = document.querySelectorAll("#points");
pointsSVG.forEach((point, i) => {
  tl.to(point, { duration: 50, morphSVG: pathEls[i], delay: 0.4 }, "<");
});

// PART 1
// tl.to("#circle", { duration: 30, morphSVG: pathEls[0] });
// tl.to("#circle", { duration: 30, morphSVG: pathEls[1] }, "<");

// PART 2

tl.fromTo(
  titleSVG,
  {},
  {
    duration: 40,
  },
  "<"
);

let tlLaunched = false;

sonGenerique.addEventListener("pause", () => {
  tl.pause();
});
sonGenerique.addEventListener("play", () => {
  tl.play();
});
