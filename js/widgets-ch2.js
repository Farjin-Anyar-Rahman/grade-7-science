/* ===== Interactive widgets — Chapter 2 ===== */
(function () {
  const { h, esc, shuffle, sfx } = Lab;
  const { reg, info, raf, lerp, ease } = WU;

  /* ---------------- nutrient sort ---------------- */
  reg("nutrientSort", "Sort the foods", (el) => {
    WU.inlineQ(el, { t: "sort", q: "Drag each food to its MAIN nutrient.", buckets: ["⚡ Carbohydrate", "💪 Protein", "🧈 Fat", "🍊 Vitamins & minerals", "🌾 Fibre"], items: [["🍚 Rice", 0], ["🍞 White bread", 0], ["🍗 Chicken", 1], ["🫘 Lentils", 1], ["🧈 Butter", 2], ["🫒 Oil", 2], ["🍊 Orange", 3], ["🥦 Broccoli", 3], ["🥣 Bran cereal", 4], ["🍞 Wholemeal bread", 4]], ex: "Wholemeal bread has carbohydrate too — but it's a great fibre source." });
  });

  /* ---------------- food label ---------------- */
  reg("foodLabel", "Read the food label", (el) => {
    const per100 = { energy: 1500, protein: 11.8, carb: 52.3, sugars: 25, starch: 27.3, fat: 10.2, calcium: 500, iron: 68, vitC: 25, fibre: 24.8 };
    el.innerHTML = `<div class="label-box"><h5>Nutrition Information</h5><table><thead><tr><th></th><th>Per <span id="sv">40</span> g</th><th>Per 100 g</th></tr></thead><tbody id="lb"></tbody></table></div>
    <div class="slider-row">Serving size <input type="range" id="srv" min="10" max="150" step="5" value="40"> <span id="svn">40 g</span></div>
    <div class="row" style="margin-top:6px"><label class="toggle"><input type="checkbox" id="kcal"> Show kilocalories too</label></div>
    <div class="zone"></div>`;
    const rows = [["Energy", "energy", "kJ"], ["Protein", "protein", "g"], ["Carbohydrate", "carb", "g"], ["  of which sugars", "sugars", "g", 1], ["  of which starch", "starch", "g", 1], ["Fat", "fat", "g"], ["Calcium", "calcium", "mg"], ["Iron", "iron", "mg"], ["Vitamin C", "vitC", "mg"], ["Fibre", "fibre", "g"]];
    function draw() {
      const s = +el.querySelector("#srv").value, kc = el.querySelector("#kcal").checked; el.querySelector("#sv").textContent = s; el.querySelector("#svn").textContent = s + " g";
      el.querySelector("#lb").innerHTML = rows.map(([n, k, u, sub]) => { const v = per100[k] * s / 100; const f = x => (x >= 100 ? Math.round(x) : Math.round(x * 10) / 10); const extra = k === "energy" && kc ? ` (${Math.round(v / 4.184)} kcal)` : ""; const extra2 = k === "energy" && kc ? ` (${Math.round(per100[k] / 4.184)} kcal)` : ""; return `<tr class="${sub ? "sub" : ""}"><td>${n.trim()}</td><td>${f(v)} ${u}${extra}</td><td>${per100[k]} ${u}${extra2}</td></tr>`; }).join("");
    }
    el.querySelector("#srv").oninput = draw; el.querySelector("#kcal").onchange = draw; draw();
    const qs = [
      { t: "num", q: "How many grams of protein are in 100 g of this food?", a: 11.8, unit: "g", ex: "Read the per 100 g column." },
      { t: "num", q: "How much energy (kJ) is in 100 g?", a: 1500, unit: "kJ", ex: "" },
      { t: "num", q: "Set the slider to 50 g. How many mg of calcium are in 50 g?", a: 250, unit: "mg", ex: "500 × 50 ÷ 100 = 250 mg." },
      { t: "mcq", q: "Which nutrient on this label gives you the most energy per gram?", o: ["Protein", "Fat", "Fibre", "Calcium"], a: 1, ex: "Fat stores lots of energy (about twice carbohydrate per gram)." }
    ];
    let k = 0; const z = el.querySelector(".zone");
    function nq() { z.innerHTML = `<div class="row" style="margin-top:10px"><b>Label question ${k + 1}/${qs.length}</b><span class="spacer"></span><button class="btn small ghost">Next ›</button></div>`; z.querySelector("button").onclick = () => { k = (k + 1) % qs.length; nq(); }; WU.inlineQ(z, qs[k]); }
    nq();
  });

  /* ---------------- burning food experiment ---------------- */
  reg("burnFood", "Virtual lab: energy in food", (el) => {
    const FOODS = { "🥜 Peanut": 24, "🍞 Bread": 10, "🍪 Cookie": 20, "🍿 Popcorn": 16, "🥔 Crisps": 22, "🍬 Marshmallow": 13 };
    el.innerHTML = `<div class="row"><select id="food" class="txt-in" style="max-width:190px;padding:7px">${Object.keys(FOODS).map(f => `<option>${f}</option>`).join("")}</select></div>
    <div class="slider-row">Mass of food <input type="range" id="mass" min="0.5" max="2" step="0.1" value="1"> <span id="mv">1.0 g</span></div>
    <div class="slider-row">Volume of water <input type="range" id="vol" min="10" max="40" step="5" value="20"> <span id="vv">20 cm³</span></div>
    <svg viewBox="0 0 360 280" id="rig">
      <rect x="0" y="262" width="360" height="18" fill="#8d6e63"/><rect x="40" y="252" width="140" height="10" rx="3" fill="#cfa77a"/><text x="110" y="276" text-anchor="middle" font-size="10" fill="#fff" font-weight="800">heat-proof mat</text>
      <rect x="250" y="20" width="10" height="242" fill="#999"/><rect x="190" y="60" width="70" height="8" fill="#999"/>
      <g id="tube"><path d="M178 30 h24 v120 a12 12 0 0 1 -24 0z" fill="#e7f4ff" stroke="#7aa6c9" stroke-width="2.5"/><rect id="water" x="180" y="${100}" width="20" height="58" fill="#7cc6ff" opacity=".8"/></g>
      <g id="thermo"><rect x="186" y="6" width="8" height="140" rx="4" fill="#fff" stroke="#888"/><rect id="merc" x="188" y="120" width="4" height="24" fill="#e5484d"/><circle cx="190" cy="146" r="6" fill="#e5484d"/></g>
      <text id="tread" x="215" y="16" font-family="Times New Roman" font-size="18" font-weight="700" fill="var(--ink)">20.0 °C</text>
      <line x1="90" y1="250" x2="186" y2="192" stroke="#777" stroke-width="3"/><rect x="70" y="244" width="30" height="8" rx="3" fill="#333"/>
      <g id="foodg" transform="translate(190 190)"><text id="fe" x="-11" y="8" font-size="22">🥜</text><g id="flame" opacity="0"><path class="flame" d="M0 -6 C-14 -22 -6 -40 6 -52 C4 -38 18 -30 10 -10 C8 -4 2 -2 0 -6Z" fill="#ffb02e"/><path class="flame" d="M2 -8 C-6 -18 0 -30 6 -38 C6 -28 12 -22 8 -12Z" fill="#fff36b"/></g></g>
      <g id="smoke"></g>
    </svg>
    <div class="row checks"><b style="font-size:14px">Safety first:</b><label class="toggle"><input type="checkbox" class="sf"> 🥽 Goggles</label><label class="toggle"><input type="checkbox" class="sf"> 💇 Hair tied back</label><label class="toggle"><input type="checkbox" class="sf"> 🟫 Heat-proof mat</label><label class="toggle"><input type="checkbox" class="sf"> 🥜 Checked for allergies</label></div>
    <div class="w-controls"><button class="btn small" id="go">🔥 Light the food</button><button class="btn small ghost" id="clr">Clear results</button></div>
    <table class="mini-table"><thead><tr><th>Food</th><th>Mass</th><th>Water</th><th>Start °C</th><th>End °C</th><th>Rise °C</th></tr></thead><tbody id="res"></tbody></table>
    <div class="w-info">Pick a food. Tick all the safety checks, then light it. Compare foods — but keep it a <b>fair test</b>!</div>`;
    const $ = s => el.querySelector(s);
    const upd = () => { $("#mv").textContent = (+$("#mass").value).toFixed(1) + " g"; $("#vv").textContent = $("#vol").value + " cm³"; $("#fe").textContent = $("#food").value.split(" ")[0]; const v = +$("#vol").value; $("#water").setAttribute("y", 158 - v * 2.4); $("#water").setAttribute("height", v * 2.4); };
    ["#mass", "#vol", "#food"].forEach(s => $(s).oninput = upd); upd();
    let busy = false; const trials = [];
    const setT = (T) => { $("#tread").textContent = T.toFixed(1) + " °C"; const hgt = 10 + (T - 10) * 2.2; $("#merc").setAttribute("y", 144 - hgt); $("#merc").setAttribute("height", hgt); };
    setT(20);
    $("#clr").onclick = () => { trials.length = 0; $("#res").innerHTML = ""; info(el, "Results cleared."); };
    $("#go").onclick = () => {
      if (busy) return;
      if ([...el.querySelectorAll(".sf")].some(c => !c.checked)) { sfx.bad(); return info(el, "⚠️ <b>Safety first!</b> Burning food is a <b>hazard</b> — it can burn you. Tick all the controls first. (These are great answers for the 'hazard + control' exam question!)"); }
      busy = true; const food = $("#food").value, m = +$("#mass").value, v = +$("#vol").value;
      const start = Math.round((18 + Math.random() * 3.5) * 10) / 10; const rise = FOODS[food] * m * 0.09 * 1000 / (v * 4.2) * (0.92 + Math.random() * .16); const end = Math.round((start + rise) * 10) / 10;
      setT(start); $("#flame").setAttribute("opacity", 1); sfx.click(); info(el, `Burning ${food}… energy released by the food heats the water.`);
      const t0 = performance.now(); const dur = 4200;
      const stop = raf((t) => { const k = Math.min(1, (t - t0) / dur); setT(start + (end - start) * ease(k)); $("#fe").setAttribute("opacity", 1 - k * .6); if (k >= 1) { stop(); done(); } });
      function done() {
        $("#flame").setAttribute("opacity", 0); busy = false; $("#fe").setAttribute("opacity", 1);
        trials.push({ food, m, v, start, end }); const r = Math.round((end - start) * 10) / 10;
        $("#res").insertAdjacentHTML("beforeend", `<tr><td>${food}</td><td>${m.toFixed(1)} g</td><td>${v} cm³</td><td>${start.toFixed(1)}</td><td>${end.toFixed(1)}</td><td><b>${r.toFixed(1)}</b></td></tr>`);
        const fair = trials.every(x => x.m === trials[0].m && x.v === trials[0].v);
        info(el, `Rise = end − start = ${end.toFixed(1)} − ${start.toFixed(1)} = <b>${r.toFixed(1)} °C</b>. ` + (trials.length > 1 ? (fair ? "✅ Fair test so far — same mass and same volume of water. Bigger rise = more energy." : "⚠️ <b>Not a fair test!</b> You changed the mass of food or the volume of water. Keep those the same (control variables).") : "Now try a different food with the <b>same</b> mass and water volume."));
        sfx.good(); Lab.addXP(3);
      }
    };
  });

  /* ---------------- vitamin flip cards ---------------- */
  reg("vitaminCards", "Vitamins & minerals", (el) => {
    const C = [["🥕", "Vitamin A", "Carrots, cheese, eggs, oily fish", "Keeps eyes and skin healthy", "Poor night vision, blindness"], ["🍊", "Vitamin C", "Lemons, limes, oranges, peppers, potatoes", "Keeps skin and gums healthy", "Scurvy — bleeding gums"], ["🐟", "Vitamin D", "Oily fish, eggs (and sunlight on skin)", "Keeps bones and teeth healthy", "Rickets — soft, weak bones"], ["🥛", "Calcium (mineral)", "Milk, cheese, bok choy", "Used in bones and teeth", "Weak bones and teeth"], ["🫘", "Iron (mineral)", "Beans, red meat, dark green vegetables", "Used to make haemoglobin in red blood cells", "Anaemia — tired, out of breath"]];
    el.innerHTML = `<div class="flipcards">${C.map(c => `<div class="term"><div class="in"><div class="f"><span class="e">${c[0]}</span>${c[1]}</div><div class="b"><div><b>Sources:</b> ${c[2]}<br><b>Job:</b> ${c[3]}<br><b>Lack of it:</b> ${c[4]}</div></div></div></div>`).join("")}</div><div class="w-info">Tap a card to flip it.</div>`;
    el.querySelectorAll(".term").forEach(t => t.onclick = () => { t.classList.toggle("flip"); sfx.click(); });
  });

  /* ---------------- plate builder ---------------- */
  reg("plateBuilder", "Build a balanced plate", (el) => {
    // carb, protein, fat, vit, fibre, sugar
    const F = { "🍚": ["Rice", 3, 0, 0, 0, 1, 0], "🍞": ["Wholemeal bread", 2, 1, 0, 0, 2, 0], "🥔": ["Potato", 3, 0, 0, 1, 1, 0], "🍗": ["Chicken", 0, 3, 1, 0, 0, 0], "🐟": ["Fish", 0, 3, 1, 1, 0, 0], "🫘": ["Lentils", 1, 2, 0, 1, 2, 0], "🥚": ["Egg", 0, 2, 1, 1, 0, 0], "🥦": ["Broccoli", 0, 0, 0, 3, 2, 0], "🥕": ["Carrot", 0, 0, 0, 3, 1, 0], "🍎": ["Apple", 1, 0, 0, 2, 1, 1], "🧀": ["Cheese", 0, 1, 2, 1, 0, 0], "🍟": ["Chips", 2, 0, 3, 0, 0, 0], "🍩": ["Doughnut", 1, 0, 2, 0, 0, 3], "🥤": ["Fizzy drink", 0, 0, 0, 0, 0, 4], "🍫": ["Chocolate", 0, 0, 2, 0, 0, 3] };
    el.innerHTML = `<div class="foods">${Object.entries(F).map(([e, d]) => `<button data-f="${e}" title="${d[0]}">${e} ${d[0]}</button>`).join("")}</div>
    <div class="plate" id="pl"></div>
    <div class="bars">${["Carbohydrate", "Protein", "Fat", "Vitamins", "Fibre", "Sugar"].map((n, i) => `<div class="barrow"><span>${n}</span><span class="tr"><i id="b${i}"></i></span><span id="v${i}"></span></div>`).join("")}</div>
    <div class="w-controls"><button class="btn small ghost" id="clr">Clear plate</button></div>
    <div class="w-info">Add up to 8 foods. Tap a food on the plate to remove it.</div>`;
    let plate = [];
    const ideal = [[4, 9], [3, 8], [1, 3], [4, 12], [3, 12], [0, 2]];
    function draw() {
      el.querySelector("#pl").innerHTML = plate.map((f, i) => `<span data-i="${i}">${f}</span>`).join("");
      el.querySelectorAll("#pl span").forEach(s => s.onclick = () => { plate.splice(+s.dataset.i, 1); draw(); });
      const tot = [0, 0, 0, 0, 0, 0]; plate.forEach(f => F[f].slice(1).forEach((v, i) => tot[i] += v));
      const issues = [];
      tot.forEach((v, i) => { const [lo, hi] = ideal[i]; const ok = v >= lo && v <= hi; const b = el.querySelector("#b" + i); b.style.width = Math.min(100, v / 12 * 100) + "%"; b.style.background = ok ? "var(--good)" : v > hi ? "var(--bad)" : "var(--warn)"; el.querySelector("#v" + i).textContent = v; if (!ok && plate.length) issues.push(v > hi ? "too much " + ["carbohydrate", "protein", "fat", "vitamins", "fibre", "sugar"][i] : "not enough " + ["carbohydrate", "protein", "fat", "vitamins & minerals", "fibre", "sugar"][i]); });
      if (!plate.length) return info(el, "Add up to 8 foods. Tap a food on the plate to remove it.");
      if (!issues.filter(x => !x.includes("not enough sugar")).length) { info(el, "🏆 <b>Balanced!</b> Carbohydrate for energy, protein for growth, a little fat, plenty of vitamins and fibre, and not much sugar."); sfx.win(); }
      else info(el, "Hmm: " + issues.filter(x => !x.includes("not enough sugar")).join(", ") + ".");
    }
    el.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { if (plate.length >= 8) return info(el, "Plate's full! Tap a food on the plate to remove it."); plate.push(b.dataset.f); sfx.click(); draw(); });
    el.querySelector("#clr").onclick = () => { plate = []; draw(); };
  });

  /* ---------------- trend graph (protein vs height) ---------------- */
  reg("trendGraph", "Protein vs height", (el) => {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = Array.from({ length: 70 }, () => { const p = 10 + rnd() * 120; return [p, 160 + p * 0.12 + (rnd() - .5) * 10]; });
    const X = p => 50 + p / 140 * 320, Y = hh => 230 - (hh - 155) / 30 * 200;
    el.innerHTML = `<svg viewBox="0 0 400 270"><rect width="400" height="270" fill="var(--card)"/>
      <line x1="50" y1="230" x2="380" y2="230" stroke="var(--ink2)"/><line x1="50" y1="20" x2="50" y2="230" stroke="var(--ink2)"/>
      ${[0, 20, 40, 60, 80, 100, 120, 140].map(v => `<text x="${X(v)}" y="246" font-size="10" text-anchor="middle" fill="var(--muted)">${v}</text>`).join("")}
      ${[155, 165, 175, 185].map(v => `<text x="42" y="${Y(v) + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${v}</text>`).join("")}
      <text x="215" y="264" font-size="11" text-anchor="middle" fill="var(--ink2)" font-weight="700">protein eaten per day (g)</text>
      <text x="14" y="125" font-size="11" text-anchor="middle" fill="var(--ink2)" font-weight="700" transform="rotate(-90 14 125)">height at 18 (cm)</text>
      ${pts.map(([p, hh], i) => `<circle cx="${X(p)}" cy="${Y(hh)}" r="0" fill="#2fb36b" opacity=".75"><animate attributeName="r" to="4" dur=".3s" begin="${i * .03}s" fill="freeze"/></circle>`).join("")}
      <line id="tl" x1="${X(10)}" y1="${Y(161.2)}" x2="${X(130)}" y2="${Y(175.6)}" stroke="#e5484d" stroke-width="3" stroke-dasharray="6 6" opacity="0" style="transition:opacity .6s"/>
    </svg>
    <div class="w-controls"><button class="btn small" id="tr">Show the trend</button></div>
    <div class="w-info">Each dot is a country's average. What pattern do you see?</div>`;
    el.querySelector("#tr").onclick = () => { el.querySelector("#tl").setAttribute("opacity", 1); info(el, "📈 <b>Trend:</b> as the amount of protein eaten increases, average height increases. But this <b>doesn't prove</b> protein causes height — richer countries may also have better healthcare, for example. Scientists need more studies."); };
  });

  /* ---------------- artery ---------------- */
  reg("artery", "Inside an artery", (el) => {
    el.innerHTML = `<canvas width="600" height="260"></canvas>
    <div class="slider-row">Years of fatty diet + no exercise + smoking <input type="range" id="yr" min="0" max="40" value="0"> <span id="yv">0 yrs</span></div>
    <div class="bars"><div class="barrow"><span>Blood flow</span><span class="tr"><i id="fl" style="background:var(--good)"></i></span><span id="fln"></span></div><div class="barrow"><span>Blood pressure</span><span class="tr"><i id="bp" style="background:var(--bad)"></i></span><span id="bpn"></span></div></div>
    <div class="w-info">A healthy artery: wide and clear.</div>`;
    const cv = el.querySelector("canvas"), g = cv.getContext("2d"); let yrs = 0;
    const cells = Array.from({ length: 30 }, () => ({ x: Math.random() * 600, y: (Math.random() - .5) }));
    el.querySelector("#yr").oninput = (e) => {
      yrs = +e.target.value; el.querySelector("#yv").textContent = yrs + " yrs";
      const n = yrs / 40; const flow = Math.round((1 - n * .9) * 100), bp = Math.round(115 + n * 70);
      el.querySelector("#fl").style.width = flow + "%"; el.querySelector("#fln").textContent = flow + "%"; el.querySelector("#bp").style.width = (bp - 80) + "%"; el.querySelector("#bpn").textContent = bp;
      info(el, n < .2 ? "A healthy artery: wide and clear. ✅" : n < .55 ? "Fat is building up inside the artery wall. The tube gets <b>narrower</b>, so the heart must push harder → <b>high blood pressure</b>." : n < .85 ? "⚠️ Very narrow! Less blood (and oxygen) reaches the heart muscle → <b>heart disease</b>. A blocked vessel to the brain causes a <b>stroke</b>." : "🚨 Almost blocked! The heart muscle can't get oxygen → <b>heart attack</b>. Eat less fat and salt, exercise, don't smoke!");
    };
    el.querySelector("#yr").oninput({ target: el.querySelector("#yr") });
    return raf((t) => {
      const n = yrs / 40, half = 90 * (1 - n * .85), mid = 130;
      g.fillStyle = "#fde5e1"; g.fillRect(0, 0, 600, 260);
      g.fillStyle = "#e7949c"; g.fillRect(0, 0, 600, 30); g.fillRect(0, 230, 600, 30);
      g.fillStyle = "#f8d36b"; g.beginPath(); g.moveTo(0, 30);
      for (let x = 0; x <= 600; x += 10) { const bump = Math.exp(-Math.pow((x - 300) / 140, 2)); g.lineTo(x, 30 + (100 - half) * bump + 4 * Math.sin(x / 17) * n); } g.lineTo(600, 30); g.fill();
      g.beginPath(); g.moveTo(0, 230); for (let x = 0; x <= 600; x += 10) { const bump = Math.exp(-Math.pow((x - 300) / 140, 2)); g.lineTo(x, 230 - (100 - half) * bump - 4 * Math.cos(x / 15) * n); } g.lineTo(600, 230); g.fill();
      cells.forEach(c => {
        const bump = Math.exp(-Math.pow((c.x - 300) / 140, 2)); const w = 100 - (100 - half) * bump; const sp = (1 - n * .88) * (2.5 + 2 * (1 - w / 100) * (1 - n));
        c.x += sp; if (c.x > 620) c.x = -20;
        const y = mid + c.y * (w - 18) * 1.6;
        g.fillStyle = "#d9283f"; g.beginPath(); g.ellipse(c.x, y, 14, 9, 0, 0, 7); g.fill(); g.fillStyle = "#a3122a"; g.beginPath(); g.ellipse(c.x, y, 5, 3, 0, 0, 7); g.fill();
      });
      if (n > .3) { g.fillStyle = "#8a6d1f"; g.font = "bold 13px 'Times New Roman'"; g.fillText("fatty deposit", 255, 48 + (100 - half) * .5); }
    });
  });

  /* ---------------- smoker's lungs + smoking machine ---------------- */
  reg("smokerLungs", "Healthy vs smoker's lungs", (el) => {
    el.innerHTML = `<svg viewBox="0 0 400 230" id="lsv">
      <g transform="translate(20 10)"><path d="M86 30 C40 26 20 90 24 160 C26 196 56 204 84 196Z" fill="#f59fb0"/><path d="M104 30 C150 26 170 90 166 160 C164 196 134 204 106 196Z" fill="#f59fb0"/><rect x="88" y="0" width="14" height="40" fill="#d7b98a"/><text x="95" y="222" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink)">Non-smoker</text></g>
      <g transform="translate(210 10)"><g id="sl"><path d="M86 30 C40 26 20 90 24 160 C26 196 56 204 84 196Z" fill="#f59fb0" id="sl1"/><path d="M104 30 C150 26 170 90 166 160 C164 196 134 204 106 196Z" fill="#f59fb0" id="sl2"/></g><g id="tarspots"></g><rect x="88" y="0" width="14" height="40" fill="#d7b98a"/><text x="95" y="222" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink)">Smoker</text><g id="tumour" opacity="0"><circle cx="60" cy="120" r="14" fill="#7a3b3b"/><text x="60" y="100" font-size="10" text-anchor="middle" fill="#7a3b3b" font-weight="800">tumour</text></g></g>
    </svg>
    <div class="slider-row">Years smoking <input type="range" id="ys" min="0" max="40" value="0"> <span id="ysv">0</span></div>
    <div class="bars"><div class="barrow"><span>Cilia working</span><span class="tr"><i id="c1" style="background:var(--good)"></i></span><span id="c1n"></span></div><div class="barrow"><span>Alveoli area</span><span class="tr"><i id="c2" style="background:#00b3c7"></i></span><span id="c2n"></span></div><div class="barrow"><span>Cancer risk</span><span class="tr"><i id="c3" style="background:var(--bad)"></i></span><span id="c3n"></span></div></div>
    <hr style="border:0;border-top:1px dashed var(--line);margin:14px 0">
    <b>Smoking machine</b>
    <svg viewBox="0 0 400 140" id="mach"><rect x="20" y="40" width="40" height="14" fill="#fff" stroke="#999"/><text x="40" y="34" font-size="20" text-anchor="middle">🚬</text>
      <rect x="70" y="36" width="80" height="22" rx="4" fill="#eef" stroke="#99a"/><ellipse id="wool" cx="110" cy="47" rx="30" ry="9" fill="#ffffff" stroke="#ccc"/><text x="110" y="76" font-size="10" text-anchor="middle" fill="var(--muted)" font-weight="700">cotton wool</text>
      <path d="M150 47 H240 V80" stroke="#888" stroke-width="4" fill="none"/><path d="M220 70 h40 v50 a10 10 0 0 1 -10 10 h-20 a10 10 0 0 1 -10 -10z" fill="#ddd" stroke="#999"/><rect id="ind" x="222" y="86" width="36" height="42" rx="6" fill="#4caf50"/><text x="240" y="62" font-size="10" text-anchor="middle" fill="var(--muted)" font-weight="700">Universal Indicator</text>
      <path d="M260 47 H330" stroke="#888" stroke-width="4"/><text x="350" y="52" font-size="11" fill="var(--muted)" font-weight="800">→ pump</text><g id="bub"></g></svg>
    <div class="w-controls"><button class="btn small" id="puff">💨 Puff</button><button class="btn small ghost" id="rs">Reset</button></div>
    <div class="w-info">Drag the slider to see what years of smoking do.</div>`;
    const $ = s => el.querySelector(s); const NS = "http://www.w3.org/2000/svg";
    const spots = Array.from({ length: 60 }, (_, i) => { const c = document.createElementNS(NS, "circle"); const side = i % 2; c.setAttribute("cx", side ? 110 + Math.random() * 50 : 30 + Math.random() * 50); c.setAttribute("cy", 50 + Math.random() * 140); c.setAttribute("r", 2 + Math.random() * 4); c.setAttribute("fill", "#2b2118"); c.setAttribute("opacity", 0); $("#tarspots").appendChild(c); return c; });
    $("#ys").oninput = () => {
      const y = +$("#ys").value, n = y / 40; $("#ysv").textContent = y;
      const col = `rgb(${Math.round(245 - n * 150)},${Math.round(159 - n * 100)},${Math.round(176 - n * 120)})`; $("#sl1").setAttribute("fill", col); $("#sl2").setAttribute("fill", col);
      spots.forEach((s, i) => s.setAttribute("opacity", i / spots.length < n ? .85 : 0)); $("#tumour").setAttribute("opacity", n > .7 ? 1 : 0);
      const a = Math.round(100 - n * 85), b = Math.round(100 - n * 45), c = Math.round(5 + n * 90);
      $("#c1").style.width = a + "%"; $("#c1n").textContent = a + "%"; $("#c2").style.width = b + "%"; $("#c2n").textContent = b + "%"; $("#c3").style.width = c + "%"; $("#c3n").textContent = c + "%";
      info(el, n === 0 ? "Healthy pink lungs." : n < .4 ? "<b>Tar</b> starts to coat the lungs. Chemicals <b>paralyse the cilia</b> → smoker's cough, more infections. <b>Nicotine</b> is addictive." : n < .7 ? "Alveoli walls break down → <b>less surface area</b> → less gas exchange → <b>breathless</b>." : "Tar causes <b>cancer</b>: cells copy themselves out of control, forming a <b>tumour</b>.");
    };
    $("#ys").oninput();
    let puffs = 0;
    $("#puff").onclick = () => {
      puffs = Math.min(10, puffs + 1); const n = puffs / 10;
      $("#wool").setAttribute("fill", `rgb(${Math.round(255 - n * 150)},${Math.round(255 - n * 175)},${Math.round(255 - n * 215)})`);
      const ind = ["#4caf50", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00"][Math.min(5, Math.floor(puffs / 2))]; $("#ind").setAttribute("fill", ind);
      for (let i = 0; i < 5; i++) { const b = document.createElementNS(NS, "circle"); b.setAttribute("cx", 236 + Math.random() * 8); b.setAttribute("cy", 125); b.setAttribute("r", 2.5); b.setAttribute("fill", "#fff"); b.innerHTML = `<animate attributeName="cy" to="88" dur="${.6 + i * .15}s" fill="freeze"/><animate attributeName="opacity" to="0" dur="${.6 + i * .15}s" fill="freeze"/>`; $("#bub").appendChild(b); setTimeout(() => b.remove(), 1200); }
      sfx.click(); info(el, `Puff ${puffs}: the cotton wool turns <b>brown</b> (tar). The indicator turns from green towards <b>yellow/orange</b> — smoke is <b>acidic</b>.`);
    };
    $("#rs").onclick = () => { puffs = 0; $("#wool").setAttribute("fill", "#fff"); $("#ind").setAttribute("fill", "#4caf50"); };
  });

  /* ---------------- line of best fit ---------------- */
  reg("bestFit", "Draw a line of best fit", (el) => {
    const data = [[0, 15], [5, 70], [7, 85], [10, 120], [13, 150], [15, 175], [18, 200], [20, 225], [24, 270], [25, 290], [30, 340]];
    const X = v => 50 + v / 35 * 320, Y = v => 230 - v / 400 * 210, iX = px => (px - 50) * 35 / 320, iY = py => (230 - py) * 400 / 210;
    el.innerHTML = `<svg viewBox="0 0 400 270" style="touch-action:none"><rect width="400" height="270" fill="var(--card)"/>
      <line x1="50" y1="230" x2="380" y2="230" stroke="var(--ink2)"/><line x1="50" y1="15" x2="50" y2="230" stroke="var(--ink2)"/>
      ${[0, 5, 10, 15, 20, 25, 30, 35].map(v => `<text x="${X(v)}" y="246" font-size="10" text-anchor="middle" fill="var(--muted)">${v}</text>`).join("")}
      ${[0, 100, 200, 300, 400].map(v => `<text x="44" y="${Y(v) + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${v}</text>`).join("")}
      <text x="215" y="264" font-size="11" text-anchor="middle" fill="var(--ink2)" font-weight="700">cigarettes smoked per day</text>
      <text x="12" y="122" font-size="10" text-anchor="middle" fill="var(--ink2)" font-weight="700" transform="rotate(-90 12 122)">lung cancer deaths (per 100 000)</text>
      ${data.map(([a, b]) => `<g stroke="#e5484d" stroke-width="2.5"><line x1="${X(a) - 5}" y1="${Y(b) - 5}" x2="${X(a) + 5}" y2="${Y(b) + 5}"/><line x1="${X(a) - 5}" y1="${Y(b) + 5}" x2="${X(a) + 5}" y2="${Y(b) - 5}"/></g>`).join("")}
      <line id="ln" stroke="#6a5cff" stroke-width="3"/><circle id="h1" r="10" fill="#6a5cff" style="cursor:grab"/><circle id="h2" r="10" fill="#6a5cff" style="cursor:grab"/>
      <line id="best" stroke="var(--good)" stroke-width="2.5" stroke-dasharray="6 5" opacity="0"/>
    </svg>
    <div class="w-controls"><button class="btn small ghost" id="show">Show the best line</button><span class="chip" id="score">Fit: –</span></div>
    <div class="w-info">Drag the two purple handles to draw a straight line through the <b>middle</b> of the crosses — about the same number above and below.</div>`;
    const svg = el.querySelector("svg"); let A = [X(2), Y(250)], B = [X(32), Y(100)], drag = null;
    const n = data.length, mx = data.reduce((s, d) => s + d[0], 0) / n, my = data.reduce((s, d) => s + d[1], 0) / n;
    const m = data.reduce((s, d) => s + (d[0] - mx) * (d[1] - my), 0) / data.reduce((s, d) => s + (d[0] - mx) ** 2, 0), c = my - m * mx;
    const best = el.querySelector("#best"); best.setAttribute("x1", X(0)); best.setAttribute("y1", Y(c)); best.setAttribute("x2", X(35)); best.setAttribute("y2", Y(m * 35 + c));
    function draw() {
      ["x1", "y1"].forEach((k, i) => el.querySelector("#ln").setAttribute(k, A[i])); ["x2", "y2"].forEach((k, i) => el.querySelector("#ln").setAttribute(k, B[i]));
      el.querySelector("#h1").setAttribute("cx", A[0]); el.querySelector("#h1").setAttribute("cy", A[1]); el.querySelector("#h2").setAttribute("cx", B[0]); el.querySelector("#h2").setAttribute("cy", B[1]);
      const x1 = iX(A[0]), y1 = iY(A[1]), x2 = iX(B[0]), y2 = iY(B[1]); if (Math.abs(x2 - x1) < .5) return;
      const um = (y2 - y1) / (x2 - x1), uc = y1 - um * x1;
      const err = Math.sqrt(data.reduce((s, d) => s + (d[1] - (um * d[0] + uc)) ** 2, 0) / n); const above = data.filter(d => d[1] > um * d[0] + uc).length;
      const sc = Math.max(0, Math.round(100 - err / 1.5));
      el.querySelector("#score").textContent = `Fit: ${sc}% · ${above} above / ${n - above} below`;
      if (sc > 88 && !el._won) { el._won = 1; info(el, "🎯 Excellent line of best fit! The pattern: <b>the more cigarettes smoked, the more lung cancer deaths</b> — a positive correlation."); sfx.win(); Lab.addXP(10); }
    }
    function pt(e) { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 400 / r.width, (e.clientY - r.top) * 270 / r.height]; }
    svg.addEventListener("pointerdown", e => { const p = pt(e); const d1 = Math.hypot(p[0] - A[0], p[1] - A[1]), d2 = Math.hypot(p[0] - B[0], p[1] - B[1]); drag = d1 < d2 ? A : B; svg.setPointerCapture(e.pointerId); });
    svg.addEventListener("pointermove", e => { if (!drag) return; const p = pt(e); drag[0] = Math.max(50, Math.min(380, p[0])); drag[1] = Math.max(15, Math.min(230, p[1])); draw(); });
    svg.addEventListener("pointerup", () => drag = null);
    el.querySelector("#show").onclick = () => { best.setAttribute("opacity", 1); };
    draw();
  });
})();
