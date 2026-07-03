let currentMethodSubSlide = "method-overview";

const state = {
  activeSection: "hero",
  activeTool: 0,
  activeRoadmapPoint: 0,
  activeMethodStep: 0,
  visitedMethodSteps: new Set()
};

document.addEventListener("DOMContentLoaded", () => {
  renderSectionDots();
  renderRoadmapPoints();
  renderMethodStations();
  renderTools();
  renderBars();
  bindInterface();
  initScrollExperience();
  setTool(0);
  applyFocus("hero");
});

function renderSectionDots() {
  const dots = document.getElementById("sectionDots");
  dots.innerHTML = sections.map((section) => `
    <a href="#${section.id}" aria-label="${section.label}" data-section="${section.id}"></a>
  `).join("");
}

function renderRoadmapPoints() {
  const container = document.getElementById("roadmapPoints");
  if (!container || !window.roadmapPoints && typeof roadmapPoints === "undefined") return;

  container.innerHTML = roadmapPoints.map((point, index) => `
    <button class="roadmap-marker ${index === 0 ? "is-active" : "is-dim"}" type="button" data-index="${index}" data-target="${point.target}" style="--pin-x: ${point.pinX}; --pin-y: ${point.pinY}; --label-offset-y: ${point.labelOffsetY}px">
      <span class="marker-number">${point.id}</span>
      <span class="marker-title">${point.title}</span>
      <span class="marker-subtitle">${point.subtitle}</span>
      <span class="marker-line"></span>
      <span class="marker-pin"></span>
    </button>
  `).join("");

  container.querySelectorAll(".roadmap-marker").forEach((marker) => {
    marker.addEventListener("click", () => {
      const index = Number(marker.dataset.index);
      setRoadmapPoint(index);
      updateRoadmapNextLabel();
    });
  });

  setRoadmapPoint(0);
}

function renderMethodStations() {
  const container = document.getElementById("methodStations");
  if (!container || typeof methodSteps === "undefined") return;

  container.innerHTML = methodSteps.map((step, index) => `
    <button class="method-station ${index === 0 ? "is-active" : ""}" type="button" data-index="${index}">
      <span class="method-station-circle">
        <em>0${index + 1}</em>
        <i class="fa-solid ${step.icon}"></i>
      </span>
      <strong>${step.title}</strong>
      <small>${step.shortDesc || ""}</small>
    </button>
  `).join("");

  container.querySelectorAll(".method-station").forEach((station) => {
    station.addEventListener("click", () => openMethodDetail(Number(station.dataset.index)));
  });

  renderMethodPhaseNav();
  bindMethodControls();
  setMethodStep(0);
  showMethodSubSlide("method-overview");
}

function renderTools() {
  const cards = document.getElementById("toolCards");
  if (!cards) return;
  cards.innerHTML = toolData.map((tool, index) => `
    <button class="tool-card" type="button" data-tool="${index}">
      <span>${tool.total.toFixed(2)}</span>
      <strong>${tool.name}</strong>
      <small>${tool.badge}</small>
    </button>
  `).join("");

  cards.querySelectorAll(".tool-card").forEach((button) => {
    button.addEventListener("click", () => setTool(Number(button.dataset.tool)));
  });
}

function renderBars() {
  const bars = document.getElementById("nwaBars");
  if (!bars) return;
  bars.innerHTML = toolData.map((tool) => `
    <div class="nwa-bar">
      <span data-height="${tool.total}"></span>
      <strong>${tool.shortName || tool.name}</strong>
      <em>${tool.total.toFixed(2)}</em>
    </div>
  `).join("");
}

function renderMethodPhaseNav() {
  const nav = document.getElementById("methodPhaseNav");
  if (!nav || typeof methodSteps === "undefined") return;

  nav.innerHTML = methodSteps.map((step, index) => `
    <button type="button" data-index="${index}">
      <span>0${index + 1}</span>
      <strong>${step.title}</strong>
    </button>
  `).join("");

  nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => openMethodDetail(Number(button.dataset.index)));
  });
}

