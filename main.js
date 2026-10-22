// Renders the page from window.CONTENT (see content.js).
(function () {
  const C = window.CONTENT;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // _word_ → italic serif accent
  const acc = (s, cls = "") => esc(s).replace(/_(.+?)_/g, `<span class="ser ${cls}">$1</span>`);

  // "TODO: ..." strings render as visible placeholders
  const isTodo = (s) => typeof s === "string" && s.startsWith("TODO:");
  const todoText = (s) => s.replace(/^TODO:\s*/, "");
  const note = (s) => (isTodo(s) ? `<p class="todo-box rv"><span class="todo-tag">To add</span>${esc(todoText(s))}</p>` : "");
  // A demo video: YouTube, Loom and Vimeo links play in place; any other link opens; no link shows a placeholder
  const demoVideo = (v) => {
    const u = v.href || "";
    const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
    const loom = u.match(/loom\.com\/(?:share|embed)\/(\w+)/);
    const vimeo = u.match(/vimeo\.com\/(\d+)/);
    const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : loom ? `https://www.loom.com/embed/${loom[1]}` : vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : "";
    if (src) return `<div class="demo-video rv"><iframe src="${esc(src)}" title="${esc(v.label)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    if (u) return `<a class="btn btn-sun demo-link rv" href="${esc(u)}" target="_blank" rel="noopener">▶ ${esc(v.label)}</a>`;
    return `<div class="demo-video demo-ph rv"><span class="demo-play" aria-hidden="true">▶</span><p><span class="todo-tag">To add</span>${esc(v.label)}: a walkthrough of the full app</p></div>`;
  };

  const ext = (href, label, cls) =>
    href
      ? `<a class="pill ${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)} <span aria-hidden="true">↗</span></a>`
      : `<span class="pill pill-dashed">${esc(label)} <span class="todo-inline">link needed</span></span>`;

  // Phone frame with a screenshot or a marked placeholder
  const phone = (m, cls = "") =>
    `<div class="phone ${cls}">${
      m.src
        ? `<img src="${esc(m.src)}" alt="${esc(m.alt)}">`
        : `<div class="phone-ph" role="img" aria-label="Placeholder: ${esc(m.alt)}">${m.title && cls.includes("big") ? `<span class="disp phone-ph-t">${esc(m.title)}</span>` : ""}<span class="todo-tag">To add</span><span>${esc(m.need)}</span></div>`
    }</div>`;

  const SPORT = { Basketball: "bb", Soccer: "sc", Volleyball: "vb", Pickleball: "pb" };
  const STAR = '<span aria-hidden="true">✦</span>';

  /* Dawn: hero */
  const h = C.hero;
  $("top").innerHTML = `
    <div class="sun sun-big" aria-hidden="true"></div>
    <div class="sun sun-small" aria-hidden="true"></div>
    <div class="wrap hero-in">
      <p class="eyebrow rv">${h.eyebrow.map((e) => `<span>${esc(e)}</span>`).join(STAR)}</p>
      <h1 class="disp hero-h rv">${acc(h.headline, "accent")}</h1>
      ${h.body.map((t, i) => `<p class="hero-body rv">${i ? "" : `Hi, I'm <strong>${esc(C.name)}</strong>, `}${esc(t)}</p>`).join("")}
      <div class="actions rv">
        <a class="btn btn-dark" href="#work">See my work <span aria-hidden="true">↓</span></a>
        <a class="btn btn-line" href="${esc(C.links.resume)}" target="_blank" rel="noopener">Resume</a>
      </div>
      <p class="scroll-hint bob"><span aria-hidden="true"></span>${esc(h.scrollHint)}</p>
    </div>`;

  // Interests band under the hero. Set showTicker: true in content.js to bring it back.
  if (h.showTicker) {
    const tickRun = h.interests.map((i) => `<span>${esc(i)}</span><span class="tick-star">✦</span>`).join("");
    $("ticker").setAttribute("aria-label", "Interests: " + h.interests.join(", "));
    $("ticker").innerHTML = `<div class="tick disp" aria-hidden="true">${tickRun.repeat(4)}</div>`;
  } else {
    $("ticker").remove();
  }

  /* Project picker: glossy bubbles that drift, bump into each other and slow down under the cursor */
  // Little rising bubbles behind the big ones: [left %, top px, size, color, seconds, delay]
  // Subtitle size: scales with the bubble, and steps down for longer descriptions so they wrap to a few tidy lines
  const subSize = (b) => {
    const fit = 0.72 * b.d * Math.sqrt(0.5 / (b.sub.length * 0.7));
    return Math.max(11, Math.min(b.sub.length > 60 ? 13 : 15, b.d * 0.075, fit)).toFixed(1);
  };
  const MINIS = [[6, 780, 34, "morning", 16, -3], [27, 800, 18, "afternoon", 12, -8], [46, 790, 26, "dusk", 19, -1], [63, 810, 14, "teal", 11, -6], [72, 780, 40, "noon", 21, -12], [90, 800, 22, "evening", 14, -4], [16, 800, 12, "jungle", 10, -2]];
  const pk = C.picker;
  $("work").innerHTML = `
    <div class="wrap">
      <h2 id="picker-h" class="disp h-xl rv">${acc(pk.heading, "accent")}</h2>
      <p class="intro rv">${esc(pk.hint)}</p>
    </div>
    <div class="wrap">
      <div class="stage" id="stage">
        ${MINIS.map(([x, y, d, c, dur, delay]) => `<span class="mini mini-${c}" aria-hidden="true" style="left:${x}%; top:${y}px; width:${d}px; height:${d}px; animation-duration:${dur}s; animation-delay:${delay}s"></span>`).join("")}
        ${pk.bubbles
          .map((b, i) => `<div class="slot" style="left:${b.x}%; top:${b.y}px">
            <div class="bob" style="animation-duration:${(3.4 + ((i * 0.53) % 1.5)).toFixed(1)}s; animation-delay:${-(i * 0.7) % 3}s">
              <a class="bubble bub tone-${b.tone}" href="#${esc(b.target)}" style="--s:${b.d}px; --t:${Math.round(b.d * (b.title.length > 13 ? 0.13 : 0.155))}px; --st:${subSize(b)}px">
                <span class="bub-shine" aria-hidden="true"></span>
                <span class="disp bubble-t">${esc(b.title)}</span>
                <span class="bubble-s">${esc(b.sub)}</span>
              </a>
            </div>
          </div>`)
          .join("")}
      </div>
    </div>`;


  /* Morning: GoodGame intro */
  const g = C.goodgame;
  $("goodgame").innerHTML = `
    <div class="wrap">
      <p class="eyebrow rv">${esc(g.tag)}</p>
      <div class="gg-top">
        <div class="gg-intro">
          <h2 id="gg-h" class="disp gg-title rv">${acc(g.title)}</h2>
          <p class="gg-pitch rv">${acc(g.pitch)}</p>
          <div class="chips rv">${g.statline.map(([k, v]) => `<span class="chip chip-cream"><strong>${esc(k)}</strong> · ${esc(v)}</span>`).join("")}</div>
          <div class="actions rv">${g.links.map((l, i) => ext(l.href, l.label, i === 0 ? "pill-dark" : "pill-line")).join("")}</div>
        </div>
        <div class="gg-phone rv">${phone(g.hero, "big tr lift")}</div>
      </div>

      <div class="problem">
        <div class="problem-text">
          <h3 class="disp label rv">${esc(g.problem.heading)}</h3>
          ${g.problem.body.map((p) => `<p class="body-lg rv">${esc(p)}</p>`).join("")}
          ${note(g.problem.note)}
        </div>
        <blockquote class="pull rv"><p class="ser">“${esc(g.problem.quote)} <mark>${esc(g.problem.quoteHighlight)}</mark>”</p></blockquote>
      </div>

      <div class="role-card rv">
        <h3 class="disp">${esc(g.role.heading)}</h3>
        <p>${esc(g.role.body)}</p>
      </div>

      <figure class="browser rv">
        <div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></div>
        <img src="${esc(g.web.src)}" alt="${esc(g.web.alt)}">
        <figcaption>${esc(g.web.caption)}</figcaption>
      </figure>
    </div>`;

  /* Noon: GoodGame continued */
  const L = g.loop;
  $("goodgame-more").innerHTML = `
    <div class="wrap">
      <h3 id="built-h" class="disp h-xl rv">${esc(g.solution.heading)}</h3>
      <p class="intro rv">${acc(g.solution.intro)}</p>
      <div class="tabs">${g.solution.tabs
        .map((t, i) => `<div class="rv"><div class="tab-card ${i % 2 ? "tr" : "tl"} lift">
          <span class="num disp">${i + 1}</span>
          <h4 class="disp">${esc(t.name)}</h4>
          <p class="ser tab-q">${esc(t.q)}</p>
          <p class="tab-b">${esc(t.body)}</p>
        </div></div>`)
        .join("")}</div>
      <div class="legend rv">
        <span class="legend-k">Pins by sport</span>
        ${g.solution.sports.map((s) => `<span class="pin"><span class="dot dot-${SPORT[s]}" aria-hidden="true"></span>${esc(s)}</span>`).join("")}
      </div>

      <div class="sub">
        <h3 class="disp h-xl rv">${acc(L.heading)}</h3>
        <p class="intro rv">${esc(L.intro)}</p>
        <div class="loop rv">
          <div class="loop-start">
            <p class="eyebrow">${esc(L.start.label)}</p>
            <p class="disp loop-big">${esc(L.start.step)}</p>
            <p class="loop-d">${esc(L.start.detail)}</p>
          </div>
          <svg class="loop-arrow" aria-hidden="true" width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h54"/><path d="M44 6l14 14-14 14"/></svg>
          <div class="loop-outs">${L.outcomes
            .map((o) => `<div class="loop-out"><p class="disp">${esc(o.step)}</p><p class="loop-${o.tone}">${esc(o.detail)}</p></div>`)
            .join("")}</div>
        </div>
      </div>

      <div class="sub strip-head">
        <h3 class="disp h-l rv">${["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][g.screens.length] || g.screens.length} screens</h3>
        <div class="strip-ctl">
          <span class="muted-s">Swipe sideways</span>
          <button type="button" class="ctl" data-dir="-1" aria-label="Previous screens">←</button>
          <button type="button" class="ctl" data-dir="1" aria-label="Next screens">→</button>
        </div>
      </div>
    </div>
    <ul class="strip" id="strip" tabindex="0" aria-label="GoodGame screens, scroll sideways">${g.screens
      .map((s) => `<li>${phone(s)}<p class="strip-cap"><strong>${esc(s.title)}</strong> · ${esc(s.caption)}</p></li>`)
      .join("")}</ul>
    <div class="wrap">
      <div class="sub">
        <h3 class="disp dec-h rv">${acc(g.decisions.heading)}</h3>
        <div class="decisions">${g.decisions.items
          .map((d, i) => `<div class="dec rv">
            <p class="disp dec-n">${String(i + 1).padStart(2, "0")}</p>
            <h4 class="disp">${esc(d.title)}</h4>
            <p class="dec-b">${esc(d.body)}</p>
            <p class="dec-t"><strong>Tradeoff:</strong> ${esc(d.tradeoff)}</p>
          </div>`)
          .join("")}</div>
        ${note(g.decisions.note)}
      </div>

      ${g.next ? `<div class="sub next">
        <h3 class="disp h-l2 rv">${acc(g.next.heading)}</h3>
        <ol class="qs">
          ${g.next.questions.map((q) => `<li class="rv"><span class="ser" aria-hidden="true">?</span>${esc(q)}</li>`).join("")}
          <li class="rv"><span class="ser" aria-hidden="true">→</span>${esc(g.next.action)}</li>
        </ol>
      </div>` : ""}
    </div>`;

  /* Afternoon: Samba TV */
  const s = C.samba;
  const sambaTitle = isTodo(s.title)
    ? `<span class="chip chip-cream-pink">${esc(todoText(s.title).replace(/^confirm title \(resume says (.+)\)$/, "$1"))} <span class="todo-inline">confirm title</span></span>`
    : `<span class="chip chip-cream-pink">${esc(s.title)}</span>`;
  $("samba").innerHTML = `
    <div class="wrap">
      <p class="eyebrow rv">${esc(s.tag)}</p>
      <h2 id="samba-h" class="disp co-title rv">${acc(s.company)}</h2>
      <div class="chips rv">${sambaTitle}<span class="chip chip-outline">${esc(s.place)}</span><span class="chip chip-outline">${esc(s.dates)}</span></div>
      <p class="lead rv">${acc(s.blurb)}</p>
      <ol class="process rv" aria-label="How I worked">${s.process
        .map((p, i) => `${i ? '<li aria-hidden="true" class="process-arr">→</li>' : ""}<li class="process-step"><span class="disp">${i + 1}</span>${esc(p)}</li>`)
        .join("")}</ol>
      <div class="pillars">${s.did.map((d) => `<div class="rv"><p class="disp pillar-k">${esc(d.k)}</p>${d.s ? `<p class="pillar-s">${esc(d.s)}</p>` : ""}<p>${esc(d.t)}</p></div>`).join("")}</div>
    </div>
    <div class="sprints">${s.sprints
      .map((sp) => `<article class="sprint rv">
        <div class="wrap sprint-head">
          <p class="eyebrow">${esc(sp.label)}${sp.testers ? ` · ${sp.testers} testers` : ""}</p>
          <h3 class="disp">${esc(sp.name)}</h3>
        </div>
        ${sp.demo ? `<div class="wrap">${demoVideo(sp.demo)}</div>` : ""}
        ${sp.screens
          ? `<div class="sprint-shot"><div class="sprint-screens">${sp.screens.map((sc) => `<button type="button" class="zoomable" data-full="${esc(sc.src)}" aria-label="Enlarge: ${esc(sc.alt)}"><img src="${esc(sc.src)}" alt="${esc(sc.alt)}" loading="lazy"></button>`).join("")}</div></div>`
          : `<div class="sprint-shot"><img src="${esc(sp.image.src)}" alt="${esc(sp.image.alt)}"></div>`}
        ${sp.finding ? `<div class="wrap">${isTodo(sp.finding) ? note(sp.finding) : `<p class="sprint-find"><span class="disp">${esc(sp.score)}</span>${esc(sp.finding)}</p>`}</div>` : ""}
      </article>`)
      .join("")}</div>
    <div class="wrap">
      <blockquote class="samba-quote rv"><p class="ser">“${esc(s.quote)}”</p><footer>${esc(s.quoteBy)}</footer></blockquote>
      <div class="signal rv">
        <div><h3 class="disp label">Strong signal: build</h3><ul>${s.signal.build.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><h3 class="disp label">Weak signal: reconsider</h3><ul>${s.signal.cut.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
      <p class="ser privacy rv">${esc(s.privacy)}</p>
      <div class="actions rv"><a class="pill pill-cream-pink" href="${esc(C.links.paper)}" target="_blank" rel="noopener">${esc(s.paperLabel)} <span aria-hidden="true">↗</span></a></div>
    </div>`;

  /* Dusk: Sports data */
  const d = C.sports;
  $("sports").innerHTML = `
    <div class="wrap">
      <p class="eyebrow rv">${esc(d.tag)}</p>
      <h2 id="sports-h" class="disp sp-title rv">${acc(d.title)}</h2>
      <p class="lead rv">${esc(d.pitch)}</p>
      <div class="chips rv">${d.chips.map((c) => `<span class="chip chip-outline">${esc(c)}</span>`).join("")}</div>
      <figure class="chart rv">
        <div class="chart-card tr">${d.image.src ? `<img src="${esc(d.image.src)}" alt="${esc(d.image.alt)}">` : `<div class="phone-ph">${esc(d.image.alt)}</div>`}</div>
        <figcaption>${esc(d.image.caption)}</figcaption>
      </figure>
      ${d.teams ? `<div class="teams">
        <figure class="teams-fig rv">
          <div class="chart-card">${`<img src="${esc(d.teams.image.src)}" alt="${esc(d.teams.image.alt)}">`}</div>
          <figcaption>${esc(d.teams.image.caption)}${d.teams.data ? ` <a href="${esc(d.teams.data)}" download>Download the data (CSV)</a>` : ""}</figcaption>
        </figure>
        <div class="teams-text rv">
          <h3 class="disp label">${esc(d.teams.label)}</h3>
          ${d.teams.body.map((t) => `<p>${esc(t)}</p>`).join("")}
        </div>
      </div>` : ""}
      <div class="sp-cols">
        <div>
          <h3 class="disp label rv">The question</h3>
          <p class="ser sp-q rv">${esc(d.question)}</p>
          <p class="sp-why rv">${esc(d.why)}</p>
        </div>
        <div>
          <h3 class="disp label rv">What I found</h3>
          <ul class="found">${d.found.map((f) => `<li class="rv">${esc(f)}</li>`).join("")}</ul>
          <a class="pill pill-lilac rv" href="${esc(d.repo)}" target="_blank" rel="noopener">View the repo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      ${d.fansignal ? (() => {
        const f = d.fansignal;
        return `<div class="fs">
        <p class="eyebrow rv">${esc(f.label)}</p>
        <h3 class="disp fs-title rv">${acc(f.title)}</h3>
        <p class="lead rv">${esc(f.pitch)}</p>
        <p class="fs-problem rv">${esc(f.problem)}</p>
        <ol class="fs-flow rv">${f.flow.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        <figure class="fs-shots rv">
          <div class="fs-grid">${f.images.map((m) => `<button type="button" class="zoomable" data-full="${esc(m.src)}" aria-label="Enlarge: ${esc(m.alt)}"><img src="${esc(m.src)}" alt="${esc(m.alt)}"></button>`).join("")}</div>
          <figcaption>${esc(f.caption)}</figcaption>
        </figure>
        <ul class="fs-features">${f.features.map(([k, t]) => `<li class="rv"><h4 class="disp">${esc(k)}</h4><p>${esc(t)}</p></li>`).join("")}</ul>
        <div class="actions rv">${f.links.map((l, i) => ext(l.href, l.label, i === 0 ? "pill-lilac" : "pill-line")).join("")}</div>
        <p class="fs-note rv">${esc(f.note)}</p>
      </div>`;
      })() : ""}
    </div>`;

  /* Dusk: urban planning prototypes */
  const u = C.urban;
  const step = ([k, t]) => `<li><span class="disp">${esc(k)}</span>${esc(t)}</li>`;
  $("urban").innerHTML = `
    <div class="wrap">
      <p class="eyebrow rv">${esc(u.tag)}</p>
      <h2 id="urban-h" class="disp sp-title rv">${acc(u.title)}</h2>
      <p class="lead rv">${esc(u.lead)}</p>
      ${isTodo(u.role) ? note(u.role) : `<p class="urban-role rv">${esc(u.role)}</p>`}
      <div class="actions rv">${u.links.map((l) => ext(l.href, l.label, "pill-lilac")).join("")}</div>
      ${u.prototypes
        .map((p) => `<article class="proto">
          <header class="proto-head rv">
            <p class="disp proto-n">${esc(p.n)}</p>
            <div><h3 class="disp">${esc(p.name)}</h3><p class="ser proto-sub">${esc(p.sub)}</p></div>
          </header>
          ${p.app ? `<div class="proto-app">
            <div class="proto-live">
              <div class="proto-app-text rv">
                <h4 class="disp">${acc(p.app.heading)}</h4>
                <p>${esc(p.app.body)}</p>
                <div class="actions">${(p.links || []).map((l, i) => ext(l.href, l.label, i === 0 ? "pill-lilac" : "pill-line")).join("")}</div>
                <p class="proto-app-note">${esc(p.app.note)}</p>
              </div>
              <div class="live-phone rv">
                <div class="phone">
                  <button type="button" class="live-start" data-src="${esc(p.app.live)}" aria-label="Load the live ${esc(p.name)} demo here">
                    <img src="${esc(p.app.screens[0].src)}" alt="">
                    <span class="live-cta">Tap to try it live</span>
                  </button>
                </div>
              </div>
            </div>
            <ul class="proto-phones">${p.app.screens.slice(1).map((sc) => `<li class="rv">${phone(sc)}<p>${esc(sc.title)}</p></li>`).join("")}</ul>
          </div>` : ""}
          <div class="proto-shots">${p.images
            .map((m) => `<figure class="rv" style="flex: ${m.ratio} 1 ${Math.round(m.ratio * 220)}px; max-width: min(100%, ${Math.round(m.ratio * 440)}px)"><img src="${esc(m.src)}" alt="${esc(m.alt)}">${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ""}</figure>`)
            .join("")}</div>
          <div class="proto-text">
            <div>
              <p class="proto-what rv">${esc(p.what)}</p>
              ${p.hypothesis ? `<p class="proto-hyp rv"><span class="label disp">Hypothesis</span>${esc(p.hypothesis)}</p>` : ""}
              ${p.test ? `<p class="proto-test rv">${esc(p.test)}</p>` : ""}
              ${p.links && !p.app ? `<div class="actions rv">${p.links.map((l) => ext(l.href, l.label, "pill-lilac")).join("")}</div>` : ""}
            </div>
            <div>
              ${p.heard ? `<h4 class="disp label rv">What testers asked for</h4><ul class="found rv">${p.heard.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
              <ol class="proto-steps rv">${p.steps.map(step).join("")}</ol>
              ${p.changed ? `<p class="proto-changed rv">${esc(p.changed)}</p>` : ""}
            </div>
          </div>
          ${p.scenario ? `<div class="scenario rv">
            <p class="eyebrow">${esc(p.scenario.label)}</p>
            <p class="ser scenario-q">${esc(p.scenario.prompt)}</p>
            <ol>${p.scenario.rounds.map((r, i) => `<li><span class="disp">Round ${i + 1}</span>“${esc(r)}”</li>`).join("")}</ol>
          </div>` : ""}
        </article>`)
        .join("")}
      <div class="urban-end">
        <blockquote class="samba-quote rv"><p class="ser">“${esc(u.quote)}”</p><footer>${esc(u.heardLabel)}</footer></blockquote>
        <p class="urban-aside rv">${esc(u.aside)}</p>
      </div>
    </div>`;

  // Live demo: swap the poster for the real app only when asked, so the page stays light
  document.querySelectorAll(".live-start").forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = btn.dataset.src;
      f.title = "Live Claremont Columns demo";
      f.loading = "eager";
      btn.replaceWith(f);
    })
  );

  /* Evening: playground */
  const pg = C.playground;
  const shot = (m) =>
    m.src
      ? `<img class="${m.tall ? "shot-tall" : ""}" src="${esc(m.src)}" alt="${esc(m.alt)}">`
      : `<div class="shot-ph" role="img" aria-label="Placeholder: ${esc(m.alt)}"><span class="todo-tag">To add</span>${esc(m.need)}</div>`;
  const card = (it, i) => `<article class="play-card ${i % 2 ? "flip" : ""} rv" id="${esc(it.id)}">
          <div class="play-shots ${it.phones ? "phones" : it.images.length === 3 ? "three" : it.images.length > 1 ? "two" : ""}">${it.images.map(shot).join("")}</div>
          <div class="play-text">
            <p class="eyebrow">${esc(it.kind)}</p>
            <h3 class="disp">${esc(it.title)}</h3>
            <p class="play-pitch">${esc(it.pitch)}</p>
            ${it.body ? (isTodo(it.body) ? note(it.body) : `<p class="play-body">${esc(it.body)}</p>`) : ""}
            ${it.role ? note(it.role) : ""}
            ${it.links.length ? `<div class="play-links">${it.links.map((l) => ext(l.href, l.label, "pill-cream")).join("")}</div>` : ""}
          </div>
        </article>`;
  // Each of these is its own project with its own section, colored like its bubble. The sky keeps
  // flowing: each section eases in from the color before it and out toward the next one.
  const TONES = { noon: "#F3875A", night: "#24326E", teal: "#57CBBE", jungle: "#74C47E" };
  const DARK = { night: true };
  const DUSK = "var(--bg-dusk)", EVE = "var(--bg-evening)";
  const mix = (a, b) => `color-mix(in oklab, ${a} 60%, ${b})`;
  const cols = pg.items.map((it) => TONES[it.tone]);
  const projShots = (it) => `<div class="proj-shots ${it.phones ? "phones" : it.images.length > 1 ? "two" : "one"} rv">${it.images.map(shot).join("")}</div>`;
  $("playground").innerHTML = pg.items
    .map((it, i) => {
      const c = cols[i], prev = cols[i - 1] || DUSK, next = cols[i + 1] || EVE;
      const fade = `<div class="fade" aria-hidden="true" style="--from:${mix(prev, c)}; --to:${mix(c, prev)}"></div>`;
      return `${fade}<section class="sky proj ${DARK[it.tone] ? "proj-dark" : "proj-light"}" id="${esc(it.id)}" aria-labelledby="${esc(it.id)}-h" style="--c:${c}; --top:${mix(c, prev)}; --bot:${mix(c, next)}">
        <div class="wrap">
          <p class="eyebrow rv">${esc(it.kind)}</p>
          <h2 id="${esc(it.id)}-h" class="disp h-xl rv">${esc(it.title)}</h2>
          <p class="lead rv">${esc(it.pitch)}</p>
          ${projShots(it)}
          <div class="proj-foot rv">
            ${it.body ? (isTodo(it.body) ? note(it.body) : `<p class="proj-body">${esc(it.body)}</p>`) : ""}
            ${it.role ? (isTodo(it.role) ? note(it.role) : `<p class="proj-role"><span class="label disp">My role</span>${esc(it.role)}</p>`) : ""}
            ${it.links.length ? `<div class="play-links">${it.links.map((l) => ext(l.href, l.label, "pill-proj")).join("")}</div>` : ""}
          </div>
        </div>
      </section>`;
    })
    .join("") + `<div class="fade" aria-hidden="true" style="--from:${mix(cols[cols.length - 1], EVE)}; --to:${mix(EVE, cols[cols.length - 1])}"></div>`;
  // Urban and Beyond the Build ease toward the project colors next to them
  $("urban").style.setProperty("--bot", mix(DUSK, cols[0]));
  $("more").style.setProperty("--top", mix(EVE, cols[cols.length - 1]));

  /* Evening: Beyond the Build */
  const mo = C.more;
  $("more").innerHTML = `
    <div class="wrap">
      <h2 id="more-h" class="disp h-xl rv">${acc(mo.heading)}</h2>
      ${mo.intro ? `<p class="intro rv">${esc(mo.intro)}</p>` : ""}
      ${mo.cards && mo.cards.length ? `<div class="play beyond-cards">${mo.cards.map(card).join("")}</div>` : ""}
      <div class="more">${mo.items
        .map((m) => `<div class="more-row rv"><p class="more-when">${esc(m.when)}</p><div><p class="disp more-org">${esc(m.org)}</p><p class="more-role">${esc(m.role)}</p><p class="more-line">${esc(m.line)}</p></div></div>`)
        .join("")}</div>
    </div>`;

  /* Night: about */
  const a = C.about;
  const HOB = ["sun", "tang", "pink", "lilac"];
  $("about").innerHTML = `
    <div class="wrap about">
      <div class="about-photo rv">${
        a.photo.src
          ? `<img class="portrait tl" src="${esc(a.photo.src)}" alt="${esc(a.photo.alt)}">`
          : `<div class="portrait portrait-ph tl" role="img" aria-label="Placeholder: ${esc(a.photo.alt)}"><span class="todo-tag">To add</span>${esc(a.photo.need)}</div>`
      }</div>
      <div class="about-text">
        <p class="eyebrow rv">About</p>
        <h2 id="about-h" class="disp h-l2 rv">${acc(a.heading, "accent")}</h2>
        ${a.body.map((p) => `<p class="about-p rv">${esc(p)}</p>`).join("")}
        <div class="chips rv">${a.hobbies.map((x, i) => `<span class="chip chip-${HOB[i % 4]}">${esc(x)}</span>`).join("")}</div>
      </div>
    </div>`;

  /* Night: contact */
  const emailBtn = C.email
    ? `<a class="btn btn-sun" href="mailto:${esc(C.email)}">${esc(C.email)}</a>`
    : `<span class="btn btn-dashed">Email <span class="todo-inline">to add</span></span>`;
  $("contact").innerHTML = `
    <div class="moon" aria-hidden="true"></div>
    <div class="wrap contact-in">
      <h2 id="contact-h" class="disp contact-h rv">${acc(C.contact.heading, "accent")}</h2>
      <p class="contact-line rv">${esc(C.contact.line)}</p>
      <div class="actions center rv">
        ${emailBtn}
        <a class="btn btn-ghost" href="${esc(C.links.linkedin)}" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
        <a class="btn btn-ghost" href="${esc(C.links.github)}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
        <a class="btn btn-ghost" href="${esc(C.links.resume)}" target="_blank" rel="noopener">Resume (PDF) <span aria-hidden="true">↗</span></a>
        <a class="btn btn-ghost" href="${esc(C.links.paper)}" target="_blank" rel="noopener">Writing sample <span aria-hidden="true">↗</span></a>
      </div>
    </div>`;

  $("yr").textContent = new Date().getFullYear();

  /* Bubble click: grow the bubble's color over the screen, land on the section, then fade out */
  const zoom = $("zoom");
  document.querySelectorAll(".bubble").forEach((el) =>
    el.addEventListener("click", (e) => {
      const target = document.querySelector(el.getAttribute("href"));
      if (!target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoom.style.setProperty("--x", r.left + r.width / 2 + "px");
      zoom.style.setProperty("--y", r.top + r.height / 2 + "px");
      zoom.style.setProperty("--r", r.width / 2 + "px");
      zoom.style.background = getComputedStyle(el).getPropertyValue("--zoom") || getComputedStyle(el).backgroundColor;
      zoom.getBoundingClientRect(); // start the circle at the bubble's size
      zoom.className = "zoom grow";
      setTimeout(() => {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        history.replaceState(null, "", el.getAttribute("href"));
        zoom.className = "zoom grow out";
        setTimeout(() => (zoom.className = "zoom"), 450);
      }, 520);
    })
  );


  /* Vine: a hand-drawn stem that weaves down the page as you scroll. It runs in the side margins,
     crosses over in the empty color bands between sections, and curls around the sun,
     a few images, the portrait and the moon. On narrow screens it skips the curls that would cover content. */
  // Vine is switched off for now; set SHOW_VINE to true to bring it back
  const SHOW_VINE = false;
  const vine = $("vine");
  const NS = "http://www.w3.org/2000/svg";
  const BLOOMS = ["work", "goodgame", "samba", "sports", "urban", "playground", "about", "contact"];
  const PETALS = ["#FFC94A", "#FF7A3D", "#F58BB0", "#B79BFF", "#F58BB0", "#FFC94A", "#B79BFF", "#FF7A3D"];
  const GREENS = ["#2E8B47", "#3FA557", "#4FB862", "#2A7A4B", "#5CC46A", "#3B9A6B"];
  let stem, stemLen = 0, samples = [], extras = [], strands = [], twists = [];
  // Repeatable "random" numbers, so the vine looks the same on every visit
  const rnd = (k, seed = 1) => {
    const v = Math.sin(k * 12.9898 + seed * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const el = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  // Smooth curve through points (Catmull-Rom as cubic Béziers)
  const smooth = (P) => {
    let d = `M ${P[0][0]} ${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  };
  const drawVine = () => {
    if (!SHOW_VINE) return;
    const root = document.querySelector(".ll");
    const H = root.scrollHeight, W = root.clientWidth;
    const top = root.getBoundingClientRect().top;
    const box = (sel) => {
      const n = typeof sel === "string" ? document.querySelector(sel) : sel;
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { l: r.left, r: r.right, t: r.top - top, b: r.bottom - top, cx: (r.left + r.right) / 2, cy: (r.top + r.bottom) / 2 - top, w: r.width };
    };
    const wrap = document.querySelector(".hero .wrap");
    const g = wrap ? wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft) : 20;
    const wide = g > 90;
    const amp = Math.max(3, Math.min(36, g / 2 - 18));
    const X = { L: Math.max(8, g / 2), R: W - Math.max(8, g / 2) };

    vine.setAttribute("viewBox", `0 0 ${W} ${H}`);
    vine.style.height = H + "px";
    vine.replaceChildren();

    const P = [];
    let side = "R", flip = 1;
    const add = (x, y) => P.push([Math.round(x), Math.round(y)]);
    // Wander down one margin, staying clear of any curl that comes next
    const run = (y1) => {
      let y = P[P.length - 1][1];
      while (y1 - y > 300) {
        y += 260;
        flip = -flip;
        add(X[side] + flip * amp, y);
      }
    };
    const loop = (cx, cy, r, from = -90, turn = 400) => {
      for (let a = 0; a <= turn; a += 45) {
        const t = ((from + a) * Math.PI) / 180;
        add(cx + r * Math.cos(t), cy + r * Math.sin(t));
      }
    };
    // Cross to the other margin through an empty color band, with a curl in the middle
    const cross = (band) => {
      if (!band) return;
      run(band.t);
      const to = side === "L" ? "R" : "L", dir = to === "R" ? 1 : -1, mid = (band.t + band.b) / 2;
      const r = wide ? 34 : 16;
      add(W / 2 - dir * W * 0.22, mid - (band.b - band.t) * 0.25);
      loop(W / 2, mid, r, dir > 0 ? 180 : 0, 360);
      add(W / 2 + dir * W * 0.22, mid + (band.b - band.t) * 0.25);
      side = to;
      add(X[side], band.b + 30);
    };
    // Swing in over the near edge of an image and back out to the margin
    const hook = (b) => {
      if (!b || !wide) return;
      run(b.t - 60);
      const edge = side === "L" ? b.l : b.r, s = side === "L" ? 1 : -1;
      add(X[side], b.t - 50);
      add(edge + s * 34, b.t + 24);
      add(edge + s * 14, b.t + 96);
      add(X[side], b.t + 170);
    };
    // Hug the margin side of a round thing
    const hug = (b) => {
      if (!b || !wide) return;
      const r = b.w / 2 + 18, base = side === "L" ? 180 : 0;
      run(b.cy - r - 40);
      for (const a of [-110, -60, -20, 20, 60, 110]) {
        const t = ((side === "L" ? base - a : base + a) * Math.PI) / 180;
        add(b.cx + r * Math.cos(t), b.cy + r * Math.sin(t));
      }
      add(X[side], b.cy + r + 60);
    };

    // Sunrise: start by coiling around the small sun, then down the right margin
    const sun = box(".sun-small");
    if (wide && sun) {
      add(sun.cx + 40, -20);
      loop(sun.cx, sun.cy, sun.w / 2 + 20, -60, 380);
      add(X.R, sun.b + 140);
    } else {
      add(X.R, -20);
    }
    cross(box(".f-dawn"));
    hook(box("#goodgame .browser"));
    cross(box(".f-noon"));
    cross(box(".f-afternoon"));
    hook(box(document.querySelectorAll(".sprint-shot img")[1]));
    cross(box(".f-dusk"));
    hook(box("#sports .chart-card"));
    hook(box("#urban .live-phone .phone"));
    cross(box(".f-evening"));
    hook(box(document.querySelectorAll(".play-card")[1]));
    run(box(".f-night")?.t ?? H);
    hook(box("#about .portrait"));
    // Night: cross over to the moon, wrap it, and finish down the right margin
    const moon = box(".moon");
    if (moon) {
      run(moon.t - 80);
      add(moon.cx - moon.w * 1.4, moon.cy - moon.w * 0.2);
      loop(moon.cx, moon.cy, moon.w / 2 + (wide ? 20 : 12), 180, 360);
      side = "R";
      add(X.R, moon.b + 120);
    }
    run(H - 60);
    add(X[side], H - 40);

    // The stem is three copies of one path (dark outline, mid-green core, light highlight),
    // with a thinner strand twisting around it that dips behind and comes back in front.
    const d = smooth(P);
    stem = el("path", { d, class: "vine-stem" });
    const core = el("path", { d, class: "vine-core" });
    const shine = el("path", { d, class: "vine-shine", transform: wide ? "translate(-1.6 -1.3)" : "translate(-.6 -.5)" });
    const backLayer = el("g", {}), frontLayer = el("g", {}), leafLayer = el("g", {}), flowerLayer = el("g", {});
    vine.append(backLayer, stem, core, shine, frontLayer, leafLayer, flowerLayer);
    stemLen = stem.getTotalLength();
    samples = [];
    for (let s = 0; s <= stemLen; s += 8) samples.push([s, stem.getPointAtLength(s)]);
    const lenAtY = (y) => (samples.find(([, p]) => p.y >= y) || samples[samples.length - 1])[0];
    const at = (s) => {
      const i = Math.min(samples.length - 2, Math.max(0, Math.round(s / 8)));
      const p = samples[i][1], q = samples[i + 1][1];
      return { x: p.x, y: p.y, ang: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI };
    };
    // The twist is cut into short pieces at each crossing: front pieces lie over the stem, back pieces
    // under it. Each piece grows on its own once the stem reaches it.
    const A = wide ? 6 : 2.4, wave = wide ? 46 : 30;
    twists = [];
    let seg = null, prev = null;
    samples.forEach(([s, p], i) => {
      const q = samples[Math.min(i + 1, samples.length - 1)][1], o = samples[Math.max(i - 1, 0)][1];
      const m = Math.hypot(q.x - o.x, q.y - o.y) || 1, ph = (s / wave) * Math.PI * 2, off = A * Math.sin(ph);
      const x = p.x - ((q.y - o.y) / m) * off, y = p.y + ((q.x - o.x) / m) * off, f = Math.cos(ph) > 0;
      if (!seg || seg.f !== f) {
        seg = { f, s0: prev ? prev.s : s, pts: prev ? [prev] : [] };
        twists.push(seg);
      }
      prev = { x, y, s };
      seg.pts.push(prev);
      seg.s1 = s;
    });
    twists.forEach((t) => {
      t.n = el("path", { d: "M " + t.pts.map((q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(" L "), class: `vine-twist vine-twist-${t.f ? "front" : "back"}` });
      t.len = t.pts.reduce((a, q, i) => a + (i ? Math.hypot(q.x - t.pts[i - 1].x, q.y - t.pts[i - 1].y) : 0), 0) + 1;
      t.n.style.strokeDasharray = t.len;
      t.shown = -1;
      delete t.pts;
      (t.f ? frontLayer : backLayer).append(t.n);
    });
    strands = [stem, core, shine];
    strands.forEach((n) => (n.style.strokeDasharray = stemLen));

    // Leaves, buds and flowers. Each sits in its own group at the stem, pops open from that point
    // when the vine reaches it, and some sway.
    extras = [];
    const leaf = wide ? Math.max(9, Math.min(15, g / 9)) : 3.4;
    const piece = (layer, x, y, rot, s, sway) => {
      const o = el("g", { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})` });
      const pop = el("g", { class: "vine-x" });
      let inner = pop;
      if (sway) {
        inner = el("g", { class: "vine-sway", style: `animation-delay:${(-rnd(s, 4) * 5).toFixed(2)}s; animation-duration:${(3.6 + rnd(s, 6) * 2).toFixed(2)}s` });
        pop.append(inner);
      }
      o.append(pop);
      layer.append(o);
      extras.push({ s, n: pop });
      return inner;
    };
    const leafShape = (gr, kind, L, k) => {
      const fill = GREENS[Math.floor(rnd(k, 5) * GREENS.length)];
      if (kind === "curl") {
        const t = L * 1.1;
        gr.append(el("path", { d: `M0 0 C ${t} ${-t * 0.2}, ${t * 2.2} ${t * 0.6}, ${t * 1.6} ${t * 1.3} S ${t * 0.7} ${t * 1.2}, ${t * 1.1} ${t * 0.7}`, class: "vine-curl" }));
      } else if (kind === "fern") {
        const F = L * 3.4, yAt = (t) => 2 * (1 - t) * t * -F * 0.1 + t * t * F * 0.06;
        gr.append(el("path", { d: `M0 0 Q ${F * 0.5} ${-F * 0.1} ${F} ${F * 0.06}`, class: "vine-stalk" }));
        for (let t = 0.14; t < 0.98; t += 0.1) {
          const b = L * 0.6 * (1.08 - t), x = F * t, y = yAt(t);
          for (const sd of [-1, 1]) gr.append(el("ellipse", { cx: x + b * 0.55, cy: y + sd * b * 0.6, rx: b, ry: b * 0.3, fill, class: "vine-leaf", transform: `rotate(${sd * 55} ${x} ${y})` }));
        }
      } else if (kind === "heart") {
        const s0 = L * 0.6, H = L * 2.3;
        const half = (sd) => `C ${s0 - H * 0.2} ${sd * H * 0.42}, ${s0 + H * 0.32} ${sd * H * 0.62}, ${s0 + H * 0.58} ${sd * H * 0.38} C ${s0 + H * 0.8} ${sd * H * 0.2}, ${s0 + H * 0.94} ${sd * H * 0.06}, ${s0 + H} 0`;
        gr.append(el("path", { d: `M0 0 L ${s0} 0`, class: "vine-stalk" }));
        gr.append(el("path", { d: `M ${s0} 0 ${half(-1)} C ${s0 + H * 0.94} ${H * 0.06}, ${s0 + H * 0.8} ${H * 0.2}, ${s0 + H * 0.58} ${H * 0.38} C ${s0 + H * 0.32} ${H * 0.62}, ${s0 - H * 0.2} ${H * 0.42}, ${s0} 0 Z`, fill, class: "vine-leaf" }));
        gr.append(el("path", { d: `M ${s0} 0 ${half(1)} Z`, class: "vine-shade" }));
        let v = `M ${s0} 0 L ${s0 + H * 0.92} 0`;
        for (const sd of [-1, 1]) v += ` M ${s0} 0 Q ${s0 + H * 0.2} ${sd * H * 0.12} ${s0 + H * 0.46} ${sd * H * 0.36} M ${s0 + H * 0.1} 0 Q ${s0 + H * 0.02} ${sd * H * 0.2} ${s0 + H * 0.06} ${sd * H * 0.36}`;
        gr.append(el("path", { d: v, class: "vine-rib" }));
        if (wide) gr.append(el("ellipse", { cx: s0 + H * 0.42, cy: -H * 0.28, rx: H * 0.14, ry: H * 0.06, class: "vine-gloss", transform: `rotate(-20 ${s0 + H * 0.42} ${-H * 0.28})` }));
      } else {
        const Lx = L * 2.3, w = L * 0.78;
        gr.append(el("path", { d: `M0 0 C ${Lx * 0.25} ${-w}, ${Lx * 0.72} ${-w * 0.85}, ${Lx} 0 C ${Lx * 0.72} ${w * 0.85}, ${Lx * 0.25} ${w}, 0 0 Z`, fill, class: "vine-leaf" }));
        gr.append(el("path", { d: `M0 0 C ${Lx * 0.25} ${w}, ${Lx * 0.72} ${w * 0.85}, ${Lx} 0 Z`, class: "vine-shade" }));
        let v = `M0 0 Q ${Lx * 0.5} ${-w * 0.06} ${Lx * 0.94} 0`;
        if (wide) for (const t of [0.26, 0.46, 0.66]) for (const sd of [-1, 1]) v += ` M ${Lx * t} 0 Q ${Lx * (t + 0.08)} ${sd * w * 0.22} ${Lx * (t + 0.17)} ${sd * w * 0.6 * (1.1 - t)}`;
        gr.append(el("path", { d: v, class: "vine-rib" }));
        if (wide) gr.append(el("ellipse", { cx: Lx * 0.4, cy: -w * 0.42, rx: Lx * 0.16, ry: w * 0.1, class: "vine-gloss", transform: `rotate(-8 ${Lx * 0.4} ${-w * 0.42})` }));
      }
    };
    const blossom = (gr, b, color) => {
      const c = b * 1.3;
      gr.append(el("path", { d: `M0 0 L ${c} 0`, class: "vine-stalk" }));
      for (let a = 0; a < 5; a++) gr.append(el("path", { d: `M ${c} 0 q ${b * 0.42} ${-b * 0.5} 0 ${-b * 1.15} q ${-b * 0.42} ${b * 0.5} 0 ${b * 1.15} Z`, fill: color, class: "vine-petal", transform: `rotate(${a * 72} ${c} 0)` }));
      gr.append(el("circle", { cx: c, cy: 0, r: b * 0.3, class: "vine-pollen" }));
    };
    const bud = (gr, b, color) => {
      const c = b * 0.8;
      gr.append(el("path", { d: `M0 0 L ${c} 0`, class: "vine-stalk" }));
      gr.append(el("path", { d: `M ${c} 0 C ${c + b * 0.2} ${-b * 0.55}, ${c + b * 1.1} ${-b * 0.35}, ${c + b * 1.5} 0 C ${c + b * 1.1} ${b * 0.35}, ${c + b * 0.2} ${b * 0.55}, ${c} 0 Z`, fill: color, class: "vine-petal" }));
      gr.append(el("path", { d: `M ${c - b * 0.05} 0 L ${c + b * 0.5} ${-b * 0.34} L ${c + b * 0.3} 0 L ${c + b * 0.5} ${b * 0.34} Z`, class: "vine-sepal" }));
    };
    const hibiscus = (gr, r, color) => {
      const petal = `M0 0 C ${-r * 0.55} ${-r * 0.15}, ${-r * 0.8} ${-r * 0.7}, ${-r * 0.5} ${-r} Q ${-r * 0.36} ${-r * 1.16} ${-r * 0.18} ${-r * 1.04} Q ${-r * 0.04} ${-r * 1.2} ${r * 0.12} ${-r * 1.06} Q ${r * 0.3} ${-r * 1.18} ${r * 0.46} ${-r} C ${r * 0.8} ${-r * 0.7}, ${r * 0.55} ${-r * 0.15}, 0 0 Z`;
      for (let a = 0; a < 5; a++) {
        gr.append(el("path", { d: petal, fill: color, class: "vine-petal", transform: `rotate(${a * 72})` }));
        if (wide) gr.append(el("path", { d: `M0 0 L ${-r * 0.2} ${-r * 0.8} M0 0 L 0 ${-r * 0.88} M0 0 L ${r * 0.2} ${-r * 0.8}`, class: "vine-pvein", transform: `rotate(${a * 72})` }));
      }
      gr.append(el("circle", { r: r * 0.46, class: "vine-throat", opacity: 0.35 }));
      gr.append(el("circle", { r: r * 0.24, class: "vine-throat" }));
      const tx = r * 0.66, ty = -r * 0.8;
      gr.append(el("path", { d: `M0 0 Q ${r * 0.24} ${-r * 0.4} ${tx} ${ty}`, class: "vine-stamen", "stroke-width": Math.max(1, r * 0.08) }));
      [[0, 0], [-0.1, -0.06], [0.08, -0.1], [0.12, 0.04], [-0.04, 0.1], [0.02, -0.18]].forEach(([dx, dy]) => gr.append(el("circle", { cx: tx + dx * r, cy: ty + dy * r, r: r * 0.065, class: "vine-pollen" })));
    };

    // Leaves about every 64px (sparser on phones), alternating sides, often doubled on the other side
    const stepLen = wide ? 64 : 96;
    for (let s = 40, k = 0; s < stemLen - 20; s += stepLen, k++) {
      const { x, y, ang } = at(s), sd = k % 2 ? 1 : -1, r = rnd(k);
      const kind = k % 11 === 5 ? "curl" : wide && k % 13 === 8 ? "fern" : r < 0.24 ? "heart" : "leaf";
      const L = leaf * (0.85 + 0.45 * rnd(k, 7));
      leafShape(piece(leafLayer, x, y, ang + sd * (kind === "fern" ? 62 : 44 + r * 18), s, k % 3 === 0), kind, L, k);
      if (rnd(k, 2) < (wide ? 0.45 : 0.1)) {
        leafShape(piece(leafLayer, x, y, ang - sd * (48 + rnd(k, 8) * 14), s + 4, false), rnd(k, 3) < 0.3 ? "heart" : "leaf", L * 0.78, k + 100);
      }
      if (k % (wide ? 5 : 9) === 2) {
        const b = wide ? leaf * 0.55 : 2.6, color = PETALS[k % PETALS.length];
        const gr = piece(flowerLayer, x, y, ang - sd * 70, s + 6, true);
        (k % 2 ? bud : blossom)(gr, b, color);
      }
    }
    // A hibiscus on the stem where each project starts, framed by a couple of leaves
    BLOOMS.forEach((id, k) => {
      const b = box("#" + id);
      if (!b) return;
      const s = lenAtY(b.t + 60), { x, y, ang } = at(s);
      const r = wide ? Math.max(16, Math.min(30, g / 4.5)) : 7;
      if (wide) for (const sd of [-1, 1]) leafShape(piece(leafLayer, x, y, ang + sd * 128, s - 2, false), "leaf", r * 0.62, k + 200 + sd);
      hibiscus(piece(flowerLayer, x, y, rnd(k, 9) * 72, s, true), r, PETALS[k]);
    });
    vine.lenAtY = lenAtY;
    growVine();
  };
  const growVine = () => {
    if (!stem) return;
    const H = parseFloat(vine.style.height);
    const reach = matchMedia("(prefers-reduced-motion: reduce)").matches ? H : scrollY + innerHeight * 0.85;
    const s = reach >= H ? stemLen : vine.lenAtY(reach);
    strands.forEach((n) => (n.style.strokeDashoffset = stemLen - s));
    twists.forEach((t) => {
      const v = s <= t.s0 ? 0 : s >= t.s1 ? 1 : (s - t.s0) / (t.s1 - t.s0);
      if (v !== t.shown) {
        t.shown = v;
        t.n.style.strokeDashoffset = t.len * (1 - v);
      }
    });
    extras.forEach((e) => e.n.classList.toggle("on", e.s <= s));
  };
  addEventListener("scroll", () => requestAnimationFrame(growVine), { passive: true });
  let vineT;
  new ResizeObserver(() => {
    clearTimeout(vineT);
    vineT = setTimeout(drawVine, 150);
  }).observe(document.querySelector(".ll"));

  /* Bubble drift: each bubble wanders, softly bounces off the stage edges and off the others.
     On narrow screens they shrink to fit and keep moving. */
  const stage = $("stage");
  const balls = [...stage.querySelectorAll(".slot")].map((el, i) => {
    const ang = ((i * 137.5 + 20) * Math.PI) / 180, sp = 26 + (i % 4) * 6.3;
    const b = { el, r: 0, r0: 0, m: 0, x: 0, y: 0, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, slow: false, ph: i * 1.7, turn: 0 };
    const on = () => (b.slow = true), off = () => (b.slow = false);
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("focusin", on);
    el.addEventListener("focusout", off);
    return b;
  });
  let placed = false, last = performance.now(), stageSeen = true;
  new IntersectionObserver(([e]) => (stageSeen = e.isIntersecting)).observe(stage);
  const drift = (dt) => {
    const W = stage.clientWidth, H = stage.clientHeight, GAP = 8;
    for (const b of balls) {
      b.turn = Math.max(-0.6, Math.min(0.6, b.turn * 0.995 + (Math.random() - 0.5) * 2 * dt));
      const ca = Math.cos(b.turn * dt), sa = Math.sin(b.turn * dt), nvx = b.vx * ca - b.vy * sa;
      b.vy = b.vx * sa + b.vy * ca;
      b.vx = nvx;
      const f = b.slow ? 0.1 : 1;
      b.x += b.vx * dt * f;
      b.y += b.vy * dt * f;
      // soft edges: a bubble may drift up to 35% past an edge, then eases back in
      const o = b.r * 0.35, k = 1.2;
      if (b.x - b.r < 0) b.vx += (b.r - b.x) * k * dt;
      if (b.x + b.r > W) b.vx -= (b.x + b.r - W) * k * dt;
      if (b.y - b.r < 0) b.vy += (b.r - b.y) * k * dt;
      if (b.y + b.r > H) b.vy -= (b.y + b.r - H) * k * dt;
      if (b.x < b.r - o) { b.x = b.r - o; b.vx = Math.abs(b.vx); }
      if (b.x > W - b.r + o) { b.x = W - b.r + o; b.vx = -Math.abs(b.vx); }
      if (b.y < b.r - o) { b.y = b.r - o; b.vy = Math.abs(b.vy); }
      if (b.y > H - b.r + o) { b.y = H - b.r + o; b.vy = -Math.abs(b.vy); }
    }
    for (let pass = 0; pass < 3; pass++)
    for (let i = 0; i < balls.length; i++)
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], c = balls[j], dx = c.x - a.x, dy = c.y - a.y;
        const d = Math.hypot(dx, dy) || 0.01, min = a.r + c.r + GAP;
        if (d >= min) continue;
        const nx = dx / d, ny = dy / d, over = min - d, tot = a.m + c.m;
        a.x -= (nx * over * c.m) / tot; a.y -= (ny * over * c.m) / tot;
        c.x += (nx * over * a.m) / tot; c.y += (ny * over * a.m) / tot;
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (rv < 0 && pass === 0) {
          const imp = (-2 * rv) / (1 / a.m + 1 / c.m);
          a.vx -= (imp / a.m) * nx; a.vy -= (imp / a.m) * ny;
          c.vx += (imp / c.m) * nx; c.vy += (imp / c.m) * ny;
        }
      }
    // each bubble's cruising speed slowly breathes between ~19 and ~48 px/s
    const t = performance.now() / 1000;
    for (const b of balls) {
      let s = Math.hypot(b.vx, b.vy);
      if (s < 0.01) { const a = Math.random() * 6.283; b.vx = Math.cos(a); b.vy = Math.sin(a); s = 1; }
      const cruise = 33.6 + 14.7 * Math.sin(t * 0.22 + b.ph), target = Math.min(61, s + (cruise - s) * Math.min(1, dt * 0.9));
      b.vx *= target / s;
      b.vy *= target / s;
    }
  };
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!placed) {
      // measure each bubble at its starting spot, then hand positioning over to transforms
      balls.forEach((b) => {
        b.r0 = b.el.offsetWidth / 2;
        b.x = b.el.offsetLeft + b.r0;
        b.y = b.el.offsetTop + b.r0;
      });
      balls.forEach((b) => { b.el.style.left = "0px"; b.el.style.top = "0px"; b.el.style.transformOrigin = "0 0"; });
      placed = true;
    }
    // narrow screens shrink the bubbles instead of freezing them
    // and never let the bubbles cover more than ~44% of the stage, so they always have room to move
    const area = balls.reduce((a, b) => a + Math.PI * b.r0 * b.r0, 0) || 1;
    const sc = Math.min(1, Math.max(0.36, stage.clientWidth / 1240), Math.sqrt((0.44 * stage.clientWidth * stage.clientHeight) / area));
    for (const b of balls) { b.r = b.r0 * sc; b.m = b.r * b.r; }
    if (stageSeen && !matchMedia("(prefers-reduced-motion: reduce)").matches) drift(dt);
    for (const b of balls) b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) scale(${sc})`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* Click or tap a zoomable screen to see it full size; click anywhere or press Escape to close */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `<img alt="">`;
  document.body.append(lightbox);
  const closeLightbox = () => (lightbox.hidden = true);
  document.addEventListener("click", (e) => {
    const z = e.target.closest(".zoomable");
    if (z) {
      const img = z.querySelector("img");
      lightbox.firstChild.src = z.dataset.full;
      lightbox.firstChild.alt = img.alt;
      lightbox.hidden = false;
    } else if (!lightbox.hidden) closeLightbox();
  });
  addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

  /* Screens strip arrows */
  const strip = $("strip");
  document.querySelectorAll(".ctl").forEach((b) =>
    b.addEventListener("click", () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      strip.scrollBy({ left: strip.clientWidth * 0.8 * Number(b.dataset.dir), behavior: reduce ? "auto" : "smooth" });
    })
  );
})();
