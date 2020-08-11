import React from 'react';

import "./collections-overview.styles.scss"
import {createStructuredSelector} from "reselect";
import {selectCollections} from "../../redux/shop/shop.selectors";
import {connect} from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview.component";

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
