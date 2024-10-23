import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { checkPassword, hashPassword } from "../utils/bcrypt.js"
import { createToken } from "../utils/jwtToken.js"

const registerUser =async(req,res)=>{
    console.log('inside reg user')
    try {
        const{name,email,password}=req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }else{
          const hashedPassword = await  hashPassword(password)


        
            const user = new User({name,email,password:hashedPassword})
            await user.save()
            await createToken(res,user._id)
           return res.status(200).json({
                success:true,
                message:"user registered successfully",
                // token
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while registering User",
            error
        })
        
    }
}

const loginUser=async(req,res)=>{
    console.log('inside login user')
    try {
        const{email,password}=req.body

        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(400).json({
            success:false,
            message:"User not registered"
        })
        const isPasswordMatch = await checkPassword(password,existingUser.password)
        console.log(isPasswordMatch)
        if(isPasswordMatch){
            createToken(res,existingUser._id)
            res.status(200).json({
                success:true,
                message:"User registered successfully",
                user:{id:existingUser._id,name:existingUser.name,email:existingUser.email}
            })
        }else{
            res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
    } catch (error) {
        
    }
}

const logoutUser = async(req,res)=>{
    try {
        res.cookie('jwt',"",{
            httpOnly:true,
            expiresIn:new Date(0)
        })
        return res.status(200).json({
            message:'logged out successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'error while logging out '
        })
        
    }
}

const getProfile=async(req,res)=>{
console.log('inside get profile')
const id = req.payload
console.log(id)
const user = await User.findById(id)
if(user){
    return res.status(200).json({id:user._id,name:user.name,email:user.email})

}
return res.status(400).json({
    message:"user not found"
})
}

const verifyUser=async(req,res)=>{
    console.log('inside verify')
    try {
        const id = req.payload
        const user = await User.findById(id)
        if(user){
            return res.status(200).json({
                success:true,
                message:"verified",
                userData:{
                    name:user.name,
                    email:user.email

                }
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Verification failed",
               
            })
        }
    } catch (error) {
        
    }

}
export {registerUser,loginUser,logoutUser,getProfile,verifyUser}