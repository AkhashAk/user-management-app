import { Button, Table, Input, Icon, Select, Header } from "semantic-ui-react";
import axios from "../http-common";
import { useEffect, useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { createPortal } from "react-dom";
import PaginationComponent from './PaginationComponent';

const options = [
    { key: 'firstName', text: 'First Name', value: 'firstName' },
    { key: 'lastName', text: 'Last Name', value: 'lastName' },
    { key: 'emailID', text: 'Email ID', value: 'emailID' },
]

export default function Read() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUser, setCurrentUser] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState({
        query: "",
        column: "firstName"
    });
    const usersPerPage = 5;

    const indexOfLastItem = currentPage * usersPerPage;
    const indexOfFirstItem = indexOfLastItem - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchQuery({
            ...searchQuery,
            query: searchTerm
        });
        const filtered = users.filter((item) =>
            item[searchQuery.column].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }

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
                setFilteredUsers(res.data.filter(item => item.checked === false));
                break;
            case "Completed":
                setFilteredUsers(res.data.filter(item => item.checked === true));
                break;
            default:
                break;
        }
    }

    const loadUsers = async () => {
        const response = (await axios.get('')).data.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
        setUsers(response);
        setFilteredUsers(response);
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
                        onChange={handleSearch}
                        actions="true"
                    >
                        <Icon name='users' />
                        <input />
                        <Select floating compact options={options} defaultValue='firstName' onChange={(e, data) => setSearchQuery({ ...searchQuery, column: data.value })} />
                    </Input>
                </div>
            </div> <br /> <br />
            <div className="custom-div">
                <Table color="blue" padded singleLine fixed selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center' width={1}>First Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}>Last Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}>Email</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}>Course completion status</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}></Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currentUsers.map((user, index) => {
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
                                        <Table.Cell textAlign='center' collapsing>
                                            <Button size="medium" color="blue" className="button-update" onClick={() => updateUser(user)}>Edit</Button>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center' collapsing>
                                            <Button size="medium" color="red" className="button-delete" onClick={() => deleteUser(user.id)}>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </>
                            )
                        })}
                        {currentUsers.length === 0 && (
                            <Table.Row>
                                <Table.Cell singleLine textAlign='center' colSpan={6}>No user found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <PaginationComponent
                    users={users}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div> <br />
        </div>
    );
}