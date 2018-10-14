import React from 'react';
import { Modal, Input, Button, Icon } from 'antd';
import Form from 'antd/lib/form';
import styled from 'styled-components';
import uuid from 'uuid/v1';

import { FormEditorProps, FormEditorState, baseFormInfo } from './types';


const FormItem = Form.Item;
const StyledFormEditor = styled.div``;

class FormEditor extends React.PureComponent<FormEditorProps, FormEditorState> {
  state: FormEditorState = {
    formSchema: null,
    formToEdit: null,
    visible: false,
  };

  componentDidUpdate(prevProps: FormEditorProps) {
    if (prevProps.newForm !== this.props.newForm && this.props.newForm) {
      const schemaId = uuid();

      this.setState({
        formSchema: {
          id: schemaId,
          inputs: [],
        },
        formToEdit: {
          description: '',
          name: '',
          id: uuid(),
          schemaId,
        },
        visible: true,
      });
    }

    if (
      prevProps.formToEdit !== this.props.formToEdit
      && prevProps.formSchema !== this.props.formSchema
      && (this.props.formToEdit !== null && this.props.formSchema !== null)
    ) {
      this.setState({
        formToEdit: { ...this.props.formToEdit },
        formSchema: { ...this.props.formSchema },
        visible: true,
      });
    }

    
    if (
      (this.state.formToEdit !== null && this.state.formSchema !== null)
      && (this.props.formToEdit === null || this.props.formSchema === null)
      && !this.props.newForm
      || (prevProps.newForm !== this.props.newForm && !this.props.newForm)
    ) {
      this.setState({
        formToEdit: null,
        formSchema: null,
      });
    }
  }
  handleClose = () => {
    this.setState({
      visible: false,
    });

    this.props.onClose();
  }
  handleSave = () => {
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render () {
    const { newForm } = this.props;
    const { formToEdit, formSchema } = this.state;
    const { getFieldDecorator } = this.props.form;

    const baseFormInputs = (formToEdit === null || formSchema === null) ? null : (
      <Form>
        <FormItem label="Name">
          {
            getFieldDecorator(baseFormInfo.name, {
              initialValue: formToEdit.name,
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
              initialValue: formToEdit.description,
            })(<Input/>)
          }
        </FormItem>
      </Form>
    );

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
          <Button type="dashed" >
            <Icon type="plus" /> Add field
          </Button>
        </StyledFormEditor>
      </Modal>
    );
  }
}

const WrappedFormEdit = Form.create()(FormEditor);

export default WrappedFormEdit;
