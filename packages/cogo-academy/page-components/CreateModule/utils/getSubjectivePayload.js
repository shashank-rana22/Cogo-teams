const getSubjectivePayload = ({
	action = '',
	values,
	questionSetId,
	testQuestionId = '',
	editDetails = {},
	subjectiveEditorValue = {},
	uploadable = false,
}) => {
	const { topic, subjective = [],	question_type } = values || {};

	const { test_question_answers = [] } = editDetails || {};

	const {
		difficulty_level,
		question_text,
		character_limit,
	} = subjective?.[0] || {};

	if (action === 'delete') {
		return { id: testQuestionId, status: 'inactive' };
	}
	
	return {
		id                   : testQuestionId,
		test_question_set_id : questionSetId,
		question_type,
		topic,
		difficulty_level,
		question_text,
		character_limit,
		answers              : [{
			test_question_answer_id : test_question_answers?.[0]?.id,
			answer_text             : subjectiveEditorValue.toString('html'),
			is_correct              : true,
			sequence_number         : 0,
			file_url                : '',
			status                  : 'active',
		}],
		explanation       : [subjectiveEditorValue.toString('html')],
		allow_file_upload : uploadable,

	};
};

export default getSubjectivePayload;
