var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DATABASE_PROTOCOL	= url[1];
var DATABASE_DIALECT	= url[1];
var DATABASE_USER		= url[2];
var DATABASE_PASSWORD	= url[3];
var DATABASE_HOST		= url[4];
var DATABASE_PORT 		= url[5];
var DATABASE_NAME 		= url[6];
var DATABASE_STORAGE	= process.env.DATABASE_STORAGE;

// Usar BBDD SQLite o Postgress
var sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, 
	{ 	dialect: 	DATABASE_DIALECT,
		protocol: 	DATABASE_PROTOCOL,
		port: 		DATABASE_PORT,
		host: 		DATABASE_HOST,
	 	storage: 	DATABASE_STORAGE,		// solo sqlite
	 	omitNull: 	true					// solo pg
	});

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync()
.then(function() {	// sync() crea la tabla quiz
	return Quiz.count()
		.then(function(c) {
			if(c === 0) {		// la tabla se inicializa si está vacía
				return Quiz.create({ question: 'Capital de Italia', answer: 'Roma'})
				.then(function(){
					console.log('Base de datos iniciada con datos');
				});
			}
		});
}).catch(function(error) {
	console.log("Error Sincronizando las tablas de la BBDD:", error);
	process.exit(1);
});

exports.Quiz = Quiz;	// exportar definicion de tabla Quiz