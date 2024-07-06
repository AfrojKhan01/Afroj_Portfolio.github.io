var menu = document.querySelector(".menu-icon");
var navtext = document.querySelector(".nav-text");
var cross = document.querySelector(".cross");
var section = document.getElementById("section");
var progress = document.getElementById("progressbar");

let totalheight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
    let progressHeight = (window.pageYOffset / totalheight) * 100;
    progress.style.height = progressHeight + "%";
}

menu.addEventListener('click',function(){
    if (navtext.style.display === 'block') {
        navtext.style.display = 'none';
        menu.style.display = 'block';
        cross.style.display = 'none';
        section.style.visibility = 'visible';
    } else {
        navtext.style.display = 'block';
        menu.style.display = 'none';
        cross.style.display = 'block';
        section.style.visibility = 'hidden';
        }
})
cross.addEventListener('click',function(){
    if (navtext.style.display === 'block') {
        navtext.style.display = 'none';
        menu.style.display = 'block';
        cross.style.display = 'none';
        section.style.visibility = 'visible';
        } else {
        navtext.style.display = 'block';
        menu.style.display = 'none';
        cross.style.display = 'block';
        section.style.visibility = 'hidden';
    }
})


if (window.matchMedia("(max-width: 820px)").matches) {
    navtext.addEventListener('click', function(){
        if (navtext.style.display === 'block'){
            navtext.style.display = 'none';
            cross.style.display = 'none';
            menu.style.display = 'block';
            section.style.visibility = 'visible';
        } else {
            navtext.style.display = 'block';
            cross.style.display = 'block';
            menu.style.display = 'none';
            section.style.visibility = 'hidden';
        }
    })
}

const container = document.getElementById("container");
const Experiencebtn = document.getElementById("Experience");
const Educationbtn = document.getElementById("Education");

Experiencebtn.addEventListener("click", () => {
    container.classList.add("active");
});

Educationbtn.addEventListener("click", () => {
    container.classList.remove("active");
});

let Movetotop = document.querySelector(".Movetotop");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        Movetotop.classList.add("active");
    } else {
        Movetotop.classList.remove("active");
    }
})


window.onload = function() {
    const imageElements = document.querySelectorAll('.hoverImage');
    
    imageElements.forEach(imageElement => {
      const handleMouseMove = (e) => {
        let rect = imageElement.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
    
        let dx = (x - rect.width / 2) / (rect.width / 2);
        let dy = (y - rect.height / 2) / (rect.height / 2);
    
        imageElement.style.transform = `perspective(500px) rotateY(${dx * -20}deg) rotateX(${-dy * -20}deg)`;
      };
  
      const handleMouseLeave = () => {
        imageElement.style.transform = "";
      };
  
      imageElement.addEventListener('mousemove', handleMouseMove);
      imageElement.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  

  