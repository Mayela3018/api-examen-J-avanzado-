const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// rutas
const itemsRoutes = require('./routes/itemsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use('/items', itemsRoutes);
app.use('/usuarios', usersRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    
});

