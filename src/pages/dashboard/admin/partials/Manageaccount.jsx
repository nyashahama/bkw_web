import React, { useState } from "react";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    name: "John Michael",
    email: "john@creative-tim.com",
    role: "Manager",
  },
  {
    id: 2,
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    role: "Programator",
  },
  {
    id: 3,
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    role: "Executive",
  },
  {
    id: 4,
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    role: "Programator",
  },
  {
    id: 5,
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    role: "Manager",
  },
  // Add more users to test pagination
];

export default function Manageaccount() {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
  });
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditClick = (user) => {
    setEditFormData(user);
    setShowEditModal(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.email || !editFormData.role) {
      return alert("All fields are required.");
    }
    const updatedUsers = users.map((user) =>
      user.id === editFormData.id ? editFormData : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email || !newUserData.role) {
      return alert("All fields are required.");
    }
    const newUser = {
      id: users.length + 1,
      ...newUserData,
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6 overflow-scroll px-0">
      <Button
        variant="primary"
        onClick={() => setShowAddModal(true)}
        className="mb-3"
      >
        Add User
      </Button>
      <table className="mt-4 w-full min-w-max table-auto text-left border border-gray-300">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-2 border-b border-gray-200">Full name</th>
            <th className="p-2 border-b border-gray-200">Email</th>
            <th className="p-2 border-b border-gray-200">Phone number</th>
            <th className="p-2 border-b border-gray-200">Role</th>
            <th className="p-2 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td class="px-2 py-2">{user.email}</td>
              <td class="px-2 py-2">Photography</td>
              <td class="px-2 py-2">{user.role}</td>
              <td class="px-2 py-2 flex space-x-2">
                <a
                  href="#"
                  onClick={() => handleEditClick(user)}
                  class="font-medium text-blue-600 hover:underline flex items-center"
                >
                  <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                </a>
                <a
                  href="#"
                  onClick={() => handleDelete(user.id)}
                  class="font-medium text-red-600 hover:underline flex items-center"
                >
                  <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* View Modal */}
      <Modal
        show={showViewModal}
        size="lg"
        onHide={() => setShowViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        size="lg"
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={editFormData.role}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, role: e.target.value })
                }
                required
              >
                <option>Manager</option>
                <option>Programator</option>
                <option>Executive</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        size="lg"
        onHide={() => setShowAddModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUserData.name}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUserData.email}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUserData.role}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, role: e.target.value })
                }
                required
              >
                <option>Manager</option>
                <option>Programator</option>
                <option>Executive</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
