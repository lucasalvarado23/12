import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import API from "../utils/API";
import { Redirect } from 'react-router-dom';
import ImageUpload from '../components/imageUpload/imageUpload';
import history from '../history';
import { stringify } from 'querystring';

class Profile extends Component {
  state = {
    userID: "",
    userName: "",
    userEmail: "",
    occupation: "",
    aboutMe: "",
    hobbies: "",
    food: "",
    music: "",
    profile: ""
  };


  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;

    getProfile((err, profile, cb) => {
      this.regCheck(profile.email, profile);
    });
  }


  regCheck = (email, profile) => {
    console.log("from the regcheck " + profile.picture);
    API.registerCheck(email)
      .then(response => {
          //if email is not in the database
          if(response.data == null){
            window.location.replace(`/Register`);
            //if email is in the database
          }else{
            //get user name
            let res = response.data;
            let username = response.data.userName;
             //capitalize user name
             username = username.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
            //set userName state
             this.setState({ userID: res.userID, userName: username, userEmail: email, occupation: res.occupation, aboutMe: res.aboutMe, hobbies: res.hobbies, food: res.food, music: res.music, profile: profile.picture});
          }
      })
      .catch(error => { 
          console.log(error.response);
      })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + value + name);
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event, state, email) => {
   event.preventDefault()

   console.log("in here bozo: " + this.state.userEmail + this.state.userName);

    

    API.updateProfile({
    userID: this.state.userID,
    userName: this.state.userName.toLowerCase(),
    userEmail: this.state.userEmail.toLowerCase(),
    occupation: this.state.occupation,
    aboutMe: this.state.aboutMe, 
    hobbies: this.state.hobbies,
    food: this.state.food,
    music: this.state.music
   },
    this.state.userEmail.toLowerCase()

   )
   .then(function (response) {
    if(response.status == 200){
      console.log("changes made");
    }
   })
   //if there was an error registering, throw error
   .catch(function (error) {
    if(error.response){
      console.log(error.response);
    }
  // history.replace('/Attending');  
    })
  }

  render() {
  
    console.log("photo in render: " + this.state.profile);
    return (
      <div className="card bg"  col-sm-6>
    <div className="img-container">
          <Panel header="Profile">
          <div className="col-sm-6">

         
      <form onSubmit={(e)=>this.handleSubmit(e,this.state)}>
      <p>Update your profile</p>
       <label>
        <label>

              <input type="text" placeholder="User Name" name="userName" value={this.state.userName} 
              onChange={this.handleInputChange}/>
          </label>
          <br />
           <label>
              <input type="text" placeholder="Occupation" name="occupation" value={this.state.occupation} 
              onChange={this.handleInputChange}/>
          </label>
          <br />
        <label>
              <textarea name="aboutMe" placeholder="Tell us about you..." value={this.state.aboutMe} onChange={this.handleInputChange}></textarea>
          </label>
          <br />
          <label>
    <input type="text" placeholder="Hobbies" name="hobbies" value={this.state.hobbies}
    onChange={this.handleInputChange}/>
  </label>
  <br />
        <label>
    <input type="text" placeholder="Favorite Music" name="music" value={this.state.music}
    onChange={this.handleInputChange}/>
  </label>
        <br />
        <label>
            <input type="text" placeholder="Favorite Food" name="food"
            value={this.state.food} onChange={this.handleInputChange} />
        </label>
        </label>
        <input type="submit" value="Update Info" />
      </form>
          </div>
            <img src={this.state.profile} alt="profile" />
                  <ImageUpload/>
            <div>
            </div>
          </Panel>
        </div>
        </div>
    );
  }
}

export default Profile;