import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from 'antd';
import { Meta } from 'antd/lib/list/Item';

import { FormListItem } from 'components/types';

export const CARD_WIDTH_PX = 300;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  justify-self: center;
  align-self: center;
  width: ${CARD_WIDTH_PX}px;

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

type FormCardProps = {
  item: FormListItem;
  onPreview(item: FormListItem): void;
  onDelete(item: FormListItem): void;
};

class FormCard extends React.PureComponent<FormCardProps> {
  actions: React.ReactNode[] = [];

  constructor(props: FormCardProps) {
    super(props);

    this.actions = [
      <Icon key={0} onClick={this.handleFormPreview} type="search" />,
      <Icon key={1} onClick={this.handleFormIdit} type="edit" />,
      <Icon key={2} onClick={this.handleFormDelete} type="delete" />,
    ];
  }

  handleFormPreview = () => {
    this.props.onPreview(this.props.item);
  }

  handleFormDelete = () => {
    this.props.onDelete(this.props.item);
  }

  handleFormIdit = () => {
    console.log('edit');
  }
  render() {
    return (
      <StyledCard
        actions={this.actions}
      >
        <Meta
          title={this.props.item.name}
          description={this.props.item.description}
        />
      </StyledCard>
    );
  }
}

export default FormCard;
