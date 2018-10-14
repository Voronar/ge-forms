import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from 'antd';
import { Meta } from 'antd/lib/list/Item';

import { boxShadow1, boxShadow2 } from 'components/theme';
import { FormListItem } from 'components/Form/types';

export const CARD_WIDTH_PX = 300;

const StyledCard = styled(Card)`
  box-shadow: ${boxShadow1};
  justify-self: center;
  align-self: center;
  width: ${CARD_WIDTH_PX}px;

  &:hover {
    box-shadow: ${boxShadow2};
  }
`;

type FormCardProps = {
  item: FormListItem;
  onPreview(item: FormListItem): void;
  onDelete(item: FormListItem): void;
  onEdit(item: FormListItem): void;
};

class FormCard extends React.PureComponent<FormCardProps> {
  actions: React.ReactNode[] = [];

  constructor(props: FormCardProps) {
    super(props);

    this.actions = [
      <Icon title="Preview form" key={0} onClick={this.handleFormPreview} type="search" />,
      <Icon title="Edit form" key={1} onClick={this.handleFormIdit} type="edit" />,
      <Icon title="Delete form" key={2} onClick={this.handleFormDelete} type="delete" />,
    ];
  }

  handleFormPreview = () => this.props.onPreview(this.props.item);
  handleFormDelete = () => this.props.onDelete(this.props.item);
  handleFormIdit = () => this.props.onEdit(this.props.item);

  render() {
    return (
      <StyledCard actions={this.actions} >
        <Meta
          title={this.props.item.name}
          description={this.props.item.description}
        />
      </StyledCard>
    );
  }
}

export default FormCard;
