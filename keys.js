module.exports = {
    // var MongoClient = require('mongodb').MongoClient;
    
    mongoURI : `mongodb://neveleneves:seveneleven711@wishloot-cluster-shard-00-00.yqr7u.mongodb.net:27017,wishloot-cluster-shard-00-01.yqr7u.mongodb.net:27017,wishloot-cluster-shard-00-02.yqr7u.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-pgs0op-shard-0&authSource=admin&retryWrites=true&w=majority`
    // MongoClient.connect(uri, function(err, client) {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });
    
}