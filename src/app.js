const dowButton = document.querySelector("#dowButton");

dowButton.addEventListener('click', () => {
    console.log('működik');
});

var url = 'http://localhost:3000/employees';

fetch(url)
.then( response => response.json())
.then( result => console.log(result[0].name  ))
.catch(error => {
    console.log('Hiba! A lekérdezés sikertelen!');
    console.log(error);
});


