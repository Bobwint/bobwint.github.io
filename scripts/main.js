// Variable Types: 
// ================
// String: let name = "Bob"; -or 'Bob'; 
// Number: let age = 25;
// Boolean: let isFixed = true; -or- false;
// Array: let myArray = [25, 'Bob', 'Wint', true]; --> myArray[0] thru myArray[3]
// Object: let myHeading = document.querySelector("h1");
//
// Operators:
// ===========
// '+' --> 6 + 9 -or- "Bob" + " Wint"
// '-', '/', '*', '=', '%', '<', '>', '**'
// '&&', '||', '??'
// '===' -or- '!==' is comparison that returns a boolean (must be equal and same data type)
//
// Events:
// ========
// Select an element (i.e. 'img'), a desired trigger (i.e. 'click'), and a resulting action to take

document.querySelector("ul").addEventListener("click", function () {
    alert("Ouch! Stop poking me!");
  });

const myImage = document.querySelector("img");
myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/firefox.png") {
    myImage.setAttribute("src", "images/firefox2.jpeg");
  } else {
    myImage.setAttribute("src", "images/firefox.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
      setUserName();
    } else {
      localStorage.setItem("name", myName);                     // Persist data 
      myHeading.textContent = `Mozilla is cool, ${myName}`;     // Update the page content
    }
}  
if (!localStorage.getItem("name")) {    // If 'name' does not already exist in storage
    setUserName();                      // then prompt user for a 'name'
} else {                                // else get the 'name' from storage and populate the property
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla is cool, ${storedName}`;
}
// Button action to change stored user name
myButton.onclick = () => {
    setUserName();
};
