import React, {useEffect , useState} from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import './PpsResult.css';
import Swal from 'sweetalert2'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import imgEmoji100 from './img/pps100.png';
import imgEmoji90 from './img/pps90.png';
import imgEmoji80 from './img/pps80.png';
import imgEmoji70 from './img/pps70.png';
import imgEmoji60 from './img/pps60.png';
import imgEmoji50 from './img/pps50.png';
import imgEmoji40 from './img/pps40.png';
import imgEmoji30 from './img/pps30.png';
import imgEmoji20 from './img/pps20.png';
import imgEmoji10 from './img/pps10.png';


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

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }

  const handleRegister = (event) => {
    window.location = '/register'
  }

  const handleAssPatientFound = (event) => {
    window.location = '/asspatientfound'
  }

  const handleHistory = (event) => {
    window.location = '/history'
  }
  
  const handleHome = (event) => {
    window.location = '/home'
  }

  const [decoded2, setPatient] = useState([]);

  useEffect(() => {
    const token2 = localStorage.getItem('token2');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token2);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:7000/patientAuthen', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          setPatient(data.decoded2);
          console.log(decoded2);
        }
      })
      .catch((error) => console.log('error', error));
  }, [decoded2]); 

  const ppsValue = localStorage.getItem('pps');

  function getColorForPpsValue(ppsValue) {
  if (ppsValue === '100') {
    return '#16B6D6'; 
  } else if (ppsValue === '90') {
    return '#28B883'; 
  } else if (ppsValue === '80') {
    return '#3AB54A'; 
  } else if (ppsValue === '70') {
    return '#77B844'; 
  } else if (ppsValue === '60') {
    return '#FDCE36'; 
  } else if (ppsValue === '50') {
    return '#FCAB36'; 
  } else if (ppsValue === '40') {
    return '#F47129'; 
  } else if (ppsValue === '30') {
    return '#F47129'; 
  } else if (ppsValue === '20') {
    return '#F05A28'; 
  } else if (ppsValue === '10') {
    return '#EC4D1E'; 
  } 
}

function getEmojiForPpsValue(ppsValue) {
  if (ppsValue === '100') {
    return imgEmoji100;
  } else if (ppsValue === '90') {
    return imgEmoji90;
  } else if (ppsValue === '80') {
    return imgEmoji80;
  } else if (ppsValue === '70') {
    return imgEmoji70;
  } else if (ppsValue === '60') {
    return imgEmoji60;
  } else if (ppsValue === '50') {
    return imgEmoji50;
  } else if (ppsValue === '40') {
    return imgEmoji40;
  } else if (ppsValue === '30') {
    return imgEmoji30;
  } else if (ppsValue === '20') {
    return imgEmoji20;
  } else if (ppsValue === '10') {
    return imgEmoji10;
  }
}


  if (isLoaded) return (<div>Loading</div>)
else {
  return (
   <div>
            <div class="fullscreen-block">
            <div class="username">
            <IconButton
            sx={{color: 'black'}}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
                
              <div className='head-pps100' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography component="h1" variant="h3" x={{ fontSize: 35 }} fontFamily={'kanit'}>
                  บันทึกผลการประเมิน <CheckCircleIcon style={{ color: '#3DC988' }} sx={{ fontSize: 50 }} />
                </Typography>
                <Typography component="h1" variant="h3" x={{ fontSize: 35 }} fontFamily={'boldKanit'}  style={{ color: getColorForPpsValue(ppsValue) }}>
                  HN {decoded2.patient_HN} มีระดับ PPS
                </Typography>
                <Typography component="h1" variant="h3" x={{ fontSize: 35 }} fontFamily={'boldkanit'}  style={{ color: getColorForPpsValue(ppsValue) }}>
                  ร้อยละ {ppsValue}
                </Typography>
                <img
                  style={{
                    width: 230,
                    height: 230,
                  }}
                  src={getEmojiForPpsValue(ppsValue)}
                  className="Emoji"
                  alt="imgEmoji"
                />

            <IconButton
             onClick={handleHome} sx={{color: 'black'}}>
              <Typography sx={{textDecoration: 'underline'}} variant="h4" x={{ fontSize: 35 }} component="div" fontFamily={'lightkanit'}>
              กลับสู่หน้าหลัก</Typography> </IconButton>
              </div>



            <List sx={{ maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
            <div class="profile">
            <IconButton aria-label="Profile">
             <PermIdentityIcon  sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton> 
            </div>          
            
            <div class="home">
            <IconButton aria-label="Home">
             <HomeIcon onClick={handleHome}  sx={{ fontSize: 40 }} style={{ color: 'white' }} />
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
             <LogoutIcon  onClick={handleLogout} sx={{ fontSize: 40 }} color="disabled"/>
            </IconButton>   
            </div>

            </List>

            </div> 
   </div>
  );
}
}

export default App;
