'use strict';

const e = React.createElement;

// a JS file, yay!
// import React from 'react';
// import ReactDom from 'react-dom';
// import './index.css';
// import { nanoid } from 'nanoid';
// import App from './App';




// create your database
// let db;

/*
  dialogue control buttons section
*/

class SaveDialogueButton extends React.Component {
  render() {

    return(
      <button 
        className="save-button"
        onClick={this.props.onClick}
      >
        Save Dialogue
      </button>
    )
  }
}

class ClearDialogueButton extends React.Component {
  render() {
    return(
      <button
        className="save-button"
        onClick={this.props.onClick}
      >
        Clear Dialogue
      </button>
    );
  }
}

class DialogueButtonsContainer extends React.Component {
  render() {
    return(
      <div className="save-button-container">
        <SaveDialogueButton 
          sentences={this.props.sentences}
          currentDialogueTitle={this.props.currentDialogueTitle}
          onClick={this.props.onSaveClick}
        />
        <ClearDialogueButton 
          sentences={this.props.sentences}
          onClick={this.props.onClearClick}
        />
        {/*<LoadDialogueButton 
          sentences={this.props.sentences}
          onClick={this.props.onLoadClick}
        />*/}
      </div>
    );
  }
} 

/*
  display current dialogue section
*/

class Sentence extends React.Component {
  render() {
    const sentence = this.props.sentence;
    const speaker = this.props.speaker;
    return (
      <div className="dialogue-line">
        <p className="dialogue-speaker">{speaker}: </p>
        <p className="dialogue-sentence">{sentence}</p>
      </div>

    );
  }
}

class DialogueText extends React.Component {
  render() {
    const sentences = [];
    // const nextLine = this.props.nextLine;
    this.props.sentences.forEach((sentence, i) => {
      sentences.push(
        <Sentence
          speaker={sentence.speaker}
          sentence={sentence.line}
          key={i}
        />
      )
    });

    return(
      <div 
        className="dialogue-text"
      >
        {sentences}
      </div>
    )
  }
}

class CurrentSpeakerText extends React.Component {
  render() {
    const currentSpeakerText = this.props.currentSpeakerText
    const currentSpeakerIsA = "Speaker " + (this.props.currentSpeakerIsA ? "A" : "B") + ": "
    return(
      <p>{currentSpeakerIsA + " " + currentSpeakerText}</p>
    );
  }
}

class DialogueContainer extends React.Component {
  
  render() {
    return (
      <div className="dialogue-section">
        <DialogueButtonsContainer 
          sentences={this.props.sentences}
          currentDialogueTitle={this.props.currentDialogueTitle}
          onSaveClick={this.props.onSaveDialogue}
          onClearClick={this.props.onClearDialogue}
          onLoadClick={this.props.onLoadDialogue}
        />
        <DialogueText 
          sentences={this.props.sentences}
        />
        <CurrentSpeakerText 
          currentSpeakerText={this.props.currentSpeakerText}
          currentSpeakerIsA={this.props.currentSpeakerIsA}
        />
      </div>

    );
  }
}

/*
  write dialogue section
*/

class DialogueTitle extends React.Component {
  render() {
    return(
      <div className="dialogue-title-container">
        <label>
          What is the title? 
          <input
            value={this.props.currentDialogueTitle}
            onChange={this.props.onChange}
            placeholder="Title..."
          ></input>
        </label>
      </div>
    )
  }
}

class CurrentSpeakerTracker extends React.Component {
  render() {
    const currentSpeakerIsA = this.props.currentSpeakerIsA;
    return(

      <p>Current speaker: {currentSpeakerIsA ? "A" : "B"}</p>
    )
  }
}

class CurrentSpeakerInput extends React.Component {
  render() {
    return(
      <textarea
        id="currentSpeakerInput"
        className="speaker-input-textarea"
        type="text"
        placeholder={"What do you want to say?"}
        value={this.props.currentSpeakerText}
        onChange={this.props.onChange}
      >
      </textarea>

    );
  }
}

class SwitchCurrentSpeakerButton extends React.Component {
  render() {
    return(
      <button 
        // type="submit"
        className="speaker-input-button"
        onClick={this.props.onClick}
      >
      Submit
      </button>

    )
  }
}

class InputContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSpeakerText: '',
    }
    this.handleCurrentSpeakerTyping = this.handleCurrentSpeakerTyping.bind(this);
    this.handleSwitchSpeaker = this.handleSwitchSpeaker.bind(this);
    this.handleGiveDialogueTitle = this.handleGiveDialogueTitle.bind(this);
  }

  handleCurrentSpeakerTyping(e) {
    this.props.onCurrentSpeakerTyping(e)
  }

  handleSwitchSpeaker() {
    this.props.onSwitchSpeaker()
  }

  handleGiveDialogueTitle(e) {
    this.props.onGiveDialogueTitle(e)
  }

  render() {
    return (
      <div className="dialogue-inputs-container">
        <h2>New Dialogue</h2>
        <DialogueTitle 
          currentDialogueTitle={this.props.currentDialogueTitle}
          onChange={this.handleGiveDialogueTitle}
        />
        <CurrentSpeakerTracker 
          currentSpeakerIsA={this.props.currentSpeakerIsA}
        />
        <div className="speaker-inputs">
          <CurrentSpeakerInput 
            currentSpeakerText={this.props.currentSpeakerText}
            onChange={this.handleCurrentSpeakerTyping}
            value={this.props.currentSpeakerText}
          />
          <SwitchCurrentSpeakerButton 
            onClick={this.handleSwitchSpeaker}
          />
        </div>
      </div>
    )
  }
}

/*
  saved dialogue list section
*/


class LoadSavedDialogueButton extends React.Component {
  render() {
    return(
      <button 
        className="saved-dialogue-list-load-button"
        datatitle={this.props.datatitle}
        onClick={this.props.onClick}
      >
        load
      </button>
    );
  }
}

class DeleteSavedDialogueButton extends React.Component {
  render() {
    return(
      <button
        className="saved-dialogue-list-delete-button"
        datatitle={this.props.datatitle}
        onClick={this.props.onClick}

      >
        delete
      </button>
    );
  }
}

class SavedDialogueTitle extends React.Component {
  render() {
    return(
        <p>{this.props.title}</p> 
    )
  }
}

class SavedDialogueListItem extends React.Component {
  render() {
    return(
      <div className="saved-dialogue-list-item">
        <SavedDialogueTitle 
          title={this.props.title}
        />
        <div>
          <LoadSavedDialogueButton
            // key={nanoid()} 
            onClick={this.props.onLoadDialogue}
            datatitle={this.props.title}
          />
          <DeleteSavedDialogueButton 
            // key={nanoid()}
            onClick={this.props.onDeleteDialogue}
            datatitle={this.props.title}
          />
        </div>
      </div>
    );
  }
}

class SavedDialogueList extends React.Component {
  render() {
    const savedDialoguesString = localStorage.getItem('dialogue_list');
    console.log(savedDialoguesString);
    if (savedDialoguesString === null) {
      return(
        <div className="saved-dialogue-list">
          <h2>Saved Dialogues</h2>
          <p>There are no dialogues</p>
        </div>
      )
    } else {  
      const savedDialoguesArray = savedDialoguesString.split(', ')
      const savedDialoguesList = [];

      let keyCount = 0;

      savedDialoguesArray.forEach((title, i) => {
        savedDialoguesList.push(
          <SavedDialogueListItem 
            key={keyCount}
            title={title}
            onLoadDialogue={this.props.onLoadDialogue}
            onDeleteDialogue={this.props.onDeleteDialogue}
          />
          
        )
      keyCount++
      }) 

      return(
        <div className="saved-dialogue-list">
          <h2>Saved Dialogues</h2>
          {savedDialoguesList}
        </div>
      )
    }
  } 
}



class WriteNewDialogueButton extends React.Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.props.onClick}
      >
      write dialogue
      </button>   
    )   
  }
}

class ViewSavedDialoguesButton extends React.Component {
  render() {
    return(
      <button
        className={this.props.className}
        onClick={this.props.onClick}
      >
      load dialogue
      </button>
    )
  }
}

