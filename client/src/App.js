import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from "./router/Home";
import About from "./router/About";
import Auth from "./router/Auth";
import Profile from "./router/Profile";
import Search from "./router/Search";
import BookInfo from "./router/BookInfo";
import ShoppingCart from './router/ShoppingCart';
import PageNotFound from './router/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="h-fit bg-gray-50 body-font font-poppins">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<BookInfo />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
