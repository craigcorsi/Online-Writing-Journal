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
                req.session.logged = result.id
                console.log(req.session.logged)

            } else {
                console.log('username or password was incorrect')
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
        req.session = null;
        res.redirect('/login');
    })



    // ???
    app.get('/books/:book', function (req, res) {

        // changed by steph on 6-30-18 // this file has been deprecated 
        // res.render("chapterselect");

        // updated by steph on 6-30-18
        // this file will call the following partials:
        // partials/chapters/chapters-block.handlebars
        // partials/chapters/editchapter.handlebars
        res.render("edit");

    });

    app.get('/books/:book/:chapter', function (req, res) {


        res.render("editchapter");

        // load the text currently written to the chapter

        // create textarea, populate with the current chapter text
    });

    app.get('/', function (req, res) {
        console.log(req.session)
        if (req.session.logged === 5) { console.log('working') }
        res.render("index");

    });

    app.get('/dashboard', function (req, res) {
        console.log('at this point there should be a redirect');
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