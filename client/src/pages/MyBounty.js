import React, { useState } from 'react';
import "../assets/css/modal.css"
// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import ProfileInfo from '../components/ProfileInfo';
import DashboardCard from '../components/DashboardCard';
import useItemModal from '../assets/js/useItemModal';
import ItemModal from '../components/ItemModal';

import { QUERY_SINGLE_USER } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';

import Auth from '../utils/auth';

export default function MyBounty() {
    // Auth.loggedIn();

    const { username } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: username },
      });
          
    // console.log(data)
    const profile = data?.user || {};
    const items = profile?.items || {};
    console.log("PROFILE")
    console.log(profile)
    console.log("ITEMS")
    console.log(items)


    const { isItemShowing, toggleItem } = useItemModal();

    // const [addItem, { error, itemData }] = useMutation(ADD_ITEM);


    const [addFormState, setAddFormState] = useState({
        title: '',
        item_name: '',
        item_description: '',
        item_quantity: '',
        item_unit: '',
        item_price: '',
        category_name: '',
      });

      const [addItem, { error, itemData }] = useMutation(ADD_ITEM);

      const addHandleChange = (event) => {
        const { name, value } = event.target;
        // console.log("Name: " + name)
        // console.log("Value: " + value)

        setAddFormState({
        ...addFormState,
        [name]: value,
        });

    };

    const addHandleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log("INSIDE ADD ITEM FORM SUBMIT");
        // console.log(Auth.loggedIn());
        // console.log("item price type");
        // console.log(typeof(item_price));

        const sumbitQuantity = parseFloat(addFormState.item_quantity)
        addFormState.item_quantity = sumbitQuantity;

        const sumbitPrice = parseFloat(addFormState.item_price)
        addFormState.item_price = sumbitPrice;

        // console.log(typeof(addFormState.item_quantity))
        // console.log(typeof(addFormState.item_price))

        console.log({         
            title: addFormState.title,
            item_name: addFormState.item_name,
            item_description: addFormState.item_description,
            item_quantity: addFormState.item_quantity,
            item_unit: addFormState.item_unit,
            item_price: addFormState.item_price,
            category_name: addFormState.category_name
        });


        if (Auth.loggedIn()){
            try {
                console.log("INSIDE TRY FUNCTION TO ADD NEW ITEM")
            const { itemDataSumbit } = await addItem({
                variables: {         
                title: addFormState.title,
                item_name: addFormState.item_name,
                item_description: addFormState.item_description,
                item_quantity: addFormState.item_quantity,
                item_unit: addFormState.item_unit,
                item_price: addFormState.item_price,
                category_name: addFormState.category_name,
                username:username
            },
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
                            <DashboardCard toggleItem = {toggleItem} items={items}/>
                        </div>
                    </div>
                    </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileInfo profile={profile}/></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"></div>
            </div>
        </div>

        {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )}

        <ItemModal isItemShowing={isItemShowing} hide={toggleItem} addFormState={addFormState} addHandleChange={addHandleChange} addHandleFormSubmit={addHandleFormSubmit}/>
                
    </div>
    )
    
}