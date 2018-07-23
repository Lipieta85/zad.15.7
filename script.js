class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            },
        };

    }

    reset = () => {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    pad0 = (value) => {
        let result = value.toString();
        const resultLength = result.length;
        if (resultLength < 2) {
            result = 0 + result;
        }
        return result;
    }

    format = () => {
        let minutes = this.state.times.minutes;
        let seconds = this.state.times.seconds;
        let miliseconds = this.state.times.miliseconds;
        return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`;
    }

    start = () => {
        if (!this.state.running) {
            this.state.running = 'true';
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate = () => {
        this.setState({
            times: {
                minutes: this.state.times.minutes,
                seconds: this.state.times.seconds,
                miliseconds: this.state.times.miliseconds + 1
            }
        });

        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds + 1,
                    miliseconds: 0
                }
            });
        }

        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes + 1,
                    seconds: 0,
                    miliseconds: this.state.times.miliseconds
                }
            });
        }
    }

    stop = () => {
        this.setState({
            running: false
        });

        clearInterval(this.watch);
    }

    resetStoper = () => {
        this.stop();
        this.reset();
    }

    render = () => {
        return (
            <div className={'controls'}>
                <nav>
                    <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                    <a href={'#'} className={'button'} id={'stop'} onClick={() => { this.stop() }}>Stop</a>
                    <a href={'#'} className={'button'} id={'reset'} onClick={() => this.resetStoper()}>Reset</a>
                </nav>
                <Display time={this.format()}></Display>
            </div>
        );

    }
}

class Display extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        time: React.PropTypes.string.isRequired
    }

    render() {
        return (
            React.createElement('div', { className: 'stopWatch' }, this.props.time)
        );
    }
}

var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));
