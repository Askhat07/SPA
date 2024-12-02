// App.tsx
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
// import Support from "./pages/Support";
import VoiceCommand from "./pages/VoiceCommand";
// import ProtectedRoute from "./components/shared/ProtectedRoute";
// import WebSocketComponent from "./components/shared/WebSocketComponent";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      {/* <WebSocketComponent /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="/*" element={<NotFound />} />
        {/* <Route path="/support" element={<Support />} /> */}
        <Route path="/voice-command" element={<VoiceCommand onTranscriptionComplete={function (transcription: string): void {
          throw new Error("Function not implemented.");
        } } />} />
      </Routes>
    </main>
  );
}

export default App;

// // App.tsx
// import Header from "./components/Header";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Chat from "./pages/Chat";
// import NotFound from "./pages/NotFound";
// import { useAuth } from "./context/AuthContext";
// import Support from "./pages/Support";
// import ProtectedRoute from "./components/shared/ProtectedRoute";
// import WebSocketComponent from "./components/shared/WebSocketComponent";

// function App() {
//   const auth = useAuth();

//   return (
//     <main>
//       <Header />
//       <WebSocketComponent />{" "}
//       {/* Это нужно, если WebSocket должен быть глобально */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <ProtectedRoute path="/chat" element={<Chat />} />{" "}
//         {/* Защищенный маршрут */}
//         <Route path="/support" element={<Support />} />
//         <Route path="/*" element={<NotFound />} />
//       </Routes>
//     </main>
//   );
// }

// export default App;
