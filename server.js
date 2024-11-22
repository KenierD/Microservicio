const express = require('express');
const bodyParser = require('body-parser');
const promClient = require('prom-client');
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const app = express();
const port = 3000;


collectDefaultMetrics();

app.use(bodyParser.json());

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

let productos = [
  { id: 1, nombre: 'Laptop', descripcion: 'Laptop Victus h15', precio: 1000, cantidad: 200 },
  { id: 2, nombre: 'Smartphone', descripcion: 'Smartphone 4k full hd', precio: 500, cantidad: 300 }
];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const producto = req.body;
  productos.push(producto);
  res.status(201).json(producto);
});

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex(p => p.id == id);
  if (productoIndex !== -1) {
    productos[productoIndex] = req.body;
    res.json(productos[productoIndex]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter(p => p.id != id);
  res.status(204).send();
});

module.exports = app;