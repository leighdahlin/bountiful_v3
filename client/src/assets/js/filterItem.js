const viewItemFunc = async (event) => {
    event.preventDefault();
    //Create a switch function to go through each category. 
    //On button click submit, send a get request to backend to render all items in that category:
    console.log("INSIDE CLICK FUNCTION")
    const cat_name = document.querySelector('#item-categories').value.trim();
    console.log(cat_name);
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

    const response = await fetch(`/api/items/view/${category_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace(`/api/items/view/${category_id}`);
    } else {
        alert('Failed to filter category');
    }
};

document
.querySelector(".browse-form")
.addEventListener('submit', viewItemFunc);

   