const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const storeCartData = (event) => {
    event.preventDefault();
  
    const item_cat = document.querySelector('#itemview-catname').textContent;
    const item_name= document.querySelector('#itemview-name').textContent;
    const item_quantity = document.querySelector('#cart-quantity').value;
    const item_unit = document.querySelector('#itemview-unit').textContent;
    const item_price = document.querySelector('#itemview-price').textContent;
  
    const cartItem = {
        category: item_cat,
        name: item_name,
        quantity: item_quantity,
        unit: item_unit,
        price: item_price
    }
  
    cartItems.push(cartItem);
  
    localStorage.setItem('cart', JSON.stringify(cartItems))
  
    console.log(cartItems);

    document.location.replace('/api/cart')
  }
  
  document.querySelector('#add-cart-form').addEventListener('submit',storeCartData);