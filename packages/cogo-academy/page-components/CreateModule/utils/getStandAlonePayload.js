import { isEmpty } from '@cogoport/utils';

import checkErrors from './checkErrors';

const getStandAlonePayload = ({ values, action, testQuestionId, questionSetId }) => {
	const { question = [], topic } = values || {};

	const {
		question_type,
		difficulty_level,
		question_text,
		options = [],
		explanation,
	} = question?.[0] || {};

	const hasError = [];

	const checkError = checkErrors({ options, question_type });

	if (checkError !== 'noError') {
		hasError.push(checkError);
	}

	if (!isEmpty(hasError) && action !== 'delete') {
		return { hasError };
	}

	const answers = options.map((item, index) => {
		const { is_correct } = item || {};

		return {
			...item,
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
		question_text,
		explanation: [explanation],
		answers,
	};
};

export default getStandAlonePayload;
