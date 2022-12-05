import { createError } from "../utils/errorUtil.js";
import JobPost from "../models/JobPost.js";
import QueryTool from "../utils/queryTool.js";
import { getDecodedTokenData } from "../utils/TokenUtils.js";
import { getMatch, getSort, getPagination } from "../utils/agreUtil.js";
import Rec from "../models/Rec.js";
import Company from "../models/Company.js";
export const createJobPost = async (req, res, next) => {


  try {

    let companyId = ""
    let recUserId = ""
    if (req.user) {
      //use in app
      recUserId = req.user.id;
    } else {
      //use in postman
      const decodeTokenData = getDecodedTokenData(req)
      recUserId = decodeTokenData.id;
    }

    let rec = await Rec.findOne({ userId: recUserId })
    let newJobPost;
    if (req.body.fullAddress) {
      newJobPost = new JobPost({ ...req.body, recId: rec.id, companyId: rec.companyId });

    } else {
      let company = await Company.findById(rec.companyId);
      newJobPost = new JobPost({ ...req.body, recId: rec.id, companyId: rec.companyId, fullAddress: company.location });

    }


    await newJobPost.save();
    res.status(200).send("Tạo jobpost thành công!");
  } catch (e) {
    next(e);
  }
};
export const updateJobPost = async (req, res, next) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (updatedJobPost === null)
      return next(createError(404, "Khong tim thay JobPost roi"));

    return res.status(200).json(updatedJobPost);
  } catch (err) {
    next(err);
  }
};
export const deleteJobPost = async (req, res, next) => {
  try {
    const deletedJobPost = await JobPost.findByIdAndDelete(req.params.id);
    if (deletedJobPost === null)
      return next(createError(404, "Khong tim thay JobPost roi"));

    return res.status(200).json("JobPost deleted");
  } catch (err) {
    next(err);
  }
};

export const getJobPost = async (req, res, next) => {

  try {
    const jobPost = await JobPost.findById(req.params.id);
    const comId = jobPost.companyId;
    const company = await Company.findById(comId);

    if (jobPost === null)
      return next(createError(404, "Khong tim thay jobPost"));

    res.status(200).json({ ...jobPost._doc, company: company });
  } catch (err) {
    next(err);
  }
};





// { "$toObjectId": "$userId" }
export const getAllJobPost = async (req, res, next) => {
  try {
    let pipeLine = []
    if (Object.keys(req.query).length > 0) {
      let matchQuery = getMatch(req.query, ["amount"]);
      console.log("..........................,,,,,)()()()(", matchQuery)
      if (Object.keys(matchQuery).length > 0) {
        pipeLine.push({ $match: matchQuery })
      }

      if (req.query.sort) {
        const sortStage = getSort(req.query.sort);
        pipeLine.push(sortStage)
      }
      if (req.query.page) {
        const paginationStage = getPagination(req.query.page, req.query.limit);
        pipeLine.push(...paginationStage)
      }
    }

    pipeLine.push({
      $lookup: {
        from: "companies",
        localField: "companyId",
        foreignField: "_id",
        as: "company",
      },
    },)
    pipeLine.push({

      "$unwind": {
        "path": "$company",
        "preserveNullAndEmptyArrays": true
      }
      ,
    },)
    const a = await JobPost.aggregate(pipeLine);
    res.status(200).json(a);
  } catch (err) {
    next(err);
  }
};

export const getAllFromQuery = async (req, res, next) => {
  try {
    const rs =await JobPost.find(req.query)
    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

export const getAllJobPost1 = async (req, res, next) => {
  try {
    let rs;

    if (Object.keys(req.query).length >= 0) {
      const queryTool = new QueryTool(JobPost.find(), req.query)
        .filter()
        .sort()
        .paginate();

      rs = await queryTool.query;
    } else {
      rs = await JobPost.find();
    }

    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};
