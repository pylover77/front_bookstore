import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserIcon.module.css";

const UserIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!token) {
    return null; // Retorna nulo se o usuário não estiver logado
  }

  return (
    <div className={styles.userIcon}>
      <FontAwesomeIcon icon={faUser} onClick={toggleDropdown} />
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
