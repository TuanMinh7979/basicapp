import User from "../models/User.js";
import { createError } from "../utils/errorUtil.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Applicant from "../models/Applicant.js";
import Rec from "../models/Rec.js";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.passwordInp, salt);
    const {
      usernameInp,
      emailInp,
      nameInp,
      addressInp,
      roleInp,
      isAdminInp,
      ...details
    } = req.body;
    const newUser = new User({
      username: usernameInp,
      email: emailInp,
      password: hash,
      name: nameInp,
      address: addressInp,
      role: roleInp,
    });
    if (roleInp == "admin") newUser.isAdmin = true;
    console.log(newUser);
    let savedUser = await newUser.save();
    if (roleInp !== "admin") {
      try {
        console.log("+++++++++++");
        if (roleInp == "applicant") {
          const newApplicant = new Applicant({
            user_id: savedUser._id,
            ...details,
          });

          await newApplicant.save();
          console.log("Save applicant success-----");
        } else if (roleInp == "rec") {
          const newRec = new Rec({
            user_id: savedUser._id,
            ...details,
          });
          await newRec.save();
        }
      } catch (e) {
        next(e);
      }
    }

    res.status(200).send("user created successfully");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, "wrong username or password(username)"));

    console.log(req.body, user.password);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(404, "wrong username or password(pass)"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetail } = user._doc;

    //cookie  se luu tai client sau khi dang nhap

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)

      .send(user);
    //user nay send ve de luu vao local(dung redux hay react gi do de luu vao localStorage),
  } catch (err) {
    next(err);
  }
};
