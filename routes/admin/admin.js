var express = require('express');
var router = express.Router();
var passport = require('passport')
var { signUp, login, updateProfile, getAllUsersProfile, createUser, deleteUser, updateUser }
    = require('./controller/adminController')


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/sign-up", signUp)
router.post("/login", login)
router.put('/update-profile', passport.authenticate("jwt-admin", { session: false }), updateProfile)

//admin user control section 
router.post('/create-user',
    passport.authenticate("jwt-admin", { session: false }),
    createUser
    )
router.delete('/delete-user',
    passport.authenticate("jwt-admin", { session: false }),
    deleteUser)
router.put('/update-user',
    passport.authenticate("jwt-admin", { session: false }),
    updateUser)

router.get(
    '/all-users-profile',
    passport.authenticate("jwt-admin", { session: false }),
    getAllUsersProfile
)
module.exports = router;
