const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

/**
 * shimul191002110
   pass: EAGewiXDbfqodLnH
 */


const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const uri = "mongodb+srv://shimul191002110:EAGewiXDbfqodLnH@cluster0.6g3butq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        //Connect the client to the server	(optional starting in v4.7)

        //simple database and collection part
        await client.connect();
        // const database = client.db("usersDB");
        // const userCollection = database.collection("users");


        //another database and collection create part
        const UserCollection=client.db("userDB").collection("users")
        app.get('/user', async(req, res) => {
            const cursor=UserCollection.find();
            const result = await cursor.toArray()
            res.send(result);

        })
        
        app.post('/user', async(req, res) => {
            const user = req.body;
            console.log("new user",user);
            const result = await UserCollection.insertOne(user);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Simple-Curd-Server is Running")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})