const newItemFunc = async (event) => {
    event.preventDefault();
    

    const title = document.querySelector('#item-title').value.trim();
    const item_name= document.querySelector('#item-name').value.trim();
    const item_description = document.querySelector('#item-description').value.trim();
    const item_quantity = document.querySelector('#item-quantity').value.trim();
    const item_unit = document.querySelector('#item-unit').value.trim();
    const item_price = document.querySelector('#item-price').value.trim();
    const cat_name = document.querySelector('#item-categories').value.trim();
    let category_id;
    switch (cat_name)
    {
        case "fruits":
            category_id = 1;
            break;
        case "vegetables":
            category_id = 2;
            break;
        case "herbs":
            category_id = 3;
            break;
        case "dairy":
            category_id = 4;
            break;
        case "flowers":
            category_id = 5;
            break;
    }   
    
    if(title && item_name && item_description && item_quantity && item_unit && item_price && cat_name){
        // console.log("INSIDE FRONT END FETCH")
        
        const response = await fetch("/api/items/createItem", {
            method: 'POST',
            body: JSON.stringify({title, item_name, item_description, item_quantity, item_unit, item_price, cat_name, category_id}),
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        // console.log(response);
      
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create item');
        }
    }    
};

//opens the modal with the edit button is clicked
const openCreateModal = () => {
    clearForm();
    
    const modal = document.getElementById("id03");
    modal.setAttribute("style","display:block;")

    const formSelector = document.querySelector('#create-edit-form');
    formSelector.setAttribute("class","modal-content animate newItemForm")

    document
    .querySelector('.newItemForm')
    .addEventListener('submit', newItemFunc);

  }

const clearForm = () => {
    // console.log("YOU ARE IN CLEAR FORM")
    //selects the inputs in the modal for each feild
    const submitBtn = document.querySelector("#create-edit-btn");
    const titleInpt = document.querySelector("#item-title");
    const nameInpt = document.querySelector("#item-name");
    const descptInpt = document.querySelector("#item-description");
    const unitInpt = document.querySelector("#item-unit");
    const quntyInpt = document.querySelector("#item-quantity");
    const priceInpt = document.querySelector("#item-price");
    const catInpt = document.querySelector("#item-categories");
    
    //clears the values of the card into the modal for creating a new item
    titleInpt.value = "";
    nameInpt.value = "";
    descptInpt.value = "";
    unitInpt.value = "";
    quntyInpt.value = "";
    priceInpt.value = "";
    catInpt.value = "";
    submitBtn.textContent = "Post Item"
}

  document.querySelector('#add-item').addEventListener('click', openCreateModal);

