import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
})

export const fetchData = async(SQL, ...params) => {
    const client = await pool.connect()  

    try{
        const { rows } = await client.query(SQL, params ? params : null)
        return rows
    }finally{
        client.release()
    }
}