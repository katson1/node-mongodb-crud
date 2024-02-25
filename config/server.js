import express from "express";
import routes from "../app/routes/routes.js";
import { connectToDatabase } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

//a middleware to parse URL-encoded data.
app.use(express.urlencoded({ extended: true }));
//configures the 'public' directory as a static directory, making files within it publicly accessible.
app.use(express.static('public'));

app.use('/', routes);

export const startServer = async () => {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};
