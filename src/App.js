import React, { Component } from 'react';
import Block from './components/block';
import Player from './components/player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      start: false,
      isCollision: false,
      isWon: false
    };
    // data include game environment data like object coordination, dimenson and border coordination
    this.data = {
      border: {
        left: null,
        right: null,
        up: null,
        down: null
      }
    }

    this.winBlock = React.createRef();

    this.element = React.createRef();
    this.setBorder = this.setBorder.bind(this);
    this.updateObjectPosition = this.updateObjectPosition.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.isInScope = this.isInScope.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.decideWinLose = this.decideWinLose.bind(this);
  }
  
  // this is only for initial set up
  setBorder() {
    this.data.border = {
        left: this.element.current ? this.element.current.getBoundingClientRect().left : null,
        right: this.element.current ? this.element.current.getBoundingClientRect().right : null,
        top: this.element.current ? this.element.current.getBoundingClientRect().top : null,
        bottom: this.element.current ? this.element.current.getBoundingClientRect().bottom : null
    };
  }

  componentDidMount () {
    // at first when react is created, DOM hasn't been created yet => no left and right coordination
    // for its child to work with, this timmer is to refresh the DOM state 
    // so it will pass the left coordiation and right coordination to it child so its child can work on collision.
    this.timerID = setTimeout(() => {
      this.setBorder();
      this.setState({
        start: true
      });
    }, 1000);

    // add win block coordinate to the data, the win block is to indicate if the player win.
    // if the player touch the win block => win.
    if (this.winBlock.current) {
      this.data.winBlock = {
        name: 'win block',
        top: this.winBlock.current.getBoundingClientRect().top,
        bottom: this.winBlock.current.getBoundingClientRect().bottom,
        right: this.winBlock.current.getBoundingClientRect().right,
        left: this.winBlock.current.getBoundingClientRect().left
      }
    }
  }

  updateObjectPosition(blockInfo) {
    let object = new Object();
    object[blockInfo.name] = {
      top: blockInfo.position.top,
      bottom: blockInfo.position.bottom,
      left: blockInfo.position.left,
      right: blockInfo.position.right
    }
    this.data = Object.assign(this.data, object);

    if (this.data.block1 && this.data.player) {
      this.checkCollision(this.data.player, this.data.block1);
    }
    
    if (this.data.block2 && this.data.player) {
      this.checkCollision(this.data.player, this.data.block2);
    }

    if (this.data.winBlock && this.data.player) {
      this.checkCollision(this.data.player, this.data.winBlock);
    }
  }

  checkCollision(obj1, obj2) {
    if (obj1.name === 'win block' || obj2.name === 'win block') {
      this.isInScope(obj1, obj2, true);
    } else {
      this.isInScope (obj1, obj2);
    }
    

  }

  decideWinLose(isWin) {
    if (isWin) {
      this.setState({
        isWon: true
      })
    } else {
      this.setState({
        isCollision: true
      })
    }
  }
  // in scope to check collision
  isInScope(obj1, obj2, isWinBlock = false) {
    // check top left point of the obj1
    if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && obj1.left >= obj2.left && obj1.left <= obj2.right) {
      this.decideWinLose(isWinBlock);
    } // check top right point of obj1
    else if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && 
      obj1.right >= obj2.left && obj1.right <= obj2.right) {
        this.decideWinLose(isWinBlock);
    } // check bottom right point of obj1
    else if (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom && obj1.right >= obj2.left && obj1.right <= obj2.right) {
      this.decideWinLose(isWinBlock);
    } // check bottom left
    else if (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom && obj1.left >= obj2.left && obj1.left <= obj2.right) {
      this.decideWinLose(isWinBlock);
    }
  }

  handleButton() {
    this.setState({
      isCollision: false,
    });

    this.setState({
      isWon: false
    });

    this.data.player = {};
  }

  render() {
    // every time this object is rendered, it updates its position to the App.js
    // which I treat it as game environment manage collision.
    if (this.state.isCollision) {
      return (<div>
        Game over
        <button onClick={this.handleButton} >Play again</button>
        </div>);
    } else if (this.state.isWon) {
      return (<div>
        You Won. Nice
        <button onClick={this.handleButton} >Play again</button>
        </div>
      );
    }
    return (
      <div className="view" >
        <div className="contain">
          <div className="border" ref={this.element}>
            <div id="win" ref={this.winBlock}></div>
            <Block 
              border={this.data.border}
              blockName="block1" // block name is used when update its position
              updateObjectPosition = {this.updateObjectPosition}
              frameSpeed ={20}
            />
            <Block 
              border={this.data.border}
              blockName="block2" // block name is used when update its position
              updateObjectPosition = {this.updateObjectPosition}
              frameSpeed ={40}
            />
            <Player 
              border={this.data.border}
              updateObjectPosition = {this.updateObjectPosition}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
