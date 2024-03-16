const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const configuracion = new Configuration({
  apiKey: "tu_api_key"
});
const openai = new OpenAIApi(configuracion);


//Configuración del servidor
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{res.status(200).send({mensaje: 'Bienvenido a la IA de futbol'})})

//ruta de nuestro chatgpt

app.post('/chat',async (req,res)=>{
    const {pregunta} = req.body;
    const respuesta = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Solo respuestas de soccer: ${pregunta}`,
        temperature: 0,
        max_tokens: 517,
      });

      res.send(respuesta.data.choices[0].text);
})


const puerto = 80;

app.listen(puerto, ()=>{
    console.log('Tu servidor está corriendo en el puerto: '+puerto)
})
