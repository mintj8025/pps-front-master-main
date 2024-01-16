import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import './History.css';
import Swal from 'sweetalert2';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const CustomToolbar = (props) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <CustomExportButton {...props} />
  </GridToolbarContainer>
);

const CustomExportButton = (props) => (
  <GridToolbarExport
    {...props}
    csvOptions={{
      fileName: 'export-ประวัติผู้ป่วย.csv',
      utf8WithBom: true,
    }}
  />
);

export function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [decoded, setAssessor] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch('http://localhost:7000/patient_info')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error);
      });

    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:7000/authen', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setAssessor(result.decoded);
          setIsLoaded(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Sorry...',
            text: 'Authen failed!',
          }).then((value) => {
            localStorage.removeItem('token');
            window.location = '/login';
          });
        }
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login';
  };

  const handleHome = (event) => {
    window.location = '/Home'
  }

  const handleRegister = (event) => {
    window.location = '/register';
  };

  const handleAssPatientFound = (event) => {
    window.location = '/asspatientfound';
  };

  const handleHistory = (event) => {
    window.location = '/History'
  }

  const handleCancelTreatment = (params) => {
    const { patient_HN } = params.row;
  
    Swal.fire({
      title: 'จบการรักษา',
      text: `คุณแน่ใจหรือไม่ที่ต้องการจบการรักษาคนไข้ HN ${patient_HN} นี้?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + token);
  
        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify({
            patient_HN: patient_HN,
            patient_status: 'Cancelled Treatment',
          }),
        };
  
        fetch(`http://localhost:7000/cancel_treatment/${patient_HN}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 'ok') {
              Swal.fire('จบการรักษาเรียบร้อย!', '', 'success');
              const updatedData = data.map((row) =>
                row.patient_HN === patient_HN ? { ...row, patient_status: 'Cancelled Treatment' } : row
              );
              setData(updatedData);
            } else {
              Swal.fire('เกิดข้อผิดพลาด!', 'Failed to cancel treatment.', 'error');
            }
          })
          .catch((error) => {
            console.error('Error cancelling treatment:', error);
          });
      }
    });
  };
  
  
  
  
  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      align: 'center',
      renderCell: (params) => <Avatar>{params.row.avatar}</Avatar>,
    },
    { field: 'patient_HN', headerName: 'HN', flex: 1, minWidth: 100 },
    { field: 'patient_fname', headerName: 'Firstname', flex: 1, minWidth: 120 },
    { field: 'patient_lname', headerName: 'Lastname', flex: 1, minWidth: 120 },
    { field: 'patient_status', headerName: 'Status', flex: 1, minWidth: 130 },
    { field: 'patient_visit', headerName: 'Visit', flex: 1, minWidth: 50 },
    {
      field: 'date',
      headerName: 'Last Assessment Date',
      flex: 1,
      minWidth: 170,
      valueGetter: (params) => new Date(params.row.date).toLocaleDateString(),
    },
    {
      field: 'date_of_first',
      headerName: 'Date of first',
      flex: 1,
      minWidth: 100,
      valueGetter: (params) => new Date(params.row.date_of_first).toLocaleDateString(),
    },
    { field: 'duration', headerName: 'Duration', flex: 1, minWidth: 90, align: 'center' },
    {
      field: 'cancelTreatment',
      headerName: 'Cancel Treatment',
      flex: 1,
      minWidth: 140,
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleCancelTreatment(params)} aria-label="Cancel Treatment">
          <CancelIcon sx={{ fontSize: 20 }} style={{ color: 'red' }} />
        </IconButton>
      ),
    },    
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row.patient_HN === selectedRow ? null : params.row.patient_HN);
  };

  if (isLoaded) return <div>Loading</div>;
  else {
    return (
      <div>
        <div className="fullscreen-block">
          <div className="username">
            <IconButton sx={{ color: 'black' }}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
                {decoded.assessor_fname} {decoded.assessor_lname}
                <PermIdentityIcon sx={{ fontSize: 35 }} />
              </Typography>
            </IconButton>
          </div>
          <div className="assessmentForm">
            <Typography component="h1" variant="h3" fontFamily={'kanit'}>
              ประวัติผู้ป่วย
            </Typography>

            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.patient_HN}
              components={{
                Toolbar: CustomToolbar,
              }}
              rowThreshold={0}
              onRowClick={handleRowClick}
            />
          </div>

          <div className="navbar" sx={{ position: 'sticky' }}>
            <List sx={{ maxWidth: 180, height: '97.4vh', margin: '0', bgcolor: '#5246E9' }}>
              <div className="profile">
                <IconButton aria-label="Profile">
                  <PermIdentityIcon sx={{ fontSize: 40 }} color="disabled" />
                </IconButton>
              </div>

              <div className="home">
                <IconButton aria-label="Home">
                  <HomeIcon  onClick={handleHome} sx={{ fontSize: 40 }} style={{ color: 'white' }} />
                </IconButton>
              </div>

              <div className="register">
                <IconButton aria-label="Register">
                  <PersonAddAltIcon onClick={handleRegister} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
                </IconButton>
              </div>

              <div className="assessment">
                <IconButton aria-label="Assessment">
                  <AssignmentIcon onClick={handleAssPatientFound} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
                </IconButton>
              </div>

              <div className="history">
                <IconButton aria-label="History">
                  <UpdateIcon onClick={handleHistory} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
                </IconButton>
              </div>

              <div className="logout">
                <IconButton aria-label="Logout">
                  <LogoutIcon onClick={handleLogout} sx={{ fontSize: 40 }} color="disabled" />
                </IconButton>
              </div>
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
