import React from 'react';

const RegisterNav = ({ selected }) => (
  <nav className="register-nav">
    <ul>
      <li
        id="nav-1"
        className={ selected == 1 && 'active' }
      >1</li>
      <li
        id="nav-2"
        className={ selected == 2 && 'active' }
      >2</li>
      <li
        id="nav-3"
        className={ selected == 3 && 'active' }
      >3</li>
      <li
        id="nav-4"
        className={ selected == 4 && 'active' }
      >4</li>
    </ul>
  </nav>
);

export default RegisterNav;
