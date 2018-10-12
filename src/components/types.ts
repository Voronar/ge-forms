import { FormSchema } from './Form/types';

export type FormListItem= {
  schemaId: string;
  name: string;
};

export type AppState = {
  formList: FormListItem[],
  formSchemas: Record<string, FormSchema>;
  formToPreview: FormListItem | null,
};

export const initialFormSchemas: Record<string, FormSchema> = {
  id1: {
    id: 'id1',
    inputs: [
      { required: false, type: 'string' },
      { required: false, type: 'number' },
      { required: false, type: 'select', selectOptions: [{ id: '1', label: 'option1', value: 1 }] },
    ],
  },
  id2: {
    id: 'id2',
    inputs: [
      { required: true, type: 'string' },
      { required: true, type: 'number' },
      { required: false, type: 'select', selectOptions: [{ id: '1', label: 'option1', value: 1 }] },
    ],
  },
};

export const initialFormList: FormListItem[]= [
  { schemaId: 'id1', name: 'myForm1' },
  { schemaId: 'id2', name: 'myForm2' },
];
