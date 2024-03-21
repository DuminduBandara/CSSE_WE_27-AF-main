import { Router } from "express";
import Points from "../../models/Points/Points.js";
import User from "../../models/User.js";

const router = Router();

//add Points
router.route("/add").post((req, res) => {
    const userId = req.body.userId;
    const pointAmount = req.body.pointAmount;
  
    const newPoints = new Points({
      userId,
      pointAmount,
    });
  
    newPoints
      .save()
      .then(() => {
        res.json("Points Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });

//get all PointsUsers
router.route("/").get((req, res) => {
    const points = Points.find()
      .then((points) => {
        res.json(points);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  router.put('/increment-points/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const _id = userId;
      
     
      const user = await User.findOne({ _id });
  
      if (!user) {
        return res.status(404).json({ error: 'Points not found' });
      }
  
      user.userPoints += 100;
  
   
      await user.save();
  
      return res.json({ message: 'Points incremented by 100' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  

export default router;