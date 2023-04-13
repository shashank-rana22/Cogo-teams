import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

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
	subjectiveEditorValue,
	setSubjectiveEditorValue = () => {},
}) {
	const NAME_CONTROL_MAPPING = useMemo(() => {
		const hash = {};

		controls.forEach((item) => {
			hash[item?.name] = item;
		});

		return hash;
	}, []);

	const fieldArrayControls = useMemo(() => NAME_CONTROL_MAPPING.case_questions, [NAME_CONTROL_MAPPING]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: fieldArrayControls.name,
	});

	const childEmptyValues = {};
	fieldArrayControls.controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = (index) => {
		append({ ...childEmptyValues, isNew: true });

		setEditorValue((prev) => ({
			...prev,
			[`case_questions_${index + 1}_explanation`]: RichTextEditor.createEmptyValue(),
		}));
	};

	if (isEmpty(fields) && editDetails.question_type !== 'case_study') {
		append({ ...childEmptyValues, isNew: true });

		setEditorValue((prev) => ({
			...prev,
			question_0_explanation: RichTextEditor.createEmptyValue(),
		}));
	}

	const handleDeleteNewObject = (index) => {
		remove(index, 1);

		setEditorValue((prev) => ({ ...prev, [`case_questions_${index}_explanation`]: undefined }));
	};

	return (
		<div key={questionTypeWatch} className={styles.container}>
			{fields.map((field, index) => (
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
							subjectiveEditorValue={subjectiveEditorValue}
							setSubjectiveEditorValue={setSubjectiveEditorValue}
							name={NAME_ARRAY_MAPPING[questionTypeWatch]}
							errors={questionTypeWatch === 'stand_alone'
								? errors.question?.[index] : errors?.case_questions?.[index]}
						/>

						{fields.length > 1 && field?.isNew ? (
							<IcMCrossInCircle
								className={styles.delete_button}
								width={16}
								height={16}
								onClick={() => handleDeleteNewObject(index)}
							/>
						) : null}
					</div>

					{index === fields.length - 1 && mode !== 'view' && questionTypeWatch === 'case_study' ? (
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
