
import React, {useState, useEffect} from 'react'
import fakeSlotsData from '../fakeSlotsData'
import TimeSlot from '../components/timeSlot'
import Modal from 'react-modal';
import firebase from '../utils/firebase'
import {db} from "../utils/firebase"
import Link from 'next/link'
import { useRouter } from 'next/router'



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#E3EFC5",
    flexDirection: "column",
  },
};

Modal.setAppElement('#app-container');

export default function Home() {

  const router = useRouter()

  const [allSlots, setAllSlots] = useState();
  const [selectedSlotId, setSelectedSlotId] = useState()
  const [selectedSlot, setSelectedSlot] = useState()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('');
  const [yesIsSelected, setYesIsSelected] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [rerender, setRerender] = useState(false)
  const [passwordInput, setPasswordInput] = useState()
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false)

  const slotsRef = firebase.firestore().collection("slots");


  function openModal() {
    if(selectedSlot) {
      setIsOpen(true);
    } else {
      alert("Please select a time")
    }
  }

  const toggleAdminModal = () => {
    setAdminModalIsOpen(prev => !prev)
  }

  const submitPassword = () => {
    router.push("/admin")
    console.log("submitted!")
  }


  function closeModal() {
    setIsOpen(false);
    setSelectedSlot(null)
    setInput(null)
    removeAllActiveClasses()
    setConfirmed(false)
    setYesIsSelected(false)
  }

  const clickSlot = (id, slot) => { 
    setSelectedSlotId(id)
    setSelectedSlot(slot)
  }

  const selectYes = () => {
    setYesIsSelected(true)
  }

  const submitName = () => {
    try {
      setIsLoading(true)
      db.collection("confirmed").add({
        name: input,
        time: selectedSlot.time,
        date: selectedSlot.date
      });
      db.collection('slots').doc(selectedSlot.id).delete();
      setIsLoading(false)
      setConfirmed(true)
      setRerender(prev => !prev)

    } catch(error) {
      console.log("ERROR")
      alert("Blah, something went wrong...")
      closeModal()
      setIsLoading(false)
    }
  };

  const removeAllActiveClasses = () => {
    var elements = document.querySelectorAll('.signUpLine');
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
      }
    }


  useEffect(() => {
    setIsLoading(true);
    slotsRef.get().then((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
            tempDoc.push({ id: doc.id, ...doc.data() })
        });

        // let timeString = tempDoc.map((x) => x.time)
        // console.log("timestring",timeString)

        tempDoc.sort(function(a,b){
          return new Date(b.time) - new Date(a.time);
        });
        
        console.log("tempDoc",tempDoc);



        setAllSlots(tempDoc);
        setIsLoading(false);
      })
    return null
    }, [rerender]);

  return (
    <div id="app-container" className="container">
        <div className="headerWrapper">
        <img onClick={toggleAdminModal} className='gear-icon' src="/gear.png"/>
        <img className="logo" src="https://images.squarespace-cdn.com/content/v1/5894f664b3db2b05e8507382/1614036205072-F5CTIZB1EP8DW62WCLAO/ICPS_Logo.jpg"/>
          <h1>Welcome to the Irvington Preschool Cooperative Open House Sign up Sheet!</h1>
          <p>We are registering for specific times to keep the flow through the school safer. Please select a time and enter your name to set up your visit.
          We look forward to seeing you there!</p>
        </div>

        <div className='signUpWrapper'>
        {isLoading && <div className='loading-wrapper'>
            <img src="/spin.svg"/>
        </div>}
          {
            allSlots && allSlots.map((slot, i) => {
              return (
                <TimeSlot key={`slot-${i}`} selectedSlot={selectedSlot} selectedSlotId={selectedSlotId} slot={slot} clickSlot={clickSlot} onClick={closeModal}/>
              )
            })
          }
        </div>
        <div onClick={openModal} className='button'>CONFIRM TIME</div>
        <div>
      <Modal
        selectedSlot={selectedSlot}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       {!yesIsSelected && !isLoading && <div className='is-this-correct-wrapper'>
          <div onClick={closeModal} className='x-wrapper'>x</div>
          <h1 className='modal-header'>You have selected</h1>
          <h3 className='modal-subheader'>{selectedSlot && selectedSlot.time} | {selectedSlot && selectedSlot.date}</h3>
          <h1 className='modal-header'>Is this correct?</h1>
          <div className='modal-button-wrapper'>
            <button onClick={selectYes} className='modal-button-yes'>YES</button>
              <button onClick={closeModal} className='modal-button-no'>NO</button>
          </div>
        </div>}

        {yesIsSelected && !isLoading && !confirmed && <div className='input-wrapper'>
          <div onClick={closeModal} className='x-wrapper'>x</div>
          <h1 className='modal-header'>Please Enter Your Name</h1>
          <input className='input' value={input} onInput={e => setInput(e.target.value)}/>
          <button onClick={()=>submitName()} className='modal-button-yes'>Submit Name</button>
        </div>}
        {isLoading && <div className='loading-wrapper'>
            <img src="/spin.svg"/>
        </div>}

        {confirmed && <div className='confirm-wrapper'>
          <div onClick={closeModal} className='x-wrapper'>x</div>
          <h1 className='modal-header'>Thank you! We look forward to seeing you on: </h1>
          <h3>{selectedSlot && selectedSlot.time}</h3>
          <button onClick={closeModal} className='modal-button-yes'>Close</button>
        </div>}
      </Modal>
      <Modal
          isOpen={adminModalIsOpen}
          onRequestClose={toggleAdminModal}
          style={customStyles}
          contentLabel="Example Modal">
        <div className='admin-modal-wrapper'>
        <div onClick={toggleAdminModal} className='x-wrapper'>x</div>
          <h1>Please Enter your password to access the admin area</h1>
          <input className='input' value={passwordInput} onInput={e => setPasswordInput(e.target.value)}/>
          <button onClick={submitPassword} className='modal-button-yes'>Enter</button>
        </div>

      </Modal>
    </div>
    </div>

  )
}
