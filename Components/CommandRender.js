import React from 'react';

module.exports = (_CommandArr) => {
    var _CommandList = _CommandArr.map((_command, i) => {
      return (
        <tr key={i}>
            <td className="command-title">
                {_command.name}
            </td>
            <td>
                {_command.alias ? (
                    <span className="command-alias syntax-helper"> ({_command.alias})</span>
                ) : '' } 
            </td>
            <td className="command-desc syntax-helper">{_command.desc}</td>
        </tr>
      )
    });
    return _CommandList;
}