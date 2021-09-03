const express = require('express');
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
  categoryById,
} = require('../controllers/category');
const { requiredSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post(
  '/category/create/:userId',
  requiredSignin,
  isAuth,
  isAdmin,
  create
);
router.put(
  '/category/:categoryId/:userId',
  requiredSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requiredSignin,
  isAuth,
  isAdmin,
  remove
);

router.get('/categories', list);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
