import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner
} from "@coreui/react";

const ManageUsers = () => {
  const [validated, setValidated] = useState(false);
  const [visibleUserForm, setVisibleUserForm] = useState(false);
  const[usersData, setusersData] = useState([]);
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[company,setCompany] = useState('');
  const[role,setRole] = useState('');
  const [visible, setVisible] = useState(false);
  const[emailValidate,setemailValidate] = useState('');
  const[formLable,setFormLable] = useState('Add');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
  const itemsPerPage = 5;
  const [nameValidate, setnameValidate] = useState('');
  const [companyValidate, setcompanyValidate] = useState('');
  const [roleValidate, setroleValidate] = useState('');
  const[nameFilter, setNameFilter] = useState('');
  const[companyFilter, setCompanyFilter] = useState('');
  const[emailFilter, setEmailFilter] = useState('');

  const filteredUsers = usersData.filter(user => {
    return (
      (user.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (user.company.toLowerCase().includes(companyFilter.toLowerCase())) &&
      (user.email.toLowerCase().includes(emailFilter.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);  

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const values= {
      name,
      email,
      company,
      role
  }
  const toggleUserForm = () => {
    setVisibleUserForm(!visibleUserForm);
  };
  const handleSubmit = (event) => {

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {      
      event.preventDefault();
      event.stopPropagation();
      
    }
    if (!email || !name || !company || !role) {    
      if (!email) {setemailValidate('Email is required')}
      if (!name) {setnameValidate('Name is required')}
      if (!company) {setroleValidate('Role is required')}
      if (!role) {setcompanyValidate('Company is required')}
      
      setValidated(false);
      return; 
    }
    else{
      setemailValidate('');
      setnameValidate('');
      setroleValidate('');
      setcompanyValidate('');
      setValidated(true);
    }
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!email.match(isValidEmail)){
      setemailValidate('Please enter valid email');
      setValidated(false);
      return;      
    }
    else{
      setemailValidate('');
      setValidated(true);
    }
    
    axios.post('http://localhost:5000/add', values)
                .then(response => {   
                  setemailValidate(response.data.message);      
                  setValidated(false);      
                 if(response.data.message === 'Email already exists') {
                  setemailValidate(response.data.message);                           
                }
                else if(response.data.message === 'Success'){
                  setVisible(true);
                  setusersData([...usersData, response.data.employee]);
                  setVisibleUserForm(!visibleUserForm);
                  setValidated(false);  
                  setName('');          
                  setEmail('');         
                  setCompany('');       
                  setRole(''); 
                  setemailValidate(''); 
                  
              }
                })
                .catch(error => {
                    console.error('Error inserting user data:', error);                    
                });
              
  };

  useEffect(() => {
    axios.get('http://localhost:5000/users')  
      .then(response => {         
        setusersData(response.data);        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const handleEdit = (user) => {  
    setVisibleUserForm(!visibleUserForm);
    setName(user.name);
    setEmail(user.email);
    setCompany(user.company);
    setRole(user.role);   
    setCurrentUserId(user._id);
    setFormLable('Update');
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      company,
      role,
    }; 
   
    axios.put(`http://localhost:5000/update/${currentUserId}`, updatedUser)
      .then(response => {
        if (response.data.message === 'Update successful') {       
          const updatedUsersData = usersData.map(user => 
            user._id === currentUserId ? { ...user, ...updatedUser } : user
          );
          setusersData(updatedUsersData);
          setVisibleUserForm(false); 
          setVisible(true);
          setValidated(false); 
          setemailValidate('');
          setName(''); 
          setEmail(''); 
          setCompany(''); 
          setRole(''); 
          setFormLable('Add');
        } else {
          setemailValidate(response.data.message); 
        }
      })
      .catch(error => {
        console.error('Error updating user data:', error);       
      });
    
  }

  const handleDelete = (e, user) => {
    e.preventDefault();
    setCurrentUserId(user._id);
    console.log(user._id);
  
    axios.delete(`http://localhost:5000/delete/${user._id}`)
      .then(response => {
        if (response.data.message === 'deleted') {
          const updatedUsersData = usersData.filter(u => u._id !== user._id);
          setusersData(updatedUsersData);
          setVisible(true);
          setFormLable('Deleted');
        }
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      <div className="manage-users">
        <div className="header-manage-users">
          <h3>Manage Users</h3>
          <button
            id="add-user"
            className="btn btn-primary"
            onClick={toggleUserForm}
          >
            Add New User
          </button>
        </div>

        {visibleUserForm && (
          <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={formLable === 'Add' ? handleSubmit : handleUpdate}
        >
          <CCol md={12}>
            <CFormInput
              type="text"
              placeholder="Name"
              feedbackValid="Looks good!"
              feedbackInvalid={nameValidate || "Please provide a valid name."}
              id="validationCustom01"
              label="Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              invalid={nameValidate !== ''} 
              required
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              aria-describedby="validationCustom02Feedback"
              type="text"
              placeholder="Email"
              feedbackInvalid={emailValidate || "Please provide a valid email."}
              id="validationCustom02"
              label="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}  
              invalid={emailValidate !== ''}            
              required
            />
          </CCol>
          
          
          <CCol md={12}>
              <CFormSelect
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid={companyValidate || "Please select a valid company"}
                id="validationCustom03"
                label="Company"
                onChange={(e) => setCompany(e.target.value)}
                invalid={companyValidate !== ''}
                required
                defaultValue={company} // Set default value as empty
              >
                <option value="" disabled>
                  ---Select Company---
                </option>
                <option value="ColorWhistle">ColorWhistle</option>
                <option value="LogoWhistle">LogoWhistle</option>
                {/* Add other states here */}
              </CFormSelect>
            </CCol>

            <CCol md={12}>
              <CFormSelect
                aria-describedby="validationCustom04Feedback"
                feedbackInvalid={roleValidate || "Please select a valid role."}
                id="validationCustom04"
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                required
                invalid={roleValidate !== ''}
                defaultValue={role} // Set default value as empty
              >
                <option value="" disabled>
                ---Select Role---
                </option>
                <option value="Contractor">Contractor</option>
                <option value="Sub Contractor">Sub Contractor</option>
                {/* Add other roles here */}
              </CFormSelect>
            </CCol>
          
         
          <CCol xs={1}>
            {formLable === 'Add' ?(
              <CButton color="primary" type="submit">
               Add
            </CButton> 
            ):(
          <CButton color="primary" type="submit" onClick={handleUpdate}>
              Update
            </CButton> 
            )}
                      
          </CCol>
          <CCol xs={1}>           
            <CButton onClick={toggleUserForm} color="outline-dark" type="submit">
              Cancel
            </CButton>
          </CCol>
        </CForm>
        )}
      
        <div className="filter-section">
          <CForm>
          <CRow>
            <CCol md={4}>
            <CFormInput 
            type="text"
            placeholder="Filter by name"
            name="Filter by name"
            defaultValue={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}/>
            </CCol>
            <CCol md={4}>
            <CFormInput 
            type="email"
            placeholder="Filter by email"
            defaultValue={emailFilter}
            name="Filter by email"
            onChange={(e) => setEmailFilter(e.target.value)}/>
            </CCol>
            <CCol md={4}>
            <CFormInput 
            type="text"
            placeholder="Filter by company"
            defaultValue={companyFilter}
            name="Filter by company"
            onChange={(e) => setCompanyFilter(e.target.value)}/>
            </CCol>
            </CRow>
          </CForm>
        </div>
      <CTable hover striped bordered responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Company</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
            <CTableHeaderCell>Created Date</CTableHeaderCell>
            <CTableHeaderCell>Manage</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentUsers.length > 0 ? (
            currentUsers.map(user => (
              <CTableRow key={user._id}>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.company}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>{user.createdDate}</CTableDataCell>
                <CTableDataCell>
                  <span className="edit-user" onClick={() => handleEdit(user)}>Edit</span> | 
                  <span className="delete-user" onClick={(e) => handleDelete(e, user)}> Delete</span>
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="6">No users found</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
        {/* Pagination */}

      <div className="pagination">
        <button className={currentPage === 1 ? 'disable-arrow' : 'enabled-arrow'}onClick={handlePreviousPage} disabled={currentPage === 1}>{'<'}</button>
        {Array.from({ length: totalPages }, (_, index) => (
           <button className={currentPage === index + 1 ? 'disable' : ''}
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button className={currentPage === totalPages ? 'disable-arrow' : 'enabled-arrow'}onClick={handleNextPage} disabled={currentPage === totalPages}>{'>'}</button>
      </div>
        <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="StaticBackdropExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel"></CModalTitle>
      </CModalHeader>
      <CModalBody>
        User Successfully {formLable === 'Add' ? 'Added' : 'Updated'}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        
      </CModalFooter>
    </CModal>
      </div>
    </>
  );
};

export default ManageUsers;
