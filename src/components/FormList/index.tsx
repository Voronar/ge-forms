import React from 'react';
import styled from 'styled-components';

import { FormListItem } from 'components/types';
import FormCard, { CARD_WIDTH_PX } from 'components/FormList/FormCard';


const GridView = styled.section`
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

type FormListProps = {
  list: FormListItem[];
  onPreview(item: FormListItem): void;
  onDelete(item: FormListItem): void;
};

class FormList extends React.PureComponent<FormListProps> {
  render() {
    return (
      <GridView>
        {this.props.list.map((item) => (
          <FormCard
            onPreview={this.props.onPreview}
            onDelete={this.props.onDelete}
            key={item.schemaId}
            item={item}
          />
        ))}
      </GridView>
    );
  }
}

export default FormList;
