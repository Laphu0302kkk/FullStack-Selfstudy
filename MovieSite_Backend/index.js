import app from "./server.js";
import mongodb from "mongodb";
import ReviewDAO from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_username = "laphu0302";
const mongo_password = "123";

const url=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.coh3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port =8000

MongoClient.connect(url, {
maxPoolSize: 50,
wtimeoutMS: 2500,
useNewUrlParser: true
}).catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client=>{
    await ReviewDAO.injectDB(client)
app.listen(port, ()=>{
console.log(`listening on port ${port}`)
})
})
