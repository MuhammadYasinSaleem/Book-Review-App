import app from "./app.js";


app.listen(process.env.PORT, () => {
    console.log(`Server listening at Port ${process.env.PORT}`);
}).on("error", (err) => {
    console.error(`Server failed to start: ${err.message}`);
});
