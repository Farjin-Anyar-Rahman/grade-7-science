/* ===== Interactive widgets — Chapter 7 ===== */
(function () {
  const { h, esc, shuffle, sfx } = Lab;
  const { reg, info, raf, lerp, ease } = WU;

  /* ---------------- dartboard accurate/precise ---------------- */
  reg("dartboard", "Accurate vs precise", (el) => {
    const modes = { "Accurate & precise": [0, 6], "Precise, not accurate": [55, 6], "Accurate, not precise": [0, 45], "Neither": [60, 45] };
    el.innerHTML = `<div class="row" style="gap:6px">${Object.keys(modes).map((m, i) => `<button class="chip ${i ? "" : "on"}" data-m="${m}">${m}</button>`).join("")}</div>
    <svg viewBox="0 0 300 300"><g>${[130, 100, 70, 40, 14].map((r, i) => `<circle cx="150" cy="150" r="${r}" fill="${["#f2f2f2", "#2b2b2b", "#f2f2f2", "#2b2b2b", "#e5484d"][i]}"/>`).join("")}</g><g id="darts"></g></svg>
    <div class="w-info"></div>`;
    function throwD(m) {
      const [off, spr] = modes[m]; const a = Math.random() * 6.28; const cx = 150 + Math.cos(a) * off, cy = 150 + Math.sin(a) * off;
      el.querySelector("#darts").innerHTML = Array.from({ length: 6 }, (_, i) => { const x = cx + (Math.random() - .5) * spr * 2, y = cy + (Math.random() - .5) * spr * 2; return `<g style="animation:popIn .3s ${i * .12}s backwards"><circle cx="${x}" cy="${y}" r="6" fill="#ffd400" stroke="#333" stroke-width="2"/></g>`; }).join("");
      el.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.m === m));
      info(el, { "Accurate & precise": "Close to the <b>true value</b> (bullseye) AND close together. 🎯", "Precise, not accurate": "Close <b>together</b> (precise) but away from the true value — maybe the equipment is faulty (e.g. a ruler with a worn end).", "Accurate, not precise": "Spread out, but their <b>average</b> is near the true value.", "Neither": "Spread out AND away from the true value." }[m]);
    }
    el.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { throwD(b.dataset.m); sfx.click(); });
    throwD("Accurate & precise");
  });

  /* ---------------- apparatus sort ---------------- */
  reg("apparatusSort", "Choose the apparatus", (el) => {
    WU.inlineQ(el, { t: "sort", q: "Which apparatus is best for each measurement?", buckets: ["15 cm ruler (mm)", "Metre rule (mm)", "10 m tape (cm)", "100 m tape (cm)"], items: [["Length of your thumb", 0], ["Height of a table", 1], ["Width of the classroom", 2], ["How far you run in 10 s", 3], ["Length of a pencil", 0], ["How far you walk in 2 s", 2]], ex: "Bigger distance → longer tape; small object → more precise ruler." });
  });

  /* ---------------- stopwatch reaction game ---------------- */
  reg("stopwatchGame", "Stopwatch challenge", (el) => {
    el.innerHTML = `<div style="text-align:center"><svg viewBox="0 0 200 200" style="max-width:220px;margin:0 auto"><circle cx="100" cy="110" r="80" fill="var(--card)" stroke="var(--ink2)" stroke-width="6"/><rect x="88" y="14" width="24" height="16" rx="4" fill="var(--ink2)"/>${Array.from({ length: 60 }, (_, i) => `<line x1="100" y1="${i % 5 ? 36 : 32}" x2="100" y2="40" stroke="var(--ink2)" stroke-width="${i % 5 ? 1 : 2.5}" transform="rotate(${i * 6} 100 110)"/>`).join("")}<line id="hand" x1="100" y1="110" x2="100" y2="44" stroke="#e5484d" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="110" r="6" fill="#e5484d"/></svg>
    <div id="disp" style="font-family:'Times New Roman',serif;font-size:40px;font-weight:700">0.00 s</div>
    <button class="btn" id="ss">▶ Start</button></div>
    <table class="mini-table" id="tb"><thead><tr><th>Try</th><th>Your time</th><th>Error</th></tr></thead><tbody></tbody></table>
    <div class="w-info">Start, then stop as close to <b>5.00 s</b> as you can — <b>without</b> watching the numbers (they hide after 1 s)!</div>`;
    let run = false, t0 = 0, stop = null, n = 0;
    const disp = el.querySelector("#disp"), hand = el.querySelector("#hand");
    el.querySelector("#ss").onclick = (e) => {
      if (!run) { run = true; t0 = performance.now(); e.target.textContent = "⏹ Stop!"; stop = raf(t => { const s = (t - t0) / 1000; disp.textContent = s < 1 ? s.toFixed(2) + " s" : "?.?? s"; hand.setAttribute("transform", `rotate(${s * 36} 100 110)`); }); }
      else {
        run = false; stop(); const s = (performance.now() - t0) / 1000; e.target.textContent = "▶ Start"; disp.textContent = s.toFixed(2) + " s"; hand.setAttribute("transform", `rotate(${s * 36} 100 110)`); n++;
        const err = s - 5; el.querySelector("tbody").insertAdjacentHTML("beforeend", `<tr><td>${n}</td><td>${s.toFixed(2)} s</td><td>${err > 0 ? "+" : ""}${err.toFixed(2)} s</td></tr>`);
        info(el, Math.abs(err) < .1 ? "🎯 Amazing! Within 0.1 s." : `You were ${Math.abs(err).toFixed(2)} s ${err > 0 ? "late" : "early"}. Human <b>reaction time</b> (~0.2 s) makes stopwatch timings less accurate. That's why we <b>repeat and average</b> — or use <b>light gates</b>.`);
        Math.abs(err) < .1 ? sfx.win() : sfx.click();
      }
    };
    return () => stop && stop();
  });

  /* ---------------- speed triangle calculator ---------------- */
  reg("speedTriangle", "Speed calculator", (el) => {
    el.innerHTML = `<svg viewBox="0 0 300 180" style="max-width:300px;margin:0 auto"><path d="M150 10 L290 170 L10 170Z" fill="var(--card)" stroke="var(--ink2)" stroke-width="3"/><line x1="60" y1="110" x2="240" y2="110" stroke="var(--ink2)" stroke-width="3"/><line x1="150" y1="110" x2="150" y2="170" stroke="var(--ink2)" stroke-width="3"/>
      <text class="hot" data-f="d" x="150" y="85" text-anchor="middle" font-family="Times New Roman" font-size="30" font-weight="700" fill="#0ea5a4">d</text><text class="hot" data-f="s" x="100" y="152" text-anchor="middle" font-family="Times New Roman" font-size="30" font-weight="700" fill="#e5484d">v</text><text class="hot" data-f="t" x="200" y="152" text-anchor="middle" font-family="Times New Roman" font-size="30" font-weight="700" fill="#6a5cff">t</text></svg>
    <div class="row" style="justify-content:center;gap:6px"><span class="muted" style="font-weight:800">Find:</span><button class="chip on" data-f="s">speed</button><button class="chip" data-f="d">distance</button><button class="chip" data-f="t">time</button></div>
    <div class="slider-row" id="r1"></div><div class="slider-row" id="r2"></div>
    <div class="equation" id="out"></div>
    <svg viewBox="0 0 400 60"><line x1="0" y1="50" x2="400" y2="50" stroke="var(--line)" stroke-width="3"/><text id="car" x="0" y="44" font-size="30">🏎️</text></svg>
    <div class="w-info">Tap what you want to find (or cover it on the triangle with your finger!).</div>`;
    let find = "s", d = 100, t = 20, v = 5;
    function rows() {
      const R = { d: ["distance (m)", 0, 1000, 10], t: ["time (s)", 1, 120, 1], s: ["speed (m/s)", 1, 40, 1] };
      const others = ["d", "t", "s"].filter(x => x !== find);
      others.forEach((k, i) => { const [l, mn, mx, st] = R[k]; const val = { d, t, s: v }[k]; const row = el.querySelector("#r" + (i + 1)); row.innerHTML = `${l} <input type="range" min="${mn}" max="${mx}" step="${st}" value="${val}"> <b>${val}</b>`; row.querySelector("input").oninput = e => { const x = +e.target.value; if (k === "d") d = x; if (k === "t") t = x; if (k === "s") v = x; row.querySelector("b").textContent = x; calc(); }; });
      el.querySelectorAll(".chip[data-f]").forEach(c => c.classList.toggle("on", c.dataset.f === find));
      el.querySelectorAll("text.hot").forEach(c => c.style.opacity = c.dataset.f === find ? .25 : 1);
      calc();
    }
    function calc() {
      const r = x => Math.round(x * 100) / 100;
      if (find === "s") { v = r(d / t); el.querySelector("#out").innerHTML = `speed = distance ÷ time = ${d} ÷ ${t} = <b>${v} m/s</b>`; }
      if (find === "d") { d = r(v * t); el.querySelector("#out").innerHTML = `distance = speed × time = ${v} × ${t} = <b>${d} m</b>`; }
      if (find === "t") { t = r(d / v); el.querySelector("#out").innerHTML = `time = distance ÷ speed = ${d} ÷ ${v} = <b>${t} s</b>`; }
      car.speed = (find === "s" ? v : find === "d" ? v : v);
    }
    const car = { x: 0, speed: 5 };
    el.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { find = b.dataset.f; rows(); sfx.click(); });
    rows();
    let last = 0;
    return raf(tt => { const dt = last ? Math.min(50, tt - last) : 16; last = tt; car.x = (car.x + car.speed * dt * 0.012) % 420; el.querySelector("#car").setAttribute("x", car.x - 30); });
  });

  /* ---------------- ramp with light gate ---------------- */
  reg("rampLab", "Toy car ramp + light gate", (el) => {
    el.innerHTML = `<svg viewBox="0 0 400 220"><path d="M20 40 L360 190 L20 190Z" fill="#c8a27a"/><line x1="20" y1="40" x2="360" y2="190" stroke="#8d6e4a" stroke-width="4"/>
      <g id="gate"><rect x="180" y="70" width="8" height="70" fill="#444"/><rect x="200" y="140" width="8" height="40" fill="#444"/><line x1="188" y1="100" x2="210" y2="120" stroke="#ff2d55" stroke-width="2" stroke-dasharray="3 3" id="beam"/></g>
      <g id="car"><rect x="-16" y="-14" width="32" height="12" rx="3" fill="#3b82f6"/><rect x="-6" y="-26" width="18" height="12" fill="#fff" stroke="#999"/><circle cx="-9" cy="0" r="5" fill="#222"/><circle cx="9" cy="0" r="5" fill="#222"/></g>
      <rect x="250" y="20" width="110" height="40" rx="6" fill="#111"/><text id="lt" x="305" y="48" text-anchor="middle" fill="#3cff7a" font-family="Times New Roman" font-size="20">0.000 s</text><text x="305" y="15" text-anchor="middle" font-size="10" fill="var(--muted)" font-weight="700">data logger</text></svg>
    <div class="w-controls"><button class="btn small" id="go">▶ Release car</button><label class="toggle"><input type="checkbox" id="sw"> Use a stopwatch instead</label><button class="btn small ghost" id="rs">Clear</button></div>
    <table class="mini-table"><thead><tr><th>Run</th><th>Time (s)</th><th>Speed (m/s)</th></tr></thead><tbody id="tb"></tbody></table>
    <div class="w-info">The 10 cm card on the car breaks the light beam halfway down the ramp. Speed = 0.10 m ÷ time.</div>`;
    const $ = s => el.querySelector(s); let busy = false, runs = [];
    const place = k => { const x = lerp(30, 350, k), y = lerp(44, 186, k); $("#car").setAttribute("transform", `translate(${x} ${y}) rotate(24)`); };
    place(0);
    $("#rs").onclick = () => { runs = []; $("#tb").innerHTML = ""; info(el, "Cleared."); };
    $("#go").onclick = () => {
      if (busy) return; busy = true; const sw = $("#sw").checked; const t0 = performance.now(); sfx.click();
      const anomaly = Math.random() < .15;
      const stop = raf(t => { const k = Math.min(1, Math.pow((t - t0) / 2200, 2)); place(k); $("#beam").setAttribute("stroke", Math.abs(k - .5) < .04 ? "#ffd400" : "#ff2d55"); if (k >= 1) { stop(); finish(); } });
      function finish() {
        busy = false; place(0);
        let tm = sw ? 0.2 * (0.6 + Math.random() * 0.8) + (Math.random() - .5) * .3 : 0.095 + (Math.random() - .5) * .006; if (!sw && anomaly) tm *= 1.6; tm = Math.max(.02, tm);
        $("#lt").textContent = tm.toFixed(3) + " s"; const sp = .1 / tm; runs.push(tm);
        $("#tb").insertAdjacentHTML("beforeend", `<tr><td>${runs.length}</td><td>${tm.toFixed(3)}</td><td>${sp.toFixed(2)}</td></tr>`);
        const avg = runs.reduce((a, b) => a + b, 0) / runs.length;
        const anomalous = runs.filter(r => Math.abs(r - avg) > avg * .25);
        info(el, (sw ? "⏱ With a stopwatch, the times are all over the place — your <b>reaction time</b> is bigger than the time being measured! " : "Light gates measure to 0.001 s automatically. ") + (runs.length >= 3 ? `Average of ${runs.length} runs: <b>${avg.toFixed(3)} s</b>. ${anomalous.length && !sw ? "⚠️ One looks <b>anomalous</b> — leave it out and repeat." : ""}` : "Repeat at least 3 times."));
      }
    };
  });

  /* ---------------- distance/time graph builder ---------------- */
  reg("dtGraph", "Journey → distance/time graph", (el) => {
    // segments: [duration s, speed m/s]
    const J = {
      "Constant speed": [[10, 3]],
      "Run then stop": [[3, 10], [7, 0]],
      "Walk, rest, run": [[4, 2], [3, 0], [3, 6]],
      "Speeding up": "acc",
      "Walk there and back": [[5, 4], [2, 0], [3, -6.67]]
    };
    el.innerHTML = `<div class="row" style="gap:6px">${Object.keys(J).map((k, i) => `<button class="chip ${i ? "" : "on"}" data-j="${k}">${k}</button>`).join("")}</div>
    <svg viewBox="0 0 400 70"><line x1="10" y1="56" x2="390" y2="56" stroke="var(--line)" stroke-width="3"/>${[0, 10, 20, 30].map(m => `<line x1="${20 + m * 12}" x2="${20 + m * 12}" y1="52" y2="60" stroke="var(--muted)"/><text x="${20 + m * 12}" y="69" font-size="9" text-anchor="middle" fill="var(--muted)">${m} m</text>`).join("")}<text id="run" x="0" y="50" font-size="28">🏃</text></svg>
    <svg viewBox="0 0 400 240"><rect width="400" height="240" fill="var(--card)"/><line x1="40" y1="210" x2="390" y2="210" stroke="var(--ink2)"/><line x1="40" y1="10" x2="40" y2="210" stroke="var(--ink2)"/>
      ${[0, 2, 4, 6, 8, 10].map(s => `<text x="${40 + s * 34}" y="224" font-size="10" text-anchor="middle" fill="var(--muted)">${s}</text>`).join("")}${[0, 10, 20, 30].map(m => `<text x="34" y="${210 - m * 6.3 + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${m}</text><line x1="40" x2="390" y1="${210 - m * 6.3}" y2="${210 - m * 6.3}" stroke="var(--line)" stroke-dasharray="3 4"/>`).join("")}
      <text x="215" y="238" font-size="11" text-anchor="middle" font-weight="700" fill="var(--ink2)">time (s)</text><text x="12" y="110" font-size="11" text-anchor="middle" font-weight="700" fill="var(--ink2)" transform="rotate(-90 12 110)">distance (m)</text>
      <polyline id="pl" fill="none" stroke="#0ea5a4" stroke-width="3.5" stroke-linejoin="round"/><circle id="dot" r="6" fill="#e5484d"/></svg>
    <div class="w-info"></div>`;
    const $ = s => el.querySelector(s); let stop = null;
    function dist(name, t) {
      const j = J[name]; if (j === "acc") return 0.3 * t * t;
      let d = 0, tt = 0; for (const [dur, sp] of j) { const step = Math.min(dur, Math.max(0, t - tt)); d += sp * step; tt += dur; } return d;
    }
    const DESC = { "Constant speed": "A <b>straight sloping line</b> = constant speed. Gradient = 30 m ÷ 10 s = <b>3 m/s</b>.", "Run then stop": "Steep line (fast: 10 m/s) then a <b>flat line</b> — stopped. Distance doesn't change while you stand still.", "Walk, rest, run": "Gentle slope (walk), flat (rest), <b>steeper</b> slope (run — faster!).", "Speeding up": "A <b>curve getting steeper</b> → speed increasing (accelerating).", "Walk there and back": "Line goes up, flat (rest), then <b>slopes down</b> — walking back towards the start." };
    function play(name) {
      if (stop) stop(); el.querySelectorAll("[data-j]").forEach(c => c.classList.toggle("on", c.dataset.j === name)); info(el, DESC[name]);
      const t0 = performance.now(); const pts = [];
      stop = raf(t => { const s = Math.min(10, (t - t0) / 600); const d = dist(name, s); pts.push(`${40 + s * 34},${210 - d * 6.3}`); $("#pl").setAttribute("points", pts.join(" ")); $("#dot").setAttribute("cx", 40 + s * 34); $("#dot").setAttribute("cy", 210 - d * 6.3); $("#run").setAttribute("x", 6 + d * 12); $("#run").textContent = s >= 10 ? "🧍" : "🏃"; if (s >= 10) { stop(); stop = null; } });
      sfx.click();
    }
    el.querySelectorAll("[data-j]").forEach(b => b.onclick = () => play(b.dataset.j));
    play("Constant speed");
    return () => stop && stop();
  });

  /* ---------------- gradient tool ---------------- */
  reg("gradientTool", "Measure the gradient", (el) => {
    el.innerHTML = `<svg viewBox="0 0 400 260" style="touch-action:none"><rect width="400" height="260" fill="var(--card)"/><line x1="40" y1="220" x2="390" y2="220" stroke="var(--ink2)"/><line x1="40" y1="10" x2="40" y2="220" stroke="var(--ink2)"/>
      ${[0, 2, 4, 6, 8, 10].map(s => `<text x="${40 + s * 34}" y="236" font-size="10" text-anchor="middle" fill="var(--muted)">${s}</text>`).join("")}${[0, 10, 20, 30, 40].map(m => `<text x="34" y="${220 - m * 5 + 3}" font-size="10" text-anchor="end" fill="var(--muted)">${m}</text>`).join("")}
      <text x="215" y="254" font-size="11" text-anchor="middle" font-weight="700" fill="var(--ink2)">time (s)</text>
      <line id="ln" x1="40" y1="220" stroke="#0ea5a4" stroke-width="3.5"/>
      <line id="hx" stroke="#e5484d" stroke-width="2" stroke-dasharray="5 4"/><line id="vy" stroke="#6a5cff" stroke-width="2" stroke-dasharray="5 4"/>
      <text id="tx" font-size="12" font-weight="800" fill="#e5484d"></text><text id="ty" font-size="12" font-weight="800" fill="#6a5cff"></text>
      <circle id="hd" r="11" fill="#0ea5a4" stroke="#fff" stroke-width="3" style="cursor:grab"/></svg>
    <div class="equation" id="eq"></div>
    <div class="w-info">Drag the teal handle to change the line. The gradient (rise ÷ run) = speed.</div>`;
    const svg = el.querySelector("svg"); let P = [10, 30], drag = false;
    const X = s => 40 + s * 34, Y = m => 220 - m * 5;
    function draw() {
      const [s, m] = P; const set = (id, a) => Object.entries(a).forEach(([k, v]) => el.querySelector(id).setAttribute(k, v));
      set("#ln", { x2: X(s), y2: Y(m) }); set("#hd", { cx: X(s), cy: Y(m) }); set("#hx", { x1: X(0), y1: 220, x2: X(s), y2: 220 }); set("#vy", { x1: X(s), y1: 220, x2: X(s), y2: Y(m) });
      const tx = el.querySelector("#tx"); tx.setAttribute("x", X(s / 2) - 20); tx.setAttribute("y", 214); tx.textContent = s.toFixed(1) + " s";
      const ty = el.querySelector("#ty"); ty.setAttribute("x", X(s) + 6); ty.setAttribute("y", Y(m / 2)); ty.textContent = Math.round(m) + " m";
      el.querySelector("#eq").innerHTML = `gradient = ${Math.round(m)} m ÷ ${s.toFixed(1)} s = <b>${(m / s).toFixed(1)} m/s</b>`;
    }
    function pt(e) { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 400 / r.width, (e.clientY - r.top) * 260 / r.height]; }
    svg.addEventListener("pointerdown", e => { drag = true; svg.setPointerCapture(e.pointerId); });
    svg.addEventListener("pointermove", e => { if (!drag) return; const [x, y] = pt(e); P = [Math.max(1, Math.min(10, (x - 40) / 34)), Math.max(0, Math.min(40, (220 - y) / 5))]; draw(); });
    svg.addEventListener("pointerup", () => { drag = false; sfx.click(); });
    draw();
  });
})();
