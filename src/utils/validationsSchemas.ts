import {z} from "zod"

export const createArticleSchema=z.object({
    title:z.string({
        required_error:"title is required",invalid_type_error:"title must be string"}
    ).min(2,"title must be more than two characters").max(200,"title must be less than 200 characters"),
    description:z.string({
        required_error:"description is required",invalid_type_error:"description must be string"}
    ).min(10,"description must be more than 10 characters")
}
)

export const registerSchema=z.object({
    username:z.string({
        required_error:"userName is required",invalid_type_error:"userName must be string"}).min(2,"userName must be more than two characters").max(100,"userName must be less than 100 characters"),
    email:z.string({
        required_error:"email is required",invalid_type_error:"email must be string"}).min(2,"email must be more than two characters").max(200,"email must be less than 200 characters").email(),
    password:z.string({
        required_error:"password is required",invalid_type_error:"password must be string"}).min(6,"password must be more than 5 characters")
})

export const loginSchema=z.object({
    email:z.string({
        required_error:"email is required",invalid_type_error:"email must be string"}).min(2,"email must be more than two characters").max(200,"email must be less than 200 characters").email(),
    password:z.string({
        required_error:"password is required",invalid_type_error:"password must be string"}).min(6,"password must be more than 5 characters")
})
export const updateUserSchema =z.object({
    username:z.string({
        required_error:"userName is required",invalid_type_error:"userName must be string"}).min(2,"userName must be more than two characters").max(100,"userName must be less than 100 characters").optional(),
    email:z.string({
        required_error:"email is required",invalid_type_error:"email must be string"}).min(2,"email must be more than two characters").max(200,"email must be less than 200 characters").email().optional(),
    
})
export const createCommentShema = z.object({
    text: z.string({
        required_error:"text is required",invalid_type_error:"text must be string"}).min(2,"text must be more than two characters").max(500,"text must be less than 500 characters"),
    articleId: z.number(),
});
export const UpdateCommentShema = z.object({
    text: z.string({
        required_error:"text is required",invalid_type_error:"text must be string"}).min(2,"text must be more than two characters").max(500,"text must be less than 500 characters")
});