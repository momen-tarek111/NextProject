import Jwt  from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

export function generateToken(jwtPayload:JWTPayload):string{
    const privatekey=process.env.JWT_SECRET as string

    const token:string=Jwt.sign(jwtPayload,privatekey,{
        expiresIn:"3d"
    })
    return token
}

export function setCookie(jwtPayload:JWTPayload):string{
    const token=generateToken(jwtPayload);
    const cookie=serialize("jwtToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        path:'/',
        maxAge:60*60,
        sameSite:'strict'
    })
    return cookie;
}