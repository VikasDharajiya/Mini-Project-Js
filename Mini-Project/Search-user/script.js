let userContainer = document.querySelector(".userContainer");
let searchInput = document.querySelector("#searchInput");

const users = [
  {
    profileUrl:
      "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG1vZGVsfGVufDB8fDB8fHww",
    name: "Snoozy Jack",
    Email: "snoozyjack@gmail.com",
  },
  {
    profileUrl:
      "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
    name: "munnabhai",
    Email: "munabhai@mbbs.com",
  },
  {
    profileUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    name: "lakhsmi Tiwari",
    Email: "lakshmi@Tiwari.com",
  },
  {
    profileUrl:
      "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D",
    name: "shorf rockey",
    Email: "jackrockey@shorf.com",
  },
];

function renderUsers(arr) {
  userContainer.innerHTML = "";

  if (arr.length === 0) {
    userContainer.innerHTML = `
      <div class="not-found">User not found</div>
    `;
    return;
  }

  arr.map(function (obj) {
    let { profileUrl, name, Email } = obj;

    let divElem = document.createElement("div");
    divElem.className = "userItem";
    divElem.innerHTML = `
          <div class="image">
            <img src=${profileUrl}/>
          </div>
          <div class="userDetails">
            <h4>${name}</h4>
            <p>${Email}</p>
          </div>
  `;

    userContainer.append(divElem);
  });
}
renderUsers(users);
function handelSearch(e) {
  // console.log(searchInput.value);
  let searchValue = e.target.value.toLowerCase();
  let filteredUsers = users.filter((obj) => {
    return (
      obj.name.toLowerCase().includes(searchValue) ||
      obj.Email.toLowerCase().includes(searchValue)
    );
  });
  renderUsers(filteredUsers);
}
searchInput.addEventListener("input", handelSearch);
