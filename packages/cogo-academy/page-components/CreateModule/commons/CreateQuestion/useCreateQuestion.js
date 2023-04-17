import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTestQuestion from '../../hooks/useCreateTestQuestion';
import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

let RichTextEditor;
if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

const useCreateQuestion = ({
	item,
	setSavedQuestionDetails,
	topic,
	editDetails,
	setEditDetails,
	questionSetId,
	getTestQuestionTest,
	setAllKeysSaved,
	listSetQuestions,
}) => {
	const [questionTypeWatch, setQuestionTypeWatch] = useState('stand_alone');
	const [uploadable, setUploadable] = useState(false);
	const [editorValue, setEditorValue] = useState(
		questionTypeWatch === 'stand_alone'
			? { question_0_explanation: RichTextEditor.createEmptyValue() }
			: { case_questions_0_explanation: RichTextEditor.createEmptyValue() },
	);

	const [subjectiveEditorValue, setSubjectiveEditorValue] = useState(RichTextEditor.createEmptyValue());

	const { isNew: isNewQuestion = false, id } = item || {};

	const {
		question_type = '',
		id: editDetailsId = '',
		difficulty_level,
		question_text,
		test_case_study_questions = [],
		test_question_answers = [],
		explanation = [],
		character_limit = '',
		allow_file_upload,
	} = editDetails || {};

	const {
		watch,
		reset,
		setValue,
		...restFormProps
	} = useForm();

	const { createTestQuestion, loading } = useCreateTestQuestion({
		reset,
		getTestQuestionTest,
		questionSetId,
		listSetQuestions,
		editorValue,
		subjectiveEditorValue,
		setSubjectiveEditorValue,
		uploadable,
		setUploadable,
	});

	const { updateStandAloneTestQuestion, loading: updateStandAloneLoading } = useUpdateStandAloneTestQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
		reset,
		subjectiveEditorValue,
		listSetQuestions,
		editDetails,
		editorValue,
		uploadable,
	});

	const {
		loading: updateCaseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy({
		setEditDetails,
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		reset,
		listSetQuestions,
	});

	const onSubmit = (values) => {
		if (!isNewQuestion && question_type !== 'case_study') {
			updateStandAloneTestQuestion({
				values,
				action         : 'update',
				testQuestionId : editDetailsId,
				question_type,
			});
		} else {
			createTestQuestion({ values, editDetails });
		}
	};

	const deleteQuestion = () => {
		if (!isEmpty(editDetails)) {
			setEditDetails({});
		} else if (isNewQuestion) {
			setSavedQuestionDetails((prev) => prev.filter((item1) => item1.id !== id));
		}

		setAllKeysSaved(true);
	};

	const handleDeleteStandAloneQuestion = () => {
		const apiMapping = {
			true  : updateCaseStudy,
			false : updateStandAloneTestQuestion,
		};
		const apiToUse = apiMapping[question_type === 'case_study'];

		apiToUse({
			id             : editDetailsId,
			action         : 'delete',
			reset,
			testQuestionId : editDetailsId,
			question_type,
		});
	};

	const watchQuestionType = watch('question_type');

	useEffect(() => {
		if (!isEmpty(topic)) {
			setValue('topic', topic);
		}
	}, [setValue, topic]);

	useEffect(() => {
		setQuestionTypeWatch(watchQuestionType);

		if (isEmpty(editDetails)) {
			setEditorValue(watchQuestionType === 'stand_alone'
				? { question_0_explanation: RichTextEditor.createEmptyValue() }
				: { case_questions_0_explanation: RichTextEditor.createEmptyValue() });
		}
	}, [editDetails, watchQuestionType]);

	useEffect(() => {
		if (isEmpty(editDetails)) {
			return;
		}

		if (question_type === 'case_study') {
			setValue('question_type', question_type);
			setValue('question_text', question_text);
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
						? RichTextEditor.createEmptyValue()
						: RichTextEditor?.createValueFromString((indExplanation?.[0] || ''), 'html'),
				}));

				indTestQuestionAnswers.forEach((answer, answerIndex) => {
					const { answer_text, is_correct } = answer || {};

					const subChildKey = `${childKey}.options.${answerIndex}`;

					setValue(`${subChildKey}.answer_text`, answer_text);
					setValue(`${subChildKey}.is_correct`, is_correct ? 'true' : 'false');
				});
			});
		} else if (question_type === 'subjective') {
			setValue('question_type', question_type);
			setValue('subjective.0.question_text', question_text);
			setValue('subjective.0.difficulty_level', difficulty_level);
			setValue('subjective.0.character_limit', character_limit);
			setUploadable(allow_file_upload);

			setSubjectiveEditorValue(isEmpty(explanation)
				? RichTextEditor.createEmptyValue()
				: RichTextEditor?.createValueFromString((explanation?.[0] || ''), 'html'));
		} else {
			const childKey = 'question.0';

			setValue('question_type', 'stand_alone');
			setValue(`${childKey}.question_type`, question_type);
			setValue(`${childKey}.difficulty_level`, difficulty_level);
			setValue(`${childKey}.question_text`, question_text);

			setEditorValue((prev) => ({
				...prev,
				question_0_explanation: isEmpty(explanation)
					? RichTextEditor.createEmptyValue()
					: RichTextEditor?.createValueFromString((explanation?.[0] || ''), 'html'),
			}));

			test_question_answers.forEach((answer, index) => {
				const { answer_text, is_correct } = answer || {};

				const subChildKey = `${childKey}.options.${index}`;

				setValue(`${subChildKey}.answer_text`, answer_text);
				setValue(`${subChildKey}.is_correct`, is_correct ? 'true' : 'false');
			});
		}
	}, [difficulty_level,
		editDetails,
		explanation,
		question_text,
		question_type,
		setValue,
		test_case_study_questions,
		test_question_answers,
		character_limit,
		allow_file_upload,
	]);

	return {
		isNewQuestion,
		setValue,
		questionTypeWatch,
		reset,
		handleDeleteStandAloneQuestion,
		loading,
		deleteQuestion,
		updateCaseStudyLoading,
		onSubmit,
		editorValue,
		setEditorValue,
		updateStandAloneLoading,
		subjectiveEditorValue,
		setSubjectiveEditorValue,
		uploadable,
		setUploadable,
		...restFormProps,
	};
};

export default useCreateQuestion;
