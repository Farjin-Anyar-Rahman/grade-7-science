/* ===== Question engine: renders every question type and marks it ===== */
(function () {
  const { h, esc, norm, lev, shuffle, sfx } = Lab;
  const TYPE_LABEL = { mcq: "Multiple choice", tf: "True or false?", fill: "Fill in the blank", num: "Calculate", short: "Written answer", sort: "Sort it", match: "Match up", order: "Put in order" };
  const marksOf = q => q.marks || ({ sort: 2, match: 2, order: 2 }[q.t] || 1);
  const partial = (right, total, max) => right === total ? max : (right / total >= 0.5 ? Math.max(1, max - 1) : 0);

  /* Each builder returns { el, check() -> {score,max,ok}, lock() } */
  const B = {};

  B.mcq = (q) => {
    const order = q.keep ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));
    const el = h(`<div class="opts"></div>`); let sel = null;
    order.forEach((oi, k) => {
      const b = h(`<button class="opt"><span class="k">${"ABCD"[k] || k + 1}</span><span>${esc(q.o[oi])}</span></button>`);
      b.onclick = () => { sfx.click(); el.querySelectorAll(".opt").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = oi; el.dispatchEvent(new Event("answer")); };
      b.dataset.i = oi; el.appendChild(b);
    });
    return {
      el, ready: () => sel !== null,
      check() {
        el.querySelectorAll(".opt").forEach(b => { b.disabled = true; const i = +b.dataset.i; if (i === q.a) b.classList.add("right"); else if (i === sel) b.classList.add("wrong"); });
        const ok = sel === q.a; return { score: ok ? 1 : 0, max: 1, ok, your: sel === null ? "—" : q.o[sel], right: q.o[q.a] };
      }
    };
  };

  B.tf = (q) => {
    const el = h(`<div class="tf-row"><button class="opt" data-v="1">✅ True</button><button class="opt" data-v="0">❌ False</button></div>`); let sel = null;
    el.querySelectorAll(".opt").forEach(b => b.onclick = () => { sfx.click(); el.querySelectorAll(".opt").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = b.dataset.v === "1"; el.dispatchEvent(new Event("answer")); });
    return {
      el, ready: () => sel !== null,
      check() {
        el.querySelectorAll(".opt").forEach(b => { b.disabled = true; const v = b.dataset.v === "1"; if (v === q.a) b.classList.add("right"); else if (v === sel) b.classList.add("wrong"); });
        const ok = sel === q.a; return { score: ok ? 1 : 0, max: 1, ok, your: sel === null ? "—" : (sel ? "True" : "False"), right: q.a ? "True" : "False" };
      }
    };
  };

  B.fill = (q) => {
    const parts = q.q.split("____");
    const el = h(`<div><input class="txt-in" placeholder="Type the missing word…" autocomplete="off" spellcheck="false">${q.bank ? `<div class="bank">${shuffle(q.bank).map(w => `<button type="button">${esc(w)}</button>`).join("")}</div>` : ""}</div>`);
    const inp = el.querySelector("input");
    el.querySelectorAll(".bank button").forEach(b => b.onclick = () => { sfx.click(); inp.value = b.textContent; inp.dispatchEvent(new Event("input")); });
    inp.addEventListener("input", () => el.dispatchEvent(new Event("answer")));
    return {
      el, ready: () => inp.value.trim().length > 0, focus: () => inp,
      check() {
        inp.disabled = true; el.querySelectorAll(".bank button").forEach(b => b.disabled = true);
        const v = norm(inp.value); const ok = q.a.some(a => { a = norm(a); return v === a || (a.length >= 5 && lev(v, a) <= 1); });
        inp.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        return { score: ok ? 1 : 0, max: 1, ok, your: inp.value || "—", right: q.a[0] };
      },
      textQ: parts.map(esc).join(`<span class="blank-line">?</span>`)
    };
  };

  B.num = (q) => {
    const el = h(`<div class="row"><input class="txt-in" style="max-width:220px" inputmode="decimal" placeholder="Your answer"><span class="chip">${esc(q.unit || "")}</span></div>`);
    const inp = el.querySelector("input"); inp.addEventListener("input", () => el.dispatchEvent(new Event("answer")));
    return {
      el, ready: () => inp.value.trim() !== "", focus: () => inp,
      check() {
        inp.disabled = true; const v = parseFloat(inp.value.replace(",", ".")); const tol = q.tol != null ? q.tol : Math.max(0.051, Math.abs(q.a) * 0.01);
        const ok = !isNaN(v) && Math.abs(v - q.a) <= tol; inp.style.borderColor = ok ? "var(--good)" : "var(--bad)";
        return { score: ok ? 1 : 0, max: 1, ok, your: inp.value || "—", right: q.a + " " + (q.unit || "") };
      }
    };
  };

  B.short = (q) => {
    const el = h(`<div><textarea class="txt-in" placeholder="Write your answer like you would in the test…"></textarea><div class="muted" style="font-size:13px;margin-top:4px">Tip: use the key science words. It's auto-marked by keywords — you can adjust the mark after comparing with the model answer.</div></div>`);
    const ta = el.querySelector("textarea"); ta.addEventListener("input", () => el.dispatchEvent(new Event("answer")));
    let res;
    return {
      el, ready: () => ta.value.trim().length > 2, focus: () => ta,
      check() {
        ta.disabled = true; const v = " " + norm(ta.value) + " ";
        let s = 0; q.kw.forEach(g => { if (g.some(k => v.includes(norm(k)))) s++; });
        s = Math.min(s, q.marks); res = { score: s, max: q.marks, ok: s === q.marks, your: ta.value || "—", right: q.model, short: true }; return res;
      }
    };
  };

  B.sort = (q) => {
    const el = h(`<div><div class="sort-pool"></div><div class="buckets">${q.buckets.map((b, i) => `<div class="bucket" data-b="${i}"><h5>${esc(b)}</h5><div class="drop"></div></div>`).join("")}</div><div class="muted" style="font-size:13px;margin-top:6px">Drag the chips into a box — or tap a chip, then tap a box.</div></div>`);
    const pool = el.querySelector(".sort-pool"); let picked = null; const place = {};
    shuffle(q.items.map((it, i) => i)).forEach(i => {
      const c = h(`<div class="sort-item" data-i="${i}">${esc(q.items[i][0])}</div>`); pool.appendChild(c);
      c.onclick = (e) => { e.stopPropagation(); if (c.dataset.locked) return; if (picked === c) { c.classList.remove("picked"); picked = null; return; } el.querySelectorAll(".picked").forEach(x => x.classList.remove("picked")); picked = c; c.classList.add("picked"); sfx.click(); };
      // pointer drag
      c.addEventListener("pointerdown", (e) => {
        if (c.dataset.locked) return;
        const sx = e.clientX, sy = e.clientY; let dragging = false; let ghost;
        const move = (ev) => {
          if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) { dragging = true; ghost = c.cloneNode(true); Object.assign(ghost.style, { position: "fixed", pointerEvents: "none", zIndex: 999, opacity: .9, transform: "rotate(-4deg) scale(1.05)" }); document.body.appendChild(ghost); c.style.opacity = .3; }
          if (dragging) { ghost.style.left = ev.clientX - 30 + "px"; ghost.style.top = ev.clientY - 18 + "px"; el.querySelectorAll(".bucket").forEach(b => { const r = b.getBoundingClientRect(); b.classList.toggle("hover", ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom); }); }
        };
        const up = (ev) => {
          removeEventListener("pointermove", move); removeEventListener("pointerup", up);
          if (!dragging) return; ghost.remove(); c.style.opacity = 1;
          const hb = el.querySelector(".bucket.hover"); el.querySelectorAll(".bucket").forEach(b => b.classList.remove("hover"));
          if (hb) { drop(c, hb); }
          c._justDragged = true; setTimeout(() => c._justDragged = false, 50);
        };
        addEventListener("pointermove", move); addEventListener("pointerup", up);
      });
    });
    function drop(c, bucket) { bucket.querySelector(".drop").appendChild(c); place[c.dataset.i] = +bucket.dataset.b; c.classList.remove("picked"); picked = null; sfx.click(); el.dispatchEvent(new Event("answer")); }
    el.querySelectorAll(".bucket").forEach(b => b.onclick = () => { if (picked) drop(picked, b); });
    pool.onclick = () => { if (picked) { pool.appendChild(picked); delete place[picked.dataset.i]; picked.classList.remove("picked"); picked = null; } };
    return {
      el, ready: () => Object.keys(place).length === q.items.length,
      check() {
        let r = 0; el.querySelectorAll(".sort-item").forEach(c => { c.dataset.locked = 1; const i = +c.dataset.i; const ok = place[i] === q.items[i][1]; if (ok) r++; c.classList.add(ok ? "right" : "wrong"); if (!ok) c.title = "Belongs in: " + q.buckets[q.items[i][1]]; });
        const max = marksOf(q); const score = partial(r, q.items.length, max);
        return { score, max, ok: r === q.items.length, your: r + "/" + q.items.length + " placed correctly", right: q.buckets.map((b, bi) => b + ": " + q.items.filter(it => it[1] === bi).map(it => it[0]).join(", ")).join(" · ") };
      }
    };
  };

  B.match = (q) => {
    const rights = shuffle(q.pairs.map(p => p[1]));
    const el = h(`<div>${q.pairs.map((p, i) => `<div class="match-row"><div class="ml">${esc(p[0])}</div><select data-i="${i}"><option value="">— choose —</option>${rights.map(r => `<option>${esc(r)}</option>`).join("")}</select></div>`).join("")}</div>`);
    el.querySelectorAll("select").forEach(s => s.onchange = () => { sfx.click(); el.dispatchEvent(new Event("answer")); });
    return {
      el, ready: () => [...el.querySelectorAll("select")].every(s => s.value),
      check() {
        let r = 0; el.querySelectorAll("select").forEach(s => { s.disabled = true; const ok = s.value === q.pairs[+s.dataset.i][1]; if (ok) r++; s.classList.add(ok ? "right" : "wrong"); });
        const max = marksOf(q); return { score: partial(r, q.pairs.length, max), max, ok: r === q.pairs.length, your: r + "/" + q.pairs.length + " matched", right: q.pairs.map(p => p[0] + " → " + p[1]).join(" · ") };
      }
    };
  };

  B.order = (q) => {
    let cur = q.items.map((t, i) => i); let tries = 0;
    do { cur = shuffle(cur); tries++; } while (cur.every((v, i) => q.items[v] === q.items[i]) && tries < 20);
    const el = h(`<div class="order-list"></div>`);
    function draw() {
      el.innerHTML = "";
      cur.forEach((idx, pos) => {
        const it = h(`<div class="order-item"><span class="on">${pos + 1}</span><span>${esc(q.items[idx])}</span><span class="mv"><button aria-label="up">▲</button><button aria-label="down">▼</button></span></div>`);
        const [u, d] = it.querySelectorAll("button");
        u.onclick = () => { if (pos > 0) { [cur[pos - 1], cur[pos]] = [cur[pos], cur[pos - 1]]; sfx.click(); draw(); } };
        d.onclick = () => { if (pos < cur.length - 1) { [cur[pos + 1], cur[pos]] = [cur[pos], cur[pos + 1]]; sfx.click(); draw(); } };
        el.appendChild(it);
      });
      el.dispatchEvent(new Event("answer"));
    }
    draw();
    return {
      el, ready: () => true,
      check() {
        let r = 0; [...el.children].forEach((it, pos) => { it.querySelectorAll("button").forEach(b => b.disabled = true); const ok = q.items[cur[pos]] === q.items[pos]; if (ok) r++; it.classList.add(ok ? "right" : "wrong"); });
        const max = marksOf(q); return { score: partial(r, q.items.length, max), max, ok: r === q.items.length, your: cur.map(i => q.items[i]).join(" → "), right: q.items.join(" → ") };
      }
    };
  };

  /* Render one question card. opts: {mode:'practice'|'exam'|'inline', num, onResult(res)} */
  function render(q, opts = {}) {
    const mode = opts.mode || "practice";
    const w = B[q.t](q);
    const qText = w.textQ || esc(q.q);
    const card = h(`<div class="${mode === "exam" ? "paper-q" : "card q-card"}">
      <div class="q-type">${opts.num ? "Q" + opts.num + " · " : ""}${TYPE_LABEL[q.t]} <span class="q-marks">[${marksOf(q)} mark${marksOf(q) > 1 ? "s" : ""}]</span></div>
      <div class="q-text">${qText}</div>
      <div class="q-body"></div>
      <div class="feedback"></div>
      ${mode !== "exam" ? `<div class="q-actions"><button class="btn check" disabled>Check ✓</button></div>` : ""}
    </div>`);
    card.querySelector(".q-body").appendChild(w.el);
    const fb = card.querySelector(".feedback");
    const checkBtn = card.querySelector(".check");
    let result = null;
    w.el.addEventListener("answer", () => { if (checkBtn && !result) checkBtn.disabled = !w.ready(); });
    if (w.focus) w.focus().addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && checkBtn && !checkBtn.disabled && !result) { e.preventDefault(); checkBtn.click(); } });

    function showFeedback(res) {
      const cls = res.score === res.max ? "ok" : res.score > 0 ? "part" : "no";
      const head = cls === "ok" ? ["🎉 Correct!", "Nice!", "Brilliant!", "Spot on!", "You nailed it!"][(Math.random() * 5) | 0] : cls === "part" ? "Partly right — " + res.score + "/" + res.max : "Not quite";
      fb.className = "feedback show " + cls;
      fb.innerHTML = `<h4>${head}</h4>${!res.ok && !res.short ? `<div><b>Answer:</b> ${esc(res.right)}</div>` : ""}${res.short ? `<div class="model"><b>Model answer:</b> ${esc(res.right)}</div>` : ""}${q.ex ? `<div style="margin-top:6px">💡 ${esc(q.ex)}</div>` : ""}`;
      if (res.short) {
        const sm = h(`<div class="selfmark"><span>Auto-mark: <b>${res.score}/${res.max}</b>. Compare with the model — what do you really deserve?</span></div>`);
        for (let m = 0; m <= res.max; m++) { const b = h(`<button class="${m === res.score ? "on" : ""}">${m}</button>`); b.onclick = () => { sm.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); const old = res.score; res.score = m; res.ok = m === res.max; opts.onAdjust && opts.onAdjust(res, old); }; sm.appendChild(b); }
        fb.appendChild(sm);
      }
    }

    const api = {
      el: card, q,
      check() {
        if (result) return result;
        result = w.check(); result.q = q;
        if (mode !== "exam") {
          showFeedback(result);
          if (result.score === result.max) sfx.good(); else { sfx.bad(); card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake"); }
        }
        opts.onResult && opts.onResult(result);
        return result;
      },
      reveal() { if (!result) api.check(); showFeedback(result); },
      ready: () => w.ready()
    };
    if (checkBtn) checkBtn.onclick = () => { api.check(); checkBtn.remove(); opts.afterCheck && opts.afterCheck(card.querySelector(".q-actions"), result); };
    return api;
  }

  window.Quiz = { render, marksOf, TYPE_LABEL };
})();
