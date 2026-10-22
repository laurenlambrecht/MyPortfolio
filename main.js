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
              <a class="bubble bub tone-${b.tone}" href="#${esc(b.target)}" style="--s:${b.d}px; --t:${Math.round(b.d * (b.title.length > 13 ? 0.13 : 0.155))}px">
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
        <h3 class="disp h-xl rv">${acc(g.decisions.heading)}</h3>
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

      <div class="sub next">
        <h3 class="disp h-l2 rv">${acc(g.next.heading)}</h3>
        <ol class="qs">
          ${g.next.questions.map((q) => `<li class="rv"><span class="ser" aria-hidden="true">?</span>${esc(q)}</li>`).join("")}
          <li class="rv"><span class="ser" aria-hidden="true">→</span>${esc(g.next.action)}</li>
        </ol>
      </div>
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
      <div class="pillars">${s.did.map((d) => `<div class="rv"><p class="disp pillar-k">${esc(d.k)}</p><p>${esc(d.t)}</p></div>`).join("")}</div>
    </div>
    <div class="sprints">${s.sprints
      .map((sp) => `<article class="sprint rv">
        <div class="wrap sprint-head">
          <p class="eyebrow">${esc(sp.label)} · ${sp.testers} testers</p>
          <h3 class="disp">${esc(sp.name)}</h3>
        </div>
        <div class="sprint-shot"><img src="${esc(sp.image.src)}" alt="${esc(sp.image.alt)}"></div>
        <div class="wrap"><p class="sprint-find"><span class="disp">${esc(sp.score)}</span>${esc(sp.finding)}</p></div>
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
    </div>`;

  /* Dusk: urban planning prototypes */
  const u = C.urban;
  const step = ([k, t]) => `<li><span class="disp">${esc(k)}</span>${esc(t)}</li>`;
  $("urban").innerHTML = `
    <div class="wrap">
      <p class="eyebrow rv">${esc(u.tag)}</p>
      <h2 id="urban-h" class="disp sp-title rv">${acc(u.title)}</h2>
      <p class="lead rv">${esc(u.lead)}</p>
      ${note(u.role)}
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
  $("playground").innerHTML = `
    <div class="wrap">
      <h2 id="play-h" class="disp h-xl rv">${acc(pg.heading)}</h2>
      <p class="intro rv">${esc(pg.intro)}</p>
      <div class="play">${pg.items
        .map((it, i) => `<article class="play-card ${i % 2 ? "flip" : ""} rv" id="${esc(it.id)}">
          <div class="play-shots ${it.phones ? "phones" : it.images.length === 3 ? "three" : it.images.length > 1 ? "two" : ""}">${it.images.map(shot).join("")}</div>
          <div class="play-text">
            <p class="eyebrow">${esc(it.kind)}</p>
            <h3 class="disp">${esc(it.title)}</h3>
            <p class="play-pitch">${esc(it.pitch)}</p>
            ${it.body ? (isTodo(it.body) ? note(it.body) : `<p class="play-body">${esc(it.body)}</p>`) : ""}
            ${it.role ? note(it.role) : ""}
            <div class="play-links">${it.links.map((l) => ext(l.href, l.label, "pill-cream")).join("")}</div>
          </div>
        </article>`)
        .join("")}</div>
    </div>`;

  /* Evening: more */
  $("more").innerHTML = `
    <div class="wrap">
      <h2 id="more-h" class="disp h-xl rv">${acc(C.more.heading)}</h2>
      <div class="more">${C.more.items
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
  const vine = $("vine");
  const NS = "http://www.w3.org/2000/svg";
  const BLOOMS = ["work", "goodgame", "samba", "sports", "urban", "playground", "about", "contact"];
  const PETALS = ["#FFC94A", "#FF7A3D", "#F58BB0", "#B79BFF", "#F58BB0", "#FFC94A", "#B79BFF", "#FF7A3D"];
  let stem, stemLen = 0, samples = [], extras = [];
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
    const leaf = Math.max(6, Math.min(20, g / 6));
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

    stem = el("path", { d: smooth(P), class: "vine-stem" });
    vine.append(stem);
    stemLen = stem.getTotalLength();
    stem.style.strokeDasharray = stemLen;
    samples = [];
    for (let s = 0; s <= stemLen; s += 16) samples.push([s, stem.getPointAtLength(s)]);
    const lenAtY = (y) => (samples.find(([, p]) => p.y >= y) || samples[samples.length - 1])[0];
    extras = [];
    // Leaves (and the odd curly tendril) along the stem, alternating sides, angled with the stem
    for (let s = 70, k = 0; s < stemLen; s += 120, k++) {
      const p = stem.getPointAtLength(s), q = stem.getPointAtLength(Math.min(stemLen, s + 2));
      const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      const sd = k % 2 ? 1 : -1;
      const n = el("g", { class: "vine-x", transform: `translate(${p.x} ${p.y}) rotate(${ang + sd * 50})` });
      if (k % 7 === 3) {
        const t = leaf * 0.9;
        n.append(el("path", { d: `M0 0 C ${t} ${-t * 0.2}, ${t * 2.2} ${t * 0.6}, ${t * 1.6} ${t * 1.3} S ${t * 0.7} ${t * 1.2}, ${t * 1.1} ${t * 0.7}`, class: "vine-curl" }));
      } else {
        const L = leaf * (0.8 + (0.4 * ((k * 37) % 10)) / 10);
        n.append(el("path", { d: `M0 0 Q ${L} ${-L * 0.75} ${L * 2.1} 0 Q ${L} ${L * 0.75} 0 0 Z`, class: "vine-leaf" }));
        n.append(el("path", { d: `M0 0 L ${L * 1.6} 0`, class: "vine-vein" }));
      }
      vine.append(n);
      extras.push({ s, n });
    }
    // A flower on the stem where each project starts
    BLOOMS.forEach((id, k) => {
      const b = box("#" + id);
      if (!b) return;
      const s = lenAtY(b.t + 60), p = stem.getPointAtLength(s);
      const r = Math.max(5, Math.min(11, g / 12));
      const n = el("g", { class: "vine-x", transform: `translate(${p.x} ${p.y})` });
      for (let a = 0; a < 5; a++) n.append(el("ellipse", { cx: 0, cy: -r, rx: r * 0.62, ry: r, fill: PETALS[k], transform: `rotate(${a * 72})` }));
      n.append(el("circle", { r: r * 0.55, class: "vine-eye" }));
      vine.append(n);
      extras.push({ s, n });
    });
    vine.lenAtY = lenAtY;
    growVine();
  };
  const growVine = () => {
    if (!stem) return;
    const H = parseFloat(vine.style.height);
    const reach = matchMedia("(prefers-reduced-motion: reduce)").matches ? H : scrollY + innerHeight * 0.85;
    const s = reach >= H ? stemLen : vine.lenAtY(reach);
    stem.style.strokeDashoffset = stemLen - s;
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
    for (let i = 0; i < balls.length; i++)
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], c = balls[j], dx = c.x - a.x, dy = c.y - a.y;
        const d = Math.hypot(dx, dy) || 0.01, min = a.r + c.r + GAP;
        if (d >= min) continue;
        const nx = dx / d, ny = dy / d, over = min - d, tot = a.m + c.m;
        a.x -= (nx * over * c.m) / tot; a.y -= (ny * over * c.m) / tot;
        c.x += (nx * over * a.m) / tot; c.y += (ny * over * a.m) / tot;
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (rv < 0) {
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
    const sc = Math.min(1, Math.max(0.42, stage.clientWidth / 1240));
    for (const b of balls) { b.r = b.r0 * sc; b.m = b.r * b.r; }
    if (stageSeen && !matchMedia("(prefers-reduced-motion: reduce)").matches) drift(dt);
    for (const b of balls) b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) scale(${sc})`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* Screens strip arrows */
  const strip = $("strip");
  document.querySelectorAll(".ctl").forEach((b) =>
    b.addEventListener("click", () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      strip.scrollBy({ left: strip.clientWidth * 0.8 * Number(b.dataset.dir), behavior: reduce ? "auto" : "smooth" });
    })
  );
})();
