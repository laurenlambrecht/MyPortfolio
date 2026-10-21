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
      <p class="hero-body rv">Hi, I'm <strong>${esc(C.name)}</strong>, ${esc(h.body)}</p>
      <div class="actions rv">
        <a class="btn btn-dark" href="#work">See my work <span aria-hidden="true">↓</span></a>
        <a class="btn btn-line" href="${esc(C.links.resume)}" target="_blank" rel="noopener">Resume</a>
      </div>
      <p class="scroll-hint bob"><span aria-hidden="true"></span>${esc(h.scrollHint)}</p>
    </div>`;

  const tickRun = h.interests.map((i) => `<span>${esc(i)}</span><span class="tick-star">✦</span>`).join("");
  $("ticker").setAttribute("aria-label", "Interests: " + h.interests.join(", "));
  $("ticker").innerHTML = `<div class="tick disp" aria-hidden="true">${tickRun.repeat(4)}</div>`;

  /* Project picker */
  const pk = C.picker;
  $("work").innerHTML = `
    <div class="wrap">
      <h2 id="picker-h" class="disp h-xl rv">${acc(pk.heading, "accent")}</h2>
      <p class="intro rv">${esc(pk.hint)}</p>
    </div>
    <ul class="bubbles wrap">${pk.bubbles
      .map((b, i) => `<li class="bubble-slot b-${b.size}" style="--d:${i * -0.7}s; --y:${[0, 90, -50, 40, -70, 60, -30, 30][i % 8]}px">
        <a class="bubble tone-${b.tone}" href="#${esc(b.target)}" data-tone="${b.tone}">
          <span class="disp bubble-t">${esc(b.title)}</span>
          <span class="bubble-s">${esc(b.sub)}</span>
        </a></li>`)
      .join("")}</ul>`;

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
      zoom.style.background = getComputedStyle(el).backgroundColor;
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

  /* Screens strip arrows */
  const strip = $("strip");
  document.querySelectorAll(".ctl").forEach((b) =>
    b.addEventListener("click", () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      strip.scrollBy({ left: strip.clientWidth * 0.8 * Number(b.dataset.dir), behavior: reduce ? "auto" : "smooth" });
    })
  );
})();
