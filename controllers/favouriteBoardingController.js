import asyncHandler from "express-async-handler";

const createFavouriteBoarding = asyncHandler(async (req, res) => {

    const {
        studentId,
        boardingId
    } = req.body;

    const favouriteBoarding = await FavouriteBoarding.create({
        studentId,
        boardingId
    })

    if (favouriteBoarding) {
        res.status(201).json(favouriteBoarding)
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});
    }
})

const deleteFavouriteBoarding = asyncHandler(async (req,res) => {
    const favouriteBoarding = await FavouriteBoarding.findById(req.params.id)
    if(favouriteBoarding){
        await favouriteBoarding.deleteOne();
        res.json({message: 'Favourite Boarding Removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "Favourite Boarding is not found"})
    }
})


const getFavouriteBoardings = asyncHandler(async (req, res) => {
    const favouriteBoarding = await FavouriteBoarding.find({}).find({})
        .populate('boardingId')
        .populate('studentId')
        .sort({ createdAt: -1 });

    if (favouriteBoarding){
        res.json(favouriteBoarding);
    } else {
        res.status(400).json({status: "FAILED", message: "Favourite Boarding data not found"});
    }
});

export {
    createFavouriteBoarding,
    deleteFavouriteBoarding,
    getFavouriteBoardings
}