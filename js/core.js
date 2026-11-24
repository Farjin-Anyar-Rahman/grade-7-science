/* ===== Core helpers: storage, XP, sound, toast, confetti ===== */
(function () {
  const KEY = "alaanScienceLab.v1";
  const def = { xp: 0, answered: 0, correct: 0, topicsRead: {}, best: {}, wrong: {}, known: {}, sound: true, theme: null };
  let S;
  try { S = Object.assign({}, def, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = Object.assign({}, def); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  const LEVELS = [
    [0, "Cell Rookie"], [150, "Lab Assistant"], [400, "Junior Scientist"], [800, "Biology Boss"],
    [1400, "Science Star"], [2200, "Professor"], [3200, "Nobel Legend"]
  ];
  function level(xp) {
    let i = 0; while (i < LEVELS.length - 1 && xp >= LEVELS[i + 1][0]) i++;
    const cur = LEVELS[i][0], nxt = LEVELS[i + 1] ? LEVELS[i + 1][0] : cur + 1000;
    return { n: i + 1, name: LEVELS[i][1], pct: Math.min(100, ((xp - cur) / (nxt - cur)) * 100), next: nxt };
  }

  /* ---- sound (tiny WebAudio blips) ---- */
  let ctx;
  function tone(freqs, dur = 0.09, type = "sine", vol = 0.06) {
    if (!S.sound) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      let t = ctx.currentTime;
      freqs.forEach(f => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur); t += dur * 0.85;
      });
    } catch (e) {}
  }
  const sfx = {
    good: () => tone([660, 880, 1320], 0.08, "triangle"),
    bad: () => tone([220, 160], 0.14, "sawtooth", 0.035),
    click: () => tone([520], 0.04, "square", 0.02),
    win: () => tone([523, 659, 784, 1047, 1319], 0.1, "triangle")
  };

  /* ---- toast ---- */
  let tt;
  function toast(msg) {
    const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---- confetti ---- */
  function confetti(n = 140) {
    const c = document.getElementById("confetti"), g = c.getContext("2d");
    c.width = innerWidth; c.height = innerHeight;
    const cols = ["#ff5c8a", "#6a5cff", "#ffd65a", "#2fd3a0", "#00b3c7", "#ff8a3d"];
    const P = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 16, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 4, c: cols[(Math.random() * cols.length) | 0], a: Math.random() * 6, va: (Math.random() - .5) * .4 }));
    let f = 0;
    (function loop() {
      g.clearRect(0, 0, c.width, c.height);
      P.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .42; p.vx *= .99; p.a += p.va; g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); g.restore(); });
      if (++f < 160) requestAnimationFrame(loop); else g.clearRect(0, 0, c.width, c.height);
    })();
  }

  function addXP(n) {
    if (n <= 0) return;
    const before = level(S.xp).n;
    S.xp += n; save(); renderXP(true);
    if (level(S.xp).n > before) { setTimeout(() => { toast("🎉 Level up! You're now a " + level(S.xp).name); confetti(); sfx.win(); }, 400); }
  }
  function renderXP(bump) {
    const L = level(S.xp);
    document.getElementById("xpVal").textContent = S.xp;
    document.getElementById("lvlName").textContent = L.name;
    if (bump) { const p = document.getElementById("xpPill"); p.classList.remove("bump"); void p.offsetWidth; p.classList.add("bump"); }
  }

  /* ---- text helpers ---- */
  const norm = s => String(s).toLowerCase().replace(/[₂]/g, "2").replace(/[^a-z0-9.+ ]/g, " ").replace(/\s+/g, " ").trim();
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    const d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---- content index ---- */
  function allTopics() { const r = []; (window.CHAPTERS || []).forEach(c => c.topics.forEach(t => r.push(Object.assign({ chapter: c }, t)))); return r; }
  function findTopic(id) { return allTopics().find(t => t.id === id); }
  function chapter(id) { return (window.CHAPTERS || []).find(c => String(c.id) === String(id)); }
  function questionsFor(scope) {
    // scope: topic id "1.1", "ch1", "all"
    const out = [];
    (window.CHAPTERS || []).forEach(c => {
      c.topics.forEach(t => t.quiz.forEach((q, i) => out.push(Object.assign({ id: t.id + "#" + i, topic: t.id, ch: c.id, color: c.color }, q))));
      (c.review || []).forEach((q, i) => out.push(Object.assign({ id: "ch" + c.id + "r#" + i, topic: "ch" + c.id, ch: c.id, color: c.color }, q)));
    });
    if (scope === "all") return out;
    if (/^ch\d+$/.test(scope)) return out.filter(q => "ch" + q.ch === scope);
    return out.filter(q => q.topic === scope);
  }
  function qById(id) { return questionsFor("all").find(q => q.id === id); }

  window.Lab = { S, save, level, sfx, toast, confetti, addXP, renderXP, norm, lev, shuffle, h, esc, css, allTopics, findTopic, chapter, questionsFor, qById, KEY };
})();
