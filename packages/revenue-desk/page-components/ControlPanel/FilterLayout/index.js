import { Select, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const tradeOptions = [
	{ label: 'Import', value: 'import' },
	{ label: 'Export', value: 'export' },
];
const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight_service' },
];
function FilterLayout({ filter = {}, setFilter = () => {}, apiTrigger = () => {} }) {
	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};
	return (

		<div className={styles.filter}>
			<div className={styles.fieldContainer}>
				<div>
					<Select
						placeholder="Service Type"
						options={serviceOptions}
						value={filter?.service_type}
						onChange={(val) => onChange(val, 'service_type')}
						size="sm"
						style={{ width: '150px' }}
					/>
				</div>
				<div>
					<Select
						placeholder="Trade Type"
						options={tradeOptions}
						value={filter?.trade_type}
						onChange={(val) => onChange(val, 'trade_type')}
						size="sm"
						style={{ width: '140px' }}
					/>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					themeType="accent"
					size="sm"
					disabled={isEmpty(filter?.trade_type)}
					onClick={() => apiTrigger({ filter })}
				>
					Fetch Weightages
				</Button>
			</div>
		</div>
	);
}

export default FilterLayout;
