const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("./middleware");
const { default: mongoose } = require("mongoose");
const app = express.Router();

app.get("/balance", authMiddleware, async (req, res) => {
    const { balance } = await Account.findOne({ userId: req.userId })
    res.json({
        balance
    })
})


app.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    const accountTo = req.body.to;
    const amount = req.body.amount;

    const fromAccount = await Account.findOne({ userId: req.userId }).session(session)

    // ".session(session)" indicates that the operation should be performed within the context of a specific session. This is used when you want to perform multiple operations as part of a single transaction.

    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const ToAccount = await Account.findOne({ userId: accountTo }).session(session)
    if (!ToAccount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: accountTo }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
    session.endSession();
})


module.exports = app 