import { isEmpty } from '@cogoport/utils';

const START_INDEX = 0;

const getSubjectivePayload = ({
	action = '',
	values,
	questionSetId,
	testQuestionId = '',
	editDetails = {},
	questionState,
	setQuestionState,
	subjectiveEditorValue = {},
	uploadable = false,
}) => {
	const { topic, subjective = [],	question_type } = values || {};

	const { test_question_answers = [] } = editDetails || {};

	const {
		difficulty_level,
		character_limit,
	} = subjective?.[START_INDEX] || {};

	if (action === 'delete') {
		return { id: testQuestionId, status: 'inactive' };
	}

	if (!questionState?.editorValue?.question_0?.getEditorState()?.getCurrentContent()?.hasText()) {
		setQuestionState((prev) => ({
			...prev,
			error: { question_0: true },
		}));
		return { hasError: ['Question is required'] };
	}

	return {
		id                   : testQuestionId,
		test_question_set_id : questionSetId,
		question_type,
		topic,
		difficulty_level,
		...(!isEmpty(questionState?.editorValue)
			? { question_text: questionState?.editorValue?.question_0?.toString('html') } : {}),
		character_limit,
		answers: [{
			test_question_answer_id : test_question_answers?.[START_INDEX]?.id,
			answer_text             : subjectiveEditorValue.toString('html'),
			is_correct              : true,
			sequence_number         : 0,
			file_url                : '',
			status                  : 'active',
		}],
		explanation       : [''],
		allow_file_upload : uploadable,

	};
};

export default getSubjectivePayload;
