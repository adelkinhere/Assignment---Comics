// Navigation script
// Handles showing and hiding content sections based on navigation link clicks
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar a');
  const contentSections = document.querySelectorAll('.content');

  function showSection(sectionId) {
      contentSections.forEach(section => {
          section.style.display = 'none';
      });
      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
          selectedSection.style.display = 'block';
      }
  }

  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const sectionId = this.getAttribute('href').substring(1);
          showSection(sectionId);
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          this.classList.add('active');
      });
  });

  showSection('home');
  navLinks[0].classList.add('active');
});

 

// Mobile navigation toggle function
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "navbar") {
      x.className += " responsive";
  } else {
      x.className = "navbar";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial slideshow elements
  const initialSlideshow = document.getElementById('initialSlideshow');
  const initialSlides = initialSlideshow.querySelectorAll('.slide');
  const initialPrev = document.getElementById('initialPrev');
  const initialNext = document.getElementById('initialNext');
  
  // Choice screen
  const choiceScreen = document.getElementById('choiceScreen');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const choiceBackBtn = document.getElementById('choiceBackBtn');
  
  // Yes path slideshow
  const yesSlideshow = document.getElementById('yesSlideshow');
  const yesSlides = yesSlideshow.querySelectorAll('.slide');
  const yesPrev = document.getElementById('yesPrev');
  const yesNext = document.getElementById('yesNext');
  const yesRestart = document.getElementById('yesRestart');
  
  // No path slideshow
  const noSlideshow = document.getElementById('noSlideshow');
  const noSlides = noSlideshow.querySelectorAll('.slide');
  const noPrev = document.getElementById('noPrev');
  const noNext = document.getElementById('noNext');
  const noRestart = document.getElementById('noRestart');
  
  // Initial slideshow index
  let currentIndex = 0;
  let yesIndex = 0;
  let noIndex = 0;
  
  // Initial slideshow navigation
  function showSlide(index, slides) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }
  
  // Update navigation buttons visibility
  function updateButtonVisibility() {
      // Initial slideshow buttons
      if (initialSlideshow.style.display !== 'none' && getComputedStyle(initialSlideshow).display !== 'none') {
          // Hide prev button on first slide
          initialPrev.style.display = currentIndex === 0 ? 'none' : 'flex';
      }
      
      // Yes slideshow buttons
      if (yesSlideshow.style.display === 'block' || getComputedStyle(yesSlideshow).display === 'block') {
          // Show restart button instead of next on last slide
          const isLastSlide = yesIndex === yesSlides.length - 1;
          yesNext.style.display = isLastSlide ? 'none' : 'flex';
          yesRestart.style.display = isLastSlide ? 'flex' : 'none';
      }
      
      // No slideshow buttons
      if (noSlideshow.style.display === 'block' || getComputedStyle(noSlideshow).display === 'block') {
          // Show restart button instead of next on last slide
          const isLastSlide = noIndex === noSlides.length - 1;
          noNext.style.display = isLastSlide ? 'none' : 'flex';
          noRestart.style.display = isLastSlide ? 'flex' : 'none';
      }
  }
  
  // Global function for navigation
  window.plusSlides = function(n) {
      // Determine which slideshow is currently visible
      if (initialSlideshow.style.display !== 'none' && getComputedStyle(initialSlideshow).display !== 'none') {
          if (n < 0) {
              // Previous button functionality
              if (currentIndex > 0) {
                  currentIndex--;
                  showSlide(currentIndex, initialSlides);
              }
          } else {
              // Next button functionality
              if (currentIndex < initialSlides.length - 1) {
                  currentIndex++;
                  showSlide(currentIndex, initialSlides);
              } else {
                  // Show choice screen when reaching the end
                  initialSlideshow.style.display = 'none';
                  choiceScreen.style.display = 'block';
              }
          }
      } else if (yesSlideshow.style.display === 'block' || getComputedStyle(yesSlideshow).display === 'block') {
          if (n < 0) {
              if (yesIndex > 0) {
                  // If not on first slide, go to previous slide
                  yesIndex--;
                  showSlide(yesIndex, yesSlides);
              } else {
                  // If on first slide, go back to choice screen
                  yesSlideshow.style.display = 'none';
                  choiceScreen.style.display = 'block';
              }
          } else {
              if (yesIndex < yesSlides.length - 1) {
                  yesIndex++;
                  showSlide(yesIndex, yesSlides);
              }
          }
      } else if (noSlideshow.style.display === 'block' || getComputedStyle(noSlideshow).display === 'block') {
          if (n < 0) {
              if (noIndex > 0) {
                  // If not on first slide, go to previous slide
                  noIndex--;
                  showSlide(noIndex, noSlides);
              } else {
                  // If on first slide, go back to choice screen
                  noSlideshow.style.display = 'none';
                  choiceScreen.style.display = 'block';
              }
          } else {
              if (noIndex < noSlides.length - 1) {
                  noIndex++;
                  showSlide(noIndex, noSlides);
              }
          }
      }
      
      // Update button visibility after changing slides
      updateButtonVisibility();
  };
  
  // Restart function
  window.restartStory = function() {
      // Hide current slideshow
      yesSlideshow.style.display = 'none';
      noSlideshow.style.display = 'none';
      
      // Show initial slideshow
      initialSlideshow.style.display = 'block';
      
      // Reset all indices
      currentIndex = 0;
      yesIndex = 0;
      noIndex = 0;
      
      // Show first slide of initial slideshow
      showSlide(currentIndex, initialSlides);
      
      // Update button visibility
      updateButtonVisibility();
  };
  
  // Back button from choice screen to initial slideshow
  choiceBackBtn.addEventListener('click', function() {
      choiceScreen.style.display = 'none';
      initialSlideshow.style.display = 'block';
  });
  
  // Yes choice button
  yesBtn.addEventListener('click', function() {
      choiceScreen.style.display = 'none';
      yesSlideshow.style.display = 'block';
      yesIndex = 0; // Reset to first slide
      showSlide(yesIndex, yesSlides);
      updateButtonVisibility();
  });
  
  // No choice button
  noBtn.addEventListener('click', function() {
      choiceScreen.style.display = 'none';
      noSlideshow.style.display = 'block';
      noIndex = 0; // Reset to first slide
      showSlide(noIndex, noSlides);
      updateButtonVisibility();
  });
  
  // Initialize the first slide and button visibility
  showSlide(currentIndex, initialSlides);
  updateButtonVisibility();
});

