import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import 'bootstrap/dist/css/bootstrap.min.css';

// const socketIO = io.connect("http://localhost:8080");

// socketIO.on("connect", () => {
//   console.log("Connected");
// });

// function sendMessage() {
//   socketIO.emit("send_message", { data: "Hello!"} );
// }

function MessageBox(props) {
    return (
        <div>
            <p>{props.children}</p>
        </div>
    );
}

export default MessageBox