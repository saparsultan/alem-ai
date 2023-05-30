import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/Chat";
// import ImageGenerate from "./pages/ImageGenerate";
import ImageCreate from "./pages/ImageCreate";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" exact element={<Chat />} />
        {/*<Route path="/images" exact element={<ImageGenerate />} />*/}
        <Route path="/images" exact element={<ImageCreate />} />
      </Routes>
    </div>
  );
}

export default App;
