/* ===== Interactive widgets — Chapter 5 ===== */
(function () {
  const { h, esc, sfx, css } = Lab;
  const { reg, info, raf, lerp, ease } = WU;

  /* solubility data, g per 100 cm³ */
  const KNO3 = [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 86], [60, 110], [70, 138], [80, 169], [90, 202], [100, 246]];
  const NACL = [[0, 35.7], [20, 36], [40, 36.6], [60, 37.3], [80, 38.4], [100, 39.2]];
  const CO2 = [[0, 0.34], [10, 0.23], [20, 0.17], [30, 0.13], [40, 0.10], [50, 0.08], [60, 0.06]];
  const interp = (tab, T) => { for (let i = 0; i < tab.length - 1; i++) { const [a, va] = tab[i], [b, vb] = tab[i + 1]; if (T <= b) return va + (vb - va) * (T - a) / (b - a); } return tab[tab.length - 1][1]; };

  /* ---------------- dissolving particle sim ---------------- */
  reg("dissolveSim", "Particle model: dissolving", (el) => {
    el.innerHTML = `<canvas width="600" height="340"></canvas>
    <div class="slider-row">🌡️ Temperature <input type="range" id="tp" min="0" max="80" value="20"> <b id="tv">20 °C</b></div>
    <div class="w-controls"><button class="btn small" id="add">🥄 Add 5 g of solute</button><label class="toggle"><input type="checkbox" id="stir" checked> Stir</label><button class="btn small ghost" id="rs">Empty</button></div>
    <div class="bars"><div class="barrow"><span>Dissolved</span><span class="tr"><i id="db" style="background:#8b5cf6"></i></span><span id="dn">0 g</span></div></div>
    <div class="w-info">Blue = water (solvent) particles. Add some solute and watch its particles break away and fill the gaps.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); const $ = s => el.querySelector(s);
    const BX = 150, BW = 300, TOP = 60, BOT = 320;
    let temp = 20, stir = true, added = 0;
    const water = Array.from({ length: 110 }, () => ({ x: BX + 10 + Math.random() * (BW - 20), y: TOP + 20 + Math.random() * (BOT - TOP - 30), vx: 0, vy: 0 }));
    let solid = []; // {x,y,free:false}
    const cap = () => Math.round(20 + temp * 0.9); // g per this beaker
    function dissolvedG() { return Math.round(solid.filter(p => p.free).length / 3); }
    $("#tp").oninput = () => { temp = +$("#tp").value; $("#tv").textContent = temp + " °C"; };
    $("#stir").onchange = e => stir = e.target.checked;
    $("#rs").onclick = () => { solid = []; added = 0; info(el, "Empty beaker of water."); };
    $("#add").onclick = () => {
      if (added >= 80) return info(el, "That's plenty!");
      added += 5; sfx.click();
      for (let i = 0; i < 15; i++) { const n = solid.filter(p => !p.free).length; solid.push({ x: BX + BW / 2 - 40 + (n % 12) * 7, y: BOT - 8 - Math.floor(n / 12) * 7, free: false, vx: 0, vy: 0 }); }
    };
    return raf(() => {
      g.fillStyle = css("--card"); g.fillRect(0, 0, 600, 340);
      g.fillStyle = "rgba(120,190,255,.15)"; g.fillRect(BX, TOP, BW, BOT - TOP);
      g.strokeStyle = css("--ink2"); g.lineWidth = 4; g.beginPath(); g.moveTo(BX, TOP - 30); g.lineTo(BX, BOT); g.lineTo(BX + BW, BOT); g.lineTo(BX + BW, TOP - 30); g.stroke();
      const sp = 0.6 + temp / 40 + (stir ? .8 : 0);
      const move = p => { p.vx += (Math.random() - .5) * sp * .6; p.vy += (Math.random() - .5) * sp * .6; const s = Math.hypot(p.vx, p.vy); if (s > sp * 1.6) { p.vx *= sp * 1.6 / s; p.vy *= sp * 1.6 / s; } p.x += p.vx; p.y += p.vy; if (p.x < BX + 6) { p.x = BX + 6; p.vx *= -1; } if (p.x > BX + BW - 6) { p.x = BX + BW - 6; p.vx *= -1; } if (p.y < TOP + 6) { p.y = TOP + 6; p.vy *= -1; } if (p.y > BOT - 6) { p.y = BOT - 6; p.vy *= -1; } };
      water.forEach(p => { move(p); g.fillStyle = "#3b82f6"; g.beginPath(); g.arc(p.x, p.y, 5, 0, 7); g.fill(); });
      const freeN = solid.filter(p => p.free).length, limit = cap() * 3;
      // dissolving: a random undissolved particle breaks free if below saturation
      const lumps = solid.filter(p => !p.free);
      if (lumps.length && freeN < limit && Math.random() < 0.05 * sp) { const p = lumps[lumps.length - 1]; p.free = true; }
      // cooling below saturation: particles come back out as crystals
      if (freeN > limit && Math.random() < .05) { const p = solid.find(q => q.free); const n = lumps.length; p.free = false; p.x = BX + BW / 2 - 40 + (n % 12) * 7; p.y = BOT - 8 - Math.floor(n / 12) * 7; }
      solid.forEach(p => { if (p.free) move(p); g.fillStyle = "#f97316"; g.fillRect(p.x - 3.5, p.y - 3.5, 7, 7); });
      const d = dissolvedG(); $("#db").style.width = Math.min(100, d / cap() * 100) + "%"; $("#dn").textContent = d + " / " + cap() + " g";
      const undis = solid.length - freeN;
      g.font = "bold 15px 'Times New Roman'"; g.fillStyle = css("--ink"); g.textAlign = "center";
      g.fillText(added === 0 ? "pure water" : undis > 0 && freeN >= limit - 2 ? "SATURATED — no more will dissolve" : undis > 0 ? "dissolving…" : "all dissolved → a solution", 300, 30); g.textAlign = "left";
      g.fillStyle = "#3b82f6"; g.fillText("● solvent", 470, 120); g.fillStyle = "#f97316"; g.fillText("■ solute", 470, 145);
    });
  });

  /* ---------------- concentration mixer ---------------- */
  reg("concMixer", "Drink mixer", (el) => {
    el.innerHTML = `<div class="row" style="align-items:flex-start;gap:14px;flex-wrap:nowrap">
      <svg viewBox="0 0 160 200" style="max-width:170px;flex:none"><path d="M20 20 L35 185 Q80 195 125 185 L140 20Z" fill="var(--card)" stroke="var(--ink2)" stroke-width="3"/><clipPath id="cupc"><path d="M22 22 L36 183 Q80 193 124 183 L138 22Z"/></clipPath><rect id="drink" clip-path="url(#cupc)" x="0" y="80" width="160" height="120" fill="#22c55e"/></svg>
      <svg viewBox="0 0 160 160" style="max-width:170px;flex:none"><rect width="160" height="160" rx="12" fill="var(--bg2)"/><g id="pts"></g><text x="80" y="154" text-anchor="middle" font-size="10" font-weight="800" fill="var(--muted)">particle view (zoomed)</text></svg></div>
    <div class="slider-row">Powder <input type="range" id="pw" min="0" max="30" value="10"> <b id="pwv">10 g</b></div>
    <div class="slider-row">Water <input type="range" id="wt" min="50" max="250" step="10" value="200"> <b id="wtv">200 cm³</b></div>
    <div class="equation" id="eq"></div>
    <div class="w-info">🎯 Challenge: make a drink of exactly <b>8 g per 100 cm³</b>.</div>`;
    const $ = s => el.querySelector(s); let won = false;
    function draw() {
      const p = +$("#pw").value, w = +$("#wt").value, c = p / w * 100;
      $("#pwv").textContent = p + " g"; $("#wtv").textContent = w + " cm³";
      $("#drink").setAttribute("y", 185 - w * 0.65); $("#drink").setAttribute("height", w * 0.65 + 10);
      const k = Math.min(1, c / 20); $("#drink").setAttribute("fill", `rgb(${Math.round(lerp(220, 21, k))},${Math.round(lerp(252, 128, k))},${Math.round(lerp(231, 61, k))})`);
      let s = ""; const n = Math.round(Math.min(60, c * 3)); let seed = 1; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
      for (let i = 0; i < 28; i++) s += `<circle cx="${10 + r() * 140}" cy="${10 + r() * 130}" r="5" fill="#3b82f6" opacity=".5"/>`;
      for (let i = 0; i < n; i++) s += `<rect x="${8 + r() * 140}" y="${8 + r() * 130}" width="7" height="7" fill="#16a34a"/>`;
      $("#pts").innerHTML = s;
      $("#eq").innerHTML = `${p} g ÷ ${w} cm³ × 100 = <b>${c.toFixed(1)} g per 100 cm³</b> · ${c < 4 ? "very dilute" : c < 10 ? "fairly dilute" : c < 16 ? "concentrated" : "very concentrated"}`;
      if (Math.abs(c - 8) < 0.05 && !won) { won = true; info(el, "🎉 Exactly 8 g per 100 cm³! Notice: 8 g in 100 cm³ looks the same as 16 g in 200 cm³ — same <b>concentration</b>."); sfx.win(); Lab.addXP(10); }
    }
    $("#pw").oninput = draw; $("#wt").oninput = draw; draw();
  });

  /* ---------------- salt solubility race ---------------- */
  reg("saltRace", "Which salt dissolves most?", (el) => {
    const S = [["Iron(II) chloride", 52.6, "#65a30d"], ["Sodium chloride", 36, "#e5e7eb"], ["Lead(II) iodide", 0.07, "#facc15"]];
    el.innerHTML = `<svg viewBox="0 0 390 230" id="sr"></svg>
    <div class="w-controls"><button class="btn small" id="sp">🥄 Add 10 g to each (100 cm³ water, 20 °C)</button><button class="btn small ghost" id="rs">Reset</button></div>
    <div class="w-info">Each beaker has 100 cm³ of water at 20 °C. Keep adding salt.</div>`;
    let added = 0;
    function draw() {
      el.querySelector("#sr").innerHTML = S.map(([n, sol, col], i) => {
        const x = 20 + i * 125, dis = Math.min(added, sol), un = Math.max(0, added - sol);
        const tint = Math.min(.8, dis / 70);
        return `<g><rect x="${x}" y="40" width="100" height="140" fill="rgba(140,200,255,.2)"/><rect x="${x}" y="70" width="100" height="110" fill="${col}" opacity="${tint}"/><path d="M${x} 30 V180 H${x + 100} V30" fill="none" stroke="var(--ink2)" stroke-width="3"/>
          ${Array.from({ length: Math.min(40, Math.round(un / 2)) }, (_, k) => `<rect x="${x + 6 + (k % 10) * 9}" y="${172 - Math.floor(k / 10) * 7}" width="8" height="6" fill="${col}" stroke="#999" stroke-width=".5"/>`).join("")}
          <text x="${x + 50}" y="200" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">${n}</text>
          <text x="${x + 50}" y="216" text-anchor="middle" font-size="11" fill="var(--muted)">dissolved: ${dis.toFixed(dis < 1 ? 2 : 1)} g</text>
          ${un > 0 ? `<text x="${x + 50}" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#e5484d">saturated!</text>` : ""}</g>`;
      }).join("");
    }
    el.querySelector("#sp").onclick = () => { added = Math.min(70, added + 10); sfx.click(); draw(); info(el, `Added ${added} g to each. ${added > 36 ? "Sodium chloride is saturated at <b>36 g</b>. " : ""}${added > 52.6 ? "Iron(II) chloride saturates at <b>52.6 g</b> — the most soluble. " : ""}Lead(II) iodide: only <b>0.07 g</b> dissolves — it's almost <b>insoluble</b>.`); };
    el.querySelector("#rs").onclick = () => { added = 0; draw(); };
    draw();
  });

  /* ---------------- solubility curve + crystallisation ---------------- */
  reg("solCurve", "Solubility curves", (el) => {
    const X = T => 50 + T * 3.3, Y = v => 230 - v * 0.85;
    const path = tab => tab.map(([t, v], i) => (i ? "L" : "M") + X(t) + " " + Y(v)).join(" ");
    const Yc = v => 230 - v * 600;
    el.innerHTML = `<div class="row" style="gap:6px"><button class="chip on" data-v="solid">Salts (solids)</button><button class="chip" data-v="gas">Carbon dioxide (gas)</button></div>
    <svg viewBox="0 0 400 260" id="gr"></svg>
    <div class="slider-row">🌡️ Temperature <input type="range" id="tp" min="0" max="100" value="20"> <b id="tv">20 °C</b></div>
    <svg viewBox="0 0 400 120" id="bk"></svg>
    <div class="w-info"></div>`;
    const $ = s => el.querySelector(s); let view = "solid";
    function draw() {
      const T = Math.min(+$("#tp").value, view === "gas" ? 60 : 100); $("#tv").textContent = T + " °C";
      let s = `<rect width="400" height="260" fill="var(--card)"/><line x1="50" y1="230" x2="390" y2="230" stroke="var(--ink2)"/><line x1="50" y1="10" x2="50" y2="230" stroke="var(--ink2)"/><text x="220" y="256" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink2)">temperature (°C)</text><text x="12" y="120" font-size="10" font-weight="700" fill="var(--ink2)" text-anchor="middle" transform="rotate(-90 12 120)">solubility (g per 100 cm³)</text>`;
      if (view === "solid") {
        [0, 20, 40, 60, 80, 100].forEach(t => s += `<text x="${X(t)}" y="244" font-size="10" text-anchor="middle" fill="var(--muted)">${t}</text>`);
        [0, 50, 100, 150, 200, 250].forEach(v => s += `<text x="44" y="${Y(v) + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${v}</text><line x1="50" x2="390" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-dasharray="3 4"/>`);
        s += `<path d="${path(KNO3)}" fill="none" stroke="#8b5cf6" stroke-width="3.5"/><path d="${path(NACL)}" fill="none" stroke="#f97316" stroke-width="3.5"/>`;
        s += `<text x="${X(72)}" y="${Y(175)}" font-size="12" font-weight="800" fill="#8b5cf6">potassium nitrate</text><text x="${X(62)}" y="${Y(36) - 8}" font-size="12" font-weight="800" fill="#f97316">sodium chloride</text>`;
        const k = interp(KNO3, T), n = interp(NACL, T);
        s += `<line x1="${X(T)}" x2="${X(T)}" y1="230" y2="${Y(k)}" stroke="#e5484d" stroke-dasharray="4 3" stroke-width="2"/><line x1="50" x2="${X(T)}" y1="${Y(k)}" y2="${Y(k)}" stroke="#8b5cf6" stroke-dasharray="4 3"/><circle cx="${X(T)}" cy="${Y(k)}" r="6" fill="#8b5cf6"/><circle cx="${X(T)}" cy="${Y(n)}" r="6" fill="#f97316"/>`;
        $("#gr").innerHTML = s;
        // beaker: 150 g KNO3 in 100 cm³
        const un = Math.max(0, 150 - k);
        $("#bk").innerHTML = `<rect x="60" y="20" width="160" height="90" fill="rgba(140,200,255,.25)"/><rect x="60" y="20" width="160" height="90" fill="#8b5cf6" opacity="${Math.min(.55, Math.min(150, k) / 280)}"/><path d="M60 10 V110 H220 V10" fill="none" stroke="var(--ink2)" stroke-width="3"/>
          ${Array.from({ length: Math.round(un / 3) }, (_, i) => `<path d="M${66 + (i % 18) * 8.5} ${106 - Math.floor(i / 18) * 7} l4 -6 l4 6z" fill="#e9e3ff" stroke="#8b5cf6" stroke-width=".8"/>`).join("")}
          <text x="230" y="50" font-size="11" font-weight="800" fill="var(--ink)">150 g potassium nitrate</text><text x="230" y="66" font-size="11" fill="var(--muted)">in 100 cm³ water</text>`;
        info(el, `At <b>${T} °C</b>: potassium nitrate solubility ≈ <b>${Math.round(k)} g</b>; sodium chloride ≈ <b>${n.toFixed(1)} g</b> per 100 cm³.<br>${un > 0 ? `In the beaker, <b>${Math.round(un)} g</b> can't dissolve — it stays as crystals. Heat it up and they dissolve!` : "All 150 g has dissolved. Now <b>cool it down</b> and watch crystals form!"}<br><span class="muted">Notice: sodium chloride's curve is almost flat — temperature hardly changes its solubility.</span>`);
      } else {
        [0, 20, 40, 60].forEach(t => s += `<text x="${X(t * 1.66)}" y="244" font-size="10" text-anchor="middle" fill="var(--muted)">${t}</text>`);
        [0, 0.1, 0.2, 0.3].forEach(v => s += `<text x="44" y="${Yc(v) + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${v}</text><line x1="50" x2="390" y1="${Yc(v)}" y2="${Yc(v)}" stroke="var(--line)" stroke-dasharray="3 4"/>`);
        s += `<path d="${CO2.map(([t, v], i) => (i ? "L" : "M") + X(t * 1.66) + " " + Yc(v)).join(" ")}" fill="none" stroke="#0ea5a4" stroke-width="3.5"/>`;
        const c = interp(CO2, T); s += `<circle cx="${X(T * 1.66)}" cy="${Yc(c)}" r="6" fill="#0ea5a4"/>`;
        $("#gr").innerHTML = s;
        const bub = Math.round((0.34 - c) * 120);
        $("#bk").innerHTML = `<rect x="160" y="15" width="80" height="95" rx="10" fill="#7c4a1e" opacity=".85"/>${Array.from({ length: bub }, (_, i) => `<circle cx="${168 + (i * 37) % 64}" cy="${100 - (i * 23) % 80}" r="3" fill="#fff" opacity=".8"><animate attributeName="cy" from="105" to="18" dur="${1 + (i % 5) * .3}s" repeatCount="indefinite"/></circle>`).join("")}<text x="250" y="60" font-size="11" font-weight="800" fill="var(--ink)">fizzy drink</text>`;
        info(el, `At <b>${T} °C</b> about <b>${c.toFixed(2)} g</b> of CO₂ dissolves per 100 cm³. Gases are the opposite of solids: <b>warmer → less soluble</b>, so more bubbles escape and the drink goes flat.`);
      }
    }
    $("#tp").oninput = draw;
    el.querySelectorAll("[data-v]").forEach(b => b.onclick = () => { view = b.dataset.v; el.querySelectorAll("[data-v]").forEach(x => x.classList.toggle("on", x === b)); $("#tp").max = view === "gas" ? 60 : 100; draw(); });
    draw();
  });
})();
