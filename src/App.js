import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import ImageCreate from "./pages/ImageCreate";
import Policy from "./pages/Policy";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/images" element={<ImageCreate />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
