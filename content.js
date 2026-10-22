/*
  All site text, links and images live in this file.
  - To change copy, edit the strings below.
  - Wrap a word in _underscores_ to set it in the italic serif accent.
  - To add an image, drop it in /assets and set its `src`. An empty `src` shows a marked placeholder.
  - Anything starting with "TODO:" renders as a dashed "to add" placeholder on the page.
*/
window.CONTENT = {
  name: "Lauren Lambrecht",
  email: "LLambrecht58@cmc.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/lauren-lambrecht01",
    github: "https://github.com/laurenlambrecht",
    resume: "assets/Lauren-Lambrecht-Resume.pdf",
    paper: "assets/Lauren-Lambrecht-Software-Development-in-an-AI-World.pdf",
  },

  hero: {
    eyebrow: ["Product Strategy & Design Portfolio", "Claremont McKenna '27"],
    headline: "Building products that bring people _closer_ to the things they _love._",
    // First paragraph follows "Hi, I'm <name>, ".
    body: [
      "a senior at Claremont McKenna College passionate about building products at the intersection of technology, strategy, and data.",
      "I thrive in environments that turn fast-paced collaboration into real actionable products and solutions. I love understanding how and why people think, using data to inform strategy, and turning concepts into tangible/digital products that people love. My work spans product development, market strategy, data analytics, UI design, and interactive prototyping: combining big-picture strategy with results.",
      "Below is a collection of projects I've worked on over the past four years, each reflecting a different part of how I think, build, and approach problems.",
    ],
    scrollHint: "Keep scrolling. More ahead!",
    interests: ["Consumer tech", "Sports", "Fitness", "Wearables"],
    showTicker: false, // the scrolling interests band; hidden for now
  },

  // The bubbles under "See my work". `target` is the section id each one opens.
  picker: {
    heading: "Pick a _project._",
    hint: "Tap a bubble to jump in.",
    // d = diameter in px, x = left edge as % of the stage, y = top in px (desktop starting spot; they drift from there)
    bubbles: [
      { target: "goodgame", title: "GoodGame", sub: "Intramural Pickup Game App: Bringing accountability and ease of connection to anyone, anywhere.", tone: "morning", d: 355, x: 1, y: 50 },
      { target: "samba", title: "Samba TV", sub: "Building a social media for your TV habits", tone: "afternoon", d: 355, x: 33, y: 0 },
      { target: "p-hiki", title: "Hiki", sub: "Reimagining traditional online dating apps", tone: "night", d: 355, x: 64, y: 100 },
      { target: "p-guppo", title: "Guppo", sub: "Social media tracking for your next fishing catch", tone: "teal", d: 200, x: 85, y: 0 },
      { target: "sports", title: "Sports Fan Dashboard", sub: "Tracking fan engagement across the NFL sports season", tone: "dusk", d: 260, x: 3, y: 480 },
      { target: "p-massbids", title: "MassBids", sub: "Zillow for Government Contractors", tone: "noon", d: 260, x: 30, y: 360 },
      { target: "urban", title: "Claremont Columns", sub: "A social app concept for Claremont residents to upload photos of places they love in Claremont — or places that could use engineering improvement.", tone: "pink", d: 260, x: 55, y: 480 },
      { target: "p-jungle", title: "Jungle Quest", sub: "Jungle-themed Brick Breaker Website", tone: "jungle", d: 200, x: 84, y: 320 },
      { target: "more", title: "Beyond the Build", sub: "Leadership, experiences & interests", tone: "evening", d: 165, x: 86, y: 600 },
    ],
  },

  goodgame: {
    tag: "01 · Featured personal project",
    title: "Good_Game_",
    pitch: "A pickup-sports app prototype for finding, joining and _actually showing up_ to local games.",
    statline: [
      ["Stage", "Working prototype"],
      ["Role", "Solo: concept, design, build"],
      ["Stack", "React Native, Expo, TypeScript"],
    ],
    links: [
      { label: "Live site", href: "https://laurenlambrecht.github.io/GoodGames/" },
      { label: "Code on GitHub", href: "https://github.com/laurenlambrecht/GoodGame" },
      { label: "Demo video", href: "" }, // TODO: link to a screen recording (Loom, YouTube, etc.)
    ],
    hero: { src: "assets/goodgame/play.jpg", alt: "GoodGame Play tab on an iPhone", title: "Play tab", need: "Screenshot: Play tab, iPhone portrait" },

    problem: {
      heading: "The problem",
      body: [
        "Pickup games mostly live in group chats and word of mouth. If you're new to a city, or just new to a sport, it's hard to know where games are, whether they're at your level, and whether enough people will show up for it to happen.",
      ],
      note: "TODO: Your story: what led you here. A personal moment, conversations with players, or anything you observed.",
      quote: "A game only works if people who say they're coming",
      quoteHighlight: "actually come.",
    },

    // The concept landing page from the live site
    web: {
      src: "assets/projects/goodgame-web.jpg",
      alt: "GoodGame landing page with the headline Go Play Outside",
      caption: "I also built a landing page to pitch the concept. Any numbers on it are mock-ups, not results.",
    },

    role: {
      heading: "My role, and where it is",
      body:
        "This is my own project. I came up with the concept, designed the flows as a clickable prototype, then built a native version in React Native and Expo using AI coding tools. It runs in Expo Go on the iOS Simulator. Every game, player and score in it is sample data, state resets when the app reloads, and there is no backend or real payment processing yet.",
    },

    solution: {
      heading: "What I built",
      intro: "Three tabs, each answering _one question_ a player has.",
      tabs: [
        { name: "Play", q: "What am I playing next?", body: "Your next game with a one-tap check-in, plus a filterable list of runs near you." },
        { name: "Maps", q: "Where are games happening?", body: "An Apple Maps view with sport-colored pins, region pills and a game card for the selected pin." },
        { name: "Profile", q: "Can people count on me?", body: "A reliability score, your last 10 games, your home region and upcoming games." },
      ],
      sports: ["Basketball", "Soccer", "Volleyball", "Pickleball"],
    },

    // The real join → check-in rules from the prototype
    loop: {
      heading: "The show-up _loop_",
      intro: "The core mechanic, exactly as the prototype runs it.",
      start: { label: "Step one", step: "Join", detail: "$5 deposit held" },
      outcomes: [
        { step: "Show up", detail: "Check in · $5 refunded · +2 score", tone: "good" },
        { step: "No-show", detail: "$5 forfeited · −3 score", tone: "bad" },
      ],
    },

    // San Francisco first
    screens: [
      { src: "assets/goodgame/map-norcal.jpg", alt: "Map of the Bay Area with sport-colored pins in San Francisco, Oakland and San José", title: "Maps", caption: "runs around the Bay, colored by sport" },
      { src: "assets/goodgame/join-sf.jpg", alt: "Join sheet for Saturday pickup soccer at Dolores Park, explaining the $5 deposit", title: "Join", caption: "the $5 hold, explained up front" },
      { src: "assets/goodgame/profile-sf.jpg", alt: "Profile with a reliability score of 92 and home region Northern California", title: "Profile", caption: "reliability score, home region San Francisco" },
      { src: "assets/goodgame/play.jpg", alt: "Play tab with tonight's game, a check-in button and runs near you", title: "Play", caption: "next game and nearby runs" },
      { src: "assets/goodgame/map-us.jpg", alt: "Map of North America with run counts for NorCal, SoCal and Chicago", title: "All US", caption: "three launch regions in the prototype" },
      { src: "assets/goodgame/map-socal.jpg", alt: "Map of Southern California with clustered pins in LA, Orange County and San Diego", title: "SoCal", caption: "LA to San Diego" },
      { src: "assets/goodgame/profile-la.jpg", alt: "Profile with home region Southern California", title: "Switch region", caption: "same score in LA or SF" },
    ],

    decisions: {
      heading: "Decisions _and_ tradeoffs",
      items: [
        {
          title: "A small deposit instead of a free RSVP",
          body: "Joining holds $5, refunded on check-in. Leaving more than 24 hours out refunds it; leaving later forfeits it.",
          tradeoff: "adds friction at the moment of joining, and needs real payments before it can work outside a prototype.",
        },
        {
          title: "A reliability score that unlocks access",
          body: "Showing up earns +2 and a no-show costs 3. Some runs are gated, like a competitive run open to scores of 85 and up.",
          tradeoff: "rewards regulars, but could feel punitive to someone new or someone who misses once.",
        },
        {
          title: "Your score travels with you",
          body: "Switching regions keeps your score and history, so moving cities doesn't mean starting over.",
          tradeoff: "trust earned in one community is assumed to carry to another.",
        },
        {
          title: "Native maps and sample data first",
          body: "I moved from the web prototype's simple world outline to Apple Maps, and kept all data in memory so I could test the flows before building a backend.",
          tradeoff: "feels real on a phone, but nothing persists and it's iOS-first for now.",
        },
      ],
      note: "TODO: In your own words: why you chose the deposit model, and anything you tried and dropped.",
    },
  },

  samba: {
    tag: "02 · Product Management Intern",
    company: "Samba _TV_",
    title: "Product Management Intern",
    place: "San Francisco",
    dates: "Summer 2026",
    blurb: "Samba TV is a TV data and analytics company. My summer had one question: _what belongs in v2_ of its consumer app? I ran it as two-week sprints, each one a working prototype built on live viewership data.",
    process: ["Build it in Claude Code", "Test with 3–6 people", "Keep, kill or change"],
    did: [
      { k: "8 Weeks", s: "Product Sprints", t: "Worked through four rapid development sprints, taking product concepts from initial ideas to functional prototypes and user-tested recommendations." },
      { k: "4 Prototypes", s: "Built with Real Data", t: "Developed functional mobile app prototypes using Claude Code, Firebase, and Databricks, integrating live viewership data and interactive features." },
      { k: "15+ Interviews", s: "User Research & Strategy", t: "Conducted moderated usability sessions, translating consumer feedback into actionable insights and prioritized product recommendations." },
    ],
    // One card per sprint: prototype screens + the headline finding
    sprints: [
      {
        label: "Sprint 1 · Discovery",
        name: "Recommendations & rewards",
        testers: 6,
        image: { src: "assets/samba/sprint1.jpg", alt: "Five prototype screens: recommendation of the day, trending by streaming service, a 260-point rewards ring, a top 10 list and a gift card redemption screen" },
        score: "6/6",
        finding: "were confused by how reward tiers connect to points and payouts. The reward mechanics broke before the rewards themselves did.",
      },
      {
        label: "Sprint 2 · Engagement",
        name: "Tracking & social",
        testers: 6,
        image: { src: "assets/samba/sprint2.jpg", alt: "Five prototype screens: a title page with a match score, reviews, a Refresh My Memory recap tool, an episode tracker and the home feed" },
        score: "6/6",
        finding: "reacted to the Friend's Feed, comparing it unprompted to Strava, Venmo and Goodreads. The social layer was the biggest finding of the summer.",
      },
      {
        label: "Sprint 3 · Interactive",
        name: "Live, shop, trivia, Kalshi",
        testers: 3,
        image: { src: "assets/samba/sprint3.jpg", alt: "Four prototype screens: live voting during Love Island, a hot-take poll, shoppable looks with a prediction market, and a Kalshi buy screen" },
        score: "3/3",
        finding: "were unenthusiastic about prediction markets. The weakest signal of the summer, and a clear call to cut it.",
      },
      {
        label: "Sprint 4 · All together",
        name: "The full app, end to end",
        // Put a YouTube, Loom or Vimeo link here and it plays right on the page
        demo: { label: "Demo video", href: "" },
        // Each screen grows on hover, and opens full size on click or tap
        screens: [
          { src: "assets/samba/s4/screen1.jpg", alt: "Home with Recommendation of the Day and Recommended For You" },
          { src: "assets/samba/s4/screen2.jpg", alt: "Title page for The Big Bang Theory with match score" },
          { src: "assets/samba/s4/screen3.jpg", alt: "Episode tracker for The Voice" },
          { src: "assets/samba/s4/screen4.jpg", alt: "Live voting during Love Island USA" },
          { src: "assets/samba/s4/screen5.jpg", alt: "Rewards balance with ways to earn points" },
          { src: "assets/samba/s4/screen6.jpg", alt: "Redeeming points for gift cards" },
          { src: "assets/samba/s4/screen7.jpg", alt: "Friends activity feed" },
          { src: "assets/samba/s4/screen8.jpg", alt: "Library: shows in progress" },
          { src: "assets/samba/s4/screen9.jpg", alt: "Library: your viewing habits" },
        ],
      },
    ],
    quote: "Without the social layer, I'd probably forget the app exists.",
    quoteBy: "A Sprint 2 tester",
    signal: {
      build: ["Friend's Feed and social layer (6/6)", "Push notifications for new episodes (6/6)", "\"Refresh My Memory\" recap tool (5/6)", "Cross-platform recommendations, if kept fresh", "Opt-in rewards, once tiers are redesigned"],
      cut: ["Kalshi prediction markets (3/3 unenthusiastic)", "Streak-style gamification", "Reward tiers as designed (6/6 confused)", "Favorites and Watchlist as two separate features"],
    },
    paperLabel: "Read my paper on this summer",
    privacy: "These are my discovery prototypes, not the shipped app. Samba ended up taking the product in a different direction.",
  },

  sports: {
    tag: "03 · Data Analytics · Passion Project",
    title: "Sports Fan _Engagement_ Dashboard",
    pitch: "Analyzing NFL search behavior to identify audience interest trends, engagement spikes, and opportunities for data-driven marketing strategy.",
    chips: ["Python · Pandas · Pytrends · Matplotlib"],
    repo: "https://github.com/laurenlambrecht/Sports-Fan-Engagement-Dashboard",
    image: {
      src: "assets/sports/engagement_trends.png",
      alt: "Line chart of Google Trends interest over 12 months for NFL, Super Bowl, Kansas City Chiefs and San Francisco 49ers. Super Bowl spikes to 100 in early February; NFL rises from September through January.",
      caption: "Relative search interest (0–100), Feb 2025 to Feb 2026",
    },
    // Second, smaller chart: the two teams compared on their own, from Lauren's Google Trends export (assets/sports/chiefs_vs_49ers.csv)
    teams: {
      label: "Zooming in on the teams",
      image: {
        src: "assets/sports/chiefs_vs_49ers.png",
        alt: "Line chart of Google Trends interest for the Kansas City Chiefs and San Francisco 49ers, Feb 2025 to Feb 2026. Chiefs interest runs well above the 49ers from September to late December; the 49ers are higher in most weeks from late December to mid-January.",
        caption: "Chiefs vs 49ers only, relative search interest (0–100), Feb 2025 to Feb 2026. Google Trends, US.",
      },
      body: [
        "In the main chart, the Super Bowl spike squeezes both team lines to almost zero. So I pulled the two teams as their own comparison, which puts them back on a readable scale.",
        "Seen this way, the Chiefs drew far more search interest than the 49ers through the regular season. That flipped in the final weeks: from late December into mid-January, the 49ers were higher in most weeks.",
        "Each team's attention follows its own season, not just the league calendar. Timing a team campaign means watching that team's curve.",
      ],
      data: "assets/sports/chiefs_vs_49ers.csv",
    },
    question: "When do sports fans pay attention, and what drives their interest?",
    why: "Understanding how fan attention fluctuates can help sports organizations make smarter decisions about content, campaigns, and product launches.",
    found: [
      "Major events drive concentrated attention. Super Bowl searches generate dramatic, short-lived spikes compared with baseline NFL interest.",
      "Audience interest follows the season. NFL search activity rises during the regular season and intensifies around high-stakes playoff moments.",
      "Timing creates strategic opportunities. Identifying when audience attention peaks can inform content calendars, marketing campaigns, and product launch strategies.",
    ],
  },

  // Urban planning: three prototypes, all from Lauren's class slides. Only facts shown on those slides.
  urban: {
    tag: "04 · Urban Design Project · Claremont, CA",
    title: "Urban planning, _as a game_",
    lead: "How do city engineers hear from the people who actually live in Claremont, especially students? Three prototypes tried three answers: a social app you can click through right here, a board game and a dinner. Each one was tested and changed between rounds.",
    role: "Worked alongside engineers from Claremont City Hall to design a more accessible and engaging approach to urban planning. Developed as part of my Human-Centered Product Design course.",
    prototypes: [
      {
        n: "01",
        name: "Claremont Columns",
        sub: "A social app for illuminating engineering needs",
        what: "Residents post a photo and a location pin for places they love, or places that could use engineering improvements. Others agree or comment, engineers can reply, and you can browse the feed or click around the map.",
        hypothesis: "We believe a low-effort social app like Claremont Columns will encourage residents to engage in civic participation by highlighting places personal to them.",
        test: "Tested as paper wireframes. Testers used it out loud, then answered six questions about what was missing, confusing or worth adding.",
        heard: [
          "Link to the city website and its inquiry form",
          "A way to message city workers directly",
          "A first-time tutorial for older or less tech-comfortable users",
          "Live inside something people already use, like NextDoor",
          "A quick summary of the most liked posts",
        ],
        steps: [
          ["Iteration 2", "A Featured Posts gallery on the City of Claremont website. City staff pick standout posts, so people can see their ideas were actually seen."],
        ],
        images: [
          { src: "assets/urban/wire-home.jpg", alt: "Paper wireframes: home map and the posts at one address", ratio: 1.55 },
          { src: "assets/urban/wire-add.jpg", alt: "Paper wireframes: a post in the feed and the four steps to add one", ratio: 1.33 },
        ],
        links: [
          { label: "Live site", href: "https://laurenlambrecht.github.io/ClaremontColumns_HCD/" },
          { label: "Code on GitHub", href: "https://github.com/laurenlambrecht/ClaremontColumns_HCD" },
          { label: "Demo video", href: "" },
        ],
        app: {
          heading: "Try it _live_",
          live: "https://laurenlambrecht.github.io/ClaremontColumns_HCD/",
          body: "The paper prototype and the Featured Posts idea, built as a working web app. Tap a pin, scroll the feed, add a post in four steps. It runs right here, or open it full screen.",
          note: "Sample posts, usernames and engineer replies are made up for the demo.",
          screens: [
            { src: "assets/urban/cc-map.jpg", alt: "Claremont Columns map home with pins", title: "Map" },
            { src: "assets/urban/cc-feed.jpg", alt: "Feed with a post, agrees and an engineer reply", title: "Feed" },
            { src: "assets/urban/cc-add.jpg", alt: "Step one of adding a post: pick a location", title: "Add a post" },
            { src: "assets/urban/cc-featured.jpg", alt: "Featured Posts spotlight with a staff pick", title: "Featured Posts" },
          ],
        },
      },
      {
        n: "02",
        name: "Urban Design Roulette",
        sub: "A city building challenge",
        what: "A hand-drawn map of Claremont, three spinners and a bin of Lego. Spin a user, a need and a constraint, build a fix anywhere on the map, then label it with a sticky note.",
        steps: [
          ["Round 1", "Open-ended design. No limits, any idea is welcome."],
          ["Round 2", "Real-world constraints. Same scenario, but it has to be feasible: space, cost, existing infrastructure."],
          ["Round 3", "Designing for everyone. Players share their own experience of Claremont, find a need in common and build for it."],
        ],
        changed: "Later iteration: testers were split into teams to add a competitive element, run as an in-class experience prototype on 11/20.",
        images: [
          { src: "assets/urban/board.jpg", alt: "Hand-drawn, colored map of Claremont on a table with a spinner and sticky notes", ratio: 1.2 },
          { src: "assets/urban/lego-map.jpg", alt: "A Lego build on the Claremont map during a test round", ratio: 0.68 },
          { src: "assets/urban/teams.jpg", alt: "A crowd of testers around the map with Lego, playing in teams", ratio: 1.37 },
          { src: "assets/urban/spinners.jpg", alt: "Three paper spinners labeled Users, Needs and Constraints", ratio: 2.73 },
        ],
        scenario: {
          label: "One test round, start to finish",
          prompt: "A Pomona student needs to be creatively inspired when thirsty.",
          rounds: [
            "A creative water fountain that quenches thirst with a wheel turning air particles chemically into creative juices at Pomona.",
            "Water fountain in natural green spaces so that people can enjoy being inspired for a more sustained amount of time.",
            "Consider the drought factor: maybe the fountain tells you how much water you've drunk, or bottles you've saved.",
          ],
        },
      },
      {
        n: "03",
        name: "Blueprints & Breadsticks",
        sub: "A casual setting for connection and conversation",
        what: "A small, informal dinner for students and a city engineer. Students get a relaxed place to share how they experience the city, and the engineer hears how young residents imagine it.",
        steps: [
          ["Iteration 1", "Themed conversation cards, using the same users, needs and constraints as Urban Design Roulette, guide the talk without making it feel formal."],
          ["Iteration 2", "Visitors to the City of Claremont website fill out a 1-minute profile card: a place they love, their needs, a challenge they face. Those cards come to dinner so ideas are about real residents, and guests fill out their own to find shared themes."],
        ],
        images: [
          { src: "assets/urban/card-decks.jpg", alt: "Three decks of conversation cards: User, Need and Constraint", ratio: 1.41 },
          { src: "assets/urban/card-columns.jpg", alt: "Columns of handwritten cards, from Pomona professor to during the rain", ratio: 0.97 },
          { src: "assets/urban/profile-cards.jpg", alt: "Filled-in and blank resident profile cards", ratio: 0.79 },
        ],
      },
    ],
    heardLabel: "From the testing table",
    quote: "Human interaction is vital: having people around the table.",
    links: [{ label: "Pitch video", href: "" }],
    aside: "Also learned: Claremont residents were very against roundabouts. The city's older residents, a big share of the town, find them harder to use as they age.",
  },

  // Smaller projects with live demos. `id` is what the picker bubbles link to.
  playground: {
    // MassBids, Hiki, Guppo and Jungle Quest each get their own full section in their bubble's color.
    // Order follows the color flow: dusk purple → orange → indigo → teal → green → evening navy.
    items: [
      {
        id: "p-massbids",
        title: "MassBids",
        kind: "05 · Product & Business Development Intern",
        tone: "noon",
        pitch: "Zillow, but for local government contracts in Massachusetts.",
        body: "A clickable demo of the idea: pick a city on the map to see its open bids, then filter by category or search. The data in the demo is illustrative.",
        images: [{ src: "assets/projects/massbids.jpg", alt: "MassBids demo showing a map of Massachusetts with Boston-area cities and a bid detail panel" }],
        links: [{ label: "Try the demo", href: "https://laurenlambrecht.github.io/MassBids-Demo/" }],
      },
      {
        id: "p-hiki",
        title: "Hiki",
        kind: "06 · Hiki: Redesigning Online Dating Project",
        tone: "night",
        pitch: "Redesigning how people match on Hiki, a dating and friendship app for neurodivergent people.",
        body: "We prototyped two new ways to browse: Hiki Grids, a daily board that sorts people by traits and neurodivergence filters instead of photos, and an infinite-zoom canvas where you explore profiles in space.",
        images: [
          { src: "assets/projects/hiki-zoom.jpg", alt: "Hiki infinite-zoom prototype welcome screen on a starry background" },
          { src: "assets/projects/hiki-grids.jpg", alt: "Hiki Grids setup screen with friendship and neurodivergence filters", tall: true },
        ],
        links: [
          { label: "Try Hiki Grids", href: "https://samuelbingham07.github.io/2by2Prototype/" },
          { label: "Try the zoom prototype", href: "https://samuelbingham07.github.io/infiniteZoomArtPrototype/" },
        ],
      },
      {
        id: "p-guppo",
        title: "Guppo",
        kind: "07 · Product Strategy & Marketing Lead",
        tone: "teal",
        pitch: "Catch, scan, collect. Point your phone at a fish and Guppo identifies it, then adds it to your collection.",
        body: "Every species you scan unlocks a card in the GuppoDex (144 to find), earns XP toward angler tiers, and lands in your catch log and on a map. Weekly challenges give you a reason to go back out.",
        phones: true,
        images: [
          { src: "assets/guppo/home.jpg", alt: "Guppo home screen with Scan a Fish, XP progress, a weekly challenge and fish to find" },
          { src: "assets/guppo/scan.jpg", alt: "Guppo scanning a photo of a fish" },
          { src: "assets/guppo/new-species.jpg", alt: "New species card for a yellowfin tuna worth 550 XP" },
          { src: "assets/guppo/dex.jpg", alt: "GuppoDex species collection with filters and undiscovered cards" },
        ],
        links: [{ label: "Download on the App Store", href: "" }], // TODO: App Store link from Lauren
      },
      {
        id: "p-jungle",
        title: "Jungle Quest",
        kind: "08 · Side project",
        tone: "jungle",
        pitch: "A jungle-themed brick-breaker I built with Cursor.",
        body: "An experiment in building a game end to end with an AI coding tool. Click anywhere to drop the ball.",
        images: [{ src: "assets/projects/jungle-quest.jpg", alt: "Jungle Quest title screen with a brick wall and a Play Now button" }],
        links: [{ label: "Play it", href: "https://laurenlambrecht.github.io/CursorPlay2/" }],
      },
    ],
  },

  more: {
    heading: "Beyond the _Build_",
    intro: "Leadership, experiences & interests",
    cards: [
      {
        id: "p-vicunita",
        title: "La Vicuñita brochure",
        kind: "Internship · Cusco, 2024",
        pitch: "An attention-grabbing brochure for an alpaca clothing brand, placed in Cusco travel agencies.",
        body: "It walks travelers through the brand's story, the alpaca farm visit, animal welfare and community work, and the difference between alpaca, vicuña and guanaco fiber.",
        images: [
          { src: "assets/vicunita/cover.jpg", alt: "La Vicuñita brochure cover with two models in alpaca knitwear" },
          { src: "assets/vicunita/alpaca.jpg", alt: "Brochure page about the alpaca farm experience" },
          { src: "assets/vicunita/animals.jpg", alt: "Brochure page about animal protection with three named alpacas" },
        ],
        links: [],
      },
    ],
    items: [
      { org: "Woolley Athenaeum Fellowship", role: "Marian Miner Cook Athenaeum, CMC", when: "2025–26", line: "Represent CMC to distinguished guests, speakers and alumni at the school's flagship speaker series, introducing keynote speakers to audiences of 100+ three to four times a week and researching potential speakers." },
      { org: "Handley Leadership Fellowship", role: "Kravis Leadership Institute, CMC", when: "2025–26", line: "Selected through the Women in Leadership Development Initiative. Twelve workshops, leadership salons and 1:1 coaching sessions, plus monthly leadership circles with peers." },
      { org: "Randall Lewis Center for Innovation and Entrepreneurship Fellowship", role: "Randall Lewis Center, CMC", when: "2025–26", line: "Led a team taking a product from idea to prototype using LLMs and AI tools, alongside workshops on product-market fit and business models." },
      { org: "Ion Game Design, Stockholm", role: "Consulting Intern", when: "Spring 2023", line: "Kickstarter campaigns, Shopify SEO and a move onto Twitch for an educational board game company." },
    ],
  },

  about: {
    heading: "Why people do what they do, _then the data._",
    photo: { src: "assets/about/lauren.jpg", alt: "Portrait of Lauren Lambrecht", need: "A photo of you, portrait or candid" },
    body: [
      "I study International Relations and History at Claremont McKenna, which trained me to ask why people do what they do. That shows up in how I work on products: I start with the why, and then check it against the data.",
      "Outside class I'm an Athenaeum Fellow, which means introducing speakers to rooms of 100+ people a few times a week. I've gotten comfortable asking good questions in public.",
      "I'm especially drawn to products in sports, fitness and wearables, the kind of thing you'd find on your wrist or finger, because they're so close to how people actually live.",
    ],
    hobbies: ["Skiing", "Running", "Line dancing", "The Rolling Stones, at length"],
  },

  contact: {
    heading: "Let's build something people _show up_ for.",
    line: "Open to product roles in San Francisco. Say hi.",
  },
};
