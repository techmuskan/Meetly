import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import withAuth from "../utils/withAuth";
import "../App.css";

function HomeComponent() {
  const navigate = useNavigate(), { addToUserHistory, clearSession } = useContext(AuthContext);
  const [meetingCode, setMeetingCode] = useState(""), [error, setError] = useState("");
  let user = {};
  try { user = JSON.parse(localStorage.getItem("meetly_user") || "{}"); } catch { localStorage.removeItem("meetly_user"); }
  const join = async (event) => { event.preventDefault(); const code = meetingCode.trim(); if (!code) return setError("Enter a meeting code to continue."); try { await addToUserHistory(code); navigate(`/${code}`); } catch (e) { setError(e.response?.data?.message || "Could not join the meeting."); } };
  return <main className="workspace"><header className="workspace-nav"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span>Meetly</a><div className="workspace-actions"><button className="history-link" onClick={() => navigate("/history")}>◷ &nbsp; Meeting history</button><button className="user-menu" onClick={() => { clearSession(); navigate("/auth"); }}><span>{(user.name || "A").slice(0, 1).toUpperCase()}</span>{user.name || "Account"} <b>⌄</b></button></div></header><section className="workspace-main"><div className="workspace-copy"><p className="eyebrow">YOUR WORKSPACE</p><h1>Good morning, {user.name?.split(" ")[0] || "there"}.</h1><p>Ready when you are. Start a new conversation or jump into a meeting your team has already created.</p><div className="quick-stats"><div><b>12</b><span>meetings this week</span></div><div><b>4.5h</b><span>time saved with notes</span></div></div></div><aside className="join-card"><div className="join-icon">◉</div><h2>Join a meeting</h2><p>Enter a meeting code shared by your teammate.</p><form onSubmit={join}><input value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} placeholder="e.g. product-weekly" /><button>Join meeting →</button></form>{error && <p className="form-notice">{error}</p>}<div className="join-divider">OR</div><button className="secondary-action" onClick={() => { const code = crypto.randomUUID().slice(0, 8); setMeetingCode(code); }}>Create a new meeting</button></aside></section><section className="workspace-bottom"><p className="eyebrow">MAKE TIME FOR WHAT MATTERS</p><h2>Meetings that leave you with momentum.</h2><div className="workspace-feature-row"><span>✦ AI-ready notes</span><span>◉ HD video calls</span><span>↗ Easy sharing</span></div></section></main>;
}
export default withAuth(HomeComponent);
