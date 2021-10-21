import './App.css'
// import Countries from './components/Countries/Countries';
// import initializeAuthentication from './components/Firebase/firebase.initialize';
// import { getAuth, signInWithPopup,  GoogleAuthProvider } from "firebase/auth";

import { useEffect, useRef, useState } from "react";

// initializeAuthentication();

// const provider = new GoogleAuthProvider();

function App() {
  // const auth = getAuth();
  // const handlegoogle = () =>{
  //   const auth = getAuth();
  // signInWithPopup(auth, provider)
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  // //  const credential = GoogleAuthProvider.credentialFromResult(result);
  //  // const token = credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   console.log(user)
  //   // ...
  // })
  // }
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users/')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);

  const nameRef = useRef();
  const emailRef = useRef();

  const handleData = e =>{
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newuser = {name,email};
    fetch("http://localhost:5000/users/",{
      method : 'post',
      headers : {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(newuser)
    }).then(res => res.json())
    .then(data =>{
      const addUser = data;
      const newuser = [...users, addUser]
      setUsers(newuser);
      nameRef.current.value= '';
      emailRef.current.value = '';
    })
    e.preventDefault();
    
  }
  return (
    <div className="App">
      <h1>Add your data</h1>
      {/* <Dataloader></Dataloader> */}
      {/* <Countries></Countries> */}
      {/* <button onClick={handlegoogle}>Sign in</button> */}
      <form onSubmit={handleData}>
        <input type="text" ref={nameRef} placeholder="your name"/> <br></br>
        <input type="email" ref={emailRef} placeholder="your email"/> <br></br>
        <input type="submit" value="Submit" />
      </form>
      {
          users.map(user => <li key={user.id}>{user.id} {user.email} {user.name}</li>)
      }
    </div>
  );
}

// jsonplaceholder api practice ; 
// function Dataloader(){
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(data => setUsers(data));
//   }, [])
//   return (
//     <div>
//     {
//       users.map(user => <Api 
//         key={user.id}
//         name={user.name}> </Api>)
//     }
//     </div>
//   )
// }
// function Api (props) {
//   //console.log(props)
//   return (
//     <div>
//       <h4>{props.name}</h4>
//     </div>
//   );
// }

export default App;
