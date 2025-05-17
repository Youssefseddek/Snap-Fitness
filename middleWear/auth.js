import sql from "../DB/connection.js";
import jwt from 'jsonwebtoken'


// user
export const auth = ()=>{
    return async (req,res,next)=>{
        try {
            const {token} = req.headers
            console.log({"gggggggg":token});
           
               const decoded = jwt.verify(token,"hamada")
               if (!decoded || !decoded.id || !decoded.isLoggedIn) {
                   res.json({message:"In-valid token payload"})
               } else {
                console.log(decoded);
                console.log(decoded.id);
                sql.execute(`select * from users where id = ${decoded.id}`,
                (err,result,fields)=>{
                    console.log(result);
                    console.log(!result);
                    if (result.length === 0) {
                        res.json({message:"not register user"})
                    } else {
                        console.log("aaaaaaaaaaaaaa");
                        req.authUser = result[0]
                        next()
                    }
                })

               }
            
    
        } catch (error) {
            res.status(500).json({message:"catch ",error})
        }

    }
}

// coach
export const authCoach = ()=>{
    return async (req,res,next)=>{
        try {
            const {token} = req.headers
            console.log({"gggggggg":token});
           
               const decoded = jwt.verify(token,"hamada")
               if (!decoded || !decoded.id || !decoded.isLoggedIn) {
                   res.json({message:"In-valid token payload"})
               } else {
                console.log(decoded);
                console.log(decoded.id);
                sql.execute(`select * from coaches where id = ${decoded.id}`,
                (err,result,fields)=>{
                    console.log(result);
                    console.log(!result);
                    if (result.length === 0) {
                        res.json({message:"not register user"})
                    } else {
                        console.log("aaaaaaaaaaaaaa");
                        req.authUser = result[0]
                        next()
                    }
                })

               }
            
    
        } catch (error) {
            res.status(500).json({message:"catch ",error})
        }

    }
}


// admin
export const authAdmin = ()=>{
    return async (req,res,next)=>{
        try {
            const {token} = req.headers
            console.log({"gggggggg":token});
           
               const decoded = jwt.verify(token,"hamada")
               if (!decoded || !decoded.id || !decoded.isLoggedIn) {
                   res.json({message:"In-valid token payload"})
               } else {
                console.log(decoded);
                console.log(decoded.id);
                sql.execute(`select * from admin where id = ${2}`,
                (err,result,fields)=>{
                    console.log({"aaaaaaa":result});
                    console.log({"bbbbbbb":!result});
                    console.log({"cccccccc":result.length === 0});
                    if (result.length === 0) {
                        res.json({message:"not register user"})
                    } else {
                        console.log("aaaaaaaaaaaaaa");
                        req.authUser = result[0]
                        next()
                    }
                })

               }
            
    
        } catch (error) {
            res.status(500).json({message:"catch ",error})
        }

    }
}


