import {source} from './source/source.js';
let openedDays = JSON.parse(localStorage.getItem('openedDays')) || [];

let cardOutput = document.getElementById('output');

for(let i = 1; i <= 25; i++){
  cardOutput.innerHTML += `
          <div class="day-card d-flex flex-column justify-content-center align-items-center" data-index="${i - 1}">
            <div class="icon">
              <img src="images/icons/${source[i-1].icon}.png" alt="img">
            </div>
            <div class="day-number fs-1 fw-bold">
              ${i}
            </div>
          </div>`
  
}

const days = document.querySelectorAll('.day-card');
const blur = document.getElementById('blur');
let popUpOutput = document.getElementById('popup')

openedDays.forEach(index => {
  const day = days[index];
  if (day) {
    day.classList.add('clicked');
  }
});

days.forEach(function(day){
  day.addEventListener("click",function(){
    const index = parseInt(day.dataset.index);

    if (!openedDays.includes(index)) {
      openedDays.push(index);
      localStorage.setItem('openedDays', JSON.stringify(openedDays));
    }
    day.classList.add('clicked');
    blur.classList.remove('d-none');
    if(source[day.dataset.index].type === 'text'){
      popUpOutput.innerHTML = `
      <div>
          <p class="p-4"> ${source[day.dataset.index].text}</p>
        </div>
      <button class="btn btn-primary m-2" id="closePopUpBtn">Chiudi</button>
      `
    }else{
      popUpOutput.innerHTML = `
      <div>
          <img src="${source[day.dataset.index].url}" alt="">
      </div>
      <button class="btn btn-primary m-2" id="closePopUpBtn">Chiudi</button>
      `

    }
    const closeBtn = document.getElementById('closePopUpBtn');
    
    closeBtn.addEventListener('click', function(){
      blur.classList.add('d-none');
    })
  })
})
const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener("click", function(){
  openedDays = [];
  localStorage.removeItem('openedDays');
  days.forEach(day => day.classList.remove('clicked'));
})

