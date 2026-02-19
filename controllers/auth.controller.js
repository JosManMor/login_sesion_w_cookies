import { UserRepository } from '../models/user.repository.js';

const getHomePage = (req, res) => {
  return res.sendFile(process.cwd() + '/frontend/views/index.html');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    req.session.user = user;
    req.session.save((err) => {
      if (err) throw err;
      res.json({ message: 'Login successful', user });
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
    res.json({ id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Could not log out' });
    res.clearCookie('connect.sid'); // Default session cookie name
    res.json({ message: 'logout succesfull' });
  });
};

const validateSession = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ valid: true, user: req.session.user });
  }
  return res.status(401).json({ valid: false });
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const users = await UserRepository.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getHomePage, loginUser, registerUser, logoutUser, validateSession, getAllUsers };
