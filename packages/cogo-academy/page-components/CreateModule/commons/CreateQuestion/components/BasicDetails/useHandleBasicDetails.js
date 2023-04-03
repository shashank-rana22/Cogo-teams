import { useMemo } from 'react';

import useUpdateCaseStudy from '../../../../hooks/useUpdateCaseStudy';

import getControls from './controls';

const useHandleBasicDetails = ({
	setEditDetails,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	editDetails,
	mode,
	getValues,
	reset,
	setValue,
	setShowForm,
	listSetQuestions,
}) => {
	const controls = useMemo(() => getControls({ mode }), [mode]);

	const {
		loading,
		updateCaseStudy,
	} = useUpdateCaseStudy({
		setEditDetails,
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		reset,
		listSetQuestions,
	});

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
			action : 'update',
		});
	};

	const closeForm = () => {
		const { topic = '', difficulty_level = '', question_text = '' } = editDetails || {};

		setValue('topic', topic);
		setValue('difficulty_level', difficulty_level);
		setValue('audience_ids', []);
		setValue('question_text', question_text);

		setValue(
			'question_type',
			editDetails?.question_type === 'case_study' ? editDetails?.question_type : 'stand_alone',
		);

		setShowForm(false);
	};

	return {
		handleUpdateCaseStudy,
		loading,
		controls,
		closeForm,
	};
};

export default useHandleBasicDetails;
