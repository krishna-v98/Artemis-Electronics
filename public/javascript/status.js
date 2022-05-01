//get element with id status
let stat = document.querySelector('#status');
stat.style.fontWeight = 'bold';

if(stat.innerHTML == 'available' || stat.innerHTML == 'Available'){
    stat.style.backgroundColor = 'rgba(4, 215, 4, 0.664)';
    console.log(stat);
} else{
    stat.style.backgroundColor = 'rgba(215, 4, 4, 0.664)';
}
