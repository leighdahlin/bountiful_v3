import React, { useState } from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ProfileInfo from '../components/ProfileInfo';
import DashboardCard from '../components/DashboardCard';
import useItemModal from '../assets/js/useItemModal';
import ItemModal from '../components/ItemModal';

import { QUERY_ITEMS_USER } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';


export default function MyBounty() {

    const { username } = useParams();

    const { loading, data } = useQuery(QUERY_ITEMS_USER, {
        // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
        variables: { username: username },
      });    


    const { isItemShowing, toggleItem } = useItemModal();

    const [createItem, { error, data }] = useMutation(ADD_ITEM);


    const [addFormState, setAddFormState] = useState({
        title: '',
        item_name: '',
        item_description: '',
        item_unit: '',
        item_quantity: '',
        item_price: '',
        cat_name: '',
      });

      const addHandleChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: " + name)
        console.log("Value: " + value)

        setSignupFormState({
        ...signupFormState,
        [name]: value,
        });

    };

    const addHandleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(addFormState);

        try {
        const { data } = await createItem({
            variables: { ...addFormState },
        });

        //authenticates user
        Auth.login(data.createItem.token);

        window.location.assign('/dashboard/'+ username);

        //hides the signup modal
        toggleItem();

        } catch (e) {
        console.error(e);

        }
    };


    // const data = [
    //     {
    //         id: 1,
    //         title: "Blueberries",
    //         item_price: "5",
    //         item_unit: "pint",
    //         item_quantity: "5",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 2,
    //         title: "Strawberries",
    //         item_price: "8",
    //         item_unit: "quart",
    //         item_quantity: "3",
    //         name: "Strawberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy Strawberries",
    //         createdAt: Date.now()

    //     },
    //     {
    //         id: 3,
    //         title: "Squash",
    //         item_price: "5",
    //         item_unit: "pint",
    //         item_quantity: "5",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 4,
    //         title: "Seeds",
    //         item_price: "8",
    //         item_unit: "quart",
    //         item_quantity: "3",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 5,
    //         title: "Corn",
    //         item_price: "5",
    //         item_unit: "pint",
    //         item_quantity: "5",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 6,
    //         title: "Potatos",
    //         item_price: "8",
    //         item_unit: "quart",
    //         item_quantity: "3",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 7,
    //         title: "Watermelon",
    //         item_price: "8",
    //         item_unit: "quart",
    //         item_quantity: "3",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 8,
    //         title: "Eggs",
    //         item_price: "5",
    //         item_unit: "pint",
    //         item_quantity: "5",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     },
    //     {
    //         id: 9,
    //         title: "Goat Milk",
    //         item_price: "8",
    //         item_unit: "quart",
    //         item_quantity: "3",
    //         name: "Blueberries",
    //         category: "Fruit",
    //         description: "Fresh, juicy blueberries",
    //         createdAt: Date.now()
    //     }
    // ];    
    
    if(loading) {
        return (<div>Loading...</div>)
    }

    if(!loading) {
    return(
    <div id="dashboard-image" className="dashboard-container">
        <div className="d-flex">
            <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Listings</button>
                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
                <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Reviews</button>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div className = "your-bounty">
                        <button id="add-item" className="btn" type="button" onClick={toggleItem}>Add Item</button>
                        <div className="items">
                            <DashboardCard toggleItem = {toggleItem} data={data}/>
                        </div>
                    </div>
                    </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileInfo /></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
        </div>

        <ItemModal isItemShowing={isItemShowing} hide={toggleItem} addFormState={addFormState} addHandleChange={addHandleChange} addHandleFormSubmit={addHandleFormSubmit}/>
                
    </div>
    )
    }
}