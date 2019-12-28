import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination'

/* functional component : no state no componentDidMount*/
const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.dob.substring(0,10)}</td>
    <td>{props.user.news}</td>
    <td>{props.user.email}</td>
    <td><img src={props.user.photo}/></td>
    <td>
      <Link to={"/edituser/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

/* class component */
export default class Mock extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onChangeSort = this.onChangeSort.bind(this)
    this.pagination = this.pagination.bind(this)
    this.ChangePage = this.ChangePage.bind(this)

    this.state = {
        users: [],
        page : 1,
        totalPages : 0,
        size : 10,
        genderSort : -1,
        dobSort : -1,
        active : 1
    };
  }

  componentDidMount() {

    // axios.get('https://randomuser.me/api')
    axios.get('http://localhost:5000/users/'+this.state.page+"/"+this.state.size)
      .then(response => {
        this.setState({ 
            users : response.data.docs,
            totalPages : response.data.totalPages 
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)}); 

    /* return every element form the exercises array if it's id is different of the parameter "id" */
    this.setState({
      users : this.state.users.filter(el => el._id !== id)
    })
  }

  usersList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  onChangeSearch(e){
    axios.get('http://localhost:5000/users/'+this.state.page+"/"+this.state.size+"?search="+e.target.value)
    .then(response => {
      this.setState({ 
          users : response.data.docs,
          totalPages : response.data.totalPages 
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeSort(e){
      console.log(e.target.value)
      if(e.target.value === "By gender"){
        this.setState({
            genderSort : this.state.genderSort*-1
        })
        axios.get('http://localhost:5000/users/'+this.state.page+"/"+this.state.size+"?gender="+this.state.genderSort*-1)
            .then(response => {
            this.setState({ 
                users : response.data.docs,
                totalPages : response.data.totalPages 
            })
            })
            .catch((error) => {
            console.log(error);
            })
      }
      if(e.target.value === "By Birth date")
      {
        this.setState({
            dobSort : this.state.dobSort*-1
        })
        axios.get('http://localhost:5000/users/'+this.state.page+"/"+this.state.size+"?dob="+this.state.dobSort*-1)
            .then(response => {
            this.setState({ 
                users : response.data.docs,
                totalPages : response.data.totalPages 
            })
            })
            .catch((error) => {
            console.log(error);
            })
      }
      if(e.target.value === ""){
        axios.get('http://localhost:5000/users/'+this.state.page+"/"+this.state.size)
        .then(response => {
          this.setState({ 
              users : response.data.docs,
              totalPages : response.data.totalPages 
          })
        })
        .catch((error) => {
          console.log(error);
        })
      }
  }

  ChangePage(e){
      this.setState({
          page : parseInt(e.target.text),
          active : parseInt(e.target.text)
      })

      console.log("http://localhost:5000/users/"+e.target.text+"/"+this.state.size)
      axios.get("http://localhost:5000/users/"+parseInt(e.target.text)+"/"+this.state.size)
      .then(response => {
        this.setState({ 
            users : response.data.docs,
            totalPages : response.data.totalPages 
        })
      })
      .catch((error) => {
        console.log(error);
      })

  }
  pagination(){
    let items = [...Array(10).keys()];
    return items.map(item => {
        return <Pagination.Item key={item+1} active={item+1 === this.state.active} onClick={this.ChangePage}>
          {item+1}
        </Pagination.Item>;
    })
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <div className="form-group"> 
            <label>Search : </label>
            <input  type="text"
              className="form-control"
              placeholder="username..."
              onChange={this.onChangeSearch}
              />
            <label>Sorted By : </label>
            <select
                ref="userInput"
                required
                className="form-control"
                onChange={this.onChangeSort}
            >
                <option></option>
                <option>By gender</option>
                <option>By Birth date</option>
            </select>
        </div>
        <div className="container">
            <Pagination>
                {this.pagination()}
            </Pagination>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Gender</th>
              <th>Birth date</th>
              <th>News</th>
              <th>Email</th>
              <th>Photo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}