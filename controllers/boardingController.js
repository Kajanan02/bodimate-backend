import asyncHandler from "express-async-handler";
import Boarding from "../modals/boardingModal.js";

const createBoarding = asyncHandler(async (req, res) => {
    const {
        boardingName,
        boardingNo,
        ownerName,
        ownerNIC,
        street,
        city,
        district,
        province,
        boardingType,
        stayPreference,
        facilities,
        membersCount,
        noOfRooms,
        pricePerMonth,
        distance,
        boardingOwner,
        nearestUniversity,
        isVerified,
        advancedPayment
    } = req.body;

    const boarding = await Boarding.create({
        boardingName,
        boardingNo,
        ownerName,
        ownerNIC,
        street,
        city,
        district,
        province,
        boardingType,
        isVerified,
        stayPreference,
        facilities,
        membersCount,
        noOfRooms,
        boardingOwner,
        pricePerMonth,
        distance,
        nearestUniversity,
        advancedPayment})

    if (boarding) {
        res.status(201).json(boarding)
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});

    }
});
const getOneBoarding = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const boarding = await Boarding.findById(_id)
    if (boarding) {
        res.json(boarding)
    }
});

const getAllBoarding = asyncHandler(async (req, res) => {
    const boarding = await Boarding.find({}).sort({ createdAt: -1 });
    if (boarding) {
        res.json(boarding);
    } else {
        res.status(404).json({status: "FAILED", message: "Boarding not found"});

    }
});

const editBoarding = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const boarding = await Boarding.findById(_id);
    if (boarding) {
        boarding.boardingName = req.body.boardingName || boarding.boardingName;
        boarding.boardingNo = req.body.boardingNo || boarding.boardingNo;
        boarding.ownerName = req.body.ownerName || boarding.ownerName;
        boarding.ownerNIC = req.body.ownerNIC || boarding.ownerNIC;
        boarding.street = req.body.street || boarding.street;
        boarding.city = req.body.city || boarding.city;
        boarding.district = req.body.district || boarding.district;
        boarding.isVerified = req.body.isVerified || boarding.isVerified;
        boarding.province = req.body.province || boarding.province;
        boarding.boardingType = req.body.boardingType || boarding.boardingType;
        boarding.stayPreference = req.body.stayPreference || boarding.stayPreference;
        boarding.membersCount = req.body.membersCount || boarding.membersCount;
        boarding.noOfRooms = req.body.noOfRooms || boarding.noOfRooms;
        boarding.pricePerMonth = req.body.pricePerMonth || boarding.pricePerMonth;
        boarding.distance = req.body.distance || boarding.distance;
        boarding.nearestUniversity = req.body.nearestUniversity || boarding.nearestUniversity;
        boarding.advancedPayment = req.body.advancedPayment || boarding.advancedPayment;

        const updatedBoarding = await boarding.save();
        res.json(updatedBoarding);
    } else {
        res.status(404).json({status: "FAILED", message: "Boarding not found"});

    }
})

const deleteBoarding = asyncHandler(async (req, res) => {
    const boarding = await Boarding.findById(req.params.id);
    if (boarding) {
        await boarding.deleteOne();
        res.json({message: 'Boarding removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "Boarding not found"});
    }
})

export {createBoarding, getAllBoarding, editBoarding, deleteBoarding, getOneBoarding};