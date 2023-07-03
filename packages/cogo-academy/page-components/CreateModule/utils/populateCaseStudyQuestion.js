import { isEmpty } from '@cogoport/utils';

import getEditorValue from '../commons/SavedQuestionDetails/utils/getEditorValue';

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
	START_INDEX,
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
			explanation:indExplanation = [],
		} = caseStudyQuestion || {};

		const childKey = `case_questions.${index}`;

		setValue(`${childKey}.question_type`, indQuestionType);
		setValue(`${childKey}.question_text`, indQuestionText);

		setEditorValue((prev) => ({
			...prev,
			[`case_questions_${index}_explanation`]: isEmpty(indExplanation)
				? RichTextEditor?.createEmptyValue()
				: RichTextEditor?.createValueFromString((indExplanation?.[START_INDEX] || ''), 'html'),
		}));

		setQuestionState((prev) => ({
			...prev,
			editorValue: {
				...prev.editorValue,
				[`case_questions_${index}`]: getEditorValue({ question_text: indQuestionText, RichTextEditor }),
			},
		}));

		indTestQuestionAnswers.forEach((answer, answerIndex) => {
			const { answer_text, is_correct } = answer || {};

			const subChildKey = `${childKey}.options.${answerIndex}`;

			setValue(`${subChildKey}.answer_text`, answer_text);
			setValue(`${subChildKey}.is_correct`, is_correct ? 'true' : 'false');
		});
	});
};

export default populateCaseStudyQuestion;
