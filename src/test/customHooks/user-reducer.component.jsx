import React , {useState, useReducer, useEffect}from 'react';
import userReducer from "../../redux/user/user.reducer";

const INITIAL_STATE = {
    user: null,
    searchQuery: 'Bret'
};

const reducer = (state,action) => {
    switch (action.type) {
        case "SET_USER":
            return {... state, user:action.payload};
        case 'SET_SEARCH_QUERY':
            return {...state, searchQuery: action.payload}
        default:
            return state;
    }
};

const setUser = user => ({
   type: 'SET_USER',
    payload: user
});

const setQuery = queryString => ({
   type: 'SET_SEARCH_QUERY',
   payload: queryString
});


const UserReducerExample = () => {
    const [state, dispatch] = userReducer(reducer, INITIAL_STATE);
    const {user, searchQuery} =

    useEffect(() =>{
        if(searchQuery.length > 0){
            const fetchFunc = async () => {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
                );
                const resJson = await response.json();
                setUser(resJson[0]);
            };

            fetchFunc();
        }
    });

};