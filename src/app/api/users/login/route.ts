import { LoginUserDto } from '@/utils/dtos';
import { loginSchema } from '@/utils/validationsSchemas';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    LogIn User [(Login) (Sign in) (تسجيل الدخول)]
 *  @access  public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }
        const user = await prisma.user.findUnique({ where: { email: body.email } });

        if (!user) {
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            );
        }
        const passwordIsMatch =await bcrypt.compare(body.password,user.password)
        if(!passwordIsMatch){
            return NextResponse.json(
                { message: 'invalid email or password' },
                { status: 400 }
            );
        }

        const cookie=setCookie({
            username:user.username,
            id:user.id,
            isAdmin:user.isAdmin
        })
        return NextResponse.json(
            {message:"Authenticated"},
            {
                status: 201,
                headers:{"Set-Cookie":cookie}
                
            });
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}