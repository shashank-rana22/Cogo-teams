import { Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function BadgeFilter() {
	// const [value, setValue] = useState('');
	const [search, setSearch] = useState('Search KAM');
	const options = [
		{ label: 'Albania', value: 355 },
		{ label: 'Argentina', value: 54 },
		{ label: 'Austria', value: 43 },
		{ label: 'Cocos Islands', value: 61 },
		{ label: 'Kuwait', value: 965 },
		{ label: 'Sweden', value: 46 },
		{ label: 'Venezuela', value: 58 },
	];

	return (
		<div className={styles.container}>
			<div style={{ padding: 16, width: 'fit-content' }}>
				<Select
					size="sm"
					// value={value}
					// onChange={setValue(value)}
					placeholder="Select Books"
					options={options}
				/>
			</div>
			<div className={styles.search}>
				<Input
					size="md"
					suffix={<IcMSearchlight style={{ margin: '0 8px' }} />}
					placeholder={search}
					onChange={setSearch}
				/>
			</div>
		</div>
	);
}

export default BadgeFilter;
