import React from 'react';
import styled from 'styled-components';

import FormViewer from 'components/Form/Viewer';
import UserForms from 'components/FormList';
import { AppState, initialFormList, initialFormSchemas, FormListItem } from 'components/types';


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

  handleFormDelete = (form: FormListItem) => {
    this.setState({
      formList: this.state.formList.filter(item => item.id !== form.id),
    });
  }

  render() {
    const { formToPreview, formSchemas } = this.state;

    return (
      <StyledApp>
        <UserForms
          list={this.state.formList}
          onPreview={this.handleFormPreviewOpen}
          onDelete={this.handleFormDelete}
        />
        <FormViewer
          onClose={this.handleFormPreviewClose}
          formToPreview={formToPreview}
          formSchema={formToPreview && formSchemas[formToPreview.schemaId]}
        />
      </StyledApp>
    );
  }
}

export default App;
