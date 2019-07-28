import React from 'react'
import Item from './Item.js'
import './ItemList.css';

class ItemList extends React.Component {
    
    render() {
        return (
            <div className={"wrapper " + (this.props.displaySelector)}>
                {this.props.items  ? this.props.items.map(
                    (item,index) => <Item
                    key={index}
                    avatar={item.avatar_url}
                    name={item.login}
                    url={item.html_url}
                />
                    ) : this.props.emptyMessage}
            </div>
        );
    }
}

export default ItemList