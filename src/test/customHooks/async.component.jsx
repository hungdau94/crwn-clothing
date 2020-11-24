import React from 'react';
import './async.styles.scss';
import {useFetchEffect} from "./effects/use-fetch.effect";

const AsyncFetch = () => {
    const post = useFetchEffect('https://jsonplaceholder.typicode.com/todos/1');
    return (
        <div className='card-container'>
            <div className="card">
                <div className="title">Standard</div>
                <div className="icon">
                    <svg enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1"
                         viewBox="0 0 512 512"
                         width="512px"
                        >
                        <path d="M468.493,101.637L371.955,5.098H159.57v77.231H43.724v424.769h308.923v-77.231h115.846V101.637z   M371.955,32.401l69.236,69.235h-69.236V32.401z M63.031,487.79V101.637h173.769v96.538h96.538V487.79H63.031z M256.108,109.632  l69.236,69.235h-69.236V109.632z M352.647,410.56V178.867l-96.538-96.538h-77.231V24.406h173.769v96.538h96.538V410.56H352.647z" fill="#37404D"/></svg>
                </div>

                <div className="features">
                    <p>JSON IS HERE</p>
                    <p>{post}</p>
                </div>

                <a href="#" className="btn">Check it out</a>

            </div>
        </div>
    )
};

export default AsyncFetch;