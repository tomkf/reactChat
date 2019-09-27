import React from 'react';

export default class ChatBar extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       bgcolor: "",
       isEmail: false     };
     }

  convertDate = dateTarget => {
    const months = [
      "January",
      "Feubuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let formatted_date =
      dateTarget.getDate() +
      " " +
      months[dateTarget.getMonth()] +
      " " +
      dateTarget.getFullYear();
    return formatted_date;
  };

  handleEmail() {
    this.setState(this.toggleEmail);
  }

  toggleEmail(state) {
    return {
      isEmail: !state.isEmail
    };
  }



  mySubmitHandler = event => {
    event.preventDefault();
    const inputName = this.refInputName.value


    const inputEmail = this.refInputEmail.value;
    const inputMessage = this.refInputMessage.value;
    const inputStamp = this.convertDate(new Date())

    const message = {name: inputName, email: inputEmail, content: inputMessage, stamp: inputStamp}


   if (this.refInputEmail.value == "") {
    this.state.isEmail = false
     return this.handleEmail()
  } else {
    this.state.isEmail = false
    this.props.addMessage(message)
  }

    this.refInputMessage.value = ""
  }

  handleHover = event => {
this.setState({
  bgcolor: "#ffffdb"
})
  }

  handleHoverAway = event => {
    this.setState({
      bgcolor: ""
    })
  }

  render() {
    return (
        <div>
          <h4>Leave a Comment</h4>
          <form onSubmit={this.mySubmitHandler}>
            <label>Your name <small>*</small>
            <input
             onMouseEnter={this.handleHover}
             onMouseLeave={this.handleHoverAway}
             style={{backgroundColor: this.state.bgcolor}}
              type="text"
              name="name"
              ref={(node) => (this.refInputName = node)} 
            />

            </label>
            <label>Your email <small>*</small>
            <input
             onMouseEnter={this.handleHover}
             onMouseLeave={this.handleHoverAway}
            className="email-input"
            style={{backgroundColor: this.state.bgcolor}}
              type="text"
              name="email"
              ref={(node) => (this.refInputEmail = node)}
            />
            {   this.state.isEmail &&
          <div id="toolTip" >
          Please fill out this field
          </div>
         }
            </label>
            <label>Your message
            <textarea ref={(node) => (this.refInputMessage = node)} /> 
            </label>
            <br />
            <input className="submit-button" type="submit" value="Submit comment" />
           </form>
          
        </div>
      )
  };
};
