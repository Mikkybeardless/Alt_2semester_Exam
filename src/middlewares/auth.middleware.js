import jwt from "jsonwebtoken"


export const authMiddleware = (req,res,next) =>{
// get authorization header
const authorization = req.headers.authorization

if(!authorization){
    return res.status(401).json({message: "Unauthorized"});
}

console.log("Authorization", authorization);

const bearerToken = authorization.split(" ")

if(bearerToken.length != 2) {
  return  res.status(401).json({message: "Unauthorized"})
}
console.log("Token",bearerToken[1])

jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err,decoded) => {

    if (err){
      return  res.status(401).json({message: "Unauthorized"})
    }
    
console.log("Decoded", decoded)
    req.user = decoded;
    next();
})

}