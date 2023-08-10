import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
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

			<Input
				value={tableFilters?.query}
				onChange={(val) => setTableFilters({ ...tableFilters, query: val, pageIndex: 1 })}
				placeholder="Search by SID/Customer Name"
				suffix={<IcMSearchlight style={{ margin: '0px 8px' }} />}
				style={{ width: '20%' }}
			/>
		</div>
	);
}

export default Filters;
