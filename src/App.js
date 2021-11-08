import {Auth} from './Auth';
import React,{useState} from 'react';
import {Main} from './Main'
import {Logout} from './Logout'


const App = () => {


  const [domain] = useState("http://localhost:3000")
  const [server] = useState("http://127.0.0.1:3001/")
  const [user, setUser] = useState(sessionStorage.getItem("isAuth") === "true" ? {
    "name" : sessionStorage.getItem("name"),
  }:null)
  const [res,setRes] = useState({
    "access_token" : "",
    "user_id" : ""
  })
  const [isAuth,setAuth] = useState(sessionStorage.getItem("isAuth") === "true" ? true : false);


  return (
    <div className="App">
      <Main isAuth = {isAuth}
            user = {user}
            server = {server}/>
      {!isAuth ? <Auth setAuth = {setAuth}
            isAuth = {isAuth}
            setUser = {setUser}
            setRes = {setRes}
            res = {res}
            user = {user}
            domain = {domain}/> :
            <Logout/>}
    </div>
  );
}


export default App;