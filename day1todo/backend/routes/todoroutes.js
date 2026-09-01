const express = require('express');
const router= express.Router();

const {getTodos} = require('../Controllers/todocontrollers');
const {createTodos} = require('../Controllers/todocontrollers');
const {updateTodos} = require('../Controllers/todocontrollers');
const {deleteTodos} = require('../Controllers/todocontrollers');

router.get('/',getTodos);
router.post('/',createTodos);
router.put('/:id',updateTodos);
router.delete('/:id',deleteTodos);

module.exports = router;