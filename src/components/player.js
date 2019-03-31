import React, { Component }  from 'react';


class Player extends Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
        this.state = {
            speed: 10,
            move: {
                left: false,
                right: false,
                up: false,
                down: false
            },
            position: {
                left: this.player.current ? this.player.current.getBoundingClientRect().left : 150,
                top: this.player.current ? this.player.current.getBoundingClientRect().top : 150
            }
            
        }
        
        this.newPosition = this.newPosition.bind(this);
        this.checkDirection = this.checkDirection.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        console.log('something');
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
            this.checkDirection();
        });
        // the key up to check if user stop moving is commented out bc in key down event
        // there is a switch that have a defause case that can replace an action the same as
        // what keyup event will handle
        // document.addEventListener('keyup', this.handleKeyUp);
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
                move: {
                    left: false,
                    right: false,
                    up: false,
                    down: false
                }
            })
        }
    }

    newPosition(left = this.state.position.left, top = this.state.position.top) {
        console.log(left);
        this.setState({
            position: {
                left: left,
                top: top
            }
        });
    }

    checkDirection() {
        if (this.state.move.left) {
            const newLeft = this.state.position.left - this.state.speed;
            this.newPosition(newLeft);
            return;
        } else if (this.state.move.up) {
            const newTop = this.state.position.top - this.state.speed;
            this.newPosition(this.state.position.left, newTop);
            return;
        } else if (this.state.move.right) {
            const newLeft = this.state.position.left + this.state.speed;
            this.newPosition(newLeft);
            return;
        } else if (this.state.move.down) {
            const newTop = this.state.position.top + this.state.speed;
            this.newPosition(this.state.position.left, newTop);
            return;
        }
    }

    render() {

        if (this.player.current) {
            console.log(this.player.current.getBoundingClientRect().left, this.state.position);
        }
        return (
            <div style={this.state.position} id='player' ref={this.player}>
                Player
            </div>
        );
    }
}

export default Player;