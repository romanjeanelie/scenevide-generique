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
const createRectangles = (num, dir) => {
  const rectsElBoundings = rectsEl.getBoundingClientRect();
  const newSVG = document.createElementNS(svgns, "svg");
  newSVG.style.position = "fixed";
  for (let i = 0; i < num; i++) {
    const rect = document.createElementNS(svgns, "rect");
    const width = 10 * Math.random();
    const x = (rectsElBoundings.width / num) * i;
    const y = 0;
    const height = rectsElBoundings.height;
    const color = "#000";

    rect.setAttributeNS(null, "id", "rect-" + dir);
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", width);
    rect.setAttributeNS(null, "height", height);

    rect.style.fill = color;
    rect.style.transformOrigin = dir === "up" ? "center top" : "center bottom";
    newSVG.appendChild(rect);
  }

  rectsEl.appendChild(newSVG);
};

/**
 * Init
 */
const svgns = "http://www.w3.org/2000/svg";
const tl = gsap.timeline({ paused: true });
const tlRectUp = gsap.timeline({ paused: true });
const tlRectDown = gsap.timeline({ paused: true });
const tlText = gsap.timeline({ paused: true });

titleEl.style.transform = "rotate(180deg)";

// Create one rectangle per letter
pathEls.forEach((path, i) => {
  path.style.opacity = 0;

  const point = document.createElementNS(svgns, "rect");
  const x = -20 + 40 * i;
  const y = -30;
  const width = 50;
  const height = 200;
  const color = "#000";
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
createRectangles(15, "up");
createRectangles(15, "down");

const pointsSVG = document.querySelectorAll("#points");
const rectSVG = document.querySelectorAll("#rect");
/**
 * Anim
 */
// Anim Clip Path
gsap.set(titleEl, {
  // clipPath: "polygon(0% 54%, 100% 54%, 100% 56%, 0% 56%)",
  clipPath: "polygon(100% 54%, 100% 54%, 100% 56%, 100% 56%)",
  // clipPath: "polygon(0% 54%, 0% 54%, 0% 55%, 0% 55%)",
});
tl.to(titleEl, {
  clipPath: "polygon(0% 54%, 100% 54%, 100% 55%, 0% 55%)",
  duration: 20,
  ease: "linear",
});
tl.to(titleEl, { duration: 35, rotation: 0, delay: 15, ease: "linear" }, "<");
tl.to(titleEl, { duration: 5, scale: 1.2, ease: "linear" }, "<");
tl.to(
  titleEl,
  {
    clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 30,
    delay: 5,
    ease: "power1.in",
  },
  "<"
);

// Anim Containers
tl.to(titleEl, { duration: 30, scale: 0.6, delay: 0, ease: "power2.inOut" }, "<");
// Anim Points
tl.to("#points", { duration: 15, scaleX: 0.2, stagger: 1, delay: 0, ease: "power1.inOut" }, "<");
tl.to("#points", { duration: 25, morphSVG: (i) => pathEls[i], delay: 7, stagger: 0.4, ease: "power1.inOut" }, "<");
tl.to("#points", { duration: 20, scaleX: 1, stagger: 0.4, delay: 2 }, "<");

//Anim Rects
gsap.set(
  "#rect-up",
  {
    opacity: 0,
    x: "100vw",
    duration: 2,
  },
  "<"
);

// tlRectUp.to("#rect-up", {
//   x: 0,
//   duration: "random(10, 20)",
//   delay: 12,
//   stagger: "random(-10, 10)",
//   ease: "power1.inOut",
// });
tlRectUp.to(
  "#rect-up",
  {
    opacity: 1,
    x: "random(-400, 400)",
    duration: "random(20, 30)",
    delay: 12,
    stagger: "random(-10, 10)",
    ease: "power1.inOut",
  },
  "<"
);
tlRectUp.to(
  "#rect-up",
  {
    scaleY: 0,
    duration: "random(20, 26)",
    delay: 20,
    stagger: "random(-1, 1)",
    ease: "power1.inOut",
  },
  "<"
);
gsap.set(
  "#rect-down",
  {
    x: "-100vw",
    opacity: 0,
    duration: 2,
  },
  "<"
);

// tlRectDown.to("#rect-down", {
//   scaleX: 1,
//   duration: "random(10, 20)",
//   delay: 12,
//   stagger: "random(-10, 10)",
//   ease: "power1.inOut",
// });
tlRectDown.to(
  "#rect-down",
  {
    x: "random(-400, 400)",
    opacity: 1,
    duration: "random(20, 30)",
    delay: 12,
    stagger: "random(-10, 10)",
    ease: "power1.inOut",
  },
  "<"
);
tlRectDown.to(
  "#rect-down",
  {
    scaleY: 0,
    duration: "random(20, 26)",
    delay: 20,
    stagger: "random(-1, 1)",
    ease: "power1.inOut",
  },
  "<"
);

// Anim Texts
gsap.set(
  ".faire",
  {
    y: "100%",
    stroke: "red",
  },
  "<"
);

tlText.to(
  ".faire",
  {
    y: "-100%",
    duration: 10,
    delay: 0,
    ease: "power1.inOut",
    onStart: () => {
      console.log("text start");
    },
  },
  "<"
);

sonGenerique.addEventListener("pause", () => {
  tl.pause();
  tlRectUp.pause();
  tlRectDown.pause();
  tlText.pause();
});
sonGenerique.addEventListener("play", () => {
  tl.play();
  tlRectUp.play();
  tlRectDown.play();
  tlText.play();
});
