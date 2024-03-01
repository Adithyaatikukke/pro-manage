import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router';
import styles from "./Dashboard.module.css";
import codesandbox from '../../assets/images/codesandbox.png';
import layout from '../../assets/images/layout.png';
import database from '../../assets/images/database.png';
import settings from '../../assets/images/settings.png';
import logout from '../../assets/images/Logout.png';
import Group from '../../assets/images/Group.png'
const Dashboard = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
    

  const redirectToRegisterPage = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userName');
    // navigate('/register');
    setShowPopup(true);
  };
  const settingbutton=()=>{
    navigate('/setting');
  }
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

  const formatDate = (dateString) => {
    const day = new Date(dateString).getDate();
    const month = new Date(dateString).toLocaleDateString('en-US', { month: 'short' });
    const year = new Date(dateString).getFullYear();
  
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  };
  
  

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || '');
  }, []);

  useEffect(() => {
    const yourFetchedDate = new Date();
    setCurrentDate(yourFetchedDate);
  }, []);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
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
          <span className={styles.contentone}>Board</span>
        </div>
        <div className={styles.header}>
          <img className={styles.iconpromanage} src={database} alt='' />
          <span onClick={analyticsbutton} className={styles.contentone}>Analytics</span>
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
        <div className={styles.upperright}>
          <div className={styles.upperleftside}>
            <h2 className={styles.heads}> Welcome!{userName}</h2>
            <h2 className={styles.board}>Board</h2>
            
          </div>
          <div className={styles.upperrightside}>
            <p className={styles.date}>{formatDate(currentDate)}</p>
            <p className={styles.week}>
              This week
              <span className={styles.down} onClick={toggleOptions}>&gt;</span>
              {showOptions && (
          <div className={styles.options} ref={dropdownRef}>
            <span  className={styles.list} onClick={() => console.log('Today')}>Today</span>
            <span className={styles.listtwo} onClick={() => console.log('This Week')}>This Week</span>
            <span className={styles.listlast} onClick={() => console.log('This Month')}>This Month</span>
          </div>
        )}
            </p>
          </div>
        </div>
        <div className={styles.lowerright}>
          <div className={styles.boxone}>
            <div className={styles.headbox}>
                <h5>Backlog</h5>
                <img src={Group} alt='group'/>
            </div>

          </div>
          <div className={styles.boxone}>
          <div className={styles.headbox}>
                <h5>To do</h5>
                <img src={Group} alt='Group'/>
            </div>
            
            </div>
            <div className={styles.boxone}>
            <div className={styles.headbox}>
                <h5>In progress</h5>
                <img src={Group} alt='group'/>
            </div>
            
            </div>
            <div className={styles.boxone}>
            <div className={styles.headbox}>
                <h5>Done</h5>
                
            </div>
            
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

