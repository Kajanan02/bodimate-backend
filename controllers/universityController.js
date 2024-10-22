import asyncHandler from "express-async-handler";
import University from "../modals/universityModal.js";

const createUniversity = asyncHandler(async (req, res) => {
    const {
        universityName,
        district,
        universityImg,
        location
    } = req.body;

    const university = await University.create({
        universityName,
        district,
        universityImg,
        location
        })

    if (university) {
        res.status(201).json(university)
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});

    }
});
const getOneUniversity = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const university = await University.findById(_id)
    if (university) {
        res.json(university)
    }
});

const getOneUniversityByName = asyncHandler(async (req, res) => {
    let universityName = req.params.universityName
    const university = await University.findOne({universityName: universityName})
    if (university) {
        res.json(university)
    }else {
        res.status(404).json({status: "FAILED", message: "University not found"});
    }
});



const getAllUniversity = asyncHandler(async (req, res) => {
    const university = await University.find({}).sort({ createdAt: -1 });
    if (university) {
        res.json(university);
    } else {
        res.status(404).json({status: "FAILED", message: "University not found"});

    }
});

const editUniversity = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const university = await University.findById(_id);
    if (university) {
        university.universityName = req.body.universityName || university.universityName;
        university.district = req.body.district || university.district;
        university.location = req.body.location || university.location;
        university.universityImg = req.body.universityImg || university.universityImg;
     

        const updatedUniversity = await university.save();
        res.json(updatedUniversity);
    } else {
        res.status(404).json({status: "FAILED", message: "University not found"});

    }
})

const deleteUniversity = asyncHandler(async (req, res) => {
    const university = await University.findById(req.params.id);
    if (university) {
        await university.deleteOne();
        res.json({message: 'University removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "university not found"});
    }
})

export {createUniversity, getOneUniversity, getAllUniversity,editUniversity ,deleteUniversity ,getOneUniversityByName};