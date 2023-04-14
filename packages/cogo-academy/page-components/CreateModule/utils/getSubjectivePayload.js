const getSubjectivePayload = ({
	values,
	questionSetId,
	subjectiveEditorValue = '',
}) => {
	const { topic, subjective = [],	question_type } = values || {};

	const {
		difficulty_level,
		question_text,
		max_marks,
		character_limit,
	} = subjective?.[0] || {};

	return {
		test_question_set_id : questionSetId,
		question_type,
		topic,
		difficulty_level,
		question_text,
		max_marks,
		character_limit,
		answers              : [{
			answer_text     : subjectiveEditorValue.toString('html'),
			is_correct      : true,
			sequence_number : 0,
		}],
		explanation: [subjectiveEditorValue.toString('html')],
		// uploadable: uploadable,

	};
};

export default getSubjectivePayload;
