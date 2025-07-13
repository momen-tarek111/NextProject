
import { headers } from "next/headers";
import { NextRequest,NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export function GET(request:NextRequest){

try {
      const response = NextResponse.json({ message: 'logout' }, { status: 200 });

response.cookies.set('jwtToken', '', {
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        path:'/',
        maxAge:60*60*24*30,
        sameSite:'strict',
        expires:new Date(0)
  });

  return response;

} catch (error) {
    return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
}
}