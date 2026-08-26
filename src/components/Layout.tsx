import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 72px; /* For the fixed footer */
`;

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Outlet />
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
