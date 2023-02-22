import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Filters() {
	// const [sortBy, setSetSortBy] = useState('');
	// const [tradeType, setTradeType] = useState('');

	// const [service, setService] = useState('');
	// const [date, setDate] = useState('');

	return (
		<div className={styles.container}>
			{/* <div className={styles.form_item}>
				<Select
					value={sortBy}
					name="sort_by"
					className={styles.select}
					placeholder="Sort By"
					isClearable
					onChange={setSetSortBy}
					options={[
						{ label: 'Date', value: 'date' },
						{ label: 'AWB', value: 'awb' },
					]}
				/>
			</div>
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
			</div> */}
			<div className={styles.form_item}>
				<Button themeType="secondary" className={styles.filter_svg}>
					Filter
					{' '}
					<IcMFilter />
				</Button>
			</div>
		</div>
	);
}

export default Filters;
