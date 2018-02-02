import React, { Component } from 'react';


// stateless components
import Header from './components/Header';

// statefull components
import Grid from './components/Grid';
import Form from './components/Form';

// firebase
import firebase from 'firebase';

import _ from 'lodash';


const styles = {
  textAlign: 'center',
  margin: 0,
  padding: 0,
  fontFamily: 'sans-serif'
}


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      notes: [],
      name: 'Anna',
      currentTitle: '',
      currentDetails: '',
    }
  }

  componentWillMount(){
    firebase.initializeApp({
          apiKey: "AIzaSyBxQy4PnrPE2ec7y6xbYusFTPMzbeW7U8E",
          authDomain: "notepad-c434b.firebaseapp.com",
          databaseURL: "https://notepad-c434b.firebaseio.com",
          projectId: "notepad-c434b",
          storageBucket: "notepad-c434b.appspot.com",
          messagingSenderId: "580381130536"
    });

    firebase.database().ref('/notes')
      .on('value', snapshot => {
        const fbstore = snapshot.val();

        const store = _.map(fbstore, (value, id) => {
          return {
            id: id,
            title: value.title,
            details: value.details,
          };
        });
        this.setState({
          notes: store,
        });
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!");
    const data = {
      title: this.state.currentTitle,
      details: this.state.currentDetails
    };
    firebase.database().ref('/notes').push(data, response => response);
    this.setState({
      currentTitle: '',
      currentDetails: '',
    });
  }

  deleteNote(id) {
    firebase.database().ref(`/notes/${id}`).remove();
    alert("Successfully deleted.");
  }

  render() {
    return (
      <div className={styles}>
      
        <Header name={this.state.name} />
        
        <Form currentTitle={this.state.currentTitle} currentDetails={this.state.currentDetails} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
        <Grid notes={this.state.notes} deleteNote={this.deleteNote.bind(this)} />

      </div>
    );
  }
}

export default App;
