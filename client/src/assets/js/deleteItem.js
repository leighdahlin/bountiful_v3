const deleteButtonFunc = async (event) => {
    console.log("In delete javascript")
    const id = event.target.getAttribute('data-id');
    console.log(id);
  
      //Data-id is from the button, where the attribute is set as the id for the current post being clicked on:
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id);
    
        const response = await fetch(`/api/items/${id}`, {
          method: 'DELETE',
        });
        // console.log(response);
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete item');
        }
      }
};

//Put the event listener on the class of the parent items that contains all the cards to be rendered:
    document
    .querySelector(".items")
    .addEventListener('click', deleteButtonFunc);



// document.addEventListener('click', async function (event){
    
//         //Data-id is from the button, where the attribute is set as the id for the current item being clicked on:
//         if(event.target !== event.currentTarget){
//           const buttonID = event.target.id;
//           const id = event.target.getAttribute('data-id');
//           console.log(id);
//           console.log(buttonID);

//        if(buttonID == id){
//             const response = await fetch(`/api/items/${id}`, {
//               method: 'DELETE',
//             });
  
//              // console.log(response);
//              if (response.ok) {
//               document.location.replace('/dashboard');
//             } else {
//               alert('Failed to delete item');
//             } 
//       }
//     }
// });


// //SORTA Working:
// [...document.querySelectorAll('.deleteMe')].forEach(function (i) {
//   i.addEventListener('click', async function (event){
    
//     if(event.target !== event.currentTarget){
//     //Data-id is from the button, where the attribute is set as the id for the current item being clicked on:
    
//       const buttonID = event.target.id;
//       const id = event.target.getAttribute('data-id');
//       console.log(id);
//       console.log(buttonID);

//       if(buttonID == id){
//         const response = await fetch(`/api/items/${id}`, {
//           method: 'DELETE',
//         });

//          // console.log(response);
//          if (response.ok) {
//           document.location.replace('/dashboard');
//         } else {
//           alert('Failed to delete item');
//         } 
//     }
//   }
//   });
// });