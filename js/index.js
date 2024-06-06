// Function to save a bookmark
function saveBookmark() {

    
    var siteName = document.getElementById('siteName').value;  // Get the site name from the input
    var siteURL = document.getElementById('siteURL').value;    // Get the site URL from the input

    // Validate the form inputs
    if (!validateForm(siteName, siteURL)) {
        return false;  // Stop the function if validation fails
    }

    // Create a bookmark object
    var bookmark = {
        name: siteName,
        url: siteURL
    };

    // Check if bookmarks are already stored in local storage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];  // Create an empty array if no bookmarks are found
        bookmarks.push(bookmark);  // Add the new bookmark to the array
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  // Save the array to local storage
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  // Get the bookmarks from local storage
        bookmarks.push(bookmark);  // Add the new bookmark to the array
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  // Save the updated array to local storage
    }

    document.getElementById('bookmarkForm').reset();  // Reset the form
    fetchBookmarks();  // Refresh the bookmarks display
}

// Function to delete a bookmark by index
function deleteBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  // Get the bookmarks from local storage
    bookmarks.splice(index, 1);  // Remove the bookmark at the specified index
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  // Save the updated array to local storage
    fetchBookmarks();  // Refresh the bookmarks display
}

// Function to fetch and display bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  // Get the bookmarks from local storage
    var bookmarksResults = document.querySelector('#bookmarksTable tbody');  // Get the table body element

    bookmarksResults.innerHTML = '';  // Clear any existing rows in the table

    // Loop through each bookmark and create a row in the table
    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        bookmarksResults.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank">Visit</a></td>
                <td><button onclick="deleteBookmark(${i})">Delete</button></td>
            </tr>
        `;
    }
}

// Function to validate the form inputs
function validateForm(siteName, siteURL) {
    var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/;  // Regular expression to validate URLs

    if (!siteName || !siteURL) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have submitted invalid data!",
           
          });// Alert the user if any field is empty
        return false;  // Return false to indicate validation failure
    }

    if (!urlRegex.test(siteURL)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have submitted invalid data!",
          });// Alert the user if the URL is not valid
        return false;  // Return false to indicate validation failure
    }

    return true;  // Return true to indicate validation success
}

// Fetch bookmarks on page load
fetchBookmarks();



document.addEventListener("DOMContentLoaded", function() {
  const siteNameInput = document.getElementById("siteName");
  const siteURLInput = document.getElementById("siteURL");

  //siteNameInput.addEventListener("input", validateInput);
  siteURLInput.addEventListener("input", validateInput);

  siteNameInput.addEventListener("focus", handleFocus);
  siteURLInput.addEventListener("focus", handleFocus);

  siteNameInput.addEventListener("blur", handleBlur);
  siteURLInput.addEventListener("blur", handleBlur);
});

function validateInput(event) {
  var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/;  // Regular expression to validate URLs
  const input = event.target;
  if (!urlRegex.test(input.value)) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
  }
}

function handleFocus(event) {
  const input = event.target;
  input.style.borderColor = "orange";
}

function handleBlur(event) {
  const input = event.target;
  if (input.value.trim() === "") {
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = "#ddd"; // or any other default border color
  }
}