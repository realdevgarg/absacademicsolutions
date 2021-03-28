let formEl = document.querySelector("form");
let stName = document.querySelector("#name");
let phoneNumber = document.querySelector("#phoneNumber");
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
  }

setSuccessFor(subjectEl);
  
// IF ERROR THAN RUN THIS
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




// Animation 
gsap.from(".hero-svg", {opacity  : 0, duration : .5, x : -35 , ease : "Power3.easeOut"});
gsap.from(".text-content", {opacity  : 0, duration : 1, y : 35, delay : .5, stagger : 0.5, ease : "expo.easeOut"});
gsap.from("form", {opacity  : 0, duration : 1, x : 30, delay : 1 , ease : "Power3.easeOut"});


// REVIEWS SLIDESHOW 
function initParadoxWay() {
  "use strict";
 
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
let logo = document.querySelector("#header-logo");
logo.addEventListener('click', (e) => {
window.scrollTo(0,0);
});


$(window).on("scroll", function() {
  if($(window).scrollTop() > 575) {
      $("header").addClass("active");
  } else {
     $("header").removeClass("active");
  }
});


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

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
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
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
var slideIndex,slides,dots,captionText;
function initGallery(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;

    captionText=document.querySelector(".captionTextHolder .captionText");
    captionText.innerText=slides[slideIndex].querySelector(".captionText").innerText;

    //disable nextPrevBtn if slide count is one
    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    //add dots
    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    var slideTextAnimClass;
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        slideTextAnimClass="slideTextFromTop";
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
        slideTextAnimClass="slideTextFromBottom";
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;
        captionText.style.display="none";
        captionText.className="captionText "+slideTextAnimClass;
        captionText.innerText=slides[n].querySelector(".captionText").innerText;
        captionText.style.display="block";
    }

}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },3000);
}
setTimer();
function playPauseSlides() {
    var playPauseBtn=document.getElementById("playPause");
    if(timer==null){
        setTimer();
        playPauseBtn.style.backgroundPositionY="0px"
    }else{
        clearInterval(timer);
        timer=null;
        playPauseBtn.style.backgroundPositionY="-33px"
    }
}


// BTT BUTTON TOP 

        function topFunction() {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }


var isInViewport = function (elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

var aboutWrap = document.querySelector('#find-me');


window.addEventListener('scroll', function (event) {
	if (isInViewport(aboutWrap)) {
  animateAboutUs();
  } 
}, false);



// ANIMATE ABOUT US ON VISIBLE 
let aboutUs = document.querySelector('.about-us');

function animateAboutUs(){
  let animationTurn = 0;
  if(animationTurn !== 1){
	let asPic = document.querySelector('.as-pic');
  let absLogo = document.querySelector('#abs-logo');
  asPic.classList.add("as-pic-animation");
  absLogo.classList.add("abs-logo-animation");
  animationTurn = 1;
  }
}


// MOBILE HEADER 
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}