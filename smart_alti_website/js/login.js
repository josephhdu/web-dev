

function register(){

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const registerUrl = 'https://vch4e6oc49.execute-api.us-west-1.amazonaws.com/prod/register';

    const message = '';

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    console.log("register success") 


    if(username.trim() === '' || email.trim() === '' || username.trim() === '') {
        message = 'All fields are required'
    } else{

    }

    const requestBody = {
        username: username,
        email: email,
        password: password
    }

    const requestConfig = {
        method: 'POST',
        headers: {
            'x-api-key': 'a04zYXOLae5TMMpILpyxD635g992bNPf2g2fQEOn',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }


    fetch(registerUrl, requestConfig)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        message = 'registration successful';
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        // Handle the response data here
        console.log('Response data:', data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch request
        if(error.response.status === 401){
            message = error.response.status;
        } else{
            message = 'sorry, the server is down, try again later';
        }
        console.error('Fetch error:', error);
        console.log(error);
    });


    const displayMessage = document.getElementById('register-message');
    displayMessage.innerHTML= message;
    displayMessage.style.display = 'block'; 
}