import { useMemo } from 'react';

import useUpdateCaseStudyQuestion from '../../hooks/useUpdateCaseStudyQuestion';

import getControls from './controls';

const EXPLANATION_EDITOR_SETTER_INDEX = 0;

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
	questionEditorValue,
	setQuestionEditorValue,
	setQuestionError,
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

	const STATE_FUNCTIONS = useMemo(() => [setEditorValue, setQuestionEditorValue,
		setQuestionError], [setEditorValue, setQuestionEditorValue, setQuestionError]);

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
		questionEditorValue,
		setQuestionError,
		caseStudyQuestionEditorValue,
	});

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);

			STATE_FUNCTIONS.forEach((stateChanger, funcIndex) => {
				stateChanger((prev) => {
					const updatedObj = { ...prev };
					const keys = Object.keys(updatedObj);

					delete updatedObj[funcIndex === EXPLANATION_EDITOR_SETTER_INDEX
						? `case_questions_${index}_explanation`
						: `case_questions_${index}`];

					keys.forEach((currentKey, i) => {
						if (i > index) {
							const newKey = funcIndex === EXPLANATION_EDITOR_SETTER_INDEX
								? `case_questions_${index}_explanation`
								: `case_questions_${index}`;
							updatedObj[newKey] = updatedObj[currentKey];
							delete updatedObj[currentKey];
						}
					});

					return updatedObj;
				});
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
			setQuestionEditorValue((prev) => ({ ...prev, [`case_questions_${index}`]: value }));
			setQuestionError((prev) => ({ ...prev, [`case_questions_${index}`]: false }));
		} else {
			setQuestionEditorValue({ question_0: value });
			setQuestionError({ question_0: false });
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
