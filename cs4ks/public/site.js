function addButtonFunctionality(){
  var more_button = document.querySelector('.more-button');
  var less_button = document.querySelector('.less-button');
  var container = document.querySelector('.container');
  
  more_button.addEventListener('click', (button)=>{
      container.classList.toggle('visible');
    })
  less_button.addEventListener('click', (button)=>{
      container.classList.toggle('visible');
    })
}

addButtonFunctionality();