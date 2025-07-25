import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationsSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/generated/prisma";
import prisma from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";

/** 
 * @method GET
 * @route ~/api/articles.
 * @description Get All Articles By Page Number
 * @access Public
 * 
*/
export async function GET(request:NextRequest) {
    try {
    const pageNumber:string=request.nextUrl.searchParams.get("pageNmber")||"1"

    const articles:Article[]=await prisma.article.findMany({
        skip:ARTICLE_PER_PAGE*(parseInt(pageNumber)-1),
        take:ARTICLE_PER_PAGE,
        orderBy:{createAt:'desc'}
    });

    return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    )
    }
    
}

/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    Create New Article
 *  @access  private (only admin can create article)
 */
export async function POST(request: NextRequest) {
    try {
            const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'only admin, access denied' },
        { status: 403 }
      )
    }
        const body = (await request.json()) as CreateArticleDto
        const validation = createArticleSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    )
    }

}