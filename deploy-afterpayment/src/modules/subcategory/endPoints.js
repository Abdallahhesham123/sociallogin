import { roles } from "../../middleware/auth.js";

export const endpoints ={
    createSubCat :[roles.admin],
    updateSubCat:[roles.admin],
    deleteSubCat:[roles.admin]
}