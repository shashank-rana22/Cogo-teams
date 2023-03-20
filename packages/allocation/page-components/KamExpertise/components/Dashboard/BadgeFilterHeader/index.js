import { Select } from '@cogoport/components';
import React from 'react';

import SearchInput from '../../../../../common/SearchInput';

import styles from './styles.module.css';

function BadgeFilterHeader(props) {
	const { leaderboardLoading, searchKAM, setSearchKAM, debounceQuery } = props;
	const options = [
		{ label: 'Gold', value: 300 },
		{ label: 'Silver', value: 200 },
		{ label: 'Bronze', value: 100 },
	];

	return (

		<div className={styles.leaderboard_header}>
			<div className={styles.overview_header}>
				Leaderboard
			</div>

			<div className={styles.container}>
				<div className={styles.select_container}>
					<Select
						size="sm"
					// value={value}
					// onChange={setValue(value)}
						disabled={leaderboardLoading}
						placeholder="Select Badge"
						options={options}
					/>
				</div>

				<div className={styles.search}>
					<SearchInput
						size="sm"
						placeholder="Search KAM"
						value={searchKAM}
						disabled={leaderboardLoading}
						setGlobalSearch={setSearchKAM}
						debounceQuery={debounceQuery}
					/>
				</div>
			</div>
		</div>
	);
}

export default BadgeFilterHeader;
