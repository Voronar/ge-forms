import React from 'react';
import { Modal, Input, Button, Icon, Collapse } from 'antd';
import Form from 'antd/lib/form';
import styled from 'styled-components';
import uuid from 'uuid/v1';

import { FormEditorProps, FormEditorState, baseFormInfo } from './types';
import FormField from './Field';
import { FieldPanel, PanelHeader, DeleteFieldButton } from 'components/Form/Editor/styled';
import { InputSchema, FormListItem } from 'components/Form/types';
import { updateInputs, validateDataObject, notifyValidationError } from 'components/Form/Editor/utils';

const FormItem = Form.Item;
const StyledFormEditor = styled.div``;

class FormEditor extends React.PureComponent<FormEditorProps, FormEditorState> {
  fieldEditForms: Record<string, Form> = {};

  state: FormEditorState = {
    formToEdit: null,
    visible: false,
  };

  componentDidUpdate(prevProps: FormEditorProps) {
    if (prevProps.newForm !== this.props.newForm && this.props.newForm) {
      const schemaId = uuid();

      this.setState({
        formToEdit: {
          meta: {
            id: schemaId,
            inputs: [],
          },
          data: {
            description: '',
            name: '',
            id: uuid(),
            schemaId,
          },
        },
        visible: true,
      });
    }

    if (
      prevProps.formToEdit !== this.props.formToEdit
      && (this.props.formToEdit !== null)
    ) {
      this.setState({
        formToEdit: { ...this.props.formToEdit },
        visible: true,
      });
    }

    
    if (
      this.state.formToEdit !== null && this.props.formToEdit === null && !this.props.newForm
      || (prevProps.newForm !== this.props.newForm && !this.props.newForm)
    ) {
      this.setState({ formToEdit: null, visible: false, });
    }
  }
  componentWillUnmount() {
    this.fieldEditForms = {};
  }
  handleClose = () => {
    this.setState({
      visible: false,
    });

    this.props.onClose();
  }
  handleSave = () => {
    this.props.form.validateFields((err: any, values: FormListItem) => {
      if (!err) {
        const { formToEdit } = this.state;
        if (!formToEdit) {
          return;
        }

        const formFieldState = formToEdit.meta.inputs.map(meta => {
          const fieldFormProps = this.fieldEditForms[meta.id].props;
          const fieldFormMetaData = (fieldFormProps.form !== undefined && fieldFormProps.form.getFieldsValue()) || {};
          const fieldFormMetaErrors = (fieldFormProps.form !== undefined && fieldFormProps.form.getFieldsError()) || {};

          return {
            fieldFormMetaData,
            fieldFormMetaErrors,
          };
        });

        const isFieldsValid = formFieldState.map(fieldForm => validateDataObject(fieldForm.fieldFormMetaErrors)).every(item => item);

        if (!isFieldsValid) {
          notifyValidationError();
          return;
        }

        this.props.onSave({
          ...formToEdit,
          data: {
            ...formToEdit.data,
            ...values,
          },
          meta: {
            ...formToEdit.meta,
            inputs: formToEdit.meta.inputs.map((meta, i) => ({
              ...meta,
              ...formFieldState[i].fieldFormMetaData,
            })),
          },
        });
      } else {
        notifyValidationError();
      }
    });
  }
  handleDeleteField = (inputField: InputSchema) => {
    const { formToEdit } = this.state;
    if (formToEdit === null) {
      return;
    }

    this.setState({
      formToEdit: updateInputs(formToEdit, (inputs) => inputs.filter(input => input.id !== inputField.id)),
    });
  }
  handleAddField = () => {
    const { formToEdit } = this.state;
    if (formToEdit === null) {
      return;
    }

    const inputField: InputSchema = {
      id: uuid(),
      label: 'new field',
      required: false,
      type: 'string',
    };

    this.setState({
      formToEdit: updateInputs(formToEdit, (inputs) => [...inputs, inputField]),
    });
  }
  handleFieldInfoChange = (incomingInput: InputSchema) => {
    const { formToEdit } = this.state;
    if (formToEdit === null) {
      return;
    }

    this.setState({
      formToEdit: updateInputs(formToEdit, (inputs) => inputs.map(
        currentInput => currentInput.id === incomingInput.id
          ? incomingInput
          : currentInput,
      )),
    });
  }
  render () {
    const { newForm } = this.props;
    const { formToEdit } = this.state;
    const { getFieldDecorator } = this.props.form;

    const baseFormInputs = formToEdit && (
      <Form>
        <FormItem label="Name">
          {
            getFieldDecorator(baseFormInfo.name, {
              initialValue: formToEdit.data.name,
              rules: [{
                message: `Please input form name`,
                required: true,
              }],
            })(<Input/>)
          }
        </FormItem>
        <FormItem label="Description">
          {
            getFieldDecorator(baseFormInfo.description, {
              initialValue: formToEdit.data.description,
            })(<Input/>)
          }
        </FormItem>
      </Form>
    );

    const formFields = formToEdit && (
      formToEdit.meta.inputs.map(input => (
        <Collapse defaultActiveKey={formToEdit.meta.inputs.map(f => f.id)} key={input.id}>
          <FieldPanel key={input.id} header={
            <PanelHeader>
              <div>{input.label}</div>
              <DeleteFieldButton onDelete={this.handleDeleteField} inputField={input} />
            </PanelHeader>
          }>
            <FormField
              schema={input}
              onChange={this.handleFieldInfoChange}
              // tslint:disable-next-line:jsx-no-lambda
              wrappedComponentRef={(formComponent: Form) => this.fieldEditForms[input.id] = formComponent}
            />
          </FieldPanel>
        </Collapse>
      ),
    ));

    const title = newForm ? 'New form' : 'Form edition';

    return (
      <Modal
        width="50%"
        maskClosable={false}
        destroyOnClose={true}
        onCancel={this.handleClose}
        onOk={this.handleSave}
        title={<h3>{title}</h3>}
        visible={this.state.visible}
      >
        <StyledFormEditor>
          <h4>Base form info</h4>
          {baseFormInputs}
          <h4>Fields</h4>
          {formFields}
          <Button onClick={this.handleAddField} type="dashed">
            <Icon type="plus" /> Add field
          </Button>
        </StyledFormEditor>
      </Modal>
    );
  }
}

const WrappedFormEdit = Form.create()(FormEditor);

export default WrappedFormEdit;
