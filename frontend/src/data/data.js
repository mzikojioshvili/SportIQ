import avatars from "../assets/avatars.js"

export const leaderboardWeekly = [
  { rank: 1, name: "Alessandro R.", xp: 3200, league: "F1 Maestro", avatar: avatars.alessandroAvatar },
  { rank: 2, name: "Yuki T.", xp: 2850, league: "Football Oracle", avatar: avatars.yukiAvatar },
  { rank: 3, name: "Jordan M.", xp: 2600, league: "NBA Prophet", avatar: avatars.jordanAvatar },
  { rank: 4, name: "Sofia K.", xp: 2100, league: "F1 Enthusiast", avatar: avatars.sofiaAvatar },
  { rank: 5, name: "Kai N.", xp: 1950, league: "Football Fan", avatar: avatars.kaiAvatar },
  { rank: 6, name: "Priya M.", xp: 1680, league: "NBA Watcher", avatar: avatars.priyaAvatar },
  { rank: 7, name: "You", xp: 1250, league: "Rising Star", isMe: true },
  { rank: 8, name: "Luca B.", xp: 980, league: "F1 Enthusiast", avatar: avatars.lucaAvatar },
  { rank: 9, name: "Maya S.", xp: 840, league: "Football Fan", avatar: avatars.mayaAvatar },
  { rank: 10, name: "Chris D.", xp: 720, league: "NBA Watcher", avatar: avatars.chrisAvatar },
];

export const leaderboardAllTime = [
  { rank: 1, name: "Alessandro R.", xp: 98400, league: "F1 Maestro", avatar: avatars.alessandroAvatar },
  { rank: 2, name: "Jordan M.", xp: 84700, league: "NBA Prophet", avatar: avatars.jordanAvatar },
  { rank: 3, name: "Yuki T.", xp: 79200, league: "Football Oracle", avatar: avatars.yukiAvatar },
  { rank: 4, name: "Priya M.", xp: 61800, league: "NBA Watcher", avatar: avatars.priyaAvatar },
  { rank: 5, name: "Sofia K.", xp: 55300, league: "F1 Enthusiast", avatar: avatars.sofiaAvatar },
  { rank: 6, name: "Kai N.", xp: 48900, league: "Football Fan", avatar: avatars.kaiAvatar },
  { rank: 7, name: "Luca B.", xp: 42100, league: "F1 Enthusiast", avatar: avatars.lucaAvatar },
  { rank: 8, name: "Maya S.", xp: 36500, league: "Football Fan", avatar: avatars.mayaAvatar },
  { rank: 9, name: "You", xp: 28750, league: "Rising Star", isMe: true },
  { rank: 10, name: "Chris D.", xp: 21300, league: "NBA Watcher", avatar: avatars.chrisAvatar },
];


export const podiumData = {
  1: {
    trophyClass: 'text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]',
    podiumClass: 'bg-gradient-to-b from-[rgba(255,215,0,0.15)] to-[rgba(255,215,0,0.02)] border border-[rgba(255,215,0,0.3)] border-b-0',
    rankClass: 'text-4xl text-[#FFD700]',
  },
  2: {
    trophyClass: 'text-[#B8C4CC] drop-shadow-[0_0_10px_rgba(184,196,204,0.4)]',
    podiumClass: 'bg-gradient-to-b from-[rgba(184,196,204,0.12)] to-[rgba(184,196,204,0.02)] border border-[rgba(184,196,204,0.25)] border-b-0',
    rankClass: 'text-3xl text-[#B8C4CC]',
  },
  3: {
    trophyClass: 'text-[#CD7F32] drop-shadow-[0_0_10px_rgba(205,127,50,0.3)]',
    podiumClass: 'bg-gradient-to-b from-[rgba(205,127,50,0.1)] to-[rgba(205,127,50,0.02)] border border-[rgba(205,127,50,0.2)] border-b-0',
    rankClass: 'text-2xl text-[#CD7F32]',
  },
}
