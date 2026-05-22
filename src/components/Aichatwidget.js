import React, { useState, useRef, useEffect } from 'react';
import './Aichatwidget.css';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { IoClose, IoSend } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

/* =============================================
   KNOWLEDGE BASE — Shreya's full context
   3 varied responses per topic + emojis
   ============================================= */
const KB = {
  projects: [
    "Shreya has built some seriously cool stuff! 🛠️ Soil Doctor (ESP32 soil health analyzer with NPK sensing 🌱), RecruitEase (Flask placement portal for IITM 💼), and CircuitGuard (PIC16F877A password lock 🔐). Click any project card above for the full deep dive!",
    "Her projects span hardware to web 🌐 — Soil Doctor uses RS485 + Decision Tree AI for crop recommendations 🌾, RecruitEase is a full role-based placement portal, and CircuitGuard is a Proteus-simulated security system. Pretty diverse stack honestly!",
    "Three standout builds ⚡ — Soil Doctor (IoT + embedded 🔬), RecruitEase (full-stack Flask app 🧑‍💻), CircuitGuard (Embedded C + microcontroller 🔒). Oh and this portfolio itself is project #4! Scroll up to explore the cards 👆",
  ],
  skills: [
    "Shreya's stack is wild for an undergrad 🤯 — ESP32, PIC microcontrollers, React, Flask, Python, MQTT, SQL, and deep into ML/Data Science through IIT Madras. Hardware to cloud, literally 🚀",
    "Tech stack 💻 — Embedded Systems (ESP32, Arduino, PIC16F877A), Web Dev (React, Flask, Node.js), AI/ML 🤖, and IoT. She codes in Python, C/C++, Embedded C, JavaScript, and Verilog. Full-spectrum engineer!",
    "Her skills live at the crossroads of circuits ⚡ and code 💻 — PCB design, microcontroller programming, full-stack web apps, and machine learning 🧠. Hit the Skills section above for the full breakdown!",
  ],
  education: [
    "Shreya is running TWO degrees simultaneously 🎓 — B.Tech (Hons.) ECE with CS minor at GEC Kozhikode (CGPA 8.59 ✨), and BS in Data Science from IIT Madras. Two degrees at once, no big deal 😄",
    "She's at GEC Kozhikode for Electronics & Communication Engineering 📡 (Honours + CS minor), and IIT Madras for Data Science & Applications 📊. Both at the same time — intense doesn't cover it!",
    "GEC Kozhikode B.Tech ECE (8.59 CGPA 🔥) + IIT Madras BS in Data Science 🧪. Also scored 97.5% in higher secondary and full A+ in SSLC 💯. Consistently crushing it throughout!",
  ],
  ieee: [
    "Shreya is super active in IEEE! ⚡ She's part of Women in Aerospace at IEEE AESS Kerala Section 🚀, leads the Proposal Writing Team at IEEE SB GEC Kozhikode 📝, and was WIE Secretary — ran events reaching 200+ students 👩‍💻",
    "IEEE journey 🛤️ — Secretary of WIE AG (2025-26), now Proposal Writing Lead and Women in Aerospace member at IEEE AESS Kerala Section. Community building is a core part of who she is 🌟",
    "Big IEEE presence 💜 — Women in Aerospace (AESS Kerala 🚀), Proposal Writing Lead 📄, former WIE Secretary. She's passionate about building spaces for women in engineering and aerospace — real impact work!",
  ],
  contact: [
    "Reach Shreya at snshreya2004@gmail.com 📧 or shreyasn@ieee.org — or slide into her LinkedIn 💼 at linkedin.com/in/shreya-s-n-geck. She's always happy to connect!",
    "Best channels 📬 — Email (snshreya2004@gmail.com), LinkedIn (linkedin.com/in/shreya-s-n-geck 🔗), or GitHub (github.com/24f1001981 🐙). Scroll to the Contact section for one-click links!",
    "Drop her an email at snshreya2004@gmail.com ✉️ or find her on LinkedIn — she's open to collabs, project chats, and honestly just saying hi too 😊🌟",
  ],
  internship: [
    "She interned at Keltron KSG Kozhikode 🏭 in Embedded Systems and Python — hands-on with IoT, PIC microcontrollers, Proteus, and MPLAB IDE. Short but seriously solid exposure 💪",
    "Keltron KSG internship in 2025 🔧 — Embedded Systems + Python, covering IoT, PIC microcontroller programming, and embedded system development. Her first industry embedded experience!",
  ],
  sparkwhiz: [
    "SparkWhiz ⚡ is Shreya's personal technical journal — deep dives into project builds, implementation processes, challenges faced, and engineering learnings. Not quick takes — full breakdowns. Check the SparkWhiz section above!",
    "Think of it as her engineering blog 📓 — detailed writeups on every project, the failures, the fixes, the learnings. Way more depth than the portfolio cards. Link's in the SparkWhiz section 👆",
  ],
  collaboration: [
    "Absolutely yes! 🙌 Shreya is open to project collabs, technical conversations, and internship opportunities. Best to reach out via snshreya2004@gmail.com or LinkedIn 🚀",
    "100% open to collaborations ✨ — especially anything touching embedded systems, IoT, full-stack, or AI 🤖. Drop her a message at snshreya2004@gmail.com!",
    "Definitely reach out! 💌 She loves working on interesting problems at the hardware-software intersection. Email or LinkedIn are the best channels — she responds fast!",
  ],
  aerospace: [
    "Aerospace 🚀 is one of her biggest interests — she's part of Women in Aerospace at IEEE AESS Kerala Section, actively contributing to awareness and mentorship initiatives in the domain!",
    "She's involved with IEEE AESS Kerala Section's Women in Aerospace 🛸 initiative — community building, awareness, empowering more women in advanced engineering. Big passion area for her!",
  ],
  ncc: [
    "Shreya was an NCC Cadet ⚓ at 9(K) Naval Unit NCC Kozhikode and holds the NCC 'A' Certificate — active from 2017-2019, building real leadership, discipline and teamwork 💪",
    "NCC 'A' Certificate holder 🎖️ from her Naval NCC Cadet days. Leadership and discipline have been part of her journey way before engineering!",
  ],
  portfolio: [
    "This portfolio was built entirely from scratch in React ✨ — orbital hero animation 🪐, flip cards, bento grids, dark/light mode 🌗, custom cursor, starfield canvas 🌟, the whole works. Literally project #4!",
    "Pure React + CSS 💻, zero component libraries. Orbital pill animation via requestAnimationFrame, starfield with Canvas API, every micro-interaction handcrafted 🔧. Full flex honestly 💪",
  ],
  hello: [
    "Hey there! 👋✨ I know everything about Shreya — her projects, skills, education, experience, and more. What would you like to know?",
    "Hi! 🌟 Ask me anything about Shreya — projects, tech stack, IEEE work, how to contact her, all of it!",
    "Hello hello! ⚡ I'm here to tell you all about Shreya S N. What are you curious about?",
  ],
  about: [
    "Shreya is an ECE + Data Science student 🎓 who lives at the intersection of hardware and software 🔬💻. Curious, community-driven, and always building something — from microcontrollers at midnight to full-stack web apps 🚀",
    "She's an engineer, IEEE community builder 🌐, and someone who genuinely believes the most interesting problems live where electrons and algorithms meet ⚡🧠. Also quite the builder — check out her projects!",
    "Shreya is driven by curiosity 🔍 — the kind that makes you pull apart a circuit at midnight to understand why it failed, then rebuild it better 💪. Passionate about both hardware and software, and about lifting others up through IEEE 🌟",
  ],
};

