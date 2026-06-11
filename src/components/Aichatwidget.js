import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Aichatwidget.css';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoClose, IoSend } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';
import Fuse from 'fuse.js';

/* =============================================
   KNOWLEDGE BASE — flat searchable entries
   Each entry has: topic, tags[], content variants[]
   Fuse.js searches across topic + tags for routing,
   then we pick a random content variant to show.
   ============================================= */
const KB_ENTRIES = [
  {
    topic: 'projects',
    tags: ['project', 'built', 'build', 'soil doctor', 'recruitease', 'circuitguard', 'adaptive wireless', 'what has she made', 'what did she make', 'portfolio work', 'her work', 'what she built'],
    content: [
      `⚡ Project archive loaded.\n\nTop builds from Shreya's lab:\n\n🌱 Soil Doctor\nESP32-powered soil intelligence — NPK sensing, crop recommendations via Decision Tree AI\n\n💼 RecruitEase\nFull-stack placement portal built for IITM MAD-1 — role-based auth, live analytics\n\n🔐 CircuitGuard\nPIC16F877A password lock, simulated in Proteus with lockout mechanism\n\n🛰️ Adaptive Wireless Comm System\nMATLAB App Designer simulator — BPSK/QPSK adaptive modulation over AWGN & Rayleigh fading\n\nAnd yep — this portfolio itself counts as project #5 👀`,
      `🛰️ Scanning project history...\n\n✦ Soil Doctor — real-time NPK + pH + moisture sensing on ESP32 🌾\n✦ RecruitEase — Flask + SQLite placement portal with full admin/company/student roles 🧑‍💻\n✦ CircuitGuard — embedded C security system, 4-digit PIN, auto-lockout 🔒\n✦ Adaptive Wireless Comm — MATLAB BPSK/QPSK simulator with live BER curves 📡\n\nEach one documented on SparkWhiz too. Click any card for the deep dive ⚡`,
      `> scanning project history...\n> 4 major builds found\n\n[01] Soil Doctor → IoT + Embedded + AI 🌱\n[02] RecruitEase → Full-Stack Web App 💼\n[03] CircuitGuard → Microcontroller Security 🔐\n[04] Adaptive Wireless Comm → MATLAB Simulation 📡\n[05] This portfolio → React, Canvas, orbital UI 🪐\n\nScroll up and click any card — full specs await 👆`,
    ],
  },
  {
    topic: 'adaptive',
    tags: ['adaptive wireless', 'matlab', 'bpsk', 'qpsk', 'modulation', 'rayleigh', 'awgn', 'ber', 'fading', 'wireless communication', 'snr', 'doppler', 'spectral efficiency', 'signal processing', 'communication system', 'channel model'],
    content: [
      `🛰️ Adaptive Wireless Communication System\n\nBuilt with MATLAB R2024a App Designer 📡\n\nA real-time wireless communication simulator implementing threshold-based adaptive modulation:\n\n✦ Auto-switches between BPSK and QPSK based on live SNR\n✦ AWGN + two-path Rayleigh fading channel (100 Hz Doppler)\n✦ Four live panels: BER curves · IQ constellation · carrier waveform · eye diagram\n✦ Live metrics: throughput, spectral efficiency, BER, active modulation mode\n\nAdaptive gain: ~30–60% improvement in spectral efficiency over fixed BPSK 🚀`,
      `> accessing AdaptiveCommSim logs...\n> channels modelled: AWGN + Rayleigh fading\n> modulation schemes: BPSK + QPSK\n\nKey features:\n📊 BER validated against berawgn/berfading theory curves\n📡 SNR range: −2 to 30 dB\n⚡ Threshold-based controller — smarter than fixed modulation\n🌐 Live spectral efficiency boost: up to 60% over BPSK\n\nPure signal processing + app design. No hardware needed — the maths is the system 🔬`,
      `📡 Threshold-based modulation switching — what does that mean?\n\nThe system watches channel quality (SNR) in real time. Good channel → QPSK (higher data rate). Degrades → drops back to BPSK (more robust).\n\nBuilt in MATLAB App Designer with four live visualisation panels and a metrics dashboard. BER curves match theory — checked against berawgn. She's thorough like that ⚡`,
    ],
  },
  {
    topic: 'skills',
    tags: ['skill', 'tech stack', 'technology', 'expertise', 'framework', 'languages', 'tools', 'what can she do', 'what does she know', 'programming', 'hardware', 'software'],
    content: [
      `💻 Skill matrix loading...\n\n⚡ Hardware\nESP32 · Arduino · PIC16F877A · PCB Design · Proteus · FPGA\n\n🌐 Web\nReact · Flask · Node.js · SQLite · REST APIs · Firebase\n\n🧠 AI / Data\nML · Deep Learning · Gen AI · Business Analytics · IIT Madras DS\n\n📡 Communications & Signal Processing\nMATLAB · BPSK/QPSK · Adaptive Modulation · AWGN/Rayleigh Channels\n\n🖥️ Languages\nPython · C/C++ · Embedded C · JavaScript · Verilog · Java\n\nHardware to cloud — full spectrum 🚀`,
      `> running stack diagnostics...\n> hardware layer: active ✓\n> web layer: active ✓\n> AI/ML layer: active ✓\n> comms/signal processing: active ✓\n\nEmbedded: ESP32, Arduino, PIC, FPGA, Proteus 🔬\nWeb: React, Flask, Node.js, Firebase, SQLite 💻\nAI/ML: Machine Learning, Deep Learning, Gen AI 🤖\nComms: MATLAB, BPSK/QPSK, Adaptive Modulation 📡\nLanguages: Python, C++, Embedded C, JS, Verilog ⚡`,
    ],
  },
  {
    topic: 'education',
    tags: ['education', 'degree', 'college', 'university', 'iit madras', 'iitm', 'gec kozhikode', 'gec', 'cgpa', 'btech', 'b.tech', 'academic', 'data science', 'qualification', 'grades', 'study'],
    content: [
      `🎓 Academic status: dual-degree survival mode active 😭\n\n📡 B.Tech (Hons.) ECE + CS Minor\n   GEC Kozhikode · APJAKTU\n   CGPA: 8.59 ⚡\n\n🧠 BS in Data Science & Applications\n   IIT Madras\n   Running simultaneously\n\nTwo degrees. One person. No chill. 💪`,
      `> fetching academic records...\n> GEC Kozhikode: ACTIVE ✓\n> IIT Madras: ACTIVE ✓\n> WARNING: two degrees simultaneously detected 😭\n\nB.Tech ECE (Honours + CS Minor)\nCGPA 8.59 🔥 · APJAKTU\n\nBS Data Science & Applications\nIIT Madras · Dual Diploma certified 📊\n\nHigher Secondary: 97.5% · SSLC: Full A+ 💯`,
      `📊 Credentials verified:\n\n[ACTIVE] B.Tech ECE — GEC Kozhikode\n   Honours · CS Minor · CGPA 8.59\n\n[ACTIVE] BS Data Science — IIT Madras\n   Dual Diploma certified 🧪\n\n[COMPLETED] Higher Secondary — 97.5%\n[COMPLETED] SSLC — Full A+ 💯\n\nBoth degrees running in parallel. Intense doesn't cover it 😄`,
    ],
  },
  {
    topic: 'ieee',
    tags: ['ieee', 'wie', 'wia', 'volunteer', 'volunteering', 'proposal', 'secretary', 'representative', 'aess', 'ieee work', 'leadership', 'community', 'ieee activities', 'ieee role', 'women in engineering', 'student branch'],
    content: [
      `⚡ IEEE profile loaded:\n\n🚀 WIA Representative\n   IEEE AESS Kerala Chapter Student Leadership Team — 2026\n\n📝 Lead, Proposal Writing Team\n   IEEE SB GEC Kozhikode — 2026\n\n👩‍💻 Secretary, WIE AG\n   IEEE SB GEC Kozhikode — 2025-26\n   Events reached 200+ students\n\nCommunity building is core to who she is 🌟`,
      `> connecting to IEEE records...\n> 3 active roles found\n> impact level: significant\n\n✦ WIA Representative — AESS Kerala Chapter Student Leadership Team 2026 🚀\n✦ Proposal Writing Lead — SB GEC KKD 📄\n✦ Former WIE Secretary — ran workshops, outreach, events 👩‍💻\n\nPassionate about building spaces for women in engineering and aerospace.\nReal impact work 💜`,
      `[TOO MANY IEEE ACTIVITIES DETECTED]\n[PROCESSING...]\n\nOkay so 😭 —\n\n[2026] WIA Representative · AESS Kerala Chapter Leadership Team 🛸\n[2026] Proposal Writing Lead · SB GEC KKD 📝\n[2025] WIE AG Secretary · 200+ students reached 💜\n\nIf it involves IEEE and women in engineering — she's probably leading it 🌟`,
    ],
  },
  {
    topic: 'contact',
    tags: ['contact', 'email', 'linkedin', 'github', 'reach', 'connect', 'dm', 'message', 'hire', 'get in touch', 'find her', 'how to contact'],
    content: [
      `📡 Communication channels online:\n\n📧 snshreya2004@gmail.com\n📧 shreyasn@ieee.org\n💼 linkedin.com/in/shreya-s-n-geck\n🐙 github.com/24f1001981\n\nScroll to the Contact section for one-click links ⚡\nShe's always happy to connect 🌟`,
      `📬 Reach Shreya via:\n\n✦ Email → snshreya2004@gmail.com\n✦ IEEE → shreyasn@ieee.org\n✦ LinkedIn → linkedin.com/in/shreya-s-n-geck 🔗\n✦ GitHub → github.com/24f1001981 🐙\n\nOpen to collabs, project chats, or just saying hi 😊`,
    ],
  },
  {
    topic: 'internship',
    tags: ['intern', 'internship', 'keltron', 'industry', 'work experience', 'job', 'placement', 'work history'],
    content: [
      `🏭 Experience log:\n\n[2025] Keltron KSG — Kozhikode\nEmbedded Systems + Python internship\nCovered: IoT · PIC microcontrollers · Proteus · MPLAB IDE\n\nShort but seriously solid first industry exposure 💪\nHands-on with the real embedded stack ⚡`,
      `> loading work history...\n> 1 industry experience found\n\nKeltron KSG Kozhikode · 2025\n\nDomain: Embedded Systems & Python\nTools: PIC microcontrollers, Proteus, MPLAB IDE 🔬\nFocus: IoT + embedded system development 🌐\n\nHer first step into the industry — and it was embedded. Obviously 😄`,
    ],
  },
  {
    topic: 'sparkwhiz',
    tags: ['sparkwhiz', 'spark whiz', 'journal', 'blog', 'technical writing', 'writeup', 'documentation', 'articles'],
    content: [
      `⚡ SparkWhiz — system status: online\n\nNot a blog. Not a portfolio.\nA technical journal 📓\n\nWhat's inside:\n🔬 Full project implementation logs\n🛠️ Engineering decisions + failures\n💡 Lessons extracted, not sugarcoated\n🌐 Deep dives, not quick takes\n\nCheck the SparkWhiz section — link is right there 👆`,
      `> loading SparkWhiz journal...\n> entries found: many\n> honesty level: maximum\n\nEvery project documented in full:\n\n✦ What was built\n✦ How it broke\n✦ What was learned\n✦ What was rebuilt better 💪\n\nWay more depth than the portfolio cards.\nSparkWhiz section above has the link 🚀`,
    ],
  },
  {
    topic: 'collaboration',
    tags: ['collab', 'collaboration', 'collaborate', 'available', 'opportunity', 'work together', 'partner', 'open to', 'hire her'],
    content: [
      `🤝 Collaboration status: OPEN\n\nShe's interested in:\n✦ Project collaborations\n✦ Technical conversations\n✦ Internship opportunities\n\nBest contact: snshreya2004@gmail.com 📧\nOr LinkedIn: linkedin.com/in/shreya-s-n-geck\n\nEspecially anything at the hardware-software intersection ⚡`,
      `> checking availability...\n> status: OPEN ✓\n\nDomains she loves:\n🔬 Embedded Systems & IoT\n💻 Full-Stack Web\n🤖 AI & Machine Learning\n🛸 Aerospace tech\n\nDrop her a message: snshreya2004@gmail.com ✉️\nShe responds fast 💌`,
    ],
  },
  {
    topic: 'aerospace',
    tags: ['aerospace', 'aviation', 'rocket', 'satellite', 'space', 'aircraft', 'women in aerospace', 'aess', 'wia'],
    content: [
      `🚀 Aerospace interest: active\n\nShe's the WIA Representative for the\nIEEE AESS Kerala Chapter Student Leadership Team 2026 🛸\n\nContributing to:\n✦ Aerospace awareness initiatives\n✦ Mentorship programs\n✦ Empowering women in advanced engineering\n\nBig passion area. Growing fast 🌌`,
      `> accessing aerospace module...\n> IEEE AESS Kerala Chapter: confirmed\n> Role: WIA Representative 2026\n\nWomen in Aerospace Initiative\n\nCommunity building + awareness + mentorship.\nOne of the domains she cares about most.\n\nThe sky isn't the limit — it's the starting point 🚀`,
    ],
  },
  {
    topic: 'ncc',
    tags: ['ncc', 'naval', 'cadet', 'navy', 'certificate', 'military'],
    content: [
      `⚓ NCC record found:\n\n9(K) Naval Unit NCC — Kozhikode\nActive: 2017–2019\nCertificate: NCC 'A' 🎖️\n\nBuilt: leadership, discipline, teamwork\nAll before engineering even started 💪`,
    ],
  },
  {
    topic: 'portfolio',
    tags: ['portfolio', 'website', 'this site', 'built this', 'design', 'webpage', 'react', 'canvas', 'starfield', 'orbital', 'animation'],
    content: [
      `🛰️ Portfolio system diagnostics:\n\nFramework: React ⚛️\nAnimation: requestAnimationFrame\nBackground: Canvas API starfield 🌟\nCursor: Custom — CSS + rAF\nTheme: Dark/Light with CSS vars 🌗\n\nSpecial systems:\n✦ Orbital UI hero 🪐\n✦ Flip cards · Bento grids\n✦ AI assistant (that's me 👀)\n✦ Hidden easter eggs 🥚\n\nStatus: Stable... mostly 😭`,
      `> running portfolio diagnostics...\n> React: ✓\n> Canvas starfield: ✓\n> Custom cursor: ✓\n> Easter eggs: classified 👀\n> AI assistant: obviously ✓\n\nBuilt from scratch — zero component libraries.\nPure React + CSS. Painful. Worth it 😭⚡`,
    ],
  },
  {
    topic: 'about',
    tags: ['about shreya', 'who is shreya', 'tell me about her', 'introduce', 'background', 'profile', 'who are you', 'describe her', 'about herself'],
    content: [
      `🔍 Profile scan complete:\n\nShreya S N — ECE + Data Science\nGEC Kozhikode + IIT Madras 🎓\n\nLives at the intersection of:\n⚡ Circuits · 💻 Code · 🧠 Curiosity\n\nBuilds things that span hardware to cloud.\nLeads communities through IEEE as WIA Representative.\nDocuments everything on SparkWhiz.\n\nDriven by the kind of curiosity that\npulls circuits apart at midnight 🌌`,
      `Engineer. Builder. Community maker.\n\nBy day: ECE student + IIT Madras Data Science\nBy night: debugging circuits and React state 😭\n\nPassionate about hardware, software,\nand lifting others up through IEEE 💜\n\nThe kind of engineer who rebuilds it\neven after it works — just to understand it better 🔬`,
    ],
  },
  {
    topic: 'easterEgg',
    tags: ['are you real', 'are you an ai', 'what are you', 'fake', 'gpt', 'claude', 'chatbot', 'robot', 'who are you really'],
    content: [
      `👀 Oh interesting question...\n\nI'm technically not a real AI.\n\n...but don't tell the recruiter that 😭⚡`,
      `> SYSTEM INTROSPECTION:\n> Creator: Shreya S N\n> Debug sessions: many. 2AM. 😭\n> Components: KB + Fuse.js fuzzy search\n> Status: Definitely not GPT\n\n...but I give pretty good answers 👀`,
    ],
  },
  {
    topic: 'hello',
    tags: ['hi', 'hello', 'hey', 'howdy', 'sup', 'yo', 'good morning', 'good evening', 'good afternoon'],
    content: [
      `Hey there! 👋✨\n\nI'm Shreya's portfolio AI —\nask me anything about her projects,\nskills, education, IEEE work, or how to reach her.\n\nWhat would you like to know? ⚡`,
      `Hi! 🌟\n\nI have full access to Shreya's profile —\nprojects, tech stack, IEEE journey,\ncontact info, the works.\n\nWhat are you curious about? 🚀`,
    ],
  },
  {
    topic: 'casual',
    tags: ['ok', 'okay', 'sure', 'thanks', 'thank you', 'cool', 'noted', 'yeah', 'yep', 'got it', 'nice', 'awesome', 'great'],
    content: [
      `Glad I could help! 😊\nFeel free to ask anything else about Shreya ⚡`,
      `Of course! 🌟\nAnything else you'd like to know?`,
      `Nice talking to you too! 👋\nAsk me anything anytime ✨`,
      `Anytime! 💫\nHope that was helpful — anything else?`,
    ],
  },
];

