import ContentComponent from './ContentComponent';
import FormComponent from './FormComponent';
import useHandleBasicDetails from './useHandleBasicDetails';

function BasicDetails({
	control,
	errors,
	isNewQuestion,
	editDetails,
	setValue,
	questionTypeWatch,
	getValues,
	setEditDetails,
	setAllKeysSaved,
	reset,
	getTestQuestionTest,
	questionSetId,
	mode,
}) {
	const {
		handleUpdateCaseStudy,
		loading,
		showForm,
		setShowForm,
		controls,
		closeForm,
	} = useHandleBasicDetails({
		setEditDetails,
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		editDetails,
		mode,
		getValues,
		reset,
		setValue,
	});

	return (
		<div key={showForm}>
			{!isNewQuestion
				&& !showForm
				&& editDetails?.question_type === 'case_study' ? (
					<ContentComponent editDetails={editDetails} setShowForm={setShowForm} />
				) : (
					<FormComponent
						isNewQuestion={isNewQuestion}
						controls={controls}
						control={control}
						errors={errors}
						questionTypeWatch={questionTypeWatch}
						editDetails={editDetails}
						handleUpdateCaseStudy={handleUpdateCaseStudy}
						loading={loading}
						mode={mode}
						closeForm={closeForm}
					/>
				)}
		</div>
	);
}

export default BasicDetails;
