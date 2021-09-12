import React, { useState } from 'react';
import "../assets/css/modal.css"
// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import ProfileCard from '../components/ProfileCard';
import DashboardCard from '../components/DashboardCard';
import useItemModal from '../assets/js/useItemModal';
import ItemModal from '../components/ItemModal';
import ReviewCard from '../components/ReviewCard';
import Cart from '../components/Cart/Cart';

import { QUERY_SINGLE_USER } from '../utils/queries';
import { QUERY_REVIEWS } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';
import { UPDATE_ITEM } from '../utils/mutations';
import { REMOVE_ITEM } from '../utils/mutations';

import Auth from '../utils/auth';

let itemID

export default function MyBounty() {

    //extract username from params and save it to a variable
    const { username } = useParams();

    //if true, using the item modal to add an item, if false, using modal to edit an item
    let [formState, setFormState] = useState(true);

    //initializing mutations and queries
    const [ addItem ] = useMutation(ADD_ITEM);
    const [ removeItem ] = useMutation(REMOVE_ITEM);
    const [ updateItem ] = useMutation(UPDATE_ITEM);

    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { username: username },
      });
    const reviewData = useQuery(QUERY_REVIEWS, {
        variables: { reviewee: username },
      });
    
    const reviews = reviewData.data?.reviews || {};
    
    
    //saving the user information from QUERY_SINGLE_USER to profile variable
    const profile = data?.user || {};
    //saving the listing information from QUERY_SINGLE_USER to profile items
    const items = profile?.items || {};

    //initializing the toggle function used to toggle the item modal to add and edit items
    const { isItemShowing, toggleItem } = useItemModal();
    
    //using state to store/update the values inside the item modal
    const [addFormState, setAddFormState] = useState({
        _id: '',
        title: '',
        item_name: '',
        item_description: '',
        item_quantity: '',
        item_unit: '',
        item_price: '',
        category_name: '',
        errors: {
            item_quantity: '',
            item_price: '',
        }
      });

    //function to handle the changes to form state for the item modal to add/edit items
    const addHandleChange = (event) => {
        const { name, value } = event.target;

        setAddFormState({
        ...addFormState,
        [name]: value,
        });

        switch(name){
            case "item_quantity":
                addFormState.errors.item_quantity = 
                value.match(/^[0-9]+$/)
                ? ''
                : 'Item Quantity must be a number!';
            break;
            case "item_price":
                addFormState.errors.item_price = 
                value.match(/^[0-9]+$/)
                ? ''
                : 'Item Price must be a number!';
            break;
        }
    };

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
      };

    //function to handle the form submit for adding items
    const addHandleFormSubmit = async (event) => {
        event.preventDefault();
        //Form validation to catch any errors with logging in:
        if(validateForm(addFormState.errors)) {
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
            alert("Invalid Item Form");
          }

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
                errors: {
                    item_quantity: '',
                    item_price: '',
                }        
            });
    
    
            } catch (e) {
            console.error(e);
            alert(e);
    
            }

        }
        

    };

    //function to handle toggling the item modal with 'Add Listing' is clicked
    const toggleAndAdd = async () => {
        await toggleItem();
        const submitBtn = await document.querySelector("#create-edit-btn");
        submitBtn.textContent = await "Post Listing";

        const editForm = await document.querySelector("#create-edit-form");
        editForm.setAttribute('onsubmit', addHandleFormSubmit)

        console.log(editForm)


    }

    //function to handle toggling the item modal when 'Edit' is clicked on an item
    const toggleAndEdit = async () => {
        await setFormState(false);
        await toggleItem();
        const submitBtn = await document.querySelector("#create-edit-btn");
        submitBtn.textContent = await "Save Changes";

        const editForm = await document.querySelector("#create-edit-form");
        editForm.setAttribute('onsubmit', updateItemSubmit)

        console.log(editForm)


    }

    //function to handle updating the state of the form elements when a user wants to update an item
    const editButton = async (event) => {

        if(event.target !== event.currentTarget) {
            // console.log("TITLE")
            // console.log(event.currentTarget.querySelector(".item-title"));

            itemID = event.currentTarget.querySelector("#card-id").getAttribute('data-id');
            // console.log(itemID);
            // console.log("ITEM ID: " + itemID);      
            
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
                              
        }

    }

    //function to handle the form submit when updating an item
    const updateItemSubmit = async (event) => {
        event.preventDefault();
        //Form validation to catch any errors with logging in:
        if(validateForm(addFormState.errors)) {
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
            alert("Invalid Item Form");
          }
        try { 
            const sumbitQuantity = parseFloat(addFormState.item_quantity)
            addFormState.item_quantity = sumbitQuantity;
    
            const sumbitPrice = parseFloat(addFormState.item_price)
            addFormState.item_price = sumbitPrice;

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

        //hides the item modal
        toggleItem();

        window.location.assign('/dashboard/'+ username);

        setAddFormState({
            _id: '',
            title: '',
            item_name: '',
            item_description: '',
            item_quantity: '',
            item_unit: '',
            item_price: '',
            category_name: '',
            errors: {
                item_quantity: '',
                item_price: '',
            }    
        });

        setFormState(true);


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

            window.location.assign('/dashboard/'+ username);

        }

    }

    
    return(
    <div id="dashboard-image" className="dashboard-container">
        <Cart />
        <div className="d-flex">
            <div className="nav nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Listings</button>
                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                {/* <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button> */}
                <button className="nav-link" id="v-pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reviews" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Reviews</button>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div className = "your-bounty">
                        <button id="add-item" className="btn" type="button" onClick={toggleAndAdd}>Add Listing</button>
                        <div className="items">
                            <DashboardCard editButton = {editButton} items={items} handleDelete={handleDelete} toggleItem={toggleAndEdit}/>
                        </div>
                    </div>
                    </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileCard profile={profile}/></div>
                {/* <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div> */}
                <div className="tab-pane fade" id="v-pills-reviews" role="tabpanel" aria-labelledby="v-pills-reviews-tab"><ReviewCard reviewData={reviews}/></div>
            </div>
        </div>

        {/* {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )} */}

        <ItemModal isItemShowing={isItemShowing} hide={toggleItem} addFormState={addFormState} addHandleChange={addHandleChange} addHandleFormSubmit={addHandleFormSubmit} updateItemSubmit={updateItemSubmit} addForm={formState} errors={addFormState.errors}/>
                
    </div>
    )
    
}