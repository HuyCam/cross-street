import React, { Component } from 'react';
import Block from './components/block';
import Player from './components/player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      start: 0,
      move: {
        left: false,
        right: false,
        up: false,
        down: false
      }
    };

    this.element = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    // at first when react is created, DOM hasn't been created yet => no left and right coordination
    // for its child to work with, this timmer is to refresh the DOM state 
    // so it will pass the left coordiation and right coordination to it child so its child can work on collision.
    this.timerID = setTimeout(() => {
      this.setState({
        start: this.state.start++
      });
    }, 1000);
  }

  handleKeyUp() {
    this.setState({
      move: {
        left: false,
        right: false,
        up: false,
        down: false
      }
    })
  }

  handleKeyDown(e) {
    const keyCode = {
      arrLeft: 37,
      arrUp: 38,
      arrRight: 39,
      arrDown: 40
    }
    const eventKey = e.keyCode;
    switch(eventKey) {
      case keyCode.arrLeft:
        return this.setState({
          move: {
            left: true,
            right: false,
            up: false,
            down: false
          }
        });
      case keyCode.arrUp:
        return this.setState({
          move: {
            left: false,
            right: false,
            up: true,
            down: false
          }
        });
      case keyCode.arrRight:
        return this.setState({
          move: {
            left: false,
            right: true,
            up: false,
            down: false
          }
        });
      case keyCode.arrDown:
        return this.setState({
          move: {
            left: false,
            right: false,
            up: false,
            down: true
          }
        });
      default:
        return this.setState({
          left: false,
        right: false,
        up: false,
        down: false
        })
    }
    
  }

  render() {
    const left = this.element.current ? this.element.current.getBoundingClientRect().left : null;
    const right = this.element.current ? this.element.current.getBoundingClientRect().right : null;
    
    return (
      <div className="view" >

        <div className="contain" ref={this.element}>
          <Block 
          left={left} 
          right={right}
          />
          <Player move={this.state.move}/>
        </div>
        
      </div>
    );
  }
}

export default App;
