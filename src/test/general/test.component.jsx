import React from 'react';
import axios from "axios";

const str = '[{"id":2,"name":"Blue Beanie","imageUrl":"https://i.ibb.co/ypkgK0X/blue-beanie.png","price":18,"quantity":1}]]';

const TestComponent = () => {
    axios({
        url: 'http://localhost:8080/api/v1/create-session',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: str
    }).then(axiosResponse=> {
        alert('Payment success');
        // {"data":{"id":"..."},"status":200,"statusText":"",
        // "headers":{"content-type":"application/json"},
        // "config":{"url":"http://localhost:8080/api/v1/create-session",
        // "method":"post",
        // "data":"[{\"id\":2,\"name\":\"Blue Beanie\",\"imageUrl\":\"https://i.ibb.co/ypkgK0X/blue-beanie.png\",\"price\":18,\"quantity\":1}]]","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1},"request":{}}
        console.log(JSON.stringify(axiosResponse));
    }) .catch(error => {
        alert("payment error");
        console.log(JSON.parse(error));
    });
    return (
        <div>

        </div>
    )
};

export default TestComponent;

