import React, { useState, useEffect } from 'react';
import UploadDesignForm from './UploadDesignForm';
import DesignSpotlight from './DesignSpotlight';

const initialDesigns = [ { id: 1, title: 'Sunset Overdrive', image: 'https://picsum.photos/200/300', votes: 5, comments: [] },
  { id: 2, title: 'Urban Jungle', image: 'https://picsum.photos/200/300', votes: 8, comments: [] },
  { id: 3, title: 'Vintage Vibes', image: 'https://picsum.photos/200/300', votes: 2, comments: [] },
  { id: 4, title: 'Modern Minimalist', image: 'https://picsum.photos/200/300', votes: 10, comments: [] },
  { id: 5, title: 'Abstract Dreams', image: 'https://picsum.photos/200/300', votes: 4, comments: [] },];
const submissionEndTime = new Date('2024-08-30T21:50:59');

const Spotlight = () => {
  const [designs, setDesigns] = useState(initialDesigns);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isSuccess, setIsSuccess] = useState(false);
  const [page, setPage] = useState('spotlight');
  const [showPopup, setShowPopup] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      checkSubmissionTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const difference = submissionEndTime - now;

    if (difference <= 0) {
      setIsSubmissionOpen(false);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  function checkSubmissionTime() {
    const now = new Date();
    if (now > submissionEndTime) {
      setIsSubmissionOpen(false);
    }
  }

  const handleAddDesign = (newDesign) => {
  if (isSubmissionOpen) {
    setDesigns([...designs, newDesign]);
    setShowPopup(false);
    setIsSuccess(true);
    setTimeout(() => {
      handlePageChange('spotlight');
      setIsSuccess(false);
    }, 2000);
  } else {
    setShowPopup(false);
    alert('Design submissions are closed.');
  }
};


  const handleVote = (id) => {
    setDesigns(
      designs.map((design) =>
        design.id === id ? { ...design, votes: design.votes + 1 } : design
      )
    );
  };

  const handleAddComment = (id, comment) => {
    setDesigns(
      designs.map((design) =>
        design.id === id
          ? { ...design, comments: [...design.comments, comment] }
          : design
      )
    );
  };

  const handlePageChange = (newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setIsTransitioning(false);
    }, 300);
  };

  const transitionStyles = {
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
    transition: 'opacity 300ms, transform 300ms',
  };

  const sortedDesigns = designs.sort((a, b) => b.votes - a.votes).map((design, index) => ({
    ...design,
    rank: `#${index + 1}`
  }));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar setPage={handlePageChange} />
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f0f4f8', position: 'relative' }}>
        <div style={transitionStyles}>
          {page === 'spotlight' ? (
            <>
              <Header timeLeft={timeLeft} />
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <SubmitButton onClick={() => setShowPopup(true)} />
              </div>
              <DesignSpotlight designs={sortedDesigns} onVote={handleVote} onAddComment={handleAddComment} />
              {!isSubmissionOpen && <SubmissionClosed />}
              {isSuccess && (
                <div style={{ marginTop: '20px', color: 'green', animation: 'fadeIn 0.5s' }}>Your design has been added to the spotlight!</div>
              )}
            </>
          ) : (
            <UploadSection setShowPopup={setShowPopup} isSuccess={isSuccess} />
          )}
        </div>
      </main>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <UploadDesignForm onAddDesign={handleAddDesign} />
        </Popup>
      )}
    </div>
  );
};

const Sidebar = ({ setPage }) => (
  <nav style={{ 
    width: '200px', 
    backgroundColor: 'offwhite', 
    color: 'black', 
    padding: '20px',
    transition: 'all 0.3s ease'
  }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {['Design Spotlight', 'Upload Section', 'Top Designer', 'About', 'Blog'].map((item, index) => (
        <li
          key={index}
          style={{ 
            marginBottom: '15px', 
            cursor: 'pointer', 
            fontSize: '16px',
            transition: 'color 0.3s ease',
            ':hover': { color: '#3498db' }
          }}
          onClick={() => setPage(item.toLowerCase().replace(' ', '_'))}
        >
          {item}
        </li>
      ))}
    </ul>
  </nav>
);

const Header = ({ timeLeft }) => (
  <header style={{ marginBottom: '30px', textAlign: 'center' }}>
    <h1 style={{ 
      marginBottom: '20px', 
      fontSize: '36px', 
      color: '#2c3e50',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 1s ease'
    }}>Myntra Spotlight</h1>
    {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
      <p style={{ fontSize: '18px', color: '#e74c3c' }}>Submission Deadline: {submissionEndTime.toLocaleString()}</p>
    ) : (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        fontSize: '18px',
        color: '#34495e',
        background: 'linear-gradient(70deg, #8e44ad, #ff0066)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
          <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: '#ecf0f1',
              display: 'block',
              marginBottom: '5px',
              alignItems:'center'
            }}>{timeLeft[unit]}</span>
            <span style={{ fontSize: '14px', color: '#bdc3c7' }}>{unit}</span>
          </div>
        ))}
      </div>
    )}
  </header>
);

const SubmissionClosed = () => (
  <div style={{ 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '5px', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    animation: 'fadeIn 0.5s'
  }}>
    <h2 style={{ fontSize: '24px', color: '#e74c3c', marginBottom: '10px' }}>Submissions are now closed.</h2>
    <p style={{ fontSize: '18px', color: '#34495e' }}>Thank you for participating! The top designs will be announced soon.</p>
  </div>
);

const Popup = ({ children, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      position: 'relative',
      maxWidth: '90%',
      maxHeight: '90%',
      width: '500px',
      overflowY: 'auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#7f8c8d',
          transition: 'color 0.3s ease',
          ':hover': { color: '#34495e' }
        }}
      >
        ×
      </button>
      {children}
    </div>
  </div>
);

const SubmitButton = ({ onClick, text = "Submit Design" }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        padding: '12px 24px',
        backgroundColor: '#ff0066',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {text}
    </button>
  );
};

const UploadSection = ({ setShowPopup, isSuccess }) => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Upload Your Design</h2>
    <p style={{ marginBottom: '30px', fontSize: '16px', color: '#666' }}>
      Share your creative designs with our community! Upload your work and get a chance to be featured in our Design Spotlight.
    </p>
    <SubmitButton onClick={() => setShowPopup(true)} text="Upload Design" />
    {isSuccess && (
      <div style={{ marginTop: '20px', color: 'green', animation: 'fadeIn 0.5s' }}>
        Your design has been uploaded successfully! Redirecting to Design Spotlight...
      </div>
    )}
  </div>
);

const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Add this style to your document's <head> or use a CSS-in-JS solution
const style = document.createElement('style');
style.textContent = fadeInAnimation;
document.head.appendChild(style);

export default Spotlight;
