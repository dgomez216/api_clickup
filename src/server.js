const express = require('express');
const app = express();
const { Parametros } = require('./Back');
const cors = require('cors');

app.use(cors({origin: '*'}));

app.get('/', (_, res) => {
    res.send('Hello World!');
})

app.get('/api', async (_,res) => {
    console.log('api pensando')
    const parametros = await Parametros();
    res.json(parametros);
})


app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
})