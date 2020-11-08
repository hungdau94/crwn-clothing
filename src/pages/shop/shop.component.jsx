import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collections/collection.component"
import {connect} from "react-redux";
import WithSpinner from "../../components/wiht-spinner/with-spinner.component";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching} from "../../redux/shop/shop.selectors";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    render() {
        const {isCollectionFetching, match: {path}} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${path}`}
                       render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
                <Route exact path={`${path}/:collectionId`}
                       render={props => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
            </div>
        )
    }
};
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

export default connect(mapStateToProps, null)(ShopPage);