import { Button } from '@cogoport/components';
import { TextAreaController, useFieldArray } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SingleQuestionComponent from '../../../SingleQuestionComponent';

import getControls from './controls';
import styles from './styles.module.css';

function CaseStudyForm({ control, register, errors, isNewQuestion }) {
	const controls = getControls();

	const fieldArrayControls = controls[1];

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
			<TextAreaController {...controls[0]} control={control} />
			{errors?.[controls[0].name] && <div className={styles.error_msg}>This is required</div>}

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
							isNewQuestion={isNewQuestion}
							remove={remove}
						/>

						{fields.length > 1 && isNewQuestion ? (
							<IcMCrossInCircle
								className={styles.delete_button}
								width={20}
								height={20}
								onClick={() => remove(index, 1)}
							/>
						) : null}
					</div>

					{index === fields.length - 1 ? (
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
