import app from "./app.mjs";

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})