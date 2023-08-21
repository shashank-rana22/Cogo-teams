import { Select, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const tradeOptions = [
	{ label: 'Import', value: 'import' },
	{ label: 'Export', value: 'export' },
];
const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight' },
];
function FilterLayout({ filter = {}, setFilter = () => {}, apiTrigger = () => {} }) {
	const onResetFilter = () => setFilter({ service_type: 'fcl_freight' });

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
				<div>
					<Select
						placeholder="Customer Segment"
						options={[{ label: 'FCL Freight', value: 'fcl_freight' }]}
						value={filter?.customer_segment}
						onChange={(val) => onChange(val, 'customer_segment')}
						size="sm"
						style={{ width: '200px' }}
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
					Apply Changes
				</Button>
				<Button
					themeType="secondary"
					size="sm"
					onClick={onResetFilter}
				>
					Reset Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterLayout;
