import { useMemo } from 'react';

import useUpdateCaseStudyQuestion from '../../hooks/useUpdateCaseStudyQuestion';

import getControls from './controls';

function useHandleSingleQuestion({
	getValues,
	questionSetId,
	getTestQuestionTest,
	listSetQuestions,
	reset,
	setEditDetails,
	setAllKeysSaved,
	remove,
	mode,
	editDetails,
	field,
	index,
	questionTypeWatch,
	editorValue,
	setEditorValue,
}) {
	const NAME_CONTROL_MAPPING = useMemo(() => {
		const hash = {};

		const controls = getControls({ mode });

		controls.forEach((item) => {
			hash[item?.name] = item;
		});

		return hash;
	}, [mode]);

	const { updateCaseStudyQuestion, loading } = useUpdateCaseStudyQuestion({
		questionSetId,
		setEditDetails,
		setAllKeysSaved,
		reset,
		listSetQuestions,
		getTestQuestionTest,
		editDetails,
		index,
		editorValue,
	});

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);

			setEditorValue((prev) => ({ ...prev, [`case_questions_${index}_explanation`]: undefined }));
		} else {
			updateCaseStudyQuestion({
				action              : 'delete',
				caseStudyQuestionId : editDetails?.test_case_study_questions?.[index]?.id,
				testQuestionId      : editDetails?.id,
			});
		}
	};

	const handleUpdateCaseStudyQuestion = () => {
		const formValues = getValues();

		updateCaseStudyQuestion({
			values              : formValues?.case_questions?.[index],
			action              : field.isNew ? 'create' : 'update',
			caseStudyQuestionId : editDetails?.test_case_study_questions?.[index]?.id,
			testQuestionId      : editDetails?.id,
		});
	};

	const handleChangeEditorValue = (value) => {
		if (questionTypeWatch === 'stand_alone') {
			setEditorValue({ question_0_explanation: value });
		} else {
			setEditorValue((prev) => ({ ...prev, [`case_questions_${index}_explanation`]: value }));
		}
	};

	return {
		handleUpdateCaseStudyQuestion,
		handleDelete,
		loading,
		NAME_CONTROL_MAPPING,
		editorValue,
		setEditorValue,
		handleChangeEditorValue,
	};
}

export default useHandleSingleQuestion;
