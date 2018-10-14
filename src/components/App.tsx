import React from 'react';
import styled from 'styled-components';

import FormViewer from 'components/Form/Viewer';
import UserForms from 'components/Form/List';
import { AppState, initialFormList, initialFormSchemas } from 'components/types';
import FormEditor from './Form/Editor';
import { FormInfo, FormListItem } from './Form/types';
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
  };

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

  handleFormSave = (updatedForm: FormInfo) => {
    console.log('save');
    
    // TODO проверка на новую запись
    this.setState({
      formList: [...this.state.formList, updatedForm.data],
      formSchemas: {
        ...this.state.formSchemas,
        [updatedForm.meta.id]: updatedForm.meta,
      },
      formToEdit: null,
      newForm: false,
    });
  }

  render() {
    const { formSchemas } = this.state;

    const formToEdit: FormInfo | null = this.state.formToEdit && formSchemas[this.state.formToEdit.schemaId] && {
      data: this.state.formToEdit,
      meta: formSchemas[this.state.formToEdit.schemaId],
    };

    const formToPreview: FormInfo | null = this.state.formToPreview && formSchemas[this.state.formToPreview.schemaId] && {
      data: this.state.formToPreview,
      meta: formSchemas[this.state.formToPreview.schemaId],
    };

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
        />
        <FormEditor
          onSave={this.handleFormSave}
          onClose={this.handleFormEditorClose}
          newForm={this.state.newForm}
          formToEdit={formToEdit}
        />
      </StyledApp>
    );
  }
}

export default App;
