import express from 'express';
import morgan from 'morgan';
import signale from 'signale';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
//cors
app.get("/", (req, res) => {
    res.status(200).send("hola amigo");
});
app.listen(3000, () => {
    signale.success("Server Online");
});
