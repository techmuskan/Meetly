/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import withAuth from "../utils/withAuth";
import "../App.css";

function History() {
  const { getHistoryOfUser } = useContext(AuthContext), navigate = useNavigate();
  const [meetings, setMeetings] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");
  useEffect(() => { getHistoryOfUser().then(setMeetings).catch((e) => setError(e.response?.data?.message || "Could not load your meeting history.")).finally(() => setLoading(false)); }, [getHistoryOfUser]);
  return <main className="history-page"><header className="workspace-nav"><a className="brand" href="/"><span className="brand-mark"><i /><i /><i /></span>Meetly</a><button className="history-link" onClick={() => navigate("/home")}>← Back to workspace</button></header><section className="history-content"><p className="eyebrow">YOUR ACTIVITY</p><h1>Meeting history</h1><p className="history-intro">Pick up where you left off, or revisit a meeting room.</p>{loading ? <div className="empty-state">Loading your meetings…</div> : error ? <div className="empty-state">{error}</div> : meetings.length ? <div className="meeting-list">{meetings.map((meeting) => <article key={meeting._id} className="history-item"><div className="history-icon">◉</div><div><h2>{meeting.meetingCode}</h2><p>Joined {new Date(meeting.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p></div><button onClick={() => navigate(`/${meeting.meetingCode}`)}>Rejoin →</button></article>)}</div> : <div className="empty-state"><div>◷</div><h2>No meetings yet</h2><p>When you join a meeting, it will appear here.</p><button onClick={() => navigate("/home")}>Join your first meeting →</button></div>}</section></main>;
}
export default withAuth(History);
