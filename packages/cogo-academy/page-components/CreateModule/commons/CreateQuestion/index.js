/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTestQuestion from '../../hooks/useCreateTestQuestion';
import SingleQuestionComponent from '../SingleQuestionComponent';

import BasicDetails from './components/BasicDetails';
import CaseStudyForm from './components/CaseStudyForm';
import styles from './styles.module.css';

function CreateQuestion({
	index,
	questionSetId,
	getTestQuestionTest,
	item,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
}) {
	const [questionTypeWatch, setQuestionTypeWatch] = useState('stand_alone');

	const { isNew = false, id } = item || {};

	const {
		watch,
		handleSubmit = () => {},
		formState: { errors = {} },
		reset,
		setValue,
		getValues,
		control,
		register,
	} = useForm();

	const { createTestQuestion } = useCreateTestQuestion();

	const onsubmit = (values) => {
		createTestQuestion({ values, questionSetId, getTestQuestionTest, reset });
	};

	const onError = (err) => {
		console.log('err', err);
	};

	const deleteQuestion = () => {
		if (!isEmpty(editDetails)) {
			setEditDetails({});
		} else if (isNew) {
			setSavedQuestionDetails((prev) => prev.filter((item1) => item1.id !== id));
		}

		setAllKeysSaved(true);
	};

	useEffect(() => {
		setQuestionTypeWatch(watch('question_type'));
	}, [watch('question_type')]);

	useEffect(() => {
		if (!isEmpty(editDetails)) {
			const { topic, question_type } = editDetails || {};
			setValue('topic', topic);

			if (question_type === 'case_study') {
				const { question_text, sub_question = [] } = editDetails || {};

				setValue('question_type', question_type);
				setValue('question_text', question_text);

				sub_question.forEach((item1, ind) => {
					const {
						answers,
						difficulty_level,
						question_type: indQuestionType,
						question_text: indQuestionText,
					} = item1 || {};

					setValue(`case_questions.${ind}.difficulty_level`, difficulty_level);
					setValue(`case_questions.${ind}.question_type`, indQuestionType);
					setValue(`case_questions.${ind}.question_text`, indQuestionText);

					answers.forEach((item2, ind2) => {
						const { answer_text, is_correct } = item2 || {};

						setValue(`case_questions.${ind}.options.${ind2}.answer_text`, answer_text);

						setValue(`case_questions.${ind}.options.${ind2}.is_correct`, is_correct ? 'true' : 'false');
					});
				});
			} else {
				const { answers = [], question_text, difficulty_level = '' } = editDetails || {};

				setValue('question_type', 'stand_alone');
				setValue('question.0.question_type', question_type);
				setValue('question.0.difficulty_level', difficulty_level);
				setValue('question.0.question_text', question_text);

				answers.forEach((item1, ind) => {
					const { answer_text, is_correct } = item1 || {};

					setValue(`question.0.options.${ind}.answer_text`, answer_text);

					setValue(`question.0.options.${ind}.is_correct`, is_correct ? 'true' : 'false');
				});
			}
		}
	}, [JSON.stringify(editDetails)]);

	return (
		<form key={JSON.stringify(getValues())} onSubmit={handleSubmit(onsubmit, onError)} className={styles.container}>
			<div className={styles.question_label}>{`Question ${index + 1}`}</div>

			<div className={styles.form_component}>
				<BasicDetails errors={errors} control={control} />

				<div className={styles.question_form}>
					{questionTypeWatch === 'stand_alone' ? (
						<SingleQuestionComponent
							editAnswerDetails={editDetails?.answers || []}
							errors={errors.question?.[0] || {}}
							index={0}
							control={control}
							register={register}
							name="question"
						/>
					) : (
						<CaseStudyForm
							errors={{
								case_questions : errors.case_questions,
								question_text  : errors?.question_text,
							}}
							control={control}
							register={register}
						/>
					)}
				</div>

				<div className={styles.button_container}>
					<Button type="submit" themeType="accent">save Question</Button>
				</div>

				<div className={styles.delete_icon}>
					<IcMCrossInCircle onClick={() => deleteQuestion()} width={20} height={20} />
				</div>
			</div>

		</form>
	);
}

export default CreateQuestion;
