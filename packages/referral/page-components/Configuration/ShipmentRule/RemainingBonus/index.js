import { ButtonIcon, Button } from '@cogoport/components';
import { useFieldArray, InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { bonusType, nodeOptions } from '../../../../utils/constants';

import styles from './styles.module.css';

function RemainingBonus({ control, formValues, errors, trigger, isEdit }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'remaining_bonus',
	});

	const { remaining_bonus } = formValues;

	const handleAppend = async () => {
		const isValid = await trigger('remaining_bonus');
		const totalPercentage = remaining_bonus.reduce((acc, curr) => acc + Number(curr.percentage), 0);

		if (isValid && totalPercentage < 100) {
			append({ level_bonus_type: 'fixed' });
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
									name={`remaining_bonus.${index}.level_bonus_type`}
									className={styles.select_box}
									size="sm"
									disabled={isEdit}
									rules={{ required: true }}
									options={bonusType}
								/>
								{errors?.remaining_bonus?.[index]?.level_bonus_type && (
									<span className={styles.error}>Required</span>
								)}
							</div>

							{/* <div className={styles.input_controller}>
								<SelectController
									control={control}
									name={`remaining_bonus.${index}.start_level`}
									className={styles.select_box}
									size="sm"
									rules={{ required: true }}
									options={nodeOptions}
								/>
								{errors?.remaining_bonus?.[index]?.start_level && (
									<span className={styles.error}>Required</span>
								)}
							</div> */}
							<div className={styles.input_controller}>
								<SelectController
									control={control}
									name={`remaining_bonus.${index}.start_level`}
									className={styles.select_box}
									size="sm"
									disabled={isEdit}
									rules={{ required: true }}
									options={nodeOptions}
								/>
								{errors?.remaining_bonus?.[index]?.start_level && (
									<span className={styles.error}>Required</span>
								)}
							</div>
							{remaining_bonus?.[index]?.level_bonus_type === 'slab' && (
								<>
									<div className={styles.text}>
										to
									</div>
									<div className={styles.input_controller}>
										<SelectController
											control={control}
											name={`remaining_bonus.${index}.end_level`}
											className={styles.select_box}
											size="sm"
											disabled={isEdit}
											rules={{ required: true }}
											options={nodeOptions}
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
								% of remaining network bonus
							</div>
							<div className={styles.input_controller}>
								<InputController
									control={control}
									name={`remaining_bonus.${index}.max_percentage_allowed`}
									className={styles.input_box}
									size="sm"
									type="number"
									disabled={isEdit}
									placeholder="Enter value"
									rules={{ required: true }}
								/>
								{errors?.remaining_bonus?.[index]?.max_percentage_allowed && (
									<span className={styles.error}>Required</span>
								)}
							</div>
							<div className={styles.text}>
								max % for each node
							</div>
						</div>
						{fields.length !== 1 && (
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
						{fields.length - 1 === index
                        && <Button disabled={isEdit} onClick={handleAppend}>+ Add</Button>}
					</div>
				</>
			))}
		</div>
	);
}

export default RemainingBonus;
