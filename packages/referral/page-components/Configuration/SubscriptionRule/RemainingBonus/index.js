import { ButtonIcon, Button } from '@cogoport/components';
import { useFieldArray, InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { BONUS_TYPE, NODE_OPTIONS } from '../../../../constants/configuration-constant';

import styles from './styles.module.css';

const FIELD_LENGTH = 1;
const MINIMUM_PERCENTAGE_VALUE = 0;
const MAXIMUM_PERCENTAGE_VALUE = 100;

function RemainingBonus({ control, formValues, errors, trigger, isEdit }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'remaining_bonus',
	});

	const { remaining_bonus } = formValues;

	const handleAppend = async () => {
		const isValid = await trigger('remaining_bonus');
		const totalPercentage = remaining_bonus.reduce(
			(acc, curr) => acc + Number(curr.percentage),
			MINIMUM_PERCENTAGE_VALUE,
		);

		if (isValid && totalPercentage < MAXIMUM_PERCENTAGE_VALUE) {
			append({ type: 'fixed' });
		}
	};

	return (
		<div>
			{fields.map((field, index) => (
				<>
					<div className={styles.content} key={field.id}>
						<div className={styles.flex}>
							<div className={styles.input_controller}>
								<SelectController
									control={control}
									disabled={isEdit}
									name={`remaining_bonus.${index}.type`}
									className={styles.select_box}
									size="sm"
									rules={{ required: true }}
									options={BONUS_TYPE}
								/>
								{errors?.remaining_bonus?.[index]?.type && (
									<span className={styles.error}>Required</span>
								)}
							</div>

							<div className={styles.input_controller}>
								<SelectController
									control={control}
									name={`remaining_bonus.${index}.start_level`}
									className={styles.select_box}
									size="sm"
									disabled={isEdit}
									rules={{ required: true }}
									options={NODE_OPTIONS}
								/>
								{errors?.remaining_bonus?.[index]?.start_level && (
									<span className={styles.error}>Required</span>
								)}
							</div>
							{remaining_bonus?.[index]?.type === 'slab' && (
								<>
									<div className={styles.text}>
										to
									</div>
									<div className={styles.input_controller}>
										<SelectController
											control={control}
											name={`remaining_bonus.${index}.end_level`}
											className={styles.select_box}
											disabled={isEdit}
											size="sm"
											rules={{ required: true }}
											options={NODE_OPTIONS}
										/>
										{errors?.remaining_bonus?.[index]?.end_level && (
											<span className={styles.error}>Required</span>
										)}
									</div>
								</>
							)}
							<div className={styles.input_controller}>
								<InputController
									control={control}
									name={`remaining_bonus.${index}.percentage`}
									className={styles.input_box}
									size="sm"
									disabled={isEdit}
									type="number"
									placeholder="Enter value"
									rules={{ required: true }}
								/>
								{errors?.remaining_bonus?.[index]?.percentage && (
									<span className={styles.error}>Required</span>
								)}
							</div>
							<div className={styles.text}>
								{ remaining_bonus?.[index]?.end_level === 'master_node'
									? 'max % for each node' : '% of remaining network bonus' }
							</div>
						</div>
						{fields.length !== FIELD_LENGTH && (
							<ButtonIcon
								size="xl"
								disabled={isEdit}
								className={styles.ml_12}
								icon={<IcMDelete />}
								onClick={() => remove(index)}
							/>
						)}
					</div>
					<div>
						{fields.length - FIELD_LENGTH === index
                        && <Button disabled={isEdit} onClick={handleAppend}>+ Add</Button>}
					</div>
				</>
			))}
		</div>
	);
}

export default RemainingBonus;
