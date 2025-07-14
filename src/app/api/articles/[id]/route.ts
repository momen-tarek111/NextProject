import { UpdateArticleDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/** 
 * @method GET
 * @route ~/api/articles/:id
 * @description Get Single Article
 * @access Public
 * 
*/
export async function GET(request: NextRequest, props: unknown) {
    try {
        const { id } = await(props as { params: { id: string } }).params;
        const article = await prisma.article.findUnique({ 
            where: { id: parseInt(id) },
            include:{
                comments:{
                    include:{
                        user:{
                            select:{
                                username:true
                            }
                        }
                    },
                    orderBy:{
                        createAt:'desc'
                    }
                }
            }
        })
        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }
        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }

}

/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    Update Article
 *  @access  private (only admin can update article)
 */


export async function PUT(request: NextRequest, props: unknown) {
    try {
                    const user = verifyToken(request);
            if (user === null || user.isAdmin === false) {
              return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
              )
            }
        const { id } = (props as { params: { id: string } }).params;
        const article = await prisma.article.findUnique({ where: { id: parseInt(id) } })
        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }
        const body = (await request.json()) as UpdateArticleDto
        const updatedArticle = await prisma.article.update({ where: { id: parseInt(id) }, data: { title: body.title, description: body.description } })
        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }

}

/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id
 *  @desc    Delete Article
 *  @access  private (only admin can delete article)
 */

export async function DELETE(request: NextRequest, props: unknown) {
    try {
                            const user = verifyToken(request);
            if (user === null || user.isAdmin === false) {
              return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
              )
            }
        const { id } = (props as { params: { id: string } }).params;
        const article = await prisma.article.findUnique({ where: { id: parseInt(id) },include:{comments:true} })
        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }

        await prisma.article.delete({ where: { id: article.id } })

        return NextResponse.json({ message: "article deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }

}