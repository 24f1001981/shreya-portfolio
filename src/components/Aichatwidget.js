import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Aichatwidget.css';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoClose, IoSend } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

/* =============================================
   KNOWLEDGE BASE — terminal-style responses
   Each topic: 3 varied, visually formatted
   ============================================= */
const KB = {
  projects: [
    `⚡ Project archive loaded.\n\nTop builds from Shreya's lab:\n\n🌱 Soil Doctor\nESP32-powered soil intelligence — NPK sensing, crop recommendations via Decision Tree AI\n\n💼 RecruitEase\nFull-stack placement portal built for IITM MAD-1 — role-based auth, live analytics\n\n🔐 CircuitGuard\nPIC16F877A password lock, simulated in Proteus with lockout mechanism\n\nAnd yep — this portfolio itself counts as project #4 👀`,
    `🛰️ Scanning project history...\n\n✦ Soil Doctor — real-time NPK + pH + moisture sensing on ESP32 🌾\n✦ RecruitEase — Flask + SQLite placement portal with full admin/company/student roles 🧑‍💻\n✦ CircuitGuard — embedded C security system, 4-digit PIN, auto-lockout 🔒\n\nEach one documented on SparkWhiz too. Click any card for the deep dive ⚡`,
    `🔬 Three standout builds detected:\n\n[01] Soil Doctor → IoT + Embedded + AI 🌱\n[02] RecruitEase → Full-Stack Web App 💼\n[03] CircuitGuard → Microcontroller Security 🔐\n[04] This portfolio → React, Canvas, orbital UI 🪐\n\nScroll up and click any card — full specs await 👆`,
  ],
  skills: [
    `💻 Skill matrix loading...\n\n⚡ Hardware\nESP32 · Arduino · PIC16F877A · PCB Design · Proteus · FPGA\n\n🌐 Web\nReact · Flask · Node.js · SQLite · REST APIs · Firebase\n\n🧠 AI / Data\nML · Deep Learning · Gen AI · Business Analytics · IIT Madras DS\n\n🖥️ Languages\nPython · C/C++ · Embedded C · JavaScript · Verilog · Java\n\nHardware to cloud — full spectrum 🚀`,
    `🛠️ Tech stack diagnostic:\n\nEmbedded: ESP32, Arduino, PIC, FPGA, Proteus 🔬\nWeb: React, Flask, Node.js, Firebase, SQLite 💻\nAI/ML: Machine Learning, Deep Learning, Gen AI 🤖\nLanguages: Python, C++, Embedded C, JS, Verilog ⚡\n\nCheck the Skills section for the full breakdown 👆`,
    `⚡ Stack detected — unusual depth for an undergrad:\n\n🔩 Circuits → PCB design, signal processing, EDA tools\n💻 Code → React, Flask, Python, JS, Embedded C\n🧠 Intelligence → ML, Data Science, IIT Madras DS program\n📡 Connectivity → IoT, MQTT, LoRaWAN, cloud integration\n\nIntersection of electrons and algorithms. Literally. 🌌`,
  ],
  education: [
    `🎓 Academic status: dual-degree survival mode active 😭\n\n📡 B.Tech (Hons.) ECE + CS Minor\n   GEC Kozhikode · APJAKTU\n   CGPA: 8.59 ⚡\n\n🧠 BS in Data Science & Applications\n   IIT Madras\n   Running simultaneously\n\nTwo degrees. One person. No chill. 💪`,
    `🏛️ Education log:\n\n✦ GEC Kozhikode\n   B.Tech ECE (Honours + CS Minor)\n   CGPA 8.59 🔥\n\n✦ IIT Madras\n   BS Data Science & Applications 📊\n   Dual diplomas: Programming + Data Science\n\n✦ Higher Secondary: 97.5% 💯\n✦ SSLC: Full A+ ✨\n\nConsistently crushing it throughout.`,
    `📊 Credentials verified:\n\n[ACTIVE] B.Tech ECE — GEC Kozhikode\n   Honours · CS Minor · CGPA 8.59\n\n[ACTIVE] BS Data Science — IIT Madras\n   Dual Diploma certified 🧪\n\n[COMPLETED] Higher Secondary — 97.5%\n[COMPLETED] SSLC — Full A+ 💯\n\nBoth degrees running in parallel. Intense doesn't cover it 😄`,
  ],
  ieee: [
    `⚡ IEEE profile loaded:\n\n🚀 Women in Aerospace\n   IEEE AESS Kerala Section — active member\n\n📝 Lead, Proposal Writing Team\n   IEEE SB GEC Kozhikode — 2026\n\n👩‍💻 Secretary, WIE AG\n   IEEE SB GEC Kozhikode — 2025-26\n   Events reached 200+ students\n\nCommunity building is core to who she is 🌟`,
    `🛤️ IEEE journey:\n\n✦ Women in Aerospace — AESS Kerala Section 🚀\n✦ Proposal Writing Lead — SB GEC KKD 📄\n✦ Former WIE Secretary — ran workshops, outreach, events 👩‍💻\n\nPassionate about building spaces for women in engineering and aerospace.\nReal impact work 💜`,
    `🌐 IEEE presence — significant:\n\n[2026] Women in Aerospace · AESS Kerala 🛸\n[2026] Proposal Writing Lead · SB GEC KKD 📝\n[2025] WIE AG Secretary · 200+ students reached 💜\n\nIf it involves IEEE and women in engineering — she's probably leading it 🌟`,
  ],
  contact: [
    `📡 Communication channels online:\n\n📧 snshreya2004@gmail.com\n📧 shreyasn@ieee.org\n💼 linkedin.com/in/shreya-s-n-geck\n🐙 github.com/24f1001981\n\nScroll to the Contact section for one-click links ⚡\nShe's always happy to connect 🌟`,
    `📬 Reach Shreya via:\n\n✦ Email → snshreya2004@gmail.com\n✦ IEEE → shreyasn@ieee.org\n✦ LinkedIn → linkedin.com/in/shreya-s-n-geck 🔗\n✦ GitHub → github.com/24f1001981 🐙\n\nOpen to collabs, project chats, or just saying hi 😊`,
    `✉️ Contact protocols active:\n\nPrimary: snshreya2004@gmail.com 📧\nIEEE: shreyasn@ieee.org\nLinkedIn: linkedin.com/in/shreya-s-n-geck 💼\nGitHub: github.com/24f1001981 🐙\n\nShe responds fast — don't hesitate to reach out 🚀`,
  ],
  internship: [
    `🏭 Experience log:\n\n[2025] Keltron KSG — Kozhikode\nEmbedded Systems + Python internship\nCovered: IoT · PIC microcontrollers · Proteus · MPLAB IDE\n\nShort but seriously solid first industry exposure 💪\nHands-on with the real embedded stack ⚡`,
    `🔧 Industry experience:\n\nKeltron KSG Kozhikode · 2025\n\nDomain: Embedded Systems & Python\nTools: PIC microcontrollers, Proteus, MPLAB IDE\nFocus: IoT + embedded system development 🌐\n\nHer first step into the industry — and it was embedded. Obviously 😄`,
  ],
  sparkwhiz: [
    `⚡ SparkWhiz — system status: online\n\nNot a blog. Not a portfolio.\nA technical journal 📓\n\nWhat's inside:\n🔬 Full project implementation logs\n🛠️ Engineering decisions + failures\n💡 Lessons extracted, not sugarcoated\n🌐 Deep dives, not quick takes\n\nCheck the SparkWhiz section — link is right there 👆`,
    `📓 SparkWhiz detected:\n\nShreyaʼs personal engineering journal.\nEvery project documented in full:\n\n✦ What was built\n✦ How it broke\n✦ What was learned\n✦ What was rebuilt better 💪\n\nWay more depth than the portfolio cards.\nSparkWhiz section above has the link 🚀`,
  ],
  collaboration: [
    `🤝 Collaboration status: OPEN\n\nShe's interested in:\n✦ Project collaborations\n✦ Technical conversations\n✦ Internship opportunities\n\nBest contact: snshreya2004@gmail.com 📧\nOr LinkedIn: linkedin.com/in/shreya-s-n-geck\n\nEspecially anything at the hardware-software intersection ⚡`,
    `🚀 Open to collaborations — confirmed!\n\nDomains she loves:\n🔬 Embedded Systems & IoT\n💻 Full-Stack Web\n🤖 AI & Machine Learning\n🛸 Aerospace tech\n\nDrop her a message: snshreya2004@gmail.com ✉️\nShe responds fast 💌`,
    `💌 Availability check:\n\n[✓] Open to project collabs\n[✓] Open to technical conversations\n[✓] Open to internship opportunities\n[✓] Open to just saying hi 😊\n\nEmail: snshreya2004@gmail.com\nLinkedIn: linkedin.com/in/shreya-s-n-geck 🔗`,
  ],
  aerospace: [
    `🚀 Aerospace interest: active\n\nShe's part of Women in Aerospace at\nIEEE AESS Kerala Section 🛸\n\nContributing to:\n✦ Aerospace awareness initiatives\n✦ Mentorship programs\n✦ Empowering women in advanced engineering\n\nBig passion area. Growing fast 🌌`,
    `🛸 Aerospace detected in profile:\n\nIEEE AESS Kerala Section\nWomen in Aerospace Initiative\n\nCommunity building + awareness + mentorship.\nOne of the domains she cares about most.\n\nThe sky isnʼt the limit — itʼs the starting point 🚀`,
  ],
  ncc: [
    `⚓ NCC record found:\n\n9(K) Naval Unit NCC — Kozhikode\nActive: 2017–2019\nCertificate: NCC 'A' 🎖️\n\nBuilt: leadership, discipline, teamwork\nAll before engineering even started 💪`,
    `🎖️ NCC 'A' Certificate — verified\n\nNaval NCC Cadet · 2017–2019\nKozhikode Unit\n\nLeadership and discipline have been part\nof her journey since long before college.\nOld school character building ⚡`,
  ],
  portfolio: [
    `🛰️ Portfolio system diagnostics:\n\nFramework: React ⚛️\nAnimation: requestAnimationFrame\nBackground: Canvas API starfield 🌟\nCursor: Custom — CSS + rAF\nTheme: Dark/Light with CSS vars 🌗\n\nSpecial systems:\n✦ Orbital UI hero 🪐\n✦ Flip cards · Bento grids\n✦ AI assistant (that's me 👀)\n✦ Hidden easter eggs 🥚\n\nStatus: Stable... mostly 😭`,
    `💻 Portfolio build log:\n\nBuilt from scratch — zero component libraries.\nPure React + CSS.\n\nNotable:\n🪐 Orbital pill animation via rAF\n🌟 Starfield with Canvas API\n⚡ Custom cursor with lerp physics\n🌗 Dark/light mode with CSS vars\n👀 Konami easter egg (try it)\n🤖 This very AI assistant\n\nLiterally project #4 on her list 😄`,
  ],
  hello: [
    `Hey there! 👋✨\n\nI'm Shreya's portfolio AI —\nask me anything about her projects,\nskills, education, IEEE work, or how to reach her.\n\nWhat would you like to know? ⚡`,
    `Hi! 🌟\n\nI have full access to Shreya's profile —\nprojects, tech stack, IEEE journey,\ncontact info, the works.\n\nWhat are you curious about? 🚀`,
    `Hello hello! ⚡\n\nPortfolio assistant online.\nShreyaʼs info — loaded and ready.\n\nAsk me anything 👀`,
  ],
  casual: [
  "Glad I could help! 😊 Feel free to ask anything else about Shreya ⚡",
  "Of course! 🌟 Anything else you'd like to know?",
  "Nice talking to you too! 👋 Ask me anything anytime ✨",
  "Anytime! 💫 Hope that was helpful — anything else?",
  "Sure thing! ⚡ I'm here if you have more questions about Shreya 🚀",
  "Happy to help! 😄 What else are you curious about?",
],
  about: [
    `🔍 Profile scan complete:\n\nShreya S N — ECE + Data Science\nGEC Kozhikode + IIT Madras 🎓\n\nLives at the intersection of:\n⚡ Circuits · 💻 Code · 🧠 Curiosity\n\nBuilds things that span hardware to cloud.\nLeads communities through IEEE.\nDocuments everything on SparkWhiz.\n\nDriven by the kind of curiosity that\npulls circuits apart at midnight 🌌`,
    `🌌 Shreya S N — quick profile:\n\n🎓 Dual degree — ECE + IIT Madras DS\n⚡ Embedded systems to full-stack web\n🌐 IEEE community builder\n📓 SparkWhiz technical journalist\n🚀 Women in Aerospace member\n\nMost interesting problems live where\nelectrons and algorithms meet. She agrees 🧠`,
    `✦ About Shreya:\n\nEngineer. Builder. Community maker.\n\nBy day: ECE student + IIT Madras Data Science\nBy night: debugging circuits and React state 😭\n\nPassionate about hardware, software,\nand lifting others up through IEEE 💜\n\nThe kind of engineer who rebuilds it\neven after it works — just to understand it better 🔬`,
  ],
  easterEgg: [
    `👀 Oh interesting question...\n\nI'm technically not a real AI.\n\n...but don't tell the recruiter that 😭⚡`,
    `🌌 Am I real?\n\nI'm powered entirely by:\n✦ Caffeine\n✦ Curiosity\n✦ Questionable amounts of React state\n\nSo... real enough? 😄`,
    `⚡ SYSTEM INTROSPECTION:\n\nCreator: Shreya S N\nDebug sessions: many. 2AM. 😭\nComponents: Knowledge base + keyword magic\nStatus: Definitely not GPT\n\n...but I give pretty good answers 👀`,
  ],
  dream: [
    `🌌 Do I dream?\n\nOnly of perfectly typed JSX\nand circuits that work first try.\n\nSo no. Not really 😭⚡`,
    `✨ Dreams detected:\n\nAnimation loops that never drop frames.\nKeyword matching with 0 false positives.\nA world where CSS just works.\n\n...still dreaming 🌌`,
  ],
  powerLevel: [
    `⚡ POWER LEVEL CALCULATION:\n\nKnowledge base entries: ∞\nResponse variety: max\nTyping simulation: active\nEaster eggs: classified 👀\n\nConclusion: over 9000 😭`,
    `🔥 Power level:\n\nLimited only by the KB object above me.\nAnd Shreya's willingness to update it.\n\nSo... pretty high actually ⚡`,
  ],
};

