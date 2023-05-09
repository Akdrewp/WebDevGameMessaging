import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function Register() {
    return (
        <Container fluid className="main-content">
            <Row>
                <Col className="flex-column">
                    <div className="user-form-container flex-grow">
                        <Form className="user-form border border-1 border-dark">
                            <p className="border-bottom border-2">Register</p>
                            <Form.Group className="mb-3" controlId="userNameInput">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="userNameInput">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="passwordInput">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;