import { useMemo } from 'react';

import useUpdateCaseStudy from '../../../../hooks/useUpdateCaseStudy';

import getControls from './controls';

let RichTextEditor;
if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

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
	caseStudyQuestionEditorValue,
	setCaseStudyQuestionEditorValue,
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
		const { topic, question_type, difficulty_level } = formValues || {};

		updateCaseStudy({
			values: {
				topic,
				question_text: caseStudyQuestionEditorValue.toString('html'),
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
		setCaseStudyQuestionEditorValue(RichTextEditor?.createValueFromString((question_text || ''), 'html'));

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
		RichTextEditor,
	};
};

export default useHandleBasicDetails;