/* ── keyword → topic map ── */
/* ── Weighted keyword map
   Each entry has:
   - exact: words that score 3 (whole-word match)
   - partial: words that score 1 (substring match)
   Highest total score wins — no accidental triggers
   ── */
const KEYWORD_MAP = [
  {
    topic: 'projects',
    exact:   ['project', 'projects', 'built', 'build', 'soil', 'doctor', 'recruitease', 'recruit', 'circuitguard', 'circuit'],
    partial: ['make', 'create', 'develop', 'work on', 'what has she'],
  },
  {
    topic: 'skills',
    exact:   ['skill', 'skills', 'stack', 'tech', 'technology', 'expertise', 'framework'],
    partial: ['language', 'tool', 'know', 'use', 'speciali', 'what can she'],
  },
  {
    topic: 'education',
    exact:   ['education', 'degree', 'college', 'university', 'iit', 'iitm', 'gec', 'cgpa', 'btech', 'b.tech'],
    partial: ['study', 'grade', 'data science', 'academic', 'qualification', 'school'],
  },
  {
    topic: 'ieee',
    exact:   ['ieee', 'wie', 'wia', 'volunteer', 'volunteering', 'proposal', 'secretary'],
    partial: ['leadership', 'community', 'lead', 'committee', 'organization'],
  },
  {
    topic: 'contact',
    exact:   ['contact', 'email', 'linkedin', 'github', 'reach', 'connect', 'dm'],
    partial: ['message', 'hire', 'talk', 'find her', 'get in touch'],
  },
  {
    topic: 'internship',
    exact:   ['intern', 'internship', 'keltron', 'industry'],
    partial: ['job', 'experience', 'work history', 'placement'],
  },
  {
    topic: 'sparkwhiz',
    exact:   ['sparkwhiz', 'spark whiz', 'journal', 'blog'],
    partial: ['writeup', 'documentation', 'articles', 'technical writing'],
  },
  {
    topic: 'collaboration',
    exact:   ['collab', 'collaboration', 'collaborate', 'available', 'opportunity'],
    partial: ['work together', 'partner', 'open to', 'hire her'],
  },
  {
    topic: 'aerospace',
    exact:   ['aerospace', 'aess', 'aviation', 'rocket', 'satellite'],
    partial: ['space', 'flying', 'aircraft'],
  },
  {
    topic: 'ncc',
    exact:   ['ncc', 'naval', 'cadet'],
    partial: ['certificate', 'military', 'navy'],
  },
  {
    topic: 'portfolio',
    exact:   ['portfolio', 'website', 'this site', 'this portfolio'],
    partial: ['built this', 'site', 'design', 'webpage'],
  },
  {
    topic: 'about',
    exact:   ['about', 'who is', 'who are', 'shreya', 'herself'],
    partial: ['tell me', 'describe', 'person', 'background', 'introduce'],
  },
  {
    topic: 'easterEgg',
    exact:   ['real', 'fake', 'gpt', 'claude', 'chatbot', 'robot'],
    partial: ['ai', 'machine', 'who are you', 'what are you', 'are you'],
  },
  {
    topic: 'dream',
    exact:   ['dream', 'dreaming', 'sleep', 'imagine'],
    partial: [],
  },
  {
    topic: 'powerLevel',
    exact:   ['power level', 'power'],
    partial: ['strong', 'capable', 'limit', 'how powerful'],
  },
  {
    topic: 'casual',
    exact:   ['ok', 'okay', 'sure', 'hmm', 'alright', 'thanks', 'thank', 'cool', 'noted', 'yeah', 'yep', 'yup', 'thx', 'ty'],
    partial: ['got it', 'nice', 'great', 'awesome', 'fine','hm'],
  },
  {
    topic: 'hello',
    exact:   ['hi', 'hello', 'hey', 'howdy', 'sup', 'yo', 'hii', 'heyy'],
    partial: ['greet', 'bro', 'good morning', 'good evening'],
  },
];

