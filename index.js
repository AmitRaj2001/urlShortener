const express = require("express");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const morgan = require("morgan");




const app = express();
const port = 8001;


app.use(morgan("dev"));

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() =>
	console.log("connected to MongoDB")
);

app.use(express.json());

app.use("/url", urlRoute);



app.listen(port);