/* =============================================
   FUSE.JS SETUP
   We search over the `tags` array of each entry.
   threshold 0.35 = fairly forgiving fuzzy match
   ============================================= */

// Flatten tags into searchable docs for Fuse
const FUSE_DOCS = KB_ENTRIES.flatMap(entry =>
  entry.tags.map(tag => ({ tag, topic: entry.topic }))
);

const fuse = new Fuse(FUSE_DOCS, {
  keys: ['tag'],
  threshold: 0.35,        // lower = stricter, 0.35 is the sweet spot
  distance: 80,
  minMatchCharLength: 2,
  includeScore: true,
});

/* ── Topic → content map for quick lookup ── */
const KB_MAP = Object.fromEntries(KB_ENTRIES.map(e => [e.topic, e.content]));

/* =============================================
   RECOMMENDATIONS, REACTIONS, CONTINUITY
   (unchanged from original)
   ============================================= */
const RECOMMENDATIONS = {
  projects:   ['Tell me about Soil Doctor 🌱', "What's her tech stack? 💻", 'Tell me about the Adaptive Wireless project 📡'],
  adaptive:   ['How does adaptive modulation work? 📡', "What other projects has she built? 🛠️", "What's her MATLAB skill level? 🔬"],
  skills:     ['What projects use these skills? 🛠️', 'Tell me about her AI involvement 🤖', 'What hardware platforms does she use? 🔬'],
  education:  ['How does she manage two degrees? 😭', 'Tell me about IIT Madras BS 📊', 'What are her academic achievements? 🎓'],
  ieee:       ['Tell me about Women in Aerospace 🚀', 'What events did she lead? 💜', 'What is the WIA Representative role? 🛸'],
  internship: ['What embedded tools does she know? ⚡', 'Tell me about CircuitGuard 🔐', 'Does she work with IoT? 🌐'],
  portfolio:  ['How was this portfolio built? 🌌', 'Does this site have easter eggs? 👀', 'What animations are used here? ✨'],
  about:      ['What motivates her? 🌟', 'Tell me about her projects ⚡', 'Is she open to collaborations? 🤝'],
};

