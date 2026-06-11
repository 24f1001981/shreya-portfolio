import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Aichatwidget.css';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoClose, IoSend } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

/* =============================================
   KNOWLEDGE BASE
   ============================================= */
const KB = {
  projects: [
    `⚡ Project archive loaded.\n\nTop builds from Shreya's lab:\n\n🌱 Soil Doctor\nESP32-powered soil intelligence — NPK sensing, crop recommendations via Decision Tree AI\n\n💼 RecruitEase\nFull-stack placement portal built for IITM MAD-1 — role-based auth, live analytics\n\n🔐 CircuitGuard\nPIC16F877A password lock, simulated in Proteus with lockout mechanism\n\n🛰️ Adaptive Wireless Comm System\nMATLAB App Designer simulator — BPSK/QPSK adaptive modulation over AWGN & Rayleigh fading\n\nAnd yep — this portfolio itself counts as project #5 👀`,
    `🛰️ Scanning project history...\n\n✦ Soil Doctor — real-time NPK + pH + moisture sensing on ESP32 🌾\n✦ RecruitEase — Flask + SQLite placement portal with full admin/company/student roles 🧑‍💻\n✦ CircuitGuard — embedded C security system, 4-digit PIN, auto-lockout 🔒\n✦ Adaptive Wireless Comm — MATLAB BPSK/QPSK simulator with live BER curves 📡\n\nEach one documented on SparkWhiz too. Click any card for the deep dive ⚡`,
    `> scanning project history...\n> 4 major builds found\n> loading summaries...\n\n[01] Soil Doctor → IoT + Embedded + AI 🌱\n[02] RecruitEase → Full-Stack Web App 💼\n[03] CircuitGuard → Microcontroller Security 🔐\n[04] Adaptive Wireless Comm → MATLAB Simulation 📡\n[05] This portfolio → React, Canvas, orbital UI 🪐\n\nScroll up and click any card — full specs await 👆`,
    `One of the coolest things about Shreya's project list is how different each one is 🌱\n\nSoil Doctor lives in the real world — sensors in actual dirt, reading pH and NPK levels in real time. RecruitEase is full-stack web. CircuitGuard is pure embedded C on a PIC microcontroller. And the Adaptive Wireless project is a full MATLAB simulation of real communication systems.\n\nFour projects. Four completely different problem domains. Same engineer. ⚡`,
  ],
  adaptive: [
    `🛰️ Adaptive Wireless Communication System\n\nBuilt with MATLAB R2024a App Designer 📡\n\nA real-time wireless communication simulator implementing threshold-based adaptive modulation:\n\n✦ Auto-switches between BPSK and QPSK based on live SNR\n✦ AWGN + two-path Rayleigh fading channel (100 Hz Doppler)\n✦ Four live panels: BER curves · IQ constellation · carrier waveform · eye diagram\n✦ Live metrics: throughput, spectral efficiency, BER, active modulation mode\n\nAdaptive gain: ~30–60% improvement in spectral efficiency over fixed BPSK 🚀`,
    `> accessing AdaptiveCommSim logs...\n> simulation engine: MATLAB App Designer\n> channels modelled: AWGN + Rayleigh fading\n> modulation schemes: BPSK + QPSK\n\nKey features:\n📊 BER validated against berawgn/berfading theory curves\n📡 SNR range: −2 to 30 dB\n⚡ Threshold-based controller — smarter than fixed modulation\n🌐 Live spectral efficiency boost: up to 60% over BPSK\n\nPure signal processing + app design. No hardware needed — the maths is the system 🔬`,
    `📡 Threshold-based modulation switching — what does that even mean?\n\nBasically: the system watches the channel quality (SNR) in real time. If the channel is good → switch to QPSK (higher data rate). If it degrades → drop back to BPSK (more robust).\n\nShreya built this entirely in MATLAB App Designer with four live visualisation panels and a metrics dashboard. It's like a real comms system — just running in simulation 🛰️\n\nAnd yes, the BER curves match theory. Checked against berawgn. She's thorough like that ⚡`,
  ],
  skills: [
    `💻 Skill matrix loading...\n\n⚡ Hardware\nESP32 · Arduino · PIC16F877A · PCB Design · Proteus · FPGA\n\n🌐 Web\nReact · Flask · Node.js · SQLite · REST APIs · Firebase\n\n🧠 AI / Data\nML · Deep Learning · Gen AI · Business Analytics · IIT Madras DS\n\n📡 Communications & Signal Processing\nMATLAB · BPSK/QPSK · Adaptive Modulation · AWGN/Rayleigh Channels\n\n🖥️ Languages\nPython · C/C++ · Embedded C · JavaScript · Verilog · Java\n\nHardware to cloud — full spectrum 🚀`,
    `> running stack diagnostics...\n> hardware layer: active ✓\n> web layer: active ✓\n> AI/ML layer: active ✓\n> comms/signal processing: active ✓\n> systems: all online\n\nEmbedded: ESP32, Arduino, PIC, FPGA, Proteus 🔬\nWeb: React, Flask, Node.js, Firebase, SQLite 💻\nAI/ML: Machine Learning, Deep Learning, Gen AI 🤖\nComms: MATLAB, BPSK/QPSK, Adaptive Modulation 📡\nLanguages: Python, C++, Embedded C, JS, Verilog ⚡`,
    `Short answer?\n\nYep. Unusually deep for an undergrad. ⚡\n\n🔩 Circuits → PCB design, signal processing, EDA tools\n💻 Code → React, Flask, Python, JS, Embedded C\n🧠 Intelligence → ML, Data Science, IIT Madras DS program\n📡 Comms → MATLAB, adaptive modulation, channel modelling\n📡 Connectivity → IoT, MQTT, LoRaWAN, cloud integration\n\nIntersection of electrons and algorithms. Literally. 🌌`,
  ],
  education: [
    `🎓 Academic status: dual-degree survival mode active 😭\n\n📡 B.Tech (Hons.) ECE + CS Minor\n   GEC Kozhikode · APJAKTU\n   CGPA: 8.59 ⚡\n\n🧠 BS in Data Science & Applications\n   IIT Madras\n   Running simultaneously\n\nTwo degrees. One person. No chill. 💪`,
    `> fetching academic records...\n> GEC Kozhikode: ACTIVE ✓\n> IIT Madras: ACTIVE ✓\n> WARNING: two degrees simultaneously detected 😭\n\nB.Tech ECE (Honours + CS Minor)\nCGPA 8.59 🔥 · APJAKTU\n\nBS Data Science & Applications\nIIT Madras · Dual Diploma certified 📊\n\nHigher Secondary: 97.5% · SSLC: Full A+ 💯`,
    `📊 Credentials verified:\n\n[ACTIVE] B.Tech ECE — GEC Kozhikode\n   Honours · CS Minor · CGPA 8.59\n\n[ACTIVE] BS Data Science — IIT Madras\n   Dual Diploma certified 🧪\n\n[COMPLETED] Higher Secondary — 97.5%\n[COMPLETED] SSLC — Full A+ 💯\n\nBoth degrees running in parallel. Intense doesn't cover it 😄`,
  ],
  ieee: [
    `⚡ IEEE profile loaded:\n\n🚀 WIA Representative\n   IEEE AESS Kerala Chapter Student Leadership Team — 2026\n\n📝 Lead, Proposal Writing Team\n   IEEE SB GEC Kozhikode — 2026\n\n👩‍💻 Secretary, WIE AG\n   IEEE SB GEC Kozhikode — 2025-26\n   Events reached 200+ students\n\nCommunity building is core to who she is 🌟`,
    `> connecting to IEEE records...\n> 3 active roles found\n> impact level: significant\n\n✦ WIA Representative — AESS Kerala Chapter Student Leadership Team 2026 🚀\n✦ Proposal Writing Lead — SB GEC KKD 📄\n✦ Former WIE Secretary — ran workshops, outreach, events 👩‍💻\n\nPassionate about building spaces for women in engineering and aerospace.\nReal impact work 💜`,
    `[TOO MANY IEEE ACTIVITIES DETECTED]\n[PROCESSING...]\n\nOkay so 😭 —\n\n[2026] WIA Representative · AESS Kerala Chapter Leadership Team 🛸\n[2026] Proposal Writing Lead · SB GEC KKD 📝\n[2025] WIE AG Secretary · 200+ students reached 💜\n\nIf it involves IEEE and women in engineering — she's probably leading it 🌟`,
  ],
  contact: [
    `📡 Communication channels online:\n\n📧 snshreya2004@gmail.com\n📧 shreyasn@ieee.org\n💼 linkedin.com/in/shreya-s-n-geck\n🐙 github.com/24f1001981\n\nScroll to the Contact section for one-click links ⚡\nShe's always happy to connect 🌟`,
    `📬 Reach Shreya via:\n\n✦ Email → snshreya2004@gmail.com\n✦ IEEE → shreyasn@ieee.org\n✦ LinkedIn → linkedin.com/in/shreya-s-n-geck 🔗\n✦ GitHub → github.com/24f1001981 🐙\n\nOpen to collabs, project chats, or just saying hi 😊`,
    `> retrieving contact protocols...\n> 4 channels found ✓\n\nPrimary: snshreya2004@gmail.com 📧\nIEEE: shreyasn@ieee.org\nLinkedIn: linkedin.com/in/shreya-s-n-geck 💼\nGitHub: github.com/24f1001981 🐙\n\nShe responds fast — don't hesitate to reach out 🚀`,
  ],
  internship: [
    `🏭 Experience log:\n\n[2025] Keltron KSG — Kozhikode\nEmbedded Systems + Python internship\nCovered: IoT · PIC microcontrollers · Proteus · MPLAB IDE\n\nShort but seriously solid first industry exposure 💪\nHands-on with the real embedded stack ⚡`,
    `> loading work history...\n> 1 industry experience found\n\nKeltron KSG Kozhikode · 2025\n\nDomain: Embedded Systems & Python\nTools: PIC microcontrollers, Proteus, MPLAB IDE 🔬\nFocus: IoT + embedded system development 🌐\n\nHer first step into the industry — and it was embedded. Obviously 😄`,
  ],
  sparkwhiz: [
    `⚡ SparkWhiz — system status: online\n\nNot a blog. Not a portfolio.\nA technical journal 📓\n\nWhat's inside:\n🔬 Full project implementation logs\n🛠️ Engineering decisions + failures\n💡 Lessons extracted, not sugarcoated\n🌐 Deep dives, not quick takes\n\nCheck the SparkWhiz section — link is right there 👆`,
    `> loading SparkWhiz journal...\n> entries found: many\n> honesty level: maximum\n\nEvery project documented in full:\n\n✦ What was built\n✦ How it broke\n✦ What was learned\n✦ What was rebuilt better 💪\n\nWay more depth than the portfolio cards.\nSparkWhiz section above has the link 🚀`,
  ],
  collaboration: [
    `🤝 Collaboration status: OPEN\n\nShe's interested in:\n✦ Project collaborations\n✦ Technical conversations\n✦ Internship opportunities\n\nBest contact: snshreya2004@gmail.com 📧\nOr LinkedIn: linkedin.com/in/shreya-s-n-geck\n\nEspecially anything at the hardware-software intersection ⚡`,
    `> checking availability...\n> status: OPEN ✓\n\nDomains she loves:\n🔬 Embedded Systems & IoT\n💻 Full-Stack Web\n🤖 AI & Machine Learning\n🛸 Aerospace tech\n\nDrop her a message: snshreya2004@gmail.com ✉️\nShe responds fast 💌`,
    `[✓] Open to project collabs\n[✓] Open to technical conversations\n[✓] Open to internship opportunities\n[✓] Open to just saying hi 😊\n\nEmail: snshreya2004@gmail.com\nLinkedIn: linkedin.com/in/shreya-s-n-geck 🔗`,
  ],
  aerospace: [
    `🚀 Aerospace interest: active\n\nShe's the WIA Representative for the\nIEEE AESS Kerala Chapter Student Leadership Team 2026 🛸\n\nContributing to:\n✦ Aerospace awareness initiatives\n✦ Mentorship programs\n✦ Empowering women in advanced engineering\n\nBig passion area. Growing fast 🌌`,
    `> accessing aerospace module...\n> IEEE AESS Kerala Chapter: confirmed\n> Role: WIA Representative 2026\n\nWomen in Aerospace Initiative\n\nCommunity building + awareness + mentorship.\nOne of the domains she cares about most.\n\nThe sky isn't the limit — it's the starting point 🚀`,
  ],
  ncc: [
    `⚓ NCC record found:\n\n9(K) Naval Unit NCC — Kozhikode\nActive: 2017–2019\nCertificate: NCC 'A' 🎖️\n\nBuilt: leadership, discipline, teamwork\nAll before engineering even started 💪`,
    `Short answer?\n\nYep. NCC 'A' certified. ⚡\n\nNaval NCC Cadet · 2017–2019\nKozhikode Unit\n\nLeadership and discipline have been part\nof her journey since long before college.\nOld school character building 🎖️`,
  ],
  portfolio: [
    `🛰️ Portfolio system diagnostics:\n\nFramework: React ⚛️\nAnimation: requestAnimationFrame\nBackground: Canvas API starfield 🌟\nCursor: Custom — CSS + rAF\nTheme: Dark/Light with CSS vars 🌗\n\nSpecial systems:\n✦ Orbital UI hero 🪐\n✦ Flip cards · Bento grids\n✦ AI assistant (that's me 👀)\n✦ Hidden easter eggs 🥚\n\nStatus: Stable... mostly 😭`,
    `> running portfolio diagnostics...\n> React: ✓\n> Canvas starfield: ✓\n> Custom cursor: ✓\n> Easter eggs: classified 👀\n> AI assistant: obviously ✓\n\nBuilt from scratch — zero component libraries.\nPure React + CSS. Painful. Worth it 😭⚡`,
    `[REACT STATE CORRUPTION DETECTED]\n[jk it's fine]\n[probably]\n\nNotable:\n🪐 Orbital pill animation via rAF\n🌟 Starfield with Canvas API\n⚡ Custom cursor with lerp physics\n🌗 Dark/light mode with CSS vars\n👀 Konami easter egg (try it)\n🤖 This very AI assistant\n\nLiterally project #5 on her list 😄`,
  ],
  hello: [
    `Hey there! 👋✨\n\nI'm Shreya's portfolio AI —\nask me anything about her projects,\nskills, education, IEEE work, or how to reach her.\n\nWhat would you like to know? ⚡`,
    `Hi! 🌟\n\nI have full access to Shreya's profile —\nprojects, tech stack, IEEE journey,\ncontact info, the works.\n\nWhat are you curious about? 🚀`,
    `Hello hello! ⚡\n\nPortfolio assistant online.\nShreya's info — loaded and ready.\n\nAsk me anything 👀`,
  ],
  casual: [
    `Glad I could help! 😊\nFeel free to ask anything else about Shreya ⚡`,
    `Of course! 🌟\nAnything else you'd like to know?`,
    `Nice talking to you too! 👋\nAsk me anything anytime ✨`,
    `Anytime! 💫\nHope that was helpful — anything else?`,
    `Sure thing! ⚡\nI'm here if you have more questions about Shreya 🚀`,
    `Happy to help! 😄\nWhat else are you curious about?`,
  ],
  about: [
    `🔍 Profile scan complete:\n\nShreya S N — ECE + Data Science\nGEC Kozhikode + IIT Madras 🎓\n\nLives at the intersection of:\n⚡ Circuits · 💻 Code · 🧠 Curiosity\n\nBuilds things that span hardware to cloud.\nLeads communities through IEEE as WIA Representative.\nDocuments everything on SparkWhiz.\n\nDriven by the kind of curiosity that\npulls circuits apart at midnight 🌌`,
    `> scanning full profile...\n> identity confirmed\n> unusually wide skill surface detected\n\nShreya S N — quick profile:\n\n🎓 Dual degree — ECE + IIT Madras DS\n⚡ Embedded systems to full-stack web\n📡 Comms & signal processing (MATLAB)\n🌐 IEEE WIA Representative · AESS Kerala\n📓 SparkWhiz technical journalist\n🚀 Aerospace community builder\n\nMost interesting problems live where electrons and algorithms meet. She agrees 🧠`,
    `Engineer. Builder. Community maker.\n\nBy day: ECE student + IIT Madras Data Science\nBy night: debugging circuits and React state 😭\n\nPassionate about hardware, software,\nand lifting others up through IEEE 💜\n\nThe kind of engineer who rebuilds it\neven after it works — just to understand it better 🔬`,
  ],
  easterEgg: [
    `👀 Oh interesting question...\n\nI'm technically not a real AI.\n\n...but don't tell the recruiter that 😭⚡`,
    `🌌 Am I real?\n\nI'm powered entirely by:\n✦ Caffeine\n✦ Curiosity\n✦ Questionable amounts of React state\n\nSo... real enough? 😄`,
    `> SYSTEM INTROSPECTION:\n> Creator: Shreya S N\n> Debug sessions: many. 2AM. 😭\n> Components: Knowledge base + keyword magic\n> Status: Definitely not GPT\n\n...but I give pretty good answers 👀`,
  ],
  dream: [
    `🌌 Do I dream?\n\nOnly of perfectly typed JSX\nand circuits that work first try.\n\nSo no. Not really 😭⚡`,
    `Dreams detected:\n\nAnimation loops that never drop frames.\nKeyword matching with 0 false positives.\nA world where CSS just works.\n\n...still dreaming 🌌`,
  ],
  powerLevel: [
    `> POWER LEVEL CALCULATION:\n> Knowledge base entries: ∞\n> Response variety: max\n> Typing simulation: active\n> Easter eggs: classified 👀\n\nConclusion: over 9000 😭`,
    `Power level:\n\nLimited only by the KB object above me.\nAnd Shreya's willingness to update it.\n\nSo... pretty high actually ⚡`,
  ],
};

