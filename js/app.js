/* ============================================================
   APP.JS - renders js/content.js into the page, plus the
   background DNA-rain animation and scroll-reveal effect.

   You shouldn't need to edit this file to change site content.
   Edit js/content.js instead. This file just reads that object.
   ============================================================ */

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === "html") node.innerHTML = val;
    else if (key === "text") node.textContent = val;
    else node.setAttribute(key, val);
  }
  for (const child of [].concat(children)) {
    if (child) node.appendChild(child);
  }
  return node;
}

/* Small line/glyph icons for the mail, github, and linkedin links, drawn
   with currentColor so they inherit whatever the button's text color is. */
const LINK_ICONS = {
  mail: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="13" height="10" rx="1.3"/><path d="M2 4.5l6 4.5 6-4.5"/></svg>`,
  github: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.6 2.29 6.65 5.47 7.73.4.08.55-.18.55-.39 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.24 1.87.89 2.33.68.07-.53.28-.89.51-1.1-1.78-.2-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.83a7.4 7.4 0 0 1 4 0c1.53-1.06 2.2-.83 2.2-.83.44 1.12.16 1.95.08 2.15.51.57.82 1.29.82 2.19 0 3.12-1.87 3.82-3.65 4.02.29.26.54.76.54 1.53 0 1.11-.01 2-.01 2.27 0 .21.15.47.55.39A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 5.5h2.4v8H3.5v-8Zm1.2-3.8a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM7.3 5.5h2.3v1.1h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.87 1.6 2.87 3.68v4.46h-2.4V9.5c0-.9-.02-2.06-1.25-2.06-1.26 0-1.45.98-1.45 2v4.06H7.3v-8Z"/></svg>`
};

/* Builds a <a class="btn"> from a link object. If link.icon matches a key
   in LINK_ICONS, that icon is drawn before the label. Used by both the
   hero CTA row and the contact section so the two stay consistent. */
function buildLinkBtn(link) {
  const isExternal = link.href.startsWith("http");
  const iconSvg = link.icon && LINK_ICONS[link.icon] ? LINK_ICONS[link.icon] : "";
  const iconHtml = iconSvg ? `<span class="btn-icon">${iconSvg}</span>` : "";
  return el("a", {
    class: `btn btn-${link.style}${iconSvg ? " has-icon" : ""}`,
    href: link.href,
    target: isExternal ? "_blank" : "_self",
    rel: isExternal ? "noopener" : "",
    html: `${iconHtml}${link.label}`
  });
}

function renderNav() {
  document.getElementById("brand").textContent = CONTENT.nav.brand;
  const ul = document.getElementById("nav-links");
  CONTENT.nav.links.forEach(link => {
    ul.appendChild(el("li", {}, el("a", { href: link.href, text: link.label })));
  });
}

function renderHero() {
  const h = CONTENT.hero;
  document.getElementById("terminal-user").textContent = CONTENT.nav.brand;
  document.getElementById("terminal-cmd").textContent = h.terminalLine;
  document.getElementById("hero-name").textContent = h.name;
  document.getElementById("hero-kicker").textContent = h.kicker;
  document.getElementById("hero-line1").textContent = h.headlineLine1;
  document.getElementById("hero-accent").textContent = h.headlineAccent;
  document.getElementById("hero-line2").textContent = h.headlineLine2;
  document.getElementById("hero-lede").textContent = h.lede;

  const ctaRow = document.getElementById("hero-ctas");
  h.ctas.forEach(cta => ctaRow.appendChild(buildLinkBtn(cta)));
}

function renderAbout() {
  const a = CONTENT.about;
  document.getElementById("about-label").textContent = a.sectionLabel;
  document.getElementById("about-heading").textContent = a.heading;

  const body = document.getElementById("about-body");
  a.paragraphs.forEach(p => body.appendChild(el("p", { text: p })));

  const facts = document.getElementById("about-facts");
  a.facts.forEach(f => {
    const valueSpan = el("span", { class: "v" });
    if (f.href) {
      valueSpan.appendChild(el("a", {
        href: f.href,
        text: f.value,
        target: f.href.startsWith("http") ? "_blank" : "_self",
        rel: "noopener"
      }));
    } else {
      valueSpan.textContent = f.value;
    }
    facts.appendChild(el("li", {}, [
      el("span", { class: "k", text: f.label }),
      valueSpan
    ]));
  });
}

/* One small line-icon per skill category, drawn with currentColor so it
   inherits the accent color set in CSS. Purely decorative, matches the
   terminal/bioinformatics theme (pipeline nodes, DNA helix, bar chart, etc). */
