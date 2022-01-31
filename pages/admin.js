
import React, {useState, useEffect} from 'react'
import TimeSlot from '../components/timeSlot'
import firebase from '../utils/firebase'
import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '80%',
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: "#E3EFC5",
      flexDirection: "column",
      textAlign: "center"
    },
  };



  const format = 'h:mm a';

  const now = moment().hour(0).minute(0);

export default function Admin() {

  const [rerender, setRerender] = useState(false)
  const [allSlots, setAllSlots] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState()
  const [amOrPm, setAmOrPm] = useState()
  const [slotToDelete, setSlotToDelete] = useState()

  const [hour ,setHour] = useState();
  const [minutes ,setMinutes] = useState();

  // console.log("hour", hour)
  // console.log("minutes", minutes)
  // console.log("current date", moment(new Date()).format("DD/MM/YYYY"))
  // console.log("date in state", date)
  // console.log("date object", new Date())

  const slotsRef = firebase.firestore().collection("slots");
  const confirmedRef = firebase.firestore().collection("confirmed");

  const toggleAddModal = () => {
    setAddModalIsOpen(prev => !prev)
    if(addModalIsOpen === false){
      setAmOrPm(null);
      setDate(null);
      setTime(null);
    }
  }
  const toggleDeleteModal = () => {
    setDeleteModalIsOpen(prev => !prev)
  }
  const clickDelete = (id, time, date) => {
    toggleDeleteModal()
    let slotToDeleteObj = {
      id: id,
      time: time,
      date: date
    }
    setSlotToDelete(slotToDeleteObj)
    console.log("slot to delete? ", slotToDelete)
  }
  const deleteSlot = () => {
    try {
      confirmedRef.doc(slotToDelete.id).delete();
      toggleDeleteModal()
      setRerender(prev => !prev)
    } catch (e) {
      console.log("THERE WAS AN ERROR, DARN!")
    }
  }

  const submitSlot = () => {
    if(!hour || !minutes){
      alert("Please Enter a time");
      return;
    }
    console.log("AMPM", amOrPm)
    if(!amOrPm){
      alert("Please Enter a time of day");
      return;
    }
    try {
      // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var options = { month: 'long', day: 'numeric' };
      let formattedTime = hour + ":" + minutes + " " + amOrPm
      console.log("inputted TIME", formattedTime)
      console.log("inputted date", date.toLocaleDateString("en-US", options).toString());

      slotsRef.add({
        date: date.toLocaleDateString("en-US", options),
        time: formattedTime,
      });
      setTime("");
      setHour("");
      setMinutes("")
      setRerender(prev => !prev)
      toggleAddModal()

    } catch(e) {
      console.log("ERROR")
    }
    // let timeToMilitaryTime = convertTime12to24('03:02 PM');
    // console.log("military time", timeToMilitaryTime)
  }

  const handleDateChange = (date) => {
    setDate(date)
    console.log("selected date", date)
  }

  function onChangeRadio(event) {
    setAmOrPm(event.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    // setDate(moment(new Date()).format("DD/MM/YYYY"))
    confirmedRef.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
            tempDoc.push({ id: doc.id, ...doc.data() })
        })
        console.log("temp doc",tempDoc)
        setAllSlots(tempDoc)
        setIsLoading(false)
      })
    return null
    }, [rerender]);

  return (
    <div id="app-container" className="container">
        <div className="headerWrapper">
        <img className="logo" src="https://images.squarespace-cdn.com/content/v1/5894f664b3db2b05e8507382/1614036205072-F5CTIZB1EP8DW62WCLAO/ICPS_Logo.jpg"/>
          <h1>Welcome to the Admin Page!</h1>
          <button onClick={toggleAddModal} className='modal-button-yes'>Add Additional Time Slots</button>
          <p>Listed here are all the people who who have confirmed Open House Times.</p>
        </div>

        <div className='signUpWrapper-admin'>
        {isLoading && <div className='loading-wrapper'>
            <img src="/spin.svg"/>
        </div>}
          {
            allSlots && allSlots.map((slot, i) => {
              return (
                <div 
                key={`${i}`}
                className="signUpLine-admin">
                    <div onClick={() => clickDelete(slot.id, slot.time, slot.date)} className='trash-icon'>
                      <FontAwesomeIcon icon={faCoffee} />
                    </div>
                    <p className="time">{slot.name} - {slot.time} | {slot.date} | {slot.email}</p> 
                </div>
              )
            })
          }
        </div>

        <Modal
          isOpen={addModalIsOpen}
          onRequestClose={toggleAddModal}
          style={customStyles}
          contentLabel="Example Modal">
            <div className='admin-modal-wrapper'>
            <div onClick={toggleAddModal} className='x-wrapper'>x</div>
            <h1>Please Enter the Date and Time of the Time Slot You Want to Create</h1>

            <DatePicker
                selected={date}
                onChange={handleDateChange}
            />

            <div className='time-wrapper'>
              <input 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className='input-add' 
                maxLength="2"
                value={hour} 
                onInput={e => setHour(e.target.value)}/> 
                :
                 <input 
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxlength="2"
                  className='input-add' 
                  value={minutes} 
                  onInput={e => setMinutes(e.target.value)}/>

                <div className='radio-wrapper' onChange={onChangeRadio}>
                  <input type="radio" value="AM" name="morning or night" /> AM
                  <input type="radio" value="PM" name="morning or night" /> PM
  
                </div>
            </div>
            <button onClick={submitSlot} className='modal-button-yes'>Enter</button>
            </div>

      </Modal>
      <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={toggleDeleteModal}
          style={customStyles}
          contentLabel="Delete Modal">
            <h2>Are you sure you want to delete?</h2>
          <div className='modal-button-wrapper'>
            <button onClick={deleteSlot} className='modal-button-yes'>YES</button>
              <button onClick={toggleDeleteModal} className='modal-button-no'>NO</button>
          </div>
        </Modal>
    </div>

  )
}
