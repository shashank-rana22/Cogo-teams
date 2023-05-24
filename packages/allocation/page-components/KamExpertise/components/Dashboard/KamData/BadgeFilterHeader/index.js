import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function BadgeFilterHeader(props) {
	const { leaderboardLoading, searchKAM, setSearchKAM, debounceQuery, badgeName, setBadgeName } = props;

	return (

		<div className={styles.leaderboard_header}>
			<div className={styles.overview_header}>
				Leaderboard
			</div>

			<div className={styles.container}>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder="Badge"
						size="sm"
						value={badgeName}
						onChange={(value) => setBadgeName(value)}
						asyncKey="badge_name"
						multiple
						isClearable
						disabled={leaderboardLoading}
						initialCall
						params={{
							filters: {
								status                       : 'active',
								expertise_configuration_type : 'event_configuration',
							},
						}}
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
