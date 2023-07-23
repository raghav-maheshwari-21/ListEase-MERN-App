const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

// @ - %40
const DB = process.env.DATABASE;
// const PORT = process.env.PORT;
require('./db/config');

const cors = require('cors');

const User = require('./db/User');
const Product = require('./db/Product');

const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());


//Token verification middleware

function  verifyToken(req,res,next){
    let token = req.headers['authorization'];
    
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"Enter valid token"})
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403).send({result:"Please add token with header"})
    }
    
}


//APIs

app.post("/register", async (req, res) => {
    let data = new User(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            res.send("Something went wrong, try again!!");
        }
        res.send({ result, auth: token });
    })
})

app.post('/login', async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.send("Something went wrong, try again!!");
                }
                res.send({ user, auth: token });
            })
        }
        else {
            res.send({ result: "No user found" })
        }
    }
    else {
        res.send({ result: "email and password not matched" })
    }
})




//add product api
app.post('/add-product' ,async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

// product list api
app.get('/products', async (req, res) => {
    let result = await Product.find();
    if (result.length >= 0) {
        res.send(result);
    }
    else {
        res.send({ result: "No product found" });
    }
});


// delete product api
app.delete('/product/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

// update product api
app.get('/update/:id', async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: 'Not found' })
    }

})

app.put('/update/:id', async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
})

// search api
app.get('/search/:key' ,async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { brand: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})




app.listen(5000);