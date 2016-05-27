var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload de rutas que usen :quizId
router.param('quizId', 								quizController.load);	// autoload :quizId
router.param('userId', 								userController.load);	// autoload :userId
router.param('commentId',							commentController.load);	//autoload :commentId	

// Definicion de rutas de sesion
router.get('/session',								sessionController.new);
router.post('/session',								sessionController.create);
router.delete('/session',							sessionController.destroy);

// Definicion de rutas de cuenta
router.get('/users',								userController.index);		// Listado de usuarios
router.get('/users/:userId(\\d+)',					userController.show);		// Ver un usuario
router.get('/users/new',							userController.new);		// Formulario sign in
router.post('/users',								userController.create);		// Registrar usuario
router.get('/users/:userId(\\d+)/edit',				sessionController.loginRequired, userController.edit);		// Editar cuenta
router.put('/users/:userId(\\d+)',					sessionController.loginRequired, userController.update);		// Actualizar cuenta
router.delete('/users/:userId(\\d+)',				sessionController.loginRequired, userController.destroy);	// Borrar cuenta

// Definición de rutas de /quizzes
router.get('/quizzes.:format?',						quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',		quizController.show);
router.get('/quizzes/:quizId(\\d+)/check',			quizController.check);
router.get('/quizzes/new',							sessionController.loginRequired, quizController.new);
router.post('/quizzes',								sessionController.loginRequired, quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',			sessionController.loginRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)',				sessionController.loginRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)',				sessionController.loginRequired, quizController.destroy);

// Definicion de rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',	sessionController.loginRequired, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',		sessionController.loginRequired, commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept',
													sessionController.loginRequired, commentController.accept);

// Ruta a creditos
router.get('/author', 								quizController.author);



module.exports = router;
