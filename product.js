const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let idProduct = 3;
let idGroup = 0;
let idSubGroup = 0;
let idUnit = 0;
let idBrand = 0;

let database = require("./objects.json");

app.get('/product', (req, res) => {
    res.json(database.produto);
});

app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = database.find(car => car.id === productId);
    if (product) {
        res.json(database);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.post('/product', (req, res) => {
    const newProduct = req.body;
    const subgrupoExists = database.produtoSubgrupo.some(subgrupo => subgrupo.id === newProduct.idProdutoSubgrupo);
    const marcaExists = database.produtoMarca.some(marca => marca.id === newProduct.idProdutoMarca);
    const unidadeExists = database.produtoUnidade.some(unidade => unidade.id === newProduct.idProdutoUnidade);

    if (!subgrupoExists) {
        return res.status(400).send({ error: 'Subgrupo informado não existe' });
    }

    if (!marcaExists) {
        return res.status(400).send({ error: 'Marca informada não existe' });
    }

    if (!unidadeExists) {
        return res.status(400).send({ error: 'Unidade informada não existe' });
    }

    newProduct.id = idProduct += 1;
    database.produto.push(newProduct);
    res.status(201).json(newProduct);
});


app.put('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updateProduct = req.body;
    const index = database.produto.findIndex(product => product.id === productId);
    const subgrupoExists = database.produtoSubgrupo.some(subgrupo => subgrupo.id === updateProduct.idProdutoSubgrupo);
    const marcaExists = database.produtoMarca.some(marca => marca.id === updateProduct.idProdutoMarca);
    const unidadeExists = database.produtoUnidade.some(unidade => unidade.id === updateProduct.idProdutoUnidade);

    if (!subgrupoExists) {
        return res.status(400).send({ error: 'Subgrupo informado não existe' });
    }

    if (!marcaExists) {
        return res.status(400).send({ error: 'Marca informada não existe' });
    }

    if (!unidadeExists) {
        return res.status(400).send({ error: 'Unidade informada não existe' });
    }
    if (index !== -1) {
        database.produto[index] = { ...database.produto[index], ...updateProduct };
        res.json(database[index]);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.delete('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = database.produto.findIndex(product => product.id === productId);
    if (index !== -1) {
        database.produto.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 