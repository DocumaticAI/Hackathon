import Message from './Message'
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom'
import Logout from './Logout';

const ChatRoom = ({ firestore, auth, firebase }) => {
    const latest = useRef();
    const { id: room } = useParams();
    const model = firestore.collection('messages');
    const query = model.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [text, setText] = useState('');
    const addMessage = async e => {
        e.preventDefault();
        const { uid, photoURL: avatar } = auth.currentUser;
        await model.add({
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: avatar,
            username: auth.currentUser.displayName,
            room: room.toLowerCase()
        })
        setText('');
        latest.current.scrollIntoView({ behavior: 'smooth' });
    }
    return (<>
        <div id="container" className="container">
            <Logout auth={auth} />
            <div id="chatbox" className="chatbox">
                <div id="col-1" className="col-1">
                    {messages && messages.filter(msg => msg.room.toLowerCase() === room.toLowerCase()).map(msg => <Message key={msg.id} message={msg} auth={auth} />)}
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