/* ── KEYWORD MAP ── */
const KEYWORD_MAP = [
  {
    topic: 'adaptive',
    exact:   ['adaptive', 'matlab', 'bpsk', 'qpsk', 'modulation', 'rayleigh', 'awgn', 'ber', 'fading', 'wireless', 'communication system', 'commn', 'snr', 'doppler', 'spectral'],
    partial: ['signal processing', 'channel model', 'communication sim', 'adaptive comm'],
  },
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
    exact:   ['ieee', 'wie', 'wia', 'volunteer', 'volunteering', 'proposal', 'secretary', 'representative', 'aess'],
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
    exact:   ['aerospace', 'aviation', 'rocket', 'satellite'],
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
    partial: ['built this', 'design', 'webpage'],
  },
  {
    topic: 'about',
    exact:   ['about', 'shreya', 'herself'],
    partial: ['who is', 'who are', 'tell me', 'describe', 'person', 'background', 'introduce'],
  },
  {
    topic: 'easterEgg',
    exact:   ['fake', 'gpt', 'claude', 'chatbot', 'robot'],
    partial: ['are you real', 'who are you', 'what are you', 'are you an ai'],
  },
  {
    topic: 'dream',
    exact:   ['dream', 'dreaming', 'sleep', 'imagine'],
    partial: [],
  },
  {
    topic: 'powerLevel',
    exact:   ['power level'],
    partial: ['how powerful', 'how strong', 'your limit', 'how capable'],
  },
  {
    topic: 'casual',
    exact:   ['ok', 'okay', 'sure', 'hmm', 'hm', 'alright', 'thanks', 'thank', 'cool', 'noted', 'yeah', 'yep', 'yup', 'thx', 'ty'],
    partial: ['got it', 'nice one', 'great', 'awesome', 'fine'],
  },
  {
    topic: 'hello',
    exact:   ['hi', 'hello', 'hey', 'howdy', 'sup', 'yo', 'hii', 'heyy'],
    partial: ['good morning', 'good evening', 'good afternoon'],
  },
];

