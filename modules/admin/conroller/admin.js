import sql from "../../../DB/connection.js"
import jwt from 'jsonwebtoken'



// signin
export const signin = (req, res, next) => {
    const { email, password } = req.body
    sql.execute(`select * from admin where email ='${email}' and password='${password}'`,
        (err, result) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                if (result.length) {
                    const token = jwt.sign({ id: result[0].id, adminName: result[0].name, isLoggedIn: true }, process.env.JWT_SECRET, { expiresIn: (60 * 60) * 24 })
                    res.json({ message: 'Done', result, token })

                } else {
                    res.json({ message: 'In-Valid account' })

                }
            }
        })
}



// get all Admins
export const getAdmins = (req, res, next) => {

    sql.execute(`select * from admin `,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}


// get  Admin by id
export const getAdminById = (req, res, next) => {
    const { id } = req.params
    sql.execute(`select * from admin where id = ${id}`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}


// get  Admin that is loged in
export const AdminThatLoggedIn = (req, res, next) => {
    // const { id } = req.params
    const {id} = req.authUser
    sql.execute(`select * from admin where id = ${id}`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}



// create admin by admin
export const createAdmin = (req, res, next) => {
    const { name, email, password } = req.body
    console.log(email);
    sql.execute(`select * from admin where email = '${email}'`,
        (err, result, fields) => {
            console.log(result);
            if (err) {
                res.json({ message: 'Query error', err })
            } else if (result.length === 0) {
                sql.execute(`insert into admin (name, email,password)
                values('${name}','${email}','${password}')`,
                    (err, result) => {
                        if (err) {
                            res.json({ message: 'query error', err })
                        } else {
                            res.json({ message: 'Done', result })

                        }
                    })
            }else {
                res.json({ message: 'email exist', result })
            }
        })



}


// password = '${password}'
// update Admin
export const updateAdmin = (req, res, next) => {
    const { id } = req.params
    const { name, email } = req.body

    sql.execute(`update admin set name ='${name}' , email = '${email}'  where id = ${id}`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                if (result.affectedRows) {
                    res.json({ message: 'Done', result })

                } else {
                    res.json({ message: 'In-Valid account', result })
                }
            }
        })
}


// update Admin
export const adminUpdateHisInfo = (req, res, next) => {
    const { id } = req.authUser
    const { name, email ,password } = req.body

    sql.execute(`update admin set name ='${name}' , email = '${email}' ,password = '${password}'  where id = ${id}`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                if (result.affectedRows) {
                    res.json({ message: 'Done', result })

                } else {
                    res.json({ message: 'In-Valid account', result })
                }
            }
        })
}



// search Admin by name
export const searchAdmin = (req, res, next) => {
    // const {name} = req.params
    const { adminName } = req.authUser
    sql.execute(`select * from admin where name like "%${adminName}%"`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}



// delete Admin 
export const deleteAdmin = (req, res, next) => {
    const { id } = req.params
    // const { id } = req.authUser
    sql.execute(`delete from admin where id=${id}`, (err, result, fields) => {
        if (err) {
            res.json({ message: 'Query error', err })
        } else {
            if (result.affectedRows) {
                res.json({ message: 'Done', result })

            } else {
                res.json({ message: 'In-Valid account', result })
            }
        }
    })
}









// get all admins
// export const allAdmins=(req,res)=>{
//     sql.execute(`select * from admin`,
//     (err,result)=>{
//         if (err) {
//             res.json({message:'Query error',err})
//         } else {
//             res.json({message:'Done' ,result})
//         }
//     })
// }








