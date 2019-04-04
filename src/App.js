import React, { Component } from 'react';
import Block from './components/block';
import Player from './components/player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      start: false,
      isCollision: false,
      isWon: false,
      level: 'level1',
      resetPlayerPosition: false
    };
    // data include game environment data like object coordination, dimenson and border coordination
    this.data = {
      level1: {
        frameSpeed2: 40,
        frameSpeed1: 20
      },
      level2: {
        frameSpeed2: 30,
        frameSpeed1: 10
      },
      level3: {
        frameSpeed2: 20,
        frameSpeed1: 5
      },
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
    if (this.data.player && this.data.winBlock) {
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
    // check if player pass all level
    // isLevel1: true,
    //   isLevel2: false,
    //   isLevel3: false
    if (isWin) {
        if (this.state.level === 'level1') {
          this.setState({
            level: 'level2',
            resetPlayerPosition: true
          });
        } else if (this.state.level === 'level2') {
          this.setState({
            level: 'level3',
            resetPlayerPosition: true
          });
        } else {
          this.setState({
            level: 'level1',
            isWon: true,
            resetPlayerPosition: true
          });
        }
    } else {
      this.setState({
        isCollision: true
      });
    }

    
  }
  // in scope to check collision
  isInScope(obj1, obj2, isWinBlock = false) {
    // check top left point of the obj1
    if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && obj1.left >= obj2.left && obj1.left <= obj2.right) {
      return this.decideWinLose(isWinBlock);
    } // check top right point of obj1
    else if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && obj1.right >= obj2.left && obj1.right <= obj2.right) {
        return this.decideWinLose(isWinBlock);
    } // check bottom right point of obj1
    else if (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom && obj1.right >= obj2.left && obj1.right <= obj2.right) {
      return this.decideWinLose(isWinBlock);
    } // check bottom left
    else if (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom && obj1.left >= obj2.left && obj1.left <= obj2.right) {
      return this.decideWinLose(isWinBlock);
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

  resetPosition() {
    if (this.state.resetPlayerPosition) {
      this.setState({
        resetPlayerPosition: false
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    let frameSpeed1, frameSpeed2;
    switch (this.state.level) {
      case 'level1':
      frameSpeed1 = this.data.level1.frameSpeed1;
      frameSpeed2 = this.data.level1.frameSpeed2;
      break;
      case 'level2':
      frameSpeed1 = this.data.level2.frameSpeed1;
      frameSpeed2 = this.data.level2.frameSpeed2;
      break;
      case 'level3':
      frameSpeed1 = this.data.level3.frameSpeed1;
      frameSpeed2 = this.data.level3.frameSpeed2;
      break;
    }
    // every time this object is rendered, it updates its position to the App.js
    // which I treat it as game environment manage collision.
    if (this.state.isCollision) {
      return (<div>
        Game over
        <button onClick={this.handleButton} >Play again</button>
        </div>);
    } 
    // else if (this.state.isWon) {
    //   return (<div>
    //     You Won. Nice
    //     <button onClick={this.handleButton} >Play again</button>
    //     </div>
    //   );
    // }
    return (
      <div className="view" >
        <div className="contain">
          <div className="border" ref={this.element}>
            <div id="win" ref={this.winBlock}></div>
            <Block 
              border={this.data.border}
              blockName="block1" // block name is used when update its position
              updateObjectPosition = {this.updateObjectPosition}
              frameSpeed ={frameSpeed1}

            />
            <Block 
              border={this.data.border}
              blockName="block2" // block name is used when update its position
              updateObjectPosition = {this.updateObjectPosition}
              frameSpeed ={frameSpeed2}
            />
            <Player 
              border={this.data.border}
              updateObjectPosition = {this.updateObjectPosition}
              reset={this.resetPosition()}
            />
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
