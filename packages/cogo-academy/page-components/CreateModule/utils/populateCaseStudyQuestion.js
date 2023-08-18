import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getEditorValue from '../commons/SavedQuestionDetails/utils/getEditorValue';

const updateExplanationState = ({ prev, test_case_study_questions, RichTextEditor }) => {
	const updatedObj = { ...prev };

	test_case_study_questions.forEach((caseStudyQuestion, index) => {
		const {
			explanation:indExplanation = [],
		} = caseStudyQuestion || {};

		updatedObj[`case_questions_${index}_explanation`] = isEmpty(indExplanation)
			? RichTextEditor?.createEmptyValue()
			: RichTextEditor
				?.createValueFromString((indExplanation?.[GLOBAL_CONSTANTS.zeroth_index] || ''), 'html');
	});

	return updatedObj;
};

const updateQuestionState = ({ prev, test_case_study_questions, RichTextEditor }) => {
	const updatedObj = { ...prev };

	test_case_study_questions.forEach((caseStudyQuestion, index) => {
		const {
			question_text: indQuestionText,
		} = caseStudyQuestion || {};

		updatedObj[`case_questions_${index}`] = getEditorValue({
			question_text: indQuestionText,
			RichTextEditor,
		});
	});

	return updatedObj;
};

const populateCaseStudyQuestion = ({
	question_type,
	question_text,
	setCaseStudyQuestionEditorValue,
	setValue,
	test_case_study_questions,
	setEditorValue,
	RichTextEditor,
	difficulty_level,
	setQuestionState,
}) => {
	setValue('question_type', question_type);
	setCaseStudyQuestionEditorValue(isEmpty(question_text)
		? RichTextEditor?.createEmptyValue()
		: RichTextEditor?.createValueFromString((question_text || ''), 'html'));
	setValue('difficulty_level', difficulty_level);

	test_case_study_questions.forEach((caseStudyQuestion, index) => {
		const {
			test_question_answers:indTestQuestionAnswers,
			question_type: indQuestionType,
			question_text: indQuestionText,
		} = caseStudyQuestion || {};

		const childKey = `case_questions.${index}`;

		setValue(`${childKey}.question_type`, indQuestionType);
		setValue(`${childKey}.question_text`, indQuestionText);

		indTestQuestionAnswers.forEach((answer, answerIndex) => {
			const { answer_text, is_correct } = answer || {};

			const subChildKey = `${childKey}.options.${answerIndex}`;

			setValue(`${subChildKey}.answer_text`, answer_text);
			setValue(`${subChildKey}.is_correct`, is_correct ? 'true' : 'false');
		});
	});

	setEditorValue((prev) => ({
		...updateExplanationState({ prev, test_case_study_questions, RichTextEditor }),
	}));

	setQuestionState((prev) => ({
		...prev,
		editorValue: {
			...updateQuestionState({ prev: { ...prev.editorValue }, test_case_study_questions, RichTextEditor }),
		},
	}));
};

export default populateCaseStudyQuestion;
