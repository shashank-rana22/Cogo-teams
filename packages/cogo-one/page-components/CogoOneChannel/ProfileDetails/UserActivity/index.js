import { Tabs, TabPanel, Popover, Pagination } from '@cogoport/components';
import { IcMFdollar, IcMFilter, IcMCampaignTool, IcMPlatformDemo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';
import useListCogooneTimeline from '../../../../hooks/useListCogooneTimeline';
import useListTransactionalShipments from '../../../../hooks/useListTransactionalShipments';
import useListUserChatSummary from '../../../../hooks/useListUserChatSummary';

import ActiveComponent from './ActiveComponent';
import Filters from './Filters';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

const EmptyFunction = () => {};
const DEFAULT_PAGE_COUNT = 1;

function UserActivities(props) {
	const {
		activeTab = '', activeVoiceCard = {}, customerId, formattedMessageData, activeMessageCard, showMore,
		setRaiseTicketModal = () => {},
		viewType = '',
	} = props || {};

	const [activityTab, setActivityTab] = useState('transactional');
	const [filterVisible, setFilterVisible] = useState(false);
	const [pagination, setPagination] = useState(DEFAULT_PAGE_COUNT);
	const [activeSubTab, setActiveSubTab] = useState('channels');

	const { mobile_no, channel_type = '' } = activeMessageCard;
	const {
		user_id: messageUserId, lead_user_id: messageLeadUserId = null, id = '', sender = '',
		organization_id: orgId = '',
	} = formattedMessageData || {};
	const { user_id:voiceCallUserId = '' } = activeVoiceCard || {};
	const showShipments = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page;

	const user_id = activeTab === 'message' ? messageUserId : voiceCallUserId;
	const lead_user_id = activeTab === 'message' ? messageLeadUserId : null;

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
	const { listLoading, shipmentsData } = useListTransactionalShipments({ pagination, orgId, filters });
	const { timeLineLoading = false, timeLineData = {} } = useListCogooneTimeline({
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

	const { list: timeLineList = [], total_count: agent_total_count } = timeLineData || {};
	const { list: chatDataList = [], total_count: summary_total_count } = chatData || {};

	let list = [];
	let channel_total_count;

	if (showShipments && activityTab === 'transactional') {
		list = shipmentsData?.list || [];
		channel_total_count = shipmentsData?.total_count || '0';
	} else if (activityTab === 'communication' || activityTab === 'transactional') {
		list = data?.[activityTab]?.list || [];
		channel_total_count = data?.[activityTab]?.total_count || '0';
	} else {
		list = data?.[activityTab]?.spot_searches?.list || [];
		channel_total_count = data?.[activityTab]?.spot_searches?.total_count || '0';
	}

	let subtab_count;
	if (activeSubTab === 'agent') {
		subtab_count = agent_total_count;
	} else if (activeSubTab === 'summary') {
		subtab_count = summary_total_count;
	} else {
		subtab_count = channel_total_count;
	}

	useEffect(() => { setActivityTab('transactional'); }, [customerId]);

	useEffect(() => {
		setFilters(null);
		setDateFilters(null);
		setPagination(DEFAULT_PAGE_COUNT);
		if (activityTab !== 'communication') {
			setActiveSubTab('channels');
		}
	}, [activityTab, activeSubTab, setFilters, setDateFilters]);

	const handleFilters = (val) => {
		if (activeSubTab === 'summary') {
			setDateFilters(val);
		} else {
			setFilters(val);
		}
		setPagination(DEFAULT_PAGE_COUNT);
		setFilterVisible(false);
	};

	const handleReset = () => {
		setFilters(null);
		setDateFilters(null);
		if (activeSubTab === 'summary') {
			getUserChatSummary();
		} else {
			fetchActivityLogs();
		}
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

	useEffect(() => {
		if (showMore) {
			setActivityTab('communication');
			setActiveSubTab('summary');
		}
	}, [showMore]);

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
					<TabPanel
						name="platform"
						title={<IcMPlatformDemo width={20} height={20} />}
					/>
					<TabPanel
						name="communication"
						title={<IcMCampaignTool width={20} height={20} />}
					/>
				</Tabs>
			</div>

			{(activeTab === 'message' && activityTab === 'communication') && (
				<div className={styles.communication_options}>
					<Tabs
						activeTab={activeSubTab}
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
						{USER_ACTIVITY_MAPPING[activeSubTab === 'summary' ? activeSubTab : activityTab]}
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
			{(loading || timeLineLoading || listLoading) ? (
				<LoadingState activityTab={activityTab} />
			) : (
				<ActiveComponent
					emptyCheck={emptyCheck}
					activityTab={activityTab}
					activeSubTab={activeSubTab}
					data={data}
					chatDataList={chatDataList}
					timeLineList={timeLineList}
					setRaiseTicketModal={setRaiseTicketModal}
					viewType={viewType}
					shipmentsData={shipmentsData}
				/>
			)}
			{(!loading || !timeLineLoading || !listLoading) && (
				<div className={styles.pagination}>
					<Pagination
						type="page"
						currentPage={pagination}
						totalItems={subtab_count}
						pageSize={10}
						onPageChange={(val) => setPagination(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default UserActivities;
