import React from 'react';

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <div className='title'>
            {title.toUpperCase()}
        </div>
        <div className='preview'>
            <br/>
            {items
                .filter((item, idx) => idx < 4)
                .map((item) => (
                <div>
                    <div key={item.id}>{item.name}</div>
                </div>
            ))}
        </div>

    </div>
);

export default CollectionPreview;