const SKILL_ICONS = {
  programming: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3 1 8l4 5M11 3l4 5-4 5"/></svg>`,
  pipeline_infra: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="2.5" cy="8" r="1.6" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none"/><circle cx="13.5" cy="8" r="1.6" fill="currentColor" stroke="none"/><path d="M4.3 8h2.1M9.6 8h2.1"/></svg>`,
  genomics: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-linecap="round"><path stroke-width="1.2" d="M3 1c0 4 10 4 10 8s-10 4-10 8"/><path stroke-width="1.2" d="M13 1c0 4-10 4-10 8s10 4 10 8"/><path stroke-width="0.8" opacity="0.55" d="M3.6 4.3h8.8M3.2 8h9.6M3.6 11.7h8.8"/></svg>`,
  stats_methods: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke-width="1.2" d="M2 1.5v13M2 14h12.5"/><rect x="4" y="9" width="2" height="4.2" fill="currentColor" stroke="none"/><rect x="7.5" y="5.5" width="2" height="7.7" fill="currentColor" stroke="none"/><rect x="11" y="3" width="2" height="10.2" fill="currentColor" stroke="none"/></svg>`
};

function renderSkills() {
  const s = CONTENT.skills;
  document.getElementById("skills-label").textContent = s.sectionLabel;
  document.getElementById("skills-heading").textContent = s.heading;

  const grid = document.getElementById("skills-grid");
  s.categories.forEach(cat => {
    const icon = SKILL_ICONS[cat.name] || "";
    const tagRow = el("div", { class: "tag-row" });
    cat.items.forEach(item => {
      tagRow.appendChild(el("span", { class: "tag", html: `<span class="tag-icon">${icon}</span>${item}` }));
    });
    grid.appendChild(el("div", { class: "skill-card reveal", "data-cat": cat.name }, [
      el("h4", { text: cat.name }),
      tagRow
    ]));
  });
}

function renderProjects() {
  const p = CONTENT.projects;
  document.getElementById("projects-label").textContent = p.sectionLabel;
  document.getElementById("projects-heading").textContent = p.heading;
  document.getElementById("projects-sub").textContent = p.sub;

  const list = document.getElementById("projects-list");
  p.items.forEach(proj => {
    const metricsRow = el("div", { class: "metrics" });
    proj.metrics.forEach(m => {
      metricsRow.appendChild(el("div", { class: "metric" }, [
        el("div", { class: "val", text: m.value }),
        el("div", { class: "lab", text: m.label })
      ]));
    });

    const figsRow = el("div", { class: "project-figs" });
    (proj.figures || []).forEach(f => {
      figsRow.appendChild(el("figure", {}, [
        el("img", { src: f.src, alt: f.caption, loading: "lazy" }),
        el("figcaption", { text: f.caption })
      ]));
    });

    const stackRow = el("div", { class: "stack-row tag-row" });
    proj.stack.forEach(s => stackRow.appendChild(el("span", { class: "tag", text: s })));

    const linksRow = el("div", { class: "project-links" });
    proj.links.forEach(l => {
      linksRow.appendChild(el("a", {
        class: `btn btn-${l.style}`,
        href: l.href,
        target: "_blank",
        rel: "noopener",
        text: l.label
      }));
    });

    const highlights = [];
    if (proj.highlight) {
      highlights.push(el("div", { class: "highlight", html: `<b>${proj.highlightTitle}</b> ${proj.highlight}` }));
    }
    if (proj.secondHighlight) {
      highlights.push(el("div", { class: "highlight", html: `<b>${proj.secondHighlightTitle}</b> ${proj.secondHighlight}` }));
    }

    const card = el("div", { class: "project reveal" }, [
      el("div", { class: "project-top" }, [
        el("div", {}, [
          el("div", { class: "project-title", text: proj.title }),
          el("div", { class: "project-subtitle", text: proj.subtitle })
        ]),
        el("span", { class: "status-badge", text: proj.status })
      ]),
      el("p", { class: "project-desc", text: proj.description }),
      ...highlights,
      metricsRow,
      figsRow,
      stackRow,
      linksRow
    ]);
    list.appendChild(card);
  });
}

function renderContact() {
  const c = CONTENT.contact;
  document.getElementById("contact-label").textContent = c.sectionLabel;
  document.getElementById("contact-heading").textContent = c.heading;
  document.getElementById("contact-blurb").textContent = c.blurb;

  const links = document.getElementById("contact-links");
  c.links.forEach(l => links.appendChild(buildLinkBtn(l)));
}

function renderFooter() {
  document.getElementById("footer-text").textContent = CONTENT.footer.text;
  document.title = CONTENT.meta.title;
  document.querySelector('meta[name="description"]').setAttribute("content", CONTENT.meta.description);
}

function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(node => io.observe(node));
}

/* Background "DNA rain": sparse falling A/C/G/T characters on a canvas,
   a nucleotide riff on the classic matrix-rain effect. Purely decorative. */
function initDnaRain() {
  const canvas = document.getElementById("dna-rain");
  const ctx = canvas.getContext("2d");
  const bases = ["A", "C", "G", "T"];
  let columns, drops, fontSize = 15;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -100);
  }
  resize();
  window.addEventListener("resize", resize);

  function frame() {
    ctx.fillStyle = "rgba(6,10,8,0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;

    for (let i = 0; i < columns; i++) {
      const base = bases[Math.floor(Math.random() * bases.length)];
      const isHead = Math.random() > 0.94;
      ctx.fillStyle = isHead ? "rgba(77,255,158,0.7)" : "rgba(77,255,158,0.16)";
      ctx.fillText(base, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i] += 0.4;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderFooter();
  initScrollReveal();
  initDnaRain();
});
