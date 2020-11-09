import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collections/collection.component"
import {connect} from "react-redux";
import WithSpinner from "../../components/wiht-spinner/with-spinner.component";
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching, selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";
import CollectionPageContainer from "../collections/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const {isCollectionLoaded, isCollectionFetching, match: {path}} = this.props;
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
    }
};
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch => ({ // setting up stuffs
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, null)(ShopPage);