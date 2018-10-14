import { FormComponentProps } from 'antd/lib/form';
import { FormListItem, BaseFormInfo } from 'components/types';
import { FormSchema } from 'components/Form/types';

export const baseFormInfo: BaseFormInfo = {
  name: 'name',
  description: 'description',
};

export type FormEditorProps = {
  formToEdit: FormListItem | null;
  formSchema: FormSchema | null;
  newForm: boolean;
  onClose(): void;
  onSave(updatedSchema: FormSchema, updatedForm: FormListItem): void;
} & FormComponentProps;

export type FormEditorState = {
  formToEdit: FormListItem | null;
  formSchema: FormSchema | null;
  visible: boolean;
};
