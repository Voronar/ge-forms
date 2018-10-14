import { Omit } from 'utils/types';

export type Option = {
  id: string;
  value: any;
  label: string;
};

export type BaseInputSchema = {
  label: string;
  id: string;
  required: boolean;
};

export type SelectInputSchema = BaseInputSchema & {
  type: 'select',
  multiple?: boolean;
  options: Option[];
};

export type StringInputSchema = BaseInputSchema & {
  type: 'string',
};

export type TextAreaInputSchema = BaseInputSchema & {
  type: 'textarea',
};

export type FileInputSchema = BaseInputSchema & {
  type: 'file',
};

export type RadioGroupInputSchema = Omit<BaseInputSchema, 'required'> & {
  type: 'radiogroup',
  options: Option[];
};

export type CheckboxInputSchema = Omit<BaseInputSchema, 'required'> & {
  type: 'checkbox',
};

export type NumberInputSchema = BaseInputSchema & {
  type: 'number',
};

export type InputSchema =
  | StringInputSchema
  | NumberInputSchema
  | SelectInputSchema
  | TextAreaInputSchema
  | RadioGroupInputSchema
  | CheckboxInputSchema
  | FileInputSchema
;

export type FormSchema = {
  id: string;
  inputs: InputSchema[];
};

export type BaseFormInfo = {
  name: 'name';
  description: 'description';
};

export type FormListItem = {
  id: string;
  schemaId: string;
} & Record<keyof BaseFormInfo, string>;

export type FormInfo = {
  data: FormListItem;
  meta: FormSchema;
};
