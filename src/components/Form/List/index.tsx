import React from 'react';
import styled from 'styled-components';

import { FormListItem } from 'components/types';
import FormCard, { CARD_WIDTH_PX } from './FormCard';
import { boxShadow1, spacing } from 'components/theme';


const GridView = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${CARD_WIDTH_PX}px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: 200px;
  overflow-y: scroll;

  flex: 1;

  margin: ${spacing.lg}px;
  padding: ${spacing.lg}px;

  box-shadow: ${boxShadow1};
  background-color: white;
`;

type FormListProps = {
  list: FormListItem[];
  onPreview(item: FormListItem): void;
  onDelete(item: FormListItem): void;
  onEdit(item: FormListItem): void;
};

class FormList extends React.PureComponent<FormListProps> {
  render() {
    return (
      <GridView>
        {this.props.list.map((item) => (
          <FormCard
            onPreview={this.props.onPreview}
            onDelete={this.props.onDelete}
            onEdit={this.props.onEdit}
            key={item.schemaId}
            item={item}
          />
        ))}
      </GridView>
    );
  }
}

export default FormList;
