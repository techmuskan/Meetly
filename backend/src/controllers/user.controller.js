import httpStatus from "http-status";
import User from "../models/user.model.js";
import bycrypt, { hash } from "bcrypt";
import crpto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Username and password are required" });
  } 
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    } 

    let isMatch = await bycrypt.compareSync(password, user.password);
    if(isMatch) {
      const token = crpto.randomBytes(16).toString("hex");
      user.token = token;
      await user.save();
      res.status(httpStatus.OK).json({ message: `Login successful: ${token}`, token });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in", error });
  }   
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Name, username and password are required" });
  }   
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Username already exists" });
    } 
    const hashedPassword = bycrypt.hashSync(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error registering user", error });
  } 
};

export { login, register };