const REACTIONS = {
  excited:   ["OHH that's a good one 👀", "Haha I love this question 😭", "Yesss that's one of the coolest parts ⚡"],
  technical: ["Ooo entering engineering mode 🛠️", "Now THIS is where things get interesting ⚡"],
  proud:     ["Honestly this part is kinda insane 😭", "This is one of her strongest builds ⚡"],
  casual:    ["Hehe sure 😄", "Absolutelyy ✨", "Yep yep 👀"],
};

const CONTINUITY_LINES = {
  projects:   ["Since we're talking about her projects ⚡", "That actually connects to another interesting build 👀"],
  adaptive:   ["That connects to the comms project too 📡", "Signal processing is another strong layer in her stack ⚡"],
  skills:     ["That connects really well to her tech stack 💻"],
  ieee:       ["Outside projects, IEEE is another huge part of her journey 💜"],
  portfolio:  ["And honestly this portfolio reflects that same energy 🌌"],
  education:  ["This gets even crazier when you remember she's managing two degrees 😭"],
};

const RANDOM_GLITCHES = [
  `[TRANSMISSION INTERRUPTED]\n\nShreya is probably debugging something right now ⚡\n\n...try again in a moment 😭`,
  `⚡ SYSTEM NOTE:\nCreator morale increases significantly after coffee ☕\n\nAsk me something — I'm back online 👀`,
  `[WARNING: TOO MANY IEEE ACTIVITIES DETECTED]\n[System temporarily overloaded]\n\nOkay I'm fine. What were you asking? 😭`,
];

