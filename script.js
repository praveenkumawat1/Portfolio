// ===== ELEMENTS =====
const menu = document.getElementById("menu");
const openBtn = document.getElementById("navToggle");
const closeBtn = document.getElementById("menuClose");

const topItems = document.querySelectorAll(".menu-top > *");
const linkWrappers = document.querySelectorAll(".menu-links .link-wrapper");
const bottomItems = document.querySelectorAll(".menu-bottom > *");

// ===== CUSTOM CURSOR - PEHLE INITIALIZE KARO =====
const cursor = document.querySelector(".custom-cursor");

// Initial position set karo
let mouseX = 0;
let mouseY = 0;

// Mouse move event
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Direct CSS transform use karo for better performance
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// ===== GSAP TIMELINE =====
const tl = gsap.timeline({
  paused: true,
  defaults: { ease: "expo.out" },
});

// Set initial hidden state
gsap.set(menu, { y: "100%" });
gsap.set(topItems, { y: -40, opacity: 0 });
gsap.set(linkWrappers, { y: 150, opacity: 0 });
gsap.set(bottomItems, { y: 40, opacity: 0 });

// ===== MENU ANIMATION =====
// 1. Menu background slides up
tl.to(menu, {
  y: "0%",
  duration: 1.2,
  ease: "expo.inOut",
});

// 2. Top items fade in from top
tl.to(
  topItems,
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.8,
  },
  "-=0.7",
);

// 3. Center links slide up with stagger
tl.to(
  linkWrappers,
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 1,
    ease: "expo.out",
  },
  "-=0.5",
);

// 4. Bottom items fade in from bottom
tl.to(
  bottomItems,
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.7,
  },
  "-=0.6",
);

// ===== OPEN MENU =====
openBtn.addEventListener("click", () => {
  tl.play();
  document.body.style.overflow = "hidden";
});

// ===== CLOSE MENU =====
closeBtn.addEventListener("click", () => {
  tl.reverse();
  setTimeout(() => {
    document.body.style.overflow = "";
  }, 800);
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && tl.progress() > 0) {
    tl.reverse();
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 800);
  }
});

// ===== CURSOR HOVER EFFECTS =====
const hoverTargets = document.querySelectorAll(
  "a, button, .nav-icon, .close, .menu-links li",
);

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "60px";
    cursor.style.height = "60px";
    cursor.style.background = "rgba(0, 0, 0, 0.15)";
    cursor.style.border = "2px solid rgba(0, 0, 0, 0.3)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.background = "rgba(0, 0, 0, 0.8)";
    cursor.style.border = "none";
  });
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// ===== MENU LINK CLICK CLOSE =====
const menuLinks = document.querySelectorAll(".menu-links a");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // If it's an anchor link, close menu
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      tl.reverse();

      setTimeout(() => {
        document.body.style.overflow = "";
        // Smooth scroll to section
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 800);
    }
  });
});

// ===== PREMIUM PARALLAX EFFECT ON MENU =====
menu.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  const xPos = (clientX / innerWidth - 0.5) * 20;
  const yPos = (clientY / innerHeight - 0.5) * 20;

  gsap.to(".menu-links", {
    x: xPos,
    y: yPos,
    duration: 0.5,
    ease: "power2.out",
  });
});

menu.addEventListener("mouseleave", () => {
  gsap.to(".menu-links", {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});

// ===== CLICK RIPPLE EFFECT =====
document.addEventListener("click", (e) => {
  // Create ripple element
  const ripple = document.createElement("div");
  ripple.className = "cursor-ripple";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";

  document.body.appendChild(ripple);

  // Animate with GSAP
  gsap.fromTo(
    ripple,
    {
      scale: 0,
      opacity: 1,
    },
    {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove();
      },
    },
  );
});
