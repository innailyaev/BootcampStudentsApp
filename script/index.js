const table=document.querySelector('#table');
const p=document.querySelector("#text");

const usersApi='https://appleseed-wa.herokuapp.com/api/users/';
const user='https://appleseed-wa.herokuapp.com/api/users';
let usersData=[];
let userDetails;
// fetchUsersApi();
fetchUser();

async function fetchUsersApi(){
    const callApi = await fetch(usersApi);
    const data= await callApi.json();
    usersData=data;
    console.log(usersData);
}

async function fetchUser(){
    const callApi = await fetch(`${user}/30`);
    let data= await callApi.json();
    userDetails=data;
    // console.log(usersData);
}


async function createTable() {
    await fetchUsersApi();
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
      usersData.forEach((u) => {
        console.log(u)
        table.innerHTML += 
      `<tr>
        <td>${u.id}</td>
        <td>${u.firstName}</td>
        <td>${u.lastName}</td>
        <td>${u.capsule}</td>
    </tr>`
    })
    console.log("jjj",usersData);
}

createTable();

// function removeUser(id){
//     let users=usersData;
//     users.splice(id,1);
//     console.log("users", users);
// }


