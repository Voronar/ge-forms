import React from 'react';
import { Form, Input, Select, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';

import { InputSchema, Option, BaseInputSchema, SelectInputSchema } from 'components/Form/types';
import { SelectValue } from 'antd/lib/select';
import TagGroup from 'components/Form/Editor/Field/TagGroup';
import { inputTypes } from 'components/Form/Editor/utils';

const FormItem = Form.Item;
const AntOption = Select.Option;
const StyledFormField = styled.div``;

type FormFieldProps = {
  schema: InputSchema;
  onChange(inputSchema: InputSchema): void;
} & FormComponentProps;

class FormField extends React.PureComponent<FormFieldProps> {
  handleValidation = () => {
    this.props.form.validateFields((errors: any, values: any) => {
      console.log(errors, values);
    });
  }
  onSelectTypeChange = (value: SelectValue) => {
    const type = value as InputSchema['type'];

    switch (type) {
      case 'radiogroup':
      case 'select':
        this.props.onChange({
          ...this.props.schema,
          type: value as any,
          options: [],
        });
        return;
      
      default:
        this.props.onChange({
          ...this.props.schema,
          type: value as any,
        });
        return;
    }
  }
  onOptionsChange = (options: Option[]) => {
    const schema = this.props.schema as SelectInputSchema;
    
    this.props.onChange({
      ...schema,
      options,
    });
  }

  getDefaultFields() {
    const { schema } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <FormItem label="Label">
          {
            getFieldDecorator('label', {
              initialValue: schema.label,
              rules: [{
                message: `Please input input name`,
                required: true,
              }],
            })(<Input onChange={this.handleValidation} />)
          }
        </FormItem>
        <FormItem label="Type">
          {
            getFieldDecorator('type', {
              initialValue: schema.type,
            })(
              <Select onSelect={this.onSelectTypeChange}>
                {inputTypes.map(type => (
                  <AntOption key={type.id} value={type.value}>{type.label}</AntOption>
                ))}
              </Select>,
            )
          }
        </FormItem>
        <FormItem label="Required">
          {
            getFieldDecorator('required', {
              valuePropName: 'checked',
              initialValue: (schema as BaseInputSchema).required,
            })(<Checkbox />)
          }
        </FormItem>
      </>
    );

  }
  renderField() {
    const { schema } = this.props;
    // const { getFieldDecorator } = this.props.form;

    switch(schema.type) {
      case 'string':
      case 'number':
      case 'file':
      case 'textarea':
      case 'checkbox':
        return this.getDefaultFields();

      case 'radiogroup':
      case 'select':
        return (
          <div>
            {this.getDefaultFields()}
            <FormItem label="Options">
              <TagGroup
                tags={schema.options}
                onChange={this.onOptionsChange}
              />
            </FormItem>
          </div>
        );

      default: return null;
    }
  }
  render() {
    const field = this.renderField();

    return (
      <StyledFormField>
        <Form>
          {field}
        </Form>
      </StyledFormField>
    );
  }
}

const WrappedFormField = Form.create()(FormField);

export default WrappedFormField;
