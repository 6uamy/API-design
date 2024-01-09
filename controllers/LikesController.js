const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addLikes = (req, res) => {
    const {book_id} = req.params;
    const {user_id} = req.body;

    const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
    const values = [user_id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return results.affectedRows === 0 ? res.status(StatusCodes.BAD_REQUEST).end() : res.status(StatusCodes.CREATED).json(results);
    });
}

const cancelLikes = (req, res) => {
    const {book_id} = req.params;
    const {user_id} = req.body;

    const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    const values = [user_id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return results.affectedRows === 0 ? res.status(StatusCodes.BAD_REQUEST).end() : res.status(StatusCodes.OK).json(results);
    });
}

module.exports = {addLikes, cancelLikes};
