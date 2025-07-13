import { User,Comment, Article } from "@/generated/prisma";

export type JWTPayload={
    username:string;
    id:number;
    isAdmin:boolean;
}

export type CommentWithUser=Comment&{user:User}
export type SingleArticle=Article&{comments:CommentWithUser[]}
