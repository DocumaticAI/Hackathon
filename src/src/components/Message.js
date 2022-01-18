import React from 'react'

const Message = ({ message, auth }) => {
    const { text, uid, photoURL, username } = message;
    const position = uid === auth.currentUser.uid ? "right" : null;
    return (<>
      <div className="msg-row">
        <div className={`msg-text ${position}`}>
          <h2>{username}</h2>
          <p>{text}</p>
        </div>
        <img src={photoURL} />
      </div>
    </>)
}

export default Message
