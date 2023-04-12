import React from "react";
import "../sass/About.scss";
import imgAmy from "../assets/amy.png";
import imgAlex from "../assets/Edited_Alex_Pic.png";
import imgRafael from "../assets/Rafael.png";
import imgMatthew from "../assets/Matthew_pic.png";
import imgRojan from "../assets/Rojanreal.jpeg";


export default function About() {
  return (
    <div className="About">
      <h1>About Us!</h1>
      <p>We are so excited to share this project with you. Get to know us!</p>

      <div className="Person">
        <h1>Amy</h1>
        <div>
          <img src={imgAmy} />
          <p>Hey hey! My name is Amy McKellar and I am a Natural Resource Specialist at Texas Commission on Environmental Quality. I love everything outdoors and spending time in nature. I enjoy learning new things and challenging myself.</p>
        </div>
      </div>

      <div className= "Person">
        <h1>Alexander</h1>
        <div>
          <img src={imgAlex} />
          <p>My name is Alexander Peckham and I live in Houston, Texas. I enjoy sports, mechanics, and spending time with my dogs. I have been a student at the University of Houston since 2018 in pursuit of a bachelor’s degree in engineering. However, I decided to take a break to enroll in the Full-Stack Coding Boot Camp through UT Austin. I hope to be able to obtain a job after the bootcamp to help me pursue my interests.</p>
        </div>
      </div>

      <div className= "Person">
        <h1>Rafael</h1>
        <div>
          <img src={imgRafael} />
          <p>I am a veteran, who has served in both Afghanistan and Iraq. While in the Army, I served as a sys admin, and as a military Intelligence Analyst. I wrote a Book on Blender Geometry nodes that currently sells on Amazon. I am seeking to improve myself and my living conditions by attending the coding bootcamp.</p>
        </div>
      </div>

      <div className= "Person">
        <h1>Matthew</h1>
        <div>
          <img src={imgMatthew} />
          <p>My name is Matthew Walker and I live in Austin, Texas. I am 19 years old, and I enjoy working out, coding, and playing basketball. My plan is to go to UT and find a job in software hopefully, Apple later down the line. I enjoy both art and coding, so web development is a good way to express art through the design feature, which is the reason I chose this course. I plan to learn a lot more languages after this course such as Python, the C languages, and possibly swift for Apple. Thank you, gg.</p>
        </div>
      </div>

      <div className= "Person">
        <h1>Rojan</h1>
        <div>
          <img src={imgRojan} />
          <p>My name is Rojan Gurbuz and I am a relatively young coder who is very passionate about the creativity involved in coding. I have a lot of fun working together with others on projects and reaching a shared goal.</p>
        </div>
      </div>

      
    </div>
    
  );
}