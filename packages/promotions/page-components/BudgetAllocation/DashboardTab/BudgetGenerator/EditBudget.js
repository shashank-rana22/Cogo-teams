import { Input, ButtonIcon } from '@cogoport/components';
import { IcMTick, IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateBudgetAmount from '../../../../hooks/useUpdateBudgetAmount';

import styles from './styles.module.css';

function EditBudget({ amount = 0, refetchDashboard = () => {}, setIsEdit = () => {}, budgetId = '' }) {
	const [budgetValue, setBudgetValue] = useState(amount || 0);

	const { loading = {}, updateBudgetAmount = () => {} } = useUpdateBudgetAmount({
		refetch: () => {
			refetchDashboard();
			setIsEdit(false);
		},
	});

	return (
		<div className={styles.content}>
			<Input
				className={styles.main_text}
				size="sm"
				placeholder="Enter Budget amount"
				value={budgetValue}
				onChange={setBudgetValue}
			/>

			<ButtonIcon
				size="md"
				icon={<IcMTick />}
				themeType="primary"
				disabled={loading}
				onClick={() => {
					updateBudgetAmount({
						data: {
							id     : budgetId,
							amount : parseFloat(budgetValue),
						},
					});
				}}
			/>

			<ButtonIcon
				size="md"
				icon={<IcMCross />}
				disabled={loading}
				themeType="primary"
				onClick={() => {
					setIsEdit(false);
				}}
			/>
		</div>
	);
}

export default EditBudget;
