import { Router } from "express";
import { allEvent, bookEvent, createEvent, deleteEvent, getEVentByID, searchEvent, searchEventUserByname, updateEvent, updateUserEvent, userEvents } from "./controller/event.js";
import { auth, authAdmin } from "../../middleWear/auth.js";
const router = Router()

// get all events
router.get('/events',allEvent)


// get event by id
router.get('/eventId/:id',getEVentByID)


// create event by admin
// router.post('/event/:addedBy',createEvent)
router.post('/event',authAdmin(),createEvent)



// update event by admin
router.put('/event/update/:id',updateEvent)

// searchEventByname
router.get('/searchEvent/:name',searchEvent)

// delete user 
router.delete('/deleteEvent/:id',deleteEvent)



// ===================== user events =====================

// get all user events
router.get('/userEvents',userEvents)

// searchEventUserByname
router.get('/searchEventUserByname/:name',searchEventUserByname)

// book event
router.post('/bookEvent/:eId',auth(),bookEvent)


// update userEvent by admin
router.put('/userEvent/update/:id',updateUserEvent)





export default router