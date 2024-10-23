import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
try {
  console.log('inside verify toke')
    const token = req.cookies.jwt
    console.log(token)
    if(!token) return res.status(400).json('verification failed please login again')

      const tokenVerified = await jwt.verify(token,process.env.JWT_SECRET)

      
      console.log({tokenVerified})
      if(!tokenVerified) return res.status(400).json('verification failed please login again')

        req.payload= tokenVerified.id
        next()
} catch (error) {
    res.status(400).json({message:"token not valid",error})
}
    }     
