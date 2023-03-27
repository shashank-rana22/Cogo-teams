import { Button } from '@cogoport/components';
import { ChipsController, InputController, useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const alphabetMapping = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function OptionsComponent({ control, controls, register, name, errors, mode }) {
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

	return (
		<>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.option_container}>
						<div className={styles.alphabet_container}>{alphabetMapping[index]}</div>

						<InputController
							{...controls[0]}
							control={control}
							{...register(`${name}.${index}.${controls[0].name}`, {
								...(controls[0].rules || {}),
							})}
							className={errors[index]?.[controls[0].name] ? styles.error : null}
						/>

						<div className={styles.right_button_container}>
							{fields.length < 11 && index === fields.length - 1 && mode !== 'view' ? (
								<Button
									type="button"
									themeType="secondary"
									className={styles.add_button}
									onClick={() => handleAppendChild()}
								>
									+ Add
								</Button>
							) : null}

							{fields.length > 1 && mode !== 'view' ? (
								<IcMDelete
									style={{ cursor: 'pointer' }}
									width={20}
									height={20}
									onClick={() => remove(index, 1)}
								/>
							) : null}

							<div className={styles.left_button_container}>
								<ChipsController
									control={control}
									{...controls[1]}
									{...register(`${name}.${index}.${controls[1].name}`, {
										...(controls[1].rules || {}),
									})}
								/>

								{errors[index]?.[controls[1].name] ? (
									<div className={styles.error_msg}>This is required</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default OptionsComponent;
