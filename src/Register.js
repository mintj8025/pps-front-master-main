import React, {useEffect , useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import './Register.css'


export default function SignUp() {
    
  const [fnameError, setFnameError] = React.useState('');
  const [lnameError, setLnameError] = React.useState('');
  const [hnError, setHnError] = React.useState('');

  const [num, setNum] = useState('');

  const handleNumChange = event => {
    const limit = 8;
    setNum(event.target.value.slice(0, limit));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      patient_fname: data.get('patient_fname'),
      patient_lname: data.get('patient_lname'),
      patient_HN: data.get('patient_HN'),
  }

  if (!jsonData.patient_fname) {
    setFnameError('กรุณากรอกชื่อคนไข้');
  } else {
    setFnameError('');
  }

  if (!jsonData.patient_lname) {
    setLnameError('กรุณากรอกนามสกุลคนไข้');
  } else {
    setLnameError('');
  }

  const hnRegex = /^[0-9]{8}$/; // This regex matches 8 digits
  if (!jsonData.patient_HN || !hnRegex.test(jsonData.patient_HN)) {
    setHnError('กรุณากรอกเลข HN ที่มี 8 ตัวเป็นตัวเลข');
  } else {
    setHnError('');
  }

  
  if (jsonData.patient_fname && jsonData.patient_lname && jsonData.patient_HN) {
    fetch('http://localhost:7000/register_patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          Swal.fire({
            icon: 'success',
            title: 'การลงทะเบียนคนไข้ใหม่ของคุณถูกบันทึกแล้ว',
            showConfirmButton: false,
            timer: 2000
          }).then((value) => {
            window.location = '/home'
          })
        } else if (data.status === 'error' && data.message === 'เลข HN นี้มีอยู่ในระบบแล้ว') {
          // ถ้า HN ซ้ำแสดงเตือน
          setHnError('HN นี้มีอยู่ในระบบแล้ว');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};


const [decoded, setAssessor] = useState([]);
  
useEffect(() => {
  const token = localStorage.getItem('token')
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

fetch("http://localhost:7000/authen", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === 'ok'){
      setAssessor(result.decoded)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'Authen failed!',
      }).then((value) => {
        localStorage.removeItem('token');
        window.location = '/login'
      })
    }
    console.log(result)
  })
  .catch(error => console.log('error', error));
  }, [])

  const handleProfile = (event) => {
    window.location = '/Profile'
  }

  const handleHome = (event) => {
    window.location = '/Home'
  }

  const handleRegister = (event) => {
    window.location = '/register'
  }

  const handleAssPatientFound = (event) => {
    window.location = '/asspatientfound'
  }

  const handleHistory = (event) => {
    window.location = '/History'
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }


  return (       
  <div>
    <div class="fullscreen-block">
    <div class="username">
            <IconButton
            sx={{color: 'black'}}>
              <Typography onClick={handleProfile} variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
            <div className='registerPatient'>
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Typography component="h1" variant="h3" fontFamily={'kanit'}>
              ลงทะเบียนคนไข้ใหม่
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontFamily={'lightKanit'} >
                  ชื่อ
                </Typography>
                  <TextField
                    autoComplete="given-name"
                    name="patient_fname"
                    required
                    fullWidth
                    id="patient_fname"
                    label="ชื่อ"
                    autoFocus
                    error={!!fnameError} // Add error prop
                    helperText={fnameError} // Display error message
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontFamily={'lightKanit'}>
                  นามสกุล
                </Typography>
                  <TextField
                    required
                    fullWidth
                    id="patient_lname"
                    label="นามสกุล"
                    name="patient_lname"
                    autoComplete="family-name"
                    error={!!lnameError} // Add error prop
                    helperText={lnameError} // Display error message
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h6" fontFamily={'lightKanit'}>
                  เลข HN
                </Typography>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="patient_HN"
                    label="เลข HN"
                    name="patient_HN"
                    autoComplete="HN"
                    error={!!hnError} // Add error prop
                    helperText={hnError} // Display error message
                    value={num}
                    onChange={handleNumChange}
                  />
                </Grid>             
              </Grid>
              <Button
                type="submit"
                maxWidth= "45"
                variant="contained"
                sx={{ mt: 4, mb: 2 , ml:33}}
              >
                <Typography variant="h5" fontFamily={'kanit'}>
                ลงทะเบียน
                </Typography>
              </Button>
            </Box>
          </Box>
        </div>

         <List sx={{ maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
            <div class="profile">
            <IconButton aria-label="Profile">
             <PermIdentityIcon onClick={handleProfile} sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton> 
            </div>          
            
            <div class="home">
            <IconButton aria-label="Home">
             <HomeIcon onClick={handleHome} sx={{ fontSize: 40 }} style={{ color: "disabled" }} />
            </IconButton>      
            </div>

            <div class="register">
            <IconButton aria-label="Register">
            <PersonAddAltIcon onClick={handleRegister} sx={{ fontSize: 40 }} style={{ color: 'white' }} />
            </IconButton> 
            </div>

            <div class="assessment">
            <IconButton aria-label="Assessment">
            <AssignmentIcon onClick={handleAssPatientFound} sx={{ fontSize: 40 }} style={{ color: 'disabled' }} />
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
  );
}