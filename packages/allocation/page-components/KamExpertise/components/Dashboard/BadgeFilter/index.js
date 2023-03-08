import { Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function BadgeFilter() {
	const [search, setSearch] = useState('Search KAM');
	const options = [
		{ label: 'Gold', value: 355 },
		{ label: 'Silver', value: 54 },
		{ label: 'Bronze', value: 43 },
	];

	return (
		<div className={styles.container}>
			<div className={styles.select_container}>
				<Select
					size="sm"
					// value={value}
					// onChange={setValue(value)}
					placeholder="Select Badge"
					options={options}
				/>
			</div>

			<div className={styles.search}>
				<Input
					size="sm"
					suffix={<IcMSearchlight style={{ margin: '0 8px' }} />}
					placeholder={search}
					onChange={setSearch}
				/>
			</div>
		</div>
	);
}

export default BadgeFilter;
