import React, { useContext } from 'react'
import { MessageDialogContext } from '../App'

function MessageDialog() {
    const { message } = useContext(MessageDialogContext)

    return (
        <div className={message.type === 'success' ? "alert alert-success d-flex align-items-center" : "alert alert-danger d-flex align-items-center"} role="alert">
            {message.msg}
        </div>
    )
}

export default MessageDialog    