
import React, {useState, useEffect} from 'react'
import fakeSlotsData from '../fakeSlotsData'
import TimeSlot from '../components/timeSlot'

export default function Home() {

  const [allSlots, setAllSlots] = useState(fakeSlotsData);
  const [selectedSlotId, setSelectedSlotId] = useState()

  const clickSlot = (id) => { 
    setSelectedSlotId(id)
    console.log("ID", selectedSlotId);
  }

  return (
    <div className="container">
        <div className="headerWrapper">
        <img className="logo" src="https://images.squarespace-cdn.com/content/v1/5894f664b3db2b05e8507382/1614036205072-F5CTIZB1EP8DW62WCLAO/ICPS_Logo.jpg"/>
          <h1>Welcome to the Irvington Preschool Cooperative Open House Sign up Sheet!</h1>
          <p>We are registering for specific times to keep the flow through the school safer. Please enter your name in any available slots to set up your visit.
          We look forward to seeing you there!</p>
        </div>

        <div className='signUpWrapper'>
          {
            allSlots && allSlots.map((slot, i) => {
              return (
                <TimeSlot key={`slot-${i}`} selectedSlotId={selectedSlotId} slot={slot} clickSlot={clickSlot}/>
              )
            })
          }
        </div>

        <div className='button'>CONFIRM TIME</div>
    </div>

  )
}
