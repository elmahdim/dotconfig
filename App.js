import React from 'react';
import ReactDOM from 'react-dom';
import CommandRender from './Components/CommandRender';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ['Welcome to dotConfig (v1.0.0)'],
            placeholder : 'Documentation: type "help"',
            commands : [],
            flag : false
        };
        this._shortcutsHandler = this._shortcutsHandler.bind(this);
        this._inputHandler     = this._inputHandler.bind(this);
        this._focusHandler     = this._focusHandler.bind(this);
        this._commandActions   = this._commandActions.bind(this);
        this._getCommandsData  = this._getCommandsData.bind(this);
    }
    componentDidMount() {
        this._focusHandler;
        this._getCommandsData('data/commands.json');
    }
    render() {
        const sortedList = this.state.commands.sort((a) => (a.hasOwnProperty('alias') ?  -1 :  1 )  );
        const commands = CommandRender(sortedList);
        return ( 
            <div className="shell">
                <div className="shell-topbar"><div className="btn"></div></div>
                <div className="shell-body" onClick={this._focusHandler}>
                    <div className="shell-viewport">
                        {this.state.flag ? 
                            <table>
                            <thead>{
                                ['Command', 'Alias', 'Description'].map(function(label, i) {
                                    return <th className="syntax-helper" key={i}>{label}</th>;
                                })}
                            </thead>
                            <tbody>{commands}</tbody>   
                            </table> 
                            : <p className="syntax-placeholder">{this.state.content}</p> }
                    </div> 
                    <input 
                        type="text"
                        ref="shellField"
                        spellCheck="false"
                        onKeyPress={this._inputHandler }
                        onKeyDown={this._shortcutsHandler }
                        placeholder={this.state.placeholder} />  
                    <a ref="saveAs" href="data:application/xml;charset=utf-8,your code here" download="filename.config.js"></a>
                </div> 
            </div>
        );
    }
    _getCommandsData(_data){
        return fetch(_data)
          .then(function(response) {
            if (response.status == 200) {
                return response.json()
            } else {
               throw new Error('Something went!');
            }
          })
          .then(response => {
            this.setState({
                commands: response
            });
          })
          .catch(function(error) {
            console.error(error);
          });
    }
    _commandActions(_command){
        if (_command === 'save' || _command === 'gimme') {
            ReactDOM.findDOMNode(this.refs.saveAs).click();
        }
    }
    _focusHandler(){
        ReactDOM.findDOMNode(this.refs.shellField).focus();
    }
    _inputHandler(e) {
        let oldContent = this.state.content;
        if (e.key === 'Enter') {
            let enteredValue = e.target.value;
            if (this.state.commands.filter(function(e) { return e.name == enteredValue || e.alias == enteredValue; }).length > 0) {
                if(enteredValue == 'help' || enteredValue == 'h') {
                    this.setState({
                        flag : true,
                        placeholder : 'Let\'s get it on' + String.fromCharCode(8230) // JSX Gotchas - HTML Entities
                    });
                } else if(enteredValue == 'clear') {
                    this.setState({
                        flag : false,
                        content: ''
                    });
                } else {
                    this.setState({
                        content: '$ ' + enteredValue,
                        placeholder : ''
                    });
                    this._commandActions(enteredValue);
                }
            } else {
                this.setState({
                    flag : false,
                    content: enteredValue + ': command not found'
                });
            }
            this._resetFields();
            e.preventDefault();
        }
    }
    _shortcutsHandler(e){
        if (e.ctrlKey && e.which === 76) {
            e.preventDefault();
            this.setState({
                flag : false,
                content: '',
                placeholder: ''
            });
        }
    }
    _resetFields() {
        ReactDOM.findDOMNode(this.refs.shellField).value = '';
    }
}

export default App;