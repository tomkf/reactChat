import React from 'react';

export default class ChatBar extends React.Component {
//       isName: "Anonymous"

   constructor(props) {
     super(props);
     this.state = {
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


// assignName(){
//   this.setState(this.setName)
// }

// setName(state){
//   return {
//     isName: this.refInputName.value
//   }
// }



  mySubmitHandler = event => {
    event.preventDefault();
    const inputName = this.refInputName.value

    //  if (this.refInputName.value !== ""){
    //    this.assignName()
    //  }


    const inputEmail = this.refInputEmail.value;
    const inputMessage = this.refInputMessage.value;
    const inputStamp = this.convertDate(new Date())

    const message = {name: inputName, email: inputEmail, content: inputMessage, stamp: inputStamp}


   if (this.refInputEmail.value == "") {
    this.state.isEmail = false
     this.handleEmail()
  } else {
    this.state.isEmail = false
    this.props.addMessage(message)
  }

    this.refInputMessage.value = ""
  }




  render() {
    return (
        <div>
{   this.state.isEmail &&
          <div className="toolTip" >
            EMAIL 🐱
          </div>
        }


          <h4>Leave a Comment</h4>
          <form onSubmit={this.mySubmitHandler}>
            <label>Your name
            <input

          //  onClick={style={background: yellow}}
          //  onClick={this.handleMouseHover}
              type="text"
              name="name"
              ref={(node) => (this.refInputName = node)} 
            />

            </label>
            <label>Your email
            <input

          //  onClick={this.handleMouseHover}
          //  onClick={this.handleMouseHover}
              type="text"
              name="email"
              ref={(node) => (this.refInputEmail = node)}
            />
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







//   constructor(props) {
//     super(props);
//     this.state = {
//       myName: null,
//       myEmail: null,
//      myStamp: null,
//      myContent: null
//     };

//  mySubmitHandler = event => {
//    event.preventDefault();
//    const message = {name: this.state.myName, email: this.state.myEmail, stamp: this.state.myStamp, content: this.state.myContent,}
//  this.props.addMessage(message)
//   }

//   render() {
//   return (
//     <footer >
//           <form onSubmit={this.mySubmitHandler}>
//           <h1>Your name</h1>
//           <input type="text" name="name" onChange={this.nameHandler} />
//           <h1>Your email</h1>
//           <input type="text" name="email" onChange={this.emailHandler} />
//           <h1>Your message</h1>
//           <textarea onChange={this.contentHandler} />
//           <br />
//           <input type="submit" />
//         </form>
//     </footer>
//     )
//   };
 //};

//   render() {
//     return (
//         <footer>
//           <form onSubmit={this.mySubmitHandler}>
//             <h1>Your name</h1>
//             <input
//               type="text"
//               name="name"
//               ref={(node) => (this.refInputName = node)} // <-- ref
//             />
//             <h1>Your email</h1>
//             <input
//               type="text"
//               name="email"
//               ref={(node) => (this.refInputEmail = node)} // <-- ref
//             />
//             <h1>Your message</h1>
//             <textarea ref={(node) => (this.refInputMessage = node)} /> // <-- ref
//             <br />
//             <input type="submit" />
//           </form>
//         </footer>
//       )
//   };
// };



