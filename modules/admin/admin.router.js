
import { Router } from "express";
import { AdminThatLoggedIn, adminUpdateHisInfo, createAdmin, deleteAdmin, getAdminById, getAdmins, searchAdmin, signin ,updateAdmin} from "./conroller/admin.js";
import { authAdmin } from "../../middleWear/auth.js";


const router = Router()

router.post('/signin', signin)

// get all Admins
router.get('/getAdmins',getAdmins)

// get  Admin by id
router.get('/getAdminById/:id',getAdminById)

// get  Admin that is loged in
router.get('/adminInfo',authAdmin(),AdminThatLoggedIn)

// create admin by admin
router.post('/admin',createAdmin)


// update Admin
router.patch('/admin/update/:id', updateAdmin)


// update  Admin that is loged in
router.patch('/adminUpdateHisInfo',authAdmin(), adminUpdateHisInfo)


// search Admin by name
router.get('/searchAdmin',authAdmin(),searchAdmin)


// delete Admin 
router.delete('/deleteAdmin/:id', deleteAdmin)
// router.delete('/deleteAdmin',authAdmin(), deleteAdmin)










// get all product
// router.get('/admins',allAdmins)






export default router