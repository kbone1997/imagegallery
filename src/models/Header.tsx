import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;

  h1 {
    display: inline-block;
    font-size: 5rem;
  }

  h1 span {
    display: inline-block;
    transition: transform 0.3s, text-shadow 0.3s;
  }

  h1 span:hover {
    transform: scale(1.5);
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <h1>
      {'Gallery'.split('').map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </h1>
  </HeaderContainer>
);

export default Header;
