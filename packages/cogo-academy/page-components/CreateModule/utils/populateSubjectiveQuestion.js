import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getEditorValue from '../commons/SavedQuestionDetails/utils/getEditorValue';

const populateSubjectiveQuestion = ({
	question_type,
	difficulty_level,
	character_limit,
	setUploadable,
	allow_file_upload,
	setValue,
	setQuestionState,
	setSubjectiveEditorValue,
	RichTextEditor,
	question_text,
	test_question_answers,
}) => {
	setValue('question_type', question_type);
	setValue('subjective.0.difficulty_level', difficulty_level);
	setValue('subjective.0.character_limit', character_limit);
	setUploadable(allow_file_upload);

	setQuestionState((prev) => ({
		...prev,
		editorValue: {
			...prev.editorValue,
			question_0: getEditorValue({ question_text, RichTextEditor }),
		},
	}));

	setSubjectiveEditorValue(isEmpty(test_question_answers)
		? RichTextEditor.createEmptyValue()
		: RichTextEditor
			?.createValueFromString((test_question_answers?.[GLOBAL_CONSTANTS.zeroth_index]
				?.answer_text || ''), 'html'));
};

export default populateSubjectiveQuestion;
