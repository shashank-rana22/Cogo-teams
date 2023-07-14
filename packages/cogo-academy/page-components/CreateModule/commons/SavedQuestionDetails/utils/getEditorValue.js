import { isEmpty } from '@cogoport/utils';

const getEditorValue = ({ question_text, RichTextEditor = {} }) => {
	if (isEmpty(question_text)) {
		return RichTextEditor?.createEmptyValue();
	}

	return RichTextEditor?.createValueFromString((question_text || ''), 'html');
};

export default getEditorValue;
