$(document).ready(function () {
    // INDEX: Register new user
    $('body').on('click', '#js-register-submitButton', function (event) {
        event.preventDefault();

        var newUserData = {
            username: $('#js-register-usernameField').val().trim(),
            password: $('#js-register-passwordField').val()
        }
        $.ajax({
            method: 'POST',
            url: 'register/',
            data: newUserData
        }).then(function (response) {
            var registrantMessage;
            if (response == "exists") {
                registrantMessage = `An account with this username is already registered with us. If this is you, log in!`;
            } else if (response) {
                registrantMessage = `Welcome, ${newUserData.username}! Log in below to proceed!`
            } else {
                registrantMessage = `Sorry, we couldn't create an account with that information.`
            }
            $('#js-homepage-register-message').text(registrantMessage);
        });
    });

    // INDEX: Login as existing user
    $('body').on('click', '#js-login-submitButton', function (event) {
        event.preventDefault();

        var loginData = {
            username: $('#js-login-usernameField').val().trim(),
            password: $('#js-login-passwordField').val()
        }

        // var cookieArray = document.cookie;
        // cookieArray = cookieArray.split('=');
        // var UserId = parseInt(cookieArray[1].trim());

        $.ajax({
            method: 'POST',
            url: 'login/',
            data: loginData
        }).done(function (retrievedId) {
            location.assign(`/dashboard/${retrievedId}`);
        });
    });




    // DASHBOARD or EDIT: Logout to index
    $('body').on('click', '#js-button-logout', function (event) {
        event.preventDefault();
        $.ajax({
            method: 'GET',
            url: '/logout'
        }).then(function (response) {
            location.assign('/');
        });
    });

    // DASHBOARD: create new book
    $('body').on('click', '#js-new-book-submit', function (event) {
        event.preventDefault();

        var cookieArray = document.cookie;
        cookieArray = cookieArray.split('=');
        var UserId = parseInt(cookieArray[1].trim());

        var data = {
            book_name: $('#js-new-book-input').val().trim(),
            UserId: UserId
        };

        $.ajax({
            method: 'POST',
            url: '/books',
            data: data
        }).then(function (response) {
            if (response) {
                location.reload();
            }
        });
    });


    // DASHBOARD: delete book
    $('body').on('click', '.jsClass-delete-book', function (event) {
        event.preventDefault();


        var url = 'books/' + $(this).data('id');

        $.ajax({
            method: 'DELETE',
            url: url
        }).then(function (response) {
            location.reload();
        });
    });
});