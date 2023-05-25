import { useState } from 'react';

import ContentComponent from './ContentComponent';
import FormComponent from './FormComponent';

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
	listSetQuestions,
}) {
	const [showForm, setShowForm] = useState(true);

	return (
		<div key={showForm}>
			{!isNewQuestion
				&& !showForm
				&& editDetails?.question_type === 'case_study' ? (
					<ContentComponent
						editDetails={editDetails}
						setShowForm={setShowForm}
					/>
				) : (
					<FormComponent
						isNewQuestion={isNewQuestion}
						control={control}
						errors={errors}
						questionTypeWatch={questionTypeWatch}
						editDetails={editDetails}
						mode={mode}
						getValues={getValues}
						setEditDetails={setEditDetails}
						setAllKeysSaved={setAllKeysSaved}
						reset={reset}
						getTestQuestionTest={getTestQuestionTest}
						questionSetId={questionSetId}
						setValue={setValue}
						setShowForm={setShowForm}
						listSetQuestions={listSetQuestions}
					/>
				)}
		</div>
	);
}

export default BasicDetails;
