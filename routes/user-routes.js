module.exports = function (app, jwt, db) {
    app.get('/', function(req, res){
        res.render("index");
    });
    
    app.get('/dashboard', function(req, res) {
        res.render("dashboard");
    });

    app.get('/login', function(req, res){
        // validate user's email and password

        // if successful, redirect to dashboard
    });

    // ???
    app.get('/books/:book', function(req, res) {
        res.render("chapterselect");
    });

    app.get('/books/:book/:chapter', function(req, res) {
        res.render("editchapter");
        // load the text currently written to the chapter

        // create textarea, populate with the current chapter text
    });





    app.post('/register', function (req, res) {
        // add user information to db

        // redirect to '/login'
    });

    app.post('/books', function (req, res) {
        // add book to books table -- use Books.associate (maybe)
        // redirect to '/books/book'
    });

    app.post('books/:book', function (req, res) {
        // add chapter to book
        // redirect to '/books/:book/:chapter' (start working on the chapter)
    });



    app.put('books/:book', function(req, res){
        // Update book title
        // Redirect to Dashboard
    });

    app.put('books/:book/:chapter', function (req, res) {
        // update chapter of book
        // redirect to '/books/:book/:chapter' (reload the page)
    });


    
    app.delete('books/:book', function (req, res){
        // delete book
        // redirect to dashboard
    });

    app.delete('books/:book/:chapter', function (req, res){
        // delete chapter
        // redirect to chapter select '/books/book'
    });
}