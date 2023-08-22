import { Button, Table, Checkbox, Grid } from "semantic-ui-react";
import axios from "../http-common";
import { useEffect, useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { createPortal } from "react-dom";

export default function Read() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(false);
    };

    const handleSubmitClick = () => {
        getUsers();
    };

    const getUsers = async () => {
        const response = await axios.get('');
        setUsers(response.data.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)));
    }

    const updateUser = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    }

    const deleteUser = async (id) => {
        await axios.delete(`${id}`)
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="table">
            <br/>
            <Table color="blue" padded singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center' width={2}>First Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' width={2}>Last Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' width={2}>Email</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' width={1}>Course completion status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left' width={1}></Table.HeaderCell>
                        <Table.HeaderCell textAlign='left' width={1}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users?.map(user => {
                        return (
                            <>
                                { modalOpen &&
                                    createPortal(
                                        <UpdateModal
                                            onSubmit={handleSubmitClick}
                                            closeModal={handleButtonClick}
                                            currentuser={currentUser}
                                        />,
                                        document.body
                                    )}
                                <Table.Row key={user.id}>
                                    <Table.Cell singleLine textAlign='center'>{user.firstName}</Table.Cell>
                                    <Table.Cell singleLine textAlign='center'>{user.lastName}</Table.Cell>
                                    <Table.Cell singleLine textAlign='center'>{user.emailID}</Table.Cell>
                                    <Table.Cell singleLine textAlign='center'>
                                        <Checkbox
                                            toggle
                                            checked={user.checked}
                                            disabled
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='left'>
                                        <Grid>
                                            <Grid.Column textAlign="center">
                                                <Button size="medium" color="blue" className="button-update" onClick={() => updateUser(user)}>Edit</Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Table.Cell>
                                    <Table.Cell textAlign='left'>
                                        <Grid>
                                            <Grid.Column textAlign="center">
                                                <Button size="medium" color="red" className="button-delete" onClick={() => deleteUser(user.id)}>Delete</Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Table.Cell>
                                </Table.Row>
                            </>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    );
}