import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import * as assert from "assert";
export namespace Firework {
    let server: Http.Server = Http.createServer();
    // let rockets: Mongo.Collection;
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;
    const dbName: string = "rockets";
    let databaseUrl: string = "mongodb+srv://AmandaAuer:Aimiainidiai18!@firework.qkegs.mongodb.net/Firework?retryWrites=true&w=majority";
    connectToDatabase(databaseUrl);
    console.log("Server starting on port:" + port);

    server.listen(port);
    server.addListener("request", handleRequest);
    // tslint:disable-next-line:no-any
    let response: any = {};
    // tslint:disable-next-line:no-any
    let db: any;
    async function connectToDatabase(_url: string): Promise<void> {
    try {
      let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
      let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
      await mongoClient.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db = mongoClient.db(dbName);
  });
    } catch (e) {
      console.log(e);
    }
}
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {


        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let jsonString: string = "";
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
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
    async function AddRocket(response: object): Promise<void> {
    try {
      // tslint:disable-next-line:typedef
      const collection = db.collection("rocket");
      collection.insertMany([response]);
    } catch (e) {
      console.log("L65", e);
      }
  }

    // tslint:disable-next-line:no-any
    async function GetAll( _response: Http.ServerResponse): Promise<void> {
      try {
           let results: Mongo.Cursor = db.collection("rocket").find();
           let rockets: string[] = await results.toArray();
        
           for (let recipe of rockets) {
           for (let key in Object(recipe)) {
               _response.write(key + " : " + Object(recipe)[key] + "\n");
           }
           _response.write("\n"); 
        }
          //  _response.end();
        } catch (e) {
          console.log("L80", e);
        }
    }
}