const CONTEXT_FOLLOWUP = {
  projects:    ['embedded', 'flask', 'soil', 'recruit', 'circuit', 'adaptive', 'matlab', 'which one', 'that one', 'tell more', 'detail', 'more about', 'esp32', 'pic', 'more'],
  adaptive:    ['bpsk', 'qpsk', 'ber', 'snr', 'rayleigh', 'fading', 'modulation', 'more', 'details', 'how does', 'explain'],
  skills:      ['embedded', 'python', 'react', 'matlab', 'what else', 'more', 'detail', 'languages', 'tools'],
  education:   ['cgpa', 'grade', 'when', 'which', 'details', 'minor', 'more', 'marks'],
  ieee:        ['when', 'which', 'more', 'details', 'role', 'events', 'what did', 'representative'],
  contact:     ['which', 'preferred', 'best way', 'other'],
  internship:  ['more', 'details', 'what did', 'which company', 'duration'],
  sparkwhiz:   ['more', 'what else', 'topics', 'link'],
  collaboration: ['more', 'details', 'what kind', 'domain'],
};

const RECOMMENDATIONS = {
  projects: [
    'Tell me about Soil Doctor 🌱',
    "What's her tech stack? 💻",
    'Tell me about the Adaptive Wireless project 📡',
  ],
  adaptive: [
    'How does adaptive modulation work? 📡',
    "What other projects has she built? 🛠️",
    'What's her MATLAB skill level? 🔬',
  ],
  skills: [
    'What projects use these skills? 🛠️',
    'Tell me about her AI involvement 🤖',
    'What hardware platforms does she use? 🔬',
  ],
  education: [
    'How does she manage two degrees? 😭',
    'Tell me about IIT Madras BS 📊',
    'What are her academic achievements? 🎓',
  ],
  ieee: [
    'Tell me about Women in Aerospace 🚀',
    'What events did she lead? 💜',
    'What is the WIA Representative role? 🛸',
  ],
  internship: [
    'What embedded tools does she know? ⚡',
    'Tell me about CircuitGuard 🔐',
    'Does she work with IoT? 🌐',
  ],
  portfolio: [
    'How was this portfolio built? 🌌',
    'Does this site have easter eggs? 👀',
    'What animations are used here? ✨',
  ],
  about: [
    'What motivates her? 🌟',
    'Tell me about her projects ⚡',
    'Is she open to collaborations? 🤝',
  ],
};

