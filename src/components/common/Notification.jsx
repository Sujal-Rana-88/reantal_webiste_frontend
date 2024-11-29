import React from "react";

const Notification = ({ notification, closeNotification }) => {
  if (!notification.visible) return null;

  const notificationClass =
    notification.type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${notificationClass} fixed top-4 right-4 p-4 rounded-md text-white z-50`}
    >
      <div className="flex justify-between items-center">
        <p>{notification.message}</p>
        <button
          onClick={closeNotification}
          className="text-lg font-bold ml-4"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
