import { Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Filters({ setTableFilters = () => { }, tableFilters = {} }) {
	return (
		<div className={styles.container}>
			<Select
				options={[{ label: 'Overall', value: 'Overall' }]}
				onChange={(val) => setTableFilters({ ...tableFilters, type1: val, pageIndex: 1 })}
			/>
			<div className={styles.select}>
				<Select
					options={[{ label: 'Customs', value: 'customs' }]}
					onChange={(val) => setTableFilters({ ...tableFilters, type2: val, pageIndex: 1 })}
				/>
			</div>
		</div>
	);
}

export default Filters;
