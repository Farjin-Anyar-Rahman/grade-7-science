/* ===== Interactive widgets — Chapter 6 ===== */
(function () {
  const { h, esc, shuffle, sfx } = Lab;
  const { reg, info, raf, lerp, ease } = WU;

  /* ---------------- fireworks ---------------- */
  reg("fireworks", "Flame colours: launch a firework", (el) => {
    const SALTS = { "Sodium": "#ffd400", "Copper": "#22c3e6", "Strontium": "#ff2d55", "Barium": "#7cff6b", "Potassium": "#c48bff" };
    el.innerHTML = `<canvas width="600" height="320"></canvas><div class="row" style="justify-content:center;margin-top:8px">${Object.entries(SALTS).map(([k, c]) => `<button class="btn small" style="--brand:${c};color:#111" data-s="${k}">${k}</button>`).join("")}</div>
    <div class="w-info">Each metal salt gives a different colour. Launch one! (Burning the powder is a fast <b>exothermic</b> reaction.)</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); let R = [], P = [];
    el.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { R.push({ x: 100 + Math.random() * 400, y: 320, vy: -7.5 - Math.random() * 2, c: SALTS[b.dataset.s] }); sfx.click(); info(el, `<b>${b.dataset.s}</b> salts give <span style="color:${SALTS[b.dataset.s]};font-weight:900">this colour</span>. ${b.dataset.s === "Sodium" ? "Sodium → yellow (like street lights!)" : b.dataset.s === "Copper" ? "Copper → blue/green." : ""}`); });
    return raf(() => {
      g.fillStyle = "rgba(10,12,30,.28)"; g.fillRect(0, 0, 600, 320);
      for (let i = R.length - 1; i >= 0; i--) { const r = R[i]; r.y += r.vy; r.vy += .12; g.fillStyle = "#fff"; g.fillRect(r.x - 1, r.y, 2, 6); if (r.vy > -1) { for (let k = 0; k < 70; k++) { const a = Math.random() * 6.28, s = Math.random() * 4; P.push({ x: r.x, y: r.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, c: r.c, l: 60 + Math.random() * 30 }); } sfx.good(); R.splice(i, 1); } }
      for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .985; p.l--; g.globalAlpha = Math.max(0, p.l / 80); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, 2.2, 0, 7); g.fill(); if (p.l <= 0) P.splice(i, 1); }
      g.globalAlpha = 1;
    });
  });

  /* ---------------- equation lab ---------------- */
  reg("eqLab", "Word-equation workshop", (el) => {
    const RX = [
      { r: ["magnesium", "oxygen"], p: ["magnesium oxide"], fx: "🔥 Bright white flame!" },
      { r: ["zinc", "hydrochloric acid"], p: ["zinc chloride", "hydrogen"], fx: "🫧 Fizzing — hydrogen gas." },
      { r: ["iron", "sulfuric acid"], p: ["iron sulfate", "hydrogen"], fx: "🫧 Steady bubbles." },
      { r: ["sodium", "water"], p: ["sodium hydroxide", "hydrogen"], fx: "💥 Fizzes and whizzes around!" },
      { r: ["methane", "oxygen"], p: ["carbon dioxide", "water"], fx: "🔥 Combustion — a gas cooker flame." },
      { r: ["copper", "oxygen"], p: ["copper oxide"], fx: "⬛ The copper turns black when heated." }
    ];
    let k = 0;
    function draw() {
      const x = RX[k]; const pool = shuffle(x.p.concat(shuffle(["hydrogen", "oxygen", "water", "carbon dioxide", "zinc oxide", "magnesium chloride", "iron oxide", "sodium chloride", "copper sulfate"].filter(w => !x.p.includes(w))).slice(0, 4)));
      el.innerHTML = `<div class="muted" style="font-weight:800;font-size:13px">Reaction ${k + 1} of ${RX.length}</div>
      <div class="eq-slots">${x.r.map(r => `<span class="tile">${r}</span>`).join(" + ")} → ${x.p.map((_, i) => `<div class="eq-slot" data-i="${i}"></div>`).join(" + ")}</div>
      <div class="bank" style="justify-content:center">${pool.map(w => `<button class="tile" data-w="${w}">${w}</button>`).join("")}</div>
      <div class="w-controls" style="justify-content:center"><button class="btn small" id="ck">Check ✓</button><button class="btn small ghost" id="nx">Next reaction ›</button></div>
      <div class="w-info">Pick the product${x.p.length > 1 ? "s" : ""}. Tap a box to clear it.</div>`;
      const slots = [...el.querySelectorAll(".eq-slot")];
      el.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { const s = slots.find(s => !s.textContent); if (s) { s.textContent = b.dataset.w; s.classList.add("filled"); sfx.click(); } });
      slots.forEach(s => s.onclick = () => { s.textContent = ""; s.className = "eq-slot"; });
      el.querySelector("#ck").onclick = () => { const v = slots.map(s => s.textContent).sort().join(), ok = v === x.p.slice().sort().join(); slots.forEach(s => s.classList.add(x.p.includes(s.textContent) ? "right" : "wrong")); if (ok) { info(el, "✅ " + x.r.join(" + ") + " → <b>" + x.p.join(" + ") + "</b><br>" + x.fx); sfx.good(); Lab.addXP(5); } else { info(el, "Not quite. Remember: metal + oxygen → metal <b>oxide</b>; metal + acid → <b>salt</b> + hydrogen; metal + water → metal <b>hydroxide</b> + hydrogen."); sfx.bad(); } };
      el.querySelector("#nx").onclick = () => { k = (k + 1) % RX.length; draw(); };
    }
    draw();
  });

  /* ---------------- purity ---------------- */
  reg("purity", "Purity slider", (el) => {
    el.innerHTML = `<canvas width="600" height="260"></canvas>
    <div class="slider-row">Impure <input type="range" id="pu" min="50" max="100" value="80"> Pure <b id="pv">80%</b></div>
    <div class="w-info"></div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); let pur = 80;
    const P = Array.from({ length: 120 }, () => ({ x: Math.random() * 600, y: Math.random() * 260, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2, r: Math.random() }));
    const upd = () => { pur = +el.querySelector("#pu").value; el.querySelector("#pv").textContent = pur + "%"; info(el, `In a 100 g sample, <b>${pur} g</b> is the substance we want and <b>${100 - pur} g</b> is impurities. ${pur === 100 ? "✅ <b>Pure</b> — melts and boils at an exact temperature." : `Impure — its boiling point would be ${(100 + (100 - pur) * 0.15).toFixed(1)} °C instead of exactly 100 °C (for water).`}`); };
    el.querySelector("#pu").oninput = upd; upd();
    return raf(() => {
      g.fillStyle = Lab.css("--card"); g.fillRect(0, 0, 600, 260);
      P.forEach(p => { p.x = (p.x + p.vx + 600) % 600; p.y = (p.y + p.vy + 260) % 260; const imp = p.r * 100 > pur; g.fillStyle = imp ? "#f97316" : "#3b82f6"; g.beginPath(); if (imp) { g.rect(p.x - 5, p.y - 5, 10, 10); } else g.arc(p.x, p.y, 6, 0, 7); g.fill(); });
      g.fillStyle = "#3b82f6"; g.font = "bold 13px 'Times New Roman'"; g.fillText("● wanted substance", 10, 18); g.fillStyle = "#f97316"; g.fillText("■ impurity", 160, 18);
    });
  });

  /* ---------------- thermo lab ---------------- */
  reg("thermoLab", "Reaction thermometer", (el) => {
    const RX = { "Magnesium + acid": 14, "Hand warmer (iron + oxygen)": 22, "Acid + alkali (neutralisation)": 8, "Citric acid + sodium hydrogencarbonate": -6, "Ammonium nitrate dissolving": -9, "Instant cold pack": -12 };
    el.innerHTML = `<div class="row"><select id="rx" class="txt-in" style="max-width:300px;padding:7px">${Object.keys(RX).map(r => `<option>${r}</option>`).join("")}</select><button class="btn small" id="mix">🧪 Mix</button></div>
    <svg viewBox="0 0 320 240"><rect x="60" y="90" width="110" height="130" rx="8" fill="#e8f4ff" stroke="#7aa6c9" stroke-width="3"/><rect id="liq" x="63" y="140" width="104" height="77" fill="#9fd7ff"/><g id="fx"></g>
      <rect x="215" y="20" width="22" height="190" rx="11" fill="#fff" stroke="#888" stroke-width="2"/><rect id="mc" x="221" y="120" width="10" height="80" rx="5" fill="#e5484d"/><circle cx="226" cy="210" r="14" fill="#e5484d"/>
      ${[0, 10, 20, 30, 40, 50].map(v => `<text x="245" y="${200 - v * 3.4 + 4}" font-size="10" fill="var(--muted)">${v}°</text><line x1="237" x2="242" y1="${200 - v * 3.4}" y2="${200 - v * 3.4}" stroke="#888"/>`).join("")}
      <text id="tv" x="115" y="70" text-anchor="middle" font-family="Times New Roman" font-size="24" font-weight="700" fill="var(--ink)">20.0 °C</text></svg>
    <div class="w-info">Choose a reaction and mix. Watch the thermometer.</div>`;
    const $ = s => el.querySelector(s); let stop = null;
    const setT = T => { $("#tv").textContent = T.toFixed(1) + " °C"; const hh = Math.max(4, T * 3.4); $("#mc").setAttribute("y", 200 - hh); $("#mc").setAttribute("height", hh); };
    setT(20);
    $("#mix").onclick = () => {
      if (stop) stop(); const d = RX[$("#rx").value], t0 = performance.now(); setT(20);
      $("#liq").setAttribute("fill", d > 0 ? "#ffb3a7" : "#bfe6ff");
      $("#fx").innerHTML = d > 0 ? `<text x="115" y="88" text-anchor="middle" font-size="22" class="wiggle">♨️</text>` : `<text x="115" y="88" text-anchor="middle" font-size="22" class="wiggle">❄️</text>`;
      stop = raf(t => { const k = Math.min(1, (t - t0) / 3000); setT(20 + d * ease(k)); if (k >= 1) { stop(); stop = null; info(el, `Change = ${(20 + d).toFixed(1)} − 20.0 = <b>${d > 0 ? "+" : ""}${d.toFixed(1)} °C</b> → ${d > 0 ? "🔥 <b>EXOTHERMIC</b>: energy released to the surroundings, so they get hotter." : "🧊 <b>ENDOTHERMIC</b>: energy taken in from the surroundings, so they get colder."}`); d > 0 ? sfx.good() : sfx.click(); } });
    };
    return () => stop && stop();
  });

  /* ---------------- reactivity race ---------------- */
  reg("reactivity", "Metal + acid reactivity race", (el) => {
    const M = [["Magnesium", 9, "Mg"], ["Zinc", 5, "Zn"], ["Iron", 3, "Fe"], ["Copper", 0, "Cu"], ["Calcium", 12, "Ca"], ["Gold", 0, "Au"]];
    el.innerHTML = `<canvas width="600" height="270"></canvas>
    <div class="w-controls"><button class="btn small" id="go">▶ Drop metals into acid</button></div>
    <div class="w-info">Each tube has the <b>same volume of the same acid</b> and the <b>same mass of metal</b> — a fair test. More bubbles = more reactive.</div>
    <div class="zone"></div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); let started = false, t0 = 0; const B = [];
    el.querySelector("#go").onclick = () => { started = true; t0 = performance.now(); B.length = 0; sfx.click(); setTimeout(() => info(el, "Ranking: <b>calcium › magnesium › zinc › iron</b>. Copper and gold: <b>no bubbles</b> — they don't react with dilute acid. Now put them in order 👇"), 3000); };
    WU.inlineQ(el.querySelector(".zone"), { t: "order", q: "Order them from MOST to LEAST reactive.", items: ["Calcium", "Magnesium", "Zinc", "Iron", "Copper"], ex: "Copper doesn't react with dilute acid." });
    return raf((t) => {
      g.fillStyle = Lab.css("--card"); g.fillRect(0, 0, 600, 270);
      M.forEach(([n, r, s], i) => {
        const x = 30 + i * 95; g.fillStyle = "#e6f4ff"; g.strokeStyle = "#7aa6c9"; g.lineWidth = 3; g.beginPath(); g.moveTo(x, 40); g.lineTo(x, 200); g.arc(x + 30, 200, 30, Math.PI, 0, true); g.lineTo(x + 60, 40); g.fill(); g.stroke();
        g.fillStyle = "#cde9c0"; g.fillRect(x + 3, 90, 54, 110); g.beginPath(); g.arc(x + 30, 200, 27, 0, Math.PI); g.fill();
        if (started) {
          const k = Math.min(1, (t - t0) / 800); const my = lerp(30, 205, k);
          g.fillStyle = ["#c0c0c0", "#9fb0bb", "#6b6b6b", "#c26b38", "#e8e2d0", "#e6b800"][i]; g.fillRect(x + 18, my - 8, 24, 14);
          if (k >= 1 && Math.random() < r / 14) B.push({ x: x + 22 + Math.random() * 16, y: 200, i });
          if (k >= 1 && r > 10) { g.fillStyle = "rgba(255,160,0,.2)"; g.fillRect(x + 3, 90, 54, 110); }
        }
        g.fillStyle = Lab.css("--ink"); g.font = "bold 13px 'Times New Roman'"; g.textAlign = "center"; g.fillText(n, x + 30, 252); g.textAlign = "left";
      });
      for (let i = B.length - 1; i >= 0; i--) { const b = B[i]; b.y -= 1.6 + Math.random(); b.x += (Math.random() - .5); g.strokeStyle = "#fff"; g.fillStyle = "rgba(255,255,255,.6)"; g.beginPath(); g.arc(b.x, b.y, 3, 0, 7); g.fill(); g.stroke(); if (b.y < 92) B.splice(i, 1); }
    });
  });
})();
