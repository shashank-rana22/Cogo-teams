import { Select, Datepicker } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Filters() {
	const [tradeType, setTradeType] = useState('');
	const [service, setService] = useState('');
	const [date, setDate] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.form_item}>
				<Select
					value={tradeType}
					name="trade_type"
					className={styles.select}
					placeholder="Trade Type"
					isClearable
					onChange={setTradeType}
					options={[
						{ label: 'Import', value: 'import' },
						{ label: 'Export', value: 'export' },
					]}
				/>
			</div>
			<div className={styles.form_item}>
				<Select
					value={service}
					name="service"
					className={styles.select}
					placeholder="Service"
					isClearable
					onChange={setService}
					options={[
						{ label: 'FCL', value: 'fcl' },
						{ label: 'LCL', value: 'lcl' },
						{ label: 'AIR', value: 'air' },
					]}
				/>
			</div>
			<div className={styles.form_item}>
				<Datepicker
					placeholder="Date"
					className={styles.date}
					dateFormat="MM/dd/yyyy"
					name="date"
					onChange={setDate}
					value={date}
				/>
			</div>
		</div>
	);
}

export default Filters;
