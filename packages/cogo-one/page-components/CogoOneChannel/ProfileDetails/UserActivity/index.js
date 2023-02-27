import { Tabs, TabPanel, Popover, Pagination } from '@cogoport/components';
import { IcMFdollar, IcMFilter, IcMCampaignTool, IcMDesktop } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import USER_ACTIVITY_COMPONENT_MAPPING from '../../../../constants/USER_ACTIVITY_MAPPING';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';

import Filters from './Filters';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function UserActivities({ activeTab, activeVoiceCard, customerId, formattedMessageData }) {
	const [activityTab, setActivityTab] = useState('transactional');
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState([]);

	const { user_id:messageUserId, lead_user_id:messageLeadUserId = null } = formattedMessageData || {};

	const { user_id:voiceCallUserId = '' } = activeVoiceCard || {};

	const user_id = activeTab === 'message' ? messageUserId : voiceCallUserId;
	const lead_user_id = activeTab === 'message' ? messageLeadUserId : null;
	const ActiveComp = USER_ACTIVITY_COMPONENT_MAPPING[activityTab] || null;

	const {
		loading = false,
		data = {},
		pagination,
		fetchActivityLogs = () => {},
		setPagination = () => {},
	} = useGetOmnichannelActivityLogs({
		activeVoiceCard,
		activeTab,
		setFilterVisible,
		customerId,
		user_id,
		lead_user_id,
		activityTab,
	});

	const { communication = {}, platform = {}, transactional = {} } = data || {};

	let list = [];
	let total_count;
	if (activityTab === 'communication' || activityTab === 'transactional') {
		list = data?.[activityTab]?.list || [];
		total_count = data?.[activityTab]?.total_count || '0';
	} else {
		list = data?.[activityTab]?.spot_searches?.list || [];
		total_count = data?.[activityTab]?.spot_searches?.total_count || '0';
	}

	const handleFilters = () => {
		setPagination(1);
		fetchActivityLogs(filters);
	};

	const handleReset = () => {
		setFilters([]);
		fetchActivityLogs();
	};

	useEffect(() => {
		setActivityTab('transactional');
	}, [customerId]);

	useEffect(() => {
		setFilters([]);
		setPagination(1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activityTab]);

	const emptyCheck = (!user_id && !lead_user_id) || isEmpty(list);

	function ShowData() {
		return emptyCheck ? (
			<div className={styles.empty}>
				<EmptyState type="activities" />
			</div>
		) : (
			<div
				className={styles.list_container}
			>
				{ActiveComp && (
					<ActiveComp
						communication={communication}
						platform={platform}
						transactional={transactional}
					/>
				)}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.tabs}>
				<Tabs
					activeTab={activityTab}
					fullWidth
					themeType="secondary"
					onChange={setActivityTab}
				>
					<TabPanel
						name="transactional"
						title={<IcMFdollar width={20} height={20} />}
					/>
					<TabPanel name="platform" title={<IcMDesktop width={20} height={20} />} />
					<TabPanel name="communication" title={<IcMCampaignTool width={20} height={20} />} />
				</Tabs>
			</div>

			<div className={styles.filters_container}>
				<div className={styles.title}>
					{USER_ACTIVITY_MAPPING[activityTab]}
				</div>

				{activityTab !== 'platform' && (
					<div className={styles.filter_icon}>
						<Popover
							placement="left"
							render={(
								<Filters
									setFilterVisible={setFilterVisible}
									activityTab={activityTab}
									filters={filters}
									setFilters={setFilters}
									handleFilters={handleFilters}
									handleReset={handleReset}
								/>
							)}
							visible={filterVisible}
							onClickOutside={() => setFilterVisible(false)}
						>

							<IcMFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
						</Popover>
						{!isEmpty(filters) && <div className={styles.filters_applied} />}
					</div>
				)}

			</div>
			{loading ? (
				<LoadingState activityTab={activityTab} />
			) : (
				<ShowData />

			)}

			{!loading && (
				<div className={styles.pagination}>
					<Pagination
						type="page"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={10}
						onPageChange={(val) => setPagination(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default UserActivities;
