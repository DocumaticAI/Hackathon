import Message from './Message'
import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import Logout from './Logout';

const ChatRoom = ({ firestore, auth, firebase }) => {
    // Messaging handler
    const latest = useRef();
    const room = useParams().id.toLowerCase();
    const model = firestore.collection('messages');
    const query = model.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [text, setText] = useState('');
    // Adding a message from the form
    const addMessage = async e => {
        e.preventDefault();
        const { uid, photoURL: avatar } = auth.currentUser;
        await model.add({
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: avatar,
            username: auth.currentUser.displayName,
            room: room
        })
        setText('');
        latest.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Adding to recent rooms element
    const setRecent = () => {
        const existingItems = JSON.parse(localStorage.getItem("recent"))
        if (existingItems) {
            if(!existingItems.includes(room)) {
                existingItems.push(room)
                localStorage.setItem("recent", JSON.stringify(existingItems))
            } else return;
        } else localStorage.setItem("recent", JSON.stringify([room]))
    }

    useEffect(setRecent, [])
    return (<>
        <div id="container" className="container">
            <Logout auth={auth} />
            <div id="chatbox" className="chatbox">
                <div id="col-1" className="col-1">
                    {messages && messages.filter(msg => msg.room === room).map(msg => <Message key={msg.id} message={msg} auth={auth} />)}
                    <span ref={latest}></span>
                    <br />
                    <br />
                    <form onSubmit={addMessage}>
                        <input className="send" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
                    </form>
                </div>
            </div>
        </div>
    </>)
}

export default ChatRoom;
