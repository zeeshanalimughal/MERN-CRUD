import Home from "./pages/Home";
import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { config } from './config/apiConfig'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddUsers from "./pages/AddUsers";
import UpdateUser from "./pages/UpdateUser";


export const UserContext = createContext()
export const MessageDialogContext = createContext()

function App() {

  const [users, setUser] = useState([])
  const [message, setMessage] = useState({})
  
  useEffect(function () {
    axios.get(config.baseURL).then(user => {
      setUser(user.data.user);
    })

  }, [])

  return (
    <UserContext.Provider value={{ users, setUser }}>
      <MessageDialogContext.Provider value={{message,setMessage}}>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="" element={<Home />} />
              <Route exact path="/adduser" element={<AddUsers />} />
              <Route exact path="/updateuser/:id" element={<UpdateUser />} />
            </Routes>
          </Router>
        </div>
      </MessageDialogContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
