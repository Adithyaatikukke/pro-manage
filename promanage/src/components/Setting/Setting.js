import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import styles from "./Setting.module.css";
import codesandbox from '../../assets/images/codesandbox.png';
import layout from '../../assets/images/layout.png';
import database from '../../assets/images/database.png';
import settings from '../../assets/images/settings.png';
import logout from '../../assets/images/Logout.png';

const Setting = () => {
    const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    confirmpassword: '',
    password: '',
  });
    const redirectToRegisterPage = () => {
      setShowPopup(true);
    };
    const analyticsbutton=()=>{
      navigate('/analytics');
    }
    const confirmLogout = () => {
      // Perform logout logic
      setShowPopup(false);
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/register');
    };
    const cancelLogout = () => {
      setShowPopup(false); // Close the logout modal
    };
    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
    
        switch (e.target.name) {
          case 'name':
            setUserName(e.target.value);
            break;
          case 'confirmpassword':
            setOldPassword(e.target.value);
            break;
          case 'password':
            setNewPassword(e.target.value);
            break;
          default:
            break;
        }
      };
      const togglePasswordVisibility = (field) => {
        if (field === 'password') {
          setShowPassword1(!showPassword1);
        } else if (field === 'confirmpassword') {
          setShowPassword2(!showPassword2);
        }
      };
        
      const handleUpdate = async () => {
        // Validate inputs (you can add more validation logic)
        if (!userName || !oldPassword || !newPassword) {
          setErrors({
            name: !userName ? 'Username is required' : '',
            confirmpassword: !oldPassword ? 'Old Password is required' : '',
            password: !newPassword ? 'New Password is required' : '',
          });
          return;
        }
      
        try {
          const token = localStorage.getItem('token');
      
          const response = await fetch('http://localhost:3000/api/v1/users/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              // Add any other required headers
            },
            body: JSON.stringify({
              userName,
              oldPassword,
              newPassword,
              token, // Include the token directly in the body
            }),
          });
      
          if (response.ok) {
            // Handle success, e.g., show a success message
            console.log('User information updated successfully');
          } else {
            // Handle error, e.g., show an error message
            console.error('Error updating user information');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || '');
      }, []);
  return (
    <div>
        <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={codesandbox} alt='' />
          <span className={styles.content}>Pro Manage</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={layout} alt='' />
          <span className={styles.contentone}>Board</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={database} alt='' />
          <span onClick={analyticsbutton} className={styles.contentone}>Analytics</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={settings} alt='' />
          <span className={styles.contentone}>Settings</span>
        </div>
        <div className={styles.footer}>
          <img className={styles.iconpromanage} src={logout} alt='' />
          <span onClick={redirectToRegisterPage} className={styles.contenttwo}>
            Log out
          </span>
        </div>
        <div className={styles.pop}>
                {showPopup && (
                <div className={styles.popup} aria-hidden={!showPopup}>
                  <p>Are you sure you want to log out</p>
                  <div className={styles.popupButtons}>
                    <button className={styles.but} onClick={confirmLogout}>Yes,  Logout</button>
                    <button className={styles.butone} onClick={cancelLogout}>Cancel</button>
                  </div>
                </div>
              )}
        </div>
        <span className={styles.verticalline}></span>
      </div>
      <div className={styles.right}>
        <h2>Settings</h2>
        <div className={styles.allinputs}>
        <div className={styles.inputbox}>
                <label htmlFor="name">
                  <div className={styles.iconcontainer}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="_Icon_1qq8c_105"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path>
                    </svg>
                  </div>
                </label>
                <input type="text" onChange={handleChange} value={userName} name="name" id="name" placeholder="name" />
                <span className={styles.errormessage}>{errors.name}</span>
              </div>
              <div className={styles.inputbox}>
                <label htmlFor="confirmpassword">
                  <div className={styles.iconcontainer}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="_Icon_1qq8c_105"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path>
                    </svg>
                  </div>
                </label>
                <input
                  type={showPassword2 ? 'text' : 'password'} 
                  onChange={handleChange}
                  value={oldPassword}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder=" Old Password"
                />
                <div className={styles.iconright} onClick={() => togglePasswordVisibility('confirmpassword')}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="_Icon_1qq8c_105"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                </div>
                <span className={styles.errormessage}>{errors.confirmpassword}</span>
              </div>
              <div className={styles.inputbox}>
                <label htmlFor="Password">
                  <div className={styles.iconcontainer}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="_Icon_1qq8c_105"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path>
                    </svg>
                  </div>
                </label>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  onChange={handleChange}
                  value={newPassword}
                  name="password"
                  id="password"
                  placeholder=" New Password"
                />
                <div className={styles.iconright} onClick={() => togglePasswordVisibility('password')}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="_Icon_1qq8c_105"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                    ></path>
                  </svg>
                </div>
                <span className={styles.errormessage}>{errors.password}</span>
              </div>
              <button  type="submit" className={styles.button}  onClick={handleUpdate}>
              Update
            </button>


        </div>

      </div>
      
    </div>
    </div>
  )
}

export default Setting
