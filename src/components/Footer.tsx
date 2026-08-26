import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavContainer, NavItem, RecordButton } from './Footer.styles';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <BottomNavContainer aria-label="주요 메뉴">
      <NavItem 
        $isActive={location.pathname === '/'} 
        onClick={() => handleNav('/')}
      >
        <span>⌂</span><small>홈</small>
      </NavItem>
      
      <NavItem 
        $isActive={location.pathname === '/search'} 
        onClick={() => handleNav('/search')}
      >
        <span>⌕</span><small>검색</small>
      </NavItem>
      
      <RecordButton 
        aria-label="기록 추가" 
        onClick={() => handleNav('/record')}
      >
        <span></span>
      </RecordButton>
      
      <NavItem 
        $isActive={location.pathname === '/playlists'} 
        onClick={() => handleNav('/playlists')}
      >
        <span>≡</span><small>플레이리스트</small>
      </NavItem>
      
      <NavItem 
        $isActive={location.pathname === '/profile'} 
        onClick={() => handleNav('/profile')}
      >
        <span>♙</span><small>프로필</small>
      </NavItem>
    </BottomNavContainer>
  );
};

export default Footer;
