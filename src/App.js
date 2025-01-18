import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'antd';
import p1 from './p1.jpg';
import engagement from './engagement.png';
import ring from './ring.png';
import wedding from './wedding.png';
import weddingCover from './weddingCover.png';
import Card from './Card';
import './App.css';

const target = new Date('2025-01-24T00:00:00');

function App() {
  const ourStoryRef = useRef(null);
  const functionsRef = useRef(null);
  const locationRef = useRef(null);
  const rsvpRef = useRef(null);

  const scrollToSection = (ref) => (e) => {
    e.preventDefault();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTimeLeft = () => {
    const totalTimeLeft = target - new Date();
    if (totalTimeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((totalTimeLeft / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  // State to hold time left
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  // Update the time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft();
      setTimeLeft(updatedTimeLeft);

      // Clear the interval once the target date is reached
      if (
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const storyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (storyRef.current) {
      observer.observe(storyRef.current);
    }

    return () => {
      if (storyRef.current) {
        observer.unobserve(storyRef.current);
      }
    };
  }, []);

  return (
    <div className='main'>
      <nav className='navbar'>
        <Menu mode='horizontal'>
          <Menu.Item>
            <a href='#' onClick={scrollToSection(ourStoryRef)}>
              Our Story
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href='#' onClick={scrollToSection(functionsRef)}>
              Functions
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href='#' onClick={scrollToSection(locationRef)}>
              Location
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href='#' onClick={scrollToSection(rsvpRef)}>
              RSVP
            </a>
          </Menu.Item>
        </Menu>
      </nav>

      <div className='home'>
        <h1 className='main-heading'>
          Suave and Parvathavarthini's <br /> wedding
        </h1>
        <div className='countdown'>
          {Object.entries(timeLeft).map(([label, value]) => (
            <div className='box' key={label}>
              <div className='value'>
                <span>{value}</span>
              </div>
              <span className='label'>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div ref={ourStoryRef}>
        <div className={'our-story'} ref={storyRef}>
          <h1 className='our-story-heading'>Our Story</h1>
          <div className={`our-story-contents ${isVisible ? 'visible' : ''}`}>
            <div className='our-story-left'>
              <p className='our-story-content'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div className='our-story-right'>
              <img className='our-story-img' src={p1} alt='img' />
            </div>
          </div>
        </div>
      </div>
      <div ref={functionsRef}>
        <div className='functions'>
          <h1 className='our-story-heading'>Functions</h1>
          <div className='functions-content'>
            <Card
              coverImage={engagement}
              image={ring}
              text='Shagun and Ring Ceremony'
            />
            <Card
              coverImage={weddingCover}
              image={wedding}
              text='Baraat and Reception Dinner'
            />
          </div>
        </div>
      </div>
      <div ref={locationRef}>
        <div className='location'>
          <h1 className='our-story-heading'>Location</h1>
          <div className='location-content'>
            <div className='loc-content-in'>
              <p>Join us for our special day at: </p>
              <a href='https://maps.app.goo.gl/e7Sdc9Z6j45ZugfU9' target='/'>
                Icon Grand Hotel, Bangalore
              </a>
            </div>
            <div className='loc-content-in2-div'>
              <p>Address: </p>
              <a
                href='https://maps.app.goo.gl/e7Sdc9Z6j45ZugfU9'
                target='/'
                className='loc-content-in2'>
                68, Varthur Main Rd, Next to DSR Techno Cube, Bengaluru 560037,
                India
              </a>
            </div>
          </div>
        </div>
      </div>
      <div ref={rsvpRef}>
        <div className='rsvp'>
          <h1 className='our-story-heading'>Rsvp</h1>
          <div className='rsvp-content'>
            Will you be joining us to celebrate?
            <a href='https://forms.gle/k5C5CHWRRAcuoxM57' className='rsvp-link'>
              Rsvp here!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
