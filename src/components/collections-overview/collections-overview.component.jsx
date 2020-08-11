import React from 'react';

import "./collections-overview.styles.scss"
import CollectionPreview from "../../pages/shop/shoppage.component";
import {createStructuredSelector} from "reselect";
import {selectCollections} from "../../redux/shop/shop.selectors";
import {connect} from "react-redux";

const CollectionsOverview = ({collections}) => (
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToProps)(CollectionsOverview);
