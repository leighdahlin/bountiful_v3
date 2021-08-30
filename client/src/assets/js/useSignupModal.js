import { useState } from 'react';

const useSignupModal = () => {
    //use state to set whether or not the Signup modal is showing, inital state is false
    const [isSignupShowing, setSignupShowing] = useState(false);

    //when the toggle function is called, it switching the state to the opposite
    function toggleSignup() {
        setSignupShowing(!isSignupShowing);
    };

    //return the initial state and function to update the state
    return {
        isSignupShowing,
        toggleSignup,
    }
};

export default useSignupModal;