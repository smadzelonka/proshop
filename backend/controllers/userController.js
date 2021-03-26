import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

/**
 * @desc AUTH USER & TOKEN
 * @route POST API/USERS/LOGIN
 * @access PUBLIC
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ message: "Email or Password incorrect" });
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 200,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid password or email");
  }
});

/**
 * @desc REGISTER A NEW USER
 * @route POST API/USERS
 * @access PUBLIC
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc GET USER PROFILE
 * @route GET API/USERS/LOGIN
 * @access PRIVATE
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!!!");
  }
});

/**
 * @desc UPDATE USER PROFILE
 * @route PUT API/USERS/PROFILE
 * @access PRIVATE
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!!!");
  }
});

/**
 * @desc GET All User
 * @route GET API/USERS
 * @access PRIVATE/admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @desc GET User by id
 * @route GET API/USERS/:ID
 * @access PRIVATE/admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc Delete a User
 * @route Delete API/USERS/:id
 * @access PRIVATE/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  // can use findByIdDelete
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc UPDATE USER
 * @route PUT API/USERS/:id
 * @access PRIVATE/ADMIN
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
      const updateUser = await user.save();

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found!!!");
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
