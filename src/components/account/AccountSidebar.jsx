import React from "react";

//icons...
import { IoIosLogOut } from "react-icons/io";

const AccountSidebar = ({ logout }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logout(event);
  };
  return (
    <div className="sideBar">
      <ul className="sidebar-list" style={{ listStyleType: "none" }}>
        {/* <li>
          <a href="">Account Info</a>
        </li> */}
        <li>
          <a href="">My Products</a>
        </li>
        <li>
          <a href="/logout" onClick={handleLogout}>
            <IoIosLogOut />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
