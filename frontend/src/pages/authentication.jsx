import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

export default function Authentication() {
  const { handleLogin, handleRegister } = useContext(AuthContext);
  const [mode, setMode] = useState("login"), [name, setName] = useState(""), [username, setUsername] = useState(""), [password, setPassword] = useState(""), [notice, setNotice] = useState(""), [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setNotice(""); setLoading(true);
    try { if (mode === "login") await handleLogin(username, password); else { setNotice(await handleRegister(name, username, password)); setMode("login"); setPassword(""); } }
    catch (error) { setNotice(error.response?.data?.message || "Something went wrong. Please try again."); } finally { setLoading(false); }
  };
  return <main className="auth-page"><section className="auth-aside"><Link className="brand" to="/"><span className="brand-mark"><i /><i /><i /></span>Meetly</Link><div><p className="eyebrow">MEETINGS, SIMPLIFIED</p><h1>Make every conversation count.</h1><p>Meet, capture the important moments, and move work forward with your team.</p></div><div className="auth-quote">“We spend less time recapping and more time building.”<span>— Maya, Product Lead at Northstar</span></div></section><section className="auth-panel"><div className="auth-card"><Link className="back-link" to="/">← Back to home</Link><div className="auth-tabs"><button className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setNotice(""); }}>Log in</button><button className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setNotice(""); }}>Create account</button></div><h2>{mode === "login" ? "Welcome back" : "Start meeting better"}</h2><p className="auth-subtitle">{mode === "login" ? "Enter your details to access your workspace." : "Free for your team. No credit card required."}</p><form onSubmit={submit}>{mode === "signup" && <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" /></label>}<label>Username<input required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="alexmorgan" autoComplete="username" /></label><label>Password<input required minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>{notice && <p className="form-notice">{notice}</p>}<button className="auth-submit" disabled={loading}>{loading ? "Please wait…" : mode === "login" ? "Log in to Meetly →" : "Create your free account →"}</button></form><p className="terms">By continuing, you agree to Meetly’s Terms of Service and Privacy Policy.</p></div></section></main>;
}
