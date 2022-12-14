import {fetchData} from "../../utils/postgres.js"

const FOUND_USER = 
`
    select * from users where user_name = $1 and password = crypt($2, password) and email = $3
`

export const foundUser = (user_name, password, email) => fetchData(FOUND_USER, user_name, password, email)