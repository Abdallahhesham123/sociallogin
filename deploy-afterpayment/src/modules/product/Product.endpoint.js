import { roles } from "../../middleware/auth.js";


export const endPoint ={

    createProduct:[roles.user ,roles.admin],
    updateProduct:[roles.admin],
    wishlist:[roles.user]
}