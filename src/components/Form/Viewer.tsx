import React from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Form, Icon, Input, Modal, Radio, Select, Upload } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import RadioGroup from 'antd/lib/radio/group';

import { BaseInputSchema, FormSchema, InputSchema } from 'components/Form/types';
import { FormListItem } from 'components/types';

const FormItem = Form.Item;
const Option = Select.Option;

const StyledFormViewer = styled.div``;

type FormViewerProps = {
  formToPreview: FormListItem | null;
  formSchema: FormSchema | null;
  onClose(): void;
} & FormComponentProps;

class FormViewer extends React.PureComponent<FormViewerProps> {
  getDefaultFormItem(input: InputSchema, item: React.ReactNode) {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem
        label={input.label}
        key={input.id}
      >
        {
          getFieldDecorator(input.id, {
            rules: [{
              message: `Please input your ${input.label}`,
              required: (input as BaseInputSchema).required,
            }],
          })(item)
        }
      </FormItem>
    );
  }
  renderInputs() {
    if (this.props.formSchema === null) {
      return null;
    }

    return this.props.formSchema.inputs.map((input) => {
      switch(input.type) {
        case 'number':
          return this.getDefaultFormItem(input, <Input type="number"/>);

        case 'string':
          return this.getDefaultFormItem(input, <Input type="string"/>);

        case 'textarea':
          return this.getDefaultFormItem(input, <TextArea />);
          
        case 'radiogroup':
          return this.getDefaultFormItem(input,
            <RadioGroup>
              {input.groupOptions.map(option => (
                <Radio key={option.id} value={option.value}>{option.label}</Radio>
              ))}
            </RadioGroup>,
          );

        case 'checkbox':
          return this.getDefaultFormItem(input, <Checkbox />);

        case 'file':
          return this.getDefaultFormItem(input,
            <Upload>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>,
          );
          

        case 'select':
          return this.getDefaultFormItem(input,
            <Select allowClear={true} mode={input.multiple ? 'multiple' : 'default'}>
              {input.selectOptions.map(option => (
                <Option key={option.id} value={option.value}>{option.label}</Option>
              ))}
            </Select>,
          );

        default: return null;
      }
    });
  }

  render() {
    const { formToPreview, formSchema } = this.props;

    const inputs = this.renderInputs();

    return (
      <Modal
        destroyOnClose={true}
        onCancel={this.props.onClose}
        title={formToPreview && formToPreview.name + ' preview'}
        visible={![formToPreview, formSchema].includes(null)}
        footer=""
      >
        <StyledFormViewer>
          <Form>
            {inputs}
          </Form>
        </StyledFormViewer>
      </Modal>
    );
  }
}

const WrappedFormViewer = Form.create()(FormViewer);

export default WrappedFormViewer;
