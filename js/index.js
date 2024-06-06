function saveBookmark() {
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if (!validateForm(siteName, siteURL)) {
      return false;
  }

  var bookmark = {
      name: siteName,
      url: siteURL
  };

  if (localStorage.getItem('bookmarks') === null) {
      var bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('bookmarkForm').reset();
  fetchBookmarks();
}

function deleteBookmark(index) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.querySelector('#bookmarksTable tbody');

  bookmarksResults.innerHTML = '';

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

function validateForm(siteName, siteURL) {
  var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/;

  if (!siteName || !siteURL) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have submitted invalid data!",
      });
      return false;
  }

  if (!urlRegex.test(siteURL)) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have submitted invalid data!",
      });
      return false;
  }

  return true;
}

fetchBookmarks();

document.addEventListener("DOMContentLoaded", function() {
  const siteNameInput = document.getElementById("siteName");
  const siteURLInput = document.getElementById("siteURL");

  siteURLInput.addEventListener("input", validateInput);

  siteNameInput.addEventListener("focus", handleFocus);
  siteURLInput.addEventListener("focus", handleFocus);

  siteNameInput.addEventListener("blur", handleBlur);
  siteURLInput.addEventListener("blur", handleBlur);
});

function validateInput(event) {
  var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/;
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
      input.style.borderColor = "#ddd";
  }
}
