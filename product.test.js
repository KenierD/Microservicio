const request = require('supertest');
const app = require('./server'); 

describe('GET /productos', () => {
  it('debe devolver todos los productos', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /productos', () => {
  it('debe crear un nuevo producto', async () => {
    const producto = { id: 3, nombre: 'Zapatos', descripcion: 'Zapatos deportivos', precio: 60, cantidad: 20 };
    const res = await request(app).post('/productos').send(producto);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('nombre', 'Zapatos');
  });
});