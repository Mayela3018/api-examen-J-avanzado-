const fs = require('fs');
const path = './data/items.json';

// leer datos
const getItems = () => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
};

// guardar datos
const saveItems = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// GET /items
exports.getAll = (req, res) => {
    const items = getItems();
    res.json(items);
};

// GET /items/:id
exports.getById = (req, res) => {
    const items = getItems();
    const item = items.find(i => i.id == req.params.id);

    if (!item) return res.status(404).json({ error: "No encontrado" });

    res.json(item);
};


exports.create = (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    const items = getItems();
    const newItem = {
        id: Date.now(),
        nombre,
        descripcion
    };

    items.push(newItem);
    saveItems(items);

    res.json(newItem);
};


exports.update = (req, res) => {
    const items = getItems();
    const index = items.findIndex(i => i.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "No encontrado" });
    }

    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: "Datos inválidos" });
    }

    items[index] = { ...items[index], nombre, descripcion };
    saveItems(items);

    res.json(items[index]);
};


exports.remove = (req, res) => {
    let items = getItems();
    const filtered = items.filter(i => i.id != req.params.id);

    if (items.length === filtered.length) {
        return res.status(404).json({ error: "No encontrado" });
    }

    saveItems(filtered);
    res.json({ mensaje: "Eliminado" });
};