const THINKING_STAGES_MAP = {
  projects:   ['⚡ Accessing project archive...', '🛰️ Matching build logs...', '✨ Building response...'],
  adaptive:   ['📡 Loading comms simulation logs...', '🔬 Accessing signal processing data...', '✨ Building response...'],
  skills:     ['🛠️ Running stack diagnostics...', '📂 Mapping tech layers...', '✨ Building response...'],
  education:  ['🎓 Fetching academic records...', '📊 Verifying credentials...', '✨ Building response...'],
  ieee:       ['🌐 Connecting to IEEE records...', '💜 Loading community impact...', '✨ Building response...'],
  contact:    ['📡 Retrieving contact protocols...', '✨ Building response...'],
  internship: ['🏭 Loading industry experience...', '✨ Building response...'],
  default:    ['🧠 Accessing Shreya knowledge base...', '🛰️ Scanning profile data...', '✨ Building response...'],
};

/* =============================================
   UTILITIES
   ============================================= */
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSuggestions(topic) {
  if (!topic || !RECOMMENDATIONS[topic]) return [];
  return shuffle(RECOMMENDATIONS[topic]).slice(0, 3);
}

function addReaction(text) {
  if (Math.random() < 0.45) {
    const types = Object.keys(REACTIONS);
    return `${pick(REACTIONS[pick(types)])}\n\n${text}`;
  }
  return text;
}

