(() => {
  "use strict";

  // ---------- storage ----------
  const KEY = "claremont-columns-v1";
  const HOUR = 3600 * 1000;

  function seedState() {
    const now = Date.now();
    const s = JSON.parse(JSON.stringify(window.CC_SEED));
    s.posts.forEach(p => { p.time = now - p.hoursAgo * HOUR; p.agreed = false; delete p.hoursAgo; });
    s.notifs.forEach(n => { n.time = now - n.hoursAgo * HOUR; n.read = false; delete n.hoursAgo; });
    s.user = { name: "", contact: "", ageRange: "", years: "" };
    return s;
  }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return seedState();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch (e) { toast("Couldn't save in this browser (storage full or blocked)."); return false; }
  }
  let state = load();

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const me = () => state.user.name || "you";
  const loc = id => state.locations.find(l => l.id === id);
  function ago(t) {
    const m = Math.round((Date.now() - t) / 60000);
    if (m < 1) return "just now";
    if (m < 60) return m + "m";
    const h = Math.round(m / 60);
    if (h < 24) return h + "h";
    return Math.round(h / 24) + "d";
  }
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  const ICONS = {
    pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="currentColor" opacity=".9"/><circle cx="12" cy="10" r="2.6" fill="#fff"/></svg>',
    feed: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="2.4" rx="1.2" fill="currentColor"/><rect x="4" y="10.8" width="16" height="2.4" rx="1.2" fill="currentColor"/><rect x="4" y="16.6" width="16" height="2.4" rx="1.2" fill="currentColor"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="currentColor"/><path d="M6.5 18c1.2-2.4 3.2-3.4 5.5-3.4s4.3 1 5.5 3.4" fill="currentColor"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="currentColor"/></svg>',
    comment: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="currentColor"/></svg>',
    engineer: '<svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 0 1 14 0z" fill="currentColor"/><rect x="3.5" y="12" width="17" height="2.4" rx="1.2" fill="currentColor"/><circle cx="12" cy="18" r="3" fill="currentColor" opacity=".6"/></svg>',
    eyes: '<svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="4" fill="currentColor"/><circle cx="16" cy="12" r="4" fill="currentColor"/><circle cx="9" cy="11" r="1.3" fill="#fff"/><circle cx="17" cy="11" r="1.3" fill="#fff"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    photos: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m5 17 5-5 3 3 2-2 4 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15.5" cy="9" r="1.6" fill="currentColor"/></svg>'
  };
  const icon = (n, cls = "") => `<span class="i ${cls}">${ICONS[n] || ""}</span>`;
  document.querySelectorAll("[data-ic]").forEach(el => { el.innerHTML = ICONS[el.dataset.ic]; });

  function photo(img, cls = "") {
    if (img.src) return `<div class="photo ${cls}"><img src="${esc(img.src)}" alt="${esc(img.label || "Uploaded photo")}"></div>`;
    const h = img.hue;
    return `<div class="photo placeholder ${cls}" style="--h:${h}" role="img" aria-label="${esc(img.label)}">
      <span>${icon("photos")}${esc(img.label)}</span></div>`;
  }

  // ---------- map ----------
  function mapSVG({ pins = state.locations, selected = null, draft = null, interactive = true } = {}) {
    const S = window.CC_STREETS;
    const counts = {};
    state.posts.forEach(p => counts[p.locId] = (counts[p.locId] || 0) + 1);
    const streets =
      S.horizontal.map(s => `<line x1="0" x2="600" y1="${s.y}" y2="${s.y}" class="st"/><text x="8" y="${s.y - 6}" class="stl">${s.name}</text>`).join("") +
      S.vertical.map(s => `<line y1="0" y2="420" x1="${s.x}" x2="${s.x}" class="st"/><text x="${s.x + 6}" y="412" class="stl" transform="rotate(-90 ${s.x + 6} 412)">${s.name}</text>`).join("");
    const pinEls = pins.map(l => {
      const n = counts[l.id] || 0;
      return `<g class="pin ${selected === l.id ? "sel" : ""}" data-loc="${l.id}" transform="translate(${l.x} ${l.y})" ${interactive ? `tabindex="0" role="button" aria-label="${esc(l.name)}, ${n} posts"` : ""}>
        <path d="M0 0c-9-11-14-17-14-24a14 14 0 1 1 28 0c0 7-5 13-14 24z"/>
        <text y="-20" text-anchor="middle">${n}</text></g>`;
    }).join("");
    const draftEl = draft ? `<g class="pin draft" transform="translate(${draft.x} ${draft.y})"><path d="M0 0c-9-11-14-17-14-24a14 14 0 1 1 28 0c0 7-5 13-14 24z"/><text y="-20" text-anchor="middle">+</text></g>` : "";
    return `<svg class="map" viewBox="0 0 600 420" role="group" aria-label="Map of Claremont Village">
      <rect width="600" height="420" class="ground"/>
      <rect x="240" y="160" width="80" height="70" rx="6" class="park"/>
      <text x="280" y="200" text-anchor="middle" class="parkl">Village green</text>
      ${streets}${pinEls}${draftEl}</svg>`;
  }

  // ---------- post card ----------
  function postCard(p, { showLoc = true } = {}) {
    const l = loc(p.locId);
    const top = p.comments[0];
    return `<article class="post" data-post="${p.id}">
      <header>
        <span class="avatar">${esc(p.user[0] || "?").toUpperCase()}</span>
        <div><strong>${esc(p.user)}</strong>${showLoc && l ? `<a href="#/loc/${l.id}" class="ploc">${icon("pin")}${esc(l.name)}</a>` : ""}</div>
        <time>${ago(p.time)}</time>
      </header>
      <div class="photos n${Math.min(p.images.length, 3)}">${p.images.slice(0, 3).map(i => photo(i)).join("")}</div>
      <div class="actions">
        <button class="agree ${p.agreed ? "on" : ""}" data-agree="${p.id}" aria-pressed="${p.agreed}">${icon("heart")}<span>${p.agrees}</span> agree</button>
        <button class="cbtn" data-focus="${p.id}">${icon("comment")}${p.comments.length}</button>
      </div>
      <p class="caption">${esc(p.caption)}</p>
      <ul class="comments">${p.comments.map(c => `<li class="${c.engineer ? "eng" : ""}">${c.engineer ? icon("engineer") : ""}<b>${esc(c.user)}</b> ${esc(c.text)}</li>`).join("")}</ul>
      <form class="cform" data-comment="${p.id}">
        <input name="c" placeholder="Add comment…" aria-label="Add a comment" maxlength="280" autocomplete="off">
        <button>Post</button>
      </form>
    </article>`;
  }

  // ---------- views ----------
  const views = {};

  views.map = () => {
    const hi = state.user.name ? `Welcome, ${esc(state.user.name)}!` : `Welcome!`;
    const recent = [...state.posts].sort((a, b) => b.time - a.time).slice(0, 3);
    return `<section class="pad">
      <p class="hand">${hi}</p>
      <h1>Claremont Columns map</h1>
      <p class="muted">Tap a pin to see photos and ideas posted there.</p>
      <div class="mapwrap">${mapSVG()}</div>
      <h2 class="sub">Latest</h2>
      <div class="mini-list">${recent.map(p => {
        const l = loc(p.locId);
        return `<a class="mini" href="#/loc/${l.id}">${photo(p.images[0], "thumb")}<span><b>${esc(l.name)}</b><small>${esc(p.caption)}</small></span></a>`;
      }).join("")}</div>
    </section>`;
  };

  views.loc = id => {
    const l = loc(id);
    if (!l) return `<section class="pad"><h1>Location not found</h1><a href="#/map">Back to map</a></section>`;
    const posts = state.posts.filter(p => p.locId === id).sort((a, b) => b.time - a.time);
    return `<section class="pad">
      <a href="#/map" class="back">← Map</a>
      <h1>${esc(l.name)}</h1>
      <p class="muted">${posts.length} post${posts.length === 1 ? "" : "s"} here</p>
      <div class="mapwrap small">${mapSVG({ selected: id })}</div>
      ${posts.map(p => postCard(p, { showLoc: false })).join("") || `<p class="empty">No posts yet. <a href="#/add?loc=${id}">Be the first.</a></p>`}
      <a class="btn wide" href="#/add?loc=${id}">Add a photo here</a>
    </section>`;
  };

  views.feed = () => {
    const posts = [...state.posts].sort((a, b) => b.time - a.time);
    return `<section class="pad">
      <h1>Feed</h1>
      <p class="muted">Newest first. Search by place on the <a href="#/map">map</a>.</p>
      ${posts.map(p => postCard(p)).join("")}
    </section>`;
  };

  // add flow keeps its own draft
  let draft = null;
  const newDraft = (locId = null) => ({ step: 1, locId, newLoc: null, images: [], caption: "" });

  views.add = params => {
    if (!draft || params.get("loc")) draft = newDraft(params.get("loc"));
    const d = draft;
    const steps = ["Location", "Photos", "Caption", "Review"];
    const bar = `<ol class="steps">${steps.map((s, i) => `<li class="${i + 1 === d.step ? "on" : i + 1 < d.step ? "done" : ""}">${i + 1}. ${s}</li>`).join("")}</ol>`;
    let body = "";
    if (d.step === 1) {
      const chosen = d.locId ? loc(d.locId)?.name : d.newLoc?.name;
      body = `<h2>Select location</h2>
        <label class="field">Type an address
          <input id="addr" placeholder="e.g. 140 W Bonita Ave" value="${esc(d.newLoc?.name || "")}" list="known">
          <datalist id="known">${state.locations.map(l => `<option value="${esc(l.name)}">`).join("")}</datalist>
        </label>
        <p class="or">or select on map</p>
        <div class="mapwrap pick">${mapSVG({ selected: d.locId, draft: d.newLoc })}</div>
        <p class="muted small">Tap a pin to pick an existing spot, or tap anywhere to drop a new one.</p>
        ${chosen ? `<p class="chosen">${icon("pin")} ${esc(chosen)}</p>` : ""}`;
    } else if (d.step === 2) {
      body = `<h2>Add photos</h2>
        <div class="pickers">
          <label class="picker">${icon("photos")}<span>Photo library</span><input type="file" accept="image/*" multiple id="lib"></label>
          <label class="picker">${icon("camera")}<span>Take image</span><input type="file" accept="image/*" capture="environment" id="cam"></label>
        </div>
        <div class="previews">${d.images.map((im, i) => `<div class="pv">${photo(im)}<button data-rm="${i}" aria-label="Remove photo">×</button></div>`).join("")}</div>
        <p class="muted small">Up to 4 photos. They're resized and kept in your browser.</p>`;
    } else if (d.step === 3) {
      body = `<h2>Add caption / question</h2>
        <textarea id="cap" rows="5" maxlength="400" placeholder="What do you love here, or what could be improved?">${esc(d.caption)}</textarea>
        <p class="muted small"><span id="cnt">${d.caption.length}</span>/400</p>`;
    } else {
      const name = d.locId ? loc(d.locId).name : d.newLoc.name;
      body = `<h2>Review &amp; post</h2>
        <article class="post preview">
          <header><span class="avatar">${esc(me()[0]).toUpperCase()}</span><div><strong>${esc(me())}</strong><span class="ploc">${icon("pin")}${esc(name)}</span></div><time>now</time></header>
          <div class="photos n${Math.min(d.images.length, 3)}">${d.images.slice(0, 3).map(i => photo(i)).join("")}</div>
          <p class="caption">${esc(d.caption)}</p>
        </article>`;
    }
    const canNext = d.step === 1 ? !!(d.locId || d.newLoc) : d.step === 2 ? d.images.length > 0 : d.step === 3 ? d.caption.trim().length > 0 : true;
    return `<section class="pad">
      <h1>How to add</h1>${bar}
      <div class="card">${body}</div>
      <div class="navrow">
        ${d.step > 1 ? `<button class="btn ghost" data-step="-1">Back</button>` : `<span></span>`}
        <button class="btn" data-step="1" ${canNext ? "" : "disabled"}>${d.step === 4 ? "Post!" : "Next"}</button>
      </div>
    </section>`;
  };

  const NOTIF_IC = { heart: "heart", engineer: "engineer", comment: "comment", pin: "pin", eyes: "eyes" };
  views.notifs = () => {
    const html = `<section class="pad">
      <h1>Notifications</h1>
      <ul class="notifs">${[...state.notifs].sort((a, b) => b.time - a.time).map(n =>
        `<li class="${n.read ? "" : "unread"}">${icon(NOTIF_IC[n.type] || "pin", "n-" + n.type)}<span>${esc(n.text)}</span><time>${ago(n.time)}</time></li>`).join("")}</ul>
    </section>`;
    state.notifs.forEach(n => n.read = true); save(); updateBadge();
    return html;
  };

  views.profile = () => {
    const u = state.user;
    const mine = state.posts.filter(p => p.user === me()).sort((a, b) => b.time - a.time);
    const opt = (list, v) => list.map(o => `<option ${o === v ? "selected" : ""}>${o}</option>`).join("");
    return `<section class="pad">
      <h1>Profile</h1>
      <p class="muted">Only a few details — nothing else is needed to post.</p>
      <form class="card profile" id="prof">
        <div class="bigavatar">${esc((u.name || "?")[0]).toUpperCase()}</div>
        <label class="field">Username<input name="name" value="${esc(u.name)}" required maxlength="24" placeholder="pick a username"></label>
        <label class="field">Email / phone<input name="contact" value="${esc(u.contact)}" maxlength="60" placeholder="optional"></label>
        <label class="field">Age range<select name="ageRange"><option value="">Prefer not to say</option>${opt(["Under 18", "18–24", "25–34", "35–49", "50–64", "65+"], u.ageRange)}</select></label>
        <label class="field">How long have you lived in Claremont?<select name="years"><option value="">Prefer not to say</option>${opt(["Less than 1 year", "1–5 years", "5–15 years", "15+ years", "I'm visiting / a student"], u.years)}</select></label>
        <button class="btn wide">Save profile</button>
      </form>
      <h2 class="sub">Your posts</h2>
      ${mine.map(p => postCard(p)).join("") || `<p class="empty">You haven't posted yet. <a href="#/add">Add your first photo.</a></p>`}
      <button class="linkbtn" id="reset">Reset demo data</button>
    </section>`;
  };

  views.featured = () => {
    const picks = state.posts.filter(p => p.featured).concat(
      [...state.posts].filter(p => !p.featured).sort((a, b) => b.agrees - a.agrees).slice(0, 2));
    return `<section class="pad">
      <p class="hand">Iteration 2</p>
      <h1>Featured Posts</h1>
      <p class="muted">A concept for a spotlight on the city's community-improvement page: city staff or engineers pick standout posts — great photos, thoughtful ideas, and ideas with lots of agreement — so residents see their contributions are seen and valued.</p>
      <div class="carousel" id="car" aria-roledescription="carousel">
        ${picks.map((p, i) => {
          const l = loc(p.locId);
          return `<figure class="slide ${i === 0 ? "on" : ""}" aria-hidden="${i !== 0}">
            ${photo(p.images[0], "hero")}
            <figcaption><span class="tag">${p.featured ? "Staff pick" : "Most agreed"}</span>
              <b>${esc(l.name)}</b><p>${esc(p.caption)}</p>
              <small>${icon("heart")}${p.agrees} agree · posted by ${esc(p.user)}</small>
              <a href="#/loc/${l.id}">See this spot →</a></figcaption></figure>`;
        }).join("")}
        <div class="dots">${picks.map((_, i) => `<button data-dot="${i}" class="${i === 0 ? "on" : ""}" aria-label="Show featured post ${i + 1}"></button>`).join("")}</div>
      </div>
    </section>`;
  };

  views.about = () => `<section class="pad prose">
    <p class="hand">Human-centered design project</p>
    <h1>The process</h1>
    <p>Claremont Columns is a social app for Claremont residents to upload photos of places they love — or places that could use engineering improvements. Every post has photos and a location, and gives neighbors a way to agree or comment.</p>
    <h2>Iteration 1 — paper prototype</h2>
    <ul>
      <li><b>Map home:</b> the city as a map; tap a pin to see everything posted at that address.</li>
      <li><b>Chronological feed,</b> with search by location through the map.</li>
      <li><b>Four-step add flow:</b> select location (type or tap) → add photos (library or camera) → caption or question → review and post.</li>
      <li><b>Notifications</b> for likes, comments, engineer replies, new photos at your location, and what's nearby.</li>
      <li><b>A tiny profile:</b> username, email/phone, age range, and how long you've lived in Claremont — a low bar to join.</li>
    </ul>
    <figure><img src="assets/process/iteration1-sketches.png" alt="Hand-drawn sketches of the home map, location page, feed post and add flow"><figcaption>Iteration 1 sketches</figcaption></figure>
    <figure><img src="assets/process/iteration1-notes.png" alt="Sketches of notifications and profile screens with design notes"><figcaption>Notifications, profile, and design notes</figcaption></figure>
    <h2>Iteration 2 — closing the loop</h2>
    <p>Feedback pointed to a missing piece: would anyone at the city actually see these posts? Iteration 2 adds a <a href="#/featured">Featured Posts</a> gallery on the city website. Residents post normally; staff or engineers review submissions and publish standouts in a community spotlight.</p>
    <figure><img src="assets/process/iteration2-featured.png" alt="Mockup of a Featured Posts tile and spotlight gallery on a city website"><figcaption>Iteration 2 mockup</figcaption></figure>
    <h2>This build</h2>
    <p>A working, front-end-only version of the prototype. Posts, agrees, comments and your profile are saved in your browser, so you can try the whole flow. The map is an illustrated grid of Claremont Village rather than a live map.</p>
  </section>`;

  // ---------- router ----------
  function route() {
    const hash = location.hash.replace(/^#\/?/, "") || "map";
    const [pathPart, query = ""] = hash.split("?");
    const [name, arg] = pathPart.split("/");
    const params = new URLSearchParams(query);
    const view = views[name] ? name : "map";
    if (view !== "add") draft = null;
    $("#view").innerHTML = view === "loc" ? views.loc(arg) : views[view](params);
    document.querySelectorAll("[data-route]").forEach(a => a.classList.toggle("on", a.dataset.route === view || (view === "loc" && a.dataset.route === "map")));
    document.title = (view === "map" ? "" : (view === "loc" ? (loc(arg)?.name || "Location") : view[0].toUpperCase() + view.slice(1)) + " · ") + "Claremont Columns";
    window.scrollTo(0, 0);
    if (view === "featured") startCarousel(); else stopCarousel();
  }
  function rerenderAdd() { $("#view").innerHTML = views.add(new URLSearchParams()); }
  function updateBadge() {
    const n = state.notifs.filter(x => !x.read).length, b = $("#badge");
    b.hidden = !n; b.textContent = n;
  }

  // carousel
  let carT = null, carI = 0;
  function showSlide(i) {
    const slides = document.querySelectorAll(".slide"), dots = document.querySelectorAll("[data-dot]");
    if (!slides.length) return;
    carI = (i + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle("on", k === carI); s.setAttribute("aria-hidden", k !== carI); });
    dots.forEach((d, k) => d.classList.toggle("on", k === carI));
  }
  function startCarousel() {
    stopCarousel(); carI = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    carT = setInterval(() => showSlide(carI + 1), 5000);
  }
  function stopCarousel() { clearInterval(carT); carT = null; }

  // ---------- image handling ----------
  function readImage(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onerror = rej;
      fr.onload = () => {
        const img = new Image();
        img.onerror = rej;
        img.onload = () => {
          const max = 900, sc = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement("canvas");
          c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          res({ src: c.toDataURL("image/jpeg", 0.72), label: file.name });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  // ---------- events ----------
  document.addEventListener("click", e => {
    const t = e.target;

    const pin = t.closest(".pin[data-loc]");
    const svg = t.closest("svg.map");
    if (svg && $(".mapwrap.pick")?.contains(svg)) {
      if (pin) { draft.locId = pin.dataset.loc; draft.newLoc = null; }
      else {
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const p = pt.matrixTransform(svg.getScreenCTM().inverse());
        const name = ($("#addr")?.value || "").trim() || "New spot near " + nearest(p);
        draft.locId = null; draft.newLoc = { x: Math.round(p.x), y: Math.round(p.y), name };
      }
      rerenderAdd(); return;
    }
    if (pin) { location.hash = "#/loc/" + pin.dataset.loc; return; }

    const ag = t.closest("[data-agree]");
    if (ag) {
      const p = state.posts.find(x => x.id === ag.dataset.agree);
      p.agreed = !p.agreed; p.agrees += p.agreed ? 1 : -1; save();
      ag.classList.toggle("on", p.agreed); ag.setAttribute("aria-pressed", p.agreed);
      ag.querySelector("span:last-of-type").textContent = p.agrees;
      return;
    }
    const fc = t.closest("[data-focus]");
    if (fc) { $(`[data-comment="${fc.dataset.focus}"] input`)?.focus(); return; }

    const st = t.closest("[data-step]");
    if (st && draft) {
      const dir = +st.dataset.step;
      if (dir > 0 && draft.step === 4) return publish();
      draft.step = Math.max(1, Math.min(4, draft.step + dir)); rerenderAdd(); return;
    }
    const rm = t.closest("[data-rm]");
    if (rm) { draft.images.splice(+rm.dataset.rm, 1); rerenderAdd(); return; }

    const dot = t.closest("[data-dot]");
    if (dot) { stopCarousel(); showSlide(+dot.dataset.dot); return; }

    if (t.id === "reset" && confirm("Reset everything to the sample data? Your posts and profile will be cleared.")) {
      try { localStorage.removeItem(KEY); } catch (err) {}
      state = seedState(); updateBadge(); route(); toast("Demo data reset");
    }
  });

  document.addEventListener("keydown", e => {
    const pin = e.target.closest?.(".pin[data-loc]");
    if (pin && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pin.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
  });

  document.addEventListener("input", e => {
    if (!draft) return;
    if (e.target.id === "cap") {
      draft.caption = e.target.value; $("#cnt").textContent = draft.caption.length;
      $('[data-step="1"]').disabled = !draft.caption.trim();
    }
    if (e.target.id === "addr") {
      const v = e.target.value.trim();
      const match = state.locations.find(l => l.name.toLowerCase() === v.toLowerCase());
      if (match) { draft.locId = match.id; draft.newLoc = null; }
      else if (v) { draft.locId = null; draft.newLoc = { ...(draft.newLoc || randomSpot()), name: v }; }
      else { draft.newLoc = null; }
      $('[data-step="1"]').disabled = !(draft.locId || draft.newLoc);
    }
  });
  document.addEventListener("change", async e => {
    if (e.target.id === "addr" && draft) rerenderAdd();
    if ((e.target.id === "lib" || e.target.id === "cam") && draft) {
      const files = [...e.target.files].slice(0, 4 - draft.images.length);
      for (const f of files) { try { draft.images.push(await readImage(f)); } catch (err) { toast("Couldn't read " + f.name); } }
      rerenderAdd();
    }
  });

  document.addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    if (f.dataset.comment) {
      const text = f.c.value.trim(); if (!text) return;
      const p = state.posts.find(x => x.id === f.dataset.comment);
      p.comments.push({ user: me(), text }); save();
      f.closest(".post").outerHTML = postCard(p, { showLoc: !location.hash.startsWith("#/loc") });
      return;
    }
    if (f.id === "prof") {
      const old = state.user.name;
      const fd = new FormData(f);
      state.user = { name: fd.get("name").trim(), contact: fd.get("contact").trim(), ageRange: fd.get("ageRange"), years: fd.get("years") };
      if (old && old !== state.user.name) state.posts.forEach(p => { if (p.user === old) p.user = state.user.name; });
      save(); toast("Profile saved"); route();
    }
  });

  function nearest(p) {
    const S = window.CC_STREETS;
    const h = S.horizontal.reduce((a, b) => Math.abs(b.y - p.y) < Math.abs(a.y - p.y) ? b : a);
    const v = S.vertical.reduce((a, b) => Math.abs(b.x - p.x) < Math.abs(a.x - p.x) ? b : a);
    return `${v.name} & ${h.name}`;
  }
  function randomSpot() { return { x: 120 + Math.round(Math.random() * 360), y: 90 + Math.round(Math.random() * 240) }; }

  function publish() {
    const d = draft;
    let locId = d.locId;
    if (!locId) {
      locId = "l" + uid();
      state.locations.push({ id: locId, name: d.newLoc.name, x: d.newLoc.x, y: d.newLoc.y });
    }
    const post = { id: "p" + uid(), locId, user: me(), time: Date.now(), images: d.images, caption: d.caption.trim(), agrees: 0, agreed: false, comments: [] };
    state.posts.push(post);
    if (!save()) { state.posts.pop(); return; }
    state.notifs.push({ type: "pin", text: `Your photo is live at ${loc(locId).name}`, time: Date.now(), read: false });
    save(); updateBadge();
    draft = null; toast("Posted!");
    location.hash = "#/loc/" + locId;
  }

  window.addEventListener("hashchange", route);
  updateBadge();
  route();
})();
