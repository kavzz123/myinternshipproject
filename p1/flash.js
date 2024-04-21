
const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Example: Toggle selected state on button click
    button.classList.toggle('selected');
    // You can add more logic here based on your requirements
  });
});