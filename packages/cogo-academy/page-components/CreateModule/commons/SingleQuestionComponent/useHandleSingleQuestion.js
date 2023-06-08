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
	questionEditorValue,
	setQuestionEditorValue,
	caseStudyQuestionEditorValue,
	setCaseStudyQuestionEditorValue = () => {},
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
		questionEditorValue,
		caseStudyQuestionEditorValue,
		setCaseStudyQuestionEditorValue,
	});

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);

			setEditorValue((prev) => {
				const updatedObj = { ...prev };
				const keys = Object.keys(updatedObj);

				delete updatedObj[`case_questions_${index}_explanation`];

				for (let i = index + 1; i < keys.length; i += 1) {
					const currentKey = keys[i];
					const newKey = `case_questions_${i - 1}_explanation`;
					updatedObj[newKey] = updatedObj[currentKey];
					delete updatedObj[currentKey];
				}

				return updatedObj;
			});

			setQuestionEditorValue((prev) => {
				const updatedObj = { ...prev };
				const keys = Object.keys(updatedObj);

				delete updatedObj[`case_questions_${index}`];

				for (let i = index + 1; i < keys.length; i += 1) {
					const currentKey = keys[i];
					const newKey = `case_questions_${i - 1}`;
					updatedObj[newKey] = updatedObj[currentKey];
					delete updatedObj[currentKey];
				}

				return updatedObj;
			});

			console.log('editorValue:: ', editorValue);
			console.log('questionEditorValue', questionEditorValue);
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
		} else {
			setQuestionEditorValue({ question_0: value });
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
