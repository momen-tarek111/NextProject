export type CreateArticleDto={
    title:string;
    description:string;
}
export type UpdateArticleDto={
    title?:string;
    description?:string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}
export interface LoginUserDto {
    
    email: string;
    password: string;
}
export interface UpdateUserDto{
    username?: string;
    email?: string;
}
export interface CreateCommentDto{
    text:string,
    articleId:number
}
export interface UpdateCommentDto{
    text:string
    
}
export interface ChangePasswordDto{
    newPassword:string
}