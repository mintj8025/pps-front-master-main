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
import './AssPPS.css';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function App() {

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleClickOpen5 = () => {
    setOpen5(true);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };

  const [movement, setMovement] = React.useState(null);
  const [activityAndDisease, setActivityAndDisease] = React.useState(null);
  const [dailyRoutines, setDailyRoutines] = React.useState(null);
  const [eating, setEating] = React.useState(null);
  const [awareness, setAwareness] = React.useState(null);

  const handleMovement = (event) => {
    setMovement(event.target.value);
  };

  const handleActivityAndDisease = (event) => {
    setActivityAndDisease(event.target.value);
  };

  const handleDailyRoutines = (event) => {
    setDailyRoutines(event.target.value);
  };

  const handleEating = (event) => {
    setEating(event.target.value);
  };

  const handleAwareness = (event) => {
    setAwareness(event.target.value);
  };

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
  }, [decoded2]); // เพิ่ม decoded2 เข้าไปในอาร์เรย์นี้

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isInputValid()) {
      return; // หยุดการดำเนินการถ้าข้อมูลไม่ถูกต้อง
    }
    const savedNrs = localStorage.getItem('nrs');
    const parsedNrs = JSON.parse(savedNrs);
    const savedActivity = localStorage.getItem('activity');
    const parsedActivity = JSON.parse(savedActivity);
    const savedEmotion = localStorage.getItem('emotion');
    const parsedEmotion = JSON.parse(savedEmotion);
    const savedWalk = localStorage.getItem('walk');
    const parsedWalk = JSON.parse(savedWalk);
    const savedWork = localStorage.getItem('work');
    const parsedWork = JSON.parse(savedWork);
    const savedRelationship = localStorage.getItem('relationship');
    const parsedRelationship = JSON.parse(savedRelationship);
    const savedSleep = localStorage.getItem('sleep');
    const parsedSleep = JSON.parse(savedSleep);
    const savedHappy = localStorage.getItem('happy');
    const parsedHappy = JSON.parse(savedHappy);
    const savedSs = localStorage.getItem('ss');
    const parsedSs = JSON.parse(savedSs);
    const savedNv = localStorage.getItem('nv');
    const parsedNv = JSON.parse(savedNv);
    const savedSfi72 = localStorage.getItem('sfi72');
    const parsedSfi72 = JSON.parse(savedSfi72);
    const savedSatisfied = localStorage.getItem('satisfied');
    const parsedSatisfied = JSON.parse(savedSatisfied);
    const jsonData = {
      patient_HN: decoded2.patient_HN,
      patient_fname: decoded2.patient_fname,
      patient_lname: decoded2.patient_lname,
      patient_status: decoded2.patient_status,
      patient_visit: decoded2.patient_visit,
      date_of_first: decoded2.date_of_first,
      nrs: parsedNrs,
      activity: parsedActivity,
      emotion: parsedEmotion,
      walk: parsedWalk,
      work: parsedWork,
      relationship: parsedRelationship,
      sleep: parsedSleep,
      happy: parsedHappy,
      satisfied: parsedSatisfied,
      movement: movement,
      activityAndDisease: activityAndDisease,
      dailyRoutines: dailyRoutines,
      eating: eating,
      awareness: awareness,
      ss: parsedSs,
      nv: parsedNv,
      sfi72: parsedSfi72,
      assessor_fname: decoded.assessor_fname,
      assessor_lname: decoded.assessor_lname,
      assessment_status: 'ยังไม่ export ออกจากระบบ',
    };
    fetch('http://localhost:7000/assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        let ppsValue;

        if (data.status) {
            switch (data.status) {
                case 'pps100':
                    ppsValue = '100';
                    break;
                case 'pps90':
                    ppsValue = '90';
                    break;
                case 'pps80':
                    ppsValue = '80';
                    break;
                case 'pps70':
                    ppsValue = '70';
                    break;
                case 'pps60':
                    ppsValue = '60';
                    break;
                case 'pps50':
                    ppsValue = '50';
                    break;
                case 'pps40':
                    ppsValue = '40';
                    break;
                case 'pps30':
                    ppsValue = '30';
                    break;
                case 'pps20':
                    ppsValue = '20';
                    break;
              case 'pps10':
                    ppsValue = '10';
                    break;
                default:
                    break;
            }
    
            Swal.fire({
                icon: 'success',
                title: 'การประเมินเสร็จสมบูรณ์',
                showConfirmButton: false,
                timer: 2000,
            }).then((value) => {
                localStorage.setItem('pps', ppsValue);
                window.location = '/ppsResult';
            });
        } else {
            alert(data.message);
        }
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const [isLoaded, setIsLoaded] = useState(true);
  const [decoded, setAssessor] = useState([]);

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
    window.location = '/Home';
  };

  const handleRegister = (event) => {
    window.location = '/register';
  };

  const handleAssessment = (event) => {
    window.location = '/asspatientfound';
  };

  const handleHistory = (event) => {
    window.location = '/History';
  };
  
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
        window.location = '/sideeffect';
      }
    });
  };

  const isInputValid = () => {
    if (!movement || !activityAndDisease || !dailyRoutines || !eating || !awareness) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return false; 
    }
    return true; 
  };

  if (isLoaded) return <div>Loading</div>;
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
            <IconButton sx={{ color: 'black' }}>
              <Typography variant="h5" component="div" fontFamily={'lightkanit'}>
                {decoded.assessor_fname} {decoded.assessor_lname}
                <PermIdentityIcon sx={{ fontSize: 35 }} />
              </Typography>{' '}
            </IconButton>
          </div>

          <div className="ppsForm">
            <Typography component="h1" variant="h3" x={{ fontSize: 35 }} fontFamily={'kanit'}>
              แบบประเมินระดับผู้ป่วยที่ได้รับการดูแลแบบประคับประคอง
            </Typography>

            <Typography component="h1" sx={{ fontSize: 35 }} fontFamily={'kanit'} marginTop={2}>
              ( Palliative Performance Scale for adult Suandok )
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, ml: 0 }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
                  1. การเคลื่อนไหว
                </Typography>
                  <React.Fragment>
                    <InfoIcon sx={{ fontSize: 30 }} variant="outlined" onClick={handleClickOpen1} />
                    <BootstrapDialog
                      onClose={handleClose1}
                      aria-labelledby="customized-dialog-title"
                      open={open1}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: 30, fontFamily: 'Kanit'}}>
                        1. การเคลื่อนไหวร่างกาย (Ambulation)
                        </Typography>
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose1}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>การเคลื่อนไหวร่างกาย (Ambulation)</span> แบ่งเป็น 5 ระดับ ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. การเคลื่อนไหวปกติ ( full ambulation)</span> อยู่ในระดับ PPS ร้อยละ 80 - ระดับ PPS ร้อยละ100 ผู้ป่วยสามารถเดินได้ด้วยตนเอง สามารถลุกจากเตียงได้เอง สามารถปฏิบัติกิจวัตรประจำวันด้วยตนเอง ทำงานอย่างที่เคยทำได้ตามปกติ สามารถประกอบอาชีพได้ สามารถทำงานอดิเรก หรือ สามารถทำกิจกรรมงานบ้านอย่างที่เคยทำได้ตามปกติ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. ความสามารถในการเคลื่อนไหวร่างกายลดลง (reduced ambulation)</span>อยู่ในระดับ  PPS ร้อยละ 60 - ระดับ PPS ร้อยละ 70 เมื่อพิจารณาโดยใช้คอลัมน์อื่นร่วมด้วย (adjacent column) พบว่า<span style={{ fontWeight: 'bold' }}>ผู้ป่วยที่มีการเคลื่อนไหวลดลง (reduced ambulation) จะเป็นผู้ป่วยที่ไม่สามารถทำงานได้อย่างที่เคยทำตามปกติ</span> ไม่สามารถประกอบอาชีพหรือไม่สามารถทำงานอดิเรก หรือ ไม่สามารถทำกิจกรรมงานบ้านอย่างที่เคยทำตามปกติ  แต่<span style={{ fontWeight: 'bold' }}>ผู้ป่วยยังคงสามารถเดินได้ด้วยตนเองหรือมีความสามารถในการเคลื่อนย้าย (transfer) ด้วยตนเอง เช่น ลุกจากเตียงได้เอง มีการเคลื่อนไหวข้อต่างๆ ได้ด้วยตนเอง</span>
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        ในระดับ PPS ร้อยละ60 ผู้ป่วยมีความจำเป็นที่ต้องได้รับความช่วยเหลือในการทำกิจวัตรประจำวันเป็นบางครั้งหรือบางเรื่อง
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        แต่ในระดับ PPS ร้อยละ70 ผู้ป่วยสามารถทำกิจวัตรประจำวันได้ด้วยตนเอง เช่น
                        อาบน้ำเอง เช็ดตัวเอง ใส่เสื้อผ้าเอง ล้างหน้าแปรงฟันได้เอง ขับถ่ายอุจจาระและปัสสาวะได้เอง เดินได้เอง รับประทานอาหารได้เอง
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. นั่งหรือนอนเป็นส่วนใหญ่ (mainly sit/lie)</span>อยู่ในระดับ PPS ร้อยละ 50 ผู้ป่วยกลุ่มนี้ไม่สามารถ
                        ทำงานต่างๆที่เคยทำได้เลย ผู้ป่วยอ่อนเพลียมากจนไม่สามารถทำงานอดิเรกหรือไม่สามารถทำงานบ้านอย่างที่เคยทำ รวมทั้งต้องการความช่วยเหลือในการทำกิจวัตรประจำวันมากขึ้นกว่าผู้ป่วยที่มีความสามารถในการเคลื่อนไหวลดลง ( reduced ambulation) แต่ต้องการความช่วยเหลือในการทำกิจวัตรประจำวันน้อยกว่า<span style={{ fontWeight: 'bold' }}>ผู้ป่วยที่นอนอยู่บนเตียงเป็นส่วนใหญ่</span>
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. นอนอยู่บนเตียงเป็นส่วนใหญ่ (mainly in bed)</span>อยู่ในระดับ PPS ร้อยละ 40 ผู้ป่วยกลุ่มนี้อ่อนเพลียมากจึงทำกิจกรรมได้น้อยมาก ต้องการความช่วยเหลือในการทำกิจวัตรประจำวันเป็นส่วนใหญ่
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>จ. นอนอยู่บนเตียงตลอดเวลา (totally bed bound)</span>อยู่ในระดับ PPS ร้อยละ 10 ถึงระดับ PPS
                        ร้อยละ 30 เนื่องจากผู้ป่วยอ่อนเพลียอย่างมากหรือผู้ป่วยที่ไม่สามารถลุกจากเตียงได้เอง และไม่สามารถทำกิจวัตรประจำวันทุกอย่างด้วยตนเอง
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>จะเห็นว่านั่งหรือนอนเป็นส่วนใหญ่ (mainly sit/lie), นอนบนเตียงเป็นส่วนใหญ่ (mainly inbed), นอนอยู่บนเตียงตลอดเวลา (totally bed bound)</span>มีความหมายคล้ายคลึงกัน แต่มีความแตกต่างกันที่สัดส่วนของเวลาที่ใช้ในการสามารถลุกนั่งหรือต้องนอนมากกว่ากัน
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose1}>
                        <Typography sx={{ fontFamily: 'Kanit'}}>
                        เข้าใจแล้ว
                        </Typography>
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
                  <InputLabel id="demo-simple-select-label-movement" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                    การเคลื่อนไหว
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-movement"
                    id="demo-simple-select-movement"
                    value={movement}
                    label="การเคลื่อนไหว"
                    sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                    onChange={handleMovement}
                  >
                    <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      Select
                    </MenuItem>
                    <MenuItem value="เคลื่อนไหวปกติ"sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      เคลื่อนไหวปกติ
                    </MenuItem>
                    <MenuItem value="ความสามารถในการเคลื่อนไหวลดลง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      ความสามารถในการเคลื่อนไหวลดลง
                    </MenuItem>
                    <MenuItem value="นั่งหรือนอนเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      นั่งหรือนอนเป็นส่วนใหญ่
                    </MenuItem>
                    <MenuItem value="นอนอยู่บนเตียงเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      นอนอยู่บนเตียงเป็นส่วนใหญ่
                    </MenuItem>
                    <MenuItem value="นอนอยู่บนเตียงตลอดเวลา" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                      นอนอยู่บนเตียงตลอดเวลา
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
                  2. การปฏิบัติกิจกรรมและการดำเนินโรค
                </Typography>
                <React.Fragment>
                    <InfoIcon sx={{ fontSize: 30 }} variant="outlined" onClick={handleClickOpen2} />
                    <BootstrapDialog
                      onClose={handleClose2}
                      aria-labelledby="customized-dialog-title"
                      open={open2}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: 30, fontFamily: 'Kanit'}}>
                        2. การปฏิบัติกิจกรรม ( Activity ) และการดำเนินโรค ( Extent of disease )
                        </Typography>
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose2}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>2.1 การปฏิบัติกิจกรรม ( Activity ) </span>พิจารณาจากความสามารถของผู้ป่วยในการปฏิบัติกิจกรรมต่างๆ ว่าทำได้เหมือนเดิมหรือไม่ ได้แก่ การทำงาน การทำงานอดิเรกหรือการทำกิจกรรมอื่นๆ  แบ่งเป็น 6 ระดับ ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. ทำกิจกรรมและทำงานได้ตามปกติ ( normal activity & work ) </span>หมายถึง ผู้ป่วยสามารถทำงานได้อย่างที่เคยทำตามปกติ สามารถประกอบอาชีพได้เหมือนเดิม สามารถทำงานบ้านได้ และทำงานอดิเรกได้อย่างที่เคยทำตามปกติ รวมทั้งสามารถทำกิจกรรมต่างๆได้ตามปกติ เช่น เดินได้โดยไม่เหนื่อย
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติ ( normal activity with effort )</span> หมายถึง ผู้ป่วยต้องใช้แรงมากขึ้นในการปฏิบัติกิจกรรม เช่น การเดิน การทำงาน หรือ การประกอบอาชีพ ทำงานอดิเรก ทำงานบ้านอย่างที่เคยทำตามปกติ
                        </Typography>                
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. ไม่สามารถทำงานได้ตามปกติ (unable normal job/work) </span> หมายถึง ผู้ป่วยไม่สามารถทำงานอย่างที่เคยทำตามปกติ หรือ ไม่สามารถประกอบอาชีพได้เหมือนเดิม แต่สามารถทำงานอดิเรก หรืองานบ้านได้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. ไม่สามารถทำงานอดิเรก หรืองานบ้านได้ ( unable hobby / house work ) </span> หมายถึง ผู้ป่วยอ่อนเพลียจนไม่สามารถทำงานอดิเรก หรือไม่สามารถทำงานบ้านอย่างที่เคยทำ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>จ. ไม่สามารถทำงานได้เลย ( unable to do any work ) </span> หมายถึง ผู้ป่วยอ่อนเพลียมากจนไม่สามารถทำงานอดิเรก หรือไม่สามารถทำงานบ้านอย่างที่เคยทำและไม่สามารถทำงานต่าง ๆ ได้จึงนั่งหรือนอนเป็นส่วนใหญ่ รวมทั้งต้องการความช่วยเหลือในการทำกิจวัตรประจำวันมากขึ้นกว่าผู้ป่วยที่มีความสามารถใน การเคลื่อนไหวลดลง ( reduced ambulation)
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ฉ. ทำกิจกรรมได้น้อยมาก	( unable to do most activity )  </span> หมายถึง ผู้ป่วยอ่อนเพลียมากหรือเหนื่อยล้าจึงต้องการความช่วยเหลือในการปฏิบัติกิจกรรมเป็นส่วนใหญ่ ตัวอย่างเช่น ผู้ป่วยต้องการความช่วยเหลือในการเข้าห้องน้ำและต้องการความช่วยเหลือในการล้างมือ ล้างหน้า แปรงฟัน การขับถ่าย อุจจาระและปัสสาวะ แต่ผู้ป่วยสามารถรับประทานอาหารได้เอง หรือต้องการความช่วยเหลือเล็กน้อยในการรับประทานอาหาร
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ช. ไม่สามารถทำกิจกรรมใดๆ ( unable to do any activity )  </span> หมายถึง ผู้ป่วยอ่อนเพลียมากหรือเป็นผู้ป่วยที่ไม่รู้สึกตัว จึงไม่สามารถทำกิจกรรมใด ๆ ได้เลยและต้องการการดูแลในการปฏิบัติกิจวัตรประจำวันทั้งหมด
                        </Typography>

                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>2.2 การดำเนินโรค ( Extent of disease )</span> การดำเนินโรค แบ่งเป็น 4 ระดับ ตามการตรวจร่างกายและการวินิจฉัยทางการแพทย์ซึ่งแสดงถึงระดับความรุนแรงของโรค ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. ไม่มีอาการของโรค ( no evidence of disease )</span> 
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. มีอาการของโรคบางอาการ (some) </span> ตัวอย่างเช่น ผู้ป่วยโรคมะเร็งเต้านมที่มีการกลับเป็นซ้ำของโรคเฉพาะแห่ง (local recurrence) จะอยู่ในระดับมีอาการของโรคบางอาการ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. มีอาการของโรคอย่างมาก  (significant  disease)  </span> ถ้ามีการแพร่กระจายของโรคมะเร็งไปที่อวัยวะอื่น	1 แห่ง หรือ 2 แห่ง เช่น ปอด หรือ กระดูก จะอยู่ในระดับ<span style={{ fontWeight: 'bold' }}>มีอาการของโรคอย่างมาก</span>

                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. มีการลุกลามของโรค (extensive disease ) </span> หรือ ถ้ามีการแพร่กระจายของโรคมะเร็งไปที่อวัยวะหลายแห่ง ได้แก่ ปอด กระดูก ตับ สมอง แล้วมีภาวะแทรกซ้อนเกิดขึ้น เช่น มีภาวะแคลเซียมสูงในเลือดสูง หรืออื่น ๆ หรือผู้ป่วยมีอาการเกิดขึ้นมากมายหลายอาการจะอยู่ในระดับมีการลุกลามของโรคการดำเนินโรค ( Extent of disease ) ยังหมายความถึงความก้าวหน้าของโรค ( progression of disease) ทั้งที่กำลังให้การรักษา ( active treatments ) อยู่

                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose2}>
                        <Typography sx={{ fontFamily: 'Kanit'}}>
                        เข้าใจแล้ว
                        </Typography>
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
                  <InputLabel id="demo-simple-select-label-activity" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                    การปฏิบัติกิจกรรมและการดำเนินโรค
                  </InputLabel>
                  {movement === "เคลื่อนไหวปกติ" ? (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value="ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค
                      </MenuItem>
                      <MenuItem value="ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ
                      </MenuItem>
                      <MenuItem value="ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติและมีอาการของโรคบางอาการ" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติและมีอาการของโรคบางอาการ
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค
                      </MenuItem>
                    </Select>
                  ) : movement === "ความสามารถในการเคลื่อนไหวลดลง" ? (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value="ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค
                      </MenuItem>
                    </Select>
                  ) : movement === "นั่งหรือนอนเป็นส่วนใหญ่" ? (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value="ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค
                      </MenuItem>
                    </Select>
                  ) : movement === "นอนอยู่บนเตียงเป็นส่วนใหญ่" ? (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value="ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค
                      </MenuItem>
                      <MenuItem value="ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค
                      </MenuItem>
                    </Select>
                  ) : movement === "นอนอยู่บนเตียงตลอดเวลา" ? (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value="ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก
                      </MenuItem>
                    </Select>
                  ) : (
                    <Select
                      labelId="demo-simple-select-label-activity"
                      id="demo-simple-select-activity"
                      value={activityAndDisease}
                      label="การปฏิบัติกิจกรรมและการดำเนินโรค"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleActivityAndDisease}
                    >
                      <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        Select above first
                      </MenuItem>
                    </Select>
                  )}
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
                  3. การทำกิจกรรมประจำวัน
                </Typography>
                <React.Fragment>
                    <InfoIcon sx={{ fontSize: 30 }} variant="outlined" onClick={handleClickOpen3} />
                    <BootstrapDialog
                      onClose={handleClose3}
                      aria-labelledby="customized-dialog-title"
                      open={open3}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: 30, fontFamily: 'Kanit'}}>
                        3. การทำกิจวัตรประจำวัน (Self care) 
                        </Typography>
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose3}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>การทำกิจวัตรประจำวัน (Self care) </span> ได้แก่ การอาบน้ำ การล้างหน้า การแปรงฟัน การใส่เสื้อผ้า การรับประทานอาหาร การขับถ่ายอุจจาระและปัสสาวะ การใช้โทรศัพท์ การทำกิจวัตรประจำวัน แบ่งเป็น 5 ระดับ ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. ทำได้เอง ( full self care ) </span> หมายถึง ผู้ป่วยสามารถทำกิจวัตรประจำวันทุกอย่างด้วยตนเอง
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. ต้องการความช่วยเหลือเป็น บางครั้งหรือบางเรื่อง ( occasional assistance necessary )</span> หมายถึง ส่วนใหญ่ผู้ป่วยสามารถช่วยเหลือตนเองได้ เช่น ลุกจากเตียงได้เอง เดินได้เอง ล้างหน้าเองไปห้องน้ำเอง และรับประทานอาหารด้วยตนเอง แต่ในบางครั้งผู้ป่วยต้องการความช่วยเหลือเมื่อมีความจำเป็น เช่น บางวันผู้ป่วยมีอาการอ่อนเพลียเวียนศีรษะ จึงต้องการให้เจ้าหน้าที่พยาบาลช่วยเหลือในการพาไปเข้าห้องน้ำโดยอาจเป็น 1 ครั้ง /วัน หรือ 2 - 3 ครั้งใน 1 สัปดาห์
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. ต้องการความช่วยเหลือมากขึ้น ( considerable assistance required )</span> หมายถึง ผู้ป่วยต้องการความช่วยเหลือในการปฏิบัติกิจกรรมบางอย่างเป็นประจำทุกวันจากผู้ดูแลจำนวน 1 คน ได้แก่ การลุกจากเตียงการเดิน การล้างหน้า การไปห้องน้ำและการรับประทานอาหารเป็นประจำทุกวันจากผู้ดูแลจำนวน	1 คน ตัวอย่างเช่น ผู้ป่วยต้องการความช่วยเหลือจากผู้ดูแลในการเดินไปเข้าห้องน้ำเป็นประจำทุกครั้งที่ไปเข้าห้องน้ำ แต่กิจกรรมอื่น ๆ ผู้ป่วยสามารถทำได้เอง เช่น หวีผม แปรงฟัน ล้างมือ ล้างหน้า สำหรับการรับประทานอาหารผู้ป่วยรับประทานได้เอง แต่ต้องมีผู้ดูแลช่วยเหลือในการตัดอาหารให้เป็นชิ้นเล็ก ๆ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. ต้องการความช่วยเหลือเป็นส่วนใหญ่ (mainly assistance)</span> หมายถึง ผู้ป่วยต้องการความช่วยเหลือในการปฏิบัติกิจกรรมเป็นส่วนใหญ่  ตัวอย่างเช่น ผู้ป่วยต้องการความช่วยเหลือในการเข้าห้องน้ำและต้องการความช่วยเหลือในการล้างมือ ล้างหน้า โกนหนวด การขับถ่ายอุจจาระปัสสาวะ แต่ผู้ป่วยยังสามารถรับประทานอาหารได้เอง หรือต้องการความช่วยเหลือเล็กน้อยในการรับประทานอาหาร ทั้งนี้ความต้องการการช่วยเหลือจะเปลี่ยนแปลงไปตามสภาพความเหนื่อยล้า (fatigue) ของผู้ป่วยในแต่ละวัน

                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>จ. ต้องการความช่วยเหลือทั้งหมด  (total  care) </span>หมายถึง  ผู้ป่วยไม่สามารถทำกิจวัตรประจำวันใด ๆ ด้วยตนเอง จึงต้องการผู้ดูแลช่วยเหลือในการทำกิจวัตรประจำวันทั้งหมด ทั้งนี้ความต้องการการช่วยเหลือขึ้นอยู่กับสภาพอาการทางคลินิกของผู้ป่วย เช่น ผู้ป่วยบางรายอาจไม่สามารถเคี้ยวหรือกลืนอาหารได้เอง ดังนั้นผู้ดูแลอาจต้องให้อาหารทางสายยางแก่ผู้ป่วย ผู้ป่วยบางรายอาจเคี้ยวหรือกลืนอาหารได้เอง แต่ต้องการผู้ดูแลช่วยป้อนอาหารให้
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose3}>
                        <Typography sx={{ fontFamily: 'Kanit'}}>
                        เข้าใจแล้ว
                        </Typography>
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
                  <InputLabel id="demo-simple-select-label-daily" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                    การทำกิจกรรมประจำวัน
                  </InputLabel>
                    {activityAndDisease === "ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค" || activityAndDisease === "ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ" || activityAndDisease === "ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติและมีอาการของโรคบางอาการ" || activityAndDisease === "ไม่สามารถทำงานได้ตามปกติและมีอาการของโรคอย่างมาก" ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="ทำได้เอง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ทำได้เอง
                        </MenuItem>
                        <MenuItem value="ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือมากขึ้น" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือมากขึ้น
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือเป็นส่วนใหญ่
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือทั้งหมด" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือทั้งหมด
                        </MenuItem>
                      </Select>
                    ) : activityAndDisease === "ไม่สามารถทำงานอดิเรกหรืองานบ้านได้และมีอาการของโรคอย่างมาก" ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการช่วยเหลือเป็นบางครั้ง/บางเรื่อง
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือมากขึ้น" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือมากขึ้น
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือเป็นส่วนใหญ่
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือทั้งหมด" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือทั้งหมด
                        </MenuItem>
                        </Select>
                    ) : activityAndDisease === "ไม่สามารถทำงานได้เลยและมีการลุกลามของโรค" ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="ต้องการความช่วยเหลือมากขึ้น" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือมากขึ้น
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือเป็นส่วนใหญ่
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือทั้งหมด" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือทั้งหมด
                        </MenuItem>
                        </Select>
                    ) : activityAndDisease === "ทำกิจกรรมได้น้อยมากและมีการลุกลามของโรค" ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="ต้องการความช่วยเหลือเป็นส่วนใหญ่" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือเป็นส่วนใหญ่
                        </MenuItem>
                        <MenuItem value="ต้องการความช่วยเหลือทั้งหมด" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือทั้งหมด
                        </MenuItem>
                        </Select>
                    ) : activityAndDisease === "ไม่สามารถทำกิจกรรมใดๆและมีการลุกลามของโรค" ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="ต้องการความช่วยเหลือทั้งหมด" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ต้องการความช่วยเหลือทั้งหมด
                        </MenuItem>
                        </Select>
                    ) : (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={dailyRoutines}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                      <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                        Select above first
                      </MenuItem>
                      </Select>
                    )}
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
                  4. การรับประทานอาหาร
                </Typography>
                <React.Fragment>
                    <InfoIcon sx={{ fontSize: 30 }} variant="outlined" onClick={handleClickOpen4} />
                    <BootstrapDialog
                      onClose={handleClose4}
                      aria-labelledby="customized-dialog-title"
                      open={open4}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: 30, fontFamily: 'Kanit'}}>
                        4. การรับประทานอาหาร ( intake )  
                        </Typography>
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose4}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>การรับประทานอาหาร ( intake ) </span> การเปลี่ยนแปลงในการรับประทานอาหาร มี 4 ระดับ ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. รับประทานอาหารปกติ ( normal intake ) </span> หมายถึง ผู้ป่วยรับประทานอาหารได้ตามปกติ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. ลดลง ( reduced intake )</span> หมายถึง ผู้ป่วยรับประทานอาหารได้ลดลงจากเดิม
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. จิบน้ำได้เล็กน้อย ( minimal to sips ) </span> หมายถึง ผู้ป่วยสามารถจิบน้ำหรืออาหารเหลวได้เล็กน้อย

                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. รับประทานทางปากไม่ได้ ( mouth care only ) </span> หมายถึง ผู้ป่วยไม่สามารถกลืนอาหารได้ ถ้ากลืนอาหารจะมีอาการสำลักหรือเสี่ยงต่อการสำลัก เนื่องจากผู้ป่วยซึมหลับหรือไม่รู้สึกตัว หรือสับสน ผู้ป่วย บางรายได้รับการใส่สายยางเพื่อให้อาหารโดยใส่ทางจมูกลงสู่กระเพาะอาหาร ( nasogastric tube ) จึงต้องดูแลทำความสะอาดช่องปากให้ผู้ป่วย
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose4}>
                        <Typography sx={{ fontFamily: 'Kanit'}}>
                        เข้าใจแล้ว
                        </Typography>
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
                  <InputLabel id="demo-simple-select-label-eating" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                    การรับประทานอาหาร
                  </InputLabel>
                    {dailyRoutines === "ทำได้เอง" && (activityAndDisease === "ทำกิจกรรมและทำงานได้ตามปกติและไม่มีอาการของโรค" || activityAndDisease === "ทำกิจกรรมและทำงานได้ตามปกติและมีอาการของโรคบางอาการ") ? (
                      <Select
                      labelId="demo-simple-select-label-eating"
                      id="demo-simple-select-eating"
                      value={eating}
                      label="การรับประทานอาหาร"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleEating}
                      >
                        <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          Select
                        </MenuItem>
                        <MenuItem value="ปกติ" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ปกติ
                        </MenuItem>
                        <MenuItem value="ปกติ หรือ ลดลง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ปกติ หรือ ลดลง
                        </MenuItem>
                        <MenuItem value="จิบน้ำได้เล็กน้อย" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          จิบน้ำได้เล็กน้อย
                        </MenuItem>
                        <MenuItem value="รับประทานอาหารทางปากไม่ได้" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รับประทานอาหารทางปากไม่ได้
                        </MenuItem>
                      </Select>
                    ) : (
                      <Select
                      labelId="demo-simple-select-label-eating"
                      id="demo-simple-select-eating"
                      value={eating}
                      label="การรับประทานอาหาร"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleEating}
                      >
                        <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          Select
                        </MenuItem>
                        <MenuItem value="ปกติ*" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ปกติ
                        </MenuItem>
                        <MenuItem value="ปกติ หรือ ลดลง" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ปกติ หรือ ลดลง
                        </MenuItem>
                        <MenuItem value="จิบน้ำได้เล็กน้อย" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          จิบน้ำได้เล็กน้อย
                        </MenuItem>
                        <MenuItem value="รับประทานอาหารทางปากไม่ได้" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รับประทานอาหารทางปากไม่ได้
                        </MenuItem>
                        </Select>
                    )}
                </FormControl>
              </Box>

              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ fontSize: 30, fontFamily: 'lightKanit', width: '50%' }}>
                  5. ระดับความรู้สึกตัว
                </Typography>
                <React.Fragment>
                    <InfoIcon sx={{ fontSize: 30 }} variant="outlined" onClick={handleClickOpen5} />
                    <BootstrapDialog
                      onClose={handleClose5}
                      aria-labelledby="customized-dialog-title"
                      open={open5}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <Typography sx={{ fontSize: 30, fontFamily: 'Kanit'}}>
                        5.ระดับความรู้สึกตัว (conscious level)   
                        </Typography>
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose5}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom sx={{ fontSize: 20, fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ระดับความรู้สึกตัว (conscious level)  </span> แบ่งเป็น 4 ระดับ ดังนี้
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ก. รู้สึกตัวดี (full consciousness) </span> หมายถึง รู้สึกตัวดี และรับรู้วันเวลาและสถานที่ได้ปกติ มีสติสัมปชัญญะดี มีความสามารถในการรับรู้ ทั้งด้านความคิด ความจำ ความรู้สึก เป็นต้น
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ข. สับสน (confusion)</span> หมายถึง การที่ผู้ป่วยมีอาการสับสนฉับพลัน(delirium) หรือ มีภาวะสมองเสื่อม (dementia) มีระดับความรู้สึกตัวลดลง ทั้งนี้อาจจะมีอาการเล็กน้อย หรือ ปานกลาง หรือรุนแรง	ที่เกิดจากสาเหตุต่าง ๆ
                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ค. ง่วงซึม (drowsiness)  </span> หมายถึง การที่ผู้ป่วยมีอาการเหนื่อยล้า (fatigue) หรือมีอาการง่วงซึมจากการได้รับผลข้างเคียงจากยา หรือมีอาการสับสนเฉียบพลัน หรือมีอาการอยู่ในภาวะใกล้ตาย บางครั้งรวมถึงอาการมึนงง (stupor)

                        </Typography>
                        <Typography gutterBottom sx={{ fontFamily: 'Kanit'}}>
                        <span style={{ fontWeight: 'bold' }}>ง. ไม่รู้สึกตัว (coma)  </span> หมายถึง ผู้ป่วยไม่มีการตอบสนองต่อคำพูด หรือไม่ตอบสนองต่อสิ่งกระตุ้นทางร่างกาย (verbal or physical stimuli) ทั้งนี้ผู้ป่วยอาจมีปฏิกิริยาการตอบสนองแบบอัตโนมัติ (reflex) หรือไม่มีปฏิกิริยาการตอบสนองแบบอัตโนมัติได้ ภาวะไม่รู้สึกตัวของผู้ป่วยอาจจะเปลี่ยนแปลงตลอด 24 ชั่วโมง 
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose5}>
                        <Typography sx={{ fontFamily: 'Kanit'}}>
                        เข้าใจแล้ว
                        </Typography>
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                <FormControl sx={{ m: 1, minWidth: 300, width: '50%' }}>
                  <InputLabel id="demo-simple-select-label-awareness" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                    ระดับความรู้สึกตัว
                  </InputLabel>
                    {(eating === "ปกติ" && dailyRoutines === "ทำได้เอง") || (eating === "ปกติ หรือ ลดลง" && dailyRoutines === "ทำได้เอง") ? (
                      <Select
                      labelId="demo-simple-select-label-awareness"
                      id="demo-simple-select-awareness"
                      value={awareness}
                      label="ระดับความรู้สึกตัว"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleAwareness}
                      >
                        <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          Select
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ สับสน
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน
                        </MenuItem>
                        <MenuItem value="ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน
                        </MenuItem>
                        </Select>
                    ) : (eating === "จิบน้ำได้เล็กน้อย" || (eating === "ปกติ หรือ ลดลง" && (dailyRoutines === "ต้องการความช่วยเหลือเป็นส่วนใหญ่" || dailyRoutines === "ต้องการความช่วยเหลือทั้งหมด"))) ? (
                      <Select
                      labelId="demo-simple-select-label-awareness"
                      id="demo-simple-select-awareness"
                      value={awareness}
                      label="ระดับความรู้สึกตัว"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleAwareness}
                    >
                        <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          Select
                        </MenuItem>
                         <MenuItem value="รู้สึกตัวดี*" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ สับสน*" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ สับสน
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน
                        </MenuItem>
                         <MenuItem value="ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน
                        </MenuItem>
                      </Select>
                    ) : eating === "รับประทานอาหารทางปากไม่ได้" ? (
                      <Select
                      labelId="demo-simple-select-label-awareness"
                      id="demo-simple-select-awareness"
                      value={awareness}
                      label="ระดับความรู้สึกตัว"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleAwareness}
                    >
                        <MenuItem value="ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน
                        </MenuItem>
                      </Select>
                     ) : eating === null ? (
                      <Select
                      labelId="demo-simple-select-label-daily"
                      id="demo-simple-select-daily"
                      value={awareness}
                      label="การทำกิจกรรมประจำวัน"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleDailyRoutines}
                     >
                        <MenuItem value="null" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                         select above first
                        </MenuItem>
                        </Select>
                    ) : (
                      <Select
                      labelId="demo-simple-select-label-awareness"
                      id="demo-simple-select-awareness"
                      value={awareness}
                      label="ระดับความรู้สึกตัว"
                      sx={{ fontSize: 20, fontFamily: 'lightKanit' }}
                      onChange={handleAwareness}
                    >
                        <MenuItem value={null} sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          Select
                        </MenuItem>
                         <MenuItem value="รู้สึกตัวดี*" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ สับสน
                        </MenuItem>
                        <MenuItem value="รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          รู้สึกตัวดี หรือ ง่วงซึม +/-สับสน
                        </MenuItem>
                        <MenuItem value="ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน" sx={{ fontSize: 20, fontFamily: 'lightKanit' }}>
                          ง่วงซึมหรือไม่รู้สึกตัว +/-สับสน
                        </MenuItem>
                      </Select>
                    )}
                </FormControl>
              </Box>


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
                    ประเมิน
                </Typography>
              </Button>
            </Box>
          </div>

          <div className="navbar" sx={{ position: 'sticky' }}>
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
