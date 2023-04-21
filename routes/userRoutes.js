import express from "express";
import {
  addtoplaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// New user register
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(isAuthenticated, logout);

// Get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// Get my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// Forgot Password
router.route("/forgotpassword").post(forgotPassword);

// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addtoplaylist);

// Remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// ======= Admin Routes ======= //

// Get all users
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

// update user role, delete user
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
