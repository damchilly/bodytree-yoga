(() => {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = {
    home: document.getElementById("panel-home"),
    about: document.getElementById("panel-about"),
    services: document.getElementById("panel-services"),
    contact: document.getElementById("panel-contact"),
  };
  const header = document.getElementById("site-header");
  const year = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (year) year.textContent = String(new Date().getFullYear());

  function activateTab(name) {
    const key = panels[name] ? name : "home";

    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === key;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    });

    Object.entries(panels).forEach(([id, panel]) => {
      if (!panel) return;
      const active = id === key;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    if (key !== "home") {
      document.querySelector(".panels")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  document.querySelectorAll("[data-tab]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const name = el.dataset.tab;
      if (!name || !panels[name]) return;
      if (el.tagName === "A") event.preventDefault();
      activateTab(name);
    });
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      tabs[next].focus();
      activateTab(tabs[next].dataset.tab);
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim() || "friend";
    formNote.textContent = `Thank you, ${name}. We will reply soon.`;
    form.reset();
  });

  // Soft falling leaves in the hero
  const hero = document.querySelector(".hero");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 6; i += 1) {
      const leaf = document.createElement("span");
      leaf.className = "leaf-drift";
      leaf.style.left = `${8 + i * 15}%`;
      leaf.style.animationDuration = `${10 + i * 1.4}s`;
      leaf.style.animationDelay = `${i * 1.2}s`;
      leaf.style.width = `${10 + (i % 3) * 4}px`;
      leaf.style.height = `${10 + (i % 3) * 4}px`;
      hero.appendChild(leaf);
    }
  }
})();
