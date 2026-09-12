// ============================================================
// FOR YOU, AS ALWAYS
// JavaScript
// ============================================================


// ============================================================
// 1. ELEMENTS
// ============================================================

const entrance = document.getElementById("entrance");
const mainContent = document.getElementById("mainContent");
const beginButton = document.getElementById("beginButton");

const revealButton = document.getElementById("revealButton");
const secretText = document.getElementById("secretText");

const fallingEffects = document.getElementById("fallingEffects");

const backgroundMusic = document.getElementById("backgroundMusic");

const musicPlayer = document.getElementById("musicPlayer");
const musicPlayButton = document.getElementById("musicPlayButton");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");


// ============================================================
// 2. WEBSITE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

mainContent.style.display = "none";

createFallingEffects();

createBackgroundParticles();

prepareScrollAnimations();

prepareMusicPlayer();

});


// ============================================================
// 3. OPENING HEART
// ============================================================

beginButton.addEventListener("click", () => {

beginButton.disabled = true;

entrance.classList.add("opening");

backgroundMusic.volume = 1;

backgroundMusic.play().then(() => {

musicPlayer.classList.add("music-playing");

musicPlayButton.textContent = "Ⅱ";

}).catch(() => {

musicPlayButton.textContent = "▶";

});

setTimeout(() => {

entrance.style.display = "none";

mainContent.style.display = "block";

setTimeout(() => {

mainContent.classList.add("visible");

startScrollAnimations();

}, 100);

}, 1500);

});


// ============================================================
// 4. EIGHT DIFFERENT FALLING EFFECTS
// ============================================================

const fallingObjects = [

{
type: "heart",
symbols: ["♥", "♡"]
},

{
type: "rose",
symbols: ["🌹"]
},

{
type: "sparkle",
symbols: ["✦", "✧", "✨"]
},

{
type: "star",
symbols: ["★", "☆"]
},

{
type: "dot",
symbols: ["•", "·"]
},

{
type: "petal",
symbols: ["❀", "❁", "✿"]
},

{
type: "diamond",
symbols: ["◆", "◇"]
},

{
type: "particle",
symbols: ["."]
}

];


function createFallingObject(effect) {

const element = document.createElement("span");

const randomSymbol =
effect.symbols[
Math.floor(Math.random() * effect.symbols.length)
];

element.classList.add(
"falling-object",
`falling-${effect.type}`
);

element.textContent = randomSymbol;

element.style.left =
Math.random() * 100 + "vw";

const size =
Math.random() * 14 + 8;

element.style.fontSize =
size + "px";

const duration =
Math.random() * 7 + 6;

element.style.animationDuration =
duration + "s";

element.style.animationDelay =
Math.random() * 2 + "s";

const drift =
(Math.random() - 0.5) * 250;

element.style.setProperty(
"--drift",
drift + "px"
);

const rotation =
Math.random() * 720 - 360;

element.style.setProperty(
"--rotation",
rotation + "deg"
);

fallingEffects.appendChild(element);

setTimeout(() => {

element.remove();

}, (duration + 3) * 1000);

}


function createFallingEffects() {

fallingObjects.forEach(effect => {

let amount = 3;

if (effect.type === "dot") {
amount = 5;
}

if (effect.type === "particle") {
amount = 7;
}

for (let i = 0; i < amount; i++) {

createFallingObject(effect);

}

});

setTimeout(createFallingEffects, 2500);

}


// ============================================================
// 5. BACKGROUND PARTICLES
// ============================================================

function createBackgroundParticles() {

const particleContainer =
document.querySelector(".background-effects");

for (let i = 0; i < 60; i++) {

const particle =
document.createElement("span");

particle.classList.add(
"background-particle"
);

particle.style.left =
Math.random() * 100 + "%";

particle.style.top =
Math.random() * 100 + "%";

const size =
Math.random() * 4 + 1;

particle.style.width =
size + "px";

particle.style.height =
size + "px";

particle.style.animationDelay =
Math.random() * 5 + "s";

particle.style.animationDuration =
Math.random() * 5 + 4 + "s";

particleContainer.appendChild(
particle
);

}

}


// ============================================================
// 6. SCROLL REVEAL SYSTEM
// ============================================================

function prepareScrollAnimations() {

const elements =
document.querySelectorAll(".reveal-text");

elements.forEach(element => {

element.classList.add(
"hidden-before-reveal"
);

});

}


function startScrollAnimations() {

const elements =
document.querySelectorAll(
".hidden-before-reveal"
);

const observer =
new IntersectionObserver(
(entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add(
"revealed"
);

observer.unobserve(
entry.target
);

}

});

},
{
threshold: 0.15
}
);

elements.forEach(element => {

observer.observe(element);

});

}


// ============================================================
// 7. HIDDEN MESSAGE
// ============================================================

revealButton.addEventListener("click", () => {

secretText.classList.toggle(
"show-secret"
);

if (
secretText.classList.contains(
"show-secret"
)
) {

revealButton.textContent =
"♥ A little more...";

} else {

revealButton.textContent =
"There is something else...";

}

});


// ============================================================
// 8. CLICKABLE HEART EFFECT
// ============================================================