/* ── pick random from array ── */
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/* ── Weighted scorer ── */
function getBestTopic(lower) {
  const words = lower.split(/\s+/);
  let bestTopic = null;
  let bestScore = 0;

  for (const { topic, exact, partial } of KEYWORD_MAP) {
    let score = 0;

    // exact: whole-word match scores 3
    for (const key of exact) {
      if (key.includes(' ')) {
        // multi-word phrase — check substring
        if (lower.includes(key)) score += 3;
      } else {
        // single word — whole-word boundary check
        if (words.includes(key)) score += 3;
        else if (lower.includes(key)) score += 1; // partial match of exact key still scores 1
      }
    }

    // partial: substring scores 1
    for (const key of partial) {
      if (lower.includes(key)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  // minimum threshold — score of 1 = accidental, require at least 2
  return bestScore >= 2 ? bestTopic : null;
}

/* ── Context-aware follow-up keys per topic ── */
const CONTEXT_FOLLOWUP = {
  projects:  ['embedded', 'flask', 'soil', 'recruit', 'circuit', 'which', 'that one', 'tell more', 'detail', 'more about', 'esp32', 'pic'],
  skills:    ['embedded', 'python', 'react', 'what else', 'more', 'detail', 'languages', 'tools'],
  education: ['cgpa', 'grade', 'when', 'which', 'details', 'minor', 'more', 'marks'],
  ieee:      ['when', 'which', 'more', 'details', 'role', 'events', 'what did'],
  contact:   ['which', 'preferred', 'best way', 'other'],
  internship:['more', 'details', 'what did', 'which company', 'duration'],
};

/* ── smart response — now takes context as argument ── */
function getResponse(input, context) {
  const lower = input.toLowerCase();

  // rare transmission interrupt (3% chance — pure personality)
  if (Math.random() < 0.03) {
    return pick([
      `[TRANSMISSION INTERRUPTED]\n\nShreya is probably debugging something right now ⚡\n\n...try again in a moment 😭`,
      `⚡ SYSTEM NOTE:\nCreator morale increases significantly after coffee ☕\n\nAsk me something — I'm back online 👀`,
    ]);
  }

  // how/why smart redirect
  if (
    (lower.includes('how') || lower.includes('why')) &&
    !lower.includes('how to contact') &&
    !lower.includes('how did') &&
    !lower.includes('how many') &&
    !lower.includes('how long')
  ) {
    return pick([
      `Great question! 🤔 I'm best at facts about Shreya — try asking about her projects, skills, or IEEE work and I'll have lots to say! Or reach her directly at snshreya2004@gmail.com 😊`,
      `Hmm, 'how' and 'why' questions are better for Shreya herself 😄 But I can tell you about her projects ⚡, tech stack 💻, or experience — what interests you?`,
      `For the deeper 'how' and 'why' stuff, Shreya's the one to ask 🌟 — snshreya2004@gmail.com. But I can tell you what she's built, where she studies, or her IEEE work right now!`,
    ]);
  }

  // ── SESSION MEMORY: context-aware follow-up ──
  // If the user's message is vague but we have a context,
  // check if it's a follow-up question about the same topic
  if (context && KB[context]) {
    const followupKeys = CONTEXT_FOLLOWUP[context] || [];
    const isVague = lower.split(/\s+/).length <= 4; // short = probably a follow-up
    const hasFollowupKey = followupKeys.some(k => lower.includes(k));

    if (hasFollowupKey || (isVague && !getBestTopic(lower))) {
      // it's a follow-up — serve more from the same topic
      return pick(KB[context]);
    }
  }

  // ── WEIGHTED KEYWORD MATCHING ──
  const bestTopic = getBestTopic(lower);
  if (bestTopic) {
    return { response: pick(KB[bestTopic]), newContext: bestTopic };
  }

  // fallbacks
  return pick([
    `Hmm, not sure about that one! 🤔\n\nTry asking about:\n🛠️ Her projects\n💻 Tech stack\n🎓 Education\n📬 How to contact her`,
    `That's outside my knowledge! 😄\nBut Shreya herself is reachable at\nsnshreya2004@gmail.com — she's much smarter than me 🌟`,
    `I don't have that info ⚡\nBut her LinkedIn has more:\nlinkedin.com/in/shreya-s-n-geck 🔗`,
    `Not sure! 🙈\nTry asking about her projects,\nIEEE work 💜, tech stack, or SparkWhiz ⚡`,
  ]);

  // keyword matching
  let matchedTopic = null;

  for (const { keys, topic } of KEYWORD_MAP) {
    if (keys.some(k => lower.includes(k))) {
      matchedTopic = topic;
      break;
    }
  }

  if (matchedTopic) {
    sessionContext = matchedTopic;
    return pick(KB[matchedTopic]);
  }
  // fallbacks
  return pick([
    `Hmm, not sure about that one! 🤔\n\nTry asking about:\n🛠️ Her projects\n💻 Tech stack\n🎓 Education\n📬 How to contact her`,
    `That's outside my knowledge! 😄\nBut Shreya herself is reachable at\nsnshreya2004@gmail.com — she's much smarter than me 🌟`,
    `I don't have that info ⚡\nBut her LinkedIn has more:\nlinkedin.com/in/shreya-s-n-geck 🔗`,
    `Not sure! 🙈\nTry asking about her projects,\nIEEE work 💜, tech stack, or SparkWhiz ⚡`,
  ]);
}

/* ── DEAD CODE STUB — kept so nothing below breaks ── */
const contextKeys = {
  projects: [
    'embedded',
    'flask',
    'soil',
    'recruit',
    'circuit'
  ]
};

function checkContext() {
  if (ctxKeys.some(k => lower.includes(k))) {
    return pick(KB[sessionContext]);
  }
}


/* ── thinking states — varies by topic ── */
function getThinkingLabel(input) {
  const lower = input.toLowerCase();
  if (lower.includes('project') || lower.includes('built') || lower.includes('soil') || lower.includes('circuit')) return '⚡ Loading project archive...';
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) return '🛠️ Running stack diagnostics...';
  if (lower.includes('education') || lower.includes('degree') || lower.includes('iit') || lower.includes('gec')) return '🎓 Fetching academic records...';
  if (lower.includes('ieee') || lower.includes('leadership') || lower.includes('volunteer')) return '🌐 Connecting to IEEE records...';
  if (lower.includes('contact') || lower.includes('email') || lower.includes('linkedin')) return '📡 Retrieving contact protocols...';
  if (lower.includes('aerospace') || lower.includes('space')) return '🚀 Accessing aerospace module...';
  if (lower.includes('dream') || lower.includes('real') || lower.includes('ai')) return '🌌 Introspecting... maybe...';
  if (lower.includes('sparkwhiz') || lower.includes('blog')) return '📓 Loading SparkWhiz journal...';
  return pick([
    '🧠 Accessing Shreya knowledge base...',
    '🛰️ Scanning profile data...',
    '⚡ Processing query...',
    '🔬 Analyzing request...',
  ]);
}

/* ── typing delay scales with response length ── */
function getTypingDelay(response) {
  return Math.min(700 + response.length * 1.5, 2000);
}

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Suggested questions ── */
const SUGGESTED = [
  "What projects has she built? 🛠️",
  "What's her tech stack? 💻",
  "Tell me about her IEEE work ⚡",
  "Is she open to collaborations? 🤝",
];

/* ── Typewriter message bubble ── */
function TypewriterBubble({ content, isLatest }) {
  const { displayed } = useTypewriter(isLatest ? content : null, 14);
  const text = isLatest ? displayed : content;

  return (
    <div className="ai-bubble-text" style={{ whiteSpace: 'pre-wrap' }}>
      {text}
    </div>
  );
}

/* =============================================
   COMPONENT
   ============================================= */
export default function AIChatWidget() {
  const [open,        setOpen]        = useState(false);
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [thinkLabel,  setThinkLabel]  = useState('⚡ Processing...');
  const [booting,     setBooting]     = useState(false);
  const [bootDone,    setBootDone]    = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // auto-focus after reply lands
  useEffect(() => {
    if (!loading && open && bootDone) {
      inputRef.current?.focus();
    }
  }, [loading, open, bootDone]);

  // boot sequence on first open
  useEffect(() => {
    if (open && !bootDone) {
      setBooting(true);
      setTimeout(() => {
        setBooting(false);
        setBootDone(true);
        setTimeout(() => inputRef.current?.focus(), 80);
      }, 1400);
    }
    if (open && bootDone) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const sendMessage = useCallback((text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    const label = getThinkingLabel(userText);
    setThinkLabel(label);
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    const response = getResponse(userText);
    const delay    = getTypingDelay(response);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, delay);
  }, [input, loading]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        className={`ai-fab ${open ? 'ai-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI chat' : 'Ask Shreya AI'}
      >
        {open
          ? <IoClose size={22} />
          : <>
              <BsFillLightningChargeFill size={18} />
              <span className="ai-fab-label">Ask me</span>
            </>
        }
      </button>

      {/* Panel */}
      {open && (
        <div className="ai-panel" role="dialog" aria-label="Chat with Shreya's AI">

          {/* Header */}
          <div className="ai-panel-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <span>SN</span>
                <span className="ai-avatar-dot" />
              </div>
              <div>
                <p className="ai-header-name">Ask Shreya's AI ✦</p>
                <p className="ai-header-sub">
                  <HiSparkles size={10} /> Always online ⚡
                </p>
              </div>
            </div>
            <button className="ai-panel-close" onClick={() => setOpen(false)} aria-label="Close">
              <IoClose size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-messages">

            {/* Boot sequence */}
            {booting && (
              <div className="ai-boot">
                <span className="ai-boot-line">Initializing Ask Shreya's AI ✦</span>
                <span className="ai-boot-line ai-boot-delay-1">Loading knowledge base...</span>
                <span className="ai-boot-line ai-boot-delay-2">System online ⚡</span>
              </div>
            )}

            {/* Welcome */}
            {!booting && bootDone && messages.length === 0 && (
              <div className="ai-welcome">
                <p className="ai-welcome-text">
                  Hey! 👋 I know everything about Shreya — her projects ⚡, skills 💻, experience, and more. What would you like to know?
                </p>
                <div className="ai-suggestions">
                  {SUGGESTED.map((s, i) => (
                    <button key={i} className="ai-suggestion" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ai-bubble--${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="ai-bubble-avatar">
                    <BsFillLightningChargeFill size={11} />
                  </div>
                )}
                {m.role === 'assistant'
                  ? <TypewriterBubble content={m.content} isLatest={i === messages.length - 1} />
                  : <div className="ai-bubble-text">{m.content}</div>
                }
              </div>
            ))}

            {/* Thinking state */}
            {loading && (
              <div className="ai-bubble ai-bubble--assistant">
                <div className="ai-bubble-avatar">
                  <BsFillLightningChargeFill size={11} />
                </div>
                <div className="ai-thinking">
                  <span className="ai-thinking-label">{thinkLabel}</span>
                  <div className="ai-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="ai-input-row">
            <input
              ref={inputRef}
              className="ai-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about Shreya... ✨"
              disabled={loading || booting}
              maxLength={300}
            />
            <button
              className="ai-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading || booting}
              aria-label="Send"
            >
              <IoSend size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}