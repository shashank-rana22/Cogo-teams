import { Button, Input } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useAssignKRAs from './useAssignKRAs';

const INITIAL_TOTAL_AMOUNT = 0.00;
const MAX_VALUE_OF_TOTAL_AMOUNT = 1.00;
const ROUND_OFF_DIGIT = 100;

const getTotalAmount = (inputValue) => (inputValue || []).reduce((total, element) => {
	const { weightage } = element;
	const parsedValue = parseFloat(weightage);

	if (!Number.isNaN(parsedValue)) {
		return total + parsedValue;
	}

	return Math.round(total * ROUND_OFF_DIGIT) / ROUND_OFF_DIGIT;
}, INITIAL_TOTAL_AMOUNT);

function KRAWeightCalculationTable({
	setInputValue,
	inputValue,
	selectArray,
	getEmployeesWithLowWeightage,
	getUnassignedEmployee,
	resetObjects,
}) {
	const [deletedKraArray, setDeletedKraArray] = useState([]);

	const { onClickSubmitKRAs, loading, onClickDeleteIcon } = useAssignKRAs({
		inputValue,
		selectArray,
		getEmployeesWithLowWeightage,
		getUnassignedEmployee,
		setInputValue,
		resetObjects,
		deletedKraArray,
		setDeletedKraArray,
	});

	const updatedValue = [...inputValue];

	const renderFields = () => (inputValue || []).map((element, index) => (
		<div className={styles.value} key={element?.kra_assigned}>
			<Input
				value={inputValue[index]?.weightage}
				size="sm"
				placeholder="0"
				onChange={(event) => {
					updatedValue[index] = { ...updatedValue[index], weightage: event };
					setInputValue(updatedValue);
				}}
			/>

			<div
				role="presentation"
				className={styles.delete_icon}
				onClick={() => onClickDeleteIcon(element?.kra_assigned)}
			>
				<IcMDelete width={18} height={18} />

			</div>
		</div>
	));

	const totalAmount = Math.round(getTotalAmount(inputValue) * ROUND_OFF_DIGIT) / ROUND_OFF_DIGIT;

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				<div className={styles.kra}>
					<div className={styles.label}>
						Key Result Area
					</div>

					{(inputValue || []).map((element) => (
						<div className={styles.kra_value} key={element?.kra_assigned}>
							{element?.name}
						</div>
					))}
				</div>

				<div className={styles.weight}>
					<div className={styles.label}>
						Weight
					</div>

					{renderFields()}
				</div>
			</div>

			<div className={styles.footer}>
				<div>
					<div style={{ fontWeight: 600 }}>
						Total Weight :
					</div>

					<div className={styles.amount}>
						{totalAmount || INITIAL_TOTAL_AMOUNT}
					</div>
				</div>

				<Button
					disabled={totalAmount !== MAX_VALUE_OF_TOTAL_AMOUNT}
					onClick={onClickSubmitKRAs}
					loading={loading}
				>
					Submit KRAs
				</Button>

			</div>

		</div>
	);
}

export default KRAWeightCalculationTable;
