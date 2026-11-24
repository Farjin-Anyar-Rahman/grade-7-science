/* ===== Interactive widgets — Chapter 1 ===== */
window.W = window.W || {};
(function () {
  const { h, esc, shuffle, sfx, css } = Lab;
  const reg = (name, title, init) => (W[name] = { title, init });
  const info = (el, html) => { const i = el.querySelector(".w-info"); if (!i) return; i.innerHTML = html; i.classList.remove("pop"); void i.offsetWidth; i.classList.add("pop"); };
  const raf = (fn) => { let on = true, id; const loop = (t) => { if (!on) return; fn(t); id = requestAnimationFrame(loop); }; id = requestAnimationFrame(loop); return () => { on = false; cancelAnimationFrame(id); }; };
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  window.WU = { reg, info, raf, lerp, ease };   // shared with other widget files
  /* inline quiz helper for widgets */
  WU.inlineQ = (el, q) => { const a = Quiz.render(Object.assign({ id: "w-" + Math.random() }, q), { mode: "inline" }); a.el.classList.remove("card"); a.el.style.padding = "4px 0"; el.appendChild(a.el); return a; };

  /* ---------------- circulation ---------------- */
  reg("circulation", "Double circulation — live", (el) => {
    el.innerHTML = `<svg viewBox="0 0 420 330">
      <rect x="130" y="14" width="160" height="56" rx="26" fill="#ffd4dc" class="hot" data-o="lungs"/>
      <text x="210" y="47" text-anchor="middle" font-weight="800" fill="#8a1530">🫁 Lungs</text>
      <rect x="120" y="262" width="180" height="56" rx="26" fill="#e3dcff" class="hot" data-o="body"/>
      <text x="210" y="295" text-anchor="middle" font-weight="800" fill="#3d2a8a">🦵 Body cells</text>
      <g class="hot" data-o="heart"><g class="beat"><path d="M210 196 C170 172 160 140 180 128 C194 120 205 128 210 138 C215 128 226 120 240 128 C260 140 250 172 210 196Z" fill="#e5484d"/></g></g>
      <text x="210" y="222" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink2)">Heart</text>
      <g id="paths" fill="none" stroke-width="10" stroke-linecap="round" opacity=".25">
        <path id="pA" d="M190 140 C110 130 100 80 150 64" stroke="#8e3b8a"/>
        <path id="pB" d="M270 64 C320 80 310 130 230 140" stroke="#e5484d"/>
        <path id="pC" d="M232 182 C330 196 330 250 270 268" stroke="#e5484d"/>
        <path id="pD" d="M150 268 C90 250 90 196 188 182" stroke="#8e3b8a"/>
      </g>
      <g id="dots"></g>
      <text x="64" y="104" font-size="11" font-weight="800" fill="#8e3b8a">low O₂</text>
      <text x="322" y="104" font-size="11" font-weight="800" fill="#e5484d">high O₂</text>
      <text x="335" y="236" font-size="11" font-weight="800" fill="#e5484d">to body</text>
      <text x="40" y="236" font-size="11" font-weight="800" fill="#8e3b8a">back to heart</text>
    </svg>
    <div class="slider-row">🐢 <input type="range" min="0.2" max="3" step="0.1" value="1" id="spd"> 🐇 <span id="bpm">72 bpm</span></div>
    <div class="w-info">Tap the <b>heart</b>, <b>lungs</b> or <b>body</b>. Drag the slider to make the heart pump faster — like during exercise!</div>`;
    const svg = el.querySelector("svg"), dotsG = svg.querySelector("#dots");
    const P = ["pA", "pB", "pC", "pD"].map(id => svg.querySelector("#" + id));
    const L = P.map(p => p.getTotalLength());
    const dots = [];
    P.forEach((p, k) => { for (let i = 0; i < 6; i++) { const c = document.createElementNS("http://www.w3.org/2000/svg", "circle"); c.setAttribute("r", 6); c.setAttribute("fill", k === 0 || k === 3 ? "#8e3b8a" : "#e5484d"); c.setAttribute("stroke", "#fff"); c.setAttribute("stroke-width", 1.5); dotsG.appendChild(c); dots.push({ c, k, t: i / 6 }); } });
    let speed = 1, last = 0;
    const spd = el.querySelector("#spd"); spd.oninput = () => { speed = +spd.value; el.querySelector("#bpm").textContent = Math.round(72 * speed) + " bpm"; svg.querySelector(".beat").style.animationDuration = (1 / speed) + "s"; };
    const texts = { lungs: "<b>Lungs:</b> blood picks up <b>oxygen</b> and gets rid of <b>carbon dioxide</b>. It leaves bright red.", body: "<b>Body cells:</b> blood delivers <b>oxygen</b> and <b>digested food</b> for respiration, and collects <b>carbon dioxide</b>. It leaves dull red.", heart: "<b>Heart:</b> a muscular pump. It pumps blood to the lungs AND to the body — that's why we say there are <b>two circuits</b>." };
    svg.querySelectorAll(".hot").forEach(g => g.onclick = () => { svg.querySelectorAll(".hot").forEach(x => x.classList.remove("lit")); g.classList.add("lit"); info(el, texts[g.dataset.o]); sfx.click(); });
    return raf((t) => { const dt = last ? Math.min(50, t - last) : 16; last = t; dots.forEach(d => { d.t = (d.t + dt * 0.00018 * speed) % 1; const pt = P[d.k].getPointAtLength(d.t * L[d.k]); d.c.setAttribute("cx", pt.x); d.c.setAttribute("cy", pt.y); }); });
  });

  /* ---------------- capillary + WBC squeeze ---------------- */
  reg("capillary", "Inside a capillary", (el) => {
    let wall = ""; for (let x = -10; x < 420; x += 52) { wall += `<rect x="${x}" y="58" width="46" height="16" rx="7" fill="#f08aa0"/><rect x="${x}" y="146" width="46" height="16" rx="7" fill="#f08aa0"/>`; }
    el.innerHTML = `<svg viewBox="0 0 400 270">
      <rect width="400" height="270" fill="#fff4f1"/>
      <rect x="0" y="74" width="400" height="72" fill="#fde2a6" opacity=".7"/>
      <text x="8" y="20" font-size="12" font-weight="800" fill="#9a5b57">TISSUE</text><text x="8" y="112" font-size="12" font-weight="800" fill="#9a6a00">PLASMA (inside capillary)</text><text x="8" y="186" font-size="12" font-weight="800" fill="#9a5b57">TISSUE</text>
      ${wall}
      <g id="rbcs"></g><g id="leak"></g>
      <g id="bact">${[[290, 222], [318, 238], [300, 248], [330, 214]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="wiggle" style="animation-delay:${i * .3}s"><rect x="-10" y="-5" width="20" height="10" rx="5" fill="#3fb950"/><path d="M10 0 q6 -4 10 2" stroke="#3fb950" fill="none" stroke-width="2"/></g></g>`).join("")}</g>
      <g id="wbc" transform="translate(-30 110)"><g id="wbcS"><circle r="18" fill="#f6f3ff" stroke="#a99bff" stroke-width="2.5"/><path d="M-8 -4 q5 -8 10 0 q5 8 -2 10 q-10 3 -8 -10z" fill="#7c5cff"/></g></g>
    </svg>
    <div class="w-controls"><button class="btn small" id="play">▶ Send a white blood cell</button><button class="btn small ghost" id="rst">Reset</button></div>
    <div class="w-info">Red blood cells flow through the capillary. Yellow <b>plasma</b> leaks out through the <b>gaps</b> in the wall. Press play to send a white blood cell after the 🦠 bacteria.</div>`;
    const svg = el.querySelector("svg"), rbcG = svg.querySelector("#rbcs"), leakG = svg.querySelector("#leak"), wbc = svg.querySelector("#wbc"), wS = svg.querySelector("#wbcS"), bact = svg.querySelector("#bact");
    const NS = "http://www.w3.org/2000/svg";
    const rb = Array.from({ length: 7 }, (_, i) => { const g = document.createElementNS(NS, "g"); g.innerHTML = `<ellipse rx="13" ry="10" fill="#d9283f"/><ellipse rx="5" ry="4" fill="#a3122a" opacity=".6"/>`; rbcG.appendChild(g); return { g, x: i * 62, y: 96 + (i % 3) * 14 }; });
    const leaks = [];
    const way = [[-30, 110, 1, 1], [195, 112, 1, 1], [195, 138, .4, 1.5], [195, 154, .25, 1.7], [195, 180, .5, 1.4], [195, 196, 1, 1], [300, 228, 1.15, 1.15]];
    let anim = null, last = 0;
    function play() {
      if (anim) return; bact.querySelectorAll(":scope > g").forEach(b => b.style.opacity = 1);
      anim = { seg: 0, t: 0 }; info(el, "The white blood cell <b>changes shape</b> to squeeze through a <b>gap between the wall cells</b>…");
    }
    el.querySelector("#play").onclick = play;
    el.querySelector("#rst").onclick = () => { anim = null; wbc.setAttribute("transform", "translate(-30 110)"); wS.setAttribute("transform", ""); bact.querySelectorAll(":scope > g").forEach(b => b.style.opacity = 1); info(el, "Ready. Press play!"); };
    return raf((t) => {
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      rb.forEach(r => { r.x += dt * 0.08; if (r.x > 420) r.x = -20; r.g.setAttribute("transform", `translate(${r.x} ${r.y})`); });
      if (Math.random() < 0.04) { const gx = [36, 88, 140, 192, 244, 296, 348][(Math.random() * 7) | 0] + 3; const c = document.createElementNS(NS, "circle"); c.setAttribute("r", 3); c.setAttribute("fill", "#e8b400"); leakG.appendChild(c); leaks.push({ c, x: gx, y: 140, vy: 0.4 + Math.random() * .3, life: 0 }); }
      for (let i = leaks.length - 1; i >= 0; i--) { const l = leaks[i]; l.y += l.vy * dt * 0.06; l.x += Math.sin(l.life / 9) * .3; l.life++; l.c.setAttribute("cx", l.x); l.c.setAttribute("cy", l.y); l.c.setAttribute("opacity", Math.max(0, 1 - l.life / 90)); if (l.life > 90) { l.c.remove(); leaks.splice(i, 1); } }
      if (anim) {
        if (anim.seg < way.length - 1) {
          anim.t += dt / (anim.seg === 0 ? 1800 : anim.seg >= 5 ? 1200 : 700);
          if (anim.t >= 1) { anim.t = 0; anim.seg++; if (anim.seg === 5) info(el, "Through! Now it moves through the tissue towards the pathogens…"); }
          const a = way[anim.seg], b = way[Math.min(anim.seg + 1, way.length - 1)], k = ease(anim.t);
          wbc.setAttribute("transform", `translate(${lerp(a[0], b[0], k)} ${lerp(a[1], b[1], k)})`); wS.setAttribute("transform", `scale(${lerp(a[2], b[2], k)} ${lerp(a[3], b[3], k)})`);
        } else if (!anim.done) {
          anim.done = true; let n = 0; bact.querySelectorAll(":scope > g").forEach((b, i) => setTimeout(() => { b.style.transition = "opacity .5s"; b.style.opacity = 0; if (++n === 4) { info(el, "🎉 The white blood cell <b>wrapped around</b> the bacteria and <b>destroyed</b> them. Infection stopped!"); sfx.good(); } }, 400 * i));
          setTimeout(() => { anim = null; }, 2000);
        }
      }
    });
  });

  /* ---------------- blood tube / centrifuge ---------------- */
  reg("bloodTube", "Spin the blood sample", (el) => {
    el.innerHTML = `<svg viewBox="0 0 320 300">
      <g id="tube" style="transform-origin:160px 150px">
        <path d="M130 30 h60 v200 a30 30 0 0 1 -60 0z" fill="#fff" stroke="var(--muted)" stroke-width="3"/>
        <clipPath id="tclip"><path d="M132 60 h56 v170 a28 28 0 0 1 -56 0z"/></clipPath>
        <g clip-path="url(#tclip)">
          <rect class="hot" data-l="plasma" x="130" y="60" width="60" height="98" fill="#f2d36b"/>
          <rect class="hot" data-l="wbc" x="130" y="158" width="60" height="8" fill="#f6f3ff"/>
          <rect class="hot" data-l="rbc" x="130" y="166" width="60" height="100" fill="#c8102e"/>
          <rect id="mixed" x="130" y="60" width="60" height="210" fill="#b3122b" style="transition:opacity 1s"/>
        </g>
      </g>
      <g id="labels" style="opacity:0;transition:opacity .8s">
        <line x1="194" y1="105" x2="226" y2="105" stroke="var(--ink2)"/><text x="230" y="102" font-size="13" font-weight="800" fill="var(--ink)">Plasma</text><text x="230" y="118" font-size="11" fill="var(--muted)">~55%</text>
        <line x1="194" y1="162" x2="226" y2="162" stroke="var(--ink2)"/><text x="230" y="166" font-size="13" font-weight="800" fill="var(--ink)">White cells</text>
        <line x1="194" y1="210" x2="226" y2="210" stroke="var(--ink2)"/><text x="230" y="207" font-size="13" font-weight="800" fill="var(--ink)">Red cells</text><text x="230" y="223" font-size="11" fill="var(--muted)">~45%</text>
      </g>
    </svg>
    <div class="w-controls"><button class="btn small" id="spin">🌀 Spin in a centrifuge</button></div>
    <div class="w-info">Fresh blood looks all red. Spin it fast and the heavy cells sink. Then tap each layer.</div>`;
    const tube = el.querySelector("#tube");
    el.querySelector("#spin").onclick = () => { tube.style.transition = "transform 1.4s cubic-bezier(.5,0,.5,1)"; tube.style.transform = "rotate(1080deg)"; sfx.click(); setTimeout(() => { tube.style.transition = "none"; tube.style.transform = ""; el.querySelector("#mixed").style.opacity = 0; el.querySelector("#labels").style.opacity = 1; info(el, "Separated! Now <b>tap each layer</b>."); }, 1450); };
    const T = { plasma: "<b>Plasma</b> (about half your blood): pale-yellow liquid. Carries the cells and dissolved <b>digested food</b> and <b>carbon dioxide</b>.", wbc: "<b>White blood cells</b>: a thin layer — there are far fewer of them. They destroy <b>pathogens</b>.", rbc: "<b>Red blood cells</b>: contain <b>haemoglobin</b> to carry oxygen." };
    el.querySelectorAll("[data-l]").forEach(r => r.onclick = () => { if (el.querySelector("#mixed").style.opacity !== "0") return info(el, "Spin it first! 🌀"); info(el, T[r.dataset.l]); sfx.click(); });
  });

  /* ---------------- blood cells canvas ---------------- */
  reg("bloodCells", "Microscope: flowing blood", (el) => {
    el.innerHTML = `<canvas width="640" height="360"></canvas>
    <div class="w-controls"><button class="btn small ghost" id="pz">⏸ Pause</button><label class="toggle"><input type="checkbox" id="o2"> Show oxygen on haemoglobin</label></div>
    <div class="w-info">Tap any cell to identify it.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d");
    const cells = [];
    for (let i = 0; i < 34; i++) cells.push({ type: "rbc", x: Math.random() * 640, y: 40 + Math.random() * 280, r: 20, a: Math.random() * 6, va: (Math.random() - .5) * .02, s: .6 + Math.random() * .5, tilt: .55 + Math.random() * .45 });
    for (let i = 0; i < 2; i++) cells.push({ type: "wbc", x: Math.random() * 640, y: 80 + Math.random() * 200, r: 28, a: 0, va: .01, s: .35 });
    for (let i = 0; i < 6; i++) cells.push({ type: "pl", x: Math.random() * 640, y: 40 + Math.random() * 280, r: 6, a: 0, va: .03, s: .8 });
    let paused = false, sel = null, showO2 = false, t0 = 0;
    el.querySelector("#pz").onclick = (e) => { paused = !paused; e.target.textContent = paused ? "▶ Play" : "⏸ Pause"; };
    el.querySelector("#o2").onchange = (e) => showO2 = e.target.checked;
    cv.onclick = (e) => {
      const r = cv.getBoundingClientRect(); const x = (e.clientX - r.left) * 640 / r.width, y = (e.clientY - r.top) * 360 / r.height;
      sel = cells.slice().reverse().find(c => Math.hypot(c.x - x, c.y - y) < c.r + 6) || null; sfx.click();
      if (!sel) return info(el, "That's <b>plasma</b> — the pale-yellow liquid the cells float in.");
      info(el, sel.type === "rbc" ? "🔴 <b>Red blood cell</b> — dimpled disc (big surface area), no nucleus (more room for haemoglobin), flexible enough to squeeze through capillaries." : sel.type === "wbc" ? "⚪ <b>White blood cell</b> — has a nucleus, changes shape, engulfs and destroys pathogens." : "🟣 <b>Platelet</b> — tiny cell fragments that help blood clot when you cut yourself.");
    };
    return raf((t) => {
      t0 = t;
      g.fillStyle = "#fbe7c6"; g.fillRect(0, 0, 640, 360);
      g.fillStyle = "rgba(240,170,120,.35)"; g.fillRect(0, 0, 640, 22); g.fillRect(0, 338, 640, 22);
      cells.forEach(c => {
        if (!paused) { c.x += c.s * 1.4; c.a += c.va; c.y += Math.sin(t / 900 + c.x / 60) * .15; if (c.x > 680) c.x = -40; }
        g.save(); g.translate(c.x, c.y); g.rotate(c.a);
        if (c.type === "rbc") {
          g.scale(1, c.tilt);
          const gr = g.createRadialGradient(0, 0, 3, 0, 0, c.r); gr.addColorStop(0, "#9e0f26"); gr.addColorStop(.45, "#c71a36"); gr.addColorStop(.8, "#e43a52"); gr.addColorStop(1, "#b51530");
          g.fillStyle = gr; g.beginPath(); g.arc(0, 0, c.r, 0, 7); g.fill();
          if (showO2) { g.fillStyle = "#4fc3ff"; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(Math.cos(k * 1.57 + t / 500) * 12, Math.sin(k * 1.57 + t / 500) * 12, 3.5, 0, 7); g.fill(); } }
        } else if (c.type === "wbc") {
          g.fillStyle = "#f6f3ff"; g.strokeStyle = "#a99bff"; g.lineWidth = 3; g.beginPath();
          for (let k = 0; k <= 24; k++) { const an = k / 24 * 6.283, rr = c.r + Math.sin(an * 5 + t / 300) * 2.5; g.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } g.fill(); g.stroke();
          g.fillStyle = "#7c5cff"; [[-8, -4], [2, -9], [8, 3], [-3, 7]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); });
        } else { g.fillStyle = "#b39ddb"; g.beginPath(); g.ellipse(0, 0, 6, 3.5, 0, 0, 7); g.fill(); }
        g.restore();
        if (sel === c) { g.strokeStyle = "#ffd400"; g.lineWidth = 3; g.setLineDash([6, 5]); g.beginPath(); g.arc(c.x, c.y, c.r + 10, 0, 7); g.stroke(); g.setLineDash([]); }
      });
    });
  });

  /* ---------------- WBC hunt game ---------------- */
  reg("wbcHunt", "Game: stop the infection!", (el) => {
    el.innerHTML = `<canvas width="600" height="340" style="cursor:crosshair"></canvas>
    <div class="w-controls"><button class="btn small" id="go">▶ Start</button><span class="chip" id="sc">Bacteria: 0</span><span class="chip" id="kl">Destroyed: 0</span></div>
    <div class="w-info">Bacteria got in through a cut! <b>Tap a bacterium</b> to send a white blood cell to engulf it. They multiply every few seconds — keep the number below 30!</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d");
    let B = [], Wc = [], run = false, kills = 0, lastSplit = 0, over = false;
    function reset() { B = Array.from({ length: 4 }, () => ({ x: 380 + Math.random() * 180, y: 60 + Math.random() * 240, a: Math.random() * 6 })); Wc = [{ x: 40, y: 120, tx: null, target: null }, { x: 40, y: 230, tx: null, target: null }]; kills = 0; over = false; }
    reset();
    el.querySelector("#go").onclick = () => { reset(); run = true; lastSplit = performance.now(); info(el, "Go! Tap the bacteria 🦠"); };
    cv.onclick = (e) => {
      if (!run) return; const r = cv.getBoundingClientRect(); const x = (e.clientX - r.left) * 600 / r.width, y = (e.clientY - r.top) * 340 / r.height;
      const b = B.find(b => Math.hypot(b.x - x, b.y - y) < 22); if (!b) return;
      const free = Wc.filter(w => !w.target).sort((p, q) => Math.hypot(p.x - b.x, p.y - b.y) - Math.hypot(q.x - b.x, q.y - b.y))[0] || Wc[0];
      free.target = b; sfx.click();
    };
    return raf((t) => {
      g.fillStyle = "#ffe9e4"; g.fillRect(0, 0, 600, 340);
      g.fillStyle = "#f6c0b3"; for (let i = 0; i < 12; i++) { g.beginPath(); g.ellipse((i * 97) % 600, ((i * 53) % 340), 40, 26, i, 0, 7); g.fill(); }
      g.fillStyle = "#f08aa0"; g.fillRect(0, 0, 18, 340);
      if (run && t - lastSplit > 2600) { lastSplit = t; B.slice().forEach(b => { if (B.length < 60) B.push({ x: Math.min(590, Math.max(30, b.x + (Math.random() - .5) * 50)), y: Math.min(330, Math.max(10, b.y + (Math.random() - .5) * 50)), a: Math.random() * 6 }); }); }
      B.forEach(b => { b.a += .03; b.x += Math.cos(b.a) * .2; g.save(); g.translate(b.x, b.y); g.rotate(b.a); g.fillStyle = "#2ea043"; g.beginPath(); g.roundRect ? g.roundRect(-11, -6, 22, 12, 6) : g.rect(-11, -6, 22, 12); g.fill(); g.strokeStyle = "#2ea043"; g.lineWidth = 2; g.beginPath(); g.moveTo(11, 0); g.quadraticCurveTo(16, -5, 20, 1); g.stroke(); g.restore(); });
      Wc.forEach(w => {
        if (w.target) { if (!B.includes(w.target)) w.target = null; else { const dx = w.target.x - w.x, dy = w.target.y - w.y, d = Math.hypot(dx, dy); if (d < 14) { B.splice(B.indexOf(w.target), 1); w.target = null; kills++; sfx.good(); } else { w.x += dx / d * 4.2; w.y += dy / d * 4.2; } } }
        g.save(); g.translate(w.x, w.y); g.fillStyle = "#f6f3ff"; g.strokeStyle = "#8f7dff"; g.lineWidth = 3; g.beginPath(); for (let k = 0; k <= 20; k++) { const an = k / 20 * 6.283, rr = 20 + Math.sin(an * 4 + t / 200) * 3; g.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } g.fill(); g.stroke(); g.fillStyle = "#7c5cff"; g.beginPath(); g.arc(-4, -2, 7, 0, 7); g.arc(5, 4, 6, 0, 7); g.fill(); g.restore();
      });
      el.querySelector("#sc").textContent = "Bacteria: " + B.length; el.querySelector("#kl").textContent = "Destroyed: " + kills;
      if (run && B.length === 0) { run = false; info(el, "🏆 Infection cleared! You destroyed " + kills + " bacteria. That's exactly what white blood cells do — they <b>engulf and destroy pathogens</b>."); sfx.win(); }
      if (run && B.length >= 30) { run = false; info(el, "😷 The infection spread! In real life your body would make <b>more white blood cells</b> to fight back. Try again!"); sfx.bad(); }
    });
  });

  /* ---------------- variables game (inline sorts) ---------------- */
  reg("variableGame", "Variable spotter", (el) => {
    const sc = [
      { t: "Does exercise change pulse rate?", q: { t: "sort", q: "Rafi does different activities for 2 minutes each and measures his pulse.", buckets: ["Independent", "Dependent", "Control"], items: [["Type of activity", 0], ["Pulse rate", 1], ["Time spent exercising (2 min)", 2], ["Same person", 2]], ex: "Change → measure → keep the same." } },
      { t: "Which food has most energy?", q: { t: "sort", q: "Tasnim burns different foods under a tube of water.", buckets: ["Independent", "Dependent", "Control"], items: [["Type of food", 0], ["Temperature rise", 1], ["Mass of food", 2], ["Volume of water", 2]], ex: "This one was on the test!" } },
      { t: "Does height affect lung volume?", q: { t: "sort", q: "Students of different heights blow into the lung-volume apparatus.", buckets: ["Independent", "Dependent", "Control"], items: [["Height of student", 0], ["Lung volume", 1], ["Same apparatus", 2], ["Big breath in each time", 2]], ex: "" } }
    ];
    let k = 0;
    function draw() { el.innerHTML = `<div class="row"><b>Experiment ${k + 1}/3:</b> ${esc(sc[k].t)}<span class="spacer"></span><button class="btn small ghost" id="nx">Next ›</button></div><div class="zone"></div>`; WU.inlineQ(el.querySelector(".zone"), sc[k].q); el.querySelector("#nx").onclick = () => { k = (k + 1) % sc.length; draw(); }; }
    draw();
  });

  /* ---------------- equation builder ---------------- */
  reg("equationBuilder", "Build the respiration equation", (el) => {
    const tiles = ["oxygen", "glucose", "carbon dioxide", "water", "light", "starch", "nitrogen"];
    el.innerHTML = `<div class="eq-slots"><div class="eq-slot" data-s="0"></div>+<div class="eq-slot" data-s="1"></div>→<div class="eq-slot" data-s="2"></div>+<div class="eq-slot" data-s="3"></div></div>
      <div class="bank" style="justify-content:center">${shuffle(tiles).map(t => `<button class="tile" data-t="${t}">${t}</button>`).join("")}</div>
      <div class="w-controls" style="justify-content:center"><button class="btn small" id="chk">Check ✓</button><button class="btn small ghost" id="clr">Clear</button></div>
      <svg viewBox="0 0 300 120" id="mito" style="margin-top:8px"><ellipse cx="150" cy="60" rx="120" ry="48" fill="#ffd1a6" stroke="#e08a3c" stroke-width="4"/><path d="M50 60 q20 -30 40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#e08a3c" stroke-width="4"/><text x="150" y="112" text-anchor="middle" font-size="12" font-weight="800" fill="var(--muted)">mitochondrion</text><g id="bolts" opacity="0"><text x="40" y="30" font-size="26">⚡</text><text x="230" y="34" font-size="26">⚡</text><text x="140" y="22" font-size="26">⚡</text></g></svg>
      <div class="w-info">Tap words to fill the gaps (tap a gap to empty it). Reactants on the left, products on the right.</div>`;
    const slots = [...el.querySelectorAll(".eq-slot")];
    el.querySelectorAll(".tile").forEach(b => b.onclick = () => { const s = slots.find(s => !s.textContent); if (!s) return; s.textContent = b.dataset.t; s.classList.add("filled"); slots.forEach(x => x.classList.remove("right", "wrong")); sfx.click(); });
    slots.forEach(s => s.onclick = () => { s.textContent = ""; s.classList.remove("filled", "right", "wrong"); });
    el.querySelector("#clr").onclick = () => slots.forEach(s => s.onclick());
    el.querySelector("#chk").onclick = () => {
      const v = slots.map(s => s.textContent); const L = ["oxygen", "glucose"], R = ["carbon dioxide", "water"];
      const okL = v.slice(0, 2).sort().join() === L.slice().sort().join(), okR = v.slice(2).sort().join() === R.slice().sort().join();
      slots.forEach((s, i) => s.classList.add((i < 2 ? L : R).includes(s.textContent) ? "right" : "wrong"));
      if (okL && okR) { info(el, "🎉 <b>Correct!</b> oxygen + glucose → carbon dioxide + water. Energy is released inside the <b>mitochondria</b>."); const b = el.querySelector("#bolts"); b.style.transition = "opacity .4s"; b.setAttribute("opacity", 1); b.classList.add("wiggle"); sfx.win(); Lab.addXP(10); }
      else { info(el, "Not yet. Hint: <b>glucose</b> comes from food and is <b>used up</b>, so it's a <b>reactant</b>. Light, starch and nitrogen are not in this equation."); sfx.bad(); }
    };
  });

  /* ---------------- diffusion box ---------------- */
  reg("diffusion", "Diffusion simulator", (el) => {
    el.innerHTML = `<canvas width="600" height="300"></canvas>
    <div class="w-controls"><button class="btn small" id="rm">Remove the barrier</button><button class="btn small ghost" id="rs">Reset</button></div>
    <div class="slider-row">🧊 cold <input type="range" id="tmp" min="0.3" max="2.5" step="0.1" value="1"> hot 🔥</div>
    <div class="bars"><div class="barrow"><span>Left side</span><span class="tr"><i id="bl" style="background:#7c5cff"></i></span><span id="nl"></span></div><div class="barrow"><span>Right side</span><span class="tr"><i id="br" style="background:#00b3c7"></i></span><span id="nr"></span></div></div>
    <div class="w-info">All the gas particles start on the left (high concentration). Remove the barrier and watch.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); let P, barrier, temp = 1;
    function reset() { barrier = true; P = Array.from({ length: 140 }, () => ({ x: 10 + Math.random() * 280, y: 10 + Math.random() * 280, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3 })); info(el, "All the gas particles start on the left (high concentration). Remove the barrier and watch."); }
    reset();
    el.querySelector("#rm").onclick = () => { barrier = false; info(el, "Particles move <b>randomly</b>, but overall more move <b>from high to low concentration</b> — that's <b>diffusion</b>. Heat it up to speed it up!"); };
    el.querySelector("#rs").onclick = reset; el.querySelector("#tmp").oninput = e => temp = +e.target.value;
    return raf(() => {
      g.fillStyle = css("--card"); g.fillRect(0, 0, 600, 300);
      let l = 0;
      P.forEach(p => {
        p.x += p.vx * temp; p.y += p.vy * temp;
        if (p.y < 5 || p.y > 295) p.vy *= -1; if (p.x < 5 || p.x > 595) p.vx *= -1;
        if (barrier && p.x > 295) { p.x = 295; p.vx = -Math.abs(p.vx); }
        p.vx += (Math.random() - .5) * .3; p.vy += (Math.random() - .5) * .3; const s = Math.hypot(p.vx, p.vy); if (s > 3) { p.vx *= 3 / s; p.vy *= 3 / s; }
        if (p.x < 300) l++;
        g.fillStyle = p.x < 300 ? "#7c5cff" : "#00b3c7"; g.beginPath(); g.arc(p.x, p.y, 5, 0, 7); g.fill();
      });
      if (barrier) { g.fillStyle = css("--ink2"); g.fillRect(297, 0, 6, 300); }
      else { g.setLineDash([6, 8]); g.strokeStyle = css("--line"); g.beginPath(); g.moveTo(300, 0); g.lineTo(300, 300); g.stroke(); g.setLineDash([]); }
      el.querySelector("#bl").style.width = l / 1.4 + "%"; el.querySelector("#br").style.width = (140 - l) / 1.4 + "%";
      el.querySelector("#nl").textContent = l; el.querySelector("#nr").textContent = 140 - l;
    });
  });

  /* ---------------- alveolus gas exchange ---------------- */
  reg("alveolus", "Gas exchange in an alveolus", (el) => {
    el.innerHTML = `<canvas width="600" height="340"></canvas>
    <div class="w-controls"><label class="toggle"><input type="checkbox" id="thick"> Thick wall (damaged)</label><label class="toggle"><input type="checkbox" id="breath" checked> Keep breathing</label></div>
    <div class="bars"><div class="barrow"><span>O₂ to body</span><span class="tr"><i id="ob" style="background:#e5484d"></i></span><span id="on">0</span></div></div>
    <div class="w-info"><span style="color:#e5484d">●</span> oxygen diffuses <b>into the blood</b>; <span style="color:#3b82f6">●</span> carbon dioxide diffuses <b>into the alveolus</b>. Blood flows away, keeping the difference high.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); const WY = 170;
    let thick = false, breath = true, delivered = 0, rate = 0, hist = [];
    el.querySelector("#thick").onchange = e => { thick = e.target.checked; info(el, thick ? "With a <b>thick wall</b>, gases take much longer to cross — far less oxygen reaches the blood. (Alveoli walls are normally <b>one cell thick</b>.)" : "Thin wall again — quick diffusion! ✅"); };
    el.querySelector("#breath").onchange = e => { breath = e.target.checked; info(el, breath ? "Breathing keeps bringing fresh oxygen in and removes CO₂." : "Stop breathing → oxygen in the alveolus runs out, so the concentration difference disappears and diffusion slows."); };
    const P = [];
    const add = (type, side) => P.push({ type, x: Math.random() * 600, y: side === "air" ? 20 + Math.random() * (WY - 40) : WY + 25 + Math.random() * 130 });
    for (let i = 0; i < 60; i++) add("o2", "air"); for (let i = 0; i < 40; i++) add("co2", "blood");
    const rbc = Array.from({ length: 8 }, (_, i) => ({ x: i * 80, y: WY + 70 + (i % 2) * 40 }));
    return raf((t) => {
      g.fillStyle = "#e6f4ff"; g.fillRect(0, 0, 600, WY); g.fillStyle = "#ffe1df"; g.fillRect(0, WY, 600, 170);
      g.fillStyle = "#3b82f6"; g.font = "bold 13px 'Times New Roman'"; g.fillText("AIR in the ALVEOLUS", 10, 18); g.fillStyle = "#c0392b"; g.fillText("BLOOD in a CAPILLARY  → flows to the body", 10, 334);
      g.fillStyle = "#f3a6b4"; g.fillRect(0, WY - (thick ? 18 : 3), 600, thick ? 36 : 6);
      rbc.forEach(r => { r.x += 1.2; if (r.x > 640) r.x = -40; g.fillStyle = "#d9283f"; g.beginPath(); g.ellipse(r.x, r.y, 20, 13, 0, 0, 7); g.fill(); g.fillStyle = "#a3122a"; g.beginPath(); g.ellipse(r.x, r.y, 8, 5, 0, 0, 7); g.fill(); });
      const pass = thick ? 0.02 : 0.35;
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; const inAir = p.y < WY;
        p.x += (Math.random() - .5) * 4; p.y += (Math.random() - .5) * 4 + (p.type === "o2" && inAir ? .6 : p.type === "co2" && !inAir ? -.6 : 0);
        if (!inAir) p.x += 1.2;
        const nowAir = p.y < WY;
        if (nowAir !== inAir && Math.random() > pass) p.y = inAir ? WY - 4 : WY + 4;
        if (p.y < 8) p.y = 8; if (p.y > 325) p.y = 325;
        if (p.x < 0) p.x += 600;
        if (p.x > 600) { if (p.y >= WY) { if (p.type === "o2") { delivered++; rate++; } P.splice(i, 1); continue; } else p.x -= 600; }
        g.fillStyle = p.type === "o2" ? "#e5484d" : "#3b82f6"; g.beginPath(); g.arc(p.x, p.y, 4.5, 0, 7); g.fill();
      }
      if (Math.random() < 0.25) add("co2", "blood");
      if (breath) { const o2air = P.filter(p => p.type === "o2" && p.y < WY).length; if (o2air < 60 && Math.random() < .5) P.push({ type: "o2", x: Math.random() * 600, y: 20 + Math.random() * 30 }); P.forEach((p, i) => { if (p.type === "co2" && p.y < 40 && Math.random() < .1) P.splice(i, 1); }); }
      if (P.length > 400) P.splice(0, P.length - 400);
      hist.push(rate); rate = 0; if (hist.length > 120) hist.shift();
      const avg = hist.reduce((a, b) => a + b, 0); el.querySelector("#ob").style.width = Math.min(100, avg * 4) + "%"; el.querySelector("#on").textContent = delivered;
    });
  });

  /* ---------------- respiratory system labelled ---------------- */
  reg("lungsLabel", "Explore the respiratory system", (el) => {
    el.innerHTML = `<svg viewBox="0 0 400 360">
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="hot" data-p="ribs" d="M${70 - i * 3} ${130 + i * 32} Q200 ${100 + i * 32} ${330 + i * 3} ${130 + i * 32}" fill="none" stroke="#e9dcc4" stroke-width="9" stroke-linecap="round"/>`).join("")}
      <path class="hot" data-p="lungs" d="M182 120 C120 110 80 180 84 260 C86 300 120 312 178 296 Z" fill="#f59fb0" opacity=".95"/>
      <path class="hot" data-p="lungs" d="M218 120 C280 110 320 180 316 260 C314 300 280 312 222 296 Z" fill="#f59fb0" opacity=".95"/>
      <g class="hot" data-p="bronchioles" stroke="#c2185b" stroke-width="3" fill="none">
        <path d="M160 160 l-30 30 m30 -30 l-10 50 m-20 -20 l-25 10 m25 -10 l-10 40"/><path d="M240 160 l30 30 m-30 -30 l10 50 m20 -20 l25 10 m-25 -10 l10 40"/></g>
      <g class="hot" data-p="bronchi" stroke="#9c6b2f" stroke-width="12" fill="none" stroke-linecap="round"><path d="M200 128 L160 160"/><path d="M200 128 L240 160"/></g>
      <g class="hot" data-p="trachea"><rect x="190" y="20" width="20" height="112" rx="6" fill="#d7b98a"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="190" x2="210" y1="${30 + i * 14}" y2="${30 + i * 14}" stroke="#b08850" stroke-width="3"/>`).join("")}</g>
      <path class="hot" data-p="diaphragm" d="M60 320 Q200 250 340 320" fill="none" stroke="#c0392b" stroke-width="12" stroke-linecap="round"/>
      <g class="hot" data-p="alveoli" transform="translate(110 262)">${[[0, 0], [10, -6], [12, 6], [2, 10], [-8, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#ffd3dc" stroke="#c2185b" stroke-width="1.5"/>`).join("")}</g>
      <g class="hot" data-p="intercostal">${[0, 1, 2, 3, 4].map(i => `<path d="M${336 + i * 3} ${140 + i * 32} l8 16" stroke="#d9534f" stroke-width="5" stroke-linecap="round"/>`).join("")}</g>
    </svg>
    <div class="row" id="lbls" style="gap:6px"></div>
    <div class="w-controls"><button class="btn small warn" id="game">🎯 Find-it game</button><span class="chip" id="gs" style="display:none"></span></div>
    <div class="w-info">Tap a part, or a label.</div>`;
    const D = { trachea: "<b>Trachea (windpipe)</b>: tube carrying air to the lungs. Rings of cartilage keep it open.", bronchi: "<b>Bronchi</b> (one = bronchus): the trachea splits into two — one into each lung.", bronchioles: "<b>Bronchioles</b>: many smaller tubes branching inside the lungs.", alveoli: "<b>Alveoli</b>: tiny air sacs where <b>gas exchange</b> happens. Thin walls, huge surface area, lots of capillaries.", lungs: "<b>Lungs</b>: organs that get oxygen into the blood and remove carbon dioxide.", ribs: "<b>Ribs / ribcage</b>: protect the heart and lungs; move up and out when you inhale.", intercostal: "<b>Intercostal muscles</b>: between the ribs. Contract to lift the ribcage when you breathe in.", diaphragm: "<b>Diaphragm</b>: sheet of muscle under the lungs. Contracts and flattens when you inhale." };
    const lb = el.querySelector("#lbls"); Object.keys(D).forEach(k => { const b = h(`<button class="chip">${k}</button>`); b.onclick = () => pick(k); lb.appendChild(b); });
    let game = null;
    function pick(k) { el.querySelectorAll(".hot").forEach(x => x.classList.toggle("lit", x.dataset.p === k)); lb.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.textContent === k)); info(el, D[k]); sfx.click(); }
    el.querySelectorAll(".hot").forEach(x => x.onclick = () => {
      if (game) { if (x.dataset.p === game.ask) { game.score++; sfx.good(); } else sfx.bad(); game.n++; return nextAsk(); }
      pick(x.dataset.p);
    });
    function nextAsk() { const gs = el.querySelector("#gs"); if (game.n >= 6) { info(el, `🎯 Game over: <b>${game.score}/6</b>! ${game.score >= 5 ? "Excellent!" : "Tap parts to revise, then try again."}`); gs.style.display = "none"; game = null; return; } game.ask = shuffle(Object.keys(D))[0]; gs.style.display = ""; gs.textContent = `Score ${game.score}/${game.n}`; info(el, `👉 Tap the <b>${game.ask}</b>`); }
    el.querySelector("#game").onclick = () => { game = { score: 0, n: 0 }; el.querySelectorAll(".hot").forEach(x => x.classList.remove("lit")); nextAsk(); };
  });

  /* ---------------- cilia ---------------- */
  reg("cilia", "Cilia sweeping mucus", (el) => {
    let cells = "", cil = "";
    for (let i = 0; i < 7; i++) { cells += `<rect x="${10 + i * 56}" y="150" width="52" height="90" rx="10" fill="#f7c6d0" stroke="#e48aa0" stroke-width="2"/><ellipse cx="${36 + i * 56}" cy="200" rx="11" ry="14" fill="#b46ac0"/>`; for (let j = 0; j < 7; j++) cil += `<line class="cil" x1="${16 + i * 56 + j * 7}" y1="150" x2="${16 + i * 56 + j * 7}" y2="122" stroke="#c76b86" stroke-width="2.4" stroke-linecap="round" style="animation-delay:${-(i * 7 + j) * 0.05}s"/>`; }
    el.innerHTML = `<svg viewBox="0 0 410 260"><rect width="410" height="260" fill="#fff6f8"/>
      <text x="300" y="24" font-size="12" font-weight="800" fill="var(--muted)">→ to the throat</text>
      <g id="mucus"><path id="mpath" d="M0 112 Q100 96 200 112 T410 112 L410 128 Q300 140 200 128 T0 128Z" fill="#cfe38a" opacity=".85"/></g>
      <g id="dust"></g><g id="tar" opacity="0">${Array.from({ length: 14 }, (_, i) => `<circle cx="${20 + i * 28}" cy="${140 + (i % 3) * 3}" r="${4 + (i % 3)}" fill="#3b2a1a"/>`).join("")}</g>
      <g id="cg">${cil}</g>${cells}
      <text x="12" y="254" font-size="11" font-weight="800" fill="var(--muted)">ciliated epithelial cells lining the trachea</text>
      <text id="cough" x="205" y="60" text-anchor="middle" font-size="30" font-weight="900" fill="#c0392b" opacity="0">COUGH! COUGH!</text></svg>
      <div class="w-controls"><label class="toggle"><input type="checkbox" id="smk"> 🚬 Smoker</label></div>
      <div class="w-info">Dust and microbes 🟤 get trapped in sticky <b>mucus</b>. The <b>cilia</b> beat in a wave, sweeping it up to the throat to be swallowed.</div>`;
    const svg = el.querySelector("svg"), dustG = svg.querySelector("#dust"); const NS = "http://www.w3.org/2000/svg";
    const dust = Array.from({ length: 14 }, (_, i) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("r", 4); c.setAttribute("fill", i % 3 ? "#8a6a4a" : "#2ea043"); dustG.appendChild(c); return { c, x: Math.random() * 410, y: 110 + Math.random() * 14 }; });
    let smoker = false, k = 0;
    el.querySelector("#smk").onchange = e => {
      smoker = e.target.checked; svg.classList.toggle("paused", smoker);
      svg.querySelector("#cg").style.opacity = smoker ? .35 : 1; svg.querySelector("#tar").setAttribute("opacity", smoker ? 1 : 0);
      svg.querySelector("#mpath").setAttribute("d", smoker ? "M0 92 Q100 80 200 92 T410 92 L410 132 Q300 144 200 132 T0 132Z" : "M0 112 Q100 96 200 112 T410 112 L410 128 Q300 140 200 128 T0 128Z");
      info(el, smoker ? "😷 Chemicals in smoke <b>paralyse the cilia</b>. Mucus isn't swept away — it builds up with trapped bacteria → <b>smoker's cough</b> and <b>chest infections</b>. Tar coats the cells." : "Healthy again: cilia sweep mucus up to the throat. ✅");
    };
    return raf(() => {
      k++;
      dust.forEach(d => { if (!smoker) { d.x += 1.1; if (d.x > 420) d.x = -10; } d.c.setAttribute("cx", d.x); d.c.setAttribute("cy", d.y + Math.sin((d.x + k) / 20) * 2); });
      svg.querySelector("#cough").setAttribute("opacity", smoker && (k % 160) < 40 ? 1 : 0);
    });
  });

  /* ---------------- breathing ---------------- */
  reg("breathing", "Breathing in and out", (el) => {
    el.innerHTML = `<svg viewBox="0 0 400 360">
      <g id="air"></g>
      <rect x="190" y="10" width="20" height="90" rx="6" fill="#d7b98a"/>
      <g id="ribs">${[0, 1, 2, 3, 4].map(i => `<path d="M${80} ${120 + i * 34} Q200 ${92 + i * 34} 320 ${120 + i * 34}" fill="none" stroke="#e9dcc4" stroke-width="9" stroke-linecap="round"/>`).join("")}</g>
      <g id="lungs" style="transform-origin:200px 200px"><path d="M186 104 C120 100 92 170 96 250 C98 288 130 298 184 284Z" fill="#f59fb0"/><path d="M214 104 C280 100 308 170 304 250 C302 288 270 298 216 284Z" fill="#f59fb0"/></g>
      <path id="dia" d="M70 300 Q200 230 330 300" fill="none" stroke="#c0392b" stroke-width="12" stroke-linecap="round"/>
      <text x="350" y="300" font-size="12" font-weight="800" fill="#c0392b">diaphragm</text>
      <text x="14" y="150" font-size="12" font-weight="800" fill="var(--muted)">ribcage</text>
      <g transform="translate(345 40)"><rect x="0" y="0" width="22" height="200" rx="11" fill="var(--bg2)" stroke="var(--line)"/><rect id="vol" x="3" y="197" width="16" height="0" rx="8" fill="#00b3c7"/><text x="11" y="218" text-anchor="middle" font-size="11" font-weight="800" fill="var(--muted)">vol</text></g>
      <text id="phase" x="200" y="350" text-anchor="middle" font-size="20" font-weight="800" fill="var(--ink)" font-family="Times New Roman">Ready</text>
    </svg>
    <div class="w-controls"><button class="btn small" id="in">⬇ Inhale</button><button class="btn small ghost" id="out">⬆ Exhale</button><button class="btn small warn" id="auto">▶ Auto-breathe</button></div>
    <div class="w-info" id="steps">Press <b>Inhale</b> or <b>Exhale</b>.</div>`;
    const svg = el.querySelector("svg"); let v = 0, target = 0, auto = false, last = 0, airT = 0;
    const lungs = svg.querySelector("#lungs"), ribs = svg.querySelector("#ribs"), dia = svg.querySelector("#dia"), vol = svg.querySelector("#vol"), ph = svg.querySelector("#phase"), airG = svg.querySelector("#air");
    const IN = "<b>Inhaling:</b> ① intercostal muscles <b>contract</b> → ribs move <b>up and out</b> ② diaphragm <b>contracts and flattens</b> ③ chest volume <b>increases</b> ④ air rushes <b>in</b>.";
    const OUT = "<b>Exhaling:</b> ① intercostal muscles <b>relax</b> → ribs move <b>down and in</b> ② diaphragm <b>relaxes</b> and domes up ③ chest volume <b>decreases</b> ④ air is pushed <b>out</b>.";
    el.querySelector("#in").onclick = () => { auto = false; target = 1; info(el, IN); };
    el.querySelector("#out").onclick = () => { auto = false; target = 0; info(el, OUT); };
    el.querySelector("#auto").onclick = () => { auto = !auto; info(el, auto ? "Auto-breathing at about 15 breaths per minute (resting)." : "Paused."); };
    return raf((t) => {
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      if (auto) { const ph2 = (t / 4000) % 1; const nt = ph2 < .5 ? 1 : 0; if (nt !== target) { target = nt; info(el, nt ? IN : OUT); } }
      v += (target - v) * Math.min(1, dt / 350);
      lungs.setAttribute("transform", `translate(200 200) scale(${1 + v * .13} ${1 + v * .1}) translate(-200 -200)`);
      ribs.setAttribute("transform", `translate(200 0) scale(${1 + v * .07} 1) translate(-200 ${-v * 10})`);
      dia.setAttribute("d", `M70 ${300 + v * 10} Q200 ${230 + v * 70} 330 ${300 + v * 10}`);
      vol.setAttribute("height", 30 + v * 160); vol.setAttribute("y", 197 - 30 - v * 160);
      ph.textContent = Math.abs(target - v) < .05 ? (target ? "Breathed in" : "Breathed out") : (target ? "Inhaling…" : "Exhaling…");
      airT += dt; if (Math.abs(target - v) > .08 && airT > 120) { airT = 0; const a = document.createElementNS("http://www.w3.org/2000/svg", "text"); a.textContent = target ? "↓" : "↑"; a.setAttribute("x", 194 + Math.random() * 12); a.setAttribute("y", target ? 0 : 90); a.setAttribute("font-size", 18); a.setAttribute("fill", "#00b3c7"); a.setAttribute("font-weight", 900); a._dir = target ? 1 : -1; a._y = target ? 0 : 90; airG.appendChild(a); }
      [...airG.children].forEach(a => { a._y += a._dir * dt * .12; a.setAttribute("y", a._y); if (a._y > 100 || a._y < -10) a.remove(); });
    });
  });

  /* ---------------- bell jar ---------------- */
  reg("bellJar", "Bell jar model", (el) => {
    el.innerHTML = `<svg viewBox="0 0 360 320">
      <path d="M90 60 Q90 30 130 30 L230 30 Q270 30 270 60 L280 250 L80 250Z" fill="color-mix(in srgb, #9ad 18%, transparent)" stroke="#7fa7c9" stroke-width="4"/>
      <rect x="172" y="4" width="16" height="70" fill="#cfd8e3" stroke="#8aa" />
      <path d="M180 74 L140 110 M180 74 L220 110" stroke="#8aa" stroke-width="8" fill="none"/>
      <g id="bl"><ellipse id="b1" cx="134" cy="150" rx="30" ry="40" fill="#f06f8a"/><ellipse id="b2" cx="226" cy="150" rx="30" ry="40" fill="#f06f8a"/></g>
      <path id="mem" d="M80 250 Q180 250 280 250" fill="none" stroke="#333" stroke-width="5"/>
      <line id="str" x1="180" y1="250" x2="180" y2="280" stroke="#333" stroke-width="3"/><circle id="knob" cx="180" cy="285" r="9" fill="#555"/>
      <text x="10" y="150" font-size="12" font-weight="800" fill="var(--muted)">balloons = lungs</text>
      <text x="196" y="20" font-size="12" font-weight="800" fill="var(--muted)">tube = trachea</text>
      <text x="10" y="270" font-size="12" font-weight="800" fill="var(--muted)">membrane = diaphragm</text>
      <text x="284" y="120" font-size="12" font-weight="800" fill="var(--muted)" transform="rotate(84 284 120)">jar = ribcage</text>
      <text id="arr" x="180" y="50" text-anchor="middle" font-size="22" fill="#00b3c7" font-weight="900"></text>
    </svg>
    <div class="slider-row">Pull the membrane ⬇ <input type="range" id="pull" min="0" max="1" step="0.01" value="0"></div>
    <div class="w-info">Drag the slider to pull the rubber membrane down.</div>`;
    const s = el.querySelector("#pull");
    s.oninput = () => {
      const v = +s.value; el.querySelector("#mem").setAttribute("d", `M80 250 Q180 ${250 + v * 70} 280 250`);
      el.querySelector("#str").setAttribute("y1", 250 + v * 35); el.querySelector("#str").setAttribute("y2", 280 + v * 35); el.querySelector("#knob").setAttribute("cy", 285 + v * 35);
      ["#b1", "#b2"].forEach(id => { const b = el.querySelector(id); b.setAttribute("rx", 30 + v * 22); b.setAttribute("ry", 40 + v * 30); b.setAttribute("cy", 150 + v * 18); });
      el.querySelector("#arr").textContent = v > .1 ? "↓ air in" : "";
      info(el, v > .5 ? "Membrane pulled down → <b>volume inside increases</b> → air rushes <b>in</b> → balloons inflate. Just like the diaphragm when you <b>inhale</b>!" : v > .05 ? "Keep pulling…" : "Release → volume decreases → air pushed out (exhale).");
    };
  });

  /* ---------------- breath rate counter + Rafi data ---------------- */
  reg("breathRate", "Count your breathing rate", (el) => {
    el.innerHTML = `<div style="text-align:center"><div style="font-family:'Times New Roman',serif;font-size:44px" id="tm">30.0 s</div><div class="row" style="justify-content:center"><button class="btn small" id="st">Start 30 s</button><button class="btn small good" id="tap" disabled>🫁 Tap each breath</button></div><div style="margin-top:6px;font-weight:800" id="ct">Breaths: 0</div></div>
    <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0">
    <div class="row"><b>Rafi's results</b><span class="spacer"></span><button class="chip on" data-m="b">Breathing</button><button class="chip" data-m="p">Pulse</button></div>
    <svg viewBox="0 0 400 210" id="ch"></svg>
    <div class="w-info">Breathe normally. Press start and tap every time you breathe in. We'll work out breaths per minute.</div>`;
    let n = 0, iv = null;
    el.querySelector("#st").onclick = () => { n = 0; el.querySelector("#ct").textContent = "Breaths: 0"; el.querySelector("#tap").disabled = false; const end = performance.now() + 30000; clearInterval(iv); iv = setInterval(() => { const left = Math.max(0, (end - performance.now()) / 1000); el.querySelector("#tm").textContent = left.toFixed(1) + " s"; if (left <= 0) { clearInterval(iv); el.querySelector("#tap").disabled = true; info(el, `You breathed <b>${n}</b> times in 30 s → breathing rate = ${n} × 2 = <b>${n * 2} breaths per minute</b>. (Resting is usually 12–20.)`); sfx.win(); } }, 100); };
    el.querySelector("#tap").onclick = () => { n++; el.querySelector("#ct").textContent = "Breaths: " + n; sfx.click(); };
    const data = [["resting", 14, 70], ["walking", 20, 95], ["jogging", 32, 130], ["sprinting", 45, 170]];
    function draw(m) {
      const k = m === "b" ? 1 : 2, max = m === "b" ? 50 : 180, col = m === "b" ? "#00b3c7" : "#e5484d";
      el.querySelector("#ch").innerHTML = `<line x1="40" y1="180" x2="390" y2="180" stroke="var(--line)" stroke-width="2"/>` + data.map((d, i) => { const hgt = d[k] / max * 150; return `<g><rect x="${60 + i * 85}" y="180" width="55" height="0" rx="6" fill="${col}"><animate attributeName="height" to="${hgt}" dur=".7s" begin="${i * .12}s" fill="freeze"/><animate attributeName="y" to="${180 - hgt}" dur=".7s" begin="${i * .12}s" fill="freeze"/></rect><text x="${87 + i * 85}" y="${172 - hgt}" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${d[k]}</text><text x="${87 + i * 85}" y="198" text-anchor="middle" font-size="12" fill="var(--muted)" font-weight="700">${d[0]}</text></g>`; }).join("");
      info(el, m === "b" ? "Pattern (with numbers!): breathing rate rises from <b>14</b> breaths/min resting to <b>45</b> sprinting." : "Pulse rises from <b>70</b> beats/min resting to <b>170</b> sprinting — harder exercise → more respiration → more oxygen needed.");
    }
    el.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { el.querySelectorAll("[data-m]").forEach(x => x.classList.remove("on")); b.classList.add("on"); draw(b.dataset.m); });
    draw("b"); info(el, "Breathe normally. Press start and tap every time you breathe in. We'll work out breaths per minute.");
    return () => clearInterval(iv);
  });

  /* ---------------- skeleton ---------------- */
  reg("skeleton", "Tap the skeleton", (el) => {
    const B = "#efe6d2", S = "#cbbd9c";
    el.innerHTML = `<svg viewBox="0 0 300 470">
      <g stroke="${S}" stroke-width="2" fill="${B}">
      <g class="hot" data-b="skull"><ellipse cx="150" cy="44" rx="32" ry="36"/><rect x="132" y="70" width="36" height="16" rx="6"/><circle cx="138" cy="44" r="7" fill="#6b5a3e"/><circle cx="162" cy="44" r="7" fill="#6b5a3e"/></g>
      <g class="hot" data-b="spine">${Array.from({ length: 12 }, (_, i) => `<rect x="143" y="${90 + i * 15}" width="14" height="11" rx="3"/>`).join("")}</g>
      <g class="hot" data-b="ribs" fill="none" stroke-width="5">${[0, 1, 2, 3, 4].map(i => `<path d="M145 ${110 + i * 16} Q100 ${112 + i * 16} 104 ${132 + i * 16}"/><path d="M155 ${110 + i * 16} Q200 ${112 + i * 16} 196 ${132 + i * 16}"/>`).join("")}</g>
      <g class="hot" data-b="shoulder"><circle cx="96" cy="104" r="10"/><circle cx="204" cy="104" r="10"/><path d="M106 100 L144 96 M194 100 L156 96" stroke-width="6"/></g>
      <g class="hot" data-b="humerus"><rect x="86" y="112" width="12" height="80" rx="6" transform="rotate(8 92 112)"/><rect x="202" y="112" width="12" height="80" rx="6" transform="rotate(-8 208 112)"/></g>
      <g class="hot" data-b="elbow"><circle cx="82" cy="194" r="8"/><circle cx="218" cy="194" r="8"/></g>
      <g class="hot" data-b="forearm"><rect x="72" y="200" width="7" height="70" rx="3"/><rect x="82" y="200" width="7" height="70" rx="3"/><rect x="211" y="200" width="7" height="70" rx="3"/><rect x="221" y="200" width="7" height="70" rx="3"/><circle cx="80" cy="282" r="10"/><circle cx="220" cy="282" r="10"/></g>
      <g class="hot" data-b="pelvis"><path d="M110 268 Q150 250 190 268 L182 300 Q150 312 118 300Z"/></g>
      <g class="hot" data-b="hip"><circle cx="124" cy="304" r="9"/><circle cx="176" cy="304" r="9"/></g>
      <g class="hot" data-b="femur"><rect x="116" y="310" width="14" height="72" rx="7"/><rect x="170" y="310" width="14" height="72" rx="7"/></g>
      <g class="hot" data-b="knee"><circle cx="123" cy="388" r="10"/><circle cx="177" cy="388" r="10"/></g>
      <g class="hot" data-b="shin"><rect x="116" y="396" width="12" height="58" rx="5"/><rect x="172" y="396" width="12" height="58" rx="5"/></g>
      <g class="hot" data-b="ankle"><ellipse cx="116" cy="460" rx="18" ry="7"/><ellipse cx="184" cy="460" rx="18" ry="7"/></g>
      </g></svg>
    <div class="w-info">Tap any bone or joint.</div>`;
    const D = {
      skull: "<b>Skull</b> — <i>protection</i>: protects the brain. Its bones meet at <b>fixed joints</b> (no movement).", spine: "<b>Backbone (vertebrae)</b> — <i>support</i>: holds your upper body up, and protects the spinal cord.", ribs: "<b>Ribs</b> — <i>protection</i>: protect the heart and lungs. They also move when you breathe.",
      shoulder: "<b>Shoulder joint</b> — a <b>ball and socket</b> joint: moves in many directions.", humerus: "<b>Humerus</b> (upper arm bone) — <i>movement</i>: biceps and triceps are attached to it.", elbow: "<b>Elbow</b> — a <b>hinge joint</b> between the humerus and the radius/ulna: moves in two opposite directions.",
      forearm: "<b>Radius and ulna</b> — the two lower arm bones. Pulled by the biceps to bend the arm.", pelvis: "<b>Pelvis</b> — <i>support and protection</i>: holds up the upper body and protects organs in the lower abdomen.", hip: "<b>Hip joint</b> — a <b>ball and socket</b> joint: the top of the thigh bone (ball) fits into a socket in the pelvis.",
      femur: "<b>Thigh bone (femur)</b> — <i>support</i>: the longest, strongest bone. Supports you when standing and walking.", knee: "<b>Knee</b> — a <b>hinge joint</b> with three bones: thigh bone, shin bone and the kneecap.", shin: "<b>Shin bone</b> — <i>support and movement</i>.", ankle: "<b>Ankle joint and foot bones</b> — let you walk, run and balance."
    };
    el.querySelectorAll(".hot").forEach(g => g.onclick = () => { el.querySelectorAll(".hot").forEach(x => x.classList.remove("lit")); g.classList.add("lit"); info(el, D[g.dataset.b]); sfx.click(); });
  });

  /* ---------------- joints ---------------- */
  reg("joints", "Try each joint", (el) => {
    el.innerHTML = `<div class="row" style="margin-bottom:8px"><button class="chip on" data-j="ball">Ball & socket</button><button class="chip" data-j="hinge">Hinge</button><button class="chip" data-j="fixed">Fixed</button></div>
    <svg viewBox="0 0 360 260" id="js" style="touch-action:none;cursor:grab"></svg>
    <div class="w-info"></div>`;
    const svg = el.querySelector("#js"); let mode = "ball", ang = 90, drag = false;
    function draw() {
      if (mode === "ball") {
        svg.innerHTML = `<rect width="360" height="260" fill="var(--card)"/><path d="M110 60 L250 60 L250 100 Q180 60 110 100Z" fill="#e9dcc4" stroke="#c9b48a" stroke-width="3"/><path d="M140 100 A40 40 0 0 1 220 100" fill="none" stroke="#c9b48a" stroke-width="10"/>
        <g transform="rotate(${ang - 90} 180 110)"><rect x="170" y="110" width="20" height="130" rx="10" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/><circle cx="180" cy="110" r="30" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/></g>
        <text x="180" y="30" text-anchor="middle" font-weight="800" fill="var(--muted)" font-size="13">socket (hip) — drag the bone ↻</text>`;
        info(el, "<b>Ball and socket</b> (hip, shoulder): the ball can turn in the socket so the bone moves in <b>many directions</b> and can even rotate. Angle: " + Math.round(ang - 90) + "°");
      } else if (mode === "hinge") {
        const a = Math.max(0, Math.min(150, ang)); svg.innerHTML = `<rect width="360" height="260" fill="var(--card)"/><rect x="60" y="110" width="130" height="22" rx="11" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/><circle cx="190" cy="121" r="16" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/>
        <g transform="rotate(${-a} 190 121)"><rect x="190" y="110" width="130" height="22" rx="11" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/></g>
        <text x="180" y="230" text-anchor="middle" font-weight="800" fill="var(--muted)" font-size="13">elbow — drag the lower arm</text>`;
        info(el, "<b>Hinge joint</b> (elbow, knee): like a door hinge — moves in just <b>two opposite directions</b> (bend ↔ straighten). Bend: " + Math.round(a) + "°" + (ang > 150 || ang < 0 ? " — <b>can't go further!</b>" : ""));
      } else {
        svg.innerHTML = `<rect width="360" height="260" fill="var(--card)"/><g id="sk"><ellipse cx="180" cy="130" rx="120" ry="95" fill="#efe6d2" stroke="#c9b48a" stroke-width="3"/><path d="M180 36 l-8 14 l10 12 l-9 14 l10 14 l-8 14 l9 14 l-9 14 l8 14 l-6 12" fill="none" stroke="#8a7550" stroke-width="3"/><path d="M60 130 l14 -6 l12 8 l14 -8 l14 8 l14 -6 l14 8 l14 -4" fill="none" stroke="#8a7550" stroke-width="3"/></g><text x="180" y="250" text-anchor="middle" font-weight="800" fill="var(--muted)" font-size="13">tap to try to move it</text>`;
        info(el, "<b>Fixed joints</b> (between skull bones): the wiggly lines are where bones are joined. They <b>can't move</b> — so they protect the brain.");
      }
    }
    function pt(e) { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 360 / r.width, (e.clientY - r.top) * 260 / r.height]; }
    svg.addEventListener("pointerdown", e => { drag = true; svg.setPointerCapture(e.pointerId); if (mode === "fixed") { svg.querySelector("#sk").animate([{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }], { duration: 300 }); sfx.bad(); info(el, "🚫 No movement — it's a <b>fixed joint</b>."); } });
    svg.addEventListener("pointermove", e => { if (!drag || mode === "fixed") return; const [x, y] = pt(e); if (mode === "ball") ang = Math.atan2(y - 110, x - 180) * 180 / Math.PI; else ang = -Math.atan2(y - 121, x - 190) * 180 / Math.PI; draw(); });
    svg.addEventListener("pointerup", () => drag = false);
    el.querySelectorAll("[data-j]").forEach(b => b.onclick = () => { el.querySelectorAll("[data-j]").forEach(x => x.classList.remove("on")); b.classList.add("on"); mode = b.dataset.j; ang = mode === "ball" ? 90 : 30; draw(); });
    draw();
  });

  /* ---------------- arm: antagonistic muscles ---------------- */
  reg("arm", "Antagonistic muscles", (el) => {
    el.innerHTML = `<svg viewBox="0 0 380 300" id="as"></svg>
    <div class="slider-row">Straight <input type="range" id="bend" min="0" max="140" value="20"> Bent</div>
    <div class="w-controls"><button class="btn small warn" id="curl">🏋️ Do bicep curls</button></div>
    <div class="w-info"></div>`;
    const svg = el.querySelector("#as"); let a = 20, curling = false;
    function muscle(p1, p2, len0, col, label) {
      const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]); const bulge = Math.max(10, 26 * len0 / L);
      const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2; const nx = -(p2[1] - p1[1]) / L, ny = (p2[0] - p1[0]) / L;
      return `<path d="M${p1[0]} ${p1[1]} Q${mx + nx * bulge * 1.6} ${my + ny * bulge * 1.6} ${p2[0]} ${p2[1]} Q${mx - nx * bulge * .2} ${my - ny * bulge * .2} ${p1[0]} ${p1[1]}Z" fill="${col}" stroke="#9b2c3c" stroke-width="2" opacity=".92"/>`;
    }
    function draw() {
      const E = [120, 200], r = a * Math.PI / 180; const dir = [Math.cos(-r), Math.sin(-r)];
      const hand = [E[0] + dir[0] * 160, E[1] + dir[1] * 160]; const att = [E[0] + dir[0] * 34, E[1] + dir[1] * 34]; const back = [E[0] - dir[0] * 14, E[1] - dir[1] * 14 + 8];
      const contracted = a > 60;
      const bic = muscle([132, 72], att, 120, contracted ? "#e5484d" : "#f4a3ae");
      const tri = muscle(back, [104, 72], 130, contracted ? "#f4a3ae" : "#e5484d");
      svg.innerHTML = `<rect width="380" height="300" fill="var(--card)"/>
        <rect x="112" y="40" width="16" height="165" rx="8" fill="#efe6d2" stroke="#c9b48a" stroke-width="2"/>
        <circle cx="120" cy="40" r="16" fill="#efe6d2" stroke="#c9b48a" stroke-width="2"/>
        <g transform="rotate(${-a} 120 200)"><rect x="118" y="194" width="160" height="12" rx="6" fill="#efe6d2" stroke="#c9b48a" stroke-width="2"/><circle cx="290" cy="200" r="14" fill="#f2c9a5"/></g>
        ${tri}${bic}
        <line x1="${att[0]}" y1="${att[1]}" x2="${att[0] - dir[0] * 6}" y2="${att[1] - dir[1] * 6}" stroke="#fff" stroke-width="4"/>
        <text x="${(132 + att[0]) / 2 + 26}" y="${(72 + att[1]) / 2 - 14}" font-weight="800" font-size="13" fill="#c0392b">Biceps: ${contracted ? "CONTRACTED" : "relaxed"}</text>
        <text x="8" y="140" font-weight="800" font-size="13" fill="#c0392b">Triceps: ${contracted ? "relaxed" : "CONTRACTED"}</text>
        <text x="${E[0] + 18}" y="${E[1] + 30}" font-size="12" fill="var(--muted)" font-weight="700">elbow (hinge)</text>`;
      info(el, contracted ? "💪 The <b>biceps contracts</b> (shorter and fatter) and pulls the lower arm <b>up</b>. The triceps relaxes." : "The <b>triceps contracts</b> and pulls the lower arm <b>straight</b>. The biceps relaxes. Muscles can only <b>pull</b> — so they work in an <b>antagonistic pair</b>.");
    }
    const s = el.querySelector("#bend"); s.oninput = () => { a = +s.value; draw(); };
    let stop = null;
    el.querySelector("#curl").onclick = () => { curling = !curling; if (stop) { stop(); stop = null; } if (curling) stop = raf(t => { a = 70 + Math.sin(t / 700) * 65; s.value = a; draw(); }); };
    draw(); return () => stop && stop();
  });

  /* ---------------- injury match ---------------- */
  reg("injuryMatch", "Quick check: injuries", (el) => {
    WU.inlineQ(el, { t: "match", q: "Match each injury.", pairs: [["fracture", "a broken bone"], ["dislocation", "bone out of place at a joint"], ["sprain", "ligament stretched too much"], ["pulled muscle", "muscle or tendon stretched too much"]], ex: "Sprain → ligament. Pulled → muscle/tendon." });
  });
})();
