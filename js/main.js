"use strict";

// FUNCTION 01
function createElemWithText(element = "p", content = "", className = "") {
  let el = document.createElement(element);
  el.textContent = content;
  if (className !== "") el.classList.add(className);
  return el;
}

// FUNCTION 02
function createSelectOptions(users) {
  //if no data parameter is given, returns undefined.
  if (users === undefined || users === null) {
    return undefined;
  }

  // defining the array
  let optionArray = [];

  // each user in the users array
  for (let user of users) {
    // to print the user in consol
    console.log(user);
    // creating an option
    var opt = document.createElement("option");

    // assigning the user id to the option value
    opt.value = user.id;

    // assigning user name to innerhtml of option
    opt.innerHTML = user.name;

    // adding the option to the array
    optionArray.push(opt);
  }

  // returning  array
  return optionArray;
}

// FUNCTION 03
function toggleCommentSection(postId) {
  if (!postId) {
    return undefined;
  }
  // Selects the section element with the data-post-id attribute
  // equal to the postId received as a parameter
  let section = document.querySelector(`section[data-post-id="${postId}"]`);
  // verify if section exist
  if (section) {
    // toggle the class `hide` on the section element
    section.classList.toggle("hide");
  }
  // return the section element
  return section;
}

// FUNCTION 04
function toggleCommentButton(postID) {
  // if postID is not received, return
  if (!postID) {
    return;
  }
  // select button having its value of "data-post-id" attribute = value of "postId"
  const btnSelectedEl = document.querySelector(
    `button[data-post-id = "${postID}"`
  );

  if (btnSelectedEl != null) {
    // if the textContent of button is 'Show Comments', change it to "Hide Comments", otherwise change to "Show Comments" by making use of ternary operator
    btnSelectedEl.textContent === "Show Comments"
      ? (btnSelectedEl.textContent = "Hide Comments")
      : (btnSelectedEl.textContent = "Show Comments");
  }

  // returning the selected button element
  return btnSelectedEl;
}

// FUNCTION 05 /############ 1 is failed ######## /
function deleteChildElements(parentElement) {
  if (!parentElement) return undefined;
  let child = parentElement?.lastElementChild;
  if (!child)
    return parentElement; // if this is undefined, still one is failed.
  else {
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }
}

// FUNCTION 06
const addButtonListeners = () => {
  let myMainElem = document.querySelector("main");
  let buttonsList = myMainElem.querySelectorAll("button");
  if (buttonsList) {
    for (let i = 0; i < buttonsList.length; i++) {
      let myButton = buttonsList[i];
      let postId = myButton?.dataset?.postId;
      if (postId) {
        myButton.addEventListener("click", function (event) {
          toggleComments(event, postId), false;
        });
      }
    }
    return buttonsList;
  }
};

// FUNCTION 07
const removeButtonListeners = () => {
  let myMainElem = document.querySelector("main");
  let buttonsList = myMainElem.querySelectorAll("button");
  if (buttonsList) {
    for (let i = 0; i < buttonsList.length; i++) {
      let myButton = buttonsList[i];
      let postId = myButton.dataset.postId;
      if (postId) {
        myButton.removeEventListener("click", function (event) {
          toggleComments(event, postId), false;
        });
      }
    }
    return buttonsList;
  }
};

// FUNCTION 08
function createComments(comments) {
  if (!comments) return undefined;
  //return undefined if object is null
  if (JSON.stringify(comments) === "{}") {
    return undefined;
  }
  //  Receives the JSON comments data as a parameter
  //  Creating a fragment element
  let frag = document.createDocumentFragment();
  // Looping through the comments data
  for (let i = 0; i < comments.length; i++) {
    var comment = comments[i];
    //  Creating an article element
    let article = document.createElement("article");
    // Creating an h3 element with createElemWithText
    let h3 = createElemWithText("h3", comment.name);
    // Creating an paragraph element with createElemWithText
    let p1 = createElemWithText("p", comment.body);
    // Creating an paragraph element with createElemWithText
    let p2 = createElemWithText("p", `From: ${comment.email}`);
    // Appending the h3 and paragraphs to article element
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);
    //  Appending the article element to the fragment
    frag.appendChild(article);
  }
  // Returning the fragment element
  return frag;
}

// FUNCTION 09
function populateSelectMenu(users) {
  // if users is empty, return undefined
  if (!users) return;
  // select the selectMenu id
  let menu = document.querySelector("#selectMenu");
  // passes the data to createSelectOptions to get an array
  let options = createSelectOptions(users);

  // loop through and append each option to the menu
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    menu.append(option);
  } // end for loop

  // return menu
  return menu;
} // end populateSelectMenu

// FUNCTION 10
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// FUNCTION 11
async function getUserPosts(id) {
  if (!id) return undefined;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// FUNCTION 12
const getUser = async (userId) => {
  if (!userId) return;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const jsonUserIdData = await response.json();
    console.log(userId);
    return jsonUserIdData;
  } catch (error) {
    console.log(error);
  }
  console.log(jsonUserIdData);
};

// FUNCTION 13
const getPostComments = async (postId) => {
  if (!postId) return;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const jsonPostComments = await response.json();
    return jsonPostComments;
  } catch (error) {
    console.log(error);
  }
};

// FUNCTION 14
const displayComments = async (postId) => {
  if (!postId) return;
  let section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  console.log(section);
  return section;
};

// FUNCTION 15
const createPosts = async (jsonPosts) => {
  if (!jsonPosts) return;

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < jsonPosts.length; i++) {
    let post = jsonPosts[i];

    let article = document.createElement("article");
    let section = await displayComments(post.id);
    let author = await getUser(post.userId);

    let h2 = createElemWithText("h2", post.title);
    let p = createElemWithText("p", post.body);
    let p2 = createElemWithText("p", `Post ID: ${post.id}`);

    let p3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

    let button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    article.append(h2, p, p2, p3, p4, button, section);

    fragment.append(article);
  }
  return fragment;
};

// FUNCTION 16
const displayPosts = async (posts) => {
  let myMain = document.querySelector("main");
  let element = posts
    ? await createPosts(posts)
    : document.querySelector("main p");
  myMain.append(element);
  return element;
};

// FUNCTION 17
function toggleComments(event, postId) {
  if (!event || !postId) {
    return undefined;
  }
  let section = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

// FUNCTION 18
const refreshPosts = async (posts) => {
  if (!posts) {
    return undefined;
  }
  let buttons = removeButtonListeners();
  let myMain = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let button = addButtonListeners();
  return [buttons, myMain, fragment, button];
};

// FUNCTION 19
const selectMenuChangeEventHandler = async (e) => {
  if (!e) return undefined;
  let userId = e?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);
  return [userId, posts, refreshPostsArray];
};

// FUNCTION 20
const initPage = async () => {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
};

// FUNCTION 21
function initApp() {
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
}


