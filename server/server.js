require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const base_url = 'https://api.telegram.org'

app.use(require('body-parser').json())

app.get('/', (request, response) => {
    response.send('Hello, world!')
})

app.post('/handler', (request, response) => {
    console.log(request.body)
    console.log('It is alive!')
    axios.post(base_url + '/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage', {chat_id: request.body.message.chat.id, text: 'Hello!'})
        .then((resp) => {
            console.log('success')
        })
        .catch((error) => {
            console.log(error)
        })
    response.send('Success')
})

app.post('/:token/setWebhook', (request, response) => {
    console.log(request.body.url)
    if (request.body && request.body.url && request.params.token === process.env.TELEGRAM_BOT_TOKEN) {
        axios.post(base_url + '/bot' + request.params.token + '/setWebhook', {url: request.body.url})
            .then((resp) => {
                console.log(resp.status)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    response.send('Ok')
})

app.listen(port, () => {
    console.log(process.env.TELEGRAM_BOT_TOKEN)
    console.log('Server started')
})