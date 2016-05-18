//var hora = new Date();

var users = { admin: {id:1, username:"admin", password:"1234", minutos: null, segundos: null },
			  pepe: {id:2, username:"pepe", password:"5678", minutos: null, segundos: null }
			};

// Comprueba si el usuario esta registrado en users
// Si autenticacion falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login, password, callback) {
	if (users[login]) {
		if (password === users[login].password){
			fecha = new Date();
			users[login].minutos = fecha.getMinutes();
			users[login].segundos = fecha.getSeconds();
			callback(null, users[login]);
		} else { callback(new Error('Password erróneo.')); }
	} else { callback(new Error('No existe el usuario.')); }
};