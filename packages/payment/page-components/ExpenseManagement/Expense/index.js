import { Select } from '@cogoport/components';
import { useState } from 'react';

import useGetExpenseData from '../../../hooks/useGetExpenseData';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: '2022-2023', value: '2023' },
	{ label: '2021-2022', value: '2022' },
	{ label: '2020-2021', value: '2021' },
	{ label: '2019-2020', value: '2020' },
];

const CARDDATA = [
	{ label: 'Pending Requests', value: 'pending_count' },
	{ label: 'Total Requested Amount', value: 'pending_sum' },
	{ label: 'Total Approved Amount', value: 'approved_sum' },
	{ label: 'Total Processes Amount', value: 'processed_sum' },

];

function Expense() {
	const [value, setValue] = useState('2023');
	const { loading, data } = useGetExpenseData();
	return (
		<div className={styles.sub_container}>
			<div className={styles.head_section}>
				<span className={styles.heading}> Expense Management </span>
				<Select
					value={value}
					onChange={(val) => setValue(val)}
					placeholder="Select year"
					options={OPTIONS}
					className={styles.select_input}
				/>
			</div>
			<div className={styles.card_section}>
				{loading ? null
					: CARDDATA.map((item) => (
						<div className={styles.expense_card} key={item.label}>
							<span className={styles.card_value}>{data?.[item.value]}</span>
							<span className={styles.card_label}>{item.label}</span>
						</div>
					))}
			</div>
		</div>
	);
}

export default Expense;
