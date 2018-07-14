import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import './Detail.css';

class Detail extends Component {
  state = {
    attendee: [],
    currentRoom: ""
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    console.log("you made it");
    console.log('props' + this.props.match.params.id);


    API.getAttendee(this.props.match.params.id)
      .then(res => this.setState({ attendee: res.data }))
      .catch(err => console.log(err));
    
  }

  render() {
  
    
    return (

      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>{this.state.attendee.userName}</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
           
              <h2 className="notCentered">Occupation</h2>
              <p>{this.state.attendee.occupation}</p>
              <h2 className="notCentered">About Me</h2>
              <p>{this.state.attendee.aboutMe}</p>
              <h2 className="notCentered">Hobbies</h2>
              <p>{this.state.attendee.hobbies}</p>
              <h2 className="notCentered">Food</h2>
              <p>{this.state.attendee.food}</p>
              <h2 className="notCentered">Music</h2>
              <p>{this.state.attendee.music}</p>

                          <Link to={"/"}>← Back to the Event Room</Link>

              
            </article>
          </Col>
        </Row>
    
      </Container>

    

    );
  } 
}

export default Detail;
