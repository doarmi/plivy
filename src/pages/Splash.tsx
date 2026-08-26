import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

const SplashContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #1a1520 0%, #0d0d12 100%);
  animation: ${fadeIn} 0.6s ease;

  .splash-logo {
    font: 700 48px/1 var(--font-mono);
    letter-spacing: 0.25em;
    color: #fff;
    margin-bottom: 8px;
  }

  .splash-tagline {
    font: 9px/1 var(--font-mono);
    letter-spacing: 0.3em;
    color: var(--color-primary, #c72f63);
    margin-bottom: 60px;
  }

  .splash-disc {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, #eceaf0 0 11%, #c9c3db 12% 26%, #9a90b3 27% 44%, #dedbe7 45%);
    box-shadow: 0 0 40px rgba(199, 47, 99, 0.3);
    margin-bottom: 80px;
    animation: ${keyframes`
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    `} 3s linear infinite;
  }

  .splash-loading {
    width: 120px;
    height: 2px;
    background: rgba(255,255,255,0.1);
    border-radius: 1px;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      height: 100%;
      background: var(--color-primary, #c72f63);
      animation: ${keyframes`
        from { width: 0; }
        to { width: 100%; }
      `} 2s ease-in-out forwards;
    }
  }
`;

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashContainer>
      <div className="splash-logo">PLIVY</div>
      <div className="splash-tagline">YOUR MUSIC MEMORY</div>
      <div className="splash-disc" aria-hidden="true" />
      <div className="splash-loading" aria-label="로딩 중" />
    </SplashContainer>
  );
};

export default Splash;
