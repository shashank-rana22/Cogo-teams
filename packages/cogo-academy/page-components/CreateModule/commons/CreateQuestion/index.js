/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTestQuestion from '../../hooks/useCreateTestQuestion';
import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';
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

	const { isNew:isNewQuestion = false, id } = item || {};

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

	const { createTestQuestion, loading } = useCreateTestQuestion();

	const { updateStandAloneTestQuestion } = useUpdateStandAloneTestQuestion();

	const {
		loading: updateCaseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const onsubmit = (values) => {
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

		getTestQuestionTest({ questionSetId });
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
					setValue(`case_questions.${ind}.audience_ids`, []);

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
		<form key={JSON.stringify(getValues())} onSubmit={handleSubmit(onsubmit)} className={styles.container}>
			<div className={styles.question_label}>{`Question ${index + 1}`}</div>

			<div className={styles.form_component}>
				<BasicDetails
					errors={errors}
					control={control}
					isNewQuestion={isNewQuestion}
					editDetails={editDetails}
					setValue={setValue}
					questionTypeWatch={questionTypeWatch}
					getValues={getValues}
					setEditDetails={setEditDetails}
					reset={reset}
					setAllKeysSaved={setAllKeysSaved}
					getTestQuestionTest={getTestQuestionTest}
					questionSetId={questionSetId}
				/>

				<div className={styles.question_form}>
					{questionTypeWatch === 'stand_alone' ? (
						<SingleQuestionComponent
							editAnswerDetails={editDetails?.answers || []}
							errors={errors.question?.[0] || {}}
							index={0}
							control={control}
							register={register}
							name="question"
							isNewQuestion={isNewQuestion}
							questionSetId={questionSetId}
							getTestQuestionTest={getTestQuestionTest}
							reset={reset}
							setEditDetails={setEditDetails}
							setAllKeysSaved={setAllKeysSaved}
						/>
					) : (
						<CaseStudyForm
							errors={{
								case_questions : errors.case_questions,
								question_text  : errors?.question_text,
							}}
							control={control}
							register={register}
							isNewQuestion={isNewQuestion}
							editDetails={editDetails}
							getValues={getValues}
							questionSetId={questionSetId}
							getTestQuestionTest={getTestQuestionTest}
							reset={reset}
							setEditDetails={setEditDetails}
							setAllKeysSaved={setAllKeysSaved}
						/>
					)}
				</div>

				<div className={styles.button_container}>
					{!isNewQuestion ? (
						<Button
							themeType="accent"
							loading={loading || updateCaseStudyLoading}
							onClick={() => handleDeleteStandAloneQuestion()}
							type="button"
						>
							Delete Question
						</Button>
					) : null}

					{!(!isNewQuestion && editDetails?.question_type === 'case_study') ? (
						<Button
							loading={loading || updateCaseStudyLoading}
							type="submit"
							themeType="primary"
						>
							{isNewQuestion ? 'Save Question' : 'Update Question'}
						</Button>
					) : null}
				</div>

				<div className={styles.delete_icon}>
					<IcMCrossInCircle onClick={() => deleteQuestion()} width={20} height={20} />
				</div>
			</div>
		</form>
	);
}

export default CreateQuestion;
