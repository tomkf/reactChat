import React from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {

  render() {
    const displaymessages = this.props.messages.map(message => (
      message.type === "incomingNotification" ?
         (<div className="notification" key={message.id}>
            <span className="notification-content">{message.content}</span>
          </div>  
        )
        : 
        <Message id={message.id} key={message.id} message={message} />
        ))
    return (
    <main className="messages">
        <h4>Comments</h4>
      {displaymessages}
    </main>
    )
  }
};

