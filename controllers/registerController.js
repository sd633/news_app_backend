import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
    try {
        const body = req.body;
        const validator = vine.compile(registerSchema);
        const payload = await validator.validate(body);

        const findUser = await prisma.users.findUnique({
            where:{
                email: payload.email
            }
        })

        if(findUser){
            return res.status(400).json({errors:
                {email:"email already taken please a different one" }})
        }
        const salt = bcrypt.genSaltSync(10);
        payload.password = bcrypt.hashSync(payload.password, salt);

        const user = await prisma.users.create({
            data: payload
        })

        return res.json({ status: 200, message: "User created successfully", user })
    } catch (error) {
        console.log(error);
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.message);
            return res.status(400).json({ errors: error.messages });
        }
        else {
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

}

export default registerController;