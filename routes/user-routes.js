module.exports = function (app, db) {

    var book_id_placeholder;

    app.get('/', function (req, res) {
        console.log(req.cookies)
        res.render("index");
    });

    app.get('/dashboard/:user', function (req, res) {
        res.render("layouts/dashboard", { UserId: req.params.user });
    });

    app.get('/edit/:user/:id', function (req, res) {
        console.log(req.params);
        res.render("layouts/edit", { 
            BookId: req.params.id,
            UserId: req.params.user
        });
    });


    /**
     * 
     * ROUTES ACCESSED FROM HOME PAGE
     * 
     */
    app.post('/login', function (req, res, next) {
        // validate user's email and password
        var username = req.body.username
        var password = req.body.password


        db.User.findOne({
            where: {
                username: username
            }
        }).then(function (result) {
            var savedPass = result.dataValues.password;
            if (password === savedPass) {
                console.log('logged in')

                // set a cookie
                // check if client sent cookie
                var cookie = req.cookies;
                if (cookie === {}) {
                    // no: set a new cookie
                    res.cookie('user', result.id, { maxAge: 900000, httpOnly: false });
                    console.log('cookie created successfully');

                }
                else {
                    // yes, cookie was already present 
                    res.clearCookie('user');
                    res.cookie('user', result.id, { maxAge: 900000, httpOnly: false });
                    console.log('cookie created successfully');
                }
                // load dashboard
                console.log(result.dataValues.id);
                res.json(result.dataValues.id);
                //res.render("layouts/dashboard", { UserId: result.dataValues.id });

                // From Craig Jul-3-18: next() was causing problems while redirecting to /dashboard
                // next(); // <-- important!


            } else {
                console.log('username or password was incorrect')
                res.redirect('/');
            }
        });
    });

    app.post('/register', function (req, res) {
        // add user information to db

        console.log(req.body)

        db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function (result) {
            if (result) {
                res.json("exists");
            }
            else {
                db.User.create(req.body).then(function (dbUser) {
                    res.json(dbUser);
                });
            }
        })
    });





    /**
     * 
     * ROUTES ACCESSED FROM DASHBOARD
     * 
     */

    app.get('/logout', function (req, res) {
        res.clearCookie('user');
        res.redirect('/');
    });

    // This get request occurs on page load
    app.get('/books', function (req, res) {
        db.Book.findAll({
            where: {
                UserId: req.cookies.user
            }
        }).then(function (result) {
            var bookArray = []
            for (var i = 0; i < result.length; i++) {
                bookArray.push([result[i].dataValues.book_name, result[i].dataValues.id]);
            }
            res.json(bookArray);
            // bookArray = []
        });
    });

    // Create new book
    app.post('/books', function (req, res) {
        db.Book.create({
            book_name: req.body.book_name,
            UserId: req.body.UserId,
        }).then(function (result) {
            res.json(true);
        });
    });

    // Delete book
    app.delete('/books/:book', function (req, res) {
        console.log(req.params.book);
        db.Book.destroy({
            where: {
                book_name: req.params.book
            }
        }).then(function (response) {
            res.redirect('/edit');
        });
    });

    // Edit title of book
    app.put('/books/:book', function (req, res) {
        // Update book title
        // Redirect to Dashboard
    });






    /**
     * 
     * ROUTES ACCESSED FROM EDITOR
     * 
     */

    app.get('/currentuser/:user', function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.user
            }
        }).then(function(response){
            res.json(response);
        });
    });

    app.get('/currentbook/:book', function(req, res) {
        db.Book.findOne({
            where: {
                id: req.params.book
            }
        }).then(function(response){
            res.json(response);
        });
    });

    // Retrieve chapters of book (on page load)
    app.get('/books/:book', function (req, res) {
        db.Chapter.findAll({
            where: {
              BookId: req.params.book
            }
        }).then(function(response){
            res.json(response);
        });
    });

    // Retrieve contents of a single chapter
    app.get('/books/:book/:chapter', function(req, res){
        db.Chapter.findOne({
            where: {
                id: req.params.chapter
            }
        }).then(function(response){
            res.json(response);
        });
    });

    app.post('/books/:book', function (req, res) {
        db.Chapter.create({
            chapter_name: req.body.chapter_name,
            chapter_body: "",
            BookId: req.body.BookId,
        }).then(function (response) {
            res.json(response);
        });
    });

    app.put('/books/:book/:chapter', function (req, res) {
        db.Chapter.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(response){
            res.json(response);
        });
    });

    app.delete('/books/:book/:chapter', function (req, res) {
        db.Chapter.destroy({
            where: {
                id: req.params.chapter
            }
        }).then(function(response){
            res.json(true);
        });
    });

    // Editor Route: RETURN TO DASHBOARD
    // Editor Route: LOG OUT

}