const Router = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth.middleware");
const fileService = require("../services/fileService");
const File = require("../models/File");

const router = new Router();

router.post(
  "/registration",

  [
    check("firstName").trim().notEmpty().withMessage("Uncorrected first name"),

    check("email")
      .trim()
      .notEmpty()
      .withMessage("Uncorrected email")
      .isEmail()
      .withMessage("Invalid email"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(400).json({ message: firstError });
      }

      const { email, password, firstName } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(409)
          .json({ message: `Use with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword, firstName });
      await user.save();
      await fileService.createDir(new File({ user: user.id, name: "" }));
      return res.status(201).json({ message: "User was created" });
    } catch (e) {
      console.error("Error:", e);
      return res.status(400).json({ message: e });
    }
  },
);

router.post(
  "/login",

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPassValid = bcrypt.compareSync(password, user.password);

      if (!isPassValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1d",
      });

      return res.json({
        message: "Successful authorization",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
        },
      });
    } catch (e) {
      console.error("Error:", e);
      return res.status(400).json({ message: e });
    }
  },
);

router.get(
  "/auth",
  authMiddleware,

  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1d",
      });

      return res.json({
        message: "Successful authorization",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
        },
      });
    } catch (e) {
      console.error("Error:", e);
      return res.status(400).json({ message: e });
    }
  },
);

module.exports = router;
