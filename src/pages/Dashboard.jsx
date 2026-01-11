import "./Dashboard.css";

import{
  FiBarChart2,
  FiBookOpen,
  FiEdit,
  FiLogOut,
  FiSettings,
  FiUsers
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

import AcademicInfo from "../components/Academicinfo";
import AddInfo from "../components/Addinfo";
import ReportsSection from "../components/Reports/ReportsSection";
import StudentList from "../components/Studentlist";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activePage, setActivePage] = useState("students");
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null); 

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const renderContent = () => {
    switch (activePage) {
      case "students":
        return <StudentList />;
      case "academic":
        return <AcademicInfo />;
      case "manage":
        return <AddInfo />;
      case "reports":
        return <ReportsSection />;
      default:
        return <h2>Dashboard</h2>;
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
  <div className="dashboard-layout">
    <div className="dashboard-shell">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="logo-box">SMS</h1>

        <nav className="menu">
         <button
                className={activePage === "students" ? "active" : ""}
                     onClick={() => setActivePage("students")}
                          >
                             <FiUsers className="menu-icon" />
            Student List
          </button>
          <button
  className={activePage === "academic" ? "active" : ""}
  onClick={() => setActivePage("academic")}
>
 <FiBookOpen className="menu-icon" />
            Academic Info
          </button>
         <button
  className={activePage === "manage" ? "active" : ""}
  onClick={() => setActivePage("manage")}
>
  <FiEdit className="menu-icon" />
            Add / Edit Students
          </button>
          <button
  className={activePage === "reports" ? "active" : ""}
  onClick={() => setActivePage("reports")}
>
    <FiBarChart2 className="menu-icon" />

            Reports
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="settings-btn">
            <FiSettings className="menu-icon" />
            Settings</button>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="menu-icon" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="main-content">
        
        {/* TOP BAR */}
        <header className="topbar">
          <div></div>

        <div className="profile" ref={profileRef}>
  <img
    src="https://i.pravatar.cc/40"
    alt="profile"
    className="profile-pic"
    onClick={() => setProfileOpen(!profileOpen)}
  />
  <span className="profile-name">HOD</span>

  {profileOpen && (
    <div className="profile-dropdown">
      <p><strong>Name:</strong> HOD</p>
      <p><strong>Role:</strong> Admin</p>
      <button>Edit Profile</button>
    </div>
  )}
</div>

        </header>

        {/* CONTENT */}
        <section className="content-area">
          {renderContent()}
        </section>

      </main>

    </div>
  </div>
);
}

export default Dashboard;