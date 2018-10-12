import { Card, Icon } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import { FormListItem } from 'components/types';
import React from 'react';
import styled from 'styled-components';

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
};

class FormCard extends React.PureComponent<FormCardProps> {
  handleFormPreview = () => {
    this.props.onPreview(this.props.item);
  }
  // handleFormIdit = () => {}
  // handleFormDelete = () => {}
  render() {
    return (
      <StyledCard
        actions={[
          <Icon key={0} onClick={this.handleFormPreview} type="search" />,
          <Icon key={1} type="edit" />,
          <Icon key={2} type="delete" />,
        ]}
      >
        <Meta
          title={this.props.item.name}
          // description="This is the description"
        />
      </StyledCard>
    );
  }
}

export default FormCard;
