const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Uncorrected email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorted than 12",
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `Use with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 15);
      const user = new User({ email, password: hashPassword });
      await user.save();
      return res.json({ message: "User was created" });
    } catch (e) {
      console.error("Error:", e);

      return res.status(400).json({ message: e });
    }
  },
);

module.exports = router;
