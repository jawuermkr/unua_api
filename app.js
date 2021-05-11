const express =  require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySQL creamos la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asiste.2020',
    database: 'nodeapi'
});

// Rutas
app.get('/', (req, res)=> {
    res.send('Saluton Mondo!');
});

// Todos los clientes
app.get('/clientes', (req, res)=> {
    const sql = 'SELECT * FROM clientes';

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else {
            res.send('No hay resultados.');
        }
    });
});

app.get('/clientes/:id', (req, res)=> {
    const { id } = req.params;
    const sql = `SELECT * FROM clientes WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else {
            res.send('No hay resultados.');
        }
    });
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO clientes SET ?';

    const clienteObj = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad
    }

    connection.query(sql, clienteObj, error =>{
        if (error) throw error;
        res.send('¡Cliente creado!');
    });
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, ciudad} = req.body;
    const sql = `UPDATE clientes SET nombre = '${nombre}', ciudad = '${ciudad}' WHERE id = '${id}'`;
    
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('¡Cliente modifucado!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM clientes WHERE id = '${id}'`;

    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Cliente eliminado.');
    });
});

//Check connect
connection.connect(error =>{
    if (error) throw error;
    console.log('La conexión está corriendo.');
});

app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));