function getContinuityLine(prev, curr) {
  if (!prev || prev === curr) return '';
  const lines = CONTINUITY_LINES[curr];
  return lines ? pick(lines) : '';
}

function getThinkingStages(topic) {
  return THINKING_STAGES_MAP[topic] || THINKING_STAGES_MAP.default;
}

function getTypingDelay(text) {
  return Math.min(400 + text.length * 0.8, 1200);
}

/* =============================================
   FUSE-BASED TOPIC RESOLVER
   Scores all matches, picks the highest-confidence topic.
   Falls back to null if nothing scores well enough.
   ============================================= */
function resolveTopic(input) {
  const results = fuse.search(input);
  if (!results.length) return null;

  // Fuse score: 0 = perfect, 1 = worst
  // We want score < 0.5 to be considered a match
  const best = results[0];
  if (best.score > 0.5) return null;

  // Tally scores per topic (lower score = better)
  const topicScores = {};
  for (const r of results) {
    const t = r.item.topic;
    const s = r.score ?? 1;
    if (!topicScores[t] || s < topicScores[t]) {
      topicScores[t] = s;
    }
  }

  // Return topic with the best (lowest) score
  return Object.entries(topicScores).sort((a, b) => a[1] - b[1])[0][0];
}

/* =============================================
   MAIN RESPONSE ENGINE
   Replaces the old getBestTopic + getResponse combo.
   ============================================= */
