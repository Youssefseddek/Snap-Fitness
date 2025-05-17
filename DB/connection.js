
import mysql2 from 'mysql2'      

const sql =mysql2.createConnection({
    user: 'root' ,
    password: '',
    database: 'snapfitness',
    host: 'localhost'
})

export default sql