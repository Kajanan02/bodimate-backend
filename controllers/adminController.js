import asyncHandler from "express-async-handler";
import BoardingModal from "../modals/boardingModal.js";
import moment from "moment";
import BookingModal from "../modals/bookingModal.js";
import UserModal from "../modals/userModal.js";

const getAdminDashboardData = asyncHandler(async (req, res) => {

    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    console.log(startOfMonth, endOfMonth);


    const boardingCount = await BoardingModal.countDocuments({});

    const currentBookingCount = await BookingModal.countDocuments({
        createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth
        }
    });

    const BoardingUserCount = await UserModal.countDocuments({role: 'boardingOwner'});
    const StudentUserCount = await UserModal.countDocuments({role: 'user'});

    const totalAmountForCurrentMonth = await BookingModal.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);

    console.log(totalAmountForCurrentMonth)

    const data = {
        currentBoardingCount: boardingCount,
        currentBookingCount: currentBookingCount,
        BoardingUserCount: BoardingUserCount,
        StudentUserCount: StudentUserCount,
        totalAmountForCurrentMonth: totalAmountForCurrentMonth[0]?.totalAmount || 0
    }


    res.status(200).json(data);

})


export {getAdminDashboardData}