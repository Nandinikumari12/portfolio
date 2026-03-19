const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

const roleTexts = [
  "The best error message is the one that never shows up.",
  "Building reliable systems with code, cloud, and curiosity.",
];
const typingTarget = document.getElementById("typingText");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingTarget) {
    return;
  }

  const currentText = roleTexts[textIndex];
  typingTarget.textContent = currentText.slice(0, charIndex);

  if (!isDeleting && charIndex < currentText.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeLoop, 900);
    return;
  } else {
    isDeleting = false;
    textIndex = (textIndex + 1) % roleTexts.length;
  }

  setTimeout(typeLoop, isDeleting ? 45 : 90);
}

if (typingTarget) {
  typeLoop();
}

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const el = entry.target;
        const target = Number(el.dataset.target);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 28));

        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = String(target);
            observer.unobserve(el);
            return;
          }
          el.textContent = String(current);
          requestAnimationFrame(tick);
        };

        tick();
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}
