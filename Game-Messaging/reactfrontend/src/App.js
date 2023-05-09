import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import { Routes, Route } from "react-router-dom";



// const socketIO = io.connect("http://localhost:8080");

// socketIO.on("connect", () => {
//   console.log("Connected");
// });

// function sendMessage() {
//   socketIO.emit("send_message", { data: "Hello!"} );
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1 className="border-bottom border-2">Chess web and messaging App</h1>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/messages" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
