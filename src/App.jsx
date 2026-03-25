import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ContactPage from "./components/ContactPage";
import WhatsappPage from "./components/WhatsappPage";
import Blogs from "./components/Blogs";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <TopBar/>
    </div>
           
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Blogs" element={<Blogs/>}/>
        <Route path="/whatsappPage" element={<WhatsappPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




