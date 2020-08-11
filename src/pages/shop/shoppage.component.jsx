import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CategoryPage from "../category/category.component";

const ShopPage = ({match: {path}}) => (
    <div className='shop-page'>
        <Route path={`${path}`} component={CollectionsOverview} />
        <Route exact path={`${path}/:categoryId`} component={CategoryPage}></Route>
    </div>
);

export default ShopPage;