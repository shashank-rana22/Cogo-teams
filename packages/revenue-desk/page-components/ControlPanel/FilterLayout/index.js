import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const tradeOptions = [
	{ label: 'Import', value: 'import' },
	{ label: 'Export', value: 'export' },
];

function FilterLayout() {
	const [filter, setFilter] = useState({});
	console.log(filter, 'iiiiii');
	const onChange = (type) => {
		setFilter((prev) => ({ ...prev, trade_type: type }));
	};

	return (
		<div className={styles.outerContainer}>
			<div className={styles.filter}>
				<Select
					placeholder="Trade Type"
					options={tradeOptions}
					value={filter?.trade_type}
					onChange={onChange}
					size="md"
					style={{ width: '150px' }}
				/>

			</div>
		</div>
	);
}

export default FilterLayout;
