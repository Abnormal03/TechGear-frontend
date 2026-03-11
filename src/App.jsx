import "./App.css";
import { Header } from "./components/home/Header";
import { GlobalProvider } from "./context/GlobalState";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";
import Histories from "./components/history/Histories";
import Account from "./components/account/Account";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./Hooks/useAuthContext";
import PageNotFound from "./pages/pageNotFound";

function App() {
  const { user } = useAuthContext();
  return (
    <GlobalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {!user ? (
          <>
            <Route path="/cart" element={<PageNotFound />} />
            <Route path="/history" element={<PageNotFound />} />
            <Route path="/account" element={<PageNotFound />} />
          </>
        ) : (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<Histories />} />
            <Route path="/account" element={<Account />} />
          </>
        )}

        {user ? (
          <>
            <Route path="/signup" element={<PageNotFound />} />
            <Route path="/login" element={<PageNotFound />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </GlobalProvider>
  );
}

export default App;
