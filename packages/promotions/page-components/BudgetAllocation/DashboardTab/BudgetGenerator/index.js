import { ButtonIcon, Select } from '@cogoport/components';
import currencyCode from '@cogoport/globalization/constants/currencyCode';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';

const EditBudget = dynamic(() => import('./EditBudget'), {
	ssr: false,
});

const options = [
	{ label: currencyCode.USD, value: currencyCode.USD },
	{ label: currencyCode.INR, value: currencyCode.INR },
];

function BudgetGenerator({
	budgetId = '',
	amount = 0,
	refetchDashboard = () => {},
	params = {},
	setParams = () => {},
}) {
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.title}>Budget:</div>
				{isEdit ? (
					<EditBudget
						refetchDashboard={refetchDashboard}
						amount={amount}
						setIsEdit={setIsEdit}
						budgetId={budgetId}
					/>
				) : (
					<div className={styles.content}>
						<div className={styles.main_text}>
							{formatAmount({
								amount,
								currency : params.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 0,
								},
							})}
						</div>
						<ButtonIcon
							size="md"
							icon={<IcMEdit />}
							themeType="primary"
							onClick={() => {
								setIsEdit(true);
							}}
						/>
					</div>
				)}
			</div>

			<div className={styles.content}>
				<div className={styles.currency_text}>Currency:</div>
				<div className={styles.currency_select}>
					<Select
						value={params.currency}
						onChange={(e) => { setParams({ ...params, currency: e }); }}
						placeholder="Select Currency"
						size="sm"
						options={options}
					/>
				</div>
			</div>
		</div>
	);
}

export default React.memo(BudgetGenerator);
