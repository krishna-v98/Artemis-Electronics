//get element with id item__buttons
var itemButtons = document.getElementById('item__buttons');
console.log(itemButtons);

//if itemButtons has 2 children set width to 50%
if (itemButtons.children.length === 2) {
    itemButtons.style.width = '40%';
}