import { useState } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import axios from '../http-common';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailID, setEmailID] = useState("");
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    const postData = async (e) => {
        e.preventDefault();
        if (firstName !== null && firstName !== "" && emailID !== null && emailID !== "") {
            await axios.post('', {
                id: uuidv4(),
                firstName,
                lastName,
                emailID,
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your First Name" />
                </Form.Field><br />
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your Last Name" />
                </Form.Field><br />
                <Form.Field required={true}>
                    <label>EmailID</label>
                    <input
                        value={emailID}
                        onChange={(e) => setEmailID(e.target.value)}
                        placeholder="Enter your email ID" />
                </Form.Field><br />
                <Grid>
                    <Grid.Column textAlign="left">
                        <Button color="green">Create</Button>
                    </Grid.Column>
                    <Grid.Column className="btn-create-cancel" textAlign="right">
                        <Button color="red" onClick={backToHome}>Cancel</Button>
                    </Grid.Column>
                </Grid>
            </Form>
        </div>
    )
}