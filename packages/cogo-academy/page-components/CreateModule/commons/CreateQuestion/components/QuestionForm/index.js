import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import updateStates from '../../../../utils/updateStates';
import SingleQuestionComponent from '../../../SingleQuestionComponent';

import controls from './controls';
import styles from './styles.module.css';

let RichTextEditor;
if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

const NAME_ARRAY_MAPPING = {
	stand_alone : 'question',
	case_study  : 'case_questions',
	subjective  : 'subjective',
};

const OFFSET = 1;

function QuestionForm({
	control,
	register,
	errors,
	editDetails,
	getValues,
	questionSetId,
	getTestQuestionTest,
	reset,
	setEditDetails,
	setAllKeysSaved,
	mode,
	questionTypeWatch,
	listSetQuestions,
	editorValue,
	setEditorValue,
	questionState,
	setQuestionState,
	subjectiveEditorValue,
	setSubjectiveEditorValue = () => {},
	uploadable,
	setUploadable,
	caseStudyQuestionEditorValue,
	setCaseStudyQuestionEditorValue,
}) {
	const NAME_CONTROL_MAPPING = useMemo(() => {
		const HASH = {};

		controls.forEach((item) => {
			HASH[item?.name] = item;
		});

		return HASH;
	}, []);

	const fieldArrayControls = useMemo(() => NAME_CONTROL_MAPPING.case_questions, [NAME_CONTROL_MAPPING]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: fieldArrayControls.name,
	});

	const CHILD_EMPTY_VALUES = {};
	fieldArrayControls.controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = (index) => {
		append({ ...CHILD_EMPTY_VALUES, isNew: true });

		setEditorValue((prev) => ({
			...prev,
			[`case_questions_${index + OFFSET}_explanation`]: RichTextEditor.createEmptyValue(),
		}));

		setQuestionState((prev) => ({
			...prev,
			editorValue: {
				...prev.editorValue,
				[`case_questions_${index + OFFSET}`]: RichTextEditor.createEmptyValue(),
			},
		}));
	};

	if (isEmpty(fields) && editDetails.question_type !== 'case_study') {
		append({ ...CHILD_EMPTY_VALUES, isNew: true });

		setEditorValue((prev) => ({
			...prev,
			question_0_explanation: RichTextEditor.createEmptyValue(),
		}));

		setQuestionState((prev) => ({
			...prev,
			editorValue: {
				...prev.editorValue,
				question_0: RichTextEditor.createEmptyValue(),
			},
		}));
	}

	const handleDeleteNewObject = (index) => {
		remove(index, OFFSET);

		updateStates({
			setQuestionState,
			setEditorValue,
			index: questionState?.editorValue?.question_0 ? (index + OFFSET) : index,
			OFFSET,
		});
	};

	return (
		<div key={questionTypeWatch} className={styles.container}>
			{fields?.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.question_container}>
						<SingleQuestionComponent
							control={control}
							field={field}
							register={register}
							index={index}
							isNewQuestion={field?.isNew}
							remove={remove}
							editDetails={editDetails}
							getValues={getValues}
							questionSetId={questionSetId}
							getTestQuestionTest={getTestQuestionTest}
							listSetQuestions={listSetQuestions}
							reset={reset}
							setEditDetails={setEditDetails}
							setAllKeysSaved={setAllKeysSaved}
							mode={mode}
							questionTypeWatch={questionTypeWatch}
							editorValue={editorValue}
							setEditorValue={setEditorValue}
							questionState={questionState}
							setQuestionState={setQuestionState}
							subjectiveEditorValue={subjectiveEditorValue}
							setSubjectiveEditorValue={setSubjectiveEditorValue}
							uploadable={uploadable}
							setUploadable={setUploadable}
							name={NAME_ARRAY_MAPPING[questionTypeWatch]}
							errors={questionTypeWatch === 'stand_alone'
								? errors.question?.[index] : errors?.case_questions?.[index]}
							caseStudyQuestionEditorValue={caseStudyQuestionEditorValue}
							setCaseStudyQuestionEditorValue={setCaseStudyQuestionEditorValue}
						/>

						{fields.length > OFFSET && field?.isNew ? (
							<IcMCrossInCircle
								className={styles.delete_button}
								width={16}
								height={16}
								onClick={() => handleDeleteNewObject(index)}
							/>
						) : null}
					</div>

					{index === fields.length - OFFSET && mode !== 'view' && questionTypeWatch === 'case_study' ? (
						<div className={styles.button_container}>
							<Button
								type="button"
								themeType="secondary"
								className={styles.add_button}
								onClick={() => handleAppendChild(index)}
							>
								+ Add Another Question
							</Button>
						</div>
					) : null}
				</div>
			))}
		</div>
	);
}

export default QuestionForm;