document.getElementById("Hive").addEventListener("click", function() {
    console.log("SVG clicked");
    
    const containerElement = document.getElementById("container");
    const hiddenImagesElement = document.getElementById("hidden-images");
    
    if (containerElement && hiddenImagesElement) {
        containerElement.style.display = "none";
        hiddenImagesElement.style.display = "block";
    } else {
        console.error("Could not find container or hidden-images elements");
    }
});



ocument.addEventListener('DOMContentLoaded', function() {
    const teamSection = document.querySelector('.team-members');
    const flyingBees = document.querySelectorAll('.flying-bee');
    const teamMembers = document.querySelectorAll('.team-member');
    const profileImages = document.querySelectorAll('.profile');
    const teamMemberInfos = document.querySelectorAll('.team-member-info');
    
    // initial positions for bees (off-screen)
    const beePositions = [
      { top: '10%', left: '-10%' },  
      { top: '-10%', left: '30%' },  
      { top: '110%', left: '70%' },  
      { top: '50%', left: '110%' }   
    ];
    
    // setting initial positions
    flyingBees.forEach((bee, index) => {
      bee.style.position = 'absolute';
      bee.style.top = beePositions[index].top;
      bee.style.left = beePositions[index].left;
    });
  
    function updateBeePositions() {
      const scrollProgress = Math.min(1, window.scrollY / (teamSection.offsetTop + teamSection.offsetHeight - window.innerHeight));
  
      flyingBees.forEach((bee, index) => {
        const memberRect = teamMembers[index].getBoundingClientRect();
        const teamRect = teamSection.getBoundingClientRect();
  
        // final positions relative to team section
        const finalTop = ((memberRect.top - teamRect.top) + (memberRect.height / 2) - (bee.offsetHeight / 2));
        const finalLeft = ((memberRect.left - teamRect.left) + (memberRect.width / 2) - (bee.offsetWidth / 2));
  
        // interpolating between start and final positions
        const startTop = parseFloat(beePositions[index].top);
        const startLeft = parseFloat(beePositions[index].left);
  
        const newTop = startTop + (finalTop - startTop) * scrollProgress;
        const newLeft = startLeft + (finalLeft - startLeft) * scrollProgress;
  
        bee.style.top = newTop + 'px';
        bee.style.left = newLeft + 'px';
        bee.style.transform = `rotate(${(1 - scrollProgress) * 20 - 10}deg)`;
  
        // showing the profile image and info when the bee is at its final position
        if (scrollProgress === 1) {
          setTimeout(() => {
            bee.style.opacity = '0'; // fading out bee
            profileImages[index].classList.add('visible'); // showing profile picture
            teamMemberInfos[index].classList.add('visible'); // showing info
          }, 300);
        } else {
          bee.style.opacity = '1'; // keeping bees visible until they finish moving
          profileImages[index].classList.remove('visible'); // hiding profiles when scrolling up
          teamMemberInfos[index].classList.remove('visible'); // hiding info when scrolling up
        }
      });
    }
  
    window.addEventListener('scroll', updateBeePositions);
    updateBeePositions(); // updating positions immediately in case the section is already in view
  });