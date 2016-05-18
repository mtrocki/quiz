var models = require('../models/models.js');
var sessionController = require('../controllers/session_controller');


// Autoload - factoriza el codigo si rute incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
//exports.index = function(req, res) {
//	models.Quiz.findAll().then(function(quizes) {
//		res.render('quizes/index', { quizes: quizes});
//	})
//};
exports.contador = function(req, res, next){
	var ahora = new Date();
	if(req.session.user){
		var inicio = req.session.user.minutos*60 + req.session.user.segundos;
		var actual = ahora.getMinutes()*60 + ahora.getSeconds();
		var conexion = actual - inicio;
		if (conexion > 120){
			res.redirect('/logout');
		} else {
			req.session.user.minutos = ahora.getMinutes();
			req.session.user.segundos = ahora.getSeconds();
			next();
		}
	} else {
		next();
	}
}

exports.index = function(req, res, next) {
	if(req.query.search){
		var search = "%"+req.query.search.replace(/ /g,"%")+"%";
		models.Quiz.findAll({where: ["pregunta like ?", search], order: ["pregunta"]}).then(function(quizes) {
			if (req.params.format === 'json'){
				res.json(quizes);
			} else {
				res.render('quizes/index', { quizes: quizes});
			}
		}).catch(function(error){
			next(error);
		});
	} else {
		models.Quiz.findAll().then(function(quizes) {
			if (req.params.format === 'json'){
				res.json(quizes);
			} else {
			res.render('quizes/index', { quizes: quizes});
		}
		}).catch(function(error){
			next(error);
		});
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	if (req.params.format === 'json'){
		res.json(req.quiz);
	} else {
		res.render('quizes/show', {quiz: req.quiz})
	}
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
	} 
	res.render('quizes/answer', {quiz: req.quiz,
		respuesta: resultado});
};

// GET /author
exports.author = function(req, res) {
	res.render('author');
};
