import React, {useEffect, useState} from "react";
// custom hooks
export const useFetchEffect = (url) => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(url);
            const posts = await res.json();
            console.log(posts);
            setPost(posts[0]);
        };

        fetchPost();
    });
    return post;
};

const useFetchEffectExecutedOnlyOnce = (url) => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(url);
            const posts = await res.json();
            console.log(posts);
            setPost(posts[0]);
        };

        fetchPost();
    }, []);
    // if there is no dependency declared in array , this will fire only once
    // if there is no array at all, this will fire every times UI render or function called by hooks
    return post;
};