
const router = require('express').Router();
const { avatarValidation, userValidation, userIdValidation } = require('../middlewares/validation');
const { getMyInfo, updateUser } = require('../controllers/users');


router.get('/me', getMyInfo);
router.patch('/me', userValidation, updateUser);


module.exports = router;