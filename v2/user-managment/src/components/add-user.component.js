import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class addUser extends Component {
  constructor(props) {
    super(props);

    /* binding "this", to specify what "this" is refering to */
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    /* initial the state of the component */
    this.state = {
      username: '',
      gender: '',
      dob: new Date(),
      news : '',
      email : '',
      photo : null
    }
  }

  /* react lifecycle method that react call automaticly in different point */
  /* react will call this method before loading any component in the page */

  /* componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  } */

  onChangeUsername(e) {
    this.setState({
      /* targer is the text box */
      username: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangeDob(dob) {
    this.setState({
      dob: dob
    })
  }

  onChangeNews(e) {
    this.setState({
      news: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    })
  }

  onSubmit(e) {
    /* prevent the default HTML form submit behavior */
    /* prevent page loading */
    e.preventDefault();

    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: this.state.dob,
      news: this.state.news,
      email : this.state.email,
      photo : this.state.photo
    }

    console.log(user);

    axios.post('http://localhost:5000/users', user)
      .then(res => console.log(res.data));

      this.setState = {
        username: '',
        gender: '',
        dob: new Date(),
        news : '',
        email : '',
        photo : null
      }
    /* to turn back to the home page */
    /* window.location = '/'; */
  }

  render() {
    return (
    <div>
      <h3>Add New User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
              {
                /* this.state.users : the array that contains all the username getted from BD */
                /* map to do something for each element in the array */
                /* this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                }) */
              }
        </div>
        <div className="form-group"> 
          <label>Gender : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}
              />
        </div>
        <div className="form-group">
          <label>Birth Date: </label>
          <div>
            <DatePicker
              selected={this.state.dob}
              onChange={this.onChangeDob}
            />
          </div>
        </div>
        <div className="form-group"> 
          <label>News : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.news}
              onChange={this.onChangeNews}
              />
        </div>
        <div className="form-group"> 
          <label>Email : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group"> 
          <label>Photo : </label>
          <input  type="text"
              className="form-control"
              value={this.state.photo}
              onChange={this.onChangePhoto}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Add user" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}