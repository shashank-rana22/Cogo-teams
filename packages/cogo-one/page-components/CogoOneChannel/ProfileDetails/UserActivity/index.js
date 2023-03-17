/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabPanel, Popover, Pagination } from '@cogoport/components';
import { IcMFdollar, IcMFilter, IcMCampaignTool, IcMPlatformDemo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';
import useListCogooneTimeline from '../../../../hooks/useListCogooneTimeline';
import getUserActivityComponent from '../../../../utils/getUserActivityComponent';

import Filters from './Filters';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function UserActivities({ activeTab, activeVoiceCard, customerId, formattedMessageData }) {
	const [activityTab, setActivityTab] = useState('transactional');
	const [filterVisible, setFilterVisible] = useState(false);
	const [pagination, setPagination] = useState(1);
	const [activeSubTab, setActiveSubTab] = useState('channels');

	const { user_id:messageUserId, lead_user_id:messageLeadUserId = null, id = '' } = formattedMessageData || {};

	const { user_id:voiceCallUserId = '' } = activeVoiceCard || {};

	const user_id = activeTab === 'message' ? messageUserId : voiceCallUserId;
	const lead_user_id = activeTab === 'message' ? messageLeadUserId : null;
	const ActiveComp = getUserActivityComponent(activityTab, activeSubTab) || null;

	const {
		loading = false,
		data = {},
		filters,
		setFilters,
		fetchActivityLogs = () => {},
	} = useGetOmnichannelActivityLogs({
		activeVoiceCard,
		activeTab,
		setFilterVisible,
		customerId,
		user_id,
		lead_user_id,
		activityTab,
		activeSubTab,
		pagination,
		setPagination,
	});
	const {
		loading: timeLineLoading = false,
		data: timeLineData = {},
	} = useListCogooneTimeline({
		activeSubTab,
		id,
		user_id,
		lead_user_id,
		type: 'activity',
		pagination,
		setPagination,

	});

	const { communication = {}, platform = {}, transactional = {} } = data || {};

	const { list: timeLineList = [], total_count: count } = timeLineData || {};

	let list = [];
	let total_count;
	if (activityTab === 'communication' || activityTab === 'transactional') {
		list = data?.[activityTab]?.list || [];
		total_count = data?.[activityTab]?.total_count || '0';
	} else {
		list = data?.[activityTab]?.spot_searches?.list || [];
		total_count = data?.[activityTab]?.spot_searches?.total_count || '0';
	}

	useEffect(() => {
		setActivityTab('transactional');
	}, [customerId]);

	useEffect(() => {
		setFilters(null);
		setActiveSubTab('channels');
		setPagination(1);
	}, [activityTab]);

	const handleFilters = (val) => {
		setPagination(1);
		setFilters(val);
	};

	const handleReset = () => {
		setFilters(null);
		fetchActivityLogs();
	};

	useEffect(() => { setPagination(1); setFilters(null); }, [activeSubTab]);

	const emptyList = activeSubTab !== 'channels' ? timeLineList : list;
	const emptyCheck = (!user_id && !lead_user_id) || isEmpty(emptyList);

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
						timeLineList={timeLineList}
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
					<TabPanel name="platform" title={<IcMPlatformDemo width={20} height={20} />} />
					<TabPanel name="communication" title={<IcMCampaignTool width={20} height={20} />} />
				</Tabs>
			</div>

			{(activeTab === 'message' && activityTab === 'communication') && (
				<div className={styles.communication_options}>
					<Tabs
						activeSubTab={activeSubTab}
						themeType="secondary"
						onChange={setActiveSubTab}
						fullWidth={false}
					>
						<TabPanel name="channels" title="Channels" />
						<TabPanel name="agent" title="Agents" />
					</Tabs>
				</div>
			)}

			{activeSubTab !== 'agent' && (
				<div className={styles.filters_container}>
					<div className={styles.title}>
						{USER_ACTIVITY_MAPPING[activityTab]}
					</div>

					{activityTab !== 'platform' && (
						<div className={styles.filter_icon} key={activeTab}>
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
								<IcMFilter
									width={20}
									height={20}
									onClick={() => setFilterVisible(!filterVisible)}
								/>
							</Popover>
							{!isEmpty(filters) && <div className={styles.filters_applied} />}
						</div>
					)}

				</div>
			)}
			{(loading || timeLineLoading) ? (
				<LoadingState activityTab={activityTab} />
			) : (
				<ShowData />

			)}

			{(!loading || !timeLineLoading) && (
				<div className={styles.pagination}>
					<Pagination
						type="page"
						currentPage={pagination}
						totalItems={activeSubTab === 'agent' ? count : total_count}
						pageSize={10}
						onPageChange={(val) => setPagination(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default UserActivities;
