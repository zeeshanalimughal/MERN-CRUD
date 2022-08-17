import React,{useContext} from 'react'
import UserList from '../components/UserList'
import {
 Link
} from "react-router-dom";
import MessageDialog from '../components/MessageDialog';
import {MessageDialogContext } from '../App'




function Home() {
  
  const {message} = useContext(MessageDialogContext)

  return (
    <div className="container p-5">
       {message.msg ? (
          <MessageDialog/>
        ) : ''}
      <Link className="btn btn-primary mb-3" to="/adduser">
        Add User
      </Link>
      <table className="table table-striped table-light">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <UserList/>          
        </tbody>
      </table>
    </div>
  )
}

export default Home