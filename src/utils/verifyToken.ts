import Jwt from "jsonwebtoken";

import { JWTPayload } from "@/utils/types";
import { NextRequest } from "next/server";
export function verifyToken(request:NextRequest):JWTPayload|null{
    try {
        const jwtToken=request.cookies.get("jwtToken")
        const token=jwtToken?.value as string
        if(!token){
            return null
        }
        const userFromToken: JWTPayload = Jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        return userFromToken
    } catch (error) {
        return null
    }

}

export function verifyTokenForPage(token:string):JWTPayload|null{
    try {
        
        const userFromToken= Jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        if(!userFromToken){
            return null
        }
        return userFromToken
    } catch (error) {
        return null
    }

}