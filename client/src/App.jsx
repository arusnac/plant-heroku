import './App.css';
import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AccountContext } from './components/Account';
import Container from 'react-bootstrap/Container';
import styles from './App.module.css'
import UploadImage from './components/UploadImage'
import { toggleStatus, setUsername } from './redux/UserSlice';
import Button from '@mui/material/Button';
import { Stack, Box, Modal, Snackbar, Alert, Typography  } from '@mui/material'
import PlantCard from './components/PlantCard'
import Nav from './components/Nav'
import { Navigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Footer from './components/Footer'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const [plantList, setPlantList] = useState([])
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [waterDate, setWaterDate] = useState('');
  const [valueDate, setValueDate] = useState('');
  
  //Pass the state of the delete confirmation window to the plant card in order to close it
  //After deletion
  const [confirmationWindow, setConfirmationWindow] = useState(false);

  //Alert for when plants are added or deleted, plus the style of the message
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [currentUser, setCurrentUser] = useState('');

  const { getUser } = useContext(AccountContext);

  const URL = 'http://localhost:5000/user/'
  const user = getUser();
  const PATH = useSelector((state) => state.user.value)
  const userStatus = useSelector((state) => state.user.value.user[0].isLoggedIn);
  const dispatch = useDispatch();

  //If the user is logged in get their plant collection on initial loading 
  useEffect(() => {
    const today = new Date()
    //get the userstate from local storage
    dispatch(toggleStatus(window.localStorage.getItem('userStatus')));
    console.log('here ' + userStatus)
    let userName = ''
    if (user) {
      userName = user.username;
      dispatch(setUsername(userName))
      setCurrentUser(userName)
      
      Axios.get(URL, {
        params:
          { username: userName }
      })
        .then((response) => {
          setPlantList(response.data.plants);
          console.log(plantList);
        })
    } else {
      userName = '';
      console.log('error')
    }

    console.log(plantList[0])

  }, [])

  const deletePlantCard = (e) => {
    Axios.post(
      "http://localhost:5000/user/delete",
      { id: e.target.value, username: currentUser, toDelete: 'plant' },
    ).then((response) => {
      handleClick('Plant removed!', 'warning')
    });
    const index = plantList.map(x => x._id).indexOf(e.target.value);
    if(index !== -1)
    {
    setPlantList([...plantList.slice(0,index), 
      ...plantList.slice(index + 1, plantList.length)]);    
      setConfirmationWindow(false);
    }
  }

  //Save the userstatus to local storage to maintain the app on refresh
  useEffect(() => {
    window.localStorage.setItem('userStatus', userStatus);
  }, [userStatus]);

  //Toggles the light info modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //style for modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //Handles the alert when plant is added
  const [openSnack, setOpenSnack] = useState(false);

  const handleClick = (message, sev) => {
    setAlertMessage(message);
    setSeverity(sev);
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  //Add plant to the user collection in mongoDB then update the list to 
  //rerender the the plant cards
  const updatePlant = () => {
    if(!name.length > 0 || !location.length >0) return alert('Please fill all requried fields.')
    else {
    let watered = waterDate.length > 0 ? waterDate : new Date().toLocaleDateString();
    let imagePath = PATH.imagePath;
    Axios.post(URL + 'update', { name, location, watered: watered, image: imagePath }, {
      params:
        { username: user.username }
    }).then((response) => {
      setPlantList([...plantList, { name, location, watered, image: imagePath, id: response._id }])
      handleClose();
      handleClick('Plant Added!', 'success');
    });
  }
  };

  const formatDate = (date) => {
    setValueDate(date);
    console.log(date)
    const [year, month, day] = date.split('-')
    setWaterDate(`${month}/${day}/${year}`)
    
    
  }



  return (
    <>
      {
        !user
          ? (<Navigate to='/login' replace={true} />)
          : <div>
            <Nav />
            <Container>
              <div className="App">
                <Snackbar
                  open={openSnack}
                  autoHideDuration={6000}
                  onClose={handleSnackClose}>
                  <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                    {alertMessage}
                  </Alert>
                </Snackbar>
                {!open &&
                  <Box bottom position='fixed' sx={{ bottom: 0, right: 0 }}>
                    < IconButton variant="contained" color="success" onClick={handleOpen}>
                      <AddCircleIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                  </Box>}

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >

                      <UploadImage />

                      <input type='text' placeholder='name (required)' onChange={(event) => { setName(event.target.value) }} />
                      <input type='text' placeholder='location (required)' onChange={(event) => { setLocation(event.target.value) }} />
                      <Typography variant='body1' color='text.primary'>Last Watered</Typography>
                      <Typography variant='body2' color='text.secondary'>If left blank, today's date will be used</Typography>
                     <input type="date" id="start" name="trip-start"
                        min="2022-01-01" 
                        max="2022-12-31" 
                        onChange={(e)=>{formatDate(e.target.value)}}>      
                      </input>
                      {/* <Button onClick={(event)=>{showDate()}}>test</Button> */}
                      <Button variant="contained" color="success" onClick={updatePlant}>Add</Button>
                      <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    </Stack>
                  </Box>
                </Modal>

                <div className={styles.plantContainer}>
                  {plantList.map((plants) => {
                    return <PlantCard open={confirmationWindow} deletePlantCard={deletePlantCard} key={plants._id} id={plants._id} name={plants.name} image={plants.image} location={plants.location} watered={plants.watered} userName={user.username} />
                  })}

                </div>

              </div >

            </Container >
           < Footer/>
          </div >
      }
    </>
  );
}

export default App;
