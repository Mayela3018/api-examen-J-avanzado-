const axios = require('axios');

exports.getUsers = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        let users = response.data;

        if (req.query.city) {
            users = users.filter(u => u.address.city === req.query.city);
        }

        users = users.map(u => ({
            nombre: u.name,
            email: u.email
        }));

        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Error al consumir API" });
    }
};