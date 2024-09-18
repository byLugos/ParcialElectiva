const routes = require('express').Router()
const departaments = require('./../data/departments.json')
const towns = require('./../data/towns.json')
const company = require('../data/company.js')

// Endpoint para departamentos
routes.get('/departments', (req, res) => {
    return res.send({ 'departments': departaments })
})
// Endpoint para cuidades
routes.get('/towns', (req, res) => {
    return res.send({ 'towns': towns })
})

// Endpoint para compañías
routes.get('/company', (req, res) => {
    return res.send({ 'company': company })
})

// Endpoint para agregar una nueva compañía
routes.post('/company', (req, res) => {
    const { nombre, sector, identificacion, departamento, municipio } = req.body;

    if (!nombre || !sector || !identificacion || !departamento || !municipio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    company.push({ nombre, sector, identificacion, departamento, municipio });
    res.status(201).json({ message: 'Empresa agregada correctamente.' });
})

routes.get('/', (req, res) => {
    return res.render('index', { companies: company, departaments })
})

module.exports = routes
