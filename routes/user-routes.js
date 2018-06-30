module.exports = function (app, db) {

    app.post('/login', function (req, res, next) {
        // validate user's email and password
        var username = req.body.username
        var password = req.body.password
        console.log(req.body)
        console.log(username)


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
                console.log(cookie)
                if (cookie === {}) {
                    // no: set a new cookie
                    res.cookie('user', result.id, { maxAge: 900000, httpOnly: true });
                    console.log('cookie created successfully');

                }
                else {
                    // yes, cookie was already present 
                    res.clearCookie('user');
                    res.cookie('user', result.id, { maxAge: 900000, httpOnly: true });
                    console.log('cookie created successfully');
                    

                }
                res.redirect('/dashboard')

                next(); // <-- important!


            } else {
                console.log('username or password was incorrect')
                res.redirect('/')

            }
        });
        // if successful, redirect to dashboard
        // res.redirect('/dashboard');
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
                console.log('this username already exists')
            }
            else {
                db.User.create(req.body).then(function (dbUser) {
                    res.json(dbUser);
                });
            }

        })
    });

    app.get('/logout', function (req, res) {
        res.clearCookie('user')
        res.redirect('/login');
    })



    // ???
    app.get('/books/:book', function (req, res) {

        res.render("chapterselect");
    });

    // "editchapter.handlebars   deleted"
    // app.get('/books/:book/:chapter', function (req, res) {


    //     res.render("editchapter");

    //     // load the text currently written to the chapter

    //     // create textarea, populate with the current chapter text
    // });

    app.get('/', function (req, res) {
        console.log(req.cookies)
        res.render("index");

    });

    app.get('/dashboard', function (req, res) {
        db.Book.findAll({
            // where: {username: req.body.username}}
        }).then(function (result) {
            console.log(result);
            var BookObject = {
                books: result
            };
            res.render("dashboard", BookObject);
        });
    });

    app.post('/books', function (req, res) {
        db.Book.create({
            book_name: req.body.book_name,
            UserId: req.body.UserId,
        });
        res.redirect('/dashboard');
    });

    app.post('books/:book', function (req, res) {
        // add chapter to book
        // redirect to '/books/:book/:chapter' (start working on the chapter)
    });



    app.put('books/:book', function (req, res) {
        // Update book title
        // Redirect to Dashboard
    });

    app.put('books/:book/:chapter', function (req, res) {
        // update chapter of book
        // redirect to '/books/:book/:chapter' (reload the page)
    });



    app.delete('books/:book', function (req, res) {
        console.log(req.params.book);
        db.Book.destroy({
            where: {
                id: req.params.book
            }
        }).then(function(response){
            
        });
    });

    app.delete('books/:book/:chapter', function (req, res) {
        // delete chapter
        // redirect to chapter select '/books/book'
    });


}