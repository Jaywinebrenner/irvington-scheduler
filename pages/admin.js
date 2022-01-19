
import React, {useState, useEffect} from 'react'
import TimeSlot from '../components/timeSlot'
import firebase from '../utils/firebase'


export default function Admin() {

  const [allSlots, setAllSlots] = useState();
  const [selectedSlotId, setSelectedSlotId] = useState()
  const [selectedSlot, setSelectedSlot] = useState()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const slotsRef = firebase.firestore().collection("slots");

  const clickSlot = (id, slot) => { 
    setSelectedSlotId(id)
    setSelectedSlot(slot)
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
          <h1>Welcome to the Admin Page!</h1>
          <p>Listed here are all the people who who have confirmed Open House Times.</p>
        </div>

        <div className='signUpWrapper'>
        {isLoading && <div className='loading-wrapper'>
            <img src="/spin.svg"/>
        </div>}
          {
            allSlots && allSlots.map((slot, i) => {
              return (
                <div 
                className="signUpLine-admin">
                    <p className="time">{slot.time}</p> 
                </div>
              )
            })
          }
        </div>
    </div>

  )
}
