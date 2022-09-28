const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");
var tbody = document.createElement('tbody');
empTable.appendChild(tbody);

const host = 'http://localhost:3000';


(()=>{
   console.log("kívül");
   getEmployees();
   
})();

function getEmployees() {
    let endpoint = 'employees';
    let url = host + '/' + endpoint;
    fetch(url)
    .then( response => response.json())
    .then( result => {
        console.log(result[0].name);
        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function renderTable(employees) {
    tbody.innerHTML = '';
    employees.forEach( employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdButton = document.createElement('td');
        let delBtn = makeDelButton(employee.id);
        let editBtn = makeEditButton(employee);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);
        tdButton.appendChild(delBtn);
        tdButton.appendChild(editBtn);
        tbody.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;        
    });
}

function makeDelButton(id) {
    let delBtn = document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.classList.add('btn-info');
    delBtn.textContent = 'Törlés';
    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deleteEmployee(id);
            let actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    addEmployee();

});

function addEmployee() {
    let endpoint = 'employees';
    let url = host + '/' + endpoint;    
    let employee = {
        name: empName.value
    };
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        empName.value = '';
        addEmployeeToTable(result);
    });

}

function addEmployeeToTable(employee) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdButton = document.createElement('td');
 
    tdId.textContent = employee.id;
    tdName.textContent = employee.name;

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdButton);

    let delButton = makeDelButton(employee.id);
    tdButton.appendChild(delButton);
    tbody.appendChild(tr);
}

function deleteEmployee(id) {
    console.log(id);
    let endpoint = 'employees';
    let url = host + '/' + endpoint + '/' + id;
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}

function makeEditButton(employee) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-info');
    editBtn.textContent = 'Módosítás';
    editBtn.addEventListener('click', ()=> {
        console.log('Szerkesztés működik');
    });
    return editBtn;
}
