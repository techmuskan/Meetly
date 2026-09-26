/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import withAuth from "../utils/withAuth";
import "../App.css";

function HomeComponent() {
  const navigate = useNavigate(),
    { addToUserHistory, clearSession } = useContext(AuthContext);
  const [meetingCode, setMeetingCode] = useState(""),
    [error, setError] = useState(""),
    [menuOpen, setMenuOpen] = useState(false),
    [joining, setJoining] = useState(false);
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("meetly_user") || "{}");
  } catch {
    localStorage.removeItem("meetly_user");
  }
  const enterMeeting = async (code) => {
    const cleanCode = code.trim();
    if (!cleanCode) return setError("Enter a meeting code to continue.");
    setJoining(true);
    setError("");
    try {
      await addToUserHistory(cleanCode);
      navigate(`/${encodeURIComponent(cleanCode)}`);
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Could not join the meeting. Is the API running?",
      );
    } finally {
      setJoining(false);
    }
  };
  const join = (event) => {
    event.preventDefault();
    enterMeeting(meetingCode);
  };
  const createMeeting = () => enterMeeting(`meet-${Date.now().toString(36)}`);
  return (
    <main className="workspace">
      <header className="workspace-nav">
        <a className="brand" href="/">
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          Meetly
        </a>
        <div className="workspace-actions">
          <button className="history-link" onClick={() => navigate("/history")}>
            History
          </button>
          <div className="account-wrap">
            <button
              className="user-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{(user.name || "A").slice(0, 1).toUpperCase()}</span>
              <em>{user.name || "Account"}</em>
              <b>Settings</b>
            </button>
            {menuOpen && (
              <div className="account-popover">
                <p>
                  Signed in as <strong>{user.username || "member"}</strong>
                </p>
                <button onClick={() => navigate("/history")}>
                  Meeting history
                </button>
                <button
                  className="logout-action"
                  onClick={() => {
                    clearSession();
                    navigate("/auth");
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <section className="workspace-main">
        <div className="workspace-copy">
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Welcome, {user.name?.split(" ")[0] || "there"}.</h1>
          <p>
            Start a private room for your team, or join a meeting with a code.
            Your recent activity stays organized in one place.
          </p>
          <div className="quick-stats">
            <div>
              <b>Private</b>
              <span>rooms for your team</span>
            </div>
            <div>
              <b>Live</b>
              <span>chat and screen sharing</span>
            </div>
          </div>
        </div>
        <aside className="join-card">
          <div className="join-icon">M</div>
          <h2>Join a meeting</h2>
          <p>Enter the meeting code shared by your teammate.</p>
          <form onSubmit={join}>
            <input
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              placeholder="e.g. product-weekly"
            />
            <button disabled={joining}>
              {joining ? "Opening room..." : "Join meeting"}
            </button>
          </form>
          {error && <p className="form-notice">{error}</p>}
          <div className="join-divider">OR</div>
          <button
            className="secondary-action"
            disabled={joining}
            onClick={createMeeting}
          >
            Create a new meeting
          </button>
        </aside>
      </section>
      <section className="workspace-bottom">
        <p className="eyebrow">MEET WITH MOMENTUM</p>
        <h2>Everything you need for a focused call.</h2>
        <div className="workspace-feature-row">
          <span>HD video rooms</span>
          <span>Live team chat</span>
          <span>Screen sharing</span>
        </div>
      </section>
    </main>
  );
}
export default withAuth(HomeComponent);
