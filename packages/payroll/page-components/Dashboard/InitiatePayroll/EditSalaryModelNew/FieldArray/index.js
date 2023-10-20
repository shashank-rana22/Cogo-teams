import { Button, ButtonIcon } from '@cogoport/components';
import { SelectController, useFieldArray, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { PAYMENT_TYPE_OPTIONS } from '../../../../../utils/constants';

import styles from './styles.module.css';

function FieldArrayAdditions({
	control,
	controls = [],
	name = '',
	watch = () => {},
	setValue,
	data = {},
	setDeletedValues = () => {},
	setTotalSum = () => {},
}) {
	const { fields = [], append, remove, replace } = useFieldArray({ control, name });
	const handleChange = (index, payment_type) => {
		if (payment_type === 'reimbursement') {
			setValue(`${name}.${index}.tax`, 'Non Taxable');
		} else {
			setValue(`${name}.${index}.tax`, 'Taxable');
		}
	};

	const handleDeleteItem = (index) => {
		if (fields[index].status === 'original') {
			fields[index].active = false;
			setDeletedValues((prev) => ({ ...prev, [name]: [...prev[name], fields[index]] }));
		}

		remove(index);
	};

	const handleChangeAmount = () => {
		// eslint-disable-next-line max-len
		let sum = 0;
		const watchvalue = watch(name);
		watchvalue.forEach((item) => {
			sum += item?.amount || GLOBAL_CONSTANTS.zeroth_index;
		});
		setTotalSum(sum);
	};

	useEffect(() => {
		replace(data);
	}, [replace, data]);

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || '';
	});

	return (
		<div className={styles.container}>
			{!isEmpty(fields) && (
				<div>
					<div className={styles.child_container}>
						{fields?.map((field, index) => {
							const is_deduction = field.description === 'Standard Monthly Deduction';
							return (
								<div key={field.id} className={styles.field_row}>
									<div className={styles.detail}>
										<div className={styles.label}>Payment Type</div>
										<SelectController
											size="md"
											placeholder="Select Type"
											control={control}
											name={`${name}.${index}.payment_type`}
											rules={{ required: 'this is required' }}
											options={PAYMENT_TYPE_OPTIONS}
											disabled={is_deduction}
											onChange={(val) => handleChange(index, val)}
										/>
									</div>
									<div className={styles.detail}>
										<div className={styles.label}>Label</div>
										<InputController
											size="md"
											placeholder="Enter description"
											control={control}
											name={`${name}.${index}.description`}
											rules={{ required: 'this is required' }}
											disabled={is_deduction}
										/>
									</div>
									<div className={styles.detail}>
										<div className={styles.label}>Tax</div>
										<InputController
											size="md"
											placeholder="tax"
											control={control}
											name={`${name}.${index}.tax`}
											rules={{ required: 'this is required' }}
											disabled
										/>
									</div>
									<div className={styles.detail}>
										<div className={styles.label}>Amount</div>
										<InputController
											size="md"
											placeholder="Enter amount"
											control={control}
											name={`${name}.${index}.amount`}
											rules={{ required: 'this is required' }}
											type="number"
											disabled={is_deduction}
											onChange={(val) => handleChangeAmount(index, val)}
										/>
									</div>
									<ButtonIcon
										size="lg"
										icon={<IcMDelete />}
										themeType="primary"
										onClick={() => handleDeleteItem(index)}
										disabled={is_deduction}
									/>
								</div>
							);
						})}
					</div>

				</div>
			)}

			<Button
				size="md"
				themeType="secondary"
				onClick={() => append({ status: 'create', active: true })}
				className={styles.button_div}
			>
				+ Add Field
			</Button>
		</div>
	);
}

export default FieldArrayAdditions;
