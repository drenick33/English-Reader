const express = require('express');
const router = express.Router();
const getAllStories = require('./controllers/getAllStories');
const getStoryById = require('./controllers/getStoryById');
const searchStories = require('./controllers/searchStories');
const deleteStoryById = require('./controllers/deleteStoryById');
const addStory = require('./controllers/addStory');
const editStory = require('./controllers/editStory');
const checkAdmin = require('../auth/checkAdmin');
const checkAuth = require('../auth/checkAuth');

//These routes start at /Stories/

//Get Methods
router.get('/', getAllStories);
router.get('/:storyId', getStoryById);

//Post methods
router.post('/search', searchStories);
router.post('/', checkAdmin, addStory);

//Patch methods
router.patch('/:storyId', checkAdmin, editStory);

//Delete methods
router.delete('/:storyId', checkAdmin, deleteStoryById);

module.exports = router;
