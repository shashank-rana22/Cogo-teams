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
		...rest
	} = useForm();

	const { createTestQuestion, loading } = useCreateTestQuestion();

	const { updateStandAloneTestQuestion } = useUpdateStandAloneTestQuestion();

	const {
		loading: updateCaseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const onSubmit = (values) => {
		if (!isNewQuestion && editDetails?.question_type !== 'case_study') {
			updateStandAloneTestQuestion({
				values,
				questionSetId,
				getTestQuestionTest,
				reset,
				action         : 'update',
				setAllKeysSaved,
				setEditDetails,
				testQuestionId : editDetails?.id,
			});
		} else {
			createTestQuestion({ values, questionSetId, getTestQuestionTest, reset });
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

	const handleDeleteStandAloneQuestion = async () => {
		const apiMapping = {
			true  : updateCaseStudy,
			false : updateStandAloneTestQuestion,
		};
		const apiToUse = apiMapping[editDetails?.question_type === 'case_study'];

		await apiToUse({
			id             : editDetails?.id,
			action         : 'delete',
			getTestQuestionTest,
			questionSetId,
			setEditDetails,
			setAllKeysSaved,
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
		if (!isEmpty(editDetails)) {
			const { question_type, difficulty_level = '' } = editDetails || {};

			if (question_type === 'case_study') {
				const { question_text, sub_question = [] } = editDetails || {};

				setValue('question_type', question_type);
				setValue('question_text', question_text);
				setValue('difficulty_level', difficulty_level);

				sub_question.forEach((item1, ind) => {
					const {
						answers,
						question_type: indQuestionType,
						question_text: indQuestionText,
						explanation = [],
					} = item1 || {};

					setValue(`case_questions.${ind}.question_type`, indQuestionType);
					setValue(`case_questions.${ind}.question_text`, indQuestionText);
					setValue(`case_questions.${ind}.audience_ids`, []);
					setValue(`case_questions.${ind}.explanation`, explanation?.[0]);

					answers.forEach((item2, ind2) => {
						const { answer_text, is_correct } = item2 || {};

						setValue(`case_questions.${ind}.options.${ind2}.answer_text`, answer_text);

						setValue(`case_questions.${ind}.options.${ind2}.is_correct`, is_correct ? 'true' : 'false');
					});
				});
			} else {
				const { answers = [], question_text, explanation = [] } = editDetails || {};

				setValue('question_type', 'stand_alone');
				setValue('question.0.question_type', question_type);
				setValue('question.0.difficulty_level', difficulty_level);
				setValue('question.0.question_text', question_text);
				setValue('question.0.explanation', explanation?.[0]);

				answers.forEach((item1, ind) => {
					const { answer_text, is_correct } = item1 || {};

					setValue(`question.0.options.${ind}.answer_text`, answer_text);

					setValue(`question.0.options.${ind}.is_correct`, is_correct ? 'true' : 'false');
				});
			}
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
		...rest,
	};
};

export default useCreateQuestion;
