(function () {
  "use strict";
  if (typeof DATA === "undefined") {
    console.error("DATA tidak ditemukan. Muat data.js dulu.");
    return;
  }

  const $ = (id) => document.getElementById(id);

  const ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ENT[c]);
  }

  const ICONS = {
    instagram: `<svg viewBox="0 0 24 24"><path d="
      M12 7a5 5 0 100 10 5 5 0 000-10z
      m0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4z
      M17.3 6.2a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z
      M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z
      m0 1.8A3.7 3.7 0 003.8 7.5v9a3.7 3.7 0 003.7 3.7h9a3.7 3.7 0 003.7-3.7v-9a3.7 3.7 0 00-3.7-3.7h-9z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24"><path d="
      M16.6 2h-3.2v13.2
      a2.8 2.8 0 11-2.8-2.8c.3 0 .6 0 .8.1
      V9.2a6 6 0 105.2 5.9V8.6
      a7.4 7.4 0 004.3 1.4V6.8
      a4.3 4.3 0 01-4.3-4.8z"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path d="
      M12 .5a11.5 11.5 0 00-3.6 22.4
      c.6.1.8-.2.8-.6v-2
      c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2
      a11 11 0 015.8 0
      c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2
      c0 .4.2.7.8.6
      A11.5 11.5 0 0012 .5z"/></svg>`
};
function para(text) {
  return text ? <p>${esc(text)}</p> : "";
}
function link(url, label) {
  if (!url) return "";
  return <a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>;
}
function fill(id, items, fn) {
}
  function render() {
    document.title = DATA.name + " | Portofolio";
    $("brand").textContent = DATA.name;
    $("name").textContent = DATA.name;
    $("role").textContent = DATA.role;
    $("about").textContent = DATA.about;
    $("photo").src = DATA.photo;
    $("footer").textContent = "© " + new Date().getFullYear() + " " + DATA.name;

    fill("education-list", DATA.education, (e) =>
      <article class="item"><h3>${esc(e.school)}</h3> +
      <div class="meta">${esc(e.degree)} · ${esc(e.period)}</div> +
      ${para(e.desc)}</article>
    );

    fill("experience-list", DATA.experience, (e) =>
      <article class="item"><h3>${esc(e.position)} — ${esc(e.company)}</h3> +
      <div class="meta">${esc(e.period)}</div> +
      ${para(e.desc)}</article>
    );

    fill("projects-list", DATA.projects, (p) =>
      <article class="card">${img(p.image, p.title)} +
      <h3>${esc(p.title)}</h3>${para(p.desc)} +
      ${link(p.link, "Lihat project")}</article>
    );

    fill("certificates-list", DATA.certificates, (c) =>
      <article class="card">${img(c.image, c.title)} +
      <h3>${esc(c.title)}</h3> +
      <div class="meta">${esc(c.issuer)} · ${esc(c.year)}</div> +
      ${link(c.link, "Lihat sertifikat")}</article>
    );

    fill("awards-list", DATA.awards, (a) =>
      <article class="card"><h3>${esc(a.title)}</h3> +
      <div class="meta">${esc(a.issuer)} · ${esc(a.year)}</div> +
      ${para(a.desc)}</article>
    );

    $("music-title").textContent = DATA.music.title;
    $("music-sub").textContent = DATA.music.subtitle;
    $("player").src = DATA.music.src;

    fill("social-list", DATA.social, (s) => {
      const icon = ICONS[s.name.toLowerCase()] || "";
      return link(s.url, icon + "<span>" + esc(s.name) + "</span>");
    });
  }

  // Latar bintang sederhana (canvas), tema gelap #050510
  function stars() {
    const c = $("bg");
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, pts;

    function size() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      const n = Math.round((w * h) / 9000);
      pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.2,
          v: Math.random() * 0.25 + 0.05
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(200,210,255,0.8)";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
        if (!reduce) {
          p.y += p.v;
          if (p.y > h) p.y = 0;
        }
      }
      if (!reduce) requestAnimationFrame(draw);
    }

    size();
    draw();
    window.addEventListener("resize", () => {
      size();
      if (reduce) draw();
    });
  }

  // Name card 3D: mengikuti gerak mouse / sentuhan
  function tilt() {
    const card = $("card");

    function move(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.classList.add("active");
      card.style.setProperty("--ry", (x - 0.5) * 28 + "deg");
      card.style.setProperty("--rx", (0.5 - y) * 28 + "deg");
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
    }

    function leave() {
      card.classList.remove("active");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    }

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointerup", leave);
  }

  render();
  stars();
  tilt();
})();