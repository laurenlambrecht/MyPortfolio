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
    headline: "Building products backed by *data*. Creating brands that people _love._",
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
      { target: "p-hiki", title: "Hiki", sub: "Traditional swiping reimagined for online dating apps", tone: "night", d: 355, x: 64, y: 100 },
      { target: "p-guppo", title: "Guppo", sub: "Social media tracking for your next fishing catch", tone: "teal", d: 200, x: 85, y: 0 },
      { target: "sports", title: "Sports Fan Dashboard", sub: "Tracking fan engagement across the NFL sports season", tone: "dusk", d: 260, x: 3, y: 480 },
      { target: "p-massbids", title: "MassBids", sub: "Zillow for government procurement/bidding in Massachusetts", tone: "noon", d: 260, x: 30, y: 360 },
      { target: "urban", title: "Claremont Columns", sub: "Local Claremont 'Reddit' feed for residents and students to share favorite places and express desired changes in town planning", tone: "pink", d: 260, x: 55, y: 480 },
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
      { label: "Live demo", href: "goodgame-demo/" }, // browser build from the goodgame-app online-demo branch
      { label: "Code on GitHub", href: "https://github.com/laurenlambrecht/Goodgame-app" },
      { label: "Website", href: "goodgame-site/" },
    ],
    hero: { src: "assets/goodgame/play.jpg", alt: "GoodGame Play tab on an iPhone", title: "Play tab", need: "Screenshot: Play tab, iPhone portrait" },

    problem: {
      heading: "The problem",
      body: [
        "Pickup sports are supposed to be simple. But games are scattered across group chats, finding people at your skill level is difficult, and even when a game comes together, there's no guarantee everyone will show up. I wanted to build something that makes finding a game easier, but more importantly, makes showing up matter.",
      ],
      storyHeading: "Why I built it",
      story: [
        "Growing up, I was always on the move, constantly finding myself at tryouts for new schools and teams. I played tennis, soccer, and volleyball, and quickly learned that sports were one of the easiest ways to make friends and find my place. In college, I played a variety of intramural sports and noticed how difficult organizing games could be, especially when attendance was unreliable.",
        "That frustration followed me to San Francisco during my summer internship. I wanted to join a recreational league or even just find someone to play tennis with, but I had no idea where to start. Conversations with recently graduated friends revealed a similar struggle: moving to new cities, wanting to meet people, and not knowing where to find opportunities to play.",
      ],
      storyEnd: "**That's what inspired GoodGame:** making it easier to find games, bring people together, and build community through sports.",
      quote: "The game only works if people who say they're coming",
      quoteHighlight: "actually come.",
    },

    // The concept landing page from the live site
    web: {
      src: "assets/projects/goodgame-web.jpg",
      alt: "GoodGame landing page with the headline Go Play Outside",
      caption: "I also built a landing page to pitch the concept. Any numbers on it are mock-ups, not results.",
    },

    role: {
      heading: "What's Next:",
      body:
        "GoodGame is an independent passion project that I've taken from initial concept to a working mobile prototype. I identified the problem, developed the product strategy, designed the user experience, and built the app using React Native, Expo, and Claude Code. The app currently runs in the iOS Simulator, with interactive features and simulated user data. I'm continuing to refine the app and planning on a fully functional launch within next couple of months.",
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
          title: "Deposits over RSVPs",
          body: "Free RSVPs are easy to ignore. A refundable $5 deposit, returned on check-in, gives players a reason to show up.",
          tradeoff: "a little more friction at sign-up.",
        },
        {
          title: "Rewarding reliability",
          body: "Players build a reputation by showing up, and reliable players unlock more games.",
          tradeoff: "it can feel strict to new players still earning trust.",
        },
        {
          title: "Prototype before scaling",
          body: "I validated the core discovery flows with sample data before investing in backend infrastructure.",
          tradeoff: "faster learning now, real data and payments later.",
        },
      ],
    },
  },

  samba: {
    tag: "02 · Product Management Intern",
    company: "Samba _TV_",
    title: "Product Management Intern",
    place: "San Francisco",
    dates: "Summer 2026",
    blurb: "Samba TV is a TV data and analytics company. My summer had one question: _what belongs in v2_ of its consumer app? I ran it as 4 two-week sprints:",
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
        finding: "Users expressed confusion over reward tiers. The next iteration needed to answer a fundamental question: How are points, tiers, and payouts connected? Beyond clarity, the challenge was ensuring rewards felt valuable, achievable, and compelling enough to bring users back to the app.",
      },
      {
        label: "Sprint 2 · Engagement",
        name: "Tracking & social",
        testers: 6,
        image: { src: "assets/samba/sprint2.jpg", alt: "Five prototype screens: a title page with a match score, reviews, a Refresh My Memory recap tool, an episode tracker and the home feed" },
        score: "6/6",
        finding: "Users responded positively to the Friend's Feed, comparing it to Strava, Venmo, and Goodreads. AI-powered features were another highlight, particularly \u201cRefresh My Memory,\u201d a scene-recall tool loved by 5/6 testers, alongside personalized match scores.\n\nThe Big Takeaway: social connection drove interest in returning to the app, while AI created opportunities for a more personalized viewing experience.",
        quote: "Without the social layer, I'd probably forget the app exists.",
        quoteBy: "— Panthil Patel  |  Sprint 2, User Testing",
      },
      {
        label: "Sprint 3 · Interactive",
        name: "Live, shop, trivia, Kalshi",
        testers: 3,
        image: { src: "assets/samba/sprint3.jpg", alt: "Four prototype screens: live voting during Love Island, a hot-take poll, shoppable looks with a prediction market, and a Kalshi buy screen" },
        score: "3/3",
        finding: "Users expressed hesitation toward the Kalshi prediction-market integration, citing concerns around product fit, existing platform loyalty, and real-money transactions. Meanwhile, live voting, social trivia, and shoppable content showed greater promise for making TV viewing more interactive.",
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
    signal: {
      build: ["Friend's Feed and social layer (6/6)", "Push notifications for new episodes (6/6)", "\"Refresh My Memory\" recap tool (5/6)", "Cross-platform recommendations, if kept fresh", "Opt-in rewards, once tiers are redesigned"],
      cut: ["Kalshi prediction markets (3/3 hesitant)", "Streak-style gamification", "Reward tiers as designed (6/6 confused)", "Favorites and Watchlist as two separate features"],
    },
    paperLabel: "Read my paper on this summer",
    privacy: "These are my discovery prototypes, not the shipped app. Samba's final app excluded some features in my final version here.",
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
    // FanSignal: Lauren's B2B product layer on top of this research (repo branch feature/fansignal-product-layer),
    // hosted with the portfolio at fansignal/. Demo data in the app is illustrative and labeled as such.
    fansignal: {
      label: "From analysis to product",
      title: "Fan_Signal_",
      pitch: "I turned this research into FanSignal: A B2B audience-intelligence workspace for NFL teams' marketing, content, and partnership staff.",
      problem: "Search-interest charts show when attention moves, but they don't tell a marketer where to focus, when to launch, or what to test. FanSignal is built for that next step.",
      flow: ["Explore interest", "Interpret momentum", "Compare teams", "Propose an experiment", "Export a decision brief"],
      features: [
        ["Audience momentum", "Compares the latest four weeks of interest with the four before and labels it rising, stable or cooling."],
        ["Campaign opportunity engine", "Turns that signal into a suggested experiment and the metrics to validate it. Rule-based and explainable, not predictive."],
        ["Geographic discovery", "A state map of where interest is strongest, filled in from an uploaded regional CSV."],
        ["Event context", "League calendar moments shown alongside the data, as reference points rather than causes."],
        ["Team benchmarking", "Ranks teams side by side when the data shares one Google Trends scale."],
        ["Decision brief", "Exports an editable Word document with the insight, hypothesis and validation steps."],
      ],
      images: [
        { src: "assets/sports/fansignal-dashboard.jpg", alt: "FanSignal dashboard: team selectors, latest interest index, momentum and attention signal cards, a search-interest chart for the Kansas City Chiefs vs NFL, and a campaign opportunity panel with a proposed action and how to validate it" },
        { src: "assets/sports/fansignal-map.jpg", alt: "FanSignal geographic discovery card: a purple US state map labeled as illustrative, with an Upload geography CSV button" },
      ],
      caption: "Screens from the prototype running on its built-in illustrative demo data.",
      note: "Prototype: the demo values are made up and clearly labeled in the app. Upload real Google Trends CSVs to explore real patterns. No backend, live API or campaign results.",
      links: [
        { label: "Try FanSignal", href: "fansignal/" },
        { label: "Product guide on GitHub", href: "https://github.com/laurenlambrecht/Sports-Fan-Engagement-Dashboard/tree/feature/fansignal-product-layer" },
      ],
    },
  },

  // Urban planning: three prototypes, all from Lauren's class slides. Only facts shown on those slides.
  urban: {
    tag: "04 · Urban Design Project · Claremont, CA",
    title: "Urban planning, _as a game_",
    lead: "How can city engineers better understand the needs and perspectives of Claremont residents, particularly students? Three prototypes explored different answers: a social, reddit-like app for locals to post favorite spots and places in need of improvement, a board game to increase civic discourse, and a dinnertime card game about wants/needs for the town. Each was tested, refined, and iterated on between rounds.",
    role: "My team worked alongside engineers from Claremont City Hall to design a more accessible and engaging approach to urban planning. This was developed as part of my Human-Centered Product Design course.",
    prototypes: [
      {
        n: "01",
        name: "Claremont Columns",
        intro: "Claremont Columns reimagines how residents connect with their city through a social, interactive platform for civic engagement. Users can pin locations on a map, share photos and ideas for community improvements, and engage with others through likes and comments. City engineers can respond directly, creating an open dialogue between residents and local government. The goal? Make civic participation more accessible, engaging, and collaborative, especially for younger residents.",
        sub: "A social app for illuminating engineering needs",
        stepsFirst: true, // Iteration 2 sits where the description used to be
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
          { label: "Live demo", href: "https://laurenlambrecht.github.io/ClaremontColumns_HCD/" },
          { label: "Code on GitHub", href: "https://github.com/laurenlambrecht/ClaremontColumns_HCD" },
        ],
        app: {
          heading: "Try it _live_",
          live: "claremont-columns/",
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
    links: [],
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
        pitch: "Think Zillow, but for local government contracts in Massachusetts.",
        body: "MassBids solves the problem of fragmented and inaccessible public procurement opportunities. Traditionally, public bids are scattered across individual municipal websites, making it difficult and time-consuming for businesses to find relevant opportunities. The data in the demo is illustrative.",
        images: [{ src: "assets/projects/massbids.jpg", alt: "MassBids demo: a map of Massachusetts with city pins, and Boston selected in the side panel showing 4 active opportunities (demo data), starting with a municipal fleet EV charging bid" }],
        links: [{ label: "Live demo", href: "massbids/" }, { label: "Code on GitHub", href: "https://github.com/laurenlambrecht/MassBids-Demo" }],
      },
      {
        id: "p-hiki",
        title: "Hiki",
        kind: "06 · Hiki: Redesigning Online Dating Project",
        tone: "night",
        pitch: "Redesigning how people match on Hiki, a dating and friendship app for neurodivergent people.",
        intro: "Hiki is a dating and friendship app designed for neurodivergent people to build meaningful connections in a space that understands their experiences and needs. We partnered with Hiki to rethink traditional swipe-based matching, exploring how to make discovering new people feel more authentic, intentional, and centered on personality rather than appearance.",
        body: "We explored two new approaches to profile discovery for Hiki: Hiki Grids, a daily curated board that prioritizes personality traits and neurodivergent compatibility over photos, and an infinite-zoom canvas that transforms traditional profile browsing into a more interactive, spatial experience.",
        images: [
          { src: "assets/projects/hiki-zoom.jpg", alt: "Hiki infinite-zoom prototype welcome screen on a starry background" },
          { src: "assets/projects/hiki-grids.jpg", alt: "Hiki Grids setup screen with friendship and neurodivergence filters", tall: true },
        ],
        links: [
          { label: "Try Hiki Grids", href: "https://samuelbingham07.github.io/2by2Prototype/" },
          { label: "Try the zoom prototype", href: "https://samuelbingham07.github.io/infiniteZoomArtPrototype/" },
        ],
        // Extra case-study detail, from the team's final presentation (Hiki Partnership deck)
        deep: {
          user: "Our user, Jamie, hates setting up dating profiles because it feels like “commodifying, curating, and rendering myself purchasable for others.” He wants meeting people online to feel like real life, where curiosity starts a connection.",
          findings: [
            { t: "Replacing the swipe", d: "Testers called Hiki Grids “a fundamental deconstruction of the swipe.”" },
            { t: "Agency", d: "Choosing a spot on a grid let people decide if they wanted similar people or opposites." },
            { t: "Novelty", d: "Daily prompts felt fun and closer to getting to know someone in person." },
          ],
          slides: [
            { src: "assets/projects/hiki-deck/slide-01.jpg", alt: "Title slide: Project HIKI, Reimagining Matching" },
            { src: "assets/projects/hiki-deck/slide-03.jpg", alt: "Key Nuggets: a say, think, do, feel map of interview quotes" },
            { src: "assets/projects/hiki-deck/slide-04.jpg", alt: "POV slide: Jamie's user, need and insight" },
            { src: "assets/projects/hiki-deck/slide-05.jpg", alt: "Initial idea generation: How Might We boards covered in sticky notes" },
            { src: "assets/projects/hiki-deck/slide-08.jpg", alt: "Insights from testing: replacing the swipe, friendship vs romance, beauty of novelty" },
            { src: "assets/projects/hiki-deck/slide-09.jpg", alt: "Final idea: Hiki Grids, with the setup screen" },
            { src: "assets/projects/hiki-deck/slide-12.jpg", alt: "Key implications: 2x2 axis, daily prompts, icon profiles, settings" },
            { src: "assets/projects/hiki-deck/slide-13.jpg", alt: "Lingering thoughts: age and intention, curiosity beyond the grid, a living breathing app" },
          ],
        },
      },
      {
        id: "p-guppo",
        title: "Guppo",
        kind: "07 · Product Strategy & Marketing Lead",
        tone: "teal",
        pitch: "Catch, scan, collect. Point your phone at a fish and Guppo identifies it, then adds it to your collection.",
        intro: "Guppo solves two problems: identifying fish species in real time and making fishing more interactive, rewarding, and engaging. Having helped shape the original concept, I now work on Guppo's branding, marketing strategy, and go-to-market planning. From building its social media presence to developing its brand identity and growth strategy, I'm helping turn an idea into a product that anglers are excited to use.",
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
        kind: "08 · Gaming Side Project",
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
