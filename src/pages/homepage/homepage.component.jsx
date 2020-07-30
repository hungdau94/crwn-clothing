import React from 'react';
import './homepage.style.scss';
import DirectoryMenu from "../../components/directory-menu/directory-menu.component";
import Header from "../../components/header/header.component"


const HomePage = () => (
    <div className='homepage'>
        <DirectoryMenu/>
    </div>
);

export default HomePage;