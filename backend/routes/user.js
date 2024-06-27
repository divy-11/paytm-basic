const express = require("express");
const { Users, Account } = require("../db")
const app = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require('./config');
const { authMiddleware } = require("./middleware");

const userCheck = z.string().email();
const name = z.string();
const pass = z.string().min(6);


app.post("/signup", async (req, res) => {
    const user = userCheck.safeParse(req.body.username).success;
    const first = name.safeParse(req.body.firstName).success;
    const last = name.safeParse(req.body.lastName).success;
    const passcode = pass.safeParse(req.body.password).success;
    const sameUser = await Users.findOne({
        username: req.body.username
    })
    if (!user) {
        res.status(411).json({ message: "Invalid email address" })
    }
    else if (!(first || last)) {
        res.status(411).json({ message: "Input Field can't be empty." })
    }
    else if (!passcode) {
        res.status(411).json({ message: "Must be 5 or more characters long" })
    }
    else if (sameUser) {
        res.status(411).json({
            message: "Email already taken"
        })
    }
    else {
        const userCreate = await Users.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })
        const userId = userCreate._id; // for convinence and avoid repetation.

        const accountCreation = await Account.create({
            userId,
            balance: Math.floor(Math.random() * 1000) + 1
        })

        const token = jwt.sign({ username: req.body.username }, JWT_TOKEN);
        res.status(200).json({
            message: "User created successfully",
            token: 'Bearer ' + token
        })
    }
})


const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

app.post("/signin", async (req, res) => {
    const schemaCheck = signinSchema.safeParse(req.body).success;

    if (schemaCheck) {
        const user = await Users.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (!user) {
            res.status(401).json({
                message: "Error while logging in"
            })
        }
        else {
            const token = jwt.sign({
                userID: user._id
            }, JWT_TOKEN);

            res.status(200).json({
                token: 'Bearer ' + token,
                name: user.firstName + " " + user.lastName
            })
        }

    }
    else {
        res.json({
            message: "Incorrect inputs"
        })
    }

})

const updateSchema = z.object({
    password: z.string().optional(),
    lastName: z.string().optional(),
    firstName: z.string().optional()
})

app.put("/", authMiddleware, async (req, res) => {
    const updateSuccess = updateSchema.safeParse(req.body).success; //body mei jo aaega uska check
    if (updateSuccess) {
        await Users.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({
            message: "Updated successfully"
        })
    }
    else {
        res.status(401).json({
            message: "Error while updating information"
        })
    }
})

app.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await Users.find({
        $or: [{
            firstName: {
                "$regex": new RegExp(filter, 'i')    //for case-insensativity
            }
        }, {
            lastName: {
                "$regex": new RegExp(filter, 'i')     //$regex : used to specify a regular expression pattern for matching documents.
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = app