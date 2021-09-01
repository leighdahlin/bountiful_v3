import React from 'react';
import ReactDOM from 'react-dom';

import logo from "../assets/images/b-logo.png";


const ItemModal = ({ isItemShowing, hide, addFormState, addHandleChange , addHandleFormSubmit}) => isItemShowing ? ReactDOM.createPortal(
    <React.Fragment>
    <div id="id03" className="modal" data-bs-backdrop="static" id="staticBackdrop">
        <form
        id="create-edit-form"
        className="modal-content animate newItemForm"
        onSubmit={addHandleFormSubmit}
        >
        <div className="imgcontainer">
            <span
            onClick={hide}
            className="close"
            title="Close Modal"
            >&times;</span
            >
            <img src={logo} alt="bountiful logo" className="avatar b-logo" />
        </div>

        <div className="container">
            <label htmlFor="item-title"><b>Title</b></label>
            <input
            id="item-title"
            type="text"
            placeholder="Enter the title of your post"
            name="title"
            value={addFormState.title}
            onChange={addHandleChange}
            required
            />

            <label htmlFor="item-name"><b>Item Name</b></label>
            <input
            id="item-name"
            type="text"
            placeholder="Enter Item's Name"
            name="item_name"
            required
            />

            <label htmlFor="item-description"><b>Description</b></label>
            <input
            id="item-description"
            type="text"
            placeholder="Enter a description of the item"
            name="item_description"
            value={addFormState.item_description}
            onChange={addHandleChange}
            required
            />

            <label htmlFor="item-unit"><b>Item Unit</b></label>
            <input
            id="item-unit"
            type="text"
            placeholder="Enter the units of the item (ex: pounds, ounces, single units)"
            name="item_unit"
            value={addFormState.item_unit}
            onChange={addHandleChange}
            required
            />

            <label htmlFor="item-quantity"><b>Quantity</b></label>
            <input
            id="item-quantity"
            type="text"
            placeholder="Enter how many units are you selling"
            name="item_quantity"
            value={addFormState.item_quantity}
            onChange={addHandleChange}
            required
            />

            <label htmlFor="item-price"><b>Price per Unit</b></label>
            <input
            id="item-price"
            type="text"
            placeholder="Enter the price per unit"
            name="item_price"
            value={addFormState.item_price}
            onChange={addHandleChange}
            required
            />

            <div>
                <label htmlFor="item-categories"><b>Categories</b></label>
                <select id="item-categories" name="cat_name" value={addFormState.cat_name} onChange={addHandleChange}>
                    <option value="" disabled selected>Choose...</option>
                    <option value="fruits" data-id="1">Fruits</option>
                    <option value="vegetables"data-id="2">Vegetables</option>
                    <option value="herbs" data-id="3">Herbs</option>
                    <option value="dairy" data-id="4">Dairy</option>
                    <option value="flowers" data-id="5">Flowers</option>
                </select>
            </div>


                {/* <!-- REMEMBER ME BUTTON -->  
                <!-- <button type="submit">Login</button>
                <label>
                <input type="checkbox" checked="checked" name="remember" /> Remember
                me
                </label>--> */}
            </div>
            <button
                id="create-edit-btn"
                type="submit"
                className="submitbtn modalbtn">
                Post Item
            </button>
            {/* <!-- FORGOT PASSWORD LINK -->
            <!-- <span className="psw">Forgot <a href="#">password?</a></span> --> */}
        </form>
    </div>
    </React.Fragment>, document.getElementById('root')
    ) : null;

export default ItemModal;