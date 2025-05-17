import sql from "../../../DB/connection.js"
import jwt from 'jsonwebtoken'
import cloudinary from "../../../services/cloudinary.js"

// coach sign in 
export const coachSignin = (req, res, next) => {
    const { email, password } = req.body
    sql.execute(`select * from coaches where email ='${email}' and password='${password}'`,
        (err, result) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                if (result.length) {
                    const token = jwt.sign({id:result[0].id,coachName:result[0].name,isLoggedIn:true},'hamada',{expiresIn:(60*60)*24})
                    res.json({ message: 'Done', result ,token })

                } else {
                    res.json({ message: 'In-Valid account' })

                }
            }
        })
}



// get all coaches
export const allCoaches=(req,res)=>{
    sql.execute(`select * from coaches where status = "available"`,
    (err,result)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done' ,result})
        }
    })
}
// get all coaches by admin
export const allCoachesByAdmin=(req,res)=>{
    sql.execute(`select * from coaches `,
    (err,result)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done' ,result})
        }
    })
}



// get Cocah By Id By Admin
export const getCocahByIdByAdmin = (req,res,next)=>{
    const {id} = req.params
    sql.execute(`select * from coaches where id = ${id}`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}

// get coach by id
export const getCocahById = (req,res,next)=>{
    // const {id} = req.params
    const {id} = req.authUser
    sql.execute(`select * from coaches where id = ${id}`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}


// add coach
export const addCoach = async(req, res, next) => {
    const { name, price, exp ,email,password,age} = req.body
    console.log(req.body);
    console.log(req.file);

    sql.execute(`select * from users where email ='${email}' `,
    (err, result) => {
        console.log(result);
        console.log(result.length === 0);
        if (result.length === 0) {
            
            if (!req.file) {
                res.status(400).json({ message: "please ulpoad your image" })
            } else {
                // const { secure_url } = await cloudinary.uploader.upload(req.file.path,
                //     { folder: `coach` }
                // )
                const secure_url = req.file.destination + "/" + req.file.filename
                console.log(secure_url);
        
            sql.execute(`insert into coaches (name, price, exp ,email,password,image,age)
            values('${name}',${price},'${exp}','${email}','${password}','${secure_url}',${age})`,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ message: 'query error', err })
                    } else {
                        // console.log(req.file);
                        res.json({ message: 'Done', result })
        
                    }
                })
            }

        } else {
            res.json({ message: 'account already exists' })
        }
    })

  
}




// update coach by admin
export const updateCoachByAdmin = async(req, res, next) => {
    const { id } = req.params
    const {name,email, price, exp ,age,status } = req.body
        console.log(req.body);
        if (!req.file) {
        console.log("admin",req.file);
        // res.status(400).json({ message: "please ulpoad your image" })
        sql.execute(`update coaches set name ='${name}'  , price = ${price} ,exp = ${exp} , age = ${age} , status ='${status}' where id = ${id}`,
    (err, result, fields) => {
        if (err) {
            res.json({ message: 'query error', err })
        } else {
            console.log(result.affectedRows);
            if (result.affectedRows) {
                res.json({ message: 'Done', result })

            } else {
                res.json({ message: 'In-Valid account', result })
            }
        }
    })
    } else {
        // const { secure_url } = await cloudinary.uploader.upload(req.file.path,
        //     { folder: `coach/${id}` }
        // )
        const secure_url = req.file.destination + "/" + req.file.filename

        sql.execute(`update coaches set name ='${name}' , price = ${price} ,exp = ${exp} , age = ${age} , image = '${secure_url}', status ='${status}' where id = ${id}`,
            (err, result, fields) => {
                if (err) {
                    res.json({ message: 'query error', err })
                } else {
                    console.log(result.affectedRows);
                    if (result.affectedRows) {
                        res.json({ message: 'Done', result })
    
                    } else {
                        res.json({ message: 'In-Valid account', result })
                    }
                }
            })
    }

    
}


// update coach
export const updateCoach = async(req, res, next) => {
    // const { id } = req.params
    const { id } = req.authUser
    const {name, exp ,age ,status } = req.body
        console.log(req.body);
        console.log(req.file,"hhhhhhhhhhhhhhh");
    if (!req.file) {
        // res.status(400).json({ message: "please ulpoad your image" })
        sql.execute(`update coaches set name ='${name}'  ,exp = ${exp} , age = ${age} , status ='${status}' where id = ${id}`,
        (err, result, fields) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                console.log(result.affectedRows);
                if (result.affectedRows) {
                    res.json({ message: 'Done', result })

                } else {
                    res.json({ message: 'In-Valid account', result })
                }
            }
        })
    } else {
        // const { secure_url } = await cloudinary.uploader.upload(req.file.path,
        //     { folder: `coach/${id}` }
        // )
        const secure_url = req.file.destination + "/" + req.file.filename

        sql.execute(`update coaches set name ='${name}'  ,exp = ${exp} , age = ${age} , image = '${secure_url}', status ='${status}' where id = ${id}`,
            (err, result, fields) => {
                if (err) {
                    res.json({ message: 'query error', err })
                } else {
                    console.log(result.affectedRows);
                    if (result.affectedRows) {
                        res.json({ message: 'Done', result })
    
                    } else {
                        res.json({ message: 'In-Valid account', result })
                    }
                }
            })
    }
}


// delete coach by admin
export const deleteCoachByAdmin = (req, res, next) => {
    const { id } = req.params
    sql.execute(`delete from coaches where id=${id}`, (err, result, fields) => {
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

// delete coach
export const deleteCoach = (req, res, next) => {
    // const { id } = req.params
    const { id } = req.authUser
    sql.execute(`delete from coaches where id=${id}`, (err, result, fields) => {
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


// searchCoachByname
export const searchCoachByname = (req,res,next)=>{
    console.log("yes");
    const {name} = req.params
    sql.execute(`select * from coaches where name like "%${name}%"`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}



// ======================================
// coach edite plan
export const updatePlan = async(req,res)=>{
    const {id} = req.params
   
    // const {months} = req.body
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
        res.status(400).json({ message: "please ulpoad your image" })
    } else {
            // const { secure_url } = await cloudinary.uploader.upload(req.file.path,
            //     { folder: `plans` }
            // )

            const secure_url = req.file.destination + "/" + req.file.filename
            sql.execute(`update plans set plan ='${secure_url}'  where p_id = ${id}`,

        (err,result)=>{
            if (err) {
                console.log(err);
                res.json({message:'Query error',err})
            } else {
                console.log(result);
                if (result.affectedRows) {
                    console.log(result.affectedRows);
                    res.json({message:'Done' ,result})
                } else {
                    res.json({message:'In-valid data' })
                }
            }
        })
    }
}




// get users plan 
export const getPlans=(req,res)=>{
    sql.execute(`select * from plans`,
    (err,result)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            console.log({"haaaaaaaaaaaaa":result});
            res.json({message:'Done' ,result})
        }
    })
}


// select * from plans join users on plans.userId = users.id join coaches on coaches.id = plans.coachId where coachId =
// select * from plans where coachId = ${id}
// coach get plan by his id
export const getPlanByCoachId = (req,res,next)=>{
    // const {id} = req.params
    const {id} = req.authUser
    console.log("yyyyyyyyyyyyy");
    sql.execute(`select * from plans join users on plans.userId = users.id join coaches on coaches.id = plans.coachId where coachId = ${id}`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            console.log(result);
            res.json({message:'Done',result})
        }
    })
}


// coach get plan by id
export const getPlanById = (req,res,next)=>{
    const {id} = req.params
    sql.execute(`select * from plans where p_id = ${id}`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}




