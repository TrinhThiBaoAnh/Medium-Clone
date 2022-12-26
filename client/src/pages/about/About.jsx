import "./About.css";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const PF = "http://localhost:5000/images/"


export default function About() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
          const res = await axios.get("/users");
          
          setUsers(res.data.slice(0, 10));
        };
        getUsers();
      }, []);
    // console.log("User>>>", users);
    
    return (
    <>
    <div className="about">
        
        <div className="about-content">
            <br></br>
            <div className="about-heading">
                <h1>
                    Every idea needs a <i>Medium</i>
                </h1>
                
            </div>
            <br></br>
            <br></br>
            <div className="about-body-1">
                <div className="about-body-12">
                    <div className="about-imgs">
                    <img id="img1" alt="about" src="https://cdn-icons-png.flaticon.com/256/4228/4228680.png"></img>
                   
                    </div>
                </div>
                <div className="about-body-11">
                    <p>
                    The best ideas can change who we are. 
                    Medium is where those ideas take shape, take off, and spark powerful conversations. 
                    We’re an open platform where over 100 million readers come to find insightful and 
                    dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of 
                    any topic and bring new ideas to the surface. Our purpose is to spread these ideas 
                    and deepen understanding of the world.
                    </p>
                    <p>
                    We are creating a new model for digital publishing. 
                    One that supports nuance, complexity, and vital storytelling 
                    without giving in to the incentives of advertising. 
                    It’s an environment that’s open to everyone but promotes substance 
                    and authenticity. And it’s where deeper connections forged between 
                    readers and writers can lead to discovery and growth. Together with 
                    millions of collaborators, we’re building a trusted and vibrant ecosystem 
                    fueled by important ideas and the people who think about them.
                    </p>
                </div>
                
                
            </div>
            
            <div className="about-body-2">
                    <h1>
                     A living network of curious minds.
                    </h1>
                    <p>
                    Anyone can write on Medium. Thought-leaders, journalists, experts, and individuals with unique perspectives share their thinking here. You’ll find pieces by independent writers from around the globe, stories we feature and leading authors, and smart takes on our own suite of blogs and publications.
                    </p> 
                    <br></br>
                    <br></br>
                  
                    <br></br>
                    <br></br>
            </div>
            
            <div className="about-body-3">
                   <div className="about-body-31">
                        <h1>
                            Over 100 million readers and growing.
                        </h1>
                        <div className="about-body-31-img">
                            <img alt ="about" src="https://cdn-icons-png.flaticon.com/256/4105/4105448.png"></img>
                        </div>
                   </div>
                    <hr></hr>
                    <div className="about-body-32">
                        <h1>Create the space for your thinking to take off.</h1>
                        <p>
                        A blank page is also a door. At Medium you can walk through it. It's easy and free to share your thinking on any topic, connect with an audience, express yourself with a range of publishing tools, and even earn money for your work.
                        </p>
                        <div className="div-write-on-medium">
                            <Link to="/write">
                                    <button type="submit" className="btn-write-on-medium">Get Started</button>
                            </Link>
                        </div>
                        
                    </div>
                    
            </div>
            <div className="about-body-4">
                   <div className="about-body-41">
                        <h1>
                        Learn more about us. Or join us.
                        </h1>     
                   </div>
                   <div  className="about-body-42">
                        <h3>The Medium blog</h3>
                        <p>Visit our company blog for the latest news, product updates, and tips and tricks.</p>
                        <div className="div-get-started-medium">
                            <Link to="/">
                                <button type="submit" className="btn-get-started-medium">Get Started</button>
                            </Link>
                        </div>
                   </div>
                   
            </div>
            <br></br>
            <br></br>
            <div className="about-footer">
                <h2>MEDIUM</h2>
                <div>
                    <p>Terms</p>
                    <p>Policy</p>
                    <p>Help</p>
                    
                </div>
            </div>
        
        </div>
        
       
    </div>
    </>
  );
}
