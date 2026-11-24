/* ===== App: router + pages ===== */
(function () {
  const { S, save, h, esc, shuffle, toast, confetti, sfx, addXP, renderXP, level, allTopics, findTopic, chapter, questionsFor, qById } = Lab;
  const app = document.getElementById("app");
  let cleanup = [];
  const onLeave = fn => cleanup.push(fn);

  /* ---------- theme / sound / menu ---------- */
  function applyTheme() {
    if (S.theme) document.documentElement.setAttribute("data-theme", S.theme); else document.documentElement.removeAttribute("data-theme");
    const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.getElementById("themeBtn").textContent = dark ? "☀️" : "🌙";
  }
  document.getElementById("themeBtn").onclick = () => {
    const dark = S.theme ? S.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    S.theme = dark ? "light" : "dark"; save(); applyTheme(); route();
  };
  document.getElementById("soundBtn").onclick = () => { S.sound = !S.sound; save(); document.getElementById("soundBtn").textContent = S.sound ? "🔊" : "🔇"; toast(S.sound ? "Sound on" : "Sound off"); };
  document.getElementById("soundBtn").textContent = S.sound ? "🔊" : "🔇";
  document.getElementById("menuBtn").onclick = () => document.querySelector(".topnav").classList.toggle("open");
  document.getElementById("resetBtn").onclick = () => { if (confirm("Reset all XP, scores and progress on this device?")) { localStorage.removeItem(Lab.KEY); location.hash = "#/"; location.reload(); } };
  applyTheme(); renderXP();

  /* ---------- stats helpers ---------- */
  function topicPct(t) {
    const read = S.topicsRead[t.id] ? 50 : 0;
    const best = S.best[t.id] ? Math.round(S.best[t.id] * 50) : 0;
    return Math.min(100, read + best);
  }
  function recordResult(res) {
    S.answered++; if (res.score === res.max) S.correct++;
    if (res.score < res.max) S.wrong[res.q.id] = (S.wrong[res.q.id] || 0) + 1; else if (S.wrong[res.q.id]) delete S.wrong[res.q.id];
    save(); addXP(res.score * 10);
  }

  /* ---------- HOME ---------- */
  function home() {
    const L = level(S.xp);
    const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
    const totalQ = questionsFor("all").length;
    const wrongN = Object.keys(S.wrong).filter(qById).length;
    const v = h(`<div>
      <section class="hero">
        <div>
          <h1>Hi Alaan <span class="wave">👋</span></h1>
          <p class="lead">Your own science lab for the mid-terms: <b>${CHAPTERS.map(c => "Ch " + c.id).join(", ")}</b>. Explore the animations, then smash the questions. Every correct mark = <b>+10 XP</b>.</p>
          <div class="row" style="margin-top:14px">
            <a class="btn" href="#/topic/1.1">▶ Start learning</a>
            <a class="btn warn" href="#/quiz/all">⚡ Quick quiz (all)</a>
          </div>
        </div>
        <div class="hero-art">${heroArt()}</div>
      </section>
      <div class="stats">
        <div class="stat"><div class="l">Level ${L.n}</div><div class="n">${esc(L.name)}</div><div class="level-bar"><i style="width:${L.pct}%"></i></div></div>
        <div class="stat"><div class="l">XP</div><div class="n">⭐ ${S.xp}</div></div>
        <div class="stat"><div class="l">Answered</div><div class="n">${S.answered}</div><div class="muted" style="font-size:13px">${totalQ} questions in the bank</div></div>
        <div class="stat"><div class="l">Accuracy</div><div class="n">${acc}%</div></div>
      </div>
      <h2 class="section-title">📚 Chapters</h2>
      <div class="grid g2" id="chaps"></div>
      <h2 class="section-title">🧰 Power tools</h2>
      <div class="grid g4">
        <a class="card tool-card" href="#/exam"><span class="ti">📝</span><h4>Exam mode</h4><p>Timed 25-mark paper, marked at the end — just like the real test.</p></a>
        <a class="card tool-card" href="#/cards"><span class="ti">🃏</span><h4>Flashcards</h4><p>Flip through every key term. Swipe what you know.</p></a>
        <a class="card tool-card" href="#/clinic"><span class="ti">🩹</span><h4>Test fixes</h4><p>The marks lost on the class test — and how to win them back.</p></a>
        <a class="card tool-card" href="#/quiz/mistakes"><span class="ti">🔁</span><h4>Retry mistakes</h4><p>${wrongN ? wrongN + " question" + (wrongN > 1 ? "s" : "") + " to fix" : "No mistakes saved yet 🎯"}</p></a>
      </div>
    </div>`);
    const chaps = v.querySelector("#chaps");
    CHAPTERS.forEach(c => {
      const card = h(`<div class="card chapter-card" style="--chap:${c.color}">
        <div class="ch-head"><div class="num">Chapter ${c.id}</div><h3>${esc(c.title)}</h3><p>${esc(c.blurb)}</p><span class="big-emoji">${c.emoji}</span></div>
        <div class="topic-list">${c.topics.map(t => { const p = topicPct(t); return `<a class="topic-row" href="#/topic/${t.id}"><span class="t-emoji">${t.emoji}</span><span><div class="t-title">${t.id} ${esc(t.title)}</div><div class="t-sub">${t.sections.length} lessons · ${t.quiz.length} questions${S.best[t.id] != null ? " · best " + Math.round(S.best[t.id] * 100) + "%" : ""}</div></span><span class="ring" style="--p:${p}" data-l="${p}%"></span></a>`; }).join("")}</div>
        <div class="ch-actions"><a class="btn small" style="--brand:${c.color}" href="#/quiz/ch${c.id}">Chapter ${c.id} quiz</a><a class="btn small ghost" href="#/exam/ch${c.id}">Chapter ${c.id} exam</a><a class="btn small ghost" href="#/cards/ch${c.id}">Flashcards</a></div>
      </div>`);
      chaps.appendChild(card);
    });
    return v;
  }
  function heroArt() {
    return `<svg viewBox="0 0 300 260" aria-label="Animated heart and cells">
      <defs><radialGradient id="hg" cx=".4" cy=".35"><stop offset="0" stop-color="#ff8fa6"/><stop offset="1" stop-color="#d7263d"/></radialGradient>
      <radialGradient id="rbc" cx=".5" cy=".5"><stop offset=".35" stop-color="#b3132b"/><stop offset=".7" stop-color="#e5484d"/><stop offset="1" stop-color="#c81d3a"/></radialGradient></defs>
      <circle cx="150" cy="130" r="112" fill="var(--card)" stroke="var(--line)" stroke-width="2"/>
      <circle cx="150" cy="130" r="112" fill="none" stroke="#6a5cff" stroke-width="3" stroke-dasharray="10 14" opacity=".5"><animateTransform attributeName="transform" type="rotate" from="0 150 130" to="360 150 130" dur="30s" repeatCount="indefinite"/></circle>
      <g class="beat"><path d="M150 205 C80 160 70 110 100 92 C122 80 142 92 150 110 C158 92 178 80 200 92 C230 110 220 160 150 205Z" fill="url(#hg)"/>
      <path d="M118 104 C112 112 112 124 118 132" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5"/></g>
      <polyline points="40,232 100,232 112,214 124,250 136,226 146,232 260,232" fill="none" stroke="#2fd3a0" stroke-width="3" stroke-linejoin="round" stroke-dasharray="320" stroke-dashoffset="320"><animate attributeName="stroke-dashoffset" values="320;0;-320" dur="2s" repeatCount="indefinite"/></polyline>
      ${[[40, 60, 0], [250, 70, 1.2], [60, 190, .6], [255, 180, 2]].map(([x, y, d]) => `<g transform="translate(${x} ${y})"><g class="wiggle" style="animation-delay:${d}s"><ellipse rx="16" ry="16" fill="url(#rbc)"/><ellipse rx="7" ry="7" fill="#a50f25" opacity=".6"/></g></g>`).join("")}
      <g transform="translate(232 120)"><g class="wiggle" style="animation-delay:.3s"><circle r="15" fill="#f4f1ff" stroke="#b9b0ff" stroke-width="2"/><path d="M-6 -3 q4 -6 8 0 q4 6 -2 8 q-8 2 -6 -8z" fill="#7c5cff"/></g></g>
      <text x="150" y="30" text-anchor="middle" font-size="14" font-weight="800" fill="var(--muted)">♥ 72 bpm</text>
    </svg>`;
  }

  /* ---------- TOPIC ---------- */
  function topic(id) {
    const t = findTopic(id); if (!t) return notFound();
    const c = t.chapter; const idx = c.topics.indexOf(c.topics.find(x => x.id === id));
    const prev = c.topics[idx - 1], next = c.topics[idx + 1] || (CHAPTERS[CHAPTERS.indexOf(c) + 1] || {}).topics?.[0];
    const v = h(`<div style="--chap:${c.color}">
      <div class="read-progress"></div>
      <div class="crumbs"><a href="#/">Home</a> › Chapter ${c.id}: ${esc(c.title)} › ${t.id}</div>
      <section class="topic-hero"><div style="opacity:.85;font-weight:800">Topic ${t.id}</div><h1>${esc(t.title)}</h1><div class="tag">${esc(t.tagline)}</div>
        <div class="toc">${t.sections.map((s, i) => `<a href="#/topic/${t.id}/${i}" data-jump="${i}">${i + 1}. ${esc(s.h)}</a>`).join("")}<a href="#/quiz/${t.id}" style="background:rgba(255,255,255,.35)">⚡ Quiz</a></div>
        <span class="hero-emoji">${t.emoji}</span></section>
      <div id="lessons"></div>
      <div class="lesson card"><h2>✅ Key facts</h2><div class="facts">${t.keyFacts.map(f => `<div class="fact">${esc(f)}</div>`).join("")}</div></div>
      <div class="lesson card"><h2>🔑 Key terms <span class="muted" style="font-size:15px;font-family:'Times New Roman',serif">tap to flip</span></h2><div class="terms">${t.terms.map(([a, b]) => `<div class="term"><div class="in"><div class="f">${esc(a)}</div><div class="b">${esc(b)}</div></div></div>`).join("")}</div></div>
      <div class="lesson card quiz-cta"><span class="big">🧪</span><h2 style="justify-content:center">Ready to test yourself?</h2><p class="muted">${t.quiz.length} questions on ${esc(t.title)} — multiple choice, calculations, sorting, written answers.</p>
        <div class="row" style="justify-content:center"><a class="btn" href="#/quiz/${t.id}">Start the ${t.id} quiz ⚡</a>${next ? `<a class="btn ghost" href="#/topic/${next.id}">Next topic: ${esc(next.title)} →</a>` : ""}</div></div>
    </div>`);
    const L = v.querySelector("#lessons");
    t.sections.forEach((s, i) => {
      const sec = h(`<section class="lesson card" id="sec-${i}"><h2><span class="sn">${i + 1}</span>${esc(s.h)}</h2><div class="lesson-body ${s.widget ? "" : "solo"}"><div class="lesson-text">${s.html}</div></div></section>`);
      if (s.widget && W[s.widget]) {
        const wbox = h(`<div class="widget"><div class="w-title">${esc(W[s.widget].title)}</div><div class="w-body"></div></div>`);
        sec.querySelector(".lesson-body").appendChild(wbox);
        try { const stop = W[s.widget].init(wbox.querySelector(".w-body"), c.color); if (typeof stop === "function") onLeave(stop); } catch (e) { console.error(s.widget, e); wbox.querySelector(".w-body").textContent = "(animation failed to load)"; }
      }
      L.appendChild(sec);
    });
    v.querySelectorAll(".term").forEach(x => x.onclick = () => { x.classList.toggle("flip"); sfx.click(); });
    v.querySelectorAll("[data-jump]").forEach(a => a.onclick = (e) => { e.preventDefault(); document.getElementById("sec-" + a.dataset.jump).scrollIntoView({ behavior: "smooth", block: "start" }); });

    // reveal-on-scroll + read progress + mark read
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); } }), { threshold: 0.08 });
    setTimeout(() => v.querySelectorAll(".lesson").forEach(x => io.observe(x)));
    const bar = v.querySelector(".read-progress");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 1; bar.style.width = p * 100 + "%";
      if (p > 0.85 && !S.topicsRead[t.id]) { S.topicsRead[t.id] = 1; save(); addXP(30); toast("📖 Topic " + t.id + " read! +30 XP"); }
    };
    addEventListener("scroll", onScroll, { passive: true }); onLeave(() => { removeEventListener("scroll", onScroll); io.disconnect(); });
    return v;
  }

  /* ---------- QUIZ (practice) ---------- */
  function quiz(scope) {
    let pool, title, color;
    if (scope === "mistakes") { pool = Object.keys(S.wrong).map(qById).filter(Boolean); title = "Retry your mistakes"; color = "#ff7a1a"; }
    else if (scope === "all") { pool = shuffle(questionsFor("all")).slice(0, 15); title = "Quick quiz — everything"; color = "#6a5cff"; }
    else if (/^ch\d+$/.test(scope)) { const c = chapter(scope.slice(2)); pool = shuffle(questionsFor(scope)).slice(0, 20); title = "Chapter " + c.id + " quiz: " + c.title; color = c.color; }
    else { const t = findTopic(scope); if (!t) return notFound(); pool = shuffle(questionsFor(scope)); title = t.id + " " + t.title + " quiz"; color = t.chapter.color; }
    const v = h(`<div class="quiz-wrap" style="--chap:${color}"><div class="crumbs"><a href="#/">Home</a> › ${esc(title)}</div><div id="qz"></div></div>`);
    const box = v.querySelector("#qz");
    if (!pool.length) { box.appendChild(h(`<div class="card result"><div class="score-big">🎯</div><h2>Nothing to retry!</h2><p class="muted">Questions you get wrong are saved here so you can try them again.</p><a class="btn" href="#/">Back home</a></div>`)); return v; }
    let i = 0, got = 0, max = 0, streak = 0; const log = [];
    function next() {
      box.innerHTML = "";
      if (i >= pool.length) return finish();
      const top = h(`<div class="q-top"><span class="muted" style="font-weight:800">${i + 1}/${pool.length}</span><div class="q-bar"><i style="width:${(i / pool.length) * 100}%"></i></div><span class="streak ${streak >= 3 ? "hot" : ""}">${streak >= 2 ? "🔥 " + streak : ""}</span></div>`);
      box.appendChild(top);
      const q = pool[i];
      const api = Quiz.render(q, {
        mode: "practice",
        onResult(res) { got += res.score; max += res.max; log.push(res); recordResult(res); streak = res.score === res.max ? streak + 1 : 0; if (streak && streak % 5 === 0) { toast("🔥 " + streak + " in a row! +20 bonus XP"); addXP(20); } },
        onAdjust(res, old) { got += res.score - old; addXP(Math.max(0, (res.score - old) * 10)); if (res.score === res.max) { delete S.wrong[q.id]; save(); } },
        afterCheck(actions) { const b = h(`<button class="btn">${i + 1 < pool.length ? "Next →" : "See results 🏁"}</button>`); b.onclick = () => { i++; next(); }; actions.appendChild(b); b.focus({ preventScroll: true }); }
      });
      box.appendChild(api.el);
      const f = api.el.querySelector("input,textarea"); if (f && matchMedia("(pointer:fine)").matches) f.focus({ preventScroll: true });
    }
    function finish() {
      const pct = max ? got / max : 0;
      if (scope !== "all" && scope !== "mistakes") { if (!S.best[scope] || pct > S.best[scope]) { S.best[scope] = pct; save(); } }
      const stars = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .4 ? 1 : 0;
      const msg = ["Keep going — read the explainer again and retry! 💪", "Good start! Check the ones you missed. 👍", "Great work! Almost there! 🌟", "Superstar! Science legend! 🏆"][stars];
      const r = h(`<div class="card result"><div class="muted" style="font-weight:800">RESULT</div><div class="score-big">${got}/${max}</div><div class="stars">${[0, 1, 2].map(k => `<span class="${k < stars ? "on" : ""}" style="animation-delay:${k * .25}s">⭐</span>`).join("")}</div><h2>${msg}</h2>
        <div class="row" style="justify-content:center"><button class="btn" id="again">Try again 🔁</button>${Object.keys(S.wrong).length ? `<a class="btn warn" href="#/quiz/mistakes">Retry mistakes</a>` : ""}<a class="btn ghost" href="#/">Home</a></div>
        <div class="review-list">${log.map((x, k) => `<div class="review-item ${x.score === x.max ? "" : x.score ? "part" : "bad"}"><b>${k + 1}.</b> ${esc(x.q.q.replace("____", "___"))}<br><span class="muted">You: ${esc(x.your)} · ${x.score}/${x.max}</span>${x.score < x.max ? `<br>✔ ${esc(x.right)}` : ""}</div>`).join("")}</div></div>`);
      box.appendChild(r);
      r.querySelector("#again").onclick = () => route();
      if (stars >= 2) { confetti(); sfx.win(); }
    }
    next();
    return v;
  }

  /* ---------- EXAM ---------- */
  function examPick() {
    const v = h(`<div><div class="crumbs"><a href="#/">Home</a> › Exam mode</div>
      <div class="card" style="text-align:center;padding:34px"><div style="font-size:60px">📝</div><h1>Exam mode</h1><p class="muted" style="max-width:560px;margin:0 auto 18px">A timed paper worth about <b>25 marks</b> in <b>30 minutes</b> — the same as your class test. No hints until you hand it in. Then you get every answer marked with explanations.</p>
      <div class="row" style="justify-content:center">${CHAPTERS.map(c => `<a class="btn" style="--brand:${c.color}" href="#/exam/ch${c.id}">Chapter ${c.id} paper</a>`).join("")}<a class="btn warn" href="#/exam/ch1-2">Chapters 1 + 2 (like the class test)</a><a class="btn good" href="#/exam/all">Full mid-term mix</a></div></div></div>`);
    return v;
  }
  function examRun(scope) {
    const src = shuffle(scope === "ch1-2" ? questionsFor("ch1").concat(questionsFor("ch2")) : questionsFor(scope)); if (!src.length) return notFound();
    // pick up to 25 marks, prefer type variety
    const paper = []; let m = 0; const typeCount = {};
    for (const q of src) { const mk = Quiz.marksOf(q); if (m + mk > 25) continue; if ((typeCount[q.t] || 0) >= (q.t === "mcq" ? 5 : 3)) continue; paper.push(q); m += mk; typeCount[q.t] = (typeCount[q.t] || 0) + 1; if (m >= 25) break; }
    for (const q of src) { if (m >= 25) break; if (!paper.includes(q) && m + Quiz.marksOf(q) <= 25) { paper.push(q); m += Quiz.marksOf(q); } }
    const order = { fill: 0, mcq: 1, tf: 2, match: 3, sort: 4, order: 5, num: 6, short: 7 }; paper.sort((a, b) => order[a.t] - order[b.t]);
    const label = scope === "all" ? "Mid-term (all chapters)" : scope === "ch1-2" ? "Chapters 1 and 2" : "Chapter " + scope.slice(2);
    const v = h(`<div class="quiz-wrap" style="--chap:#6a5cff"><div class="crumbs"><a href="#/">Home</a> › <a href="#/exam">Exam</a> › ${label}</div>
      <div class="card" style="position:sticky;top:64px;z-index:5;padding:12px 18px;margin-bottom:14px"><div class="row"><b>Grade 7 Class Test — ${label}</b><span class="muted">Total: ${m} marks</span><span class="spacer"></span><span class="timer" id="tm">30:00</span></div></div>
      <div class="card paper" id="paper"></div>
      <div style="text-align:center;margin-top:18px"><button class="btn good" id="submit">Hand in my paper ✋</button></div></div>`);
    const P = v.querySelector("#paper"); const apis = paper.map((q, k) => { const a = Quiz.render(q, { mode: "exam", num: k + 1 }); P.appendChild(a.el); return a; });
    let left = 30 * 60; const tm = v.querySelector("#tm");
    const iv = setInterval(() => { left--; tm.textContent = String((left / 60) | 0).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0"); if (left <= 120) tm.classList.add("low"); if (left <= 0) { toast("⏰ Time's up!"); submit(); } }, 1000);
    onLeave(() => clearInterval(iv));
    function submit() {
      clearInterval(iv); let got = 0;
      const results = apis.map(a => { const r = a.check(); recordResult(r); a.reveal(); got += r.score; return r; });
      const pct = got / m; const grade = pct >= .9 ? "A*" : pct >= .8 ? "A" : pct >= .7 ? "B" : pct >= .6 ? "C" : pct >= .5 ? "D" : "E";
      const sub = v.querySelector("#submit"); sub.remove();
      const r = h(`<div class="card result" style="margin-bottom:16px"><div class="muted" style="font-weight:800">YOUR MARK</div><div class="score-big">${got}/${m}</div><h2>Grade ${grade} · ${Math.round(pct * 100)}%</h2><p class="muted">Scroll down — every question is marked with the correct answer and an explanation. Written answers: check the model answer and adjust your mark if needed.</p><div class="row" style="justify-content:center"><button class="btn" id="again">New paper 🔁</button><a class="btn ghost" href="#/">Home</a></div></div>`);
      P.parentNode.insertBefore(r, P); r.scrollIntoView({ behavior: "smooth" });
      r.querySelector("#again").onclick = () => route();
      if (pct >= .7) { confetti(); sfx.win(); }
    }
    v.querySelector("#submit").onclick = () => { const blank = apis.filter(a => !a.ready()).length; if (blank && !confirm(blank + " question(s) not answered. Hand in anyway?")) return; submit(); };
    return v;
  }

  /* ---------- FLASHCARDS ---------- */
  function cards(scope) {
    let deck = [];
    CHAPTERS.forEach(c => { if (scope && scope !== "ch" + c.id) return; c.topics.forEach(t => t.terms.forEach(([a, b]) => deck.push({ a, b, t: t.id, color: c.color }))); });
    deck = shuffle(deck);
    const v = h(`<div><div class="crumbs"><a href="#/">Home</a> › Flashcards</div>
      <div class="row" style="justify-content:center;margin-bottom:16px"><a class="chip ${!scope ? "on" : ""}" href="#/cards">All</a>${CHAPTERS.map(c => `<a class="chip ${scope === "ch" + c.id ? "on" : ""}" href="#/cards/ch${c.id}">Chapter ${c.id}</a>`).join("")}</div>
      <div class="muted" style="text-align:center;margin-bottom:10px;font-weight:700" id="cnt"></div>
      <div class="fc-stage" id="stage"></div>
      <div class="row" style="justify-content:center;margin-top:20px"><button class="btn warn" id="no">😅 Still learning</button><button class="btn ghost" id="flip">Flip ↻</button><button class="btn good" id="yes">😎 I know it</button></div>
      <p class="muted" style="text-align:center;font-size:14px">Keys: Space = flip · ← still learning · → know it</p></div>`);
    const stage = v.querySelector("#stage"); let k = 0, known = 0;
    function draw() {
      if (k >= deck.length) { stage.innerHTML = `<div class="card result"><div class="score-big">🎉</div><h2>Deck done! You knew ${known}/${deck.length}</h2><button class="btn" onclick="location.reload()">Shuffle again</button></div>`; confetti(); return; }
      const d = deck[k]; v.querySelector("#cnt").textContent = `Card ${k + 1} of ${deck.length} · Topic ${d.t}`;
      stage.innerHTML = ""; const c = h(`<div class="fc" style="--chap:${d.color}"><div class="f"><small>Key term</small>${esc(d.a)}</div><div class="b"><small>Meaning</small>${esc(d.b)}</div></div>`);
      stage.appendChild(c); stage.onclick = () => { c.classList.toggle("flip"); sfx.click(); };
    }
    function go(ok) { const c = stage.querySelector(".fc"); if (!c) return; c.classList.add(ok ? "fc-out-right" : "fc-out-left"); if (ok) { known++; addXP(2); sfx.good(); } else { deck.push(deck[k]); sfx.click(); } setTimeout(() => { k++; draw(); }, 300); }
    v.querySelector("#yes").onclick = () => go(true); v.querySelector("#no").onclick = () => go(false); v.querySelector("#flip").onclick = () => stage.onclick();
    const key = e => { if (e.key === "ArrowRight") go(true); else if (e.key === "ArrowLeft") go(false); else if (e.key === " ") { e.preventDefault(); stage.onclick && stage.onclick(); } };
    addEventListener("keydown", key); onLeave(() => removeEventListener("keydown", key));
    draw(); return v;
  }

  /* ---------- CLINIC (fixes from the class test) ---------- */
  function clinic() {
    const fixes = [
      { q: "Which is the correct word equation for aerobic respiration?", was: "Ticked: oxygen + water → glucose + carbon dioxide", now: "oxygen + glucose → carbon dioxide + water. Glucose and oxygen are the REACTANTS (used up). Carbon dioxide and water are the PRODUCTS.", link: "1.2/0", qid: "1.2#0" },
      { q: "A sailor eats no fresh fruit or vegetables. His gums bleed. Which nutrient is he missing?", was: "Ticked: calcium", now: "Vitamin C — it keeps skin and gums healthy. No vitamin C → scurvy. Calcium is for bones and teeth.", link: "2.1/5", qid: "2.1#0" },
      { q: "How do white blood cells reach bacteria in the tissue outside the blood vessels?", was: "\"Through the veins\"", now: "They change shape and squeeze through the gaps between the cells in the capillary walls.", link: "1.1/1", qid: "1.1#4" },
      { q: "Name the independent variable in Rafi's investigation, and ONE variable he must keep the same.", was: "Activity ✔ … \"keep the temperature same\" (lost a mark)", now: "Independent: the type of activity. Control: the TIME spent on each activity (2 minutes), or the same person. Pick a control that actually affects pulse in THIS experiment.", link: "1.1/6", qid: "1.1#16" },
      { q: "Describe the pattern in the results. Use numbers from the table. [1]", was: "\"The more extreme the activity, the more the breathing rate and pulse rate increases\" (no numbers)", now: "As activity gets harder, breathing rate and pulse rate increase — e.g. breathing goes from 14 (resting) to 45 (sprinting) breaths/min and pulse from 70 to 170 beats/min. Always quote numbers when asked!", link: "1.2/7" },
      { q: "Explain why Rafi's breathing and pulse rate are highest when sprinting. Use 'respiration'.", was: "Good start (2/2) — but tighten the wording", now: "Sprinting muscles do more respiration, so they need more oxygen and glucose. The heart beats faster to deliver blood quicker and breathing rate rises to take in more oxygen and remove carbon dioxide.", link: "1.2/0" },
      { q: "Describe TWO features of the alveoli and how each helps gas exchange.", was: "\"one cell thick wall\" ✔, \"sack sized\" (vague)", now: "1) Walls one cell thick → short diffusion distance. 2) Millions of alveoli → large surface area. (3) Good blood supply → keeps the oxygen difference high.", link: "1.2/2", qid: "1.2#6" },
      { q: "Tasnim compares the energy in a peanut and a biscuit. Give ONE variable she must keep the same.", was: "\"The mass of both peanut and biscuit\" ✔ (lost 1 mark on hazard)", now: "Same mass of food OR same volume of water. Hazard: burning food/flame → burns; control: goggles, tie hair back, heat-proof mat, hold the needle by the handle.", link: "2.1/3", qid: "2.1#7" },
      { q: "Farida has fewer red blood cells. Explain why she feels tired and out of breath.", was: "\"Fewer cells, fewer oxygen… this syndrome happens\"", now: "Fewer red blood cells → less haemoglobin → less oxygen carried to cells → less aerobic respiration → less energy released, so she feels tired and breathes faster to try to get more oxygen.", link: "1.1/3", qid: "ch1r#8" }
    ];
    const v = h(`<div style="--chap:#e5484d"><div class="crumbs"><a href="#/">Home</a> › Test fixes</div>
      <section class="topic-hero" style="--chap:#ff7a1a"><h1>🩹 Test fixes</h1><div class="tag">The class test (Chapters 1 &amp; 2) — where marks slipped and how to win them back. Each fix links to the animation that explains it.</div><span class="hero-emoji">🎯</span></section>
      <div class="grid" id="fx"></div></div>`);
    const fx = v.querySelector("#fx");
    fixes.forEach((f, i) => {
      const [tid, sec] = f.link.split("/");
      const c = h(`<div class="card fix lesson seen"><div class="qq">${i + 1}. ${esc(f.q)}</div><div class="was"><div class="lab">On the test</div>${esc(f.was)}</div><div class="now"><div class="lab">Mark-winning answer</div>${esc(f.now)}<div class="row" style="margin-top:10px"><a class="btn small" href="#/topic/${tid}/${sec}">See the explainer →</a>${f.qid ? `<button class="btn small ghost" data-q="${f.qid}">Try it now</button>` : ""}</div><div class="tryzone"></div></div></div>`);
      const b = c.querySelector("[data-q]");
      if (b) b.onclick = () => { const q = qById(f.qid); const z = c.querySelector(".tryzone"); z.innerHTML = ""; const a = Quiz.render(q, { mode: "inline", onResult: recordResult }); a.el.style.marginTop = "12px"; z.appendChild(a.el); b.remove(); };
      fx.appendChild(c);
    });
    return v;
  }

  function notFound() { return h(`<div class="card result"><div class="score-big">🧐</div><h2>Page not found</h2><a class="btn" href="#/">Home</a></div>`); }

  /* ---------- router ---------- */
  function route() {
    cleanup.forEach(f => { try { f(); } catch (e) {} }); cleanup = [];
    document.querySelector(".topnav").classList.remove("open");
    const p = (location.hash.replace(/^#\/?/, "") || "").split("/");
    let view, jump = null;
    if (!p[0]) view = home();
    else if (p[0] === "topic") { view = topic(p[1]); jump = p[2]; }
    else if (p[0] === "quiz") view = quiz(p[1] || "all");
    else if (p[0] === "exam") view = p[1] ? examRun(p[1]) : examPick();
    else if (p[0] === "cards") view = cards(p[1]);
    else if (p[0] === "clinic") view = clinic();
    else view = notFound();
    app.innerHTML = ""; view.classList.add("view-enter"); app.appendChild(view);
    document.querySelectorAll(".topnav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#/" + (p[0] || "") || (a.getAttribute("href") === "#/" && !p[0])));
    if (jump != null) setTimeout(() => { const el = document.getElementById("sec-" + jump); if (el) { el.classList.add("seen"); el.scrollIntoView({ behavior: "smooth" }); } }, 80);
    else scrollTo(0, 0);
  }
  addEventListener("hashchange", route);
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (!S.theme) applyTheme(); });
  route();
})();
