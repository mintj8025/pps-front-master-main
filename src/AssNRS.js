import React, {useEffect , useState} from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpdateIcon from '@mui/icons-material/Update';
import Typography from '@mui/material/Typography';
import './AssNRS.css';
import Swal from 'sweetalert2'
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function App() {

  const [selectedValue, setSelectedValue] = React.useState('0');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const renderRadio = (item, color) => (
    <FormControlLabel
      control={
        <Radio
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 80,
            },
            color: color,
            '&.Mui-checked': {
              color: color,
            },
          }}
          {...controlProps(item)}
        />
      }
      label={
        <Typography
          component="div"
          style={{ fontSize: '30px', fontFamily: 'lightKanit'}}
        >
          {item}
        </Typography>
      }
      labelPlacement="bottom"
    />
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("nrs", JSON.stringify(selectedValue));
    window.location = '/AssBPI'
  };

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

    const handleHome = (event) => {
      window.location = '/Home'
    }
  
    const handleRegister = (event) => {
      window.location = '/register'
    }
  
      const handleAssessment = (event) => {
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

    const handleBack = (event) => {
      event.preventDefault();
      
      Swal.fire({
        title: 'ย้อนกลับ',
        text: 'คุณแน่ใจว่าต้องการย้อนกลับและลบข้อมูลที่เลือกไว้?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#33AC74',
        cancelButtonColor: '#F26660',
        confirmButtonText: 'ใช่, ย้อนกลับ!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token2');
          window.location = '/asspatientfound';
        }
      });
    };
  

  if (isLoaded) return (<div>Loading</div>)
  else {
  return (
   <div>
            <div class="fullscreen-block">
            <div class="backpage">
            <IconButton aria-label="Back">
            <ArrowBackIosIcon onClick={handleBack} sx={{ fontSize: 60 }} style={{ color: 'black' }} />
            </IconButton>
            </div>
            <div class="username">
            <IconButton
            sx={{color: 'black'}}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
              {decoded.assessor_fname} {decoded.assessor_lname}<PermIdentityIcon  sx={{ fontSize: 35 }} /></Typography> </IconButton></div>
            
            <div className='assessmentForm'>
            <Typography component="h1" variant="h3" fontFamily={'kanit'} marginTop={2}>
            ประเมินว่าคะแนนความปวดโดยเฉลี่ย ในรอบ 7 วันที่ผ่านมา
            </Typography>
          
            <Typography component="h1"  sx={{ fontSize: 35 }} fontFamily={'kanit'} marginTop={2}>
            โปรดเลือกความปวดที่ผ่านมา
            </Typography>
           
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <div className='radioForm'>
            {renderRadio('0', '#33AC74')}
            {renderRadio('1', '#33AC74')}
            {renderRadio('2', '#33AC74')}
            {renderRadio('3', '#3DC988')}
            {renderRadio('4', '#3DC988')}
            {renderRadio('5', '#737B89')}
            {renderRadio('6', '#F69994')}
            {renderRadio('7', '#F69994')}
            {renderRadio('8', '#F26660')}
            {renderRadio('9', '#F26660')}
            {renderRadio('10', '#E92623')}
            </div>
            <Button
                type="submit"
                maxWidth= "45"
                variant="contained"
                sx={{
                  mt: '70px',
                  mb: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '200px' 
                }}              >
                <Typography variant="h5" fontFamily={'kanit'} fontSize={30}>
                ต่อไป
                </Typography>
              </Button>
            </Box>

            </div>


            <List sx={{ maxWidth: 180 , height: '97.4vh' , margin: '0' , bgcolor: '#5246E9' }}>           
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
  );
}
}

export default App;