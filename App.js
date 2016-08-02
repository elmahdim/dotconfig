import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ['Welcome to dotConfig'],
            commandsList: [
                {
                    name: 'help',
                    desc: 'here\'s a list of all available commands'
                },
                {
                    name: 'clear',
                    desc: 'clears terminal screen',
                    alias: 'Ctrl+L'
                },
                {
                    name: 'touch',
                    desc: 'create new configuration',
                    alias: 'Ctrl+L'
                },
                {
                    name: 'save',
                    desc: 'grab/download your files',
                    alias: 'Ctrl+S'
                }
            ],
            placeholder : 'try typing hi or help'
        };
        this._shortcutsHandler = this._shortcutsHandler.bind(this);
        this._inputHandler     = this._inputHandler.bind(this);
        this._focusHandler     = this._focusHandler.bind(this);
    }
    componentDidMount() {        
        this._focusHandler;
    }
    render() {
        return ( 
            <div className="shell">
                <div className="shell-topbar"><div className="btn"></div></div>
                <div className="shell-body" onClick={this._focusHandler}>
                    <div className="shell-viewport">
                        <p className="syntax-placeholder">{this.state.content}</p>
                    </div> 
                    <input 
                        type="text"
                        ref="shellField"
                        spellCheck="false"
                        onKeyPress={ this._inputHandler }
                        onKeyDown={ this._shortcutsHandler }
                        placeholder={this.state.placeholder} />
                </div> 
            </div>
        );
    }
    _focusHandler(){
        ReactDOM.findDOMNode(this.refs.shellField).focus();
    }
    _inputHandler(e) {
        if (e.key === 'Enter') {
            let enteredValue = e.target.value;
            let commandArr   = this.state.commandsList;
            let _printOutput = "";
            if (commandArr.filter(function(e) { return e.name == enteredValue; }).length > 0) {
                if(enteredValue == 'help') {
                     _printOutput = '~ ' + commandArr[0].desc;
                } else if(enteredValue == 'clear') {
                    _printOutput = ' ';
                } else {
                    _printOutput = '$ ' + enteredValue;
                }
            }
            else {
                _printOutput = enteredValue + ': command not found';
            }
            this.setState({ 
                content: _printOutput,
                placeholder: ""
            });
            this._resetFields();
        }
    }
    _shortcutsHandler(e){
        if (e.ctrlKey && e.which === 76) {
            e.preventDefault();
            this.setState({ 
                content: "",
                placeholder: ""
            });
        }
    }
    _resetFields() {
        document.querySelector('.shell input').value = '';
    }
}

export default App;