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
import './AssBPI.css';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function App() {

  const [activity, setActivity] = React.useState('0');
  const [emotion, setEmotion] = React.useState('0');
  const [walk, setWalk] = React.useState('0');
  const [work, setWork] = React.useState('0');
  const [relationship, setRelationship] = React.useState('0');
  const [sleep, setSleep] = React.useState('0');
  const [happy, setHappy] = React.useState('0');
  
  const handleActivity = (event) => {
    setActivity(event.target.value);
  };

  const handleEmotion = (event) => {
    setEmotion(event.target.value);
  };

  const handleWalk = (event) => {
    setWalk(event.target.value);
  };

  const handleWork = (event) => {
    setWork(event.target.value);
  };

  const handleRelationship = (event) => {
    setRelationship(event.target.value);
  };
  
  const handleSleep = (event) => {
    setSleep(event.target.value);
  };

  const handleHappy = (event) => {
    setHappy(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("activity", JSON.stringify(activity));
    localStorage.setItem("emotion", JSON.stringify(emotion));
    localStorage.setItem("walk", JSON.stringify(walk));
    localStorage.setItem("work", JSON.stringify(work));
    localStorage.setItem("relationship", JSON.stringify(relationship));
    localStorage.setItem("sleep", JSON.stringify(sleep));
    localStorage.setItem("happy", JSON.stringify(happy));
    window.location = '/SideEffect'
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

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }

  const handleHome = (event) => {
    window.location = '/Home';
  };

  const handleRegister = (event) => {
    window.location = '/register'
  }

  const handleAssessment = (event) => {
    window.location = '/asspatientfound'
  }

  const handleHistory = (event) => {
    window.location = '/History';
  };

  const controlProps1 = (item) => ({
    checked: activity === item,
    onChange: handleActivity,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps2 = (item) => ({
    checked: emotion === item,
    onChange: handleEmotion,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps3 = (item) => ({
    checked: walk === item,
    onChange: handleWalk,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps4 = (item) => ({
    checked: work === item,
    onChange: handleWork,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps5 = (item) => ({
    checked: relationship === item,
    onChange: handleRelationship,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps6 = (item) => ({
    checked: sleep === item,
    onChange: handleSleep,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const controlProps7 = (item) => ({
    checked: happy === item,
    onChange: handleHappy,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const renderRadioGroup = (data, controlPropsFn) => (
    <div className='radioGroup'>
      {data.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Radio
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 80,
                },
                color: item.color,
                '&.Mui-checked': {
                  color: item.color,
                },
              }}
              {...controlPropsFn(item.value)}
            />
          }
          label={
            <Typography
              component='div'
              style={{ fontSize: '30px', fontFamily: 'lightKanit' }}
            >
              {item.label}
            </Typography>
          }
          labelPlacement='bottom'
        />
      ))}
    </div>
  );

  const data = [
    { value: '0', color: '#33AC74', label: '0' },
    { value: '1', color: '#33AC74', label: '1' },
    { value: '2', color: '#33AC74', label: '2' },
    { value: '3', color: '#3DC988', label: '3' },
    { value: '4', color: '#3DC988', label: '4' },
    { value: '5', color: '#737B89', label: '5' },
    { value: '6', color: '#F69994', label: '6' },
    { value: '7', color: '#F69994', label: '7' },
    { value: '8', color: '#F26660', label: '8' },
    { value: '9', color: '#F26660', label: '9' },
    { value: '10', color: '#E92623', label: '10' },
  ];

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
        window.location = '/assnrs';
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
                
           <div className='ppsForm'>
           <Typography component="h1" sx={{ fontSize: 30 }} align="center" marginLeft={'20px'} color={'#737B89'} fontFamily={'kanit'}>
           การประเมินว่าใน 7 วันที่ผ่านมา อาการปวดนั้นได้รบกวน
           </Typography>
          
            <Typography component="h1"  sx={{ fontSize: 30 }} align="center" marginLeft={'20px'} color={'#737B89'} fontFamily={'kanit'}>
            การดำเนินชีวิตประจำวันของคนไข้ในด้านต่างๆมากน้อยเพียงใด
            </Typography>

            <Box sx={{ height: 60 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            1. กิจกรรมโดยทั่วไป
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <div className='radioActivity'>
            {renderRadioGroup(data, controlProps1)}
            </div>

            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            2. อารมณ์
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioEmotion'>
            {renderRadioGroup(data, controlProps2)}
            </div>
          
            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            3. ความสามารถในการเดิน
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioWalk'>
            {renderRadioGroup(data, controlProps3)}
            </div>

            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            4. งานประจำวัน
            </Typography>
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            (ทั้งงานประจำนอกบ้านและงานบ้าน)
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioWork'>
            {renderRadioGroup(data, controlProps4)}
            </div>
            
            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            5. ความสัมพันธ์กับผู้อื่น
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioRelationship'>
            {renderRadioGroup(data, controlProps5)}
            </div>

            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            6. การนอนหลับ
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioSleep'>
            {renderRadioGroup(data, controlProps6)}
            </div>
            
            <Box sx={{ height: 100 }} />
            <Typography component="h1"  sx={{ fontSize: 40 }} marginLeft={'0px'} marginTop={'20px'} align="center" color={'black'} fontFamily={'kanit'}>
            7. ความสุขในชีวิตประจำวัน
            </Typography>

            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'10px'} marginTop={'20px'} color={'#33AC74'} fontFamily={'kanit'}>
            ไม่มีผลกระทบเลย
            </Typography>
            <Typography component="h1" display="inline" sx={{ fontSize: 30 }} marginLeft={'500px'} marginTop={'20px'} color={'#E92623'} fontFamily={'kanit'}>
            มีผลกระทบอย่างมากที่สุด
            </Typography>

            <div className='radioSleep'>
            {renderRadioGroup(data, controlProps7)}
            </div>

           <Button
            type="submit"
            maxWidth="45"
            variant="contained"
            sx={{
              margin: 'auto',
              transform: 'translateY(120%)',
              display: 'block',
              marginBottom: '120px', 
              width: '200px' 
            }}
          >
             <Typography variant="h5" fontFamily={'kanit'} fontSize={30}>
                ต่อไป
                </Typography>
          </Button>



          </Box>
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
}

export default App;