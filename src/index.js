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

/**
 * Init
 */
const svgns = "http://www.w3.org/2000/svg";
const tl = gsap.timeline({ paused: true });

titleEl.style.transform = "rotate(180deg)";

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
  const width = 50;
  const height = 400;
  const color = "#FBFAF5";
  point.setAttributeNS(null, "id", "points");
  point.setAttributeNS(null, "x", x);
  point.setAttributeNS(null, "y", y);
  point.setAttributeNS(null, "width", width);
  point.setAttributeNS(null, "height", height);
  // point.setAttributeNS(null, "opacity", 0);
  point.style.fill = color;

  groupSVG.appendChild(point);

  MorphSVGPlugin.convertToPath("#points");
});

const pointsSVG = document.querySelectorAll("#points");

/**
 * Anim
 */
gsap.set(titleEl, {
  clipPath: "polygon(50% 0%, 51% 0%, 51% 0%, 50% 0%)",
  // clip-path: polygon(50% 45%, 51% 45%, 51% 46%, 50% 46%);
});
tl.to(titleEl, {
  clipPath: "polygon(50% 0%, 51% 0%, 51% 100%, 50% 100%)",
  duration: 10,
  ease: "power1.inOut",
});
tl.to(
  titleEl,
  {
    clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 15,
    delay: 10,
    ease: "power2.in",
  },
  "<"
);
pointsSVG.forEach((point, i) => {
  // PART 1

  tl.to(point, { duration: 15, scaleX: 0.2, delay: 1, ease: "power1.inOut" }, "<");
  setTimeout(() => {
    tl.to(point, { duration: 20, morphSVG: pathEls[i], delay: 0.4, ease: "power1.inOut" }, "<");
    tl.to(point, { duration: 20, scaleX: 1, delay: 0.4 }, "<");
  }, 10000);
});
tl.to(titleEl, { duration: 30, rotation: 0, delay: 0, ease: "power1.inOut" }, "<");
tl.to(titleEl, { duration: 30, scale: 0.6, delay: 0, ease: "power2.inOut" }, "<");

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
