import React from 'react';
import Header from './models/Header';
import ImageGallery from './models/Gallery';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const App: React.FC = () => (
  <AppContainer>
    <Header />
    <ImageGallery />
  </AppContainer>
);

export default App;