import styled from 'styled-components';

export const TopbarContainer = styled.header<{ $bgColor?: string, $borderColor?: string }>`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 48px;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  background: ${props => props.$bgColor || 'var(--color-surface, #ffffff)'};
  border-bottom: 1px solid ${props => props.$borderColor || 'transparent'};
`;

export const TopbarIconButton = styled.button`
  height: 48px;
  display: grid;
  place-items: center;
  color: inherit;
`;

export const TopbarTitle = styled.h1`
  text-align: center;
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.21em;
  margin: 0;
`;
