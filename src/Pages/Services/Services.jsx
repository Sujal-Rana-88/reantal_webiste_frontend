import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen py-20">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform offers an easy way for gamers to rent and lend games, creating a seamless and affordable gaming experience for everyone.
          </p>
        </div>

        {/* Rent a Game Section */}
        <div className="mt-12 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Rent a Game</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Renting a game has never been easier. Simply browse through a wide selection of games, choose the one you want, and rent it for a period that suits you. Whether you're looking for the latest titles or classic favorites, we’ve got you covered.
          </p>
          <ul className="mt-4 text-gray-600 dark:text-gray-400">
            <li>- Browse a large collection of games</li>
            <li>- Choose the rental period</li>
            <li>- Enjoy secure and easy transactions</li>
            <li>- Get games delivered directly to your account</li>
          </ul>
        </div>

        {/* Lend a Game Section */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Lend a Game</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a game you're not playing anymore? Lend it to others and earn from it! Set your own rental price and availability, and allow others to enjoy your game while you make some extra money.
          </p>
          <ul className="mt-4 text-gray-600 dark:text-gray-400">
            <li>- Set your rental price and period</li>
            <li>- Let others rent your games in a secure environment</li>
            <li>- Receive payment through a seamless system</li>
            <li>- Track your lending history easily</li>
          </ul>
        </div>

        {/* Secure Transactions Section */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Secure Transactions</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            We ensure that all rentals and lending activities are safe and secure. With our built-in payment gateway, both renters and lenders are protected throughout the process, giving you peace of mind.
          </p>
          <ul className="mt-4 text-gray-600 dark:text-gray-400">
            <li>- Secure payment processing</li>
            <li>- User protection for both renters and lenders</li>
            <li>- Easy return policies and dispute resolution</li>
          </ul>
        </div>

        {/* Subscription Plans (Optional) */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Subscription Plans</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Our subscription plans give you unlimited access to rent games at affordable rates. Whether you're a casual gamer or a hardcore player, there's a plan that suits your needs.
          </p>
          <ul className="mt-4 text-gray-600 dark:text-gray-400">
            <li>- Unlimited rentals with monthly or yearly subscriptions</li>
            <li>- Access to exclusive deals and discounts</li>
            <li>- Prioritized customer support</li>
          </ul>
        </div>

        {/* Game Categories Section */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Game Categories</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Our platform offers games across various genres, ensuring there’s something for everyone. Whether you're into action-packed adventures, sports, or strategy games, you’ll find the perfect match here.
          </p>
          <ul className="mt-4 text-gray-600 dark:text-gray-400">
            <li>- Action & Adventure</li>
            <li>- Puzzle & Strategy</li>
            <li>- Sports & Racing</li>
            <li>- RPG & Fantasy</li>
          </ul>
        </div>

        {/* User Ratings & Reviews Section */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">User Ratings & Reviews</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To help you make better decisions, we offer ratings and reviews from other gamers. Check out what others think about a game before you rent it or lend your own games for others to enjoy.
          </p>
        </div>

        {/* Customer Support Section */}
        <div className="mt-16 w-full px-4 md:px-0 md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Customer Support</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            If you have any issues with renting or lending games, our dedicated customer support team is here to assist you. We’re committed to ensuring a smooth experience for all users.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
