import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';

import SingleQuestionComponent from '../SingleQuestionComponent';

import BasicDetails from './components/BasicDetails';
import CaseStudyForm from './components/CaseStudyForm';
import styles from './styles.module.css';
import useCreateQuestion from './useCreateQuestion';

function CreateQuestion({
	index,
	questionSetId,
	getTestQuestionTest,
	item,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
	topic,
	mode,
}) {
	const {
		isNewQuestion,
		setValue,
		questionTypeWatch,
		reset,
		handleDeleteStandAloneQuestion,
		loading,
		deleteQuestion,
		updateCaseStudyLoading,
		onSubmit,
		...rest
	} = useCreateQuestion({
		item,
		setSavedQuestionDetails,
		topic,
		editDetails,
		setEditDetails,
		questionSetId,
		getTestQuestionTest,
		setAllKeysSaved,
	});

	const {
		getValues,
		control,
		handleSubmit = () => {},
		formState: { errors = {} },
		register,
	} = rest || {};

	return (
		<form key={JSON.stringify(getValues())} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
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
					mode={mode}
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
							mode={mode}
							type="stand_alone"
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
							mode={mode}
						/>
					)}
				</div>

				{mode !== 'view' ? (
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
								className={styles.save_button}
							>
								{isNewQuestion ? 'Save Question' : 'Update Question'}
							</Button>
						) : null}
					</div>
				) : null}

				<div className={styles.delete_icon}>
					<IcMCrossInCircle onClick={() => deleteQuestion()} width={20} height={20} />
				</div>
			</div>
		</form>
	);
}

export default CreateQuestion;
