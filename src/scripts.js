(function () {
  const root = document.body;
  const toggle = document.querySelector("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    root.classList.add("dark-mode");
  }

  function syncLabel() {
    if (!toggle) return;
    toggle.textContent = root.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
    toggle.setAttribute(
      "aria-label",
      root.classList.contains("dark-mode") ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      root.classList.toggle("dark-mode");
      localStorage.setItem("theme", root.classList.contains("dark-mode") ? "dark" : "light");
      syncLabel();
    });
  }

  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealItems.length && !reducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index * 70, 280) + "ms";
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  syncLabel();
})();
