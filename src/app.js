const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");
const edited_idElem = document.querySelector("#edited_id");
const edited_nameElem = document.querySelector("#edited_name");

const saveButton = document.querySelector("#saveButton");
var actualTr = null;
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
    
    //delBtn.textContent = 'Törlés';
    delBtn.innerHTML = '<i class="bi bi-trash"></i>';

    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deleteEmployee(id);
            actualTr = delBtn.parentElement.parentElement;
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
    let editButton = makeEditButton(employee);
    tdButton.appendChild(delButton);
    tdButton.appendChild(editButton);

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
    editBtn.classList.add('ms-1');

    editBtn.setAttribute('data-empid', employee.id);
    editBtn.setAttribute('data-empname', employee.name);
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');


    editBtn.textContent = 'Módosítás';
    editBtn.addEventListener('click', ()=> {
        console.log('Szerkesztés működik');
        //TODO: Törölni kell ezt sort
        console.log(employee.id);
        edited_idElem.value = editBtn.dataset.empid; 
        edited_nameElem.value = editBtn.dataset.empname;
        actualTr = editBtn.parentElement.parentElement;
    });
    return editBtn;
}

saveButton.addEventListener('click', () => {
    console.log('Mentés...');
    actualTr.childNodes[1].textContent = edited_nameElem.value;
    

    actualTr
    .childNodes[2]
    .lastChild
    .setAttribute('data-empname', edited_nameElem.value);

    updateEmployee();
});

function updateEmployee() {
    console.log('REST API-ba mentés');
    //edited_idElem.value
    let endpoint = 'employees' + '/' + edited_idElem.value;
    let url = host + '/' + endpoint;
    // console.log(url);
    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            id: edited_idElem.value,
            name: edited_nameElem.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
}