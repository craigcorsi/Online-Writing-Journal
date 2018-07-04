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
                res.render("layouts/dashboard", {name: username});

                // From Craig Jul-3-18: This was causing problems while redirecting to /dashboard
                // next(); // <-- important!


            } else {
                console.log('username or password was incorrect')
                res.redirect('/');
                $('#js-username-goes-here-1').text(username);
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
                res.json("exists");
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
        res.redirect('/');
    })



    // ???
    app.get('/books/:book', function (req, res) {



        // changed by steph on 6-30-18 // this file has been deprecated 
        // res.render("chapterselect");

        // updated by steph on 6-30-18
        // this file will call the following partials:
        // partials/chapters/chapters-block.handlebars
        // partials/chapters/editchapter.handlebars 
        // updated by sjaps because file was moved
        res.render("layouts/edit");


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
        res.render("layouts/dashboard", {name: 'username'});
    });

    app.get('/books', function (req, res) {
        db.Book.findAll({
            // where: {
            //     UserId: req.UserId
            // }
        }).then(function (result) {
            console.log(result);
            res.json(result);
        });
    });

        // function to load dashboard from another get request











        app.post('/books', function (req, res) {
            db.Book.create({
                book_name: req.body.book_name,
                UserId: req.body.UserId,
            }).then(function (result) {
                res.redirect('/dashboard');
            });
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
            }).then(function (response) {

            });
        });

        app.delete('books/:book/:chapter', function (req, res) {
            // delete chapter
            // redirect to chapter select '/books/book'
        });


    }