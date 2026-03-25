import { useState, useRef, useEffect, useCallback } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// ── Design tokens (dark) ──
const DARK = { bg: "#0C0D11", surface: "rgba(255,255,255,0.04)", glass: "rgba(255,255,255,0.06)", glassBorder: "rgba(255,255,255,0.08)", blue: "#4B7BF5", blueGlow: "rgba(75,123,245,0.25)", white: "#FFFFFF", text: "rgba(255,255,255,0.88)", textSec: "rgba(255,255,255,0.45)", textMuted: "rgba(255,255,255,0.3)", redSoft: "rgba(239,68,68,0.7)", greenSoft: "rgba(74,222,128,0.7)", navBg: "rgba(12,13,17,0.85)" };
const LIGHT = { bg: "#F5F6F8", surface: "rgba(0,0,0,0.03)", glass: "rgba(255,255,255,0.85)", glassBorder: "rgba(0,0,0,0.08)", blue: "#4B7BF5", blueGlow: "rgba(75,123,245,0.2)", white: "#1A1B1E", text: "rgba(0,0,0,0.85)", textSec: "rgba(0,0,0,0.5)", textMuted: "rgba(0,0,0,0.3)", redSoft: "rgba(220,38,38,0.75)", greenSoft: "rgba(22,163,74,0.8)", navBg: "rgba(255,255,255,0.9)" };
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ── Collaboration mock data ──
const collaborators = [
  { id: "c1", name: "Max G.", initials: "MG", avatar: "#4B7BF5", cursor: { x: 420, y: 310 }, online: true },
  { id: "c2", name: "Sarah C.", initials: "SC", avatar: "#8B5CF6", cursor: { x: 680, y: 185 }, online: true },
  { id: "c3", name: "Thomas W.", initials: "TW", avatar: "#059669", cursor: { x: 320, y: 440 }, online: false },
];

const mockComments = [
  { id: "cm1", slide: 1, author: "Sarah C.", avatar: "#8B5CF6", initials: "SC", text: "Love the opening — can we make the ask more specific?", time: "2 min ago", resolved: false },
  { id: "cm2", slide: 3, author: "Thomas W.", avatar: "#059669", initials: "TW", text: "These numbers need sourcing. Can you add footnotes?", time: "15 min ago", resolved: false },
];

const mockInsights = [
  { id: "i1", icon: "📊", title: "Engagement Spike", description: "Slide 3 has 45% higher interaction", value: "+12%", trend: "up" },
  { id: "i2", icon: "⏱️", title: "Time on Slide 2", description: "Average of 8.3 seconds (vs 4.2s avg)", value: "2.0x", trend: "up" },
  { id: "i3", icon: "💬", title: "Comments", description: "2 active threads, both on core arguments", value: "2", trend: "neutral" },
];

const chartDataEngagement = [
  { time: "0:00", engagement: 0 },
  { time: "0:15", engagement: 25 },
  { time: "0:30", engagement: 45 },
  { time: "0:45", engagement: 60 },
  { time: "1:00", engagement: 55 },
  { time: "1:15", engagement: 70 },
  { time: "1:30", engagement: 85 },
];

const chartDataHeatmap = [
  { name: "Slide 1", views: 100, avgTime: 3.2 },
  { name: "Slide 2", views: 94, avgTime: 8.3 },
  { name: "Slide 3", views: 88, avgTime: 6.1 },
  { name: "Slide 4", views: 76, avgTime: 4.5 },
  { name: "Slide 5", views: 65, avgTime: 3.8 },
];

