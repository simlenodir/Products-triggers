import { ErrorHandler } from "../../exeptions/errorHandler.js";
import { sign } from "../../utils/jwt.js";
import { foundUser } from "./model.js";

export default{
    POST_Login: async (req, res, next) => {
        const {user_name, password, email} = req.body
        console.log(user_name, password, email);

        const user = await foundUser(user_name, password, email).catch(err => next(new ErrorHandler(err.message, 500)))
        // console.log(user);
        const loginUser = user[0]
        const  id  = loginUser.user_id
        const  role  = loginUser.role

        if (user) {
            res.json({
                message: 'You are logged successfuly',
                token: sign({id, role}),
                status: 200
            })
        }
    }
}