import { FormInfo, InputSchema, Option } from 'components/Form/types';

export const updateInputs = (formToEdit: FormInfo, updater: (inputFields: InputSchema[]) => InputSchema[]) => {
  return {
    ...formToEdit,
    meta: {
      ...formToEdit.meta,
      inputs: updater(formToEdit.meta.inputs),
    },
  };
};

export const inputTypes: Option[] = [
  'select',
  'string',
  'textarea',
  'file',
  'radiogroup',
  'checkbox',
  'number',
].map((type, i) => ({
  id: `${i}`,
  value: type,
  label: type,
}));
