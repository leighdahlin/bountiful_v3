const editProfile = async (event) => {
    event.preventDefault();
    // console.log("INSIDE EDIT PROFILE FUNCTION");

    const editBtn = document.querySelector('#edit-profile');
    const addBtn = document.querySelector('#add-item');
    const profileLi = document.querySelector('.profile-info');
    const usernameLi = document.querySelector('#dashboard-username');
    const locationLi = document.querySelector('#dashboard-location')

    let username = await usernameLi.textContent;
    let location = await locationLi.textContent;


    editBtn.setAttribute("class","hide");
    addBtn.setAttribute("class","hide");
    usernameLi.setAttribute("class","hide");
    locationLi.setAttribute("class","hide");

    const profileForm = document.createElement('form');
    //Create a class attribute here to add the event listener to:
    profileForm.setAttribute("class","profile-submit");
    
    const userInput = document.createElement('input');
    userInput.setAttribute("type","text")
    userInput.setAttribute("class","profile-input");
    userInput.value = username;

    const locationInputDiv = document.createElement('div');
    const locationInputLabel = document.createElement('label');
    locationInputDiv.appendChild(locationInputLabel);
    locationInputLabel.setAttribute("for","location-edit");
    locationInputLabel.textContent = "Location";
    const locationInputSelect = document.createElement('select');
    locationInputSelect.setAttribute("id","location-edit");
    locationInputSelect.setAttribute("name","location-edit");
    locationInputLabel.appendChild(locationInputSelect);

    const locationOption1 = document.createElement('option');
    locationOption1.setAttribute("value","Downtown Sacramento");
    locationOption1.textContent = "Downtown Sacramento";
    locationInputSelect.appendChild(locationOption1);

    const locationOption2 = document.createElement('option');
    locationOption2.setAttribute("value","West Sacramento");
    locationOption2.textContent = "West Sacramento";
    locationInputSelect.appendChild(locationOption2);
    
    const locationOption3 = document.createElement('option');
    locationOption3.setAttribute("value","East Sacramento");
    locationOption3.textContent = "East Sacramento";
    locationInputSelect.appendChild(locationOption3);
    
    const locationOption4 = document.createElement('option');
    locationOption4.setAttribute("value","North Sacramento");
    locationOption4.textContent = "North Sacramento";
    locationInputSelect.appendChild(locationOption4);
    
    const locationOption5 = document.createElement('option');
    locationOption5.setAttribute("value","South Sacramento");
    locationOption5.textContent = "South Sacramento";
    locationInputSelect.appendChild(locationOption5);
    
    // locationInput.setAttribute("type","text")
    // locationInput.setAttribute("class","profile-input")
    // locationInput.value = userLocation;

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute("class","submit");
    saveBtn.setAttribute("class", "btn save-btn");
    saveBtn.textContent = "Save"

    profileForm.appendChild(userInput)
    profileForm.appendChild(locationInputDiv)
    profileForm.appendChild(saveBtn);
    profileLi.appendChild(profileForm);

    document.querySelector('.profile-submit').addEventListener('submit', updateProfile);

};

const updateProfile = async (event) => {
    event.preventDefault();
    // console.log("INSIDE UPDATE PROFILE FUNCTION");
    
    const username = document.querySelector('.profile-input').value.trim();
    // console.log(username);
    const location = document.querySelector('#location-edit').value.trim();
    // console.log(location);
  
    if (document.querySelector("#edit-profile").hasAttribute('data-id')) {
        const id = document.querySelector("#edit-profile").getAttribute('data-id');
        // console.log(id);

      const response = await fetch(`/api/editprofile/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ username, location }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to  edit user');
      }
    }

};

//event listener on the form of class profile-input - submit button that will take the input for req.body to sent to the backend
//redirect to dashboard when response.ok
document.querySelector('#edit-profile').addEventListener('click', editProfile);