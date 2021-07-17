function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance' 
  ) {
    window.alert('You are not authorized to view this page');
    window.location.href = 'http://localhost:5000/';
  }
}
