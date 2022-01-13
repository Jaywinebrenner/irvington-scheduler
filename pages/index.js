import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container">
        <div className="headerWrapper">
        <img className="logo" src="https://images.squarespace-cdn.com/content/v1/5894f664b3db2b05e8507382/1614036205072-F5CTIZB1EP8DW62WCLAO/ICPS_Logo.jpg"/>
          <h1>Welcome to the Irvington Preschool Cooperative Open House Sign up Sheet!</h1>
          <p>We are registering for specific times to keep the flow through the school safer. Please enter your name in any available slots to set up your visit.
          We look forward to seeing you there!</p>
        </div>

        <div className="signUpWrapper">
          <div className="signUpLine">
              <p className="time">10:00am | February 6th</p> <input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">10:30am | February 6th</p><input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">11:00am | February 6th</p><input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">11:30am | February 6th</p><input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">12:00pm | February 6th</p><input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">12:30pm | February 6th</p><input  className="input"type="text" placeholder="Available"/>
          </div>
          <div className="signUpLine">
              <p className="time">1:00pm | February 6th</p><input type="text" plac className="input"placeholder="Available"/>
          </div>
        </div>

        <div className='button'>CONFIRM TIME</div>
    </div>

  )
}
