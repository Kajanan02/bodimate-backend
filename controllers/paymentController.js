import asyncHandler from "express-async-handler";
import md5 from "crypto-js/md5.js";
import Booking from "../modals/bookingModal.js";
import Boarding from "../modals/boardingModal.js";


const payHereHash = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {amount,  boardingId,
        ownerId,
        studentId,
        checkInDate,
        checkOutDate,
        memberCount} = req.body;



    const booking = await Booking.create({amount,
        boardingId,
        ownerId,
        studentId,
        checkInDate,
        checkOutDate,
        memberCount
    })


    if(booking){
        const boarding = await Boarding.findById(boardingId);
        if(boarding){
            boarding.availableSlots = boarding.availableSlots - memberCount
        }
        const updatedBoarding = await boarding.save();

        console.log(booking)
        let merchantSecret  = process.env.MERCHANT_SECRET;
        let merchantId      = process.env.MERCHANT_ID;
        let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
        let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
        let currency        = 'LKR';
        let hash            = md5(merchantId + booking._id + amountFormated + currency + hashedSecret).toString().toUpperCase();

        res.status(201).json({booking:booking,hash:hash})
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});
    }



    // res.send(hash);

})

export {payHereHash}