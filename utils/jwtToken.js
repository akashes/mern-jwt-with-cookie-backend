import jwt from 'jsonwebtoken'

export const createToken =  async(res,id)=>{
try {
    
    const payload={
        id
    }
    const options={
        expiresIn :'1h'
    }

    const token =jwt.sign(payload,process.env.JWT_SECRET,options)
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'Strict',
        maxAge:60*60*1000
    })
} catch (error) {
    console.log(error)
}
    // return token

}