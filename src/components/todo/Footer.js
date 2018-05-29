import React from 'react';
import {Link} from '../router';

export const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">All</Link>
      <Link to="/Active">Active</Link>
      <Link to="/Complete">Complete</Link>
    </div>
  )
}