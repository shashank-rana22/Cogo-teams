import { Button } from '@cogoport/components';
import { InputController, useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function OptionsComponent({ control, controls, register, name }) {
	const childEmptyValues = {};

	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const handleAppendChild = () => {
		append(childEmptyValues);
	};

	if (isEmpty(fields)) {
		append(childEmptyValues);
	}

	console.log('fields', fields, name);

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<InputController
						{...controls[0]}
						control={control}
						{...register(`${name}.${index}.${controls[0].name}`, {
							...(controls[0].rules || {}),
						})}
					/>

					<div className={styles.button_container}>
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

export default OptionsComponent;
