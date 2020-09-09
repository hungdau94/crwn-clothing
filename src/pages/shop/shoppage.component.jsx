import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collections/collection.component"

import {convertCollectionSnapshotToMap, firestore} from "../../firebase/firebase.util";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/wiht-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {isLoading: true};
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        WithSpinner(ShopPage)
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(collectionSnapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(collectionSnapshot);
            updateCollections(collectionsMap);
            this.setState({isLoading: false})
        });
    }

    render() {
        const {match: {path}} = this.props;
        const {isLoading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${path}`}
                       render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props}/>}/>
                <Route exact path={`${path}/:collectionId`}
                       render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props}/>}/>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
        dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);