const table=document.querySelector('#table');
const select=document.querySelector("#select");
const searchInput=document.querySelector("#searchInput");
const loader=document.querySelector('#loader');
const logo=document.querySelector(".logo");
const usersApi='https://appleseed-wa.herokuapp.com/api/users/';
const user='https://appleseed-wa.herokuapp.com/api/users';
let usersData=[];
let userDetails=[];
createTable();


async function getDetalisApi(id){
    const callApi = await fetch(`${user}/${id}`);
    let data= await callApi.json();
    return data;
}

async function getUsersApi(){
    loader.style.display='block';
    table.style.display='none';
    logo.style.display='none';
    const response = await fetch(usersApi);
    let usersResult= await response.json();
    usersData = await Promise.all(
        usersResult.map(async (u) => {
            let detalis = await getDetalisApi(u.id);
            return {id:u.id,firstName: u.firstName, lastName: u.lastName, capsule: u.capsule, 
                city:detalis.city, age : detalis.age, gender:detalis.gender, hobby:detalis.hobby }})
    )
    loader.style.display='none';
    table.style.display='block';
    logo.style.display='block';
}

async function createTable() {
    if(localStorage.getItem('students')){
        usersData=JSON.parse(localStorage.getItem('students'));
    }
    else
        await getUsersApi();
    table.innerHTML += 
        `<thead>
            <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Capsule</th>
            <th>Age</th>
            <th>City</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th></th>
            <th></th>
        </tr>
      <thead>`
        usersData.forEach( (u) => {
        table.innerHTML += 
      `<tr id=${u.id}>
        <td>${u.id}</td>
        <td>${u.firstName}</td>
        <td>${u.lastName}</td>
        <td>${u.capsule}</td>
        <td>${u.age}</td>
        <td>${u.city}</td>
        <td>${u.gender}</td>
        <td>${u.hobby}</td>
        <td><i id=${u.id} class="far fa-edit fa-2x" type="edit"></i></td>
        <td><i id=${u.id} class="far fa-trash-alt fa-2x" type="delete"></i></td>
    </tr>`
    })
    localStorage.setItem('students', JSON.stringify(usersData));
    
}

function removeUserFromArray(id){
    usersData.forEach((u,index)=>{
        if(u.id==id){
            usersData.splice(index,1);
        }
    })
    localStorage.setItem('students', JSON.stringify(usersData));
    removeUserUi(id);   
}

function removeUserUi(id){
    let row=document.getElementById(`${id}`);
    row.parentNode.removeChild(row);
}

function searchByValue(){
        let selectValue=searchByCategory();
        let filterValue, tr, td, i, txtValue;
        filterValue = searchInput.value.toUpperCase();
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[selectValue];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filterValue) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
        }
    }
}

function searchByCategory(){
    switch(select.value){
        case 'FN': return 1;
        case 'LN': return 2;
        case 'Cp': return 3;
        case 'age': return 4;
        case 'city': return 5;
        case 'gender': return 6;
        case 'hobby': return 7;
    }
}

function editDetails(id){
    let index=usersData.findIndex((p) => p.id ==id);
    let tr=document.getElementById(`${id}`);
    tr.innerHTML=`<td >${id}</td>
                <td><input class=editInput type=text value=${usersData[index].firstName}></td>
                <td><input class=editInput type=text value=${usersData[index].lastName}></td>
                <td><input class=editInput type=text value=${usersData[index].capsule}></td>
                <td><input class=editInput type=text value=${usersData[index].age}></td>
                <td><input class=editInput type=text value=${usersData[index].city.replace(/ /g, "")}></td>
                <td><input class=editInput type=text value=${usersData[index].gender}></td>
                <td><input class=editInput type=text value=${usersData[index].hobby.replace(/ /g, "")}></td>
                <td><i id=${id} class="far fa-check-square fa-2x confirm" type="confirm"></i></td>
                <td><i id=${id} class="far fa-window-close fa-2x cancel" type="cancel"></i></td>`      
}

function confirm(id){
    let newDetails=[];
    let j=0;
    let tr=document.getElementById(`${id}`);
    for(let i=1;i<tr.cells.length-2;i++){
        newDetails[j]=tr.children[i].firstChild.value;
        j++;
    }
    tr.innerHTML=`<td >${id}</td>
                <td>${newDetails[0]}</td>
                <td>${newDetails[1]}</td>
                <td>${newDetails[2]}</td>
                <td>${newDetails[3]}</td>
                <td>${newDetails[4]}</td>
                <td>${newDetails[5]}</td>
                <td>${newDetails[6]}</td>
                <td><i id=${id} class="far fa-edit fa-2x" type="edit"></i></td>
                <td><i id=${id} class="far fa-trash-alt fa-2x" type="delete"></i></td>`

        updateUsersArray(id,newDetails);  
}

function updateUsersArray(id,newUserDetails){
    let index=usersData.findIndex((p) => p.id ==id);
    let i=0;
    newUserDetails.unshift(id);
    for (let key in usersData[index]) {
        usersData[index][key]=newUserDetails[i];
        i++;
    }
    localStorage.setItem('students', JSON.stringify(usersData));
}

function cancelEdit(id){
    let index=usersData.findIndex((p) => p.id ==id);
    let tr=document.getElementById(`${id}`);
    tr.innerHTML=`<td >${id}</td>
                <td>${usersData[index].firstName}</td>
                <td>${usersData[index].lastName}</td>
                <td>${usersData[index].capsule}</td>
                <td>${usersData[index].age}</td>
                <td>${usersData[index].city}</td>
                <td>${usersData[index].gender}</td>
                <td>${usersData[index].hobby}</td>
                <td><i id=${id} class="far fa-edit fa-2x" type="edit"></i></td>
                <td><i id=${id} class="far fa-trash-alt fa-2x" type="delete"></i></td>`
}


//Event listener
table.addEventListener('click',(e)=>{
    let row=e.target.getAttribute('id');
    switch(e.target.getAttribute('type')){
        case('delete'):
            removeUserFromArray(row);
            break;
        case ('edit'):
            editDetails(row);
            break;
        case ('confirm'):
            confirm(row);
            break;
        case ('cancel'):
            cancelEdit(row);
            break;            
    }
    
})

searchInput.addEventListener('keyup',searchByValue);