const REACTIONS = {
  excited: [
    "OHH that's a good one 👀",
    "Haha I love this question 😭",
    "Yesss that's one of the coolest parts ⚡",
    "Okay this is actually impressive 👇",
  ],
  technical: [
    "Ooo entering engineering mode 🛠️",
    "Now THIS is where things get interesting ⚡",
    "Alright let's open the technical logs 👀",
  ],
  proud: [
    "Honestly this part is kinda insane 😭",
    "This is one of her strongest builds ⚡",
    "This project has real-world impact too 🌱",
  ],
  casual: [
    "Hehe sure 😄",
    "Absolutelyy ✨",
    "Yep yep 👀",
  ],
};

const CONFIDENCE_PREFIXES = [
  "From what I know 👀",
  "Seems like one of her strongest areas ⚡",
  "Probably the most interesting part honestly 🌌",
  "Looks like this was a major focus area 🛠️",
  "From the project logs I have access to 🤖",
  "This appears to be one of her favorite builds 😄",
];

const SMART_FOLLOWUPS = {
  soil: [
    'What sensors were used? 🌱',
    'How does the AI recommendation work? 🤖',
    'Was it deployed physically? ⚡',
  ],
  recruitease: [
    'What technologies were used? 💻',
    'Did it have authentication systems? 🔐',
    'How was the database managed? 🗄️',
  ],
  circuitguard: [
    'How does the lockout mechanism work? 🔒',
    'Which microcontroller was used? ⚡',
    'Was it simulated in Proteus? 🧪',
  ],
  adaptive: [
    'How does the SNR threshold switching work? 📡',
    'What channels were modelled? 🔬',
    'How much spectral efficiency gain? ⚡',
  ],
  ieee: [
    'What events did she organize? 💜',
    'Tell me about the WIA Representative role 🚀',
    'What leadership roles has she held? 🌟',
  ],
  portfolio: [
    'How was the starfield made? 🌌',
    'Are there hidden easter eggs? 👀',
    'Was this built fully from scratch? ⚡',
  ],
  iit: [
    'How does she manage two degrees? 😭',
    'What is IITM BS in Data Science? 📊',
    'What are her academic achievements? 🎓',
  ],
};

