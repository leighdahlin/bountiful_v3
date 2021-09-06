import React, { useState } from 'react';

// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import ProfileInfo from '../components/ProfileInfo';
import DashboardCard from '../components/DashboardCard';
import useItemModal from '../assets/js/useItemModal';
import ItemModal from '../components/ItemModal';

// import { QUERY_ITEMS_USER } from '../utils/queries';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';

import Auth from '../utils/auth';

export default function MyBounty() {
    // Auth.loggedIn();

    const { username } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: username },
      });    
    
    console.log(data)
    const profile = data?.user || {};
    console.log("PROFILE")
    console.log(profile)


    const { isItemShowing, toggleItem } = useItemModal();

    // const [addItem, { error, itemData }] = useMutation(ADD_ITEM);


    const [addFormState, setAddFormState] = useState({
        title: '',
        item_name: '',
        item_description: '',
        item_unit: '',
        item_quantity: '',
        item_price: '',
        cat_name: '',
      });

      const [addItem, { error, itemData }] = useMutation(ADD_ITEM);

      const addHandleChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: " + name)
        console.log("Value: " + value)

        setAddFormState({
        ...addFormState,
        [name]: value,
        });

    };

    const addHandleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("INSIDE ADD ITEM FORM SUBMIT");
        console.log(addFormState);
        console.log(Auth.loggedIn());

        if (Auth.loggedIn()){
            try {
                console.log("INSIDE TRY FUNCTION TO ADD NEW ITEM")
            const { itemData } = await addItem({
                variables: { ...addFormState },
            });
    
            console.log("itemData Variable from addItem Mutation")
            console.log(itemData);
    
            //authenticates user
            // Auth.loggedIn();
    
            window.location.assign('/dashboard/'+ username);
    
            //hides the signup modal
            toggleItem();
    
            } catch (e) {
            console.error(e);
    
            }

        }
        

        // try {
        //     console.log("INSIDE TRY FUNCTION TO ADD NEW ITEM")
        // const { itemData } = await addItem({
        //     variables: { ...addFormState },
        // });

        // console.log("itemData Variable from addItem Mutation")
        // console.log(itemData);

        // //authenticates user
        // // Auth.loggedIn();

        // window.location.assign('/dashboard/'+ username);

        // //hides the signup modal
        // toggleItem();

        // } catch (e) {
        // console.error(e);

        // }
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
                            <DashboardCard toggleItem = {toggleItem} />
                        </div>
                    </div>
                    </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileInfo profile={profile}/></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
        </div>

        <ItemModal isItemShowing={isItemShowing} hide={toggleItem} addFormState={addFormState} addHandleChange={addHandleChange} addHandleFormSubmit={addHandleFormSubmit}/>
                
    </div>
    )
    
}