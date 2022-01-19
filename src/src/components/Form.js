import React, { useState } from 'react'
import Recent from './Recent'

const Form = () => {
    const [text, setText] = useState("")
    const submitForm = (e) => {
        e.preventDefault()
        window.location.href = `/rooms/${text}`
    }
    return (<div className="sign-in-container">
        <form onSubmit={submitForm} >
            <input required value={text}
                placeholder="Enter Room ID"
                onChange={
                    (e) => setText(e.target.value)}
                type="text"
                className="room-input" />
            <small style={{ color: '#1b1f23', textAlign: 'center' }}>Creates a new room
                if it doesn 't already exist.</small>
            <br />
            <button type="submit" className="submit-btn" ><span className="submit-btnspan">Submit</span></button>
            <Recent />
        </form>
    </div>
    )
}

export default Form