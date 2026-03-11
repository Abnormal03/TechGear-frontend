import { Outlet, useNavigate } from "react-router";
import "./Account.css";

//local imports...
import AccountSidebar from "./AccountSidebar.jsx";
import useLogout from "../../Hooks/useLogout.jsx";
import Myproducts from "./Myproducts.jsx";

const Account = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };
  return (
    <div className="account">
      <AccountSidebar logout={handleLogout} />
      <div>
        <Myproducts />
      </div>
      <Outlet />
    </div>
  );
};

export default Account;
