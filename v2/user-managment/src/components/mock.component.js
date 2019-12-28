import React, { Component } from 'react';
import axios from 'axios';




/* class component */
export default class Mock extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      nomberUsers : 0
    }
  }

  componentDidMount() {

    // axios.get('https://randomuser.me/api')
    axios.get('http://localhost:5000/users')
      .then(response => {
        this.setState({ 
          nomberUsers : response.data.length
         })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmit(e){
    e.preventDefault();

    if(100 - this.state.nomberUsers > 0)
    {
      axios.get("https://randomuser.me/api/?results="+(100 - this.state.nomberUsers))
      .then(res =>{
        res.data.results.map(currentuser => {
          const user = {
            username : currentuser.login.username,
            gender : currentuser.gender,
            news : true,
            dob : currentuser.dob.date,
            email : currentuser.email,
            photo : currentuser.picture.medium
          }

          axios.post("http://localhost:5000/users/add", user)
              .then(res => {
                 console.log(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
    

  }


  render() {
    return (
      <div>
        <h3>Get Users</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Nombre of users in Database : </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.nomberUsers}
                disabled
                />
          </div>
          <div className="form-group">
          <input type="submit" value="Add users" className="btn btn-primary" />
        </div>
        </form>
      </div>
    )
  }
}