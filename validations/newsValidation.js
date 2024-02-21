import vine from "@vinejs/vine";
import {CustomErrorReporter} from "./customErrorReporter.js"

vine.errorReporter = () => new CustomErrorReporter()

export const newsschema = vine.object({
    title:vine.string().minLength(5).maxLength(190),
    content:vine.string().minLength(10).maxLength(30000),
})