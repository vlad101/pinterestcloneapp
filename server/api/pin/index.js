'use strict';

var express = require('express');
var controller = require('./pin.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/:userId', controller.indexByUserId);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/like/:id', controller.like);
router.put('/dislike/:id', controller.dislike);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;