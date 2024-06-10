const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let cars = [];
let idGlobal = 0;

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.get('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(car => car.id === carId);
    if (car) {
        res.json(car);
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

app.post('/cars', (req, res) => {
    const newCar = req.body;
    newCar.id = idGlobal += 1;
    cars.push(newCar);
    res.status(201).json(newCar);
});


app.put('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const updateCar = req.body;
    const index = cars.findIndex(car => car.id === carId);
    if (index !== -1) {
        cars[index] = { ...cars[index], ...updateCar };
        res.json(cars[index]);
    } else {
        res.status(404).send('Carro não encontrado');
    }
});

app.delete('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const index = cars.findIndex(car => car.id === carId);
    if (index !== -1) {
        cars.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Carro não encontrado');
    }
});
// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 