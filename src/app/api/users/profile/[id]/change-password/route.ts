import prisma from "@/utils/db";
import { ChangePasswordDto } from "@/utils/dtos";
import { ChangePasswordSchema } from "@/utils/validationsSchemas";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id/change-password
 *  @desc    Change Your Password
 *  @access  private (only user himself can update his Password)
 */
export async function PUT(request: NextRequest, props: unknown) {
    try {
        const { id } =await (props as { params: { id: string } }).params;

        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 });
        }
        
        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }
        const body=await request.json() as ChangePasswordDto
        const validation=ChangePasswordSchema.safeParse(body)
                if(!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.newPassword, salt);
        await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                password:hashedPassword
            }
        });
        const response=NextResponse.json(
            { message: 'your password has been updated' },
            { status: 200 }
        );
        response.cookies.delete("jwtToken")
        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}