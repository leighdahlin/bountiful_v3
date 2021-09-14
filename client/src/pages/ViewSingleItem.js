import React, { useState } from 'react';
import CartForm from '../components/CartForm';
import SellerProfileInfo from '../components/SellerProfileInfo';
import SingleItemInfo from '../components/SingleItemInfo';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ITEM } from '../utils/queries';
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import Cart from '../components/Cart/Cart';


export default function ViewSingleItem() {    

    const { id } = useParams();

    // console.log(id)

    const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
        variables: { _id: id },
    })

    // console.log(data)

    const itemData = data?.item || {};

    const userData = data?.item.user || {};
    // console.log("SINGLE USER")
    // console.log(itemData.user)

    const [quantity, setQuantity] = useState(0)

    const handleQuantityChange = (event) => {
        const { value } = event.target;

        setQuantity(value);

    }

    //ADDING ITEMS TO CART
    const [state, dispatch] = useStoreContext();

    const { cart } = state;

    console.log(cart)

    const item = {
        _id: itemData._id,
        item_name: itemData.item_name,
        item_quantity: quantity,
        item_price: itemData.item_price,
        item_unit: itemData.item_unit
    }

    const {
        _id,
        item_name,
        item_quantity,
        item_price,
        item_unit,
    } = item

    const addToCart = (event) => {
        event.preventDefault()
        const itemInCart = cart.find((cartItem) => cartItem._id === _id) 

        console.log(itemInCart)

        if (itemInCart) {
            let newQuantity = parseInt(itemInCart.purchaseQuantity) + parseInt(item_quantity);
            console.log(itemInCart.purchaseQuantity)
            console.log(newQuantity)
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: _id,
            purchaseQuantity:  newQuantity
          });
          idbPromise('cart', 'put', {
            ...itemInCart,
            purchaseQuantity: newQuantity
          });
        } else {
          dispatch({
            type: ADD_TO_CART,
            item: { ...item, purchaseQuantity: item_quantity }
          });
          idbPromise('cart', 'put', { ...item, purchaseQuantity: item_quantity });
        }
    }



    if(loading) {
        return <div>Loading...</div>
    }

        return (
        <div id="itemview-cart">
            <div id="itemvview-image">
                <Cart />
                <div className="button-form">
                <Link to="/browse"><button className="btn back-browse">Back</button></Link>

                <CartForm quantity={quantity} handleQuantityChange={handleQuantityChange} addToCart={addToCart}/>
                </div>
                <div className="page-container">
                    <div className="left-container">
                        <SellerProfileInfo userData = {userData}/>
                        <Link to={`/profile/${userData.username}`}><button className="btn seller-btn">Go to Seller's Profile</button></Link>
                    </div>
                    <div className="right-container">
                        <SingleItemInfo singleItemData = {itemData} />
                    </div>
                </div>

            </div>

        </div>

        )

}