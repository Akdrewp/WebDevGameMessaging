import MessageBox from '../Components/Messaging/MessageBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function ChatPage() {
    return (
        <Container fluid className="main-content">
            <Row>
            <Col>
                <div>
                <p>I am a chat selector</p>
                </div>
            </Col>
            <Col sm="8" className="flex-column">
                    <Container className="border border-2 flex-grow message-box flex-column">
                        <div className="message-view">
                            <MessageBox check={"date"}>
                                Some Message
                            </MessageBox>
                        </div>
                        <div className="message-input">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Message..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className="shadow-none"
                                />
                                <Button variant="outline-secondary" id="button-addon2">Send</Button>
                            </InputGroup>
                        </div>
                    </Container>
            </Col>
            </Row>
        </Container>
    );
}

export default ChatPage