import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMDownload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

import SearchInput from '../../../../../../../common/SearchInput';

import styles from './styles.module.css';

function BadgeFilterHeader(props) {
	const { t } = useTranslation(['allocation']);

	const {
		leaderboardLoading, searchKAM, setSearchKAM, debounceQuery, badgeName, setBadgeName,
		conditionName, setConditionName, roleName, setRoleName, managerName, setManagerName,
	} = props;

	const { id } = useSelector((state) => state.profile.partner);

	return (

		<div className={styles.leaderboard_header}>
			<div className={styles.overview_header}>
				{t('allocation:leaderboard_label')}
			</div>

			<div className={styles.container}>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder={t('allocation:manager')}
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
								status               : 'active',
								partner_id           : id,
								partner_entity_types : ['cogoport'],
							},
							page_limit: 10,
						}}
					/>
				</div>
				<div className={styles.select_container}>
					<AsyncSelect
						placeholder={t('allocation:role')}
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
						placeholder={t('allocation:event_configuration')}
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
						placeholder={t('allocation:badge_label')}
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
						placeholder={t('allocation:search_kam')}
						value={searchKAM}
						disabled={leaderboardLoading}
						setGlobalSearch={setSearchKAM}
						debounceQuery={debounceQuery}
					/>
				</div>
				<div className={styles.download_container}>
					<IcMDownload width="20px" height="20px" />
				</div>
			</div>
		</div>
	);
}

export default BadgeFilterHeader;
