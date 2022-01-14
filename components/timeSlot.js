


 import React, {useState} from 'react'

 export default function TimeSlot({slot, clickSlot, selectedSlotId}) {

 
   return (
     <div 
        onClick={() =>clickSlot(slot.id)}
        className={"signUpLine" + ((selectedSlotId === slot.id) ? ' active' : '')}>
         <p className="time">{slot.time}</p> 
     </div>
 
   )
 }
 













//  import React, {useState} from 'react'

// export default function TimeSlot({slot}) {


//     const [active, setActive] = useState(false);

//     const clickSlot = () => {
//       console.log("CLICKED");
//       setActive(true)
//     }


//   return (
//     <div onClick={()=>clickSlot()} className={"signUpLine" + (active ? ' active' : '')}
//   >
//         <p className="time">{slot.time}</p> 
//     </div>

//   )
// }