class ToggleViewButtons extends React.Component {
  render() {
    return(
      <div className="app-view-toggles">
        <p>What do you want to do?</p>
        <div className="view-toggle-button-wrapper">
          <WriteNewDialogueButton 
            className={this.props.writeButtonStyle}
            onClick={this.props.onWritingViewClick}
          />
          <ViewSavedDialoguesButton 
            className={this.props.loadButtonStyle}
            onClick={this.props.onSavedDialogueViewClick}
          />
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return(
      <div className="app-header">
        <h1>Dialogue Writer</h1>
        <p>
          Write 2 person dialogues for your English classes
          so your students can practice speaking. Save and edit up to 5 dialogues
          any time.
        </p>
      </div>
    );
  }
}

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: [],
      currentDialogueTitle: '',
      dialogueTitleList: localStorage.getItem('dialogue_list'),
      numberOfDialogues: this.props.numberOfDialogues,
      nextLine: '',
      currentSpeakerIsA: true,
      currentSpeakerText: '',
      isViewingSavedDialogues: false,
      writeButtonStyle: 'view-toggle-button-selected',
      loadButtonStyle: 'view-toggle-button'
    }
    // functions to toggle between views
    this.handleSwitchToWritingView = this.handleSwitchToWritingView.bind(this);
    this.handleSwitchToSavedDialoguesView = this.handleSwitchToSavedDialoguesView.bind(this);
    // function to give dialogue title
    this.handleGiveDialogueTitle = this.handleGiveDialogueTitle.bind(this);
    // function to capture current speaker's text
    this.handleCurrentSpeakerTyping = this.handleCurrentSpeakerTyping.bind(this);
    // function to toggle between speakers
    this.handleSwitchSpeaker = this.handleSwitchSpeaker.bind(this);
    // function to save dialogue
    this.handleSaveDialogue = this.handleSaveDialogue.bind(this);
    // function to clear dialogue
    this.handleClearDialogue = this.handleClearDialogue.bind(this);
    // function to load old dialogue
    this.handleLoadDialogue = this.handleLoadDialogue.bind(this);
    // function to delete old dialogue
    this.handleDeleteDialogue = this.handleDeleteDialogue.bind(this);
  }

  // functions to toggle between "write dialogue" and "see saved dialogues" views

  

  handleSwitchToWritingView() {
    this.setState({
      isViewingSavedDialogues: false,
      writeButtonStyle: 'view-toggle-button-selected',
      loadButtonStyle: 'view-toggle-button'
    })
  }

  handleSwitchToSavedDialoguesView() {
    this.setState({
      isViewingSavedDialogues: true,
      writeButtonStyle: 'view-toggle-button',
      loadButtonStyle: 'view-toggle-button-selected'
    })
  }

  handleGiveDialogueTitle(e) {
    // it is going to be the same as above
    // console.log("You are setting the title!")
    this.setState({
      currentDialogueTitle: e.target.value
    })
  }

  handleCurrentSpeakerTyping(e) {
    // console.log(e.target.value)
    this.setState({
      currentSpeakerText: e.target.value,
    })
  }

  handleSwitchSpeaker() {
    const currentSpeakerInput = document.getElementById('currentSpeakerInput');

    if (!this.state.currentSpeakerIsA) {
      this.setState({
        sentences: this.state.sentences.concat([{line: this.state.currentSpeakerText, speaker: (this.state.currentSpeakerIsA ? "A" : "B")}]),
        currentSpeakerIsA: true,
        currentSpeakerText: ''
      });
    } else {
      this.setState({
        sentences: this.state.sentences.concat({line: this.state.currentSpeakerText, speaker: (this.state.currentSpeakerIsA ? "A" : "B")}),
        currentSpeakerIsA: false,
        currentSpeakerText: ''
      })
    }
    currentSpeakerInput.focus();
  }

  handleSaveDialogue() {
    // check if there are 5 dialogues in local storage
    if (!(this.state.numberOfDialogues < 5)) {
      alert("you already have 5 dialogues, please delete one before making more")
      return;
    } else {
      console.log("you can still save dialogues")
    }

    // check if the title is taken
    console.log(this.state.currentDialogueTitle)
    console.log(this.state.dialogueTitleList)
    if (this.state.currentDialogueTitle === "") {
      alert("You need to give your dialogue a title")
      return;
    }

    // check if the dialogue list is empty 
    // and check if the dialogue is already in the list
    if (this.state.dialogueTitleList !== null && this.state.dialogueTitleList.includes(this.state.currentDialogueTitle)) {
      alert("This title is already in your saved dialogue list. This new dialogue will save over the old one.")
      let dialogue = this.state.sentences;
      let currentDialogueTitle = this.state.currentDialogueTitle
      let stringDialogue = JSON.stringify(dialogue);
      localStorage.setItem(currentDialogueTitle, stringDialogue);
      alert("You saved your dialogue")
      return;
    }

    // Part 1: update the list of dialogue titles
    // grab the current dialogue title
    let currentDialogueTitle = this.state.currentDialogueTitle
    // console.log(currentDialogueTitle)

    // grab the previous updated title list
    let dialogueTitleList = this.state.dialogueTitleList
    // console.log(dialogueTitleList)

    // buggy behavior, if list null needs to be set to empty string..
    // something needs to be fixed here
    if (this.state.dialogueTitleList === null) {
      dialogueTitleList = ''
    }

    // add the current title to the previous title list
    if (dialogueTitleList === '') {
      dialogueTitleList += currentDialogueTitle;
    } else {
      dialogueTitleList += `, ${currentDialogueTitle}`;
    }

    // set title list state to the newly updated title list
    this.setState({
      dialogueTitleList: dialogueTitleList,
      numberOfDialogues: this.state.numberOfDialogues + 1
    })

    // store the newly updated title list on top of 
    // the previously stored "dialogue_list"
    localStorage.setItem("dialogue_list", dialogueTitleList)

    // Part 2: store the current dialogue
    // console.log(dialogueTitleList)
    let dialogue = this.state.sentences;
    let stringDialogue = JSON.stringify(dialogue);
    localStorage.setItem(currentDialogueTitle, stringDialogue);
    alert("You saved your dialogue")
  }

  handleClearDialogue() {
    console.log("The clear button works!")
    this.setState({
      sentences: [],
      currentSpeakerIsA: true
    })
  }

  handleLoadDialogue(e) {
    // console.log("success");
    // console.log(e.target);
    // console.log(e.target.getAttribute('datatitle'));
    const storedDialogue = JSON.parse(localStorage.getItem(e.target.getAttribute('datatitle')))
    // console.log("logging the storedDialogue")
    // console.log(storedDialogue)
    this.setState({
      sentences: storedDialogue,
      currentDialogueTitle: e.target.getAttribute('datatitle'),
      isViewingSavedDialogues: false,
      writeButtonStyle: 'view-toggle-button-selected',
      loadButtonStyle: 'view-toggle-button'
    })
    if (storedDialogue.length === 0) {
      this.setState({
        currentSpeakerIsA: true, 
      })
    } else if (storedDialogue[storedDialogue.length-1].speaker === "B") {
      this.setState({
        currentSpeakerIsA: true, 
      })
    } else {
      this.setState({
        currentSpeakerIsA: false,
      })
    }

    // focusInputOnLoad();
  }

  handleDeleteDialogue(e) {
    // console.log("you deleted a dialogue.")
    // 1. this function needs to delete from dialogues list
      // call the list of dialogues
      // turn it into an array
      // use .filter to remove the index when datatitle matches
      // return it to a string
      // setState = to the new string
      // dialogueTitleList is what we are setting state on
    // console.log(e.target.getAttribute('datatitle'))
    const thisDialogueTitle = e.target.getAttribute('datatitle')
    // console.log(thisDialogueTitle);
    // console.log(this.state.dialogueTitleList)
    const currentDialogueList = this.state.dialogueTitleList.split(', ');
    // console.log(currentDialogueList)
    const updatedDialogueList = currentDialogueList.filter((dialogue) => {
      if (!(dialogue === e.target.getAttribute('datatitle'))) {
        return dialogue
      }
    });
    // console.log("this is your updated dialogue list")
    // console.log(updatedDialogueList)
    const updatedDialogueString = updatedDialogueList.join(', ')
    // console.log(updatedDialogueList[0])
    if (updatedDialogueList[0] === undefined) {
      localStorage.removeItem(thisDialogueTitle)
      localStorage.removeItem('dialogue_list')
    } else {
      localStorage.removeItem(thisDialogueTitle)
      localStorage.setItem('dialogue_list', updatedDialogueString)

    }
    this.setState({
      dialogueTitleList: localStorage.getItem('dialogue_list'),
      numberOfDialogues: this.state.numberOfDialogues - 1
    })
    // localStorage.setItem('dialogue_list', updatedDialogues)
    // console.log(localStorage.getItem('dialogue_list'))
    // this.setState({
    //  dialogueTitleList: updatedDialogues
    // })
    // this.setState({
    //  dialogueTitleList: updatedDialogues
    // })


    // 2. and also delete the actual dialogue in storage
      // take the datatitle
      // use it to directly remove that dialogue from storage
      // we should be able to keep storage clean, too

  }

  render() {

    if (!this.state.isViewingSavedDialogues) {
      return (
        <div className="appContainer">
          <Header />
          <ToggleViewButtons 
            writeButtonStyle={this.state.writeButtonStyle}
            loadButtonStyle={this.state.loadButtonStyle}
            onWritingViewClick={this.handleSwitchToWritingView}
            onSavedDialogueViewClick={this.handleSwitchToSavedDialoguesView}
          />
          <InputContainer 
            currentDialogueTitle={this.state.currentDialogueTitle}
            currentSpeakerText={this.state.currentSpeakerText}
            currentSpeakerIsA={this.state.currentSpeakerIsA}
            onCurrentSpeakerTyping={this.handleCurrentSpeakerTyping}
            onSwitchSpeaker={this.handleSwitchSpeaker}
            onGiveDialogueTitle={this.handleGiveDialogueTitle}
          />
          <DialogueContainer
            sentences={this.state.sentences}
            currentDialogueTitle={this.state.currentDialogueTitle}
            currentSpeakerText={this.state.currentSpeakerText}
            currentSpeakerIsA={this.state.currentSpeakerIsA}
            numberOfDialogues={this.state.numberOfDialogues}
            onSaveDialogue={this.handleSaveDialogue}
            onClearDialogue={this.handleClearDialogue}
            
          />
        </div>
      ); 
    } else {
      return(
        <div className="appContainer">
          <Header />
          <ToggleViewButtons 
            writeButtonStyle={this.state.writeButtonStyle}
            loadButtonStyle={this.state.loadButtonStyle}
            onWritingViewClick={this.handleSwitchToWritingView}
            onSavedDialogueViewClick={this.handleSwitchToSavedDialoguesView}
          />
          <SavedDialogueList 
            onLoadDialogue={this.handleLoadDialogue}
            onDeleteDialogue={this.handleDeleteDialogue}
          />
          
        </div>
      );
    }
  }
}


