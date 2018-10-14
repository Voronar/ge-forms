import React from 'react';
import { Collapse, Button } from 'antd';
import styled from 'styled-components';
import { ButtonProps } from 'antd/lib/button';

import { InputSchema } from 'components/Form/types';

const AntPanel = Collapse.Panel;

export const FieldPanel = styled(AntPanel)`
  margin-bottom: 12px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelButton = styled(Button as any)`
  margin-right: 12px;
` as React.ComponentClass<ButtonProps>;


type DeleteFieldButtonProps = {
  inputField: InputSchema;
  onDelete(inputField: InputSchema): void;
};

export class DeleteFieldButton extends React.PureComponent<DeleteFieldButtonProps> {
  handleDeleteField = () => {
    this.props.onDelete(this.props.inputField);
  }
  render() {
    return (
      <PanelButton onClick={this.handleDeleteField} shape="circle" icon="delete" />
    );
  }
}
