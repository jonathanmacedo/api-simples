const routes = require('express').Router()

const { randomUUID } = require('crypto')
const fs = require('fs')

let books = []

fs.readFile('./book.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        books = JSON.parse(data)
    }
})

routes.post('/',(request, response) => {
    const { name, price, author, pages } = request.body;

    const book = {
        id: randomUUID(),
        name,
        author,
        price,
        pages
    }

    books.push(book)

    bookFile()

    return response.send(book)
});

routes.get('/', (request, response) => {
    response.json(books)
});

routes.get('/:id', (request, response) => {
    const { id } = request.params
    const book = books.find(book => book.id === id);
    return response.json(book)
})

routes.put('/:id', (request, response) => {
    const { id } = request.params;
    const { name, price, author, pages } = request.body;

    const bookIndex = books.findIndex(book => book.id === id);
    books[bookIndex] = {
        ...books[bookIndex],
        name,
        author,
        price,
        pages 
    };

    bookFile();

    return response.json(bookIndex);
});

routes.delete('/:id', (request, response) => {
    const { id } = request.params
    const bookIndex = books.findIndex(book => book.id === id);

    books.splice(bookIndex, 1);
    bookFile();

    return response.json({ messege: 'Livro removido com sucesso!' })
});


function bookFile(){
    fs.writeFile('books.json', JSON.stringify(books), err =>{
        if(err){
            console.log(err)
        }else {
            console.log('Feito com sucesso!')
        }
    })
}

module.exports = routes;