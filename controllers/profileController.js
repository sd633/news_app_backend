import { generaterandomNum, imageValidator } from "../utils/helper.js"
import prisma from "../DB/db.config.js"

export const getProfile = async(req,res) =>{
    try{
        const user = req.user
    return res.json({ status: 200, user})
    } catch(error){
        return res.status.json({message: "Something went wrong"})
    }
    
}

export const createProfile = async(req,res) =>{

}

export const showProfile = async(req,res) =>{

}

export const updateProfile = async(req,res) =>{
    const {id} = req.params
    const authUser = req.user 

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({status:400, message:"Profile image is required"});
    }

    const profile = req.files.profile;
    const message = imageValidator(profile?.size, profile.mimetype);

    if(message !== null){
        return res.status(400).json({
            errors:{
                profile: message
            },
        })
    }

    const imgExt = profile?.name.split(".");
    const imageName = generaterandomNum()+"."+imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;

      profile.mv(uploadPath, (err) => {
        if (err) throw err;
      });

    await prisma.users.update({
        data:{
            profile: imageName
        },
        where:{
            id:Number(id)
        }
    })

    return res.json({
        status:200,
        message:"Profile updated successfully"
    })

}

export const deleteProfile = async(req,res) =>{

}

