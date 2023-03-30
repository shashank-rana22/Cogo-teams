import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SingleQuestionComponent from '../../../SingleQuestionComponent';

import controls from './controls';
import styles from './styles.module.css';

function CaseStudyForm({
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
}) {
	const fieldArrayControls = controls?.[0];

	const { fields, append, remove } = useFieldArray({
		control,
		name: fieldArrayControls.name,
	});

	const childEmptyValues = {};
	fieldArrayControls.controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = () => {
		append({ ...childEmptyValues, isNew: true });
	};

	if (isEmpty(fields)) {
		append({ ...childEmptyValues, isNew: true });
	}

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.question_container}>
						<SingleQuestionComponent
							control={control}
							field={field}
							register={register}
							index={index}
							errors={errors?.case_questions?.[index]}
							type="case_study"
							isNewQuestion={field?.isNew}
							remove={remove}
							editDetails={editDetails}
							getValues={getValues}
							questionSetId={questionSetId}
							getTestQuestionTest={getTestQuestionTest}
							reset={reset}
							setEditDetails={setEditDetails}
							setAllKeysSaved={setAllKeysSaved}
							mode={mode}
						/>

						{fields.length > 1 && field?.isNew ? (
							<IcMCrossInCircle
								className={styles.delete_button}
								width={16}
								height={16}
								onClick={() => remove(index, 1)}
							/>
						) : null}
					</div>

					{index === fields.length - 1 && mode !== 'view' ? (
						<div className={styles.button_container}>
							<Button
								type="button"
								themeType="secondary"
								className={styles.add_button}
								onClick={() => handleAppendChild()}
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

export default CaseStudyForm;