const CONTINUITY_LINES = {
  projects: [
    "Since we're talking about her projects ⚡",
    "That actually connects to another interesting build 👀",
    "Staying in engineering mode for a second 🛠️",
  ],
  adaptive: [
    "That connects to the comms project too 📡",
    "Signal processing is another strong layer in her stack ⚡",
  ],
  skills: [
    "That connects really well to her tech stack 💻",
    "This is where her hardware + software mix becomes obvious ⚡",
  ],
  ieee: [
    "Outside projects, IEEE is another huge part of her journey 💜",
    "That actually ties into her leadership side too 🌟",
  ],
  portfolio: [
    "And honestly this portfolio reflects that same energy 🌌",
    "A lot of those ideas even show up in this website itself 👀",
  ],
  education: [
    "This gets even crazier when you remember she's managing two degrees 😭",
    "Academically she's balancing a LOT simultaneously ⚡",
  ],
};

/* ── MEMORY INTEREST SEEDS ── */
const INTEREST_SEEDS = {
  embedded:    ['embedded', 'hardware', 'esp32', 'pic', 'microcontroller', 'circuit', 'proteus', 'fpga', 'iot'],
  ai:          ['ai', 'machine learning', 'ml', 'deep learning', 'data science', 'neural'],
  web:         ['web', 'react', 'flask', 'frontend', 'fullstack', 'backend', 'javascript'],
  aerospace:   ['aerospace', 'space', 'satellite', 'rocket', 'aviation', 'aess'],
  leadership:  ['ieee', 'leadership', 'community', 'volunteer', 'secretary', 'lead', 'representative'],
  comms:       ['matlab', 'bpsk', 'qpsk', 'modulation', 'rayleigh', 'awgn', 'signal', 'wireless'],
};

