import { Modal } from 'antd';
import UserForms from 'components/FormList';
import React from 'react';
import styled from 'styled-components';
import { AppState, FormListItem, initialFormList, initialFormSchemas } from './types';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  background-color: #e9ebee;
`;

class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    formList: [...initialFormList],
    formSchemas: { ...initialFormSchemas },
    formToPreview: null,
  }

  handleFormPreviewOpen = (formItem: FormListItem) => {
    this.setState({ formToPreview: formItem });
  }

  handleFormPreviewClose = () => {
    this.setState({ formToPreview: null });
  }

  render() {
    const { formToPreview } = this.state;

    return (
      <StyledApp>
        <UserForms
          list={this.state.formList}
          onPreview={this.handleFormPreviewOpen}
        />
        <Modal onCancel={this.handleFormPreviewClose} visible={formToPreview !== null}>
          {formToPreview && formToPreview.name}
        </Modal>
      </StyledApp>
    );
  }
}

export default App;
