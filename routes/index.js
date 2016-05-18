var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', quizController.contador);
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});



// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Definición de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesion
router.get('/logout', sessionController.destroy); // destruir sesion

router.get('/quizes.:format?', quizController.contador);
router.get('/quizes.:format?', quizController.index);
router.get('/quizes/:quizId(\\d+).:format?', quizController.contador);
router.get('/quizes/:quizId(\\d+).:format?', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.contador);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.contador);
router.get('/author', quizController.author);

module.exports = router;
