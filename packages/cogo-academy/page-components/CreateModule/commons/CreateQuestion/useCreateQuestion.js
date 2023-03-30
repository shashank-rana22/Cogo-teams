import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTestQuestion from '../../hooks/useCreateTestQuestion';
import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

const useCreateQuestion = ({
	item,
	setSavedQuestionDetails,
	topic,
	editDetails,
	setEditDetails,
	questionSetId,
	getTestQuestionTest,
	setAllKeysSaved,
}) => {
	const [questionTypeWatch, setQuestionTypeWatch] = useState('stand_alone');

	const { isNew: isNewQuestion = false, id } = item || {};

	const {
		watch,
		reset,
		setValue,
		...restFormProps
	} = useForm();

	const { createTestQuestion, loading } = useCreateTestQuestion({ reset });

	const { updateStandAloneTestQuestion } = useUpdateStandAloneTestQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
		reset,
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
	});

	const onSubmit = (values) => {
		if (!isNewQuestion && editDetails?.question_type !== 'case_study') {
			updateStandAloneTestQuestion({
				values,
				action         : 'update',
				testQuestionId : editDetails?.id,
			});
		} else {
			createTestQuestion({ values, questionSetId, getTestQuestionTest });
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
		const apiToUse = apiMapping[editDetails?.question_type === 'case_study'];

		apiToUse({
			id             : editDetails?.id,
			action         : 'delete',
			reset,
			testQuestionId : editDetails?.id,
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
	}, [watchQuestionType]);

	useEffect(() => {
		if (isEmpty(editDetails)) {
			return;
		}

		const { question_type, difficulty_level = '' } = editDetails || {};

		if (question_type === 'case_study') {
			const { question_text, test_case_study_questions = [] } = editDetails || {};

			setValue('question_type', question_type);
			setValue('question_text', question_text);
			setValue('difficulty_level', difficulty_level);

			test_case_study_questions.forEach((caseStudyQuestion, index) => {
				const {
					test_question_answers,
					question_type: indQuestionType,
					question_text: indQuestionText,
					explanation = [],
				} = caseStudyQuestion || {};

				setValue(`case_questions.${index}.question_type`, indQuestionType);
				setValue(`case_questions.${index}.question_text`, indQuestionText);
				setValue(`case_questions.${index}.audience_ids`, []);
				setValue(`case_questions.${index}.explanation`, explanation?.[0]);

				test_question_answers.forEach((answer, answerIndex) => {
					const { answer_text, is_correct } = answer || {};

					setValue(`case_questions.${index}.options.${answerIndex}.answer_text`, answer_text);

					setValue(
						`case_questions.${index}.options.${answerIndex}.is_correct`,
						is_correct ? 'true' : 'false',
					);
				});
			});
		} else {
			const { test_question_answers = [], question_text, explanation = [] } = editDetails || {};

			setValue('question_type', 'stand_alone');
			setValue('question.0.question_type', question_type);
			setValue('question.0.difficulty_level', difficulty_level);
			setValue('question.0.question_text', question_text);
			setValue('question.0.explanation', explanation?.[0]);

			test_question_answers.forEach((answer, index) => {
				const { answer_text, is_correct } = answer || {};

				setValue(`question.0.options.${index}.answer_text`, answer_text);

				setValue(`question.0.options.${index}.is_correct`, is_correct ? 'true' : 'false');
			});
		}
	}, [editDetails, setValue]);

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
		...restFormProps,
	};
};

export default useCreateQuestion;
