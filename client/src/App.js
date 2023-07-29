import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDateOfBirth = (dateOfBirth) => {
    const today = new Date();
    const selectedDate = new Date(dateOfBirth);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < selectedDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.firstName.match(/^[A-Za-z]+$/)) {
      validationErrors.firstName = 'First name must contain alphabets only';
    }

    if (!formData.lastName.match(/^[A-Za-z]+$/)) {
      validationErrors.lastName = 'Last name must contain alphabets only';
    }

    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.country) {
      validationErrors.country = 'Country is required';
    }

    if (!formData.state) {
      validationErrors.state = 'State is required';
    }

    if (!formData.city) {
      validationErrors.city = 'City is required';
    }

    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (!formData.dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = validateDateOfBirth(formData.dateOfBirth);
      if (age < 14) {
        validationErrors.dateOfBirth = 'You must be older than 14 years';
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('User registered successfully');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        alert('Error occurred while registering user');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select a state</option>
          </select>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Select a city</option>
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
            />{' '}
            Other
          </label>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default App;