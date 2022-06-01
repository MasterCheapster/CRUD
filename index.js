const express = require('express')

const mysql = require('mysql2')

const app = express()

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));

// Create a connection to mysql server

const firstdb = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'ayush7000',
    database: 'first'
})


// Connect
firstdb.connect((err) => {
    if (err)
        console.log(err)
    else
        console.log('Mysql connected..')
})


app.listen(process.env.PORT || 9000, () => {
        console.log('Server started at port 9000')
    })
    //request handle kr rhe and data send kr rhe
app.get('/posts', (req, res) => {

    const url = 'SELECT * FROM Persons'

    firstdb.query(url, (err, rows) => {
        if (!err)
            res.send(rows);

        else
            console.log(err);
    })
});

app.get('/posts/:is', (req, res) => {

    const url = 'SELECT * FROM Persons WHERE FirstName = ?'
    firstdb.query(url, [req.params.is], (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/delete/:id', (req, res) => {
    firstdb.query('DELETE FROM Persons WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);

    })
});


// app.post('/posts', (req, res) => {
//     let emp = req.body;
//     var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
//     CALL EmployeeAddOrEdit(@id,@Name,@Country);";
//     firstdb.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
//         if (!err)
//             rows.forEach(element => {
//                 if (element.constructor == Array)
//                     res.send('Inserted employee id : ' + element[0].id);
//             });
//         else
//             console.log(err);
//     })
// });


// app.put('/posts', (req, res) => {
//     let emp = req.body;
//     var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
//     CALL EmployeeAddOrEdit(@id,@Name,@Country);";
//     firstdb.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
//         if (!err)
//             res.send('Updated successfully');
//         else
//             console.log(err);
//     })
// });