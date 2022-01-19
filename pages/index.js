
import React, {useState, useEffect} from 'react'
import fakeSlotsData from '../fakeSlotsData'
import TimeSlot from '../components/timeSlot'
import Modal from 'react-modal';
import firebase from '../utils/firebase'
import {db} from "../utils/firebase"

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

  const [allSlots, setAllSlots] = useState();
  const [selectedSlotId, setSelectedSlotId] = useState()
  const [selectedSlot, setSelectedSlot] = useState()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('');
  const [yesIsSelected, setYesIsSelected] = useState(false)

  const slotsRef = firebase.firestore().collection("slots");

  console.log("input", input)

  function openModal() {
    if(selectedSlot) {
      setIsOpen(true);
    } else {
      alert("Please select a time")
    }
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedSlot(null)
    setInput(null)
    removeAllActiveClasses()
  }

  const clickSlot = (id, slot) => { 
    setSelectedSlotId(id)
    setSelectedSlot(slot)
  }

  const selectYes = () => {
    setYesIsSelected(true)
  }

  const submitName = () => {
    
  }

  const removeAllActiveClasses = () => {
    var elements = document.querySelectorAll('.signUpLine');
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
      }
    }


  useEffect(() => {
    setIsLoading(true)
    slotsRef.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
            tempDoc.push({ id: doc.id, ...doc.data() })
        })
        console.log("temp doc",tempDoc)
        setAllSlots(tempDoc)
        setIsLoading(false)
      })
    return null
    }, []);

  return (
    <div id="app-container" className="container">
        <div className="headerWrapper">
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
       {!yesIsSelected && <div className='is-this-correct-wrapper'>
          <div onClick={closeModal} className='x-wrapper'>x</div>
          <h1 className='modal-header'>You have selected</h1>
          <h3 className='modal-subheader'>{selectedSlot && selectedSlot.time}</h3>
          <h1 className='modal-header'>Is this correct?</h1>
          <div className='modal-button-wrapper'>
            <button onClick={selectYes} className='modal-button-yes'>YES</button>
              <button onClick={closeModal} className='modal-button-no'>NO</button>
          </div>
        </div>}

        {yesIsSelected && <div className='input-wrapper'>
          <div onClick={closeModal} className='x-wrapper'>x</div>
          <h1 className='modal-header'>Please Enter Your Name</h1>
          <input className='input' value={input} onInput={e => setInput(e.target.value)}/>
          <button className='modal-button-yes'>Submit Name</button>
        </div>}
      </Modal>
    </div>
    </div>

  )
}
