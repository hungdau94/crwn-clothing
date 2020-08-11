import React from 'react';

import "./directory-menu.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectDirectorySections} from "../../redux/directory/directory.selectors";

const DirectoryMenu = ({directorySections}) => (
    <div className='directory-menu'>
        {
            directorySections.map(({id, ...otherSectionsProps}) =>
                (<MenuItem key={id} {...otherSectionsProps} />)
            )
        }
    </div>
);


const mapStateToProps = createStructuredSelector({
    directorySections: selectDirectorySections,
});

export default connect(mapStateToProps)(DirectoryMenu);