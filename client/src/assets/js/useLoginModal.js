import { useState } from 'react';

const useLoginModal = () => {
    //use state to set whether or not the login modal is showing, inital state is false
    const [isLoginShowing, setLoginShowing] = useState(false);

    //when the toggle function is called, it switching the state to the opposite
    function toggleLogin() {
        console.log(isLoginShowing)
        setLoginShowing(!isLoginShowing);
    };

    //return the initial state and function to update the state
    return {
        isLoginShowing,
        toggleLogin,
    }
};

export default useLoginModal;