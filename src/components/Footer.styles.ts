import styled from 'styled-components';

export const BottomNavContainer = styled.nav`
  position: fixed;
  z-index: 20;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(480px, 100%);
  height: 72px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  padding: 0 10px max(4px, env(safe-area-inset-bottom));
  border-radius: 14px 14px 0 0;
  background: var(--color-player-bg, #17151a); /* Using app common dark color */
  box-shadow: 0 -8px 20px rgba(26, 24, 31, 0.13);
`;

export const NavItem = styled.button<{ $isActive?: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${props => props.$isActive ? '#fff' : '#8f8d98'};
  position: relative;

  > span {
    font-size: 20px;
  }

  small {
    font-size: 9px;
  }

  &::after {
    content: ${props => props.$isActive ? '""' : 'none'};
    position: absolute;
    bottom: 7px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--color-primary);
  }
`;

export const RecordButton = styled.button`
  width: 44px;
  height: 44px;
  justify-self: center;
  border-radius: 13px;
  background: var(--color-primary);
  box-shadow: 0 5px 12px rgba(199, 47, 99, 0.26);

  span {
    display: block;
    width: 13px;
    height: 13px;
    margin: auto;
    border-radius: 50%;
    background: #fff;
  }
`;