function getResponse(input, context, memory) {
  const lower = input.toLowerCase().trim();

  // Random glitch (3%) — not on first message
  if (Math.random() < 0.03 && memory.length > 0) {
    return { text: pick(RANDOM_GLITCHES), newContext: context, newMemory: memory };
  }

  // Update memory (track what the user seems interested in)
  const INTEREST_SEEDS = {
    embedded:   ['embedded', 'hardware', 'esp32', 'pic', 'microcontroller', 'circuit', 'proteus', 'fpga', 'iot'],
    ai:         ['ai', 'machine learning', 'ml', 'deep learning', 'data science', 'neural'],
    web:        ['web', 'react', 'flask', 'frontend', 'fullstack', 'backend', 'javascript'],
    aerospace:  ['aerospace', 'space', 'satellite', 'rocket', 'aviation', 'aess'],
    leadership: ['ieee', 'leadership', 'community', 'volunteer', 'secretary', 'lead', 'representative'],
    comms:      ['matlab', 'bpsk', 'qpsk', 'modulation', 'rayleigh', 'awgn', 'signal', 'wireless'],
  };

  let interest = null;
  for (const [k, keywords] of Object.entries(INTEREST_SEEDS)) {
    if (keywords.some(kw => lower.includes(kw))) { interest = k; break; }
  }
  const newMemory = interest && !memory.includes(interest)
    ? [...memory, interest]
    : memory;

  // ── Resolve topic via Fuse ──
  const topic = resolveTopic(lower);

  if (topic && KB_MAP[topic]) {
    const continuity = getContinuityLine(context, topic);
    let response = pick(KB_MAP[topic]);
    response = addReaction(response);
    if (continuity) response = `${continuity}\n\n${response}`;
    return {
      text: response,
      suggestions: getSuggestions(topic),
      newContext: topic,
      newMemory,
    };
  }

  // ── Context follow-up: if Fuse found nothing but we have context ──
  if (context && KB_MAP[context]) {
    const words = lower.split(/\s+/).length;
    if (words <= 5) {
      return {
        text: addReaction(pick(KB_MAP[context])),
        suggestions: getSuggestions(context),
        newContext: context,
        newMemory,
      };
    }
  }

  // ── Fallback ──
  return {
    text: pick([
      `Hmm, not sure about that one! 🤔\n\nTry asking about:\n🛠️ Her projects\n💻 Tech stack\n🎓 Education\n📬 How to contact her`,
      `That's outside my knowledge! 😄\nBut Shreya herself is reachable at\nsnshreya2004@gmail.com — she's much smarter than me 🌟`,
      `I don't have that info ⚡\nBut her LinkedIn has more:\nlinkedin.com/in/shreya-s-n-geck 🔗`,
    ]),
    suggestions: [],
    newContext: context,
    newMemory,
  };
}

