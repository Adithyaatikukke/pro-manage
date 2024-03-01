import React, { useState } from 'react';
import styles from './Register.module.css';
import Art from '../../assets/images/Art.png';
import { useNavigate } from 'react-router';
import { registerUser } from '../../apis/auth';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [data, setData] = useState({
    name: '',
    confirmpassword: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    confirmpassword: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword1(!showPassword1);
    } else if (field === 'confirmpassword') {
      setShowPassword2(!showPassword2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = {};
    if (!data.name) formErrors.name = 'Field is required';
    if (!data.email) formErrors.email = 'Field is required';
    if (!data.password) formErrors.password = 'Field is required';
    if (!data.confirmpassword) formErrors.confirmpassword = 'Field is required';
    if (data.password !== data.confirmpassword) formErrors.confirmpassword = 'Passwords do not match';

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const response = await registerUser({ ...data });

    if (response) {
      localStorage.setItem('token', JSON.stringify(response.token));
      localStorage.setItem('userName', response.name);
      redirectToLoginPage();
    }
  };

  const redirectToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftside}>
        <div className={styles.box}>
          <div className={styles.imgcontainer}>
            <div className={styles.circle}> </div>
            <img className={styles.art} src={Art} alt='' />
          </div>
          <div className={styles.message}>
            <h2>Welcome aboard my friend</h2>
            <h4>just a couple of clicks and we start</h4>
          </div>
        </div>
      </div>
      <div className={styles.rightside}>
        <form className={styles.form}>
          <div className={styles.inputform}>
            <h3>Register</h3>
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
                <input type="text" onChange={handleChange} value={data.name} name="name" id="name" placeholder="name" />
                <span className={styles.errormessage}>{errors.name}</span>
              </div>
              <div className={styles.inputbox}>
                <label htmlFor="email">
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
                      <path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 0 1-1.75 1.75H1.75A1.75 1.75 0 0 1 0 18.75v-14C0 3.784.784 3 1.75 3ZM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0Zm0-2.662v.852l10.36 7a.25.25 0 0 0 .28 0l10.36-7V4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"></path>
                    </svg>
                  </div>
                </label>
                <input type="email" onChange={handleChange} value={data.email} name="email" id="email" placeholder="email" />
                <span className={styles.errormessage}>{errors.email}</span>
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
                  value={data.confirmpassword}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Confirm Password"
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
                  value={data.password}
                  name="password"
                  id="password"
                  placeholder="Password"
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
            </div>
          </div>
          <div className={styles.buttonelements}>
            <button onClick={handleSubmit} type="submit" className={styles.button}>
              Register
            </button>
            <p className={styles.question}>Have an account ?</p>
            <button onClick={redirectToLoginPage} type="reset" className={styles.buttonlogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
