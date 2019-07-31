import React from 'react';

export default class Message extends React.Component {
  render() {
    return (
      <div className="message-grey">
      <div>
        <p className="message-stamp">{this.props.message.stamp}</p>
        <span>By <a className="message-username" href={"mailto:" + this.props.message.email}> {this.props.message.name}</a>
        </span>
        </div>
        <p className="message-content">{this.props.message.content}</p>
      </div>
    )
  }
}