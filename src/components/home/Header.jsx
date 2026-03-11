import { useContext, useState } from "react";
import { useNavigate } from "react-router";
//local inports
import { GlobalContext } from "../../context/GlobalState";
import { useAuthContext } from "../../Hooks/useAuthContext";
import useLogout from "../../Hooks/useLogout";
//icons
import { FaHistory, FaShoppingCart } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";

export const Header = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { setSearchTerm, cart } = useContext(GlobalContext);
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const hanldeLogout = async (event) => {
    event.preventDefault();
    const success = await logout();

    if (success) {
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className="header"
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <h2 className="logo">
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <GrTechnology /> Tech Gear
        </a>
      </h2>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
      />
      <p
        className="menuBar"
        onClick={(event) => {
          event.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <FaBars />
      </p>
      <div className={`hiddenMenus ${showMenu ? "showMenu" : ""}`}>
        {!user ? (
          <>
            <p
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </p>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </p>
          </>
        ) : (
          <>
            <p>
              <a href="/account" onClick={() => setShowMenu(false)}>
                <MdAccountCircle /> <b>Account</b>
              </a>
            </p>

            <p>
              <a
                onClick={() => {
                  navigate("/history");
                }}
                style={{ cursor: "pointer" }}
              >
                <FaHistory />
                <b>History</b>
              </a>
            </p>

            <p>
              <a
                onClick={() => {
                  navigate("/cart");
                }}
                style={{ cursor: "pointer" }}
              >
                <FaShoppingCart />
                <b>
                  {showMenu && "Cart"}{" "}
                  {cart.length === 0 ? "" : `(${cart.length})`}
                </b>
              </a>
            </p>

            <p>
              <a href="/logout" onClick={hanldeLogout}>
                <IoIosLogOut />
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
