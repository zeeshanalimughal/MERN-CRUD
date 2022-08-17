import React, { useState, useContext } from 'react'
import axios from 'axios'
import { config } from '../config/apiConfig'
import { Link } from 'react-router-dom'
import { UserContext, MessageDialogContext } from '../App'
import MessageDialog from '../components/MessageDialog'




function AddUsers(params) {

  const [userData, setUserData] = useState({})

  const { setUser } = useContext(UserContext)
  const { message, setMessage } = useContext(MessageDialogContext)


  const handleInputChange = function (event) {
    let value = event.target.value;
    let name = event.target.name;
    setUserData({ ...userData, [name]: value })
  }

  const handleForm = (e) => {
    e.preventDefault()
    axios.post(config.baseURL, userData, {
      method: 'POST',
      'Content-Type': 'application/json',
    }).then(response => {
      if (response.data.status === true) {
        setMessage({ msg: response.data.message, type: 'success' });
        setTimeout(() => {
          setMessage({})
        }, 2000)
        axios.get(config.baseURL).then(user => {
          setUser(user.data.user);
        })
        e.target.reset();

      }
    }).catch(err => {
      console.clear()
      if (err && err.response && err.response.data && err.response.data.message) {
        setMessage({ msg: err?.response.data.message, type: 'danger' });
        setTimeout(() => {
          setMessage({})
        }, 2000)
      }
    })

  }


  return (
    <div className="container p-5">
      <form className="form w-50 mx-auto" id="form">
        {message.msg ? (
          <MessageDialog />
        ) : ''}
        <div class="form-group mb-4">
          <label className="mb-2" for="name">Name</label>
          <input type="text" class="form-control" name="name" placeholder="Enter name" id="name" onInput={handleInputChange} />
        </div>
        <div class="form-group mb-4">
          <label className="mb-2" for="Email">Email</label>
          <input type="text" class="form-control" name="email" placeholder="Enter Email" id="Email" onInput={handleInputChange} />
        </div>
        <div class="form-group mb-4">
          <label className="mb-2" for="Age">Age</label>
          <input type="text" class="form-control" name="age" placeholder="Enter Age" id="Age" onInput={handleInputChange} />
        </div>
        <div class="form-group mb-4">
          <label className="mb-2" for="Contact">Contact</label>
          <input type="text" class="form-control" name="contact" placeholder="Enter Contact" id="Contact" onInput={handleInputChange} />
        </div>
        <div class="form-group mb-4">
          <label className="mb-2" for="Address">Address</label>
          <input type="text" class="form-control" name="address" placeholder="Enter Address" id="Address" onInput={handleInputChange} />
        </div>
        <div class="form-group mb-4">
          <Link class="btn btn-warning me-3" to="/">Cancel</Link>
          <button type="submit" class="btn btn-primary" onClick={handleForm}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddUsers