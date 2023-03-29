import { useState } from 'react';

import useUpdateCaseStudy from '../../../../hooks/useUpdateCaseStudy';

import ContentComponent from './ContentComponent';
import getControls from './controls';
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
}) {
	const [showForm, setShowForm] = useState(false);

	const controls = getControls({ mode });

	const {
		loading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const handleUpdateCaseStudy = () => {
		const formValues = getValues();
		const { audience_ids, topic, question_text, question_type, difficulty_level } = formValues || {};

		updateCaseStudy({
			values: {
				audience_ids,
				topic,
				question_text,
				question_type,
				difficulty_level,
			},
			id     : editDetails?.id,
			setEditDetails,
			setAllKeysSaved,
			reset,
			getTestQuestionTest,
			questionSetId,
			action : 'update',
		});
	};

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
						setValue={setValue}
						setShowForm={setShowForm}
						mode={mode}
					/>
				)}
		</div>
	);
}

export default BasicDetails;
