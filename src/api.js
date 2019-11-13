const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

router.get('/',(rez,res)=>
{
    res.json({
        'hello':'hii'
    });
});

app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app);
