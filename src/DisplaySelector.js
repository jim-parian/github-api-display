import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './DisplaySelector.css';

class DisplaySelector extends React.Component {

    // TODO faire une fonction de rendering des boutons
    render() {
        const grid = 'grid'
        const list = 'list'
        const buttonSize = '2x'
        return (
            <div className="display-selector">
                <button
                className={this.props.displaySelector === grid ? ' on' : ''}
                onClick={() => this.props.handleDisplaySelectorClick(grid)}>
                    <FontAwesomeIcon icon={faTh} size={buttonSize}/>
                </button>
                <button
                className={this.props.displaySelector === list ? ' on' : ''}
                onClick={() => this.props.handleDisplaySelectorClick(list)}>
                    <FontAwesomeIcon icon={faBars} size={buttonSize}/>
                </button>
            </div>
        )
    }

}

export default DisplaySelector;
