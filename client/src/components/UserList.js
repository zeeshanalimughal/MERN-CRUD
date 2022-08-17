import React, { useContext } from 'react'
import { UserContext, MessageDialogContext } from '../App'
import axios from 'axios'
import { config } from '../config/apiConfig'
import { Link } from 'react-router-dom'
function UserList() {
    const { users, setUser } = useContext(UserContext)
    const { setMessage } = useContext(MessageDialogContext)


    const deleteUser = (id) => {

        window.confirm("Do you want to delete this user?") &&
            axios.delete(config.baseURL + "/" + id, {
                'Content-Type': 'application/json',
                'method': 'DELETE'
            }).then((response) => {
                if (response.data.status === true) {
                    setMessage({ msg: response.data.message, type: 'success' });
                    setTimeout(() => {
                        setMessage({})
                    }, 2000)
                    setUser(users.filter(user => user._id !== id))
                }
            }).catch(err => {
                if (err && err.response && err.response.data && err.response.data.message) {
                    setMessage({ msg: err?.response.data.message, type: 'danger' });
                    setTimeout(() => {
                        setMessage({})
                    }, 2000)
                }
            })

    }




    return (
        <>
            {users.map((user, key) => {
                return (
                    <tr key={key} className="p-5">

                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.contact}</td>
                        <td>{user.address}</td>
                        <td>
                            {/* <Link to='/adduser'  query:  {{ type: "edit", id: user._id }} className="ms-4 btn btn-primary">EDIT</Link> */}
                            <Link to={{ pathname: '/updateuser/'+user._id}} className="ms-4 btn btn-primary">EDIT</Link>

                            <button onClick={() => deleteUser(user._id)} className="ms-4 btn btn-danger">DELETE</button></td>
                    </tr>
                )
            })}
        </>
    )
}

export default UserList