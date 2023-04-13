const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//DB_USER=code-verse-DB
//DB_PASSWORD=6fu2IjiFCZrYrhnN



//setting up the MOngoDB server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.bhuozyz.mongodb.net/?retryWrites=true&w=majority`;
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
        const categoriesCollection = client.db('code-verse-db').collection('category');
        const courseCollection = client.db('code-verse-db').collection('course');
        const coursesCollection = client.db('code-verse-db').collection('courses');

        app.get('/category', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        }); //

        app.get('/course', async (req, res) => {
            const query = {};
            const course = await courseCollection.find(query).toArray();
            res.send(course);
        }); //

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            if (id === 'all') {
                const query = {};
                const result = await coursesCollection.find(query).toArray();
                res.send(result);
            }
            else {
                const query = { category_id: parseInt(id) };
                console.log(query);
                const result = await coursesCollection.find(query).toArray();
                res.send(result);
            }
        });

        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: id }
            const result = await coursesCollection.findOne(query);

            res.send(result);

        }); //

    }

    finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('Welcome to the Courses Collection ')
});

app.listen(port, () => {
    console.log('listening on port', port);
});