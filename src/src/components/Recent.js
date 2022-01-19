import React from 'react'
import { useHistory } from 'react-router-dom'

const Recent = () => {
    const recentRooms = JSON.parse(localStorage.getItem("recent"))
    const history = useHistory()
    const change = () => {
        const dropdown = document.getElementById("select");
        const room = dropdown.options[dropdown.selectedIndex].value;
        history.push(`/rooms/${room}`)
    }
    return (
        <>
            <br />
            <br />
            <h1>Recent Rooms</h1>
            <select id="select" disabled={!recentRooms} onChange={change} className="form-select">
                <option>{!recentRooms ? 'No recent rooms to display' : 'Choose a Room'}</option>
                {recentRooms ? recentRooms.map(room => {
                    return <option key={room} onClick={() => console.log(room)} value={room}>{room}</option>
                }) : ""}
            </select>
        </>
    )
}
export default Recent;
