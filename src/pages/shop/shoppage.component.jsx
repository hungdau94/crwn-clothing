import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collections/collection.component"

const ShopPage = ({match: {path}}) => (
    <div className='shop-page'>
        <Route exact path={`${path}`} component={CollectionsOverview} />
        <Route exact path={`${path}/:collectionId`} component={CollectionPage}></Route>
    </div>
);

export default ShopPage;