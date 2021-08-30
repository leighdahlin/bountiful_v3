import { useState } from 'react';

const useItemModal = () => {
    //use state to set whether or not the Item modal is showing, inital state is false
    const [isItemShowing, setItemShowing] = useState(false);

    //when the toggle function is called, it switching the state to the opposite
    function toggleItem() {
        console.log(isItemShowing)
        setItemShowing(!isItemShowing);
    };

    //return the initial state and function to update the state
    return {
        isItemShowing,
        toggleItem,
    }
};

export default useItemModal;