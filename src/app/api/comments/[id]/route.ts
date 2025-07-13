import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from '@/utils/dtos';
import { UpdateCommentShema } from '@/utils/validationsSchemas';
/**
 *  @method  PUT
 *  @route   ~/api/comments/:id
 *  @desc    Update Comment
 *  @access  private (only owner of the comment)
 */

export async function PUT(request: NextRequest, props: unknown) {
    try {
        const { id } = (props as { params: { id: string } }).params;
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } })
        if (!comment) {
            return NextResponse.json({ message: 'comment not found' }, { status: 404 });
        }
        const user = verifyToken(request)
        if (user === null || user.id !== comment.userId) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }
        const body = await request.json() as UpdateCommentDto
        const validation = UpdateCommentShema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { text: body.text }
        });

        return NextResponse.json(updatedComment, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }
}
/**
 *  @method  DELETE
 *  @route   ~/api/comments/:id
 *  @desc    Delete Comment
 *  @access  private (only admin OR owner of the comment)
 */
export async function DELETE(request: NextRequest, props: unknown) {
    try {
        const { id } = (props as { params: { id: string } }).params;
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } })
        if (!comment) {
            return NextResponse.json({ message: 'comment not found' }, { status: 404 });
        }
        const user = verifyToken(request)
        if (user === null) {
            return NextResponse.json(
                { message: 'no token provided, access denied' },
                { status: 401 }
            )
        }
        if (user.isAdmin === true || user.id === comment.userId) {
            await prisma.comment.delete({ where: { id: parseInt(id) } });
            return NextResponse.json(
                { message: 'comment deleted' },
                { status: 200 }
            )
        }
        return NextResponse.json(
            { message: 'you are not allowed, access denied' },
            { status: 403 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }
}