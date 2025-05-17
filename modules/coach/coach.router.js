
import { Router } from "express";
import { HME, myMulter, validationTypes } from "../../services/multer.js";
import { allCoaches, allCoachesByAdmin, coachSignin, deleteCoach, deleteCoachByAdmin, getCocahByIdByAdmin, getPlanByCoachId, getPlanById, getPlans, searchCoachByname, updateCoachByAdmin, updatePlan} from "./controller/coach.js";
import { getCocahById } from "./controller/coach.js";
import { updateCoach } from "./controller/coach.js";
import { addCoach } from "./controller/coach.js";
import { auth, authCoach } from "../../middleWear/auth.js";

const router = Router()

// coach sign in 
router.post('/coach/signin', coachSignin)


// get all coaches
router.get('/coaches',allCoaches)

// get all coaches by admin
router.get('/coachesbyadmin',allCoachesByAdmin)


// get Cocah By Id By Admin
router.get('/coachbyid/:id',getCocahByIdByAdmin)


// getCocahById
router.get('/coach',authCoach(),getCocahById)

// add coach
router.post('/coach',myMulter("coaches",validationTypes.images).single("image"),HME, addCoach)


// update coach by admin
router.patch('/updateCoachByAdmin/:id',myMulter("coaches",validationTypes.images).single("image"),HME, updateCoachByAdmin)


// update coach
router.patch('/updateCoach',authCoach(),myMulter("coaches",validationTypes.images).single("image"),HME, updateCoach)


// delete coach by admin
router.delete('/deleteCoachByAdmin/:id', deleteCoachByAdmin)

// delete coach
router.delete('/coach',authCoach(), deleteCoach)

// searchCoachByname
router.get('/searchCoachByname/:name',searchCoachByname)


// ==============================================================
// plan
router.patch('/updatePlan/:id',myMulter("plans",validationTypes.images).single("plan"),updatePlan)
// router.patch('/updatePlan',auth(),myMulter("plans",validationTypes.images).single("plan"),updatePlan)

// get users plan 
router.get('/getPlans',getPlans)

// coach get plan by his id
router.get('/getPlanBycoachId',authCoach(),getPlanByCoachId)

//  get plan by  id
router.get('/getPlanById/:id',getPlanById)

export default router