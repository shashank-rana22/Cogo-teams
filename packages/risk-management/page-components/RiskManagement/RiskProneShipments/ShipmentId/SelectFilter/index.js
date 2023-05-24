import { Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import React, { useState } from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Customer Expertise',
		value : 'customer_expertise',
	},
	{
		label : 'Trade Expertise',
		value : 'trade_expertise',
	},
	{
		label : 'Commodity Expertise',
		value : 'commodity_expertise',
	},
	{
		label : 'Misc Expertise',
		value : 'miscellaneous',
	},
];

function SelectFilter() {
	const [cargoValue, setCargoValue] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.select}>
				<AsyncSelect
					name="selected_agent_id"
					size="sm"
					placeholder="Origin"
					asyncKey="partner_users"
					isClearable
					valueKey="user_id"
				/>
			</div>
			<div className={styles.select}>
				<AsyncSelect
					name="selected_agent_id"
					size="sm"
					placeholder="Destination"
					asyncKey="partner_users"
					isClearable
					valueKey="user_id"
				/>
			</div>
			<div className={styles.select}>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Cargo Value"
					value={cargoValue}
					options={OPTIONS}
					onChange={(value) => (
						setCargoValue(value)
					)}
					className={styles.dropdown}
					// disabled={loading}
				/>
			</div>
			<div className={styles.select}>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Potential Charges"
					value={cargoValue}
					options={OPTIONS}
					onChange={(value) => (
						setCargoValue(value)
					)}
					className={styles.dropdown}
				/>
			</div>
			<div className={styles.select}>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Reason"
					value={cargoValue}
					options={OPTIONS}
					onChange={(value) => (
						setCargoValue(value)
					)}
					className={styles.dropdown}
				/>
			</div>
		</div>
	);
}

export default SelectFilter;
