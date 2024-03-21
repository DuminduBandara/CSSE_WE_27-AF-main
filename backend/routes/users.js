import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import User from "../models/User.js";

const router = Router();

router.get("/details", auth, roleCheck(["user"]), (req, res) => {
    res.status(200).json({ message: "user authenticated." });

});

router.get("/my-account", auth, roleCheck(["user"]), (req, res) => {
    res.status(200).json({ message: "user authenticated." });

});

//get all users
router.route("/").get((req, res) => {
    const user = User.find()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
});

//get specific user
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}
);


router.get('/isAdmin/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    if (user.isAdmin) {
        res.status(200).json({
            status: true,
            role: "Admin",
        });
    }

    else {
        res.status(200).json({
            status: false,
            role: "User",
        });
    }

});

router.get("/getId/:id", async (req, res) => {
    const id = req.params.id;
    const usernames = await User.find();
    const username = usernames.filter(e => e.userName == id);
    if (username) {
        res.status(200).json({
            isAdmin: username[0].isAdmin,
            userPoints: username[0].userPoints
        });
    }


});

router.post('/userPoints', async (req, res) => {
    try {
        const { username } = req.body;


        const user = await User.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        return res.json({ userPoints: user.userPoints });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});



export default router;