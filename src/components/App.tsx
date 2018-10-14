import React from 'react';
import styled from 'styled-components';

import FormViewer from 'components/Form/Viewer';
import UserForms from 'components/Form/List';
import { AppState, initialFormList, initialFormSchemas, FormListItem } from 'components/types';
import FormEditor from './Form/Editor';
import { FormSchema } from './Form/types';
import ActionBar from './ActionBar';


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: #e9ebee;
`;

class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    formList: [...initialFormList],
    formSchemas: { ...initialFormSchemas },
    formToPreview: null,
    formToEdit: null,
    newForm: false,
  }

  handleNewForm = (state: boolean = true) => this.setState({ newForm: state });
  handleFormPreviewOpen = (formItem: FormListItem) => this.setState({ formToPreview: formItem });
  handleFormEditOpen = (formItem: FormListItem) => this.setState({ formToEdit: formItem });

  handleFormPreviewClose = () => this.setState({ formToPreview: null });
  handleFormEditorClose = () => {
    if (this.state.newForm) {
      this.setState({ newForm: false });
    } else {
      this.setState({ formToEdit: null });
    }
  }

  handleFormDelete = (form: FormListItem) => {
    this.setState({
      formList: this.state.formList.filter(item => item.id !== form.id),
    });
  }

  handleFormSave = (upcomingSchema: FormSchema, upcomingForm: FormListItem) => {
    console.log('save');
  }

  render() {
    const { formToPreview, formSchemas, formToEdit } = this.state;

    return (
      <StyledApp>
        <ActionBar onNewForm={this.handleNewForm}/>
        <UserForms
          list={this.state.formList}
          onPreview={this.handleFormPreviewOpen}
          onDelete={this.handleFormDelete}
          onEdit={this.handleFormEditOpen}
        />
        <FormViewer
          onClose={this.handleFormPreviewClose}
          formToPreview={formToPreview}
          formSchema={formToPreview && formSchemas[formToPreview.schemaId]}
        />
        <FormEditor
          onSave={this.handleFormSave}
          onClose={this.handleFormEditorClose}
          newForm={this.state.newForm}
          formToEdit={formToEdit}
          formSchema={formToEdit && formSchemas[formToEdit.schemaId]}
        />
      </StyledApp>
    );
  }
}

export default App;
