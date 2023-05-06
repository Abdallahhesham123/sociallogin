import { roles } from "../../middleware/auth.js";


export const endPoint ={

    create:[roles.user],
    cancel:[roles.user],
    delevered:[roles.admin],
    onway:[roles.admin],
    rejected:[roles.admin]
}