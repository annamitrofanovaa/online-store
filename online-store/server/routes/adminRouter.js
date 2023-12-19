const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.post('/assignRole', (req, res, next) => AdminController.assignRole(req, res, next));

module.exports = router;
