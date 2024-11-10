// Loader.js
import React from 'react';
import styled from 'styled-components';

// Styled component for the loader overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Make sure it's on top of everything */
`;

// Styled component for the loader circle
const Loader = styled.div`
  border: 8px solid #f3f3f3; /* Light grey background */
  border-top: 8px solid #3498db; /* Blue color for the spinner */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;

  /* Keyframes for spinning animation */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FullPageLoader = () => {
  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
};

export default FullPageLoader;
