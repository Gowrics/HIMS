import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Your Name" required />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="Your Email" required />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea className="w-full px-4 py-2 border rounded-lg" rows="4" placeholder="Your Message" required></textarea>
        </div>
        <button className="btn btn-primary">
          Send Message
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">Phone: +1 234 567 890</p>
        <p className="text-gray-700">Email: contact@example.com</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-blue-600">Facebook</a>
          <a href="#" className="text-blue-600">Twitter</a>
          <a href="#" className="text-blue-600">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};





export default Contact;
