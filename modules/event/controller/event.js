import sql from "../../../DB/connection.js";


// get all events
export const allEvent = (req, res) => {
    sql.execute(`select * from events`,
        (err, result) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}


// get event by id
export const getEVentByID = (req, res) => {
    const { id } = req.params
    sql.execute(`select * from events where id = ${id}`,
        (err, result) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                res.json({ message: 'Done', result })
            }
        })
}


// create event by admin
export const createEvent = (req, res, next) => {
    console.log("yessssss");
    const { id } = req.authUser
    const { eventName, description, price, status } = req.body
    sql.execute(`insert into events (eventName,description, price , status ,addedBy )
    values('${eventName}','${description}',${price},'${status}',${id})`,
        (err, result) => {
            if (err) {
                res.json({ message: 'query error', err })
            } else {
                res.json({ message: 'Done', result })

            }
        })
}


// update event
export const updateEvent = (req, res) => {
    const { id } = req.params
    const { eventName,date, description, price, status } = req.body
    sql.execute(`update  events 
    set eventName ='${eventName}',date ='${date}', description='${description}' , price=${price} ,
    status='${status}'
    where id = ${id}`,
        (err, result) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                if (result.affectedRows) {
                    res.json({ message: 'Done', result })

                } else {
                    res.json({ message: 'In-valid data' })
                }
            }
        })
}


// searchEventByname
export const searchEvent = (req,res,next)=>{
    const {name} = req.params
    sql.execute(`select * from events where eventName like "%${name}%"`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}



// delete event 
export const deleteEvent = (req, res, next) => {
    const { id } = req.params
    sql.execute(`delete from events where id=${id}`, (err, result, fields) => {
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




// ===================== user events =====================
// SELECT
//   student.first_name,
//   student.last_name,
//   course.name
// FROM student
// JOIN student_course
//   ON student.id = student_course.student_id
// JOIN course
//   ON course.id = student_course.course_id;
// get all user events
// userName , products.name
export const userEvents = (req, res) => {
    const { uId,eId } = req.params
    sql.execute(`select * from users join userevents on users.Id = userevents.u_id 
    join events on events.id = userevents.e_id`,
        (err, result) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                console.log(result);
                res.json({ message: 'Done', result })
            }
        })
}


// searchEventUserByname
export const searchEventUserByname = (req,res,next)=>{
    console.log("yes");
    const {name} = req.params
    sql.execute(`select * from users join userevents on users.Id = userevents.u_id 
    join events on events.id = userevents.e_id where eventName like "%${name}%"`,
    (err,result,fields)=>{
        if (err) {
            res.json({message:'Query error',err})
        } else {
            res.json({message:'Done',result})
        }
    })
}


// book event
export const bookEvent = (req, res, next) => {
    console.log("okkkkkkk");

    const { eId } = req.params
    const { id } = req.authUser
    console.log(eId);
    console.log(id);
    // const {address,phone} =req.body
        
    sql.execute(`select * from userevents where u_id = ${id} and e_id = ${eId}`,
        (err, result1) => {
            if (err) {
                console.log(result1);
                res.json({ message: 'query error', err })
            } else if (result1.length === 0) {
                sql.execute(`insert into userevents (u_id,e_id)
                values(${id},${eId})`,
                    (err, result) => {
                        if (err) {
                            res.json({ message: 'query error', err })
                        } else {
                            res.json({ message: 'Done', result })
            
                        }
                    })
            
            } else {
                res.json({ message: 'already booked', result1 })

            }
        })


}

// update userEvent by admin
export const updateUserEvent = (req, res) => {
    const { id } = req.params
    const { attendance } = req.body
    sql.execute(`update  userevents 
    set attendance = ${attendance} where id = ${id}`,
        (err, result) => {
            if (err) {
                res.json({ message: 'Query error', err })
            } else {
                if (result.affectedRows) {
                    res.json({ message: 'Done', result })

                } else {
                    res.json({ message: 'In-valid data' })
                }
            }
        })
}