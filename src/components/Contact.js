import React, { useState } from 'react';


// Modal component to display the pop-up message
const Modal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Message Sent!</h2>
      <button onClick={onClose} className="modal-close-btn">Close</button>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to validate the form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name must contain only letters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert formData to URL-encoded string format
    const formBody = Object.keys(formData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
      .join('&');

    // Send form data to the backend using fetch
    fetch('https://localhost/PHP-BACKEND/contact_form.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Log the response from the PHP script

        // After successful submission, show success message and reset the form
        setIsModalOpen(true); // Open the modal
      })
      .catch(error => {
        console.error("Error:", error);
      })
      .finally(() => {
        // Ensure the form is reset after submission, regardless of success or failure
        setFormData({
          name: '',
          email: '',
          message: ''
        }); // Reset form data to clear inputs
        setErrors({}); // Clear any previous errors
      });
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="contact" className="contact-section">
      <div className="contact-info">
        <h2><strong>Contact Us!</strong> </h2>
        <p><b>At StyledByMO, We Respond to our Customers Quickly</b></p>
        <p><b><i>Please kindly put a correct email address so we can repond back immediately.</i></b></p>
        
      </div>

      {/* Form submission logic */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name"><b>Full Name</b></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email"><b>Email Address</b></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message"><b>Type Your Message Here</b></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <button type="submit">Send Message</button>
      </form>

      {/* Display the modal if form submission is successful */}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Contact;
