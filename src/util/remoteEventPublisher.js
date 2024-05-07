import axios from 'axios';

// Define the URL to which want to post
const url = 'http://localhost:3001/api';

let intervalId;
const INTERVAL_DELAY = 10000; // Interval delay in milliseconds

const executeFunction = () => {
    // Function to be executed at each interval
    try {
        //function logic here
        console.log('Function executed at interval');
        if(localStorage.getItem("SOS_DATA")!=null){
            console.log('Has SOS DATA');
            axios.post(url, localStorage.getItem("SOS_DATA"))
                .then(() => {
                    localStorage.removeItem("SOS_DATA");
                    console.log("successfully posted data to API")
                    //this proves internet connection, do anything want with internet here
                })
                .catch(() => {
                    console.log("error happened, so dont removing data from storage")
                });
        }
    }

    catch (error) {
        console.error('Error occurred:', error);
    }
};

const startListener = () => {
    console.log('Listener start called.');

    //remove current event listeners
    window.removeEventListener('online', startListener);
    window.removeEventListener('offline', stopListener);

    //register again
    window.addEventListener('online', startListener);//if network connected, immediately start listener
    window.addEventListener('offline', stopListener);//no network now, no point of keep listening

    executeFunction(); // Execute function immediately upon start
    intervalId = setInterval(executeFunction, INTERVAL_DELAY);

};

const stopListener = () => {
    clearInterval(intervalId);
};

export {startListener, stopListener};