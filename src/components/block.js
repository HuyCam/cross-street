import React, { Component } from 'react';



class Block extends Component {
    constructor(props) {
        super(props);
        this.state = { leftPo: 0 , moveAhead: true};
        this.move = this.move.bind(this);

        // this speed is just how far the object move each time
        this.speed = 5;
        this.element = React.createRef();
    }
    
    componentDidMount () {
        this.timerID = setInterval(
            () => this.move(),
            this.props.frameSpeed? this.props.frameSpeed : 50
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    move () {
    const right = this.props.border ? this.props.border.right : null;
    const left = this.props.border? this.props.border.left : null;
    const myBorderRight = this.element.current ? this.element.current.getBoundingClientRect().right : 0;
    const myBorderLeft = this.element.current ? this.element.current.getBoundingClientRect().left : 0;
    // At first when React render element, the left and right is null because the element hasn't been render yet,
    // we check that before make any movement for the container box.
    if (!left || !right) {
        return;
    }
        if (myBorderRight >= right) {
            this.setState({ moveAhead: false });
        } else if (myBorderLeft <= left) {
            this.setState({ moveAhead: true });
        }
    
        // set movement
        if (this.state.moveAhead) {
            
            // check collision with border when move ahead
            if (myBorderRight + this.speed >= right) {
                let movementDistance = right - myBorderRight;
                this.setState({ leftPo: this.state.leftPo + movementDistance })
            } else {
                this.setState({ leftPo: this.state.leftPo + this.speed });
            }
        } else if (!this.state.moveAhead){

            if (myBorderLeft - this.speed <= left) {
                const movementDistance = Math.abs(left - myBorderLeft);
                this.setState({ leftPo: this.state.leftPo - movementDistance })
            } else {
                this.setState({ leftPo: this.state.leftPo - this.speed });
            }  
        }
    }
    render() {
        if (this.element.current) {
            const blockName = this.props.blockName;
            this.props.updateObjectPosition({
                name: blockName,
                position: {
                    top: this.element.current.getBoundingClientRect().top,
                    right: this.element.current.getBoundingClientRect().right,
                    bottom: this.element.current.getBoundingClientRect().bottom,
                    left: this.element.current.getBoundingClientRect().left
                }
            });
        }
        
        return (
        <div style={{
            left: this.state.leftPo
        }} id={this.props.blockName} ref={this.element}>
            Test block
          </div>
        );
    }
}

export default Block;
