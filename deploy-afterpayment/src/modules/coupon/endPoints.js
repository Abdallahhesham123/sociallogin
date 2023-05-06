import { roles } from "../../middleware/auth.js";

export const endpoints ={
    createCoupon :[roles.admin],
    updateCoupon:[roles.admin],
    deleteCoupon:[roles.admin]
}