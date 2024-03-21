import { Router } from "express";
import Feedback from "../../models/Feedback/Feedback.js";

const router = Router();

//add feedback
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const feedbackmsg = req.body.feedbackmsg;
    
    const newFeedback = new Feedback({
        name,
        email,
        subject,
        feedbackmsg,
    });
    
    newFeedback
        .save()
        .then(() => {
        res.json("Feedback Added");
        })
        .catch((err) => {
        console.log(err);
        });
});

//get all feedbacks
router.route("/").get((req, res) => {
    const feedbacks = Feedback.find()
      .then((feedbacks) => {
        res.json(feedbacks);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //get specific feedbacks
  router.route("/:id").get((req, res) => {
    const feedbacks = Feedback.findById(req.params.id)
        .then((feedbacks) => {
        res.json(feedbacks);
        })
        .catch((err) => {
        console.log(err);
        });
    }
);

//delete feedback
router.route("/:id").delete((req, res) => {
    Feedback.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("Feedback Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  });


export default router;
