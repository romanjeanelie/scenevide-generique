import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const sonGenerique = document.querySelector("audio");
const btnEl = document.querySelector("button");
const titleEl = document.querySelector(".title");
const pathEls = document.querySelectorAll("path");

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

const tl = gsap.timeline({ paused: true });

pathEls.forEach((path) => {
  tl.fromTo(
    path,
    { drawSVG: "0%", strokeWidth: 4, stroke: "white" },
    {
      duration: 45,
      strokeWidth: 1,
      drawSVG: "100%",
      stroke: "red",
      stagger: 0.1,
      yoyo: true,
      repeat: 5,

      onComplete: () => {
        console.log("complete");
      },
    },
    "<"
  );
});

tl.fromTo(
  titleEl,
  {
    scale: 10,
    rotation: 450,
  },
  {
    scale: 1,
    rotation: 0,
    duration: 40,
  },
  "<"
);

let tlLaunched = false;

sonGenerique.addEventListener("timeupdate", () => {
  console.log(sonGenerique.currentTime && !tlLaunched);
  if (sonGenerique.currentTime > 16) {
    tl.play();
    tlLaunched = true;
  }
});
