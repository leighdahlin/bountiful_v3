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
import { UPDATE_ITEM } from '../utils/mutations';
import { REMOVE_ITEM } from '../utils/mutations';

import Auth from '../utils/auth';

let itemID

export default function MyBounty() {

    const { username } = useParams();

    const [addItem, { error, itemData }] = useMutation(ADD_ITEM);
    const [ removeItem ] = useMutation(REMOVE_ITEM);
    const [ updateItem ] = useMutation(UPDATE_ITEM);

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: username },
      });
          
    // console.log(data)
    const profile = data?.user || {};
    const items = profile?.items || {};
    // console.log("PROFILE")
    // console.log(profile)
    // console.log("ITEMS")
    // console.log(items)


    const { isItemShowing, toggleItem } = useItemModal();

    // const [addItem, { error, itemData }] = useMutation(ADD_ITEM);


    const [addFormState, setAddFormState] = useState({
        _id: '',
        title: '',
        item_name: '',
        item_description: '',
        item_quantity: '',
        item_unit: '',
        item_price: '',
        category_name: '',
      });


      const addHandleChange = (event) => {
        const { name, value } = event.target;
        // console.log("Name: " + name)
        // console.log("Value: " + value)

        // console.log("Change item id: " + itemID)

        setAddFormState({
        ...addFormState,
        [name]: value,
        });

        // console.log(addFormState)

    };

    const addHandleFormSubmit = async (event) => {
        event.preventDefault();

        const sumbitQuantity = parseFloat(addFormState.item_quantity)
        addFormState.item_quantity = sumbitQuantity;

        const sumbitPrice = parseFloat(addFormState.item_price)
        addFormState.item_price = sumbitPrice;

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
            
            window.location.assign('/dashboard/'+ username);
    
            //hides the signup modal
            toggleItem();

            setAddFormState({
                title: '',
                item_name: '',
                item_description: '',
                item_quantity: '',
                item_unit: '',
                item_price: '',
                category_name: '',
            });
    
    
            } catch (e) {
            console.error(e);
    
            }

        }
        

    };

    const toggleAndEdit = async () => {
        await toggleItem();
        const submitBtn = await document.querySelector("#create-edit-btn");
        submitBtn.textContent = await "Save Changes";

        const editForm = await document.querySelector("#create-edit-form");
        // editForm.setAttribute('onSubmit', "{updateItemSubmit}")

        console.log(editForm)


    }

    const editButton = async (event) => {

        if(event.target !== event.currentTarget) {
            console.log("TITLE")
            console.log(event.currentTarget.querySelector(".item-title"));

            itemID = event.currentTarget.querySelector("#card-id").getAttribute('data-id');
            // console.log(itemID);
            console.log("ITEM ID: " + itemID);      
            
            //gets the information for the item from the card
            const itemTitle = event.currentTarget.querySelector(".item-title").textContent.trim();
            const itemName = event.currentTarget.querySelector(".item-name").textContent.trim();
            const itemDescpt = event.currentTarget.querySelector(".item-description").textContent.trim();
            const itemUnit = event.currentTarget.querySelector(".item-unit").textContent.trim();
            const itemQunty = event.currentTarget.querySelector(".item-quantity").textContent.trim();
            const itemPrice = event.currentTarget.querySelector(".item-price").textContent.trim();
            const itemCat = event.currentTarget.querySelector(".item-categories").textContent.trim();
        
            
            setAddFormState({
                _id: itemID,
                title: itemTitle,
                item_name: itemName,
                item_description: itemDescpt,
                item_quantity: itemQunty,
                item_unit: itemUnit,
                item_price: itemPrice,
                category_name: itemCat,
              });
                  
                // console.log("NEW FORM STATE")
                // console.log(addFormState);
            
        }

    }

    const updateItemSubmit = async (event) => {
        event.preventDefault();
        try { 
            const sumbitQuantity = parseFloat(addFormState.item_quantity)
            addFormState.item_quantity = sumbitQuantity;
    
            const sumbitPrice = parseFloat(addFormState.item_price)
            addFormState.item_price = sumbitPrice;

            console.log(itemID)
            console.log(addFormState)


            const { itemUpdateSumbit } = await updateItem({
            variables: {  
            _id: addFormState._id,       
            title: addFormState.title,
            item_name: addFormState.item_name,
            item_description: addFormState.item_description,
            item_quantity: addFormState.item_quantity,
            item_unit: addFormState.item_unit,
            item_price: addFormState.item_price,
            category_name: addFormState.category_name,
        },
        });

        //hides the signup modal
        toggleItem();

        setAddFormState({
            _id: '',
            title: '',
            item_name: '',
            item_description: '',
            item_quantity: '',
            item_unit: '',
            item_price: '',
            category_name: '',
        });


        } catch (e) {
        console.error(e);

        }
    }

    const handleDelete = async (event) => {

        const id = event.target.getAttribute('data-id');
        console.log(id)    

        if (event.target.hasAttribute('data-id')) {
            console.log("DELETE")
            const { data } = await removeItem({
                variables: {         
                _id: id,
                },
            });

        }

    }

    
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
                            <DashboardCard editButton = {editButton} items={items} handleDelete={handleDelete} toggleItem={toggleAndEdit}/>
                        </div>
                    </div>
                    </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileInfo profile={profile}/></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"></div>
            </div>
        </div>

        {/* {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )} */}

        <ItemModal isItemShowing={isItemShowing} hide={toggleItem} addFormState={addFormState} addHandleChange={addHandleChange} addHandleFormSubmit={addHandleFormSubmit} updateItemSubmit={updateItemSubmit}/>
                
    </div>
    )
    
}