document.addEventListener("click", (event) => {

if (
event.target.closest(
"#beginButton"
)
) {
return;
}

if (
event.target.closest(
"#musicPlayer"
)
) {
return;
}

createClickHeart(
event.clientX,
event.clientY
);

});


function createClickHeart(x, y) {

const heart =
document.createElement("span");

heart.classList.add(
"click-heart"
);

heart.textContent =
Math.random() > 0.5
? "♥"
: "♡";

heart.style.left =
x + "px";

heart.style.top =
y + "px";

document.body.appendChild(
heart
);

setTimeout(() => {

heart.remove();

}, 1200);

}


// ============================================================
// 9. SMOOTH SCROLL
// ============================================================

document.addEventListener("click", (event) => {

const readOn =
event.target.closest(".read-on");

if (!readOn) return;

const confession =
document.getElementById(
"confession"
);

confession.scrollIntoView({
behavior: "smooth"
});

});


// ============================================================
// 10. FINAL ROSE INTERACTION
// ============================================================

const finalRose =
document.getElementById(
"finalRose"
);


if (finalRose) {

finalRose.addEventListener(
"click",
() => {

finalRose.classList.add(
"rose-clicked"
);

for (let i = 0; i < 12; i++) {

createRoseHeart(
finalRose
);

}

}
);

}


function createRoseHeart(rose) {

const heart =
document.createElement("span");

heart.classList.add(
"rose-heart"
);

heart.textContent =
"♥";

const rect =
rose.getBoundingClientRect();

heart.style.left =
rect.left +
rect.width / 2 +
"px";

heart.style.top =
rect.top +
rect.height / 2 +
"px";

const angle =
Math.random() *
Math.PI *
2;

const distance =
Math.random() * 100 + 50;

heart.style.setProperty(
"--x",
Math.cos(angle) *
distance +
"px"
);

heart.style.setProperty(
"--y",
Math.sin(angle) *
distance +
"px"
);

document.body.appendChild(
heart
);

setTimeout(() => {

heart.remove();

}, 1200);

}


// ============================================================
// 11. RANDOM GLOW PULSE
// ============================================================

setInterval(() => {

const glow =
document.createElement("div");

glow.classList.add(
"ambient-glow"
);

glow.style.left =
Math.random() * 100 + "vw";

glow.style.top =
Math.random() * 100 + "vh";

document.body.appendChild(
glow
);

setTimeout(() => {

glow.remove();

}, 4000);

}, 3000);


// ============================================================
// 12. MUSIC PLAYER
// ============================================================

function prepareMusicPlayer() {

if (
!backgroundMusic ||
!musicPlayer ||
!musicPlayButton ||
!progressBar ||
!currentTimeDisplay ||
!durationDisplay
) {
console.warn("Music player elements could not be found.");
return;
}

backgroundMusic.volume = 1;

musicPlayButton.textContent =
"▶";


backgroundMusic.addEventListener(
"loadedmetadata",
() => {

if (
isFinite(backgroundMusic.duration)
) {

durationDisplay.textContent =
formatTime(
backgroundMusic.duration
);

}

}
);


backgroundMusic.addEventListener(
"timeupdate",
() => {

if (
!isFinite(backgroundMusic.duration) ||
backgroundMusic.duration <= 0
) {
return;
}

const progress =
(
backgroundMusic.currentTime /
backgroundMusic.duration
) * 100;

progressBar.value =
progress;

currentTimeDisplay.textContent =
formatTime(
backgroundMusic.currentTime
);

}
);


backgroundMusic.addEventListener(
"play",
() => {

musicPlayer.classList.add(
"music-playing"
);

musicPlayButton.textContent =
"Ⅱ";

}
);


backgroundMusic.addEventListener(
"pause",
() => {

musicPlayer.classList.remove(
"music-playing"
);

musicPlayButton.textContent =
"▶";

}
);


backgroundMusic.addEventListener(
"error",
() => {

console.error(
"Music could not be loaded. Check that the MP3 filename exactly matches the file in GitHub."
);

musicPlayer.classList.add(
"music-error"
);

musicPlayButton.textContent =
"▶";

}
);


musicPlayButton.addEventListener(
"click",
async () => {

try {

if (backgroundMusic.paused) {

backgroundMusic.volume = 1;

await backgroundMusic.play();

} else {

backgroundMusic.pause();

}

} catch (error) {

console.error(
"Music playback failed:",
error
);

}

}
);


progressBar.addEventListener(
"input",
() => {

if (
!isFinite(backgroundMusic.duration) ||
backgroundMusic.duration <= 0
) {
return;
}

backgroundMusic.currentTime =
(
progressBar.value / 100
) *
backgroundMusic.duration;

}
);


backgroundMusic.load();

}


// ============================================================
// FORMAT TIME
// ============================================================

function formatTime(seconds) {

if (
!isFinite(seconds) ||
seconds < 0
) {
return "0:00";
}

const minutes =
Math.floor(seconds / 60);

const remainingSeconds =
Math.floor(seconds % 60);

return (
minutes +
":" +
String(
remainingSeconds
).padStart(2, "0")
);

}


// ============================================================
// END OF SCRIPT
// ============================================================

console.log(
"💜 For You, As Always — website initialized."
);
