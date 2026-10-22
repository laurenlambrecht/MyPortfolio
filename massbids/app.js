(function () {
  "use strict";

  const LON_MIN = -73.55;
  const LON_MAX = -69.95;
  const LAT_MIN = 41.15;
  const LAT_MAX = 42.95;

  function project(lon, lat, w, h) {
    const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * w;
    const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h;
    return { x, y };
  }

  const MUNICIPALITIES = [
    { id: "boston", name: "Boston", lon: -71.0589, lat: 42.3601 },
    { id: "worcester", name: "Worcester", lon: -71.8023, lat: 42.2626 },
    { id: "springfield", name: "Springfield", lon: -72.5898, lat: 42.1015 },
    { id: "cambridge", name: "Cambridge", lon: -71.1097, lat: 42.3736 },
    { id: "lowell", name: "Lowell", lon: -71.3162, lat: 42.6334 },
    { id: "quincy", name: "Quincy", lon: -71.0023, lat: 42.2529 },
    { id: "newton", name: "Newton", lon: -71.1952, lat: 42.337 },
    { id: "somerville", name: "Somerville", lon: -71.1032, lat: 42.3876 },
  ];

  const BIDS_BY_CITY = {
    Boston: [
      {
        id: "bos-1",
        title: "Municipal fleet EV charging infrastructure",
        category: "A",
        deadline: "Jun 18, 2026",
        value: "$2.4M – $3.1M",
        department: "Public Works",
        description:
          "Design-build installation of fast-charging stations at three city-owned depots, including civil, electrical, and network integration.",
      },
      {
        id: "bos-2",
        title: "Enterprise financial management system",
        category: "B",
        deadline: "Jul 02, 2026",
        value: "$890K – $1.2M",
        department: "Office of Budget",
        description:
          "Cloud ERP module for procurement, grants, and encumbrance tracking with SSO and audit-ready reporting.",
      },
      {
        id: "bos-3",
        title: "Harbor district security & access control",
        category: "C",
        deadline: "May 28, 2026",
        value: "$410K – $520K",
        department: "Homeland Security",
        description:
          "Unified badge readers, cameras, and visitor management for waterfront facilities; phased cutover required.",
      },
      {
        id: "bos-4",
        title: "Streetscape ADA ramp program — Phase IV",
        category: "A",
        deadline: "Aug 12, 2026",
        value: "$5.5M – $6.8M",
        department: "Transportation",
        description:
          "Construction services for corner ramps, detectable warnings, and signal push-button upgrades citywide.",
      },
    ],
    Worcester: [
      {
        id: "wor-1",
        title: "School nutrition warehouse cold storage",
        category: "A",
        deadline: "Jun 05, 2026",
        value: "$1.1M – $1.4M",
        department: "Public Schools",
        description:
          "Renovation of regional distribution center with expanded refrigeration and inventory scanning.",
      },
      {
        id: "wor-2",
        title: "311 / CRM platform migration",
        category: "B",
        deadline: "Jul 22, 2026",
        value: "$620K – $780K",
        department: "Digital Services",
        description:
          "SaaS implementation with IVR, knowledge base, and integrations to work-order and billing systems.",
      },
      {
        id: "wor-3",
        title: "Uniforms & PPE consolidated supply",
        category: "C",
        deadline: "May 30, 2026",
        value: "$180K – $240K (annual)",
        department: "Central Procurement",
        description:
          "Multi-year contract for standardized uniforms, safety gear, and embroidery services.",
      },
    ],
    Springfield: [
      {
        id: "spr-1",
        title: "Wastewater pump station SCADA upgrade",
        category: "A",
        deadline: "Sep 01, 2026",
        value: "$3.2M – $3.9M",
        department: "Water & Sewer Commission",
        description:
          "Replace legacy controls, add redundant communications, and modernize HMI at four pump stations.",
      },
      {
        id: "spr-2",
        title: "Cybersecurity managed detection & response",
        category: "B",
        deadline: "Jun 14, 2026",
        value: "$340K – $420K (3 yr)",
        department: "IT",
        description:
          "24/7 MDR, log ingestion from hybrid cloud, tabletop exercises, and compliance mapping.",
      },
      {
        id: "spr-3",
        title: "Parks turf maintenance equipment",
        category: "C",
        deadline: "May 20, 2026",
        value: "$95K – $125K",
        department: "Parks & Recreation",
        description:
          "Purchase of commercial mowers, aerators, and utility vehicles with training and warranty.",
      },
    ],
    Cambridge: [
      {
        id: "cam-1",
        title: "Net-zero library mechanical retrofit",
        category: "A",
        deadline: "Aug 04, 2026",
        value: "$4.0M – $4.6M",
        department: "Public Facilities",
        description:
          "Heat pump VRF, envelope improvements, and commissioning for flagship branch renovation.",
      },
      {
        id: "cam-2",
        title: "Open data & API gateway",
        category: "B",
        deadline: "Jul 09, 2026",
        value: "$510K – $650K",
        department: "Innovation & Technology",
        description:
          "Developer portal, rate limiting, and catalog sync for permits, budgets, and mobility datasets.",
      },
    ],
    Lowell: [
      {
        id: "low-1",
        title: "Canal walk lighting & handrail replacement",
        category: "A",
        deadline: "Jun 27, 2026",
        value: "$780K – $920K",
        department: "Planning & Development",
        description:
          "Historic-sensitive fixtures, corrosion-resistant rails, and photometric study deliverables.",
      },
      {
        id: "low-2",
        title: "Records digitization & archival hosting",
        category: "B",
        deadline: "Aug 19, 2026",
        value: "$275K – $330K",
        department: "City Clerk",
        description:
          "High-volume scanning, OCR, redaction workflow, and long-term digital preservation.",
      },
      {
        id: "low-3",
        title: "Janitorial services — municipal buildings",
        category: "C",
        deadline: "May 15, 2026",
        value: "$1.5M – $1.9M (base + options)",
        department: "Facilities",
        description:
          "Nightly cleaning, day porter coverage, and green cleaning product requirements.",
      },
    ],
    Quincy: [
      {
        id: "qui-1",
        title: "Coastal resilience study & pilot berms",
        category: "A",
        deadline: "Oct 03, 2026",
        value: "$1.6M – $2.0M",
        department: "Harbor & Coastal",
        description:
          "Engineering study, community workshops, and construction of pilot nature-based protections.",
      },
      {
        id: "qui-2",
        title: "Payroll & timekeeping modernization",
        category: "B",
        deadline: "Jun 30, 2026",
        value: "$720K – $880K",
        department: "Human Resources",
        description:
          "Full HCM suite rollout with union rule sets, mobile clock, and legacy data migration.",
      },
    ],
    Newton: [
      {
        id: "new-1",
        title: "Traffic signal cabinet replacements",
        category: "A",
        deadline: "Jul 16, 2026",
        value: "$2.1M – $2.5M",
        department: "Traffic Engineering",
        description:
          "Twelve intersections with new cabinets, battery backup, and central system cutover.",
      },
      {
        id: "new-2",
        title: "Office supplies & managed print",
        category: "C",
        deadline: "May 25, 2026",
        value: "$210K – $280K (annual)",
        department: "Purchasing",
        description:
          "Catalog pricing, toner-inclusive devices, and sustainability reporting.",
      },
    ],
    Somerville: [
      {
        id: "som-1",
        title: "Green line corridor utility coordination",
        category: "A",
        deadline: "Sep 15, 2026",
        value: "$6.2M – $7.5M",
        department: "Infrastructure",
        description:
          "Relocation and protection of water, sewer, and telecom during transit expansion; night work windows.",
      },
      {
        id: "som-2",
        title: "Grants management software",
        category: "B",
        deadline: "Aug 01, 2026",
        value: "$380K – $460K",
        department: "Finance",
        description:
          "Lifecycle tracking from NOFA to closeout, subrecipient monitoring, and federal reporting templates.",
      },
      {
        id: "som-3",
        title: "Food waste collection carts & hauling",
        category: "C",
        deadline: "Jun 08, 2026",
        value: "$140K – $190K",
        department: "Sustainability",
        description:
          "Curbside organics rollout for pilot districts with education and contamination metrics.",
      },
    ],
  };

  const state = {
    selectedCity: null,
    category: "all",
    search: "",
  };

  const els = {
    markers: document.getElementById("map-markers"),
    panel: document.getElementById("detail-panel"),
    backdrop: document.getElementById("backdrop"),
    panelClose: document.getElementById("panel-close"),
    panelTitle: document.getElementById("panel-title"),
    panelMeta: document.getElementById("panel-meta"),
    panelEmpty: document.getElementById("panel-empty"),
    panelListWrap: document.getElementById("panel-list-wrap"),
    bidList: document.getElementById("bid-list"),
    resultsCount: document.getElementById("results-count"),
    search: document.getElementById("search-input"),
    chips: document.querySelectorAll(".chip"),
  };

  const MAP_W = 400;
  const MAP_H = 250;

  function badgeClass(cat) {
    return "badge-cat badge-cat--" + cat.toLowerCase();
  }

  function renderMarkers() {
    els.markers.innerHTML = "";
    MUNICIPALITIES.forEach((m) => {
      const { x, y } = project(m.lon, m.lat, MAP_W, MAP_H);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.classList.add("ma-map__marker");
      g.setAttribute("data-city", m.name);
      g.setAttribute("role", "button");
      g.setAttribute("tabindex", "0");
      g.setAttribute("aria-label", "View bids for " + m.name);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(y));
      circle.setAttribute("r", "7");
      circle.setAttribute("class", "ma-map__marker-dot");
      circle.setAttribute("fill", "var(--marker-default)");
      circle.setAttribute("stroke", "var(--marker-ring)");
      circle.setAttribute("stroke-width", "2");

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", String(x + 10));
      label.setAttribute("y", String(y + 3));
      label.setAttribute("class", "ma-map__marker-label");
      label.textContent = m.name;

      g.appendChild(circle);
      g.appendChild(label);

      g.addEventListener("click", () => selectCity(m.name));
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectCity(m.name);
        }
      });

      els.markers.appendChild(g);
    });
    updateMarkerSelection();
  }

  function updateMarkerSelection() {
    document.querySelectorAll(".ma-map__marker").forEach((node) => {
      const city = node.getAttribute("data-city");
      node.classList.toggle("ma-map__marker--selected", city === state.selectedCity);
    });
  }

  function filterBids(bids) {
    let list = bids;
    if (state.category !== "all") {
      list = list.filter((b) => b.category === state.category);
    }
    const q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.department.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function renderPanel() {
    if (!state.selectedCity) {
      els.panelTitle.textContent = "—";
      els.panelMeta.textContent = "";
      els.panelEmpty.hidden = false;
      els.panelListWrap.hidden = true;
      els.panel.classList.remove("detail-panel--open");
      els.panel.setAttribute("aria-hidden", "true");
      if (els.backdrop) {
        els.backdrop.hidden = true;
        els.backdrop.classList.remove("backdrop--visible");
      }
      return;
    }

    const allBids = BIDS_BY_CITY[state.selectedCity] || [];
    const bids = filterBids(allBids);

    els.panelTitle.textContent = state.selectedCity;
    els.panelMeta.textContent =
      allBids.length + " active opportunit" + (allBids.length === 1 ? "y" : "ies") + " (demo data)";

    els.panelEmpty.hidden = true;
    els.panelListWrap.hidden = false;
    els.panel.classList.add("detail-panel--open");
    els.panel.setAttribute("aria-hidden", "false");

    if (window.matchMedia("(max-width: 1024px)").matches && els.backdrop) {
      els.backdrop.hidden = false;
      requestAnimationFrame(() => els.backdrop.classList.add("backdrop--visible"));
    }

    els.resultsCount.textContent =
      bids.length === 0
        ? "No bids match your filters."
        : "Showing " + bids.length + " of " + allBids.length + " bids";

    els.bidList.innerHTML = "";
    bids.forEach((b) => {
      const li = document.createElement("li");
      li.className = "bid-card";
      li.innerHTML =
        '<div class="bid-card__top">' +
        "<h3 class=\"bid-card__title\">" +
        escapeHtml(b.title) +
        "</h3>" +
        '<span class="' +
        badgeClass(b.category) +
        '">Bid ' +
        escapeHtml(b.category) +
        "</span>" +
        "</div>" +
        '<div class="bid-card__meta">' +
        "<div><span><strong>Deadline</strong></span>" +
        escapeHtml(b.deadline) +
        "</div>" +
        "<div><span><strong>Est. value</strong></span>" +
        escapeHtml(b.value) +
        "</div>" +
        "<div class=\"bid-card__meta--full\"><span><strong>Department</strong></span>" +
        escapeHtml(b.department) +
        "</div>" +
        "</div>" +
        '<p class="bid-card__desc">' +
        escapeHtml(b.description) +
        "</p>" +
        '<button type="button" class="btn-view" data-bid-id="' +
        escapeHtml(b.id) +
        '">View Details</button>';
      els.bidList.appendChild(li);
    });

    els.bidList.querySelectorAll(".btn-view").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-bid-id");
        window.alert("Demo: would open RFP detail for " + id + " in a full product.");
      });
    });
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function selectCity(name) {
    state.selectedCity = name;
    updateMarkerSelection();
    renderPanel();
  }

  function closePanel() {
    state.selectedCity = null;
    updateMarkerSelection();
    renderPanel();
  }

  els.panelClose.addEventListener("click", closePanel);
  if (els.backdrop) {
    els.backdrop.addEventListener("click", closePanel);
  }

  els.search.addEventListener("input", () => {
    state.search = els.search.value;
    renderPanel();
  });

  els.chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cat = chip.getAttribute("data-category");
      state.category = cat;
      els.chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");
      renderPanel();
    });
  });

  window.addEventListener("resize", () => {
    if (state.selectedCity && window.matchMedia("(min-width: 1025px)").matches && els.backdrop) {
      els.backdrop.hidden = true;
      els.backdrop.classList.remove("backdrop--visible");
    } else if (state.selectedCity && window.matchMedia("(max-width: 1024px)").matches && els.backdrop) {
      els.backdrop.hidden = false;
      els.backdrop.classList.add("backdrop--visible");
    }
  });

  renderMarkers();
  renderPanel();
})();
