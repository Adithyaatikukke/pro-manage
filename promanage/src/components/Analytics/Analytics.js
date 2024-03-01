import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from "./Analytics.module.css";
import codesandbox from '../../assets/images/codesandbox.png';
import layout from '../../assets/images/layout.png';
import database from '../../assets/images/database.png';
import settings from '../../assets/images/settings.png';
import logout from '../../assets/images/Logout.png';
import { getAllCounts } from "../../apis/count"; 

const Analytics = () => {
    const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [counts, setCounts] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDate: 0,
  });

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const fetchData = async () => {
    try {
      const countsData = await getAllCounts(); // Fetch counts data
      setCounts(countsData); // Update state with fetched counts
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

    
  const board=()=>{
    navigate('/dashboard');
  }
  const redirectToRegisterPage = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userName');
    // navigate('/register');
    setShowPopup(true);
  };
  const settingbutton=()=>{
    navigate('/setting');
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
  return (
    <div className={styles.container}>
    <div className={styles.left}>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={codesandbox} alt='' />
          <span className={styles.content}>Pro Manage</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={layout} alt='' />
          <span onClick={board} className={styles.contentone}>Board</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={database} alt='' />
          <span className={styles.contentone}>Analytics</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={settings} alt='' />
          <span onClick={settingbutton} className={styles.contentone}>Settings</span>
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
        <h2>Analytics</h2>
        <div className={styles.countscontainer}>
        <div className={styles.countlists}>
          <ul>
            <li>
              <span>Backlog Tasks</span>
              <span><b>{counts.backlog}</b></span>
            </li>
            <li>
              <span>To-do Tasks</span>
              <span><b>{counts.todo}</b></span>
            </li>
            <li>
              <span>In-Progress Tasks</span>
              <span><b>{counts.inProgress}</b></span>
            </li>
            <li>
              <span>Completed Tasks</span>
              <span><b>{counts.completed}</b></span>
            </li>
          </ul>
        </div>
        <div className={styles.countlists}>
          <ul>
            <li>
              <span>Low Priority</span>
              <span><b>{counts.completed}</b></span>
            </li>
            <li>
              <span>Moderate Priority</span>
              <span><b>{counts.moderatePriority}</b></span>
            </li>
            <li>
              <span>High Priority</span>
              <span><b>{counts.highPriority}</b></span>
            </li>
            <li>
              <span>Due Date Tasks</span>
              <span><b>{counts.dueDate}</b></span>
            </li>
          </ul>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default Analytics
