import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";

const clean = (value) => typeof value === "string" ? value.trim() : "";
const getUser = (token) => User.findOne({ token: clean(token) });

export const register = async (req, res) => {
  const name = clean(req.body.name), username = clean(req.body.username).toLowerCase(), password = req.body.password || "";
  if (!name || !username || password.length < 8) return res.status(400).json({ message: "Name and username are required; passwords must be at least 8 characters." });
  try {
    if (await User.exists({ username })) return res.status(409).json({ message: "An account with this username already exists." });
    await User.create({ name, username, password: await bcrypt.hash(password, 12) });
    return res.status(httpStatus.CREATED).json({ message: "Account created. You can now sign in." });
  } catch { return res.status(500).json({ message: "Unable to create your account." }); }
};

export const login = async (req, res) => {
  const username = clean(req.body.username).toLowerCase(), password = req.body.password || "";
  if (!username || !password) return res.status(400).json({ message: "Enter your username and password." });
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Incorrect username or password." });
    user.token = crypto.randomBytes(32).toString("hex"); await user.save();
    return res.status(200).json({ token: user.token, user: { name: user.name, username: user.username } });
  } catch { return res.status(500).json({ message: "Unable to sign in right now." }); }
};

export const getUserHistory = async (req, res) => {
  try {
    const user = await getUser(req.query.token);
    if (!user) return res.status(401).json({ message: "Your session has expired. Please sign in again." });
    return res.json(await Meeting.find({ user_id: user.username }).sort({ date: -1 }).limit(100).lean());
  } catch { return res.status(500).json({ message: "Unable to load meeting history." }); }
};

export const addToHistory = async (req, res) => {
  const meetingCode = clean(req.body.meeting_code);
  if (!meetingCode) return res.status(400).json({ message: "Enter a meeting code." });
  try {
    const user = await getUser(req.body.token);
    if (!user) return res.status(401).json({ message: "Your session has expired. Please sign in again." });
    const meeting = await Meeting.create({ user_id: user.username, meetingCode });
    return res.status(httpStatus.CREATED).json({ message: "Meeting saved.", meeting });
  } catch { return res.status(500).json({ message: "Unable to save this meeting." }); }
};
