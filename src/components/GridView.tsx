import { Card, Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Meta } = Card;

const CARD_WIDTH_PX = 300;

const GridViewContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${CARD_WIDTH_PX}px, 1fr));
  grid-gap: 20px;
  width: 100%;
  grid-auto-rows: 200px;
  overflow-y: scroll;

  margin: 28px;
  padding: 28px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background-color: white;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  justify-self: center;
  align-self: center;
  width: ${CARD_WIDTH_PX}px;

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

const list = new Array(11).fill(0);

export default () => (
  <GridViewContainer>
    {list.map((item, i) => (
      <StyledCard
        key={i}
        actions={[
          <Icon key={0} type="search" />,
          <Icon key={1} type="edit" />,
          <Icon key={2} type="delete" />,
        ]}
      >
        <Meta
          title="Card title"
          description="This is the description"
        />
      </StyledCard>
    ))}
  </GridViewContainer>
);
