import { isEmpty } from '@cogoport/utils';

import checkErrors from './checkErrors';

const getCaseStudyPayload = ({
	editType,
	values,
	action,
	caseStudyQuestionId,
	testQuestionId,
	questionSetId,
	editDetails = {},
	index: questionIndex = '',
	questionState = {},
	setQuestionState,
	caseStudyQuestionEditorValue = {},
	editorValue = {},
}) => {
	if (editType === 'case_question') {
		const { options = [], question_type } = values || {};

		if (action === 'delete') {
			return { id: caseStudyQuestionId, status: 'inactive', answers: [] };
		}

		const hasError = [];

		const checkError = checkErrors({
			options,
			question_type,
			hasText: questionState?.editorValue?.
				[`case_questions_${questionIndex}`]?.getEditorState()?.getCurrentContent()?.hasText(),
		});

		if (checkError !== 'noError') {
			if (checkError === 'Question is required') {
				setQuestionState((prev) => ({
					...prev,
					error: {
						...prev.error,
						[`case_questions_${questionIndex}`]: true,
					},
				}));
			}
			hasError.push(checkError);
		}

		if (!isEmpty(hasError)) {
			return { hasError };
		}

		const { test_case_study_questions = {} } = editDetails || {};

		const { test_question_answers = [] } = test_case_study_questions?.[questionIndex] || {};

		const answers = options.map((option, index) => {
			const { is_correct, answer_text } = option || {};

			return {
				answer_text,
				is_correct      : is_correct === 'true',
				status          : 'active',
				sequence_number : index,
				...(action === 'update' ? { test_question_answer_id: test_question_answers?.[index]?.id } : {}),
			};
		});

		return {
			...(action === 'update' ? { id: caseStudyQuestionId } : { test_question_id: testQuestionId }),
			question_text : questionState?.editorValue?.[`case_questions_${questionIndex}`].toString('html'),
			question_type,
			answers,
			explanation   : [editorValue?.[`case_questions_${questionIndex}_explanation`].toString('html')],
		};
	}
	const {
		case_questions = [],
		topic,
		question_type,
		difficulty_level,
	} = values || {};

	const questions = case_questions.map((item, caseQuestionIndex) => {
		const {
			question_type: indQuestionType,
			options,
		} = item || {};

		const answers = options.map((option, index) => {
			const { is_correct, answer_text } = option || {};

			return {
				answer_text,
				is_correct      : is_correct === 'true',
				status          : 'active',
				sequence_number : index,
			};
		});

		return {
			question_type : indQuestionType,
			question_text : questionState?.editorValue?.[`case_questions_${caseQuestionIndex}`].toString('html'),
			answers,
			explanation   : [editorValue?.[`case_questions_${caseQuestionIndex}_explanation`].toString('html')],
		};
	});

	const hasError = [];

	case_questions.forEach((item, index) => {
		const { options, question_type:indQuestionType } = item || {};
		const checkError = checkErrors({
			options,
			question_type : indQuestionType,
			hasText       : questionState?.editorValue?.
				[`case_questions_${index}`]?.getEditorState()?.getCurrentContent()?.hasText(),
		});

		if (checkError !== 'noError') {
			if (checkError === 'Question is required') {
				setQuestionState((prev) => ({
					...prev,
					error: {
						...prev.error,
						[`case_questions_${index}`]: true,
					},
				}));
			}
			hasError.push(checkError);
		}
	});

	if (!isEmpty(hasError) && action !== 'delete') {
		return { hasError };
	}

	return {
		test_question_set_id : questionSetId,
		question_text        : caseStudyQuestionEditorValue.toString('html'),
		topic,
		question_type,
		difficulty_level,
		questions,
	};
};

export default getCaseStudyPayload;