function checkExistingLocalStorage() {
    console.log("checking existing local storage")
    return localStorage.getItem('dialogue_list');
  }

const existingStorage = checkExistingLocalStorage();

function handleFindNumberOfDialogues() {
  console.log("checking for dialogues list")
  // console.log(localStorage.getItem('dialogue_list'))
  // console.log(localStorage.getItem('dialogue_list').split(', '))
  // // const dialogues = localStorage.getItem('dialogue_list').split(', ')
  // // console.log(dialogues.length)
  // // return dialogues.length
  if (localStorage.getItem('dialogue_list') !== null) {
      const dialogues = localStorage.getItem('dialogue_list').split(', ')
      console.log(dialogues.length)
      return dialogues.length
    } else {
      let dialoguesLength = 0;
      return dialoguesLength;
    }
}

const numberOfDialogues = handleFindNumberOfDialogues();


function focusInputOnLoad() {
  const currentSpeakerInput = document.getElementById('currentSpeakerInput');
  currentSpeakerInput.focus()
}

// focusInputOnLoad();




const domContainer = document.querySelector('#root');
ReactDOM.render(<AppContainer
    // checkExistingLocalStorage={checkExistingLocalStorage}
    existingStorage={existingStorage}
    numberOfDialogues={numberOfDialogues}
  />, domContainer);


<AppContainer
    // checkExistingLocalStorage={checkExistingLocalStorage}
    existingStorage={existingStorage}
    numberOfDialogues={numberOfDialogues}
  />

// ReactDom.render(
//   <AppContainer
//     // checkExistingLocalStorage={checkExistingLocalStorage}
//     existingStorage={existingStorage}
//     numberOfDialogues={numberOfDialogues}
//   />,
//   domContainer
// );