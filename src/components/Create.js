import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from '../http-common';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailID: ""
    });
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    const postData = async (e) => {
        e.preventDefault();
        if (user.firstName !== null && user.firstName !== "" && user.emailID !== null && user.emailID !== "") {
            await axios.post('', {
                id: uuidv4(),
                firstName: user.firstName,
                lastName: user.lastName,
                emailID: user.emailID,
                checked: false
            }).then(() => {
                navigate('/');
            }).catch(() => {
                alert("Error occured!")
            });
        } else {
            alert("Input all the required fields!");
        }
    }

    return (
        <div className="form">
            <Form size="large" onSubmit={postData}>
                <Form.Field required={true}>
                    <label>First Name</label>
                    <input
                        value={user.firstName}
                        onChange={(e) => setUser({
                            ...user,
                            firstName: e.target.value})}
                        placeholder="Enter your First Name" />
                </Form.Field><br />
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        value={user.lastName}
                        onChange={(e) => setUser({
                            ...user,
                            lastName: e.target.value})}
                        placeholder="Enter your Last Name" />
                </Form.Field><br />
                <Form.Field required={true}>
                    <label>EmailID</label>
                    <input
                        value={user.emailID}
                        onChange={(e) => setUser({
                            ...user,
                            emailID: e.target.value})}
                        placeholder="Enter your email ID" />
                </Form.Field><br />
                <Form.Field>
                    <Button className="btn-1" color="green">Create</Button>
                    <Button className="btn-2" color="red" onClick={backToHome}>Cancel</Button>
                </Form.Field>
            </Form>
        </div>
    )
}