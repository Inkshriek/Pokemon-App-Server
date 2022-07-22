import Database from './Database.js';
import Express from 'express';
import CORS from 'cors';
import webpack from 'webpack';

const App = Express();
App.use( CORS() );
App.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://inkshriek.github.io/Pokemon-App/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const port = 45030;

const d = new Database();
d.connect();

App.use( Express.json() );

App.put("/pokemon/:ID", async (req, res) => {
    let result = await d.createOne(req.params.ID, req.body.name, req.body.img, req.body.team);
    res.json(result.ops);
});

App.get("/pokemon/:team", async (req, res) => {
    let result = await d.readMany(req.params.team);
    res.json(result);
    
});

App.patch("/pokemon/:ID", async (req, res) => {
    let result = await d.updateOne(req.params.ID, req.body.team, req.body.name);
    res.json(result);
    
});

App.delete("/pokemon/:ID/:team", async (req, res) => {
    let result = await d.deleteOne(req.params.ID, req.params.team);
    res.json(result);
    
});

App.listen(port, function(){
    console.log("oh neat");
});

d.close();