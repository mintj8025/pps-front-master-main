import React, {useEffect , useState} from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import img from './img/bloom-doctor-woman-waving-hand-in-greeting.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Home.css';
import Swal from 'sweetalert2'

function App() {

  const [isLoaded, setIsLoaded] = useState(true);
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
        setIsLoaded(false)
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

    const handlePatientHistory = (event) => {
      window.location = '/patient_info'
    }
  
    const handleLogout = (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      window.location = '/login'
    }

  if (isLoaded) return (<div>Loading</div>)
  else {
  return (
   <div>
            <div class="fullscreen-block">
            <div class="username">
            <IconButton
            sx={{color: 'black'}}>
              <Typography onClick={handleProfile} variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
                
            <div className='head-rectangle'>
            <div class="rectangle"></div>
            <img style={{ 
                width: 330, 
                height: 212,
                position: 'absolute',
                marginTop: 80,
                right: 210 ,
                transform: 'scaleX(-1)'
              }} 

              src={img} className="App-logo" alt="img" />
             
              <div style={{alignSelf: "center",
              marginTop: 135,
              fontSize: 35,
              left: 450 ,
              position: 'absolute',
              color: 'white',
              fontWeight: 'bold', }}>
                เลือกระดับความปวดคนไข้
              </div>
              <div style={{alignSelf: "center",
              marginTop: 200,
              fontSize: 35,
              left: 520 ,
              position: 'absolute',
              color: 'white',
              fontWeight: 'bold', }}>
                ให้เราช่วยประเมิน
              </div>

              <div class="register-menu">
              <IconButton>
              <Card sx={{ minWidth: 245 , borderRadius: 10}}>
              <PersonAddAltIcon onClick={handleRegister} sx={{ fontSize: 100 }} 
              style={{ color: 'black' , position: 'relative' , marginTop: 20}} />
                <CardContent>
                  <Typography variant="h5" component="div" fontFamily={'kanit'}>
                    ลงทะเบียนคนไข้ใหม่
                  </Typography>  
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" fontFamily={'kanit'}
                              style={{fontSize: 15 , position: 'relative' , marginTop: 5 }}>
                    การลงทะเบียนคนไข้<br/>
                    ที่เข้ามารักษาครั้งแรก
                  </Typography>
              </CardContent>
              </Card>
              </IconButton>
              </div>
             
              <div class="assessment-menu">
              <IconButton>
              <Card sx={{ minWidth: 245 , borderRadius: 10}}>
              <AssignmentIcon onClick={handleAssPatientFound} sx={{ fontSize: 100 }} 
              style={{ color: 'black' , position: 'relative' , marginTop: 20}} />
                <CardContent>
                  <Typography variant="h5" component="div" fontFamily={'kanit'}>
                    ประเมิน PPS
                  </Typography>  
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" fontFamily={'kanit'}
                              style={{fontSize: 15 , position: 'relative' , marginTop: 5 }}>
                    การประเมินระดับผู้ป่วย<br/>
                    (Palliative Performance Scale)
                  </Typography>
              </CardContent>
              </Card>
              </IconButton>
              </div>

              <div class="history-menu">
              <IconButton>
              <Card sx={{ minWidth: 245 , borderRadius: 10}}>
              <UpdateIcon onClick={handleHistory} sx={{ fontSize: 100 }} 
              style={{ color: 'black' , position: 'relative' , marginTop: 20}} />
                <CardContent>
                  <Typography variant="h5" component="div" fontFamily={'kanit'}>
                    ดูประวัติการประเมิน
                  </Typography>  
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" fontFamily={'kanit'}
                              style={{fontSize: 15 , position: 'relative' , marginTop: 5 }}>
                    ประวัติย้อนหลังการประเมิน<br/>
                    ระดับผู้ป่วยทั้งหมดในระบบ
                  </Typography>
              </CardContent>
              </Card>
              </IconButton>
              </div>

              <div class="patient-history-menu">
              <IconButton>
                <Card sx={{ minWidth: 245, borderRadius: 10 }}>
                  <AssignmentIcon onClick={handlePatientHistory} sx={{ fontSize: 100 }} 
                  style={{ color: 'black', position: 'relative', marginTop: 20 }} />
                  <CardContent>
                    <Typography variant="h5" component="div" fontFamily={'kanit'}>
                      ประวัติคนไข้
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" fontFamily={'kanit'}
                      style={{ fontSize: 15, position: 'relative', marginTop: 5 }}>
                      ดูประวัติการรักษาของคนไข้
                    </Typography>
                  </CardContent>
                </Card>
              </IconButton>
            </div>

              </div>

              <div className='navbar' sx={{position: 'sticky'}}>
          <List sx={{ maxWidth: 180, height: '97.4vh', margin: '0', bgcolor: '#5246E9' }}>
            <div class="profile">
              <IconButton aria-label="Profile">
                <PermIdentityIcon sx={{ fontSize: 40 }} color="disabled" />
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
