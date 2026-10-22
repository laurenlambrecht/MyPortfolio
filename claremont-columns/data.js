// Sample data so the site has something to show on first visit.
// Everything a visitor adds is saved in their own browser (localStorage).
// Map coordinates are on the app's own 600x420 illustrated map, not real lat/lng.

window.CC_STREETS = {
  horizontal: [
    { name: "4th St", y: 60 },
    { name: "Bonita Ave", y: 150 },
    { name: "2nd St", y: 240 },
    { name: "1st St", y: 330 }
  ],
  vertical: [
    { name: "Indian Hill Blvd", x: 90 },
    { name: "Harvard Ave", x: 230 },
    { name: "Yale Ave", x: 330 },
    { name: "College Ave", x: 470 }
  ]
};

window.CC_SEED = {
  locations: [
    { id: "l1", name: "271 W 2nd Street", x: 160, y: 240 },
    { id: "l2", name: "Yale Ave & Bonita Ave", x: 330, y: 150 },
    { id: "l3", name: "Village Depot plaza", x: 280, y: 330 },
    { id: "l4", name: "Harvard Ave & 4th St", x: 230, y: 60 },
    { id: "l5", name: "College Ave bike lane", x: 470, y: 200 }
  ],
  posts: [
    {
      id: "p1", locId: "l1", user: "maria_g", hoursAgo: 2,
      images: [{ hue: 18, label: "cracked sidewalk" }, { hue: 30, label: "tree roots" }],
      caption: "Tree roots have lifted the sidewalk here — tough with a stroller. Could this be leveled or ramped?",
      agrees: 14, comments: [
        { user: "City Engineering", text: "Great point! Logged for the next sidewalk repair survey.", engineer: true },
        { user: "dan_r", text: "I trip here every morning, agree!" }
      ], featured: true
    },
    {
      id: "p2", locId: "l1", user: "jlee", hoursAgo: 5,
      images: [{ hue: 140, label: "shade trees" }, { hue: 160, label: "bench" }],
      caption: "Love the shade on this block in the afternoon. More benches like this one?",
      agrees: 6, comments: []
    },
    {
      id: "p3", locId: "l2", user: "sam_walks", hoursAgo: 20,
      images: [{ hue: 210, label: "crosswalk" }],
      caption: "Question: could this crosswalk get a flashing beacon? Cars don't see people crossing after dark.",
      agrees: 31, comments: [
        { user: "City Engineering", text: "Thanks — we're reviewing pedestrian counts at this intersection.", engineer: true }
      ], featured: true
    },
    {
      id: "p4", locId: "l3", user: "priya.k", hoursAgo: 30,
      images: [{ hue: 45, label: "plaza at sunset" }, { hue: 330, label: "string lights" }],
      caption: "The plaza on a Friday evening is the best part of Claremont. Keep the string lights!",
      agrees: 22, comments: [{ user: "maria_g", text: "Agreed, it's so nice." }], featured: true
    },
    {
      id: "p5", locId: "l4", user: "old_town_ed", hoursAgo: 52,
      images: [{ hue: 200, label: "storm drain" }],
      caption: "This drain floods every time it rains. Water pools across the whole corner.",
      agrees: 9, comments: []
    },
    {
      id: "p6", locId: "l5", user: "bikes4claremont", hoursAgo: 75,
      images: [{ hue: 95, label: "bike lane" }, { hue: 0, label: "faded paint" }],
      caption: "The bike lane paint is almost gone near the colleges. A refresh (or a buffer) would help a lot.",
      agrees: 18, comments: [{ user: "jlee", text: "Yes please!" }]
    }
  ],
  notifs: [
    { type: "heart", text: "maria_g liked your post", hoursAgo: 1 },
    { type: "engineer", text: "An engineer sent you a message", hoursAgo: 3 },
    { type: "comment", text: "sam_walks commented “I agree”", hoursAgo: 6 },
    { type: "pin", text: "Another photo at 271 W 2nd Street", hoursAgo: 9 },
    { type: "eyes", text: "Here’s what’s nearby: 3 new posts on 2nd St", hoursAgo: 26 }
  ]
};
