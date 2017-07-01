import React, { Component, PropTypes } from 'react';
// import { render } from 'react-dom';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
  constructor(){
    super();
    this.state={
      question: []
    };
  }

  componentDidMount(){
    fetch('./question.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({question: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render(){
    return (
      <div className="app">
      <EditQuestion question={this.state.question} />
      <PreviewQuestion question={this.state.question} />
      </div>
    );
  }
}
App.propTypes = {
  question: PropTypes.object
}

class EditQuestion extends Component {

  handleClick = () => {
    console.log('this is:', this);
  }

   handleChange(event) {
     this.setState({short_desc: event.target.value});
   }

  handleSave(){
    this.props.bind(this);
  }

  handleSaveAndNew() {
    console.log('Save and New was pressed')
  }

  handleCancel(e){
    e.preventDefault();
    console.log('Cancel Pressed')
  }

  render(){
    return(
      <div className="edit-pane">
      <h1>Editing Question</h1>
      <button className="options_switcher" onClick={this.handleClick}>Options</button>
      <form>
      <p><label>Short Description</label></p>
          <input type="text"
             value={this.props.question.short_desc}
             onChange={this.handleChange.bind(this)}/>

      <p><label>Question Text <sup>*</sup></label></p>
          <textarea value={this.props.question.question}
             required={true}
             onChange={this.handleChange.bind(this)}/>

      <p><label>Hint</label></p>
        <input type="text"
         value={this.props.question.hint}
         onChange={this.handleChange.bind(this)}/>

      <p>
      <AnswerList answers={this.props.question.answers} />
      </p>
      <p>Randomize answers for each student
        <input type="checkbox"
              checked={this.props.question.randomize}
              onChange={this.handleChange.bind(this)} />
      </p>
      <p><label>Enumeration</label></p>
            <select value={this.props.question.enumtype}
                    onChange={this.handleChange.bind(this)}>
              <option value="a">a, b, c, d, e, f, ...</option>
              <option value="i">i, ii, iii, iv, v, ...</option>
            </select>

      <p><label>Default Points  <sup>*</sup></label></p>
          <input type="text"
             value={this.props.question.points}
             required={true}
             onChange={this.handleChange.bind(this)}/>
      <p>
      <button type="submit" autoFocus="true" onClick={this.handleSave.bind(this)}>Save</button>
      <button type="submit" onClick={this.handleSaveAndNew.bind(this)}>Save and New</button>
      <button type="cancel" onClick={this.handleCancel.bind(this)}>Cancel</button></p>
      </form>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
   )
 }
}

EditQuestion.propTypes = {
 question: PropTypes.object
}

class AnswerList extends Component {
  constructor(props) {
      super(props);
      this.state={
          answers: [
          {
            "id": 1,
            "answer": "Neutralization reaction",
            "correct": true
          },
          {
            "id": 2,
            "answer":"Salt reaction",
            "correct": false
          },
          {
            "id": 3,
            "answer": "Hydroxide reaction",
            "correct": false
          },
          {
            "id": 4,
            "answer": "Single replacement reaction",
            "correct": false
          }
        ]
        };
  }

  handleClick() {
    console.log('Add Answer was clicked');
  }

  // handleChange(e) {
  //   console.log('handleChange');
  //   this.setState({value: e.target.value});
  // }

  render(){
    const answers = this.state.answers;
    const answerItems = answers.map((answer) =>
        <AnswerItem key={answer.id.toString()}
                    value={answer} />)
    return(
      <div className="answer-list"><label>Answers <sup>*</sup></label>
      <ul>
        {answerItems}
       </ul>
      <button className="add_answer" onClick={this.handleClick}>Add Answer</button>
      </div>
    );
  }
}

class AnswerItem extends Component {
  constructor(props) {
      super(props);
      console.log('In AnswerItem this is:', this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleClick() {
    console.log('Clicked button to remove this answer from the list: ', this.props.value);
  }

  render() {
    return(
       <div className="answer-item">
         <li>☰
         <input type="radio" checked={this.props.value.correct} onChange={this.handleChange}/>
         <input type="text" value={this.props.value.answer} onChange={this.handleChange}/>
         <button className="remove_answer" onClick={this.handleClick}>&times;</button></li>
       </div>
    );
  }
}

class PreviewQuestion extends Component {
  // constructor(props) {
  //     super(props);
  // }

  render() {
    return <div className="preview-pane">
    <p>{this.props.question.question}</p>
    <ul>
    <ol><input type="radio"/><label>Neutralization reaction</label></ol>
    <ol><input type="radio"/><label>Salt reaction"</label></ol>
    <ol><input type="radio"/><label>Hydroxide reaction"</label></ol>
    <ol><input type="radio"/><label>Single replacement reaction"</label></ol>
    </ul>
    <p className="hint">Hint:</p>
    <p>{this.props.question.hint}</p>
     </div>
  }
}

export default App;
