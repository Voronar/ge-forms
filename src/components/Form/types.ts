
export type BaseInputSchema = {
  required: boolean;
};

export type SelectInputSchema = BaseInputSchema & {
  type: 'select',
  selectOptions: {
    id: string;
    value: any;
    label: string;
  }[];
};

export type StringInputSchema = BaseInputSchema & {
  type: 'string',
};

export type NumberInputSchema = BaseInputSchema & {
  type: 'number',
};

export type InputSchema =
  | StringInputSchema
  | NumberInputSchema
  | SelectInputSchema
;

export type FormSchema = {
  id: string;
  inputs: InputSchema[];
};
