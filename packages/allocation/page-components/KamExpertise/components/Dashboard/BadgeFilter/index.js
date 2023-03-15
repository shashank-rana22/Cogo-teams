import { Select } from '@cogoport/components';
import React from 'react';

import SearchInput from '../../../../../common/SearchInput';

import styles from './styles.module.css';

function BadgeFilter(props) {
	const { searchKAM, setSearchKAM, debounceQuery } = props;
	const options = [
		{ label: 'Gold', value: 300 },
		{ label: 'Silver', value: 200 },
		{ label: 'Bronze', value: 100 },
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
				<SearchInput
					size="sm"
					placeholder="Search KAM"
					value={searchKAM}
					setGlobalSearch={setSearchKAM}
					debounceQuery={debounceQuery}
				/>
			</div>
		</div>
	);
}

export default BadgeFilter;
