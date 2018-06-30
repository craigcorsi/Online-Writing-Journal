module.exports = function (app, db) {

    app.post('/login', function (req, res) {
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
        res.redirect('/dashboard');
    });

    app.post('/register', function (req, res) {
        // add user information to db

        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
        // redirect to '/login'
        res.redirect('/');
    });

    app.get('/logout', function (req, res) {
        res.clearCookie('user')
        res.redirect('/login');
    })



    // ???
    app.get('/books/:book', function (req, res) {

        res.render("chapterselect");
    });

    app.get('/books/:book/:chapter', function (req, res) {


        res.render("editchapter");

        // load the text currently written to the chapter

        // create textarea, populate with the current chapter text
    });

    app.get('/', function (req, res) {
        console.log(req.cookies)
        res.render("index");

    });

    app.get('/dashboard', function (req, res) {


        res.render("dashboard");

    });
    app.post('/books', function (req, res) {
        // add book to books table -- use Books.associate (maybe)
        // redirect to '/books/book'
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
        // delete book
        // redirect to dashboard
    });

    app.delete('books/:book/:chapter', function (req, res) {
        // delete chapter
        // redirect to chapter select '/books/book'
    });


}