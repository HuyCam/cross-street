import React, { Component } from 'react';



class Block extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 , moveAhead: true};
        this.count = this.count.bind(this);
        this.speed = 50;
        this.element = React.createRef();
      }
    
    componentDidMount () {
        this.timerID = setInterval(
            () => this.count(),
            1000
        );
    }
    
    count () {
    const right = this.props.right;
    const left = this.props.left;
    const myBorderRight = this.element.current ? this.element.current.getBoundingClientRect().right : 0;
    const myBorderLeft = this.element.current ? this.element.current.getBoundingClientRect().left : 0;
    // At first when React render element, the left and right is null because the element hasn't been render yet,
    // we check that before make any movement for the container box.
    if (!left || !right) {
        return;
    }
        if (myBorderRight >= right - 10) {
            this.setState({ moveAhead: false });
        } else if (myBorderLeft <= left + 10) {
            this.setState({ moveAhead: true });
        }
    
        // set movement
        if (this.state.moveAhead) {
            
            // check collision when move ahead
            if (myBorderRight + this.speed >= right - 10) {
                let movementDistance = right - myBorderRight - 10;
                this.setState({ count: this.state.count + movementDistance })
            } else {
                this.setState({ count: this.state.count + 50 });
            }
        } else if (!this.state.moveAhead){

            if (myBorderLeft - this.speed <= left + 10) {
                const movementDistance = Math.abs(left + 9 - myBorderLeft);
                this.setState({ count: this.state.count - movementDistance })
            } else {
                this.setState({ count: this.state.count - 50 });
            }  
        }
    }
    render() {
        return (
        <div style={{
            left: this.state.count
        }} id="block" ref={this.element}>
            Test block
          </div>
        );
    }
}

export default Block;
