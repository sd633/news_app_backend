import prisma from "../DB/db.config.js";
import vine from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { loginSchema } from "../validations/authValidation.js";
import jwt from "jsonwebtoken";

const loginController = async (req,res) =>{

    try{
        const body = req.body;
    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(body);

    const findUser = await prisma.users.findUnique({
        where:{
            email:payload.email
        }
    })

    if(findUser){
        if(!bcrypt.compareSync(payload.password, findUser.password)){
            return res.status(400).json({errors: {
                email: "Invalid credentials"
            }});
        }

        const payloadData = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            profile: findUser.profile,
          };

          const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
            expiresIn: "365d",
          });
  
          return res.json({
            message: "Logged in",
            access_token: `Bearer ${token}`,
          });
        }
  
        return res.status(400).json({
          errors: {
            email: "No user found with this email.",
          },
        });
    } catch (error) {
        console.log(error);
        if (error instanceof error.E_VALIDATION_ERROR) {
            console.log(error.message);
            return res.status(400).json({ errors: error.messages });
        }
        else {
            return res.status(500).json({ message: "Something went wrong" })
        }
    }
    
}

export default loginController;