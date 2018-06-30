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

function getFromJournal (url) {
    $.ajax({
        method: 'GET',
        url: url
    }).then(function(response){
        console.log('Your journal page request was received! Proceed...');
        //window.location.href = response;
        // ????
    });
}

function postToJournal (url, data) {
    $.ajax({
        method: 'POST',
        url: url,
        data: data
    }).then(function(response){
        console.log('Your journal page request was received! Proceed...');
        console.log(response);
    });
}

$(document).ready(function () {
    $('body').on('click', '#js-register-submitButton', function (event) {
        event.preventDefault();
        console.log('I will try to register');

        var newUserData = {
            username: $('#js-register-usernameField').val().trim(),
            password: $('#js-register-passwordField').val()
        }
        console.log('O Captain My Captain');
        postToJournal('register/', newUserData);
    });

    $('body').on('click', '#js-login-submitButton', function (event) {
        event.preventDefault();
        console.log('I will try to log in');

        var loginData = {
            username: $('#js-login-usernameField').val().trim(),
            password: $('#js-login-passwordField').val()
        }

        postToJournal('login/', loginData);
    });


    $('body').on('click', '#js-button-logout', function (event) {
        event.preventDefault();
        console.log('123');

        getFromJournal('logout/');
    });
});







 /**
  * Steps for server:
  * 
  * recieve the ONE ajax request (make sure the html route is working)
  * 
  * then receive several
  */