function bindMethodControls() {
  document.getElementById("methodOverviewNext")?.addEventListener("click", () => {
    if (state.visitedMethodSteps.size >= methodSteps.length) {
      document.getElementById("process").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const nextIndex = methodSteps.findIndex((_, index) => !state.visitedMethodSteps.has(index));
    openMethodDetail(nextIndex === -1 ? state.activeMethodStep : nextIndex);
  });

  document.getElementById("methodOverviewButton")?.addEventListener("click", () => showMethodOverview(false));
  document.getElementById("methodDetailNext")?.addEventListener("click", () => completeMethodStep());
  document.getElementById("methodBackButton")?.addEventListener("click", () => {
    if (state.activeMethodStep > 0) {
      openMethodDetail(state.activeMethodStep - 1);
    } else {
      showMethodOverview(false);
    }
  });
}

function setMethodStep(index) {
  if (typeof methodSteps === "undefined") return;
  const step = methodSteps[index];
  const marker = document.getElementById("methodCraneMarker");
  const stations = document.querySelectorAll(".method-station");
  if (!step) return;

  state.activeMethodStep = index;

  stations.forEach((station) => {
    const stationIndex = Number(station.dataset.index);
    station.classList.toggle("is-active", stationIndex === index);
    station.classList.toggle("is-visited", state.visitedMethodSteps.has(stationIndex));
  });

  document.querySelectorAll(".method-phase-nav button").forEach((button) => {
    const navIndex = Number(button.dataset.index);
    button.classList.toggle("is-active", navIndex === index);
    button.classList.toggle("is-visited", state.visitedMethodSteps.has(navIndex));
  });

  const position = stations[index]?.offsetLeft + (stations[index]?.offsetWidth || 0) / 2 - (marker?.offsetWidth || 0) / 2;
  if (marker && Number.isFinite(position)) {
    if (window.gsap) {
      gsap.to(marker, { x: position, duration: 0.8, ease: "power2.inOut" });
    } else {
      marker.style.transform = `translateX(${position}px)`;
    }
  }
}

function openMethodDetail(index) {
  setMethodStep(index);
  const subSlideId = methodSteps[index].subSlide;
  if (!document.getElementById(subSlideId)) {
    renderMethodDetail(index);
  }
  showMethodSubSlide(subSlideId);
}

function completeMethodStep() {
  state.visitedMethodSteps.add(state.activeMethodStep);
  setMethodStep(state.activeMethodStep);
  showMethodOverview(true);
}

function showMethodOverview(markCurrent = false) {
  if (markCurrent) {
    state.visitedMethodSteps.add(state.activeMethodStep);
    setMethodStep(state.activeMethodStep);
  }
  showMethodSubSlide("method-overview");
}

function showMethodSubSlide(name) {
  const current = document.querySelector(".method-subslide.is-active");
  const next = name === "method-overview"
    ? document.getElementById("methodOverview")
    : (document.getElementById(name) || document.getElementById("methodDetailView"));
  if (!next) return;

  currentMethodSubSlide = name;
  next.dataset.state = name;

  if (current === next) return;

  const activate = () => {
    document.querySelectorAll(".method-subslide").forEach((slide) => slide.classList.remove("is-active"));
    next.classList.add("is-active");
    if (window.gsap) {
      gsap.fromTo(next, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
    }
  };

  if (current && window.gsap) {
    gsap.to(current, { autoAlpha: 0, y: -18, duration: 0.28, ease: "power2.in", onComplete: activate });
  } else {
    activate();
  }
}

function renderMethodDetail(index) {
  const step = methodSteps[index];
  document.getElementById("methodDetailKicker").innerHTML = `<mark>0${index + 1}</mark> ${step.title}`;
  document.getElementById("methodDetailTitle").textContent = step.heading;
  document.getElementById("methodDetailSubtitle").textContent = step.subtitle;
  document.getElementById("methodDetailText").textContent = step.text;
  document.getElementById("methodDetailBullets").innerHTML = step.bullets.map((item) => `<li><i class="fa-solid fa-check"></i>${item}</li>`).join("");
  document.getElementById("methodVisual").innerHTML = buildMethodVisual(step.visual);
}

function buildMethodVisual(type) {
  if (type === "funnel") {
    return `
      <div class="method-funnel">
        <div class="funnel-inputs"><span>Interviews</span><span>Workshops</span><span>Prozessanalyse</span><span>Dokumentenstudie</span></div>
        <div class="funnel-body"><span>Muss</span><span>Soll</span><span>Kann</span></div>
        <strong>Strukturierter Anforderungskatalog</strong>
      </div>
    `;
  }

  const visualMap = {
    analysis: ["Prozesse", "Dokumente", "Interviews", "Schwachstellen"],
    market: ["Longlist", "Muss-Kriterien", "Shortlist", "Bewertung"],
    utility: ["Kriterien", "Gewichtung", "Nutzwert", "Vergleich"],
    decision: ["Evaluation", "Fachgespräch", "vCDM", "Converter"]
  };

  return `
    <div class="method-visual-grid">
      ${(visualMap[type] || []).map((item, index) => `<span><em>0${index + 1}</em>${item}</span>`).join("")}
    </div>
  `;
}

function bindInterface() {
  const menu = document.getElementById("quickMenu");
  const toggle = document.getElementById("menuToggle");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });

  const roadmapNext = document.getElementById("roadmapNext");
  if (roadmapNext) {
    roadmapNext.addEventListener("click", () => {
      const nextIndex = state.activeRoadmapPoint + 1;
      if (nextIndex >= roadmapPoints.length) {
        document.getElementById(roadmapPoints[0].target).scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setRoadmapPoint(nextIndex);
        updateRoadmapNextLabel();
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();

    const currentIndex = sections.findIndex((section) => section.id === state.activeSection);
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
    document.getElementById(sections[nextIndex].id).scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function updateRoadmapNextLabel() {
  const btn = document.getElementById("roadmapNext");
  if (!btn) return;
  const isLast = state.activeRoadmapPoint >= roadmapPoints.length - 1;
  btn.innerHTML = isLast
    ? `Starten <i class="fa-solid fa-arrow-right"></i>`
    : `Weiter <i class="fa-solid fa-arrow-right"></i>`;
}

function setRoadmapPoint(index) {
  if (typeof roadmapPoints === "undefined") return;
  const point = roadmapPoints[index];
  if (!point) return;

  state.activeRoadmapPoint = index;
  document.querySelectorAll(".roadmap-marker").forEach((marker) => {
    const markerIndex = Number(marker.dataset.index);
    marker.classList.toggle("is-active", markerIndex === index);
    marker.classList.toggle("is-dim", markerIndex !== index);
  });

  const loader = document.getElementById("roadmapLoader");
  if (loader) {
    loader.style.setProperty("--loader-x", point.pinX);
    loader.style.setProperty("--loader-y", point.pinY);
  }
}

function setTool(index) {
  const tool = toolData[index];
  state.activeTool = index;

  document.querySelectorAll(".tool-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.tool) === index);
  });

  document.getElementById("toolDetails").innerHTML = `
    <h3>${tool.name}</h3>
    <p>${tool.detail}</p>
    <div class="chip-row">${tool.chips.map((chip) => `<span>${chip}</span>`).join("")}</div>
    <p><strong>Technik:</strong> ${tool.tech.toFixed(2)} · <strong>Implementierung:</strong> ${tool.implementation.toFixed(2)}</p>
  `;

  if (window.gsap) {
    gsap.fromTo("#toolDetails", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }
}

function applyFocus(sectionId) {
  const section = sections.find((item) => item.id === sectionId);
  if (!section) return;

  state.activeSection = sectionId;
  document.body.dataset.activeSection = sectionId;
  document.documentElement.style.setProperty("--bg-x", section.focus.x);
  document.documentElement.style.setProperty("--bg-y", section.focus.y);
  document.documentElement.style.setProperty("--bg-scale", section.focus.scale);
  document.documentElement.style.setProperty("--bg-brightness", section.focus.brightness);

  document.querySelectorAll(".section-dots a").forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.section === sectionId);
  });
}

function initScrollExperience() {
  if (!window.gsap || !window.ScrollTrigger) {
    initFallbackObserver();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    ScrollTrigger.create({
      trigger: element,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => applyFocus(section.id),
      onEnterBack: () => applyFocus(section.id)
    });
  });

  document.querySelectorAll(".reveal").forEach((element) => {
    gsap.fromTo(element, { autoAlpha: 0, y: 48 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 78%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.fromTo(".roadmap-marker", {
    autoAlpha: 0,
    y: 24
  }, {
    autoAlpha: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#roadmap",
      start: "top 55%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.to(".chaos-map span", {
    x: () => gsap.utils.random(-35, 35),
    y: () => gsap.utils.random(-28, 28),
    rotation: () => gsap.utils.random(-10, 10),
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    stagger: 0.06,
    ease: "sine.inOut"
  });

  if (document.getElementById("nwaBars")) {
    gsap.to(".nwa-bar span:first-child", {
      height: (index, target) => `${target.dataset.height}%`,
      duration: 1.2,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#nwaBars",
        start: "top 72%"
      }
    });
  }
}

function initFallbackObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) applyFocus(entry.target.id);
    });
  }, { threshold: 0.5 });

  sections.forEach((section) => observer.observe(document.getElementById(section.id)));
}

window.showMethodSubSlide = showMethodSubSlide;
window.showMethodOverview = showMethodOverview;
window.completeMethodStep = completeMethodStep;
