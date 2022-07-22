const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');
const { getMyInfo, updateUser } = require('../controllers/users');

router.get('/users', getMyInfo);
router.patch('/users', userValidation, updateUser);

module.exports = router;
