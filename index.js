import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import productRouter from './modules/product/product.router.js'
import coachRouter from './modules/coach/coach.router.js'
import adminRouter from './modules/admin/admin.router.js'
import userRouter from './modules/user/user.router.js'
import eventRouter from './modules/event/event.router.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())


app.use( express.static('./uploads'))
app.use(productRouter)
app.use(coachRouter)
app.use(adminRouter)
app.use(userRouter)
app.use(eventRouter)
app.get('*',(req,res,next)=>{
    res.json({message:'error 404 Not Found Page'})
})


app.listen(3000,()=>{
    console.log('running..........');
})