/* ── keyword → topic map ── */
const KEYWORD_MAP = [
  { keys: ['project', 'built', 'soil', 'recruit', 'circuit', 'build', 'make', 'create', 'develop'], topic: 'projects' },
  { keys: ['skill', 'stack', 'tech', 'technology', 'language', 'tool', 'know', 'framework', 'use', 'expertise'], topic: 'skills' },
  { keys: ['education', 'degree', 'college', 'university', 'iit', 'gec', 'study', 'cgpa', 'grade', 'btech', 'bs', 'data science', 'academic'], topic: 'education' },
  { keys: ['ieee', 'wie', 'wia', 'volunteer', 'leadership', 'community', 'proposal', 'secretary', 'lead'], topic: 'ieee' },
  { keys: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'hire', 'message', 'dm'], topic: 'contact' },
  { keys: ['intern', 'keltron', 'internship', 'industry', 'job'], topic: 'internship' },
  { keys: ['sparkwhiz', 'blog', 'journal', 'writeup', 'documentation', 'articles'], topic: 'sparkwhiz' },
  { keys: ['collab', 'collaboration', 'open', 'available', 'opportunity', 'work together', 'partner'], topic: 'collaboration' },
  { keys: ['aerospace', 'space', 'aviation', 'aess', 'rocket', 'satellite'], topic: 'aerospace' },
  { keys: ['ncc', 'naval', 'cadet', 'certificate', 'military'], topic: 'ncc' },
  { keys: ['portfolio', 'website', 'this site', 'this website', 'built this', 'site'], topic: 'portfolio' },
  { keys: ['who', 'about', 'tell me', 'describe', 'person', 'shreya', 'herself'], topic: 'about' },
  { keys: ['hi', 'hello', 'hey', 'howdy', 'sup', 'yo', 'hii', 'heyy', 'greet','bro'], topic: 'hello' },
];

