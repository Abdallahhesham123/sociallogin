import { roles } from "../../middleware/auth.js";

export const endpoints ={
    createBrand :[roles.admin],
    updateBrand:[roles.admin],
    deleteBrand:[roles.admin]
}