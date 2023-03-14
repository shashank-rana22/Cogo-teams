import { Button } from '@cogoport/components';
import { TextAreaController, useFieldArray } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SingleQuestionComponent from '../../../SingleQuestionComponent';

import getControls from './controls';
import styles from './styles.module.css';

function CaseStudyForm({ control, register }) {
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
		append(childEmptyValues);
	};

	if (isEmpty(fields)) {
		append(childEmptyValues);
	}

	console.log('fields1', fields);
	return (
		<div className={styles.container}>
			<TextAreaController {...controls[0]} control={control} />

			{fields.map((field, index) => (
				<div className={styles.field_container}>

					<div key={field.id} className={styles.question_container}>
						<SingleQuestionComponent
							control={control}
							field={field}
							register={register}
							index={index}

						/>

						<IcMCrossInCircle
							className={styles.delete_button}
							width={20}
							height={20}
							onClick={() => remove(index, 1)}
						/>
					</div>

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
				</div>
			))}
		</div>
	);
}

export default CaseStudyForm;
