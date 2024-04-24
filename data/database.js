const dontenv = require('dotenv');
dontenv.config();


const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = ( callback) => {
    if(database){
        console.warn('Trying to init DB again!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    }).catch((err) => {
        console.log(err);
        callback(err);
    });
}

const getDatabase = () => {
    if(!database){
        throw 'Db has not been initialized. Please call init first.';
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase
}