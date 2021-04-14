// FORM VALIDATION
let formEl = document.querySelector("form");
let stName = document.querySelector("#nameInput");
let phoneNumber = document.querySelector("#phoneNumberInput");
let subjectEl = document.querySelector("select");
let submitBtn = document.querySelector("#book-btn");
let formStatus = document.querySelector('.formStatus')
let howCorrect = 0;
let formAnswer;

formEl.addEventListener("submit", (e) => {
  howCorrect = 0;
  e.preventDefault();  
  let nameValue = stName.value.trim();
  let phoneNumberValue = phoneNumber.value.trim();
  let x = e;

  //  CHECKING FOR NAME
  if (nameValue === ""){
    setErrorFor(stName, "Name can't be blank");
  } 

  else if (!isNaN(nameValue)){
    setErrorFor(stName, "Name can't include numbers")
  }

  else {
    howCorrect++;
    setSuccessFor(stName);
    subjectEl.style.borderColor = '#00B68C';
  }

  // CHECKING FOR PHONE NUMBER
  if (phoneNumberValue === "") {
    setErrorFor(phoneNumber, "Phone number can't be blank");
    
  }

  else if (!numberCheck(phoneNumberValue)) {
    setErrorFor(phoneNumber, "Enter a valid 10 digit Mobile Number");
    
  } 
  
  else {
    howCorrect++;
    setSuccessFor(phoneNumber);
    subjectEl.style.borderColor = '#00B68C';

  }

// // setSuccessFor(subjectEl);
  
// // IF ERROR THAN RUN THIS
function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "input error";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

// IF NO ERROR THAN RUN THIS
function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.className = "input success";
}

isAllFormCorrect();

function isAllFormCorrect(){

  if(howCorrect >= 2){
    console.log('ALL CORRECT');
    formAnswer = true;
  }

  else {
    console.log('NO CORRECT');
    formAnswer = false;
  }
}

let formPromise = new Promise((resolve, reject) => {
if(formAnswer == true){
  resolve('success');
}

else {
  reject('failed');  
}}
)

formPromise.then((message) => {
  console.log('FORM: '+ message);
  handleSubmit();
  async function handleSubmit() {
    var status = document.getElementById("my-form-status");
    var data = new FormData(x.target);
    fetch(x.target.action, {
      method: formEl.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      console.log('FORM DONE')
      formStatus.style.display = "block";
      formEl.classList.add('formSubmitted');
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    }).catch(error => {
      console.log('FORM!')
      // status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  formEl.addEventListener("submit", handleSubmit);

}).catch((message) => {
  console.log('FORM NOT SUCCED: ' + message)
})
});

// IS NUMBER 10 DIGIT
function numberCheck(str) {
    var pattern = new RegExp(/^[0-9]{10}$/g);
    return pattern.test(str);
  }


// // Animation 
// gsap.from(".hero-svg", {opacity  : 0, duration : .5, x : -35 , ease : "Power3.easeOut"});
// gsap.from(".text-content", {opacity  : 0, duration : 1, y : 35, delay : .5, stagger : 0.5, ease : "expo.easeOut"});
// gsap.from("form", {opacity  : 0, duration : 1, x : 30, delay : 1 , ease : "Power3.easeOut"});




// REVIEWS SLIDESHOW 
function initParadoxWay() {
 
    if ($(".testimonials-carousel").length > 0) {
        var j2 = new Swiper(".testimonials-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                
            }
        });
    }
    
  // bubbles -----------------
    
    setInterval(function () {
      let size = 0;
        // var size = randomValue(sArray);
        // randomValue(bArray) +
        $('.bubbles').append('<div class="individual-bubble" style="left: ' +  'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity': '-=0.7'
        }, 4000, function () {
            $(this).remove()
        });
    }, 350);
    
  }
  
  //   Init All ------------------
  $(document).ready(function () {
    initParadoxWay();
  });
  
  

  // SCROLL ON CLICK 
// let logo = document.querySelector("#header-logo");
// logo.addEventListener('click', (e) => {
// window.scrollTo(0,0);
// });


$(window).on("scroll", function() {
  if($(window).scrollTop() > 575) {
      $(".header").addClass("active");
  } else {
     $(".header").removeClass("active");
  }
});



// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st < lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}



// TYPING EFFECT
class TypeWriter {
    constructor(txtElement, words, wait = 500) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 8);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 250;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 300;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  

  


  // Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}



// GALLERY SHOW

let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();


// BTT BUTTON TOP 
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


document.querySelector('#top-nav-item').addEventListener('click', topFunction);


// MOBILE HEADER 
function openNav() {
  document.getElementById("mySideNav").style.width = "100%";
closeNavAuto();
  }
  
  function closeNav() {
  document.getElementById("mySideNav").style.width = "0";
  }



  // POPUP
  const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


function closeNavAuto(){
  let navs = document.querySelectorAll('.nav');
  for(let i = 0; i < navs.length; i++){
    navs[i].addEventListener('click', closeNav);
  }
}

closeNavAuto();