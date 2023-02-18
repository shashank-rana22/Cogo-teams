import { Tabs, TabPanel, Popover } from '@cogoport/components';
import { IcMFdollar, IcMDoubleFilter, IcMCampaignTool, IcMDesktop } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import USER_ACTIVITY_COMPONENT_MAPPING from '../../../../constants/USER_ACTIVITY_MAPPING';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';

import Filters from './Filters';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function UserActivities({ activeTab, activeVoiceCard, activeMessageCard }) {
	const [activityTab, setActivityTab] = useState('transactional');
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState([]);

	const ActiveComp = USER_ACTIVITY_COMPONENT_MAPPING[activityTab] || null;

	const userData = getActiveCardDetails(activeMessageCard);
	const { user_id: userVoiceId = '' } = activeVoiceCard || {};
	const { user_id: userMessageId = '' } = userData || {};
	const user_id = activeTab === 'message' ? userMessageId : userVoiceId;

	const {
		loading,
		data = {},
		fetchActivityLogs = () => {},
	} = useGetOmnichannelActivityLogs({ activeMessageCard, activityTab, activeVoiceCard, activeTab });
	console.log('data', data);

	const { communication = {}, platform = {}, transactional = {} } = data || {};

	const handleFilters = () => {
		fetchActivityLogs(filters);
	};

	useEffect(() => {
		setFilters([]);
	}, [activityTab]);

	if (isEmpty(user_id)) {
		return (
			<div className={styles.empty_state}>
				No Data Found...
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
			<div className={styles.title}>
				{USER_ACTIVITY_MAPPING[activityTab]}
			</div>
			<div className={styles.filters_container}>
				<div className={styles.source_types} />
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
								/>
							)}
							visible={filterVisible}
							onClickOutside={() => setFilterVisible(false)}
						>

							<IcMDoubleFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
						</Popover>
						{!isEmpty(filters) && <div className={styles.filters_applied} />}
					</div>
				)}

			</div>

			{/* {loading ? (
				<LoadingState activityTab={activityTab} />
			) : (
				<div
					className={styles.list_container}
					// onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
				>

					{ActiveComp && (
						<ActiveComp communication={communication} platform={platform} transactional={transactional} />
					)}
				</div>
			)} */}

		</div>

	);
}
export default UserActivities;
