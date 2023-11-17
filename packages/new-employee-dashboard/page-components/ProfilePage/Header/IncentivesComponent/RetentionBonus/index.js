import { Button } from '@cogoport/components';
import { InputController, useFieldArray } from '@cogoport/forms';
import { IcMPlus, IcMAppDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function RetentionBonus({ control = {}, formProps = {} }) {
	const {
		fields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'retention',
	});
	const { formState:{ errors } } = formProps;

	return (
		<div>
			<div className={styles.heading}>
				Retention Bonus
			</div>
			<div className={styles.container}>
				<div className={styles.filed_cont_main}>
					{fields.map((item, index) => (
						<li key={item.id} className={styles.list}>
							<div className={styles.slab_row}>
								<div className={styles.input_cont}>
									<InputController
										control={control}
										size="md"
										className={styles.bonus_input}
										type="number"
										name={`retention.${index}.retention_amount`}
										placeholder="Amount In Rupees"
										rules={{ required: '*required' }}
									/>
									{errors?.retention?.[index]?.retention_amount ? (
										<div className={styles.errors}>*required</div>
									) : null}
								</div>
								<div className={styles.input_cont}>
									<InputController
										control={control}
										size="md"
										className={styles.bonus_input}
										type="number"
										name={`retention.${index}.retention_duration`}
										placeholder="Duration In Months"
										rules={{ required: '*required' }}
									/>
									{errors.retention?.[index]?.retention_duration ? (
										<div className={styles.errors}>*required</div>
									) : null}
								</div>

								<div
									className={styles.delete}
									onClick={() => remove(index)}
									aria-hidden
								>
									<IcMAppDelete
										width={28}
										height={28}
									/>
								</div>
							</div>
						</li>
					))}
				</div>
			</div>
			<div className={styles.add_retention_bonus_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.heading_btn}
					onClick={() => append({})}
				>
					<IcMPlus />
					Add Retention Slab
				</Button>
			</div>

		</div>
	);
}

export default RetentionBonus;
