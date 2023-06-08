import { useMemo, useState } from 'react';

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
}) => {
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
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
		const { topic, question_text, question_type, difficulty_level } = formValues || {};

		updateCaseStudy({
			values: {
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
		RichTextEditor,
		editorValue,
		setEditorValue,
	};
};

export default useHandleBasicDetails;
