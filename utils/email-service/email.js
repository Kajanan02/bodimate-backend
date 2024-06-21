import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kajanandude@gmail.com",
        pass: "aujbwpvqcksxxvdr"
    }

})


const sendEmail = async (to, subject, body) => {

    let mailOptions = {
        to,
        from: "kajanan02000@gmail.com",
        subject,
        html: body
    }


    await new Promise((resolve, reject) => {

        transporter.sendMail(mailOptions, (err, res) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                console.log(res);
                resolve(res)
            }

        })


    })

}

export default sendEmail