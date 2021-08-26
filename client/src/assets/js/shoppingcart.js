

// if (document.readyState == 'loading') {
//   document.addEventListener('DOMContentLoaded', ready)
// } else {
//   ready()
// }

// function ready() {
//   var removeCartItemButtons = document.getElementsByClassName('btn add-cart')
//   for (var i = 0; i < removeCartItemButtons.length; i++) {
//       var button = removeCartItemButtons[i]
//       button.addEventListener('click', removeCartItem)
//   }

//   var quantityInputs = document.getElementsByClassName('cart-quantity')
//   for (var i = 0; i < quantityInputs.length; i++) {
//       var input = quantityInputs[i]
//       input.addEventListener('click', quantityChanged)
//   }

//   var addToCartButtons = document.getElementsByClassName('btn add-cart')
//   for (var i = 0; i < addToCartButtons.length; i++) {
//       var button = addToCartButtons[i]
//       button.addEventListener('click', addToCartClicked)
//   }

//   document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//   alert('Thank you for your purchase')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   while (cartItems.hasChildNodes()) {
//       cartItems.removeChild(cartItems.firstChild)
//   }
//   updateCartTotal()
// }

// function removeCartItem(event) {
//   var buttonClicked = event.target
//   buttonClicked.parentElement.parentElement.remove()
//   updateCartTotal()
// }

// function quantityChanged(event) {
//   var input = event.target
//   if (isNaN(input.value) || input.value <= 0) {
//       input.value = 1
//   }
//   updateCartTotal()
// }

// function addToCartClicked(event) {
//   var button = event.target
//   var shopItem = button.parentElement.parentElement
//   var title = shopItem.getElementsByClassName('title')[0].innerText
//   var price = shopItem.getElementsByClassName('item_price')[0].innerText
//   var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//   addItemToCart(title, item_price, imageSrc)
//   updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc) {
//   var cartRow = document.createElement('div')
//   cartRow.classList.add('cart-row')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//   for (var i = 0; i < cartItemNames.length; i++) {
//       if (cartItemNames[i].innerText == title) {
//           alert('This item is already added to the cart')
//           return
//       }
//   }
//   var cartRowContents = `
//       <div class="cart-item cart-column">
//           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//           <span class="cart-item-title">${title}</span>
//       </div>
//       <span class="cart-price cart-column">${price}</span>
//       <div class="cart-quantity cart-column">
//           <input class="cart-quantity-input" type="number" value="1">
//           <button class="btn btn-danger" type="button">REMOVE</button>
//       </div>`
//   cartRow.innerHTML = cartRowContents
//   cartItems.append(cartRow)
//   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

// function updateCartTotal() {
//   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//   var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//   var total = 0
//   for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i]
//       var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//       var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//       var price = parseFloat(priceElement.innerText.replace('$', ''))
//       var quantity = quantityElement.value
//       total = total + (price * quantity)
//   }
//   total = Math.round(total * 100) / 100
//   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }

const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

console.log(cartItems);


const renderCart = () => {
  const numberItemsLi = document.querySelector('#number-items');
  const totalItems = cartItems.length;
  numberItemsLi.textContent = totalItems + " items"

  const renderItemsLi = document.querySelector('#item-render');
  let addPrice = 0;

  for (i=0; i<cartItems.length; i++) {
    const price = cartItems[i].quantity * cartItems[i].price
    addPrice += price;

    const div1 = document.createElement('div');
    div1.setAttribute('class','row border-top border-bottom')
    renderItemsLi.appendChild(div1);
  
    const div2 = document.createElement('div');
    div2.setAttribute('class','row main align-items-center')
    div1.appendChild(div2);
  
    const div3 = document.createElement('div');
    div3.setAttribute('class','col-2')
    div2.appendChild(div3);
  
    const cartimg = document.createElement('img');
    cartimg.setAttribute('class','img-fluid');
    cartimg.setAttribute('src','/images/b-logo.png');
    div3.appendChild(cartimg);
  
    const div4 = document.createElement('div');
    div4.setAttribute('class','col')
    div2.appendChild(div4);
  
    const div5 = document.createElement('div');
    div5.setAttribute('class','row text-muted');
    div5.textContent = cartItems[i].category;
    div4.appendChild(div5);
  
    const div6 = document.createElement('div');
    div6.setAttribute('class','row')
    div6.textContent = cartItems[i].name;
    div4.appendChild(div6);
  
    const div7 = document.createElement('div');
    div7.setAttribute('class','col')
    div7.textContent = cartItems[i].quantity;
    div2.appendChild(div7);
  
    // const div8 = document.createElement('div');
    // div8.setAttribute('class','row text-muted');
    // div8.textContent = cartItems[i].quantity;
    // div4.appendChild(div8);
  
    const div9 = document.createElement('div');
    div9.setAttribute('class','col')
    div9.textContent = "$ " + price;
    div2.appendChild(div9);
  }

  const totalcostLi = document.querySelector('#cart-total');
  totalcostLi.textContent = "$ " + addPrice;

  



  


  console.log(numberItemsLi)
  console.log(totalItems);
}


document.querySelector('#purchase').addEventListener('click', function(){
  window.localStorage.clear();
  document.location.replace('/api/items')
});

renderCart();