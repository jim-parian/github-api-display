import React from 'react'

function Item(props) {
    return (
        <div className="item" >
            <img src={props.avatar} alt={props.name + "avatar"}/>
            <div className="details">
                <h2>{props.name}</h2>
                <p><a href={props.url}>{props.url}</a></p>
            </div>
        </div>
    );
}

export default Item