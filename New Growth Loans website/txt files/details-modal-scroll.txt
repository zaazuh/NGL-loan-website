// Get the modal element
var modal = document.querySelector('.details-modal');

// Function to calculate and set the position of the modal
function setModalPosition() {
  var scrollY = window.scrollY || window.pageYOffset; // Get the current scroll position
  var windowHeight = window.innerHeight; // Get the height of the window
  var modalHeight = modal.offsetHeight; // Get the height of the modal

  // Calculate the top position of the modal
  var topPosition = scrollY + (windowHeight / 2) - (modalHeight / 2);

  // Set the top position of the modal
  modal.style.top = topPosition + 'px';
}

// Event listener to reposition the modal when the window is scrolled or resized
window.addEventListener('scroll', setModalPosition);
window.addEventListener('resize', setModalPosition);
