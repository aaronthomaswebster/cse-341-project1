const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ error: 'User ID is required' });
    }
    const userId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(result.acknowledged !== true){
        console.log({result})
        return res.status(500).json(result.error|| 'Some error occurre while creating the user');
    }
    res.status(201).send({userId: result.insertedId});
}

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const id = req.params.id;
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    if (!id) {
      return res.status(400).send({ error: 'User ID is required' });
    }
    const userId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if(result.modifiedCount === 0){
        return res.status(500).json(result.error|| 'Some error occurre while updating the user');
    }
    res.status(204).send();
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ error: 'User ID is required' });
    }
    const userId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if(result.deletedCount === 0){
        return res.status(500).json(result.error|| 'Some error occurre while deleting the user');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}