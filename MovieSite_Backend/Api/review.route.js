import express from 'express';
import Reviewcrl from "./review.controller.js";

const router = express.Router();
router.route("/movie/:id").get(Reviewcrl.apiGetReviews)
router.route("/new").post(Reviewcrl.apiPostReview)
router.route("/:id")
.get(Reviewcrl.apiGetReview)
.put(Reviewcrl.apiUpdateReview)
.delete(Reviewcrl.apiDeleteReview)


export default router;