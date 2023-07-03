import { isEmpty } from '@cogoport/utils';

const populateStandAloneQuestion = ({
	setValue,
	question_type,
	difficulty_level,
	explanation,
	question_text,
	test_question_answers,
	setEditorValue,
	setQuestionState,
	RichTextEditor,
	START_INDEX,
}) => {
	const CHILD_KEY = 'question.0';

	setValue('question_type', 'stand_alone');
	setValue(`${CHILD_KEY}.question_type`, question_type);
	setValue(`${CHILD_KEY}.difficulty_level`, difficulty_level);

	setEditorValue((prev) => ({
		...prev,
		question_0_explanation: isEmpty(explanation)
			? RichTextEditor?.createEmptyValue()
			: RichTextEditor?.createValueFromString((explanation?.[START_INDEX] || ''), 'html'),
	}));

	setQuestionState((prev) => ({
		...prev,
		editorValue: {
			...prev.editorValue,
			question_0: isEmpty(question_text)
				? RichTextEditor?.createEmptyValue()
				: RichTextEditor?.createValueFromString((question_text || ''), 'html'),
		},
	}));

	test_question_answers.forEach((answer, index) => {
		const { answer_text, is_correct } = answer || {};

		const subChildKey = `${CHILD_KEY}.options.${index}`;

		setValue(`${subChildKey}.answer_text`, answer_text);
		setValue(`${subChildKey}.is_correct`, is_correct ? 'true' : 'false');
	});
};

export default populateStandAloneQuestion;
