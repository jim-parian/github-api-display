import React from 'react'

function ItemCount(props) {
    return (
        <div className="item-count" >
            <span>{props.number}</span>
        </div>
    );
}

export default ItemCount