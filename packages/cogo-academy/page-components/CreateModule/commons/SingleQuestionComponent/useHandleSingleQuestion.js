import { useMemo } from 'react';

import useUpdateCaseStudyQuestion from '../../hooks/useUpdateCaseStudyQuestion';
import updateStates from '../../utils/updateStates';

import getControls from './controls';

const OFFSET = 1;

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
	questionState = {},
	setQuestionState = () => {},
	caseStudyQuestionEditorValue,
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
		questionState,
		setQuestionState,
		caseStudyQuestionEditorValue,
	});

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);
			updateStates({
				setQuestionState,
				setEditorValue,
				index: questionState?.editorValue?.question_0 ? (index + OFFSET) : index,
				OFFSET,
			});
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

	const handleChangeQuestionEditor = (value) => {
		if (questionTypeWatch === 'case_study') {
			setQuestionState((prev) => ({
				editorValue : { ...prev.editorValue, [`case_questions_${index}`]: value },
				error       : { ...prev.error, [`case_questions_${index}`]: false },
			}));
		} else {
			setQuestionState({
				editorValue : { question_0: value },
				error       : { question_0: false },
			});
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
		handleChangeQuestionEditor,
	};
}

export default useHandleSingleQuestion;
