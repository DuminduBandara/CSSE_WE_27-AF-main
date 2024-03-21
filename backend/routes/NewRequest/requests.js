import { Router } from "express";
import Request from "../../models/NewRequest/Request.js";

const router = Router();

//add new place
router.route("/add").post((req, res) => {
    const userid = req.body.userid;
    const province = req.body.province
    const districts = req.body.districts;
    const date = req.body.date;
    const days = req.body.days;

    const NewRequest = new Request({
        userid,
        province,
        districts,
        date,
        days,
    });

    NewRequest
        .save()
        .then(() => {
        res.json("Request Added");
        })
        .catch((err) => {
        console.log(err);
        });
} );

//get all requests
router.route("/").get((req, res) => {
  Request.find()
    .then((requests) => {
      res.json(requests);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get specific payment
router.route("/:id").get((req, res) => {
  Request.findById(req.params.id)
    .then((request) => {
      res.json(request);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;