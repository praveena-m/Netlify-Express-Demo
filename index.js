const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "test1" },
    { id: 2, name: "cfds" },
    { id: 3, name: "tefgdfdfgfdgst1" }
];

app.get('/', (req, res) => {
    res.send('Hello Workd');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if (!course)
        res.status(404).send('Course with given id not present')
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()


    }

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        // 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening in ${port}`));