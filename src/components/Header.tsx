import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopbarContainer, TopbarIconButton, TopbarTitle } from './Header.styles';

interface HeaderProps {
  title: string;
  bgColor?: string;
  borderColor?: string;
  rightIcon?: React.ReactNode;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, bgColor, borderColor, rightIcon, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <TopbarContainer $bgColor={bgColor} $borderColor={borderColor}>
      <TopbarIconButton onClick={handleBack} aria-label="뒤로 가기">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </TopbarIconButton>
      
      <TopbarTitle>{title}</TopbarTitle>
      
      <TopbarIconButton as="span" aria-hidden="true" style={{ cursor: rightIcon ? 'pointer' : 'default' }}>
        {rightIcon}
      </TopbarIconButton>
    </TopbarContainer>
  );
};

export default Header;
