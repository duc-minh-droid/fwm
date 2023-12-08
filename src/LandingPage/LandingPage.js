import React from 'react'
import { BsFillBasketFill,BsBasket } from "react-icons/bs";
import { TbMeat } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { TbClockSearch } from "react-icons/tb";

function LandingPage() {
  return (
    <div className='pages-container'>
        <div class="page" id="page1">
            <div className='page1-div'>
                <div className='page1-logo'>
                    <BsBasket className='logo'/>
                </div>
                <div className='page1-text'>
                    <h1>Waste<span>Less</span></h1>
                    <p>Maximizing waste, Maximizing impact.</p>
                </div>
            </div>
        </div>
        <div class="page" id="page2">
            <p>Utilities</p>
            <h1>Getting Started</h1>
            <div className='p2-card-ctn'>
                <div className='p2-card'>
                    <div className='p2-logo'><TbMeat /></div>
                    <p>INVENTORY</p>
                    <span>Keep track of items in your kitchen & explore your cooking options</span>
                </div>
                <div className='p2-card'>
                    <div className='p2-logo'><IoCartOutline /></div>
                    <p>SHOPPING LIST</p>
                    <span>Check off items as you shop & instantly update your inventory</span>
                </div>
                <div className='p2-card'>
                    <div className='p2-logo'><TbClockSearch /></div>
                    <p>MONITOR</p>
                    <span>IN DEVELOPMENT: Monitor how your choices impact your life and the environment</span>
                </div>
            </div>
        </div>
        <footer class="footer">
    <div class="useful-links">
        <h4>Useful Links</h4>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About Us</a></li>
        </ul>
    </div>
    <div class="additional">
        <h4>Additional Links</h4>
        <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
        </ul>
    </div>
    <div class="contact">
        <h4>Contact Us</h4>
        <p>Address: 123 Street, Exeter, United Kingdom</p>
        <p>Email: ducminhcsp@gmail.com</p>
        <p>Phone: +123456789</p>
    </div>
</footer>
    </div>
  )
}

export default LandingPage