// ── Main Component ──
export default function BriefrApp() {
  const [isDark, setIsDark] = useState(true);
  const [activeSlide, setActiveSlide] = useState(1);
  const [showCollaborators, setShowCollaborators] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const containerRef = useRef(null);

  const theme = isDark ? DARK : LIGHT;

  // Animate slide transition
  const goToSlide = useCallback((slideNum) => {
    setActiveSlide(slideNum);
  }, []);

  const getSlideTitle = (num) => {
    const titles = [
      "Briefr - Share smarter",
      "The Problem",
      "Market Opportunity",
      "Our Solution",
      "Competitive Edge",
    ];
    return titles[num - 1] || "Slide " + num;
  };

  const getSlideContent = (num) => {
    const content = {
      1: {
        subtitle: "Real-time collaboration for compelling presentations",
        points: [
          "Sync insights across your team instantly",
          "See what resonates in live demos",
          "Iterate with confidence from any device",
        ],
        cta: "Watch a live demo",
      },
      2: {
        subtitle: "Teams waste time on misaligned pitches",
        points: [
          "50% of pitches miss the mark on key talking points",
          "Feedback loops take hours, not seconds",
          "Remote teams struggle with real-time alignment",
        ],
        cta: "See the research",
      },
      3: {
        subtitle: "$2.3B TAM in sales & investor relations",
        points: [
          "14M+ professionals giving pitches monthly",
          "Avg spend of $500/mo on presentation tools",
          "Growing 23% YoY in adoption of collab tools",
        ],
        cta: "Explore TAM details",
      },
      4: {
        subtitle: "Live viewer insights + real-time collaboration",
        points: [
          "See engagement heatmaps as you present",
          "Instant team annotations and reactions",
          "One-click presenter notes and speaker prompts",
        ],
        cta: "Try the beta",
      },
      5: {
        subtitle: "Why we win",
        points: [
          "Only platform with live collab + analytics",
          "API integrations with Figma, Slack, Linear",
          "Freemium to enterprise with zero churn",
        ],
        cta: "Learn more",
      },
    };
    return content[num];
  };

  const slide = getSlideContent(activeSlide);

  return (
    <div
      ref={containerRef}
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: FONT,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s ease",
      }}
    >
      {/* ── Top Navigation ── */}
      <div
        style={{
          background: theme.navBg,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.glassBorder}`,
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "-0.5px" }}>Briefr</div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => setShowInsights(!showInsights)}
            style={{
              background: showInsights ? theme.blue : "transparent",
              border: `1px solid ${theme.glassBorder}`,
              color: theme.text,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            {showInsights ? "📊 Insights" : "📊"}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              background: showComments ? theme.blue : "transparent",
              border: `1px solid ${theme.glassBorder}`,
              color: theme.text,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            {showComments ? "💬 Comments" : "💬"}
          </button>
          <button
            onClick={() => setShowCollaborators(!showCollaborators)}
            style={{
              background: showCollaborators ? theme.blue : "transparent",
              border: `1px solid ${theme.glassBorder}`,
              color: theme.text,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            {showCollaborators ? "👥 Team" : "👥"}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: "transparent",
              border: `1px solid ${theme.glassBorder}`,
              color: theme.text,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", gap: "0", position: "relative" }}>
        {/* ── Slide Viewer (Center) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            position: "relative",
          }}
        >
          {/* Slide Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px 40px",
              position: "relative",
              background: `linear-gradient(135deg, ${theme.surface} 0%, ${theme.glass} 100%)`,
            }}
          >
            {/* Animated Slide Background */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5,
                pointerEvents: "none",
                background: `radial-gradient(circle at ${60 + activeSlide * 5}% ${40 + activeSlide * 3}%, ${theme.blueGlow} 0%, transparent 70%)`,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
                maxWidth: "700px",
              }}
            >
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  letterSpacing: "-1.2px",
                  background: `linear-gradient(135deg, ${theme.blue} 0%, ${theme.text} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {getSlideTitle(activeSlide)}
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: theme.textSec,
                  marginBottom: "32px",
                  lineHeight: "1.6",
                }}
              >
                {slide.subtitle}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginBottom: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {slide.points.map((point, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "14px",
                      color: theme.textSec,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        color: theme.blue,
                        fontWeight: "600",
                        marginRight: "4px",
                      }}
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => alert(`"${slide.cta}" clicked on slide ${activeSlide}`)}
                style={{
                  background: theme.blue,
                  color: theme.white,
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                {slide.cta}
              </button>
            </div>
          </div>

          {/* Slide Navigation */}
          <div
            style={{
              background: theme.navBg,
              borderTop: `1px solid ${theme.glassBorder}`,
              padding: "16px 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => goToSlide(num)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.glassBorder}`,
                  background: activeSlide === num ? theme.blue : "transparent",
                  color: theme.text,
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Sidebar (Team, Comments, Insights) ── */}
        {(showCollaborators || showComments || showInsights) && (
          <div
            style={{
              width: "320px",
              borderLeft: `1px solid ${theme.glassBorder}`,
              background: theme.surface,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Collaborators Section */}
            {showCollaborators && (
              <div style={{ padding: "16px", borderBottom: `1px solid ${theme.glassBorder}` }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: theme.textMuted, marginBottom: "12px" }}>TEAM PRESENCE</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {collaborators.map((collab) => (
                    <div
                      key={collab.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px",
                        borderRadius: "6px",
                        background: theme.glass,
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: collab.avatar,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.white,
                          fontSize: "10px",
                          fontWeight: "600",
                          position: "relative",
                        }}
                      >
                        {collab.initials}
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: collab.online ? theme.greenSoft : theme.textMuted,
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            border: `1px solid ${theme.bg}`,
                          }}
                        />
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "500" }}>{collab.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            {showComments && (
              <div style={{ padding: "16px", borderBottom: `1px solid ${theme.glassBorder}` }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: theme.textMuted, marginBottom: "12px" }}>COMMENTS ({mockComments.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {mockComments.map((comment) => (
                    <div
                      key={comment.id}
                      style={{
                        padding: "8px",
                        background: theme.glass,
                        borderRadius: "6px",
                        borderLeft: `2px solid ${comment.resolved ? theme.greenSoft : theme.blue}`,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div style={{ fontSize: "12px", fontWeight: "600" }}>{comment.author}</div>
                        <div style={{ fontSize: "10px", color: theme.textMuted }}>Slide {comment.slide}</div>
                      </div>
                      <p style={{ fontSize: "12px", color: theme.textSec, lineHeight: "1.4", margin: 0, marginBottom: "4px" }}>{comment.text}</p>
                      <div style={{ fontSize: "10px", color: theme.textMuted }}>{comment.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Section */}
            {showInsights && (
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: theme.textMuted, marginBottom: "12px" }}>INSIGHTS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {mockInsights.map((insight) => (
                    <div
                      key={insight.id}
                      style={{
                        padding: "12px",
                        background: theme.glass,
                        borderRadius: "6px",
                        borderLeft: `2px solid ${insight.trend === "up" ? theme.greenSoft : insight.trend === "down" ? theme.redSoft : theme.textMuted}`,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>{insight.icon}</div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: insight.trend === "up" ? theme.greenSoft : insight.trend === "down" ? theme.redSoft : theme.text }}>{insight.value}</div>
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "2px" }}>{insight.title}</div>
                      <p style={{ fontSize: "11px", color: theme.textSec, margin: 0 }}>{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Collaborator Cursors (Overlay) ── */}
        {showCollaborators &&
          collaborators.map((collab) => (
            <div
              key={collab.id + "-cursor"}
              style={{
                position: "absolute",
                left: collab.cursor.x,
                top: collab.cursor.y,
                width: "32px",
                height: "32px",
                pointerEvents: "none",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: collab.avatar,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.white,
                  fontSize: "10px",
                  fontWeight: "600",
                  border: `2px solid ${theme.bg}`,
                  boxShadow: `0 0 12px ${collab.avatar}`,
                }}
              >
                {collab.initials}
              </div>
              <div style={{ fontSize: "10px", fontWeight: "600", marginTop: "2px", whiteSpace: "nowrap" }}>{collab.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
