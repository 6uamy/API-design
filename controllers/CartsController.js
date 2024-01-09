const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addCartsItem = (req, res) => {
    const {book_id, quantity, user_id} = req.body;

    const sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
    const values = [book_id, quantity, user_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return results.affectedRows === 0 ? res.status(StatusCodes.BAD_REQUEST).end() : res.status(StatusCodes.CREATED).json(results);
    });
};

const selectCartsItem = (req, res) => {
    const {user_id, selected} = req.body;
    let sql = `SELECT C.id, C.book_id, B.title, B.summary, C.quantity, B.price 
                FROM cartItems AS C
                LEFT JOIN books AS B ON C.book_id = B.id 
                WHERE user_id = ?`;

    const values = [user_id];
    if (selected) {
        sql +=` AND C.id IN (?)`;
        values.push(selected);
    }
    
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        
        return results.length ? res.status(StatusCodes.OK).json(results) : res.status(StatusCodes.NOT_FOUND).end();
    });
};

const removeCartsItem = (req, res) => {
    const {id} = req.params;

    const sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return results.affectedRows === 0 ? res.status(StatusCodes.BAD_REQUEST).end() : res.status(StatusCodes.OK).json(results);
    });
};

const choosedCartItems = (req, res) => {
    const {id} = req.params;

    const sql = `SELECT * FROM Bookshop.cartItems 
                WHERE user_id = 1
                AND id IN (4, 6);`;
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return results.affectedRows === 0 ? res.status(StatusCodes.BAD_REQUEST).end() : res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {addCartsItem, selectCartsItem, removeCartsItem};
