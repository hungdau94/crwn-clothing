import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching, selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";
import CollectionPageContainer from "../collections/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";

const ShopPage = ({fetchCollectionsStart, match: {path}}) => {
    // This dependency is a work around because we know
    // map DispatchToProps only renders twice
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);


    return (
        <div className='shop-page'>
            <Route exact path={`${path}`}
                   component={CollectionsOverviewContainer}
            />
            <Route exact path={`${path}/:collectionId`}
                   component={CollectionPageContainer}
            />
        </div>
    )
};
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch => ({ // setting up stuffs
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);