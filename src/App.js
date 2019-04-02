import React, { Component } from 'react';
import Block from './components/block';
import Player from './components/player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      start: false,
      isCollision: false
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

    this.element = React.createRef();
    this.setBorder = this.setBorder.bind(this);
    this.updateObjectPosition = this.updateObjectPosition.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.isInScope = this.isInScope.bind(this);
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
      this.checkCollision();
    }
    
  }

  checkCollision() {
    // this.isInScope(this.data.player, this.data.block1);
    //do something to check colistion.
    const obj1 = this.data.player;
    const obj2 = this.data.block1;

    if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && obj1.left >= obj2.left && obj1.left <= obj2.right) {
      this.setState({
        isCollision: true
      });
    } // check top right point of object1
    else if (obj1.top >= obj2.top && obj1.top <= obj2.bottom && 
      obj1.right >= obj2.left && obj1.right <= obj2.right) {
      this.setState({
        isCollision: true
      });
    }

  }

  isInScope(object1, object2) {
    // check top left point of object1
    if (object1.top >= object2.top && object1.top <= object2.bottom && object1.left >= object2.left && object1.left <= object2.right) {
      console.log('collision at the top left point');
    }
  }

  render() {
    // every time this object is rendered, it updates its position to the App.js
    // which I treat it as game environment manage collision.
    if (this.state.isCollision) {

      return (<div>Game over</div>);
    }
    return (
      <div className="view" >
        <div className="contain">
          <div className="border" ref={this.element}>
            <Block 
              border={this.data.border}
              blockName="block1" // block name is used when update its position
              updateObjectPosition = {this.updateObjectPosition}
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
