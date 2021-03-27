// FORM Validation

// const { Console } = require("node:console");

// Dom elements
let formEl = document.querySelector("form");
let stName = document.querySelector("#name");
let phoneNumber = document.querySelector("#phoneNumber");
let subjectEl = document.querySelector("select");
let submitBtn = document.querySelector("#book-btn");


function ifAllInputCorrect() {
  if(phoneNumber.parentElement.classList.contains('success') && stName.parentElement.classList.contains('success')){
    handleSubmit();
  }
}


// Event listener to submit form
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  handleInput();
});

// What to do with inputs ?
function handleInput() {
  // Values from dom elements ( input )
  let nameValue = stName.value.trim();
  let phoneNumberValue = phoneNumber.value.trim();

  //  Checking for name
  if (nameValue === ""){
    setErrorFor(stName, "Name can't be blank");
  } 
  
  else if (!isNaN(nameValue)){
    setErrorFor(stName, "Name can't include numbers")
  }

  else {
    setSuccessFor(stName);
    ifAllInputCorrect();

  }

  // Checking for email
  if (phoneNumberValue === "") {
    setErrorFor(phoneNumber, "Phone number can't be blank");
  }
  else if (!numberCheck(phoneNumberValue)) {
    setErrorFor(phoneNumber, "Enter a valid 10 digit Mobile Number");
  } else {
    setSuccessFor(phoneNumber);
    ifAllInputCorrect();

  }

setSuccessFor(subjectEl);
  

  

// If there is some error, than what we want to do with input ?
function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "input error";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

// If there is no error, than what we want to do with input ?
function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.className = "input success";
}

}

function numberCheck(str) {
    var pattern = new RegExp(/^[0-9]{10}$/g);
    return pattern.test(str);
  }


// FORM STYLING 
stName.addEventListener('mouseDown', (e) => {
    if(e){
    stName.style.border = "none";
    stName.style.borderBottom = "1px solid #673DE6";
    stName.style.borderRadius = "0px";
}

else {
    stName.style.border = "1px solid";
    stName.style.borderBottom = "1px solid #673DE6";
    stName.style.borderRadius = " ";
}
})

// FORM SUBMISSION
var form = document.querySelector("form");
    
async function handleSubmit() {
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thanks for your submission!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}

// form.addEventListener("submit", handleSubmit)



// Animation 
gsap.from(".svg-hero", {opacity  : 0, duration : .5, x : -35 , ease : "Power3.easeOut"});
gsap.from(".text-content", {opacity  : 0, duration : 1, y : 35, delay : .5, stagger : 0.5, ease : "expo.easeOut"});
gsap.from("form", {opacity  : 0, duration : 1, x : 30, delay : 1 , ease : "Power3.easeOut"});


// Subjects animation
// gsap.from('.subject', {scrollTrigger: ".courses-subjects", opacity : 0, duration : .5 ,x : 20, stagger :  0.5})

// REVIEWS SLIDESHOW 
$(document).ready(function () {
  $('.testiSlide').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      responsive: [{
      breakpoint: 850,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      }
      }]
  });
});


// SCROLL ON CLICK 
let logo = document.querySelector("#header-logo");
logo.addEventListener('click', (e) => {
window.scrollTo(0,0);
});


$(window).on("scroll", function() {
  if($(window).scrollTop() > 575) {
      $("header").addClass("active");
      // console.log(window.scrollY);
  } else {
      //remove the background property so it comes transparent again (defined in your css)
     $("header").removeClass("active");
  }
});


$(window).on("scroll", function() {
  if($(window).scrollTop() > 575) {
      $("header").addClass("active");
      // console.log(window.scrollY);
  } else {
      //remove the background property so it comes transparent again (defined in your css)
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
// ES6 Class
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
var mybutton = document.getElementById("btt");

        function topFunction() {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }




// CHECK
/*!
 * Determine if an element is in the viewport
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */

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

  else {
    console.log('Nope...');
  }
}, false);



// ANIMATE SUBJECTS US ON VISIBLE 
function animateSubjects(){
  let animationTurn = 0;
  if(animationTurn !== 1){
    gsap.from(".section-topic", {duration : 2, opacity : 0})
    // abs-logo-animation
  // animationTurn = 1;
  }
}

// ANIMATE ABOUT US ON VISIBLE 
let aboutUs = document.querySelector('.about-us');

function animateAboutUs(){
  let animationTurn = 0;
  if(animationTurn !== 1){
	let asPic = document.querySelector('.as-pic');
  let absLogo = document.querySelector('#abs-logo');
  asPic.classList.add("as-pic-animation");
  absLogo.classList.add("abs-logo-animation");
  
  // abs-logo-animation
  animationTurn = 1;
  }
}


// MOBILE HEADER 
let headerRightIcon = document.querySelector("#header-right-icon");
let mobileHeaderWrap = document.querySelector('.mobile-navigation-wrap');
headerRightIcon.addEventListener('click', changeHeaderNav);

function changeHeaderNav(){
  headerRightIcon.classList.toggle('fa-times');
  document.querySelector('.mobile-navigation-wrap').classList.toggle('on');


  if(mobileHeaderWrap.classList.contains("on")){
    mobileHeaderWrap.style.display = 'block';
    mobileHeaderWrap.classList.remove('bye');
    mobileHeaderWrap.classList.add('hi');

    // return;
  }
  
  else {
    mobileHeaderWrap.style.display = 'none';
    mobileHeaderWrap.classList.remove('hi');
    mobileHeaderWrap.classList.add('bye');

  }
  }



  