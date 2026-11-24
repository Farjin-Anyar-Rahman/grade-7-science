/* ===== Interactive widgets — Chapter 4 ===== */
(function () {
  const { h, esc, shuffle, sfx, css } = Lab;
  const { reg, info, raf, lerp, ease } = WU;

  /* ---------------- atom model timeline ---------------- */
  reg("atomTimeline", "Models of the atom through time", (el) => {
    const M = [
      { y: "~1800", n: "Dalton", d: "Atoms are tiny, solid spheres that can't be broken into smaller parts.", svg: `<circle cx="150" cy="110" r="70" fill="url(#gD)"/>` },
      { y: "1904", n: "Thomson — plum pudding", d: "Atoms contain tiny <b>negative electrons</b> spread through a sphere of <b>positive charge</b> — like plums in a pudding.", svg: `<circle cx="150" cy="110" r="75" fill="#ffcf8a" stroke="#e59b3a" stroke-width="3"/>${[[120, 80], [175, 75], [140, 125], [190, 130], [110, 150], [160, 160], [150, 95]].map(([x, y]) => `<g class="wiggle"><circle cx="${x}" cy="${y}" r="9" fill="#3b82f6"/><text x="${x}" y="${y + 4}" text-anchor="middle" fill="#fff" font-size="12" font-weight="900">−</text></g>`).join("")}<text x="150" y="208" text-anchor="middle" font-size="12" fill="var(--muted)" font-weight="700">sphere of positive charge (+)</text>` },
      { y: "1909", n: "Rutherford — nuclear model", d: "A tiny, dense, <b>positive nucleus</b> in the centre. Electrons are outside it. Most of the atom is <b>empty space</b>.", svg: `<circle cx="150" cy="110" r="80" fill="none" stroke="var(--line)" stroke-dasharray="4 6"/><circle cx="150" cy="110" r="8" fill="#e5484d"/><text x="150" y="114" text-anchor="middle" fill="#fff" font-size="10" font-weight="900">+</text>${[0, 1, 2, 3].map(i => `<g><animateTransform attributeName="transform" type="rotate" from="${i * 90} 150 110" to="${i * 90 + 360} 150 110" dur="${3 + i}s" repeatCount="indefinite"/><circle cx="${150 + 55 + i * 6}" cy="110" r="6" fill="#3b82f6"/></g>`).join("")}<text x="150" y="208" text-anchor="middle" font-size="12" fill="var(--muted)" font-weight="700">mostly empty space</text>` },
      { y: "1920s–30s", n: "Protons & neutrons", d: "The nucleus is made of <b>protons</b> (positive) and <b>neutrons</b> (no charge). Electrons (negative) are around it.", svg: `${[[150, 110, 40], [150, 110, 62], [150, 110, 84]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--line)" stroke-width="2"/>`).join("")}<g class="beat">${[[-7, -6, "#e5484d"], [7, -6, "#9aa3b5"], [-7, 7, "#9aa3b5"], [7, 7, "#e5484d"], [0, 0, "#e5484d"]].map(([x, y, c]) => `<circle cx="${150 + x}" cy="${110 + y}" r="8" fill="${c}" stroke="#fff"/>`).join("")}</g>${[[40, 0], [62, 2], [84, 4]].map(([r, d], i) => `<g><animateTransform attributeName="transform" type="rotate" from="${i * 70} 150 110" to="${i * 70 + 360} 150 110" dur="${4 + d}s" repeatCount="indefinite"/><circle cx="${150 + r}" cy="110" r="6" fill="#3b82f6"/></g>`).join("")}` }
    ];
    el.innerHTML = `<div class="row" id="tl" style="gap:6px"></div><svg viewBox="0 0 300 220" id="ms"><defs><radialGradient id="gD" cx=".35" cy=".35"><stop offset="0" stop-color="#d6dcff"/><stop offset="1" stop-color="#5865c9"/></radialGradient></defs><g id="mg"></g></svg><div class="w-info"></div>`;
    const tl = el.querySelector("#tl");
    function show(i) { tl.querySelectorAll(".chip").forEach((c, k) => c.classList.toggle("on", k === i)); const g = el.querySelector("#mg"); g.style.opacity = 0; setTimeout(() => { g.innerHTML = M[i].svg; g.style.transition = "opacity .4s"; g.style.opacity = 1; }, 150); info(el, `<b>${M[i].y} · ${M[i].n}</b><br>${M[i].d}`); sfx.click(); }
    M.forEach((m, i) => { const b = h(`<button class="chip">${m.y}</button>`); b.onclick = () => show(i); tl.appendChild(b); });
    show(0);
  });

  /* ---------------- gold foil ---------------- */
  reg("goldFoil", "Rutherford's gold foil experiment", (el) => {
    el.innerHTML = `<canvas width="600" height="320"></canvas>
    <div class="w-controls"><button class="btn small" id="f1">Fire 1</button><button class="btn small warn" id="f50">Fire 50</button><label class="toggle"><input type="checkbox" id="pp"> Pretend plum pudding is true</label><button class="btn small ghost" id="rs">Reset</button></div>
    <div class="bars"><div class="barrow"><span>Straight through</span><span class="tr"><i id="s0" style="background:var(--good)"></i></span><span id="n0">0</span></div><div class="barrow"><span>Deflected</span><span class="tr"><i id="s1" style="background:var(--warn)"></i></span><span id="n1">0</span></div><div class="barrow"><span>Bounced back</span><span class="tr"><i id="s2" style="background:var(--bad)"></i></span><span id="n2">0</span></div></div>
    <div class="w-info">Fire positive alpha particles at gold atoms. Watch where they go.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d");
    const nuclei = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) nuclei.push([330 + c * 60, 40 + r * 60 + (c % 2) * 30]);
    let A = [], cnt = [0, 0, 0], plum = false, trails = [];
    function fire(n) { for (let i = 0; i < n; i++) setTimeout(() => A.push({ x: 20, y: 20 + Math.random() * 280, vx: 6, vy: 0, path: [], done: false, hit: 0 }), i * 60); }
    el.querySelector("#f1").onclick = () => fire(1); el.querySelector("#f50").onclick = () => fire(50);
    el.querySelector("#pp").onchange = e => { plum = e.target.checked; reset(); info(el, plum ? "If the plum pudding model were true, the positive charge is spread out — too weak to deflect anything. <b>All</b> alpha particles go straight through." : "Real atoms: a tiny, concentrated positive nucleus."); };
    function reset() { A = []; cnt = [0, 0, 0]; trails = []; upd(); }
    el.querySelector("#rs").onclick = reset;
    function upd() { const t = cnt[0] + cnt[1] + cnt[2] || 1; cnt.forEach((c, i) => { el.querySelector("#s" + i).style.width = c / t * 100 + "%"; el.querySelector("#n" + i).textContent = c; }); }
    return raf(() => {
      g.fillStyle = "#0f1530"; g.fillRect(0, 0, 600, 320);
      g.fillStyle = "#f5c542"; g.globalAlpha = .18; g.fillRect(300, 0, 200, 320); g.globalAlpha = 1;
      g.fillStyle = "#f5c542"; g.font = "bold 12px 'Times New Roman'"; g.fillText("GOLD FOIL (atoms)", 345, 314);
      g.fillStyle = "#b0b8d8"; g.fillText("α source →", 8, 14);
      nuclei.forEach(([x, y]) => { if (plum) { g.fillStyle = "rgba(255,170,80,.25)"; g.beginPath(); g.arc(x, y, 26, 0, 7); g.fill(); } else { g.fillStyle = "#e5484d"; g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); g.strokeStyle = "rgba(255,255,255,.12)"; g.beginPath(); g.arc(x, y, 26, 0, 7); g.stroke(); } });
      trails.forEach(tr => { g.strokeStyle = tr.c; g.globalAlpha = .35; g.lineWidth = 1.5; g.beginPath(); tr.p.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); g.globalAlpha = 1; });
      for (let i = A.length - 1; i >= 0; i--) {
        const a = A[i];
        for (let s = 0; s < 2; s++) {
          if (!plum) nuclei.forEach(([x, y]) => { const dx = a.x - x, dy = a.y - y, d2 = dx * dx + dy * dy; if (d2 < 1.2 && !a.b) { a.b = 1; a.vx = -6; a.vy = dy * 3; } else if (d2 < 100) { const f = 7 / (d2 + 4); const d = Math.sqrt(d2) || .01; a.vx += dx / d * f; a.vy += dy / d * f; } });
          const sp = Math.hypot(a.vx, a.vy); a.vx *= 6 / sp; a.vy *= 6 / sp; a.x += a.vx / 2; a.y += a.vy / 2;
        }
        a.path.push([a.x, a.y]);
        g.fillStyle = "#7cf0c5"; g.beginPath(); g.arc(a.x, a.y, 4, 0, 7); g.fill();
        if (a.x > 610 || a.x < -10 || a.y < -10 || a.y > 330) {
          const ang = Math.abs(Math.atan2(a.vy, a.vx)) * 180 / Math.PI; const k = ang < 10 ? 0 : ang < 90 ? 1 : 2; cnt[k]++; upd();
          trails.push({ p: a.path, c: ["#7cf0c5", "#ffb02e", "#ff5c6c"][k] }); if (trails.length > 60) trails.shift(); A.splice(i, 1);
          if (k === 2) info(el, "😮 One <b>bounced back</b>! Rutherford said it was like firing a shell at tissue paper and it coming back. The positive charge must be in a tiny, dense <b>nucleus</b>.");
          else if (!plum && cnt[0] > 15 && cnt[2] === 0) info(el, "Most go <b>straight through</b> → the atom is mostly <b>empty space</b>. Keep firing…");
        }
      }
    });
  });

  /* ---------------- atom builder ---------------- */
  reg("atomBuilder", "Build an atom", (el) => {
    const EL = ["—", "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon"];
    let p = 1, n = 0, e = 1;
    el.innerHTML = `<svg viewBox="0 0 300 250" id="ab"></svg>
    <div class="row" style="justify-content:center;gap:12px">${[["p", "Proton", "#e5484d"], ["n", "Neutron", "#9aa3b5"], ["e", "Electron", "#3b82f6"]].map(([k, l, c]) => `<div style="text-align:center"><div style="font-weight:800;color:${c}">${l}</div><button class="btn small ghost" data-k="${k}" data-d="-1">−</button> <span id="c${k}" style="font-weight:900;font-family:'Times New Roman',serif;font-size:20px"></span> <button class="btn small ghost" data-k="${k}" data-d="1">+</button></div>`).join("")}</div>
    <div class="w-info"></div>`;
    function draw() {
      const svg = el.querySelector("#ab"); let s = `<rect width="300" height="250" fill="var(--card)"/>`;
      [50, 85].forEach(r => s += `<circle cx="150" cy="125" r="${r}" fill="none" stroke="var(--line)" stroke-width="2"/>`);
      const nuc = []; for (let i = 0; i < p; i++) nuc.push("#e5484d"); for (let i = 0; i < n; i++) nuc.push("#9aa3b5");
      const sh = shuffleSeed(nuc); sh.forEach((c, i) => { const a = i * 2.4, r = 5 * Math.sqrt(i); s += `<circle cx="${150 + Math.cos(a) * r}" cy="${125 + Math.sin(a) * r}" r="7" fill="${c}" stroke="#fff" stroke-width="1.5"/>`; });
      for (let i = 0; i < e; i++) { const shell = i < 2 ? 50 : 85, cnt = i < 2 ? Math.min(e, 2) : e - 2, idx = i < 2 ? i : i - 2; s += `<g><animateTransform attributeName="transform" type="rotate" from="${idx * 360 / cnt} 150 125" to="${idx * 360 / cnt + 360} 150 125" dur="${shell === 50 ? 4 : 7}s" repeatCount="indefinite"/><circle cx="${150 + shell}" cy="125" r="6" fill="#3b82f6"/></g>`; }
      svg.innerHTML = s;
      ["p", "n", "e"].forEach(k => el.querySelector("#c" + k).textContent = { p, n, e }[k]);
      const ch = p - e; const name = EL[p] || "?";
      info(el, `Element: <b>${name}</b> (set by the number of protons) · Charge: <b>${ch === 0 ? "0 — neutral atom ✅" : (ch > 0 ? "+" + ch : ch) + " — that's an ion, not a neutral atom"}</b>${p === 6 && e === 6 ? "<br>🎉 A neutral carbon atom: 6 protons, 6 electrons." : ""}`);
    }
    function shuffleSeed(a) { const r = a.slice(); let s = 3; for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
    el.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { const k = b.dataset.k, d = +b.dataset.d; if (k === "p") p = Math.max(1, Math.min(10, p + d)); if (k === "n") n = Math.max(0, Math.min(12, n + d)); if (k === "e") e = Math.max(0, Math.min(10, e + d)); sfx.click(); draw(); });
    draw();
  });

  /* ---------------- chromatography ---------------- */
  reg("chromatography", "Run a chromatogram", (el) => {
    const INKS = { "Black ink": [["#1e3a8a", .78], ["#b91c1c", .52], ["#ca8a04", .3]], "Green ink": [["#2563eb", .7], ["#eab308", .4]], "Brown sweet": [["#dc2626", .62], ["#16a34a", .44], ["#7c3aed", .2]], "Pure dye": [["#db2777", .55]], "Permanent marker": [["#111", 0]] };
    el.innerHTML = `<div class="row"><select id="ink" class="txt-in" style="max-width:200px;padding:7px">${Object.keys(INKS).map(k => `<option>${k}</option>`).join("")}</select><label class="toggle"><input type="checkbox" id="pen"> Draw start line in pen</label><label class="toggle"><input type="checkbox" id="deep"> Too much solvent</label></div>
    <svg viewBox="0 0 300 300"><rect x="70" y="190" width="160" height="100" rx="6" fill="#d9f2ff" stroke="#7aa6c9" stroke-width="3"/><rect id="solv" x="73" y="250" width="154" height="37" fill="#9fd7ff" opacity=".8"/>
      <rect x="40" y="8" width="220" height="10" fill="#999"/><rect x="110" y="18" width="80" height="262" fill="#fffef8" stroke="#ccc"/>
      <rect id="wet" x="111" y="262" width="78" height="0" fill="#cde9ff" opacity=".7"/>
      <line id="sl" x1="114" y1="235" x2="186" y2="235" stroke="#777" stroke-width="2"/><g id="spots"></g>
      <text x="236" y="238" font-size="11" fill="var(--muted)" font-weight="700">start line</text></svg>
    <div class="w-controls"><button class="btn small" id="run">▶ Run</button></div>
    <div class="w-info">Choose an ink and press Run.</div>`;
    const $ = s => el.querySelector(s); let stop = null;
    function setup() {
      const deep = $("#deep").checked, pen = $("#pen").checked; $("#solv").setAttribute("y", deep ? 222 : 250); $("#solv").setAttribute("height", deep ? 65 : 37);
      $("#sl").setAttribute("stroke", pen ? "#1d4ed8" : "#777"); $("#wet").setAttribute("y", 262); $("#wet").setAttribute("height", 0);
      $("#spots").innerHTML = `<circle cx="150" cy="235" r="6" fill="${INKS[$("#ink").value][0][0]}"/>`;
    }
    ["#ink", "#pen", "#deep"].forEach(s => $(s).onchange = setup); setup();
    $("#run").onclick = () => {
      if (stop) stop(); setup(); const dyes = INKS[$("#ink").value], deep = $("#deep").checked, pen = $("#pen").checked; const t0 = performance.now();
      stop = raf(t => {
        const k = Math.min(1, (t - t0) / 5000), front = 262 - k * 225;
        $("#wet").setAttribute("y", front); $("#wet").setAttribute("height", 262 - front);
        let s = "";
        if (deep) { s = `<circle cx="150" cy="235" r="${6 - k * 6}" fill="${dyes[0][0]}" opacity="${1 - k}"/>`; $("#solv").setAttribute("fill", `rgb(${159 - k * 60},${215 - k * 90},${255 - k * 80})`); }
        else {
          dyes.forEach(([c, d], i) => { const y = 235 - Math.min(k * 225, 197 * d * Math.min(1, k * 1.25)); s += `<ellipse cx="150" cy="${y}" rx="7" ry="${6 + k * 2}" fill="${c}" opacity=".85"/>`; });
          if (pen) s += `<line x1="114" y1="235" x2="186" y2="${235}" stroke="#1d4ed8" stroke-width="2"/><ellipse cx="135" cy="${235 - k * 120}" rx="5" ry="6" fill="#1d4ed8" opacity=".6"/><ellipse cx="165" cy="${235 - k * 120}" rx="5" ry="6" fill="#1d4ed8" opacity=".6"/>`;
        }
        $("#spots").innerHTML = s;
        if (k >= 1) {
          stop(); stop = null; sfx.good();
          if (deep) info(el, "❌ The solvent was <b>above the start line</b> — the ink dissolved straight into the beaker. Keep the solvent below the line!");
          else if (dyes[0][1] === 0) info(el, "The spot didn't move — permanent marker is <b>insoluble in water</b>. Try a different solvent like ethanol.");
          else info(el, (pen ? "⚠️ The pen line <b>dissolved and ran</b> too — use <b>pencil</b>! " : "") + `Chromatogram done: <b>${dyes.length} spot${dyes.length > 1 ? "s" : ""}</b> → ${dyes.length > 1 ? "a <b>mixture</b> of " + dyes.length + " dyes. Dyes more attracted to the solvent travel further." : "a <b>pure</b> substance."}`);
        }
      });
    };
    return () => stop && stop();
  });

  /* ---------------- crime scene chromatography ---------------- */
  reg("crimeChroma", "Solve the case: whose pen?", (el) => {
    const pens = { "Crime note": [.72, .45, .2], "Suspect A": [.72, .3], "Suspect B": [.72, .45, .2], "Suspect C": [.6, .45, .2] };
    const cols = ["#1e40af", "#be123c", "#a16207"];
    const names = Object.keys(pens);
    el.innerHTML = `<svg viewBox="0 0 320 260"><rect x="20" y="10" width="280" height="230" fill="#fffef8" stroke="#ccc"/><line x1="30" y1="210" x2="290" y2="210" stroke="#777" stroke-dasharray="4 4"/><line x1="30" y1="30" x2="290" y2="30" stroke="#9fd7ff" stroke-width="2"/><text x="292" y="26" font-size="9" fill="var(--muted)" text-anchor="end">solvent front</text>
      ${names.map((n, i) => `<text x="${65 + i * 64}" y="232" text-anchor="middle" font-size="10" font-weight="800" fill="#333">${n}</text>${pens[n].map((d, j) => `<ellipse cx="${65 + i * 64}" cy="210" rx="8" ry="7" fill="${cols[j]}" opacity=".85"><animate attributeName="cy" to="${210 - 180 * d}" dur="2.5s" begin="0.3s" fill="freeze"/></ellipse>`).join("")}`).join("")}</svg>
    <div class="row" style="justify-content:center">${names.slice(1).map(n => `<button class="btn small ghost" data-s="${n}">${n}</button>`).join("")}</div>
    <div class="w-info">A note was left at a crime scene. Compare its chromatogram with the three suspects' pens. Who wrote it?</div>`;
    el.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { if (b.dataset.s === "Suspect B") { info(el, "🕵️ <b>Correct!</b> Suspect B's ink has the same 3 dyes at the <b>same heights</b> as the crime note."); sfx.win(); Lab.addXP(10); } else { info(el, "Not a match — look for spots at exactly the <b>same heights</b> as the crime note."); sfx.bad(); } });
  });
})();
