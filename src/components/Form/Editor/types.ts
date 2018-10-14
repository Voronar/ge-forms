import { FormComponentProps } from 'antd/lib/form';
import { FormInfo, BaseFormInfo } from 'components/Form/types';

export const baseFormInfo: BaseFormInfo = {
  name: 'name',
  description: 'description',
};

export type FormEditorProps = {
  formToEdit: FormInfo | null;
  newForm: boolean;
  onClose(): void;
  onSave(updatedForm: FormInfo): void;
} & FormComponentProps;

export type FormEditorState = {
  formToEdit: FormInfo | null;
  visible: boolean;
};
