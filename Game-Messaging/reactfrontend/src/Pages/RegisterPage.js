import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

function RegisterPage() {
    const [ serverResponseErrors, setResponseErrors ] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log(serverResponseErrors)
    }, [serverResponseErrors])

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        // shouldUseNativeValidation: true,
    });

    const onSubmit = async (data) => {
        console.log(JSON.stringify(data))
        var serverResponse =  await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
        .catch(error => {
            console.log(error);
        });

        var responseStatus = serverResponse.status
        serverResponse = await serverResponse.json();

        console.log(serverResponse.error);

        if (responseStatus === 409) {
            var updatedErrors = {
                email: "",
                username: "",
                password: "",
            }
            serverResponse.error.forEach(element => {
                serverResponse.error.forEach(element => {
                    var [key, value] = Object.entries(element)[0];
                    updatedErrors[key] = value;
                  });
            });
            setResponseErrors(prevErrors => ({
                ...prevErrors,
                ...updatedErrors
            }));
        }
    }

    return (
        <Container fluid className="main-content">
            <Row>
                <Col className="flex-column">
                    <div className="user-form-container flex-grow">
                        <Form noValidate className="user-form border border-1 border-dark"  validated={validated} onSubmit={handleSubmit(onSubmit)}>
                            <p className="border-bottom border-2">Register</p>

                            <Form.Group className="mb-3" 
                            {...register("email", { 
                                required: "email is required", 
                                maxLength: { value: 320, message: "Max length is 320" }, 
                                minLength: { value: 7, message: "Minimum length is 7" }, 
                                pattern: { value : /^\S+@\S+./, message: "Invalid email" } 
                            })}>
                                <Form.Label>Email</Form.Label>
                                <Controller control={control} name="email"                                            
                                defaultValue=""                                                                        
                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                    <Form.Control onChange={onChange} value={value} ref={ref}
                                    type="text"
                                    placeholder="Enter email"                          
                                    isInvalid={errors.email || serverResponseErrors.email} />)} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message || serverResponseErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3"
                            {...register("username", { 
                                required: "username is required", 
                                maxLength: { value: 20, message: "Max length is 20" }, 
                                minLength: { value: 5, message: "Minimum length is 5" }, 
                                pattern: { value : /^[a-zA-Z0-9_.\-]*/, message: "Invalid username" } 
                            })}>
                                <Form.Label>Username</Form.Label>
                                <Controller control={control} name="username"                                            
                                defaultValue=""                                                                        
                                render={({ field: { onChange, onBlur, value, ref } }) => (                          
                                    <Form.Control onChange={onChange} value={value} ref={ref}
                                    type="text"
                                    placeholder="Enter username"                          
                                    isInvalid={errors.username || serverResponseErrors.username} />)} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username?.message || serverResponseErrors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3"
                            {...register("password", { 
                                required: "password is required", 
                                maxLength: { value: 40, message: "Max length is 40" }, 
                                minLength: { value: 5, message: "Minimum length is 5" }, 
                                pattern: { value : /^[a-zA-Z0-9_.\-]*/, message: "Invalid password" } 
                            })}>
                                <Form.Label>Password</Form.Label>
                                <Controller control={control} name="password"                                            
                                defaultValue=""                                                                        
                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                    <Form.Control onChange={onChange} value={value} ref={ref}
                                    type="password"
                                    placeholder="Enter password"                          
                                    isInvalid={errors.password || serverResponseErrors.password} />)} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message || serverResponseErrors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <div className="form-footer">
                            <p className="small">Already have an account? &nbsp;</p>
                            <a href="/login" rel="noreferrer" className="small">Login</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;