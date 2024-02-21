import { sendEmail } from "../config/mailer.js"
import logger from "../config/logger.js"

const sendTestEmail = async (req, res) => {
    try {
        const { email } = req.query
        const payload = {
            toEmail: email,
            subject: "Testing",
            body: "<h1>Email body</h1>"
        };

        await sendEmail(payload.toEmail, payload.subject, payload.body)
        
        return res.json({status: 200, message: "Email sent successfully"})
    } catch (error) {
        logger.error({type: "Email error", body: error});
        return res.status(500).json({message: "Something went wrong"})
    }
}

export default sendTestEmail;