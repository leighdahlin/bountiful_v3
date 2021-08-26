// const e = require("express");
let itemID;

const editItemFunc = async (event) => {
    event.preventDefault();
    // console.log("IN THE EDIT ITEM FUCNTION");

    const title = document.querySelector('#item-title').value.trim();
    // console.log(title);
    const item_name = document.querySelector("#item-name").value.trim();
    const item_description = document.querySelector("#item-description").value.trim();
    const item_unit = document.querySelector("#item-unit").value.trim();
    const item_quantity = document.querySelector("#item-quantity").value.trim();
    const item_price = document.querySelector("#item-price").value.trim();
    const cat_name = document.querySelector("#item-categories").value.trim();
    let category_id;
    switch (cat_name)
    {
        case "fruits":
            category_id = "1";
            break;
        case "vegetables":
            category_id = "2";
            break;
        case "herbs":
            category_id = "3";
            break;
        case "dairy":
            category_id = "4";
            break;
        case "flowers":
            category_id = "5";
            break;
    }   

      
    // console.log("EDIT EDIT ------------------------------------------------------------ ")
  
        // console.log(itemID);

      const response = await fetch(`/api/items/edititem/${itemID}`, {
        method: 'PUT',
        body: JSON.stringify({ title, item_name, item_description, item_quantity, item_unit, item_price, cat_name, category_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit item');
      }
  };

  const FEeditProfile = async (event) => {
    // event.preventDefault();


    if(event.target !== event.currentTarget) {
      //gets the information for the item from the card
      console.log(event.currentTarget);
      itemID = event.currentTarget.querySelector(".edit-item").id;
      console.log(itemID);
      const itemTitle = event.currentTarget.querySelector(".item-title").textContent.trim();
      const itemName = event.currentTarget.querySelector(".item-name").textContent.trim();
      const itemDescpt = event.currentTarget.querySelector(".item-description").textContent.trim();
      const itemUnit = event.currentTarget.querySelector(".item-unit").textContent.trim();
      const itemQunty = event.currentTarget.querySelector(".item-quantity").textContent.trim();
      const itemPrice = event.currentTarget.querySelector(".item-price").textContent.trim();
      const itemCat = event.currentTarget.querySelector(".item-categories").textContent.trim();

      //selects the inputs in the modal for each feild
      const submitBtn = document.querySelector("#create-edit-btn");
      const titleInpt = document.querySelector("#item-title");
      const nameInpt = document.querySelector("#item-name");
      const descptInpt = document.querySelector("#item-description");
      const unitInpt = document.querySelector("#item-unit");
      const quntyInpt = document.querySelector("#item-quantity");
      const priceInpt = document.querySelector("#item-price");
      const catInpt = document.querySelector("#item-categories");
      
      //inputs the values of the card into the modal for editing
      titleInpt.value = itemTitle;
      nameInpt.value = itemName;
      descptInpt.value = itemDescpt;
      unitInpt.value = itemUnit;
      quntyInpt.value = itemQunty;
      priceInpt.value = itemPrice;
      catInpt.value = itemCat;
      submitBtn.textContent = "Save Changes";
  

    }
}

//selects all card with item card class, puts them into an array and adds an event listener
[...document.querySelectorAll('.item-card')].forEach(function(item) {
  item.addEventListener('click', FEeditProfile);
})

const openModal = () => {

  //opens the modal with the edit button is clicked
  // clearForm();

  const modal = document.getElementById("id03");
  modal.setAttribute("style","display:block;");

  console.log("YOU ARE IN FUNCTION");

  const formSelector = document.querySelector('#create-edit-form');
  formSelector.setAttribute("class","modal-content animate editItemForm");
  document.querySelector('.editItemForm').addEventListener('submit', editItemFunc);
}

// document.querySelector('.item-card').addEventListener('click', FEeditProfile);

//selects all buttons with edit item class, puts them into an array and adds an event listener
[...document.querySelectorAll('.edit-item')].forEach(function(item) {
  item.addEventListener('click', openModal);
})

