import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { boxShadow1, spacing } from './theme';

const StyledActionBar = styled.section`
  display: flex;
  flex-flow: row wrap;
  padding: ${spacing.lg}px;

  box-shadow: ${boxShadow1};
  background-color: white;
`;

type ActionBarProps = {
  onNewForm(): void;
};

class ActionBar extends React.PureComponent<ActionBarProps> {
  handleNewForm = () => {
    this.props.onNewForm();
  }
  render() {
    return (
      <StyledActionBar>
        <Button onClick={this.handleNewForm} type="primary" icon="plus">New form</Button>
      </StyledActionBar>
    );
  }
}

export default ActionBar;
