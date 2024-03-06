import "./App.css";
// import OneSignal from "react-onesignal";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

function App() {
  // when user clicks this btn this event will run, request will be sent to backend ---> 1st step
  const runEvent = () => {
    const socket = io("http://localhost:3005", { transports: ["websocket"] });
    console.log("ran 1st");
    socket.emit("new_user_login", { message: "User has Logged In" });
  };

  // const runLocalEvent = () => {
  //   toast.info("This is a local event");
  // };

  // once page loads connect will set
  useEffect(() => {
    const socket = io("http://localhost:3005", { transports: ["websocket"] });

    // when connection is set this will be consoled
    socket.on("connection", () => {
      console.log("Connected to Socket io");
    });

    // getting the response from the backend -------> 3rd step
    socket.on("new_user_login", (data) => {
      toast.info(data.message);
    });
  }, []);
  return (
    <>
      <div className="App">
        <ToastContainer />
        <button onClick={() => runEvent()}>Click for real time events</button>
        {/* <button onClick={() => runLocalEvent()}>Click for local events</button> */}
      </div>
    </>
  );
}

export default App;
