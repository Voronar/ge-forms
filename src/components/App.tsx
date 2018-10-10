import GridView from 'components/GridView';
import React from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  background-color: #e9ebee;
`;

class App extends React.PureComponent {
  public render() {
    return (
      <StyledApp>
        <GridView />
      </StyledApp>
    );
  }
}

export default App;
