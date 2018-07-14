import React, { Component } from "react";
import queryString from 'query-string';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import profile from "../Profile/Profile";

class Attending extends Component {

  state = {
  
    attendees: [], 
    eventInfo: []
  };

  componentWillMount() {
    let id = queryString.parse(this.props.location.search).userVar;
    var res = id.split("?");

      console.log('this is the id: ' + res);
      console.log('red0:' + res[0]);
      console.log('res1:' + res[1]);
       
      this.attending(res[0]); //who is coming to the party

  // this.loadBooks();

    //grab all users in event

  }


  getEventInfo = (eventCode, entries) => {
    API.getActualEvent(eventCode)
    .then((response) => {
      this.setState({  attendees: entries, eventInfo: response.data });
    
    })
  }

  attending = (eventCode) => {
    API.getAttending(eventCode)
    .then((response) => {
      console.log("attending response: " + response.data);

    let entries = [];

    for (var i = 0; i < response.data.length; i++){
      entries[i] = response.data[i];
    }

    this.getEventInfo(eventCode, entries);

   // console.log('fromEntries: ' + entries[2].userName);
  })

    /*this.setState({    
    eventCreator: "", 
    eventID: "", 
    eventName: "", 
    eventLocation: "", 
    guestNumber: 0, 
    eventDescript: "", 
    date: "", 
    dress: "",  
    entries: entries})
   }) */
    //console.log("state: " + this.state.entries[0])
   //if there was an error registering, throw error
  
  }
/*
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", company: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };
*/

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        company: this.state.company,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {

    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
            </Jumbotron>
                          <h1>{this.state.eventInfo.eventName}</h1>
            <List>
               <ListItem key="hello">
                <Link to={"/books/"}>
                      <strong>
                       EVENT INFO
                      </strong>
                </Link>
               </ListItem>
            </List>

            {this.state.attendees.length ? (
              <List>
                {this.state.attendees.map(attendee => (
                  <ListItem key={attendee.userID}>
                    <Link to={"/attendee/" + attendee.userID + "?" + this.state.eventInfo.eventID}>
                      <strong>
                        {attendee.userName} is a: {attendee.occupation}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row> 
      </Container>
    );
  }
}

export default Attending;
