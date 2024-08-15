require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const LoginRoutes = require("./Routes/LoginRoutes.js");
const StockRoutes = require("./Routes/StockMangementRoute.js");
const BillingsRoute = require("./Routes/BillingsRoute.js");
const DashboardRoute = require("./Routes/DashboardRoute.js");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://demostockmanagement.vercel.app/"
}));

app.use("/api", LoginRoutes);
app.use("/api", StockRoutes);
app.use("/api", BillingsRoute);
app.use("/api", DashboardRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("DB Connected & Listening PORT: " + process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })