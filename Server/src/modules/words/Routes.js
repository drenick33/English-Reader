const express = require('express');
const router = express.Router();
const getAllWords = require('./controllers/getAllWords');
const getWordById = require('./controllers/getWordById');
const searchWords = require('./controllers/searchWords');
const deleteWordById = require('./controllers/deleteWordById');
const addWord = require('./controllers/addWord');
const createWordList = require('./controllers/createWordList');
const getAllWordLists = require('./controllers/getAllWordLists');
const getWordListById = require('./controllers/getWordListById');
const editWordList = require('./controllers/editWordList');
const deleteWordListById = require('./controllers/deleteWordListById');
const editWord = require('./controllers/editWord');
const checkAuth = require('../auth/checkAuth');
const wordTranslate = require('./controllers/wordTranslate');
const addWordToUser = require('./controllers/addWordToUser');
const removeWordFromUser = require('./controllers/removeWordFromUser');
//These routes start at /words/

//Get Methods
router.get('/', getAllWords);
router.get('/list', getAllWordLists);
router.get('/:wordId', getWordById);
router.get('/list/:listId', getWordListById);
router.get('/translate/:word', wordTranslate);
//router.get('/list/:_id, getWordListById)

//Post methods
router.post('/', addWord);
router.post('/list', checkAuth, createWordList);
router.post('/search', searchWords);

//Patch methods
//router.patch('/list/:listId', addWordToList); //Patch since we'll be adding to an array
router.patch('/list/:listId', editWordList);
router.patch('/:wordId', editWord);
router.patch('/user/:userId', addWordToUser);
router.patch('/user/remove/:userId', removeWordFromUser);

//Delete methods
router.delete('/:wordId', deleteWordById);
router.delete('/list/:listId', deleteWordListById);

module.exports = router;
