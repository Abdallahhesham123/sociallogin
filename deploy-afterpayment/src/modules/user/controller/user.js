import UserModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

import cloudinary from "../../../utils/cloudinary.js";

export const getUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({
      status: "Online",
      // _id: { $ne: `${req.user._id}` },
      isDeleted: false
    }).populate([
      {
        path:"wishUserlist",
        select:"name slug"
      }
    ]);
    return res.json({ message: "Done", users });
  } catch (error) {
    return res.json({
      message: "Catch error",
      error,
      stack: error.stack,
    });
  }
};

export const findByIdAndUpdate = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `user/${req.user._id}/profilePic` }
    );
    req.body.image = { secure_url, public_id };
  }

  const user = await UserModel.findByIdAndUpdate(
    { _id: req.user._id, isDeleted: false },

    req.body,
    { new: false }
  );

  await cloudinary.uploader.destroy(user?.image?.public_id);
  // console.log(user);
  return user
    ? res.json(user )
    : next(new Error("InValid-UserId", { cause: 404 }));
});

export const getProfile = asyncHandler(async (req, res, next) => {
  //   const { id } = req.params;
  const user = await UserModel.findOne({
    _id: req.user._id,
    isDeleted: false,
    confirmEmail: true,
  }).select("-password -confirmEmail -isDeleted ");
  return user
    ? res.json({ message: "user Profile Founded Sucsessfully", user })
    : next(new Error("InValid-UserId"));
});

export const findOneAndDelete = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOneAndDelete(
    { _id: req.user._id, isDeleted: false },
    { new: false }
  );
  await cloudinary.uploader.destroy(user.image.public_id);
  return user
    ? res.json({ message: "user Deleted Sucsessfully from database" })
    : next(new Error("InValid-UserId"));
});

export const profilePicUpdated = asyncHandler(async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `user/${req.user._id}/profilePic` }
  );

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { image: { secure_url, public_id } },
    { new: false }
  );
  await cloudinary.uploader.destroy(user.image.public_id);
  return res.json({ message: "Done", user });
});

export const softDelete = asyncHandler(async (req, res, next) => {
  const user = await UserModel.updateOne(
    { _id: req.user._id, isDeleted: false },
    { isDeleted: true }
  );

  return user.modifiedCount
    ? res.json({
        message: "user deleted Sucsessfully but this user in database",
      })
    : next(new Error("InValid-UserId"));
});

export const restoretodatabase = asyncHandler(async (req, res, next) => {
  const user = await UserModel.updateOne(
    { _id: req.user._id, isDeleted: true },
    { isDeleted: false }
  );

  return user.modifiedCount
    ? res.json({
        message: "user Restored Sucsessfully and your post Restored",
      })
    : next(new Error("InValid-UserId"));
});

