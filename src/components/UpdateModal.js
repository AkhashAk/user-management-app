import React, { useEffect, useState, useReducer } from "react";
import "./UpdateModal.css";
import axios from "../http-common";
import { Form, Button, Checkbox, Grid, Header } from "semantic-ui-react";

const initialMessages = [
  {
    type: 'UPDATE',
    message: 'Updated Successfully!',
    color: "green"
  },
  {
    type: 'NO_UPDATE',
    message: 'Do some changes to update...',
    color: "red"
  },
  {
    type: "NOTHING",
    message: <h4>&nbsp;</h4>,
    color: ""
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return initialMessages.find(msg => {
        if (msg.type === "UPDATE") {
          return msg;
        } else return null;
      });
    case 'NO_UPDATE':
      return initialMessages.find(msg => {
        if (msg.type === "NO_UPDATE") {
          return msg;
        } else return null;
      });
    default:
      return initialMessages.find(msg => {
        if (msg.type === "NOTHING") {
          return msg;
        } else return null;
      });
  }
}

export const UpdateModal = ({ onSubmit, closeModal, currentuser }) => {
  const [user, setUser] = useState({});
  const [message, dispatch] = useReducer(reducer, initialMessages[2]);

  useEffect(() => {
    setUser(currentuser);
  }, [currentuser]);

  const postData = async () => {
    if (user.firstName !== null && user.firstName !== "" && user.emailID !== null && user.emailID !== "") {
      let response = await axios.get(`${user.id}`);
      const retrivedUser = response.data;
      if (retrivedUser.firstName !== user.firstName || retrivedUser.lastName !== user.lastName || retrivedUser.emailID !== user.emailID || retrivedUser.checked !== user.checked) {
        await axios
          .put(`${user.id}`, {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailID: user.emailID,
            checked: user.checked,
          })
          .then(() => {
            dispatch({ type: "UPDATE" });
            onSubmit();
          })
          .catch(() => {
            alert("Error occured!");
          });
      } else {
        dispatch({ type: "NO_UPDATE" })
      }
    } else {
      alert("Input all the required fields!");
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container")
          closeModal("Modal was closed");
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <p onClick={() => closeModal("Modal was closed")} className="close">
            &times;
          </p>
        </div>
        {/*<Update onSubmit={onSubmit} onCancel={onCancel} currentuser={currentuser} />*/}
        <Form size="large">
          <Form.Field>
            <label>First Name</label>
            <input
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              placeholder="Enter your First Name"
              maxLength={30}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Last Name</label>
            <input
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              placeholder="Enter your Last Name"
              maxLength={40}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>EmailID</label>
            <input
              value={user.emailID}
              onChange={(e) => setUser({ ...user, emailID: e.target.value })}
              placeholder="Enter your mail ID"
            />
          </Form.Field>
          <br />
          <Form.Field>
            <Checkbox
              toggle
              checked={user.checked}
              onChange={() => setUser({ ...user, checked: !user.checked })}
              label="Completed the course"
            />
          </Form.Field>
          <br />
          <Form.Field color={message.color}>
            {(message.type !== "NOTHING") ? (
              <Header as='h4' textAlign='center' color={message.color}>
                {message.message}
              </Header>
            ) : (
              <Header textAlign='center' color={message.color}>
                {message.message}
              </Header>
            )}
          </Form.Field>
          <br />
          <Grid>
            <Grid.Column textAlign="center">
              <Button color="green" onClick={postData}>
                Update
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    </div>
  );
};