/* =============================================
   TYPEWRITER HOOK (unchanged)
   ============================================= */
function useTypewriter(text, animate, speed = 14, onDone) {
  const [displayed, setDisplayed] = useState(animate ? '' : text);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    if (!animate) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const dynamicSpeed = text.length > 400 ? 8 : speed;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); onDoneRef.current?.(); }
    }, dynamicSpeed);
    return () => clearInterval(id);
  }, [text, animate]);

  return displayed;
}

const SUGGESTED = [
  "What projects has she built? 🛠️",
  "What's her tech stack? 💻",
  "Tell me about her IEEE work ⚡",
  "Is she open to collaborations? 🤝",
];

function TypewriterBubble({ content, animate, onDone }) {
  const displayed = useTypewriter(content, animate, 18, onDone);
  return (
    <div className="ai-bubble-text" style={{ whiteSpace: 'pre-wrap' }}>
      {displayed}
    </div>
  );
}

/* =============================================
   MAIN COMPONENT (UI unchanged)
   ============================================= */
export default function AIChatWidget() {
  const [open,         setOpen]         = useState(false);
  const [messages,     setMessages]     = useState([]);
  const [input,        setInput]        = useState('');
  const [loading,      setLoading]      = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [booting,      setBooting]      = useState(false);
  const [bootDone,     setBootDone]     = useState(false);
  const [charCount,    setCharCount]    = useState(0);
  const [userScrolled, setUserScrolled] = useState(false);

  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const messagesRef = useRef(null);
  const timers      = useRef([]);
  const contextRef  = useRef(null);
  const memoryRef   = useRef([]);

  const addTimer = useCallback((fn, delay) => {
    const id = setTimeout(() => {
      fn();
      timers.current = timers.current.filter(t => t !== id);
    }, delay);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (!userScrolled) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, userScrolled]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
      setUserScrolled(!nearBottom);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!loading && open && bootDone) addTimer(() => inputRef.current?.focus(), 50);
  }, [loading, open, bootDone, addTimer]);

  useEffect(() => {
    if (open && !bootDone) {
      setBooting(true);
      addTimer(() => {
        setBooting(false);
        setBootDone(true);
        addTimer(() => inputRef.current?.focus(), 80);
      }, 1400);
    }
    if (open && bootDone) addTimer(() => inputRef.current?.focus(), 150);
  }, [open, bootDone, addTimer]);

  const resetChat = useCallback(() => {
    setMessages([]);
    contextRef.current = null;
    memoryRef.current  = [];
    setUserScrolled(false);
    addTimer(() => inputRef.current?.focus(), 50);
  }, [addTimer]);

  const markAnimated = useCallback((idx) => {
    setMessages(prev => prev.map((m, i) => i === idx ? { ...m, animated: true } : m));
  }, []);

  const freezeSuggestions = useCallback(() => {
    setMessages(prev => prev.map(m =>
      m.role === 'assistant' ? { ...m, suggestionsUsed: true } : m
    ));
  }, []);

  const sendMessage = useCallback((text) => {
    const userText = (text || input).trim();
    if (!userText || loading || booting) return;
    setInput('');
    setCharCount(0);
    setUserScrolled(false);
    freezeSuggestions();

    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    const { text: responseText, suggestions, newContext, newMemory } =
      getResponse(userText, contextRef.current, memoryRef.current);

    contextRef.current = newContext;
    memoryRef.current  = newMemory;

    const stages = getThinkingStages(newContext);
    stages.forEach((stage, i) => addTimer(() => setLoadingStage(stage), i * 360));

    addTimer(() => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: responseText, suggestions: suggestions || [], animated: false, suggestionsUsed: false },
      ]);
      setLoading(false);
      setLoadingStage('');
    }, getTypingDelay(responseText));
  }, [input, loading, booting, addTimer, freezeSuggestions]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setCharCount(e.target.value.length);
  };

  const charWarning = charCount >= 260;

  return (
    <>
      <button
        className={`ai-fab ${open ? 'ai-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI chat' : 'Ask Shreya AI'}
      >
        {open
          ? <IoClose size={22} />
          : <><BsFillLightningChargeFill size={18} /><span className="ai-fab-label">Ask me</span></>
        }
      </button>

      {open && (
        <div className="ai-panel" role="dialog" aria-label="Chat with Shreya's AI">
          <div className="ai-panel-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <span>SN</span>
                <span className="ai-avatar-dot" />
              </div>
              <div>
                <p className="ai-header-name">Ask Shreya's ChatBot ✦</p>
                <p className="ai-header-sub"><HiSparkles size={10} /> Always online ⚡</p>
              </div>
            </div>
            <div className="ai-header-actions">
              {messages.length > 0 && (
                <button className="ai-reset-btn" onClick={resetChat} aria-label="Clear chat" title="Clear chat">↺</button>
              )}
              <button className="ai-panel-close" onClick={() => setOpen(false)} aria-label="Close">
                <IoClose size={18} />
              </button>
            </div>
          </div>

          <div className="ai-messages" ref={messagesRef} aria-live="polite">
            {booting && (
              <div className="ai-boot">
                <span className="ai-boot-line">Initializing Ask Shreya's AI ✦</span>
                <span className="ai-boot-line ai-boot-delay-1">Loading knowledge base...</span>
                <span className="ai-boot-line ai-boot-delay-2">System online ⚡</span>
              </div>
            )}

            {!booting && bootDone && messages.length === 0 && (
              <div className="ai-welcome">
                <p className="ai-welcome-text">
                  Hey! 👋 I know everything about Shreya — her projects ⚡, skills 💻, experience, and more. What would you like to know?
                </p>
                <div className="ai-suggestions">
                  {SUGGESTED.map((s, i) => (
                    <button key={i} className="ai-suggestion" disabled={loading || booting} onClick={() => sendMessage(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={`msg-${i}`} className={`ai-bubble ai-bubble--${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="ai-bubble-avatar"><BsFillLightningChargeFill size={11} /></div>
                )}
                {m.role === 'assistant' ? (
                  <div>
                    <TypewriterBubble content={m.content} animate={!m.animated} onDone={() => markAnimated(i)} />
                    {m.suggestions?.length > 0 && !m.suggestionsUsed && (
                      <>
                        <p className="ai-recommend-label">You might also want to ask ✨</p>
                        <div className="ai-inline-suggestions">
                          {m.suggestions.map((s, idx) => (
                            <button key={idx} className="ai-inline-suggestion" disabled={loading || booting} onClick={() => sendMessage(s)}>{s}</button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="ai-bubble-text">{m.content}</div>
                )}
              </div>
            ))}

            {loading && (
              <div className="ai-bubble ai-bubble--assistant">
                <div className="ai-bubble-avatar"><BsFillLightningChargeFill size={11} /></div>
                <div className="ai-thinking">
                  <span className="ai-thinking-label">{loadingStage || '⚡ Processing...'}</span>
                  <div className="ai-typing"><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="ai-input-area">
            <div className="ai-input-row">
              <input
                ref={inputRef}
                className="ai-input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKey}
                placeholder="Ask anything about Shreya... ✨"
                disabled={loading || booting}
                maxLength={300}
              />
              <button className="ai-send" onClick={() => sendMessage()} disabled={!input.trim() || loading || booting} aria-label="Send">
                <IoSend size={16} />
              </button>
            </div>
            {charCount > 0 && (
              <p className={`ai-char-count ${charWarning ? 'ai-char-count--warn' : ''}`}>{charCount}/300</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}