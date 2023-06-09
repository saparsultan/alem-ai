import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import ImageCreate from "./pages/ImageCreate";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/images" element={<ImageCreate />} />
      </Routes>
    </div>
  );
}
export default App;
