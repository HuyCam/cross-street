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
                left: this.player.current ? this.player.current.getBoundingClientRect().left : 275,
                top: this.player.current ? this.player.current.getBoundingClientRect().top : 170
            }
        }

        this.newPosition = this.newPosition.bind(this);
        this.checkDirection = this.checkDirection.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.checkCollisionWithBorder = this.checkCollisionWithBorder.bind(this);
    }



    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        // timer is like gameloop, it check game rendering each 200 ms
        this.timerID = setInterval(this.checkDirection, 50);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        clearInterval(this.timerID);
    }


    handleKeyUp() {
        this.setState({
            move: {
                left: false,
                right: false,
                up: false,
                down: false
            }
        });
    }

    handleKeyDown(e) {
        const keyCode = {
            arrLeft: 37,
            arrUp: 38,
            arrRight: 39,
            arrDown: 40
        };
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
            });
        }
    }

    newPosition(left = this.state.position.left, top = this.state.position.top) {
        this.setState({
            position: {
                left: left,
                top: top
            }
        });
    }

    checkDirection() {
        if (this.checkCollisionWithBorder()) {
            return;
        } 

        if (this.state.move.left) {
            const newLeft = this.state.position.left - this.state.speed;
            this.newPosition(newLeft);
            // return;
        } else if (this.state.move.up) {
            const newTop = this.state.position.top - this.state.speed;
            this.newPosition(this.state.position.left, newTop);
            // return;
        } else if (this.state.move.right) {
            const newLeft = this.state.position.left + this.state.speed;
            this.newPosition(newLeft);
            // return;
        } else if (this.state.move.down) {
            const newTop = this.state.position.top + this.state.speed;
            this.newPosition(this.state.position.left, newTop);
            // return;
        }

    }

    checkCollisionWithBorder() {
        const right = this.props.border.right;
        const left = this.props.border.left;
        const top = this.props.border.top;
        const bottom = this.props.border.bottom;
        const speed = 1;
        const player = {
            top: this.player.current.getBoundingClientRect().top,
            right: this.player.current.getBoundingClientRect().right,
            bottom: this.player.current.getBoundingClientRect().bottom,
            left: this.player.current.getBoundingClientRect().left
        };
        // if top of player touch the top border
        if (player.top - speed <=  top && this.state.move.up) {
            this.setState({ isBorderCollision: true });
            return true;
        } // case when player move down
        else if (player.bottom + speed >= bottom && this.state.move.down){
            this.setState({ isBorderCollision: true });
            return true;
        } // case when player move left
        else if (player.left - speed <= left && this.state.move.left) {
            this.setState({ isBorderCollision: true });
            return true;
        } // case when player move right
        else if (player.right + speed >= right && this.state.move.right) {
            this.setState({ isBorderCollision: true });
            return true;
        }
        else {
            this.setState({ isBorderCollision: false });
            return false;
        }
    }

    render() {
        if (this.player.current) {
            this.props.updateObjectPosition({
                name: 'player',
                position: {
                    top: this.player.current.getBoundingClientRect().top,
                    right: this.player.current.getBoundingClientRect().right,
                    bottom: this.player.current.getBoundingClientRect().bottom,
                    left: this.player.current.getBoundingClientRect().left
                }
            }, true);
        }
        return (
            <div style={this.state.position} id='player' ref={this.player}>
                Player
            </div>
        );
    }
}

export default Player;