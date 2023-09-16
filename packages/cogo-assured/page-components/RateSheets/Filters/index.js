import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import controls from './controls';
import styles from './styles.module.css';

const ONE = 1;

function Filters({ filters = {}, setFilters = () => {} }) {
	return (

		<div className={styles.filter}>
			<Select
				{...controls[GLOBAL_CONSTANTS.zeroth_index]}
				onChange={(value) => setFilters({ ...filters, status: value, page: 1 })}
				value={filters?.status}
				className={styles.field_controller}
				isClearable
			/>

			<Select
				{...controls[ONE]}
				onChange={(value) => setFilters({ ...filters, service_name: value, page: 1 })}
				value={filters?.service_name}
				className={styles.field_controller}
				isClearable
			/>
		</div>

	);
}
export default Filters;
