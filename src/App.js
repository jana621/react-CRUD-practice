import { useState,  useEffect } from "react";
import "./App.css";
import { FaEdit, FaTrash, FaRegWindowClose, FaUserPlus, FaCheckSquare } from "react-icons/fa";



// function
// shorter code
// use hooks

// 5 pillars of programming:-
// 1. Readability - 75% reading 25% writing
// 2. Maintainability
// 3. Extensibility
// 4. Testability
// 5. Performance

// function component

// what type of function -> arrow function
// const awesome = () => 10 + 5;

// const awesome = () => {
// return 10 + 5;
// }

// const b = 30 > 4;

// const color = 30 > 4 ? "green" : "red";
// console.log(b);

export default function App() {
// const name = "Jana";
const [name, setName] = useState("");

const [pic, setPic] = useState("");

// const names = ["Naruto", "Itachi", "Madara", "Kakashi"];

// const [names, setNames] = useState([
//   "Uzumaki Naruto",
//   "Uchiha Madara", 
//   "Kakashi Hatake",
//   "Uchiha Itachi"
//   ]);

// const [users, setUsers] = useState([
// {name:  "Uzumaki Naruto", pic: "https://a-static.besthdwallpaper.com/jump-force-naruto-uzumaki-wallpaper-1280x960-6644_20.jpg"},
// {name: "Uchiha Madara", pic: "https://img5.goodfon.com/original/1280x960/2/b6/vzgliad-paren-naruto-personazh-briunet-rinnegan-madara-uchik.jpg"}, 
// {name: "Kakashi Hatake", pic: "https://wallpaperaccess.com/full/419443.jpg"},
// {name: "Uchiha Itachi", pic: "https://cdn.wallpapersafari.com/78/21/n01h7N.jpg"}
// ]);

const [users, setUsers] = useState([]);

useEffect(() => {
  getUsers();
  },[]
);

const getUsers = () => {
  fetch("https://623f6a9d2aeb48a9af692dc3.mockapi.io/users", {method: "GET"})
  .then((data) =>data.json())
  .then((shinobis) => setUsers(shinobis));
}

const addUser = () => {
  fetch("https://623f6a9d2aeb48a9af692dc3.mockapi.io/users", {method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      pic: pic
    })
  }).then(() => getUsers());
}


// names - 
// setNames - will help to change the "names"

// adding user - names must be variable

// initial value of name - "Jana"
// setName - will help to change the "name"

// how you capture the typing event? - event listener (typing event)
// dont use document object in react
// onChange - whenever the input changes the onChange is triggered

return ( 
  <div className="App">

    <div className="user-form">
    <input
    value={name}
    onChange={(event) => setName(event.target.value)}
    // onChange gives you typing event - content - event.target.value

    // typing event -> onChange -> content - event.target.value - > setName (updating name)
    // after updating the name - react takes cre changing the {name} where it is used
    placeholder="Enter your name"/>
    
    <input
    value={pic}
    onChange={(event) => setPic(event.target.value)}
    placeholder="Enter picture url"
     />
    {/* // copy of names - [...names] then add the entered value from input "name" */}

    {/* <button onClick={() => setNames([...names, name])}>Add User</button> */}

    {/* <button onClick={() => setUsers([...users, {name: name, pic: pic}])}>Add User</button> */}
    {/* <button style={{border:"1px solid black"}} class="btn btn-warning" >Add User</button> */}

    <FaUserPlus style={{cursor:"pointer", fontSize:"28px", color:"white"}} onClick={addUser} />
    </div>

    {/* <br></br><br></br> */}
    {/* using the User component */}
    {/* User is used inside the App component - App is the parent of user */}
    {/* <User username={name} /> */}

    {/* drycode - avoid code repition */}
    {/* <Us er username={names[0]} />
    <User username={names[1]} />
    <User username={names[2]} />
    <User username={names[3]} /> */}

    {/* map - drycode - looping */}

    {/* current value in the map - nm */}
    {/* nm - name - type=string */}

    {/* {names.map((nm) => (
      <User username={nm} />
    ))} */}


    {/* users */}
    {/* ur - type=object */}
    {/* since it is an object if we have to parse name and picture to user (ur.name & ur.picture) is used */}
    {/* username & userpicture both are props to the User */}

    {users.map((ur) => (
      <User key={ur.id} username={ur.name} userpicture={ur.pic} userid={ur.id} getUsers={getUsers}/>
    ))}
  </div>

  );
};

// props - to pass data from parent to child
// JSX - JavaScript extended - looks like html but it is not. (react converts into JS)

// creating new component :-
// 1. start with function
// 2. name should start with capital letter
// 3. return must be present
// 4. a component can return only one element
// 5. instead of a div tag react fragments can be used (react fragment - <> </>)

// alternative method for props. -> destructuring (username)
// function user (props)  {
//   return (
//     <>
//     <h1>Hello {props.username}</h1>
//     </>
//   );
// }

function User({username, userpicture, userid, getUsers}) {
  const deleteUser = ()=> {
    fetch("https://623f6a9d2aeb48a9af692dc3.mockapi.io/users/" + userid, {
      method: "DELETE"
    })
      .then(() =>getUsers())
  };
  const [edit, setEdit] = useState(false);

  return (
    <>
    <div className="container">
    <div className="user-container">
      <img className="user-image" height="100" width="100" src={userpicture} alt={username}/>
      <div>
      <p className="user-name">{username}</p>
      <i style={{color:"blue", fontSize:"20px"}} onClick={()=> setEdit(!edit)}>{edit? <FaRegWindowClose  /> : <FaEdit />}</i><> </>
        <i style={{color:"crimson", fontSize:"20px"}} onClick={deleteUser}><FaTrash /></i>
      
      </div>
    </div>
    { edit? <EditUser username={username} userpicture={userpicture} userid={userid} getUsers={getUsers} setEdit={setEdit} />  :""}
    </div>
    </>
  );
};

function EditUser({username, userpicture, userid, getUsers, setEdit}) {

  const [name, setName] = useState(username);
  const [pic, setPic] = useState(userpicture);
  

  const editUser = () => {
    setEdit(false);
    fetch("https://623f6a9d2aeb48a9af692dc3.mockapi.io/users/" + userid, {method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      pic: pic
    })
  }).then(() => getUsers());

  }

  return(
    <div className="user-form">
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name"/>
      <input value={pic} onChange={(event) => setPic(event.target.value)} placeholder="Enter picture url"/>
      {/* <button className="save-button" class="btn btn-success" >Save</button> */}
      <FaCheckSquare style={{fontSize:"28px", color:"springgreen", cursor:"pointer"}} onClick={editUser}/>
    </div>
  )
}
// {}  - template syntax - interpolation
// {inside here there must be an expression}
// an expression always returns something

// function x1() {
//   var x = 10;
//   if(x > 5) {
//     console.log("Nice");
//   } else {
//     console.log("Good");
//   }
// }
// displaying on console != returning

// function good() {
//   var x = 10;
//   if(x > 5) {
//     console.log("Nice");
//   } else {
//     console.log("Good");
//   }
// }

// class component