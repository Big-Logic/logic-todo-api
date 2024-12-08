import express from "express";

const app = express();

app.use(express.json());


app.use("*", async(req, res) => {
    console.log('unhandle route')
})

app.use(async (req, res, err, next) => {
    console.log(err);
})

export default app;