import { isEmpty } from '@cogoport/utils';

import checkErrors from './checkErrors';

const getStandAlonePayload = ({
	values,
	action,
	testQuestionId,
	questionSetId,
	editDetails = {},
	editorValue = {},
	questionEditorValue = {},
	setQuestionError = () => {},
}) => {
	const { question = [], topic } = values || {};

	const {
		question_type,
		difficulty_level,
		options = [],
	} = question?.[0] || {};

	if (action === 'delete') {
		return { id: testQuestionId, status: 'inactive' };
	}

	if (!questionEditorValue?.question_0?.getEditorState().getCurrentContent().hasText()) {
		setQuestionError({ question_0: true });
		return {};
	}

	const hasError = [];

	const checkError = checkErrors({ options, question_type });

	if (checkError !== 'noError') {
		hasError.push(checkError);
	}

	if (!isEmpty(hasError)) {
		return { hasError };
	}

	const { test_question_answers = [] } = editDetails || {};

	const answers = options.map((item, index) => {
		const { is_correct } = item || {};

		return {
			...item,
			...(action === 'update' ? { test_question_answer_id: test_question_answers?.[index]?.id } : {}),
			is_correct      : is_correct === 'true',
			status          : 'active',
			sequence_number : index,
		};
	});

	return {
		...(action === 'update' ? { id: testQuestionId } : { test_question_set_id: questionSetId }),
		question_type,
		topic,
		difficulty_level,
		...(!isEmpty(questionEditorValue)
			? { question_text: questionEditorValue?.question_0.toString('html') } : {}),
		...(!isEmpty(editorValue) ? { explanation: [editorValue?.question_0_explanation.toString('html')] } : {}),
		answers,
	};
};

export default getStandAlonePayload;
