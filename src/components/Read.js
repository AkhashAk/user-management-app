import { Button, Table, Grid, Input, Icon, Select, Header, Pagination, Statistic } from "semantic-ui-react";
import axios from "../http-common";
import { useEffect, useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { createPortal } from "react-dom";

const options = [
    { key: 'firstName', text: 'First Name', value: 'firstName' },
    { key: 'lastName', text: 'Last Name', value: 'lastName' },
    { key: 'emailID', text: 'Email ID', value: 'emailID' },
]

export default function Read() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState({
        query: "",
        column: "firstName"
    });
    const [currentUser, setCurrentUser] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const usersPerPage = 5;

    const indexOfLastItem = currentPage * usersPerPage;
    const indexOfFirstItem = indexOfLastItem - usersPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / usersPerPage);

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     return await axios.get(`?query=${searchQuery.query}`).then((response) => {
    //         setUsers(response.data);
    //         setSearchQuery("");
    //     }).catch((err) => console.log(err));
    // }

    const handlePageChange = (activePage) => {
        setCurrentPage(activePage);
    }

    const handleButtonClick = () => {
        setModalOpen(false);
    };

    const handleSubmitClick = () => {
        loadUsers();
    };

    const handleFilterSearch = async (filterQuery) => {
        const res = await axios.get("");
        switch (filterQuery) {
            case "Pending":
                setUsers(res.data.filter(item => item.checked === false));
                break;
            case "Completed":
                setUsers(res.data.filter(item => item.checked === true));
                break;
            default:
                break;
        }
    }

    const loadUsers = async () => {
        const response = await axios.get('');
        setUsers(response.data.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)));
    }

    const updateUser = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    }

    const deleteUser = async (id) => {
        await axios.delete(`${id}`)
        loadUsers();
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="table">
            <br />
            <div className="search-filter-container">
                <div className="filter-div">
                    <Header size='small' as='h3'>Filter by&nbsp;&nbsp;
                        <Button negative onClick={() => { handleFilterSearch("Pending") }}>Pending</Button>
                        <Button positive onClick={() => { handleFilterSearch("Completed") }}>Completed</Button>&nbsp;&nbsp;
                        <Button onClick={loadUsers}>Reset</Button>
                    </Header>
                </div>
                <div className="search-div">
                    <Input size='small' fluid icon iconPosition='left' placeholder={`search users by ${options.find(item => item.key === searchQuery.column).text.toLowerCase()}`}
                        value={searchQuery.query}
                        onChange={(e) => {
                            setSearchQuery({
                                ...searchQuery,
                                query: e.target.value
                            });
                        }}
                        actions
                    >
                        <Icon name='users' />
                        <input />
                        <Select floating compact options={options} defaultValue='firstName' onChange={(e, data) => setSearchQuery({ ...searchQuery, column: data.value })} />
                    </Input>
                </div>
            </div> <br /> <br />
            <div className="custom-div">
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
                        {currentUsers?.filter((item) => {
                            return searchQuery.query.toLowerCase() === ''
                                ? item
                                : item[searchQuery.column].toLowerCase().includes(searchQuery.query.toLowerCase());
                        }).map((user, index) => {
                            return (
                                <>
                                    {modalOpen &&
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
                                        <Table.Cell singleLine textAlign='center'>{user.checked ? "Completed" : "Pending"}</Table.Cell>
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
            </div> <br />
            <div className="footer-pagination">
                <Pagination
                    defaultActivePage={1}
                    pointing
                    secondary
                    totalPages={totalPages}
                    onPageChange={(e, { activePage }) => handlePageChange(activePage)}
                />
            </div>
        </div>
    );
}