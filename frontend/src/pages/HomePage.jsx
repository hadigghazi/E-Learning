import React from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? <p>Hello, {user.name}!</p> : <p>Please log in or register.</p>}
    </div>
  );
};

export default HomePage;
