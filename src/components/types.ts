import { FormSchema } from 'components/Form/types';

export type FormListItem = {
  id: string;
  schemaId: string;
  name: string;
  description: string;
};

export type AppState = {
  formList: FormListItem[],
  formSchemas: Record<string, FormSchema>;
  formToPreview: FormListItem | null,
};

export const initialFormSchemas: Record<string, FormSchema> = {
  schemaId1: {
    id: 'schemaId1',
    inputs: [
      { id: 'id1', required: true, type: 'string', label: 'field1' },
      { id: 'id2', required: true, type: 'number', label: 'field2' },
      { id: 'id3',
        required: true,
        type: 'select',
        selectOptions: [{ id: '1', label: 'option1', value: 1 }],
        label: 'field3',
      },
      { id: 'id4', required: true, type: 'textarea', label: 'field4' },
      { id: 'id5',
        type: 'radiogroup',
        groupOptions: [
          { id: 'id1', label: 'option1', value: 1 },
          { id: 'id2', label: 'option2', value: 2 },
        ],
        label: 'field5',
      },
      { id: 'id6', type: 'checkbox', label: 'field6' },
      { id: 'id7', required: true, type: 'file', label: 'field7' },
    ],
  },
};

export const initialFormList: FormListItem[] = [
  { id: 'id1', schemaId: 'schemaId1', name: 'myForm1', description: 'awesome form' },
];
