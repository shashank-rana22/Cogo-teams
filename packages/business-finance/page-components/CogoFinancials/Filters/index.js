import { Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Filters({ setTableFilters = () => { }, tableFilters = {} }) {
	return (
		<div className={styles.container}>
			<Select
				options={[
					{ label: 'OVERALL', value: 'OVERALL' },
					{ label: 'AIR', value: 'AIR' },
					{ label: 'OCEAN', value: 'OCEAN' },
					{ label: 'RAIL', value: 'RAIL' },
					{ label: 'SURFACE', value: 'SURFACE' },
				]}
				onChange={(val) => setTableFilters({ ...tableFilters, serviceLevel: val, pageIndex: 1 })}
				value={tableFilters?.serviceLevel}
				placeholder="Service Level"
			/>
		</div>
	);
}

export default Filters;
