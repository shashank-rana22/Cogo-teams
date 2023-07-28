import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMDownload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import SearchInput from '../../../../../../../common/SearchInput';

import styles from './styles.module.css';

function BadgeFilterHeader(props) {
	const {
		leaderboardLoading, searchKAM, setSearchKAM, debounceQuery, badgeName, setBadgeName,
		conditionName, setConditionName, roleName, setRoleName, managerName, setManagerName,
	} = props;

	const { id } = useSelector((state) => state.profile.partner);

	return (

		<div className={styles.leaderboard_header}>
			<div className={styles.overview_header}>
				Leaderboard
			</div>

			<div className={styles.container}>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder="Manager"
						size="sm"
						value={managerName}
						onChange={(value) => setManagerName(value)}
						asyncKey="partner_users_ids"
						multiple
						isClearable
						initialCall
						disabled={leaderboardLoading}
						params={{
							filters: {
								status     : 'active',
								partner_id : id,
							},
							page_limit: 10,
						}}
					/>
				</div>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder="Role"
						size="sm"
						value={roleName}
						onChange={(value) => setRoleName(value)}
						asyncKey="partner_roles"
						multiple
						isClearable
						initialCall
						disabled={leaderboardLoading}
					/>
				</div>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder="Event configuration"
						size="sm"
						value={conditionName}
						onChange={(value) => setConditionName(value)}
						asyncKey="expertise_configuration"
						multiple
						isClearable
						initialCall
						disabled={leaderboardLoading}
					/>
				</div>
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
				{/* <Tooltip
					placement="bottom"
					content="Csv download"
				> */}
				<div className={styles.download_container}>
					<IcMDownload width="20px" height="20px" />
				</div>
				{/* </Tooltip> */}
			</div>
		</div>
	);
}

export default BadgeFilterHeader;