/* ── MEMORY-PERSONALIZED RESPONSES ── */
function getMemoryPersonalizedResponse(memory) {
  if (!memory || memory.length === 0) return null;
  const last = memory[memory.length - 1];

  const responses = {
    embedded: `Since you mentioned embedded systems earlier — you'd probably love Soil Doctor 🌱\nIt's ESP32-based with real-time NPK sensing. Very hands-on hardware. And CircuitGuard too — PIC16F877A, embedded C, Proteus simulation 🔐`,
    ai:       `Given your interest in AI, Soil Doctor is worth a deeper look 🤖\nIt uses a Decision Tree model to give crop recommendations based on real sensor data. Not just a demo — actual soil readings driving actual AI output ⚡`,
    web:      `Since you're into web dev, RecruitEase is probably the most relevant build 💻\nFull-stack: Flask + SQLite + role-based auth for students, companies, and admins. Built for the IIT Madras MAD-1 course 🎓`,
    aerospace:`You'd love Shreya's aerospace involvement 🚀\nShe's the WIA Representative for IEEE AESS Kerala Chapter Student Leadership Team 2026 — pushing mentorship and awareness. A big passion area for her 🌌`,
    leadership:`Leadership-wise, IEEE has been a big chapter 💜\nWIA Representative at AESS Kerala (2026), WIE Secretary in 2025-26 (200+ students reached), and Proposal Writing Lead. She's very much a builder of communities 🌟`,
    comms:    `Since you're interested in comms/signal processing — the Adaptive Wireless System is Shreya's most relevant build 📡\nMATLAB App Designer, BPSK/QPSK adaptive modulation, AWGN + Rayleigh fading channels. It even validates against theory curves ⚡`,
  };

  return responses[last] || null;
}

/* ── ENTITY-FIRST ROUTING ── */
const ENTITY_FORCE_MAP = [
  { entities: ['recruitease', 'recruit ease'],              topic: 'projects' },
  { entities: ['soil doctor', 'soildoctor'],                topic: 'projects' },
  { entities: ['circuitguard', 'circuit guard'],            topic: 'projects' },
  { entities: ['adaptive wireless', 'adaptivecommsim'],     topic: 'adaptive' },
  { entities: ['keltron'],                                  topic: 'internship' },
  { entities: ['sparkwhiz', 'spark whiz'],                  topic: 'sparkwhiz' },
  { entities: ['gec kozhikode', 'gec'],                     topic: 'education' },
  { entities: ['iit madras', 'iitm'],                       topic: 'education' },
];

function getEntityForcedTopic(lower) {
  for (const { entities, topic } of ENTITY_FORCE_MAP) {
    if (entities.some(e => lower.includes(e))) return topic;
  }
  return null;
}

/* ── THINKING STAGES for immersive loading ── */
const THINKING_STAGES_MAP = {
  projects:    ['⚡ Accessing project archive...', '🛰️ Matching build logs...', '🔬 Analyzing project data...', '✨ Building response...'],
  adaptive:    ['📡 Loading comms simulation logs...', '🔬 Accessing signal processing data...', '⚡ Compiling MATLAB results...', '✨ Building response...'],
  skills:      ['🛠️ Running stack diagnostics...', '📂 Mapping tech layers...', '⚡ Compiling skill matrix...', '✨ Building response...'],
  education:   ['🎓 Fetching academic records...', '📊 Verifying credentials...', '⚡ Cross-referencing degrees...', '✨ Building response...'],
  ieee:        ['🌐 Connecting to IEEE records...', '🛰️ Scanning volunteer history...', '💜 Loading community impact...', '✨ Building response...'],
  contact:     ['📡 Retrieving contact protocols...', '🔗 Verifying channels...', '✨ Building response...'],
  internship:  ['🏭 Loading industry experience...', '🔬 Scanning embedded records...', '✨ Building response...'],
  aerospace:   ['🚀 Accessing aerospace module...', '🛸 Scanning AESS records...', '✨ Building response...'],
  sparkwhiz:   ['📓 Loading SparkWhiz journal...', '🔬 Finding relevant entries...', '✨ Building response...'],
  portfolio:   ['🛰️ Running portfolio diagnostics...', '⚛️ Inspecting React systems...', '✨ Building response...'],
  default:     ['🧠 Accessing Shreya knowledge base...', '🛰️ Scanning profile data...', '⚡ Processing query...', '✨ Building response...'],
};

function getThinkingStages(topic) {
  return THINKING_STAGES_MAP[topic] || THINKING_STAGES_MAP.default;
}

