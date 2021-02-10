"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firework = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
const assert = require("assert");
var Firework;
(function (Firework) {
    let server = Http.createServer();
    // let rockets: Mongo.Collection;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    const dbName = "rockets";
    let databaseUrl = "mongodb+srv://AmandaAuer:Aimiainidiai18!@firework.qkegs.mongodb.net/Firework?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);
    console.log("Server starting on port:" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    // tslint:disable-next-line:no-any
    let response = {};
    // tslint:disable-next-line:no-any
    let db;
    async function connectToDatabase(_url) {
        try {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            await mongoClient.connect(function (err) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                db = mongoClient.db(dbName);
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let jsonString = "";
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                response[key] = url.query[key];
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        console.log(response);
        AddRocket(response);
        // tslint:disable-next-line:no-any
        await GetAll(_response);
        // _response.write(rockets)
        _response.end();
    }
    async function AddRocket(response) {
        try {
            // tslint:disable-next-line:typedef
            const collection = db.collection("rocket");
            collection.insertMany([response]);
        }
        catch (e) {
            console.log("L65", e);
        }
    }
    // tslint:disable-next-line:no-any
    async function GetAll(_response) {
        try {
            // // tslint:disable-next-line:typedef
            // const collection = db.collection("rocket");
            // // tslint:disable-next-line:no-any
            // const rockets: any[] = await collection.find();
            // // return rockets;
            // // _response.write(rockets);
            // console.log(rockets);
            // _response.end();
            let results = db.collection("rocket").find();
            let rockets = await results.toArray();
            for (let recipe of rockets) {
                for (let key in Object(recipe)) {
                    _response.write(key + " : " + Object(recipe)[key] + "\n");
                }
                _response.write("\n");
            }
            //  _response.end();
        }
        catch (e) {
            console.log("L80", e);
        }
    }
})(Firework = exports.Firework || (exports.Firework = {}));
//# sourceMappingURL=app.js.map