/* ── pick random from array ── */
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/* ── smart response matcher ── */
function getResponse(input) {
  const lower = input.toLowerCase();

  // smart how/why redirect — feels conversational
  if ((lower.includes('how') || lower.includes('why')) && !lower.includes('how to contact') && !lower.includes('how did')) {
    return pick([
      "Great question! 🤔 I'm best at facts about Shreya — try asking about her projects, skills, or IEEE work and I'll have lots to say! Or reach her directly at snshreya2004@gmail.com 😊",
      "Hmm, 'how' and 'why' questions are better for Shreya herself 😄 But I can tell you about her projects ⚡, tech stack 💻, or experience — what interests you?",
      "For the deeper 'how' and 'why' stuff, Shreya's the one to ask 🌟 — snshreya2004@gmail.com. But I can tell you what she's built, where she studies, or her IEEE work right now!",
    ]);
  }

  // keyword matching
  for (const { keys, topic } of KEYWORD_MAP) {
    if (keys.some(k => lower.includes(k))) {
      return pick(KB[topic]);
    }
  }

  // smart fallbacks
  return pick([
    "Hmm, not sure about that one! 🤔 Try asking about her projects 🛠️, skills 💻, education 🎓, or how to contact her 📬",
    "That's outside my knowledge! 😄 But Shreya herself is reachable at snshreya2004@gmail.com — she's much smarter than me 🌟",
    "I don't have that info ⚡ — but her LinkedIn has more: linkedin.com/in/shreya-s-n-geck 🔗",
    "Not sure! 🙈 Try asking about her projects, IEEE work 💜, tech stack, or SparkWhiz journal ⚡",
  ]);
}

/* ── typing delay scales with response length ── */
function getTypingDelay(response) {
  return Math.min(500 + response.length * 1.8, 1800);
}

/* ── Suggested questions ── */
const SUGGESTED = [
  "What projects has she built? 🛠️",
  "What's her tech stack? 💻",
  "Tell me about her IEEE work ⚡",
  "Is she open to collaborations? 🤝",
];

/* =============================================
   COMPONENT
   ============================================= */
export default function AIChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    const response = getResponse(userText);
    const delay    = getTypingDelay(response);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
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

      {/* Chat panel */}
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
            <button
              className="ai-panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-messages">

            {/* Welcome state */}
            {messages.length === 0 && (
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
                <div className="ai-bubble-text">{m.content}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="ai-bubble ai-bubble--assistant">
                <div className="ai-bubble-avatar">
                  <BsFillLightningChargeFill size={11} />
                </div>
                <div className="ai-typing">
                  <span /><span /><span />
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
              disabled={loading}
              maxLength={300}
            />
            <button
              className="ai-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
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