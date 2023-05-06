import { roles } from "../../middleware/auth.js";

export const endpoints ={
    create :[roles.user],
    update:[roles.user],
    delete:[roles.user]
}