const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const cartController = {
    addItemsToCart : (req, res) => {
        const {book_id, quantity, user_id} = req.body;
        let sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);`;
        let values = [book_id, quantity, user_id];
        conn.query(sql, values,
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.CREATED).json(results);
            }
        );
    },
    getCartItems : (req, res) => {
        res.status(200).json('장바구니 조회');
    },
    removeCartItems : (req, res)=>{
        let sql = `DELETE FROM cartItems WHERE user_id = ? AND liked_book_id = ?;`;
        let values = [1, req.params.booksId];
        conn.query(sql, values,
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                return res.status(StatusCodes.CREATED).json(results);
            }
        );
    }
}

module.exports = Object.freeze(cartController);
