import React, { Component }  from 'react';


class Player extends Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
        this.state = {
            speed: 10,
            position: {
                left: this.player.current ? this.player.current.getBoundingClientRect().left : 50,
                top: this.player.current ? this.player.current.getBoundingClientRect().top : 150
            }
            
        }
        
        this.newPosition = this.newPosition.bind(this);
    }

    componentDidMount() {
        console.log('something');
    }

    newPosition() {
        const newLeft = this.state.position.left - this.state.speed;
        if (this.props.move.left) {
            this.setState({
                position: {
                    left: newLeft
                }
            });
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