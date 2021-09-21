import Countries from './components/Countries/Countries';

function App() {
  return (
    <div className="App">
      {/* <Dataloader></Dataloader> */}
      <Countries></Countries>
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