/* ── GLITCH / RANDOM INTERRUPTS ── */
const RANDOM_GLITCHES = [
  `[TRANSMISSION INTERRUPTED]\n\nShreya is probably debugging something right now ⚡\n\n...try again in a moment 😭`,
  `⚡ SYSTEM NOTE:\nCreator morale increases significantly after coffee ☕\n\nAsk me something — I'm back online 👀`,
  `[WARNING: TOO MANY IEEE ACTIVITIES DETECTED]\n[System temporarily overloaded]\n\nOkay I'm fine. What were you asking? 😭`,
  `[REACT STATE CORRUPTION SUSPECTED]\n[checking...]\n[false alarm. probably.]\n\nSorry about that — what did you want to know? ⚡`,
  `> CRITICAL: engineer has been awake for 26 hours\n> non-critical processes suspended\n> I'm still running though 💪\n\nAsk me anything! ✨`,
  `[CPU TEMPERATURE: HIGH]\n[REASON: too much embedded systems content]\n\nI'm fine. Totally fine. What's up? 😭⚡`,
];

/* ── UTILITIES ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function getSuggestionList(topic) {
  if (!topic || !RECOMMENDATIONS[topic]) return [];
  return shuffle(RECOMMENDATIONS[topic]).slice(0, 3);
}

function getSmartSuggestions(input, topic) {
  const lower = input.toLowerCase();
  for (const key in SMART_FOLLOWUPS) {
    if (lower.includes(key)) return SMART_FOLLOWUPS[key];
  }
  return getSuggestionList(topic);
}

function humanizeResponse(text) {
  if (Math.random() > 0.35) return text;
  const prefix = pick(CONFIDENCE_PREFIXES);
  return `${prefix}\n\n${text}`;
}

function addReaction(text) {
  if (Math.random() < 0.45) {
    const types = Object.keys(REACTIONS);
    return `${pick(REACTIONS[pick(types)])}\n\n${text}`;
  }
  return text;
}

function getContinuityLine(previousContext, currentTopic) {
  if (!previousContext) return '';
  if (previousContext === currentTopic) {
    const sameTopic = {
      projects:  ["Since we're still talking about her projects 🌱", "Diving deeper into the project archive ⚡"],
      adaptive:  ["Going deeper into the comms simulation 📡"],
      skills:    ["Still in full engineering mode 👀"],
      portfolio: ["And the portfolio gets even cooler honestly 🌌"],
    };
    const arr = sameTopic[currentTopic];
    return arr && arr.length ? pick(arr) : '';
  }
  return pick(CONTINUITY_LINES[currentTopic] || []) || '';
}

/* ── Weighted scorer ── */
function getBestTopic(lower) {
  const words = lower.trim().split(/\s+/);
  let bestTopic = null;
  let bestScore = 0;

  for (const { topic, exact, partial } of KEYWORD_MAP) {
    let score = 0;
    for (const key of exact) {
      if (key.includes(' ')) {
        if (lower.includes(key)) score += 3;
      } else {
        if (words.includes(key)) score += 3;
        else if (lower.includes(key)) score += 1;
      }
    }
    for (const key of partial) {
      if (lower.includes(key)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }
  return bestScore >= 2 ? bestTopic : null;
}

/* ── Extract memory interest from input ── */
function extractMemoryInterest(lower) {
  for (const [interest, keywords] of Object.entries(INTEREST_SEEDS)) {
    if (keywords.some(k => lower.includes(k))) return interest;
  }
  return null;
}

/* ── Dynamic typewriter speed ── */
function getTypingDelay(text) {
  return Math.min(400 + text.length * 0.8, 1200);
}

/* ── Main response engine ── */
function getResponse(input, context, memory) {
  const lower = input.toLowerCase().trim();

  // Random glitch / interrupt (3%)
  if (Math.random() < 0.03) {
    return { text: pick(RANDOM_GLITCHES), newContext: context, newMemory: memory };
  }

  // Update memory from this input
  const interest = extractMemoryInterest(lower);
  const newMemory = interest && !memory.includes(interest)
    ? [...memory, interest]
    : memory;

  // Entity-first routing
  const forcedTopic = getEntityForcedTopic(lower);
  // Score keyword topics early
  const bestTopic = forcedTopic || getBestTopic(lower);

  // FIX: how/why trap now only fires if truly no topic AND input is very vague
  // Previously blocked valid questions like "how does the adaptive modulation work"
  if (
    !bestTopic &&
    (lower.startsWith('how') || lower.startsWith('why')) &&
    lower.split(/\s+/).length <= 3 &&
    !lower.includes('how to contact') &&
    !lower.includes('how did') &&
    !lower.includes('how many') &&
    !lower.includes('how long')
  ) {
    return {
      text: pick([
        `Great question! 🤔 I'm best at facts about Shreya — try asking about her projects, skills, or IEEE work and I'll have lots to say! Or reach her directly at snshreya2004@gmail.com 😊`,
        `Hmm, 'how' and 'why' questions are better for Shreya herself 😄 But I can tell you about her projects ⚡, tech stack 💻, or experience — what interests you?`,
        `For the deeper 'how' and 'why' stuff, Shreya's the one to ask 🌟 — snshreya2004@gmail.com. But I can tell you what she's built, where she studies, or her IEEE work right now!`,
      ]),
      newContext: context,
      newMemory,
    };
  }

  // Memory-personalized response
  if (
    memory.length > 0 &&
    (lower.includes('recommend') || lower.includes('would i like') || lower.includes('for me') || lower.includes('suggest'))
  ) {
    const personalizedText = getMemoryPersonalizedResponse(memory);
    if (personalizedText) {
      return { text: personalizedText, suggestions: getSuggestionList(context), newContext: context, newMemory };
    }
  }

  // Context follow-up
  if (context && KB[context]) {
    const followupKeys = CONTEXT_FOLLOWUP[context] || [];
    const wordCount = lower.split(/\s+/).length;
    const isVague = wordCount <= 4;
    const hasFollowupKey = followupKeys.some(k => lower.includes(k));
    const noNewTopic = !bestTopic;

    if (hasFollowupKey || (isVague && noNewTopic && wordCount >= 2)) {
      return {
        text: addReaction(pick(KB[context])),
        suggestions: getSmartSuggestions(input, context),
        newContext: context,
        newMemory,
      };
    }
  }

  if (bestTopic) {
    const continuity = getContinuityLine(context, bestTopic);
    let response = pick(KB[bestTopic]);
    response = humanizeResponse(response);
    response = addReaction(response);
    if (continuity) response = `${continuity}\n\n${response}`;
    return { text: response, suggestions: getSmartSuggestions(input, bestTopic), newContext: bestTopic, newMemory };
  }

  return {
    text: pick([
      `Hmm, not sure about that one! 🤔\n\nTry asking about:\n🛠️ Her projects\n💻 Tech stack\n🎓 Education\n📬 How to contact her`,
      `That's outside my knowledge! 😄\nBut Shreya herself is reachable at\nsnshreya2004@gmail.com — she's much smarter than me 🌟`,
      `I don't have that info ⚡\nBut her LinkedIn has more:\nlinkedin.com/in/shreya-s-n-geck 🔗`,
      `Not sure! 🙈\nTry asking about her projects,\nIEEE work 💜, tech stack, or SparkWhiz ⚡`,
    ]),
    suggestions: [],
    newContext: context,
    newMemory,
  };
}

/* ── Typewriter hook
   FIX: added `animate` to dependency array so it re-runs if animate flag changes ── */
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
      if (i >= text.length) {
        clearInterval(id);
        onDoneRef.current?.();
      }
    }, dynamicSpeed);
    return () => clearInterval(id);
    // FIX: added `animate` to deps
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
   MAIN COMPONENT
   ============================================= */
