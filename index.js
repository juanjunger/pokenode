/**
 * Arquivo: index.js
 * Descrição: Arquivo responsável por executar a aplicação e levantar o servidor local.
 * Data: 07/06/2020
 * Autor: Juan Junger
 */

const express = require('express')
const app = express()

app.use(express.static('public'))
app.listen(3000, () => console.log('Aplicação executando na porta 3000!'))