import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';

import BasicDetails from './components/BasicDetails';
import QuestionForm from './components/QuestionForm';
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
	listSetQuestions,
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
		getValues,
		control,
		handleSubmit = () => {},
		formState: { errors = {} },
		register,
		editorValue,
		setEditorValue,
		updateStandAloneLoading,
		subjectiveEditorValue,
		setSubjectiveEditorValue = () => {},
		uploadable,
		setUploadable,
	} = useCreateQuestion({
		item,
		setSavedQuestionDetails,
		topic,
		editDetails,
		setEditDetails,
		questionSetId,
		getTestQuestionTest,
		setAllKeysSaved,
		listSetQuestions,
	});

	return (
		<form key={questionTypeWatch} onSubmit={handleSubmit(onSubmit)} className={styles.container}>
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
					listSetQuestions={listSetQuestions}
					questionSetId={questionSetId}
					mode={mode}
				/>

				<div key={questionTypeWatch} className={styles.question_form}>
					<QuestionForm
						errors={errors}
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
						questionTypeWatch={questionTypeWatch}
						listSetQuestions={listSetQuestions}
						editorValue={editorValue}
						setEditorValue={setEditorValue}
						subjectiveEditorValue={subjectiveEditorValue}
						setSubjectiveEditorValue={setSubjectiveEditorValue}
						uploadable={uploadable}
						setUploadable={setUploadable}
					/>
				</div>

				{mode !== 'view' ? (
					<div className={styles.button_container}>
						{!isNewQuestion ? (
							<Button
								themeType="accent"
								loading={loading || updateCaseStudyLoading || updateStandAloneLoading}
								onClick={() => handleDeleteStandAloneQuestion()}
								type="button"
							>
								Delete Question
							</Button>
						) : null}

						{!(editDetails?.question_type === 'case_study') ? (
							<Button
								loading={loading || updateCaseStudyLoading || updateStandAloneLoading}
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
