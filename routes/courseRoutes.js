import express from "express";
import {
  addCourseLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

// get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - (Only Admin)
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add Lecture, Delete course, get course details
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addCourseLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
