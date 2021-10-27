import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);

const sonGenerique = document.querySelector("audio");
const btnEl = document.querySelector("button");
const titleEl = document.querySelector(".title");
const titleSVG = document.querySelector(".title-svg");
const pathEls = titleSVG.querySelectorAll("path");
const groupSVG = document.getElementById("LA_SCENE_EST_VIDE");

const rectsEl = document.querySelector(".rects");
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
 *
 * Functions
 */
const createRectangles = (num) => {
  const rectsElBoundings = rectsEl.getBoundingClientRect();
  const newSVG = document.createElementNS(svgns, "svg");
  for (let i = 0; i < num; i++) {
    const rect = document.createElementNS(svgns, "rect");
    const width = 10 * Math.random();
    const x = (rectsElBoundings.width / num) * i;
    const y = 0;
    const height = rectsElBoundings.height;
    const color = "#FBFAF5";

    rect.setAttributeNS(null, "id", "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", width);
    rect.setAttributeNS(null, "height", height);

    rect.style.fill = color;
    rect.style.transformOrigin = "center top";
    newSVG.appendChild(rect);
  }

  rectsEl.appendChild(newSVG);
};

/**
 * Init
 */
const svgns = "http://www.w3.org/2000/svg";
const tl = gsap.timeline({ paused: true });
const tlRect = gsap.timeline({ paused: true });

// titleEl.style.transform = "rotate(180deg)";

// Create one rectangle per letter
pathEls.forEach((path, i) => {
  path.style.opacity = 0;

  const point = document.createElementNS(svgns, "rect");
  const x = -20 + 40 * i;
  const y = -30;
  const width = 50;
  const height = 200;
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

// Create one rectangle per letter
createRectangles(15);

const pointsSVG = document.querySelectorAll("#points");
const rectSVG = document.querySelectorAll("#rect");
/**
 * Anim
 */
// Anim Clip Path
gsap.set(titleEl, {
  // clipPath: "polygon(0% 54%, 100% 54%, 100% 56%, 0% 56%)",
  clipPath: "polygon(0% 54%, 0% 54%, 0% 55%, 0% 55%)",
});
tl.to(titleEl, {
  clipPath: "polygon(0% 54%, 100% 54%, 100% 55%, 0% 55%)",
  duration: 15,
  ease: "linear",
});
tl.to(
  titleEl,
  {
    clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 30,
    delay: 15,
    ease: "power1.in",
  },
  "<"
);

// Anim Points
tl.to("#points", { duration: 15, scaleX: 0.2, stagger: 1, ease: "power1.inOut" }, "<");
tl.to("#points", { duration: 25, morphSVG: (i) => pathEls[i], delay: 10, stagger: 0.4, ease: "power1.inOut" }, "<");
tl.to("#points", { duration: 20, scaleX: 1, stagger: 0.4 }, "<");

// pointsSVG.forEach((point, i) => {
//   tl.to(point, { duration: 15, scaleX: 0.2, delay: 1, ease: "power1.inOut" }, "<");
//   setTimeout(() => {
//     tl.to(point, { duration: 17, morphSVG: pathEls[i], delay: 0.4, ease: "power1.inOut" }, "<");
//     tl.to(point, { duration: 20, scaleX: 1, delay: 0.4 }, "<");
//   }, 10000);
// });

//Anim Rects
gsap.set(
  "#rect",
  {
    scaleX: 0,
    duration: 2,
    onStart: () => {
      console.log("start");
    },
    onUpdate: () => {
      console.log("change");
    },
  },
  "<"
);

tlRect.to("#rect", {
  scaleX: 1,
  duration: "random(10, 20)",
  delay: 12,
  stagger: "random(-10, 10)",
  ease: "power1.inOut",
});
tlRect.to(
  "#rect",
  {
    x: "random(-400, 400)",
    duration: "random(80, 90)",
    delay: 12,
    stagger: "random(-10, 10)",
    ease: "power1.inOut",
  },
  "<"
);
tlRect.to(
  "#rect",
  {
    scaleY: 0,
    duration: "random(20, 26)",
    delay: 5,
    stagger: "random(-1, 1)",
    ease: "power1.inOut",
  },
  "<"
);

// Anim Containers
// tl.to(titleEl, { duration: 30, rotation: 0, delay: 0, ease: "power1.inOut" }, "<");
tl.to(titleEl, { duration: 30, scale: 0.6, delay: 0, ease: "power2.inOut" }, "<");

sonGenerique.addEventListener("pause", () => {
  tl.pause();
  tlRect.pause();
});
sonGenerique.addEventListener("play", () => {
  tl.play();
  tlRect.play();
});
