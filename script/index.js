const table=document.querySelector('#table');
const select=document.querySelector("#select");
const searchInput=document.querySelector("#searchInput");

const usersApi='https://appleseed-wa.herokuapp.com/api/users/';
const user='https://appleseed-wa.herokuapp.com/api/users';
let usersData=[];
let userDetails=[];
let arrLength;
// getUsersApi();
createTable();

async function getDetalisApi(id){
    const callApi = await fetch(`${user}/${id}`);
    let data= await callApi.json();
    return data;
}

async function getUsersApi(){
    const response = await fetch(usersApi);
    let usersResult= await response.json();
    usersData = await Promise.all(
        usersResult.map(async (u) => {
            let detalis = await getDetalisApi(u.id);
            return {id:u.id,firstName: u.firstName, lastName: u.lastName, capsule: u.capsule, 
                city:detalis.city, age : detalis.age, gender:detalis.gender, hobby:detalis.hobby }})
    )
}

async function createTable() {
    await getUsersApi();
    table.innerHTML += 
        `<thead>
            <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>capsule</th>
            <th>Age</th>
            <th>City</th>
            <th>Gender</th>
            <th>Hobby</th>
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
        <td><button id=${u.id} btn class=edit>Edit</button></td>
        <td><button id=${u.id} btn class=delete>delete</button></td>
    </tr>`
    })
    console.log(usersData);
}

function removeUserFromArray(id){
    usersData.forEach((u,index)=>{
        if(u.id==id){
            usersData.splice(index,1);
        }
    })
    removeUserUi(id);   
}

function removeUserUi(id){
    let row=document.getElementById(`${id}`);
    // row.style.display='none';    
    row.parentNode.removeChild(row);
}

function searchByValue(){
        let selectValue=searchByCategory();
        let filter, tr, td, i, txtValue;
        filter = searchInput.value.toUpperCase();
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[selectValue];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
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

function upDate(id){
    let newDetails=[];
    let index=usersData.findIndex((p) => p.id ==id);

    console.log(index);
    let tr=document.getElementById(`${id}`);
    console.log(tr);
    tr.innerHTML=`<td >${id}</td>
                <td><input id=FN class=editInput type=text value=${usersData[index].firstName}></td>
                <td><input id=LN class=editInput type=text value=${usersData[index].lastName}></td>
                <td><input id=CP class=editInput type=text value=${usersData[index].capsule}></td>
                <td><input id=AG class=editInput type=text value=${usersData[index].age}></td>
                <td><input id=CT class=editInput type=text value=${usersData[index].city}></td>
                <td><input id=GE class=editInput type=text value=${usersData[index].gender}></td>
                <td><input id=HB class=editInput type=text value=${usersData[index].hobby}></td>
                <td><button id=${id} class=confirm>Confirm</button></td>
                <td><button id=${id} class=cancel>Cancel</button></td>`
    
        for(let i=1;i<tr.cells.length;i++){
            console.log(tr.children[i].firstChild.value);

        }
        console.log(tr.cells.length);
        // console.log(tr.children[i].firstChild.value


}

function confirm(){


}

//Event listener
table.addEventListener('click',(e)=>{
    
    
    console.log(e.target.getAttribute('class'));
    let row=e.target.getAttribute('id');
    console.log(row);
    switch(e.target.getAttribute('class')){
        case('delete'):
            removeUserFromArray(row);
            break;
        case ('edit'):
            upDate(row);
            break;
        case ('confirm'):
            confirm(row);
            break;    
    }
    
})

searchInput.addEventListener('keyup',searchByValue);
