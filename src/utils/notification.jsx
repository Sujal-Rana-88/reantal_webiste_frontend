export const showNotification = (setNotification, message, type) => {
  setNotification({ visible: true, message, type });

  // Automatically remove notification after 3 seconds
  setTimeout(() => {
    setNotification({ visible: false, message: "", type: "" });
  }, 3000);
};
