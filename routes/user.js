const express = require('express');
const router = express.Router();

const { requiredSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update } = require('../controllers/user');

router.get('/secret/:userId', requiredSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get('/user/:userId', requiredSignin, isAuth, read);
router.put('/user/:userId', requiredSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;
