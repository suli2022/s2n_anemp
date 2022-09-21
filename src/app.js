var url = 'http://localhost:3000/employees';
fetch(url)
.then( result => result.json())
.then( data => {
    console.log(data);
});
