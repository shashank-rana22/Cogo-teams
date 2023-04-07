import { Tabs, TabPanel, Popover, Pagination } from '@cogoport/components';
import { IcMFdollar, IcMFilter, IcMCampaignTool, IcMPlatformDemo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';
import useListCogooneTimeline from '../../../../hooks/useListCogooneTimeline';
import useListUserChatSummary from '../../../../hooks/useListUserChatSummary';
import getUserActivityComponent from '../../../../utils/getUserActivityComponent';

import Filters from './Filters';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

const EmptyFunction = () => {};

function UserActivities({ activeTab, activeVoiceCard, customerId, formattedMessageData, activeMessageCard }) {
	const [activityTab, setActivityTab] = useState('transactional');
	const [filterVisible, setFilterVisible] = useState(false);
	const [pagination, setPagination] = useState(1);
	const [activeSubTab, setActiveSubTab] = useState('channels');

	const { mobile_no, channel_type = '' } = activeMessageCard;
	const {
		user_id:messageUserId,
		lead_user_id:messageLeadUserId = null, id = '', sender = '',
	} = formattedMessageData || {};

	const { user_id:voiceCallUserId = '' } = activeVoiceCard || {};

	const user_id = activeTab === 'message' ? messageUserId : voiceCallUserId;
	const lead_user_id = activeTab === 'message' ? messageLeadUserId : null;
	const ActiveComp = getUserActivityComponent(activityTab, activeSubTab) || null;

	const {
		loading = false,
		data = {},
		filters,
		setFilters = EmptyFunction,
		fetchActivityLogs = EmptyFunction,
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
		timeLineLoading = false,
		timeLineData = {},
	} = useListCogooneTimeline({
		activeSubTab,
		id,
		user_id,
		lead_user_id,
		type: 'activity',
		pagination,
		setPagination,

	});

	const {
		chatData = {},
		dateFilters,
		setDateFilters = EmptyFunction,
		getUserChatSummary = EmptyFunction,
	} = useListUserChatSummary({
		mobile_no,
		activeSubTab,
		sender,
		user_id,
		lead_user_id,
		pagination,
		setPagination,
		channel_type,
	});

	const { communication = {}, platform = {}, transactional = {} } = data || {};

	const { list: timeLineList = [], total_count: agent_total_count } = timeLineData || {};
	const { list: chatDataList = [], total_count: summary_total_count } = chatData || {};

	let subtab_count;
	if (activeSubTab === 'agent') { subtab_count = agent_total_count; }
	if (activeSubTab === 'summary') { subtab_count = summary_total_count; }

	let list = [];
	let channel_total_count;

	if (activityTab === 'communication' || activityTab === 'transactional') {
		list = data?.[activityTab]?.list || [];
		channel_total_count = data?.[activityTab]?.total_count || '0';
	} else {
		list = data?.[activityTab]?.spot_searches?.list || [];
		channel_total_count = data?.[activityTab]?.spot_searches?.total_count || '0';
	}

	useEffect(() => {
		setActivityTab('transactional');
	}, [customerId]);

	useEffect(() => {
		setFilters(null);
		setDateFilters(null);
		setActiveSubTab('channels');
		setPagination(1);
	}, [activityTab, setFilters, setDateFilters]);

	useEffect(() => {
		setFilters(null);
		setDateFilters(null);
		setPagination(1);
	}, [activeSubTab, setFilters, setDateFilters]);

	const handleFilters = (val) => {
		if (activeSubTab === 'summary') { setDateFilters(val); } else { setFilters(val); }
		setPagination(1);
		setFilterVisible(false);
	};

	const handleReset = () => {
		setFilters(null);
		setDateFilters(null);
		if (activeSubTab === 'summary') { getUserChatSummary(); } else { fetchActivityLogs(); }
		setFilterVisible(false);
	};

	let emptyCheck = false;
	if (activeSubTab === 'channels') {
		emptyCheck = (!user_id && !lead_user_id) || isEmpty(list);
	} else if (activeSubTab === 'summary') {
		emptyCheck = isEmpty(chatDataList);
	} else {
		emptyCheck = isEmpty(timeLineList);
	}

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
						chatDataList={chatDataList}
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
						<TabPanel name="summary" title="Summary" />
					</Tabs>
				</div>
			)}

			{activeSubTab !== 'agent' && (
				<div className={styles.filters_container}>
					<div className={styles.title}>
						{activeSubTab === 'summary'
							? USER_ACTIVITY_MAPPING[activeSubTab]
							: USER_ACTIVITY_MAPPING[activityTab]}
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
										dateFilters={dateFilters}
										setDateFilters={setDateFilters}
										handleFilters={handleFilters}
										handleReset={handleReset}
										loading={loading}
										activeSubTab={activeSubTab}
									/>
								)}
								visible={filterVisible}
								onClickOutside={() => setFilterVisible(false)}
							>
								<IcMFilter
									width={20}
									height={20}
									onClick={() => setFilterVisible((prev) => !prev)}
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
						totalItems={activeSubTab === 'agent' || activeSubTab === 'summary'
							? subtab_count : channel_total_count}
						pageSize={10}
						onPageChange={(val) => setPagination(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default UserActivities;
