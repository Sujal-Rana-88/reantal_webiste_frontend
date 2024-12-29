import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = {
    name: event.target.name.value,
    email: event.target.email.value,
    message: event.target.message.value,
  };

  try {
    const response = await fetch('http://localhost:5000/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert('Message sent successfully!');
    } else {
      alert('There was an error sending your message.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message.');
  }
};

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen py-20">
        {/* Contact Us Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have questions, feedback, or need support, reach out and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form and Details */}
        <div className="w-full px-4 md:px-0 md:w-2/3 lg:w-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
            {/* Contact Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  name="message"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 mt-1 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>

            {/* Contact Information */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Get in Touch With Me</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Email: rsrohan787@gmail.com</p>
              <p className="text-gray-600 dark:text-gray-400">Phone: +91 90419 11113</p>
              <p className="text-gray-600 dark:text-gray-400">Address: 12 hno gali shruti de pichli side rohin de bed de nal</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