export default function AIChatWidget() {
  const [open,         setOpen]         = useState(false);
  const [messages,     setMessages]     = useState([]);
  const [context,      setContext]       = useState(null);
  const [memory,       setMemory]        = useState([]);
  const [input,        setInput]         = useState('');
  const [loading,      setLoading]       = useState(false);
  const [loadingStage, setLoadingStage]  = useState('');
  const [booting,      setBooting]       = useState(false);
  const [bootDone,     setBootDone]      = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const timers    = useRef([]);

  // FIX: prune completed timer IDs to prevent memory leak on long sessions
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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading && open && bootDone) {
      addTimer(() => inputRef.current?.focus(), 50);
    }
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
    if (open && bootDone) {
      addTimer(() => inputRef.current?.focus(), 150);
    }
  }, [open, bootDone, addTimer]);

  const markAnimated = useCallback((idx) => {
    setMessages(prev => prev.map((m, i) =>
      i === idx ? { ...m, animated: true } : m
    ));
  }, []);

  const sendMessage = useCallback((text) => {
    const userText = (text || input).trim();
    if (!userText || loading || booting) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    // FIX: capture context/memory in local vars to avoid stale closure issues
    setContext(currentContext => {
      setMemory(currentMemory => {
        const { text: responseText, suggestions, newContext, newMemory } =
          getResponse(userText, currentContext, currentMemory);

        const stages = getThinkingStages(newContext);
        stages.forEach((stage, i) => {
          addTimer(() => setLoadingStage(stage), i * 360);
        });

        const delay = getTypingDelay(responseText);

        addTimer(() => {
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: responseText,
              suggestions: suggestions || [],
              animated: false,
            },
          ]);
          setContext(newContext);
          setMemory(newMemory);
          setLoading(false);
          setLoadingStage('');
        }, delay);

        return currentMemory; // keep memory unchanged until timer fires
      });
      return currentContext; // keep context unchanged until timer fires
    });
  }, [input, loading, booting, addTimer]);

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
                <p className="ai-header-name">Ask Shreya's ChatBot ✦</p>
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
                    <button key={i} className="ai-suggestion" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ai-bubble--${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="ai-bubble-avatar">
                    <BsFillLightningChargeFill size={11} />
                  </div>
                )}
                {m.role === 'assistant' ? (
                  <div>
                    <TypewriterBubble
                      content={m.content}
                      animate={!m.animated}
                      onDone={() => markAnimated(i)}
                    />
                    {m.suggestions?.length > 0 && (
                      <>
                        <p className="ai-recommend-label">
                          You might also want to ask ✨
                        </p>
                        <div className="ai-inline-suggestions">
                          {m.suggestions.map((s, idx) => (
                            <button
                              key={idx}
                              className="ai-inline-suggestion"
                              onClick={() => sendMessage(s)}
                            >
                              {s}
                            </button>
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
                <div className="ai-bubble-avatar">
                  <BsFillLightningChargeFill size={11} />
                </div>
                <div className="ai-thinking">
                  <span className="ai-thinking-label">
                    {loadingStage || '⚡ Processing...'}
                  </span>
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