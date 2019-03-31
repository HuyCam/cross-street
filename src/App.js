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
  }
  
  // this is only for initial set up
  setBorder() {
    this.data.border = {
        left: this.element.current ? this.element.current.getBoundingClientRect().left : null,
        right: this.element.current ? this.element.current.getBoundingClientRect().right : null,
        up: this.element.current ? this.element.current.getBoundingClientRect().up : null,
        down: this.element.current ? this.element.current.getBoundingClientRect().down: null
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

 

  render() {
    const left = this.data.border.left;
    const right = this.data.border.right;
    
    return (
      <div className="view" >
        <div className="contain">
          <div className="border" ref={this.element}>
            <Block 
            left={left} 
            right={right}
            />
            <Player move={this.state.move}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
