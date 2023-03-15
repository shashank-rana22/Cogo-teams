import { Button } from '@cogoport/components';
import { TextAreaController, useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SingleQuestionComponent from '../../../SingleQuestionComponent';

import getControls from './controls';
// import styles from './styles.module.css';

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

	return (
		<div>
			<TextAreaController {...controls[0]} control={control} />

			{fields.map((field, index) => (
				<div key={field.id}>

					<SingleQuestionComponent controls={controls} control={control} register={register} />

					<div>
						<Button
							type="button"
							className="primary sm"
							onClick={() => handleAppendChild()}
						>
							Add

						</Button>

						<IcMDelete onClick={() => remove(index, 1)} />
					</div>
				</div>
			))}
		</div>
	);
}

export default CaseStudyForm;
