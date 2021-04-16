const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares (funciones que se ejecutan al levantar el servidor)
        this.conectarDB();


        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {



        //CORS  
        this.app.use(cors());

        //lectura y Parseo a json
        this.app.use(express.json());

        //Directoro publico
        this.app.use(express.static('public'));
    }

    //200> OK
    //300> Redirecciones
    //400> Client Error
    //500> Server Error

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server en ", this.port);
        });
    }

}

module.exports = Server;