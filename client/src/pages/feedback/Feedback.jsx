import "./Feedback.css";
import { useState } from 'react';
import React from "react";
// import feedbackImg from "../../assets/images/feedback.png"
export default function Feedback() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    }
    return (
    <>
    <div className="feedback">
        <div className="feedback-left">
            {/* <div className="feedback-imgs">
                <img src="https://dizibrand.com/wp-content/uploads/2019/06/medium-la-gi-dizibrand.com_.png"></img>    
            </div> */}
            {/* <div className="feedback-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.655434975421!2d105.78180671424562!3d21.04646859255099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3277f870d7%3A0xf27837785a779a8a!2zMjM2IEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBD4buVIE5odeG6vywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1663311249194!5m2!1svi!2s" width="300" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> */}
            <div className="contact-box">
                <div className="contact-box-header">
                    <h2>Contact Details</h2>
                </div>
                
                <br></br>
                <br></br>
                <div className="contact-box-body">
                    <h2>Medium</h2>
                    <p>236 Hoang Quoc Viet, Bac Tu Liem, Ha Noi, Viet Nam </p>
                    
                    <br></br>
                    <br></br>
                    <p>(650) 123-2558 (main number)</p>
                    <p>(650) 123-0247 (fax)</p>
                    <br></br>
                    <br></br>
                    <p>Email: <b>baoanhmta@gmail.com</b></p>
                </div>
            </div>
        </div>
        <div className="feedback-right">
            <div className="feedback-heading">
            <h2>
                Feel free to feedback !
            </h2>
            <br></br>
            <br></br>
            </div>
            <div className="feedback-form">
                <form onSubmit={handleSubmit}>
                <label for="fname">Your name:</label>
                <br></br>
                <input type="text" 
                        id="fname" 
                        name="name" 
                        value={inputs.name || ""}
                        onChange={handleChange}> 
                </input>
                <br></br>
                <br></br>
                <label for="fname">Your email:</label>
                <br></br>
                <input type="email" 
                        id="email" 
                        name="email"
                        value={inputs.email || ""} 
                        onChange={handleChange}>

                </input>
                <br></br>
                <br></br>
                <label for="fname">Your message:</label>
                <br></br>
                <textarea   class="required form-control" 
                            id="feedbackform-message" 
                            name="feedbackform-message" 
                            rows="6" 
                            cols="50" 
                            aria-required="true">
                
                </textarea>
                <br></br>
                <br></br>
                <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
        
    </div>
    
    </>
  );
}