import React from 'react';

import "./category.styles.scss"
import {connect} from "react-redux";
import {selectCollection} from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CategoryPage = ({collection: {items, title}}) => (
    <div className='category'>
        <div className='category-page'>
            <h2>{title}</h2>
            <div className='category-items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    </div>
);


const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CategoryPage);