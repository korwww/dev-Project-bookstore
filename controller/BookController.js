const conn = require('../mariadb');
const dotenv = require('dotenv');
const {StatusCodes} = require('http-status-codes');
dotenv.config();

const bookfunctions = {
    selectAllBooks: (req, res) => {
        res.status(200).json('전체 도서 조회');
    },
    
    selectCategoryBooks: (req, res) => {
        const categoryId = req.query.categoryId;
        const isNew = req.query.new;

        res.json('카테고리별 도서 목록 조회');
    },

    selectSingleBook: (req, res) => {
        const bookId = req.params.booksId;
        
        res.json('개별 도서 조회');
    },
};

module.exports = bookfunctions;