import React, { useEffect, useState } from 'react';
import './AssPatientFound.css';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import {
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

function App() {
  const [filter, setFilter] = useState('HN');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [decoded, setAssessor] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jsonData = {
      filter, 
      searchTerm,
    };

    fetch('http://localhost:7000/patientFound', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
          Swal.fire({
            icon: 'error',
            title: 'ขออภัย...',
            text: 'ไม่พบข้อมูลคนไข้',
            customClass: {
              title: 'lightKanit',
              content: 'lightKanit',
            },
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePatientSelect = (selectedPatient) => {
    // ส่งคำร้องขอไปยัง Backend เพื่อรับค่า token2
    fetch('http://localhost:7000/getToken2', {
      method: 'POST', // หรือเป็นเมทอด HTTP ที่ถูกกำหนดให้ใช้ในการรับ token2
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedPatient), // ส่งข้อมูลที่เลือกของผู้ป่วยไปยัง Backend
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          const token2 = data.token2;
          // ทำสิ่งที่คุณต้องการทำกับ token2 ที่ได้รับ
          // เช่น บันทึกใน localStorage
          localStorage.setItem('token2', token2);
          window.location = '/AssNRS'
        } else {
          // จัดการกรณีที่ไม่พบ token2 หรือเกิดข้อผิดพลาด
          console.log('ไม่สามารถรับ token2 ได้');
        }
      })
      .catch((error) => {
        // จัดการกรณีเกิดข้อผิดพลาดในการส่งคำร้องขอ
        console.error('เกิดข้อผิดพลาดในการส่งคำร้องขอ:', error);
      });
  };
  


  useEffect(() => {
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
      })
      .catch((error) => console.log('error', error));
  }, []);

  const handleProfile = (event) => {
    window.location = '/Profile';
  };

  const handleHome = (event) => {
    window.location = '/Home';
  };

  const handleRegister = (event) => {
    window.location = '/register';
  };

  const handleHistory = (event) => {
    window.location = '/History';
  };

  const handleAssessment = (event) => {
    window.location = '/asspatientfound'
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login';
  };

 
  return (
    <div>
      <div class="fullscreen-block">
        <div class="username">
          <IconButton sx={{ color: 'black' }}>
            <Typography onClick={handleProfile} variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}
              <PermIdentityIcon sx={{ fontSize: 35 }} />
            </Typography>{' '}
          </IconButton>
        </div>

        <div className="assessmentAuth">
        <Typography  sx={{ fontSize: 55, fontFamily: 'kanit' }}>
          แบบประเมินผู้ป่วยที่มีความปวดจากโรคมะเร็ง
        </Typography>
        <Typography sx={{ fontSize: 35, fontFamily: 'kanit' }}>
          หน่วยระงับปวด โรงพยาบาลศิริราช
        </Typography>


          <FormControl component="fieldset">
            <RadioGroup row aria-label="filter" name="filter" value={filter} onChange={handleFilterChange}>
              <FormControlLabel value="HN" control={<Radio />} label="HN" />
              <FormControlLabel value="ชื่อ" control={<Radio />} label="ชื่อ" />
              <FormControlLabel value="นามสกุล" control={<Radio />} label="นามสกุล" />
            </RadioGroup>
          </FormControl>

          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              id="searchTerm"
              placeholder={`ค้นหาด้วย ${filter}`}
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={handleSearchTermChange}
              value={searchTerm}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleSubmit} 
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          {searchResults.length > 0 && (
          <div className="search-results">
          <Typography variant="h4" component="div" fontFamily="kanit">
            เลือกคนไข้เพื่อประเมิน
          </Typography>
        
          <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {searchResults.map((patient) => (
              <li key={patient.id} style={{ width: '48%', marginBottom: '16px' }}>
                <div onClick={() => handlePatientSelect(patient)}>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    ชื่อ: {patient.patient_fname}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    นามสกุล: {patient.patient_lname}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    HN: {patient.patient_HN}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    status: {patient.patient_status}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    Last Assessment Date: {patient.date
                      ? new Date(patient.date).toLocaleDateString()
                      : 'ยังไม่เคยประเมิน'}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    date of first: {patient.date_of_first
                      ? new Date(patient.date_of_first).toLocaleDateString()
                      : 'ยังไม่เคยประเมิน'}
                  </Typography>
                  <Typography variant="body1" fontFamily="lightkanit" sx={{ fontSize: '20px' }}>
                    duration: {patient.duration}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        )}


        </div>

        <div className='navbar' sx={{position: 'sticky'}}>
            <List sx={{maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
            <div class="profile">
            <IconButton aria-label="Profile">
             <PermIdentityIcon  sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton> 
            </div>          
            
            <div class="home">
            <IconButton aria-label="Home">
             <HomeIcon onClick={handleHome} sx={{ fontSize: 40 }} style={{ color: 'white' }} />
            </IconButton>      
            </div>

            <div class="register">
            <IconButton aria-label="Register">
            <PersonAddAltIcon onClick={handleRegister} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>

            <div class="assessment">
            <IconButton aria-label="Assessment">
            <AssignmentIcon onClick={handleAssessment} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>

            <div class="history">
            <IconButton aria-label="History">
            <UpdateIcon onClick={handleHistory} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
            </IconButton> 
            </div>
            
            <div class="logout">
            <IconButton aria-label="Logout">
             <LogoutIcon  onClick={handleLogout} sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton>   
            </div>

            </List>
            </div>
      </div>
    </div>
  );
}

export default App;
