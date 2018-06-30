// Collect all http requests into one file

// Maybe write ONE $.ajax command? And feed in everything else as parameters?

/**
 * Steps:
 * 
 * get ONE ajax get request functioning, for logging into the dashboard
 * 
 * get individual ajax functions running in separate functions
 * 
 * at the VERY LEAST, determine all parameters needed for each request, figure out what sql code needs to be written
 * 
 * implement pageload functionality to parse JSON received, build divs, and append them to the DOM.
 * list of books
 * list of chapters
 * chapter text
 * 
 *
 */

console.log('test');

function redirect(url) {
    window.location.replace(url);
}

function getFromJournal(url) {
    $.ajax({
        method: 'GET',
        url: url
    }).then(function (response) {
        console.log('Your journal page request was received! Proceed...');
        console.log(response);
    });
}

function postToJournal(url, data) {
    $.ajax({
        method: 'POST',
        url: url,
        data: data
    }).then(function (response) {
        console.log('Your journal page request was received! Proceed...');
        console.log(response);
    });
}





$(document).ready(function () {

    // INDEX: Register new user
    $('body').on('click', '#js-register-submitButton', function (event) {
        event.preventDefault();
        console.log('I will try to register');

        var newUserData = {
            username: $('#js-register-usernameField').val().trim(),
            password: $('#js-register-passwordField').val()
        }
        $.ajax({
            method: 'POST',
            url: 'register/',
            data: newUserData
        }).then(function (response) {
            console.log('Your journal POST request was received! Proceed...');
            //location.assign(url);
        });
    });





    // INDEX: Login as existing user
    $('body').on('click', '#js-login-submitButton', function (event) {
        event.preventDefault();
        console.log('I will try to log in');

        var loginData = {
            username: $('#js-login-usernameField').val().trim(),
            password: $('#js-login-passwordField').val()
        }

        $.ajax({
            method: 'POST',
            url: 'login/',
            data: loginData
        }).then(function (response) {
            console.log('Your journal POST request was received! Proceed...');
            //location.assign(url);
        });
    });




    // DASHBOARD or EDIT: Logout to index
    $('body').on('click', '#js-button-logout', function (event) {
        event.preventDefault();
        console.log('123');

        $.ajax({
            method: 'GET',
            url: '/logout'
        }).then(function (response) {
            console.log('Your journal GET request was received! Proceed...');
            location.assign('/');
        });
    });








    // DASHBOARD: create new book
    $('body').on('click', '#js-new-book-submit', function (event) {
        event.preventDefault();
        console.log('creating a new book...');

        var data = {
            book_name: $('#js-new-book-input').val().trim(),
            UserId: 12345
        };

        $.ajax({
            method: 'POST',
            url: 'books/',
            data: data
        }).then(function (response) {
            console.log('Your journal page request was received! Proceed...');
            location.reload();
        });
    });


    // DASHBOARD: delete book
    $('body').on('click', '.jsClass-delete-book', function (event) {
        event.preventDefault();
        console.log('deleting book...');

        console.log($(this).data('id'));

        var url = 'books/' + $(this).data('id');

        $.ajax({
            method: 'DELETE',
            url: url
        }).then(function (response) {
            console.log('Your journal page request was received! Proceed...');
            location.reload();
        });
    });
});







 /**
  * Steps for server:
  * 
  * recieve the ONE ajax request (make sure the html route is working)
  * 
  * then receive several
  */