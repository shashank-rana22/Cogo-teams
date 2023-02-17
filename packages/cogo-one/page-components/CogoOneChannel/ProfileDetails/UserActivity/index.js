/* eslint-disable react/jsx-no-useless-fragment */
import { Tabs, TabPanel, Input, Popover } from '@cogoport/components';
import { IcMFdollar, IcMDoubleFilter, IcMSearchlight, IcMCampaignTool, IcMDesktop } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { USER_ACTIVITY_MAPPING } from '../../../../constants';
import useGetOmnichannelActivityLogs from '../../../../hooks/useGetOmnichannelActivityLogs';

import CommunicationActivity from './CommunicationActivity';
import Filters from './Filters';
import LoadingState from './LoadingState';
import PlatformActivity from './PlatformActivity';
import styles from './styles.module.css';
import TransactionalActivity from './TransactionalActivity';

function UserActivities({ activeTab, activeVoiceCard, activeMessageCard }) {
	const [activityTab, setActivityTab] = useState('transactional');
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState([]);

	const {
		loading,
		data = {},
		fetchListLogsApi = () => {},
		handleScroll = () => {},
	} = useGetOmnichannelActivityLogs({ activeMessageCard, activityTab, searchValue, activeVoiceCard, activeTab });

	const { communication = {}, platform = {}, transactional = {} } = data || {};
	const handleFilters = () => {
		fetchListLogsApi(filters);
	};

	const ACTIVITY_COMPONENT_CALLING = {
		platform      : <PlatformActivity platform={platform} />,
		communication : <CommunicationActivity communication={communication} />,
		transactional : <TransactionalActivity transactional={transactional} />,
	};

	useEffect(() => {
		setFilters([]);
	}, [activityTab]);

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
				<div className={styles.source_types}>

					<Input
						size="sm"
						prefix={<IcMSearchlight width={18} height={18} />}
						placeholder="Search here..."
						value={searchValue}
						onChange={(val) => setSearchValue(val)}
						style={{ width: 200 }}
					/>

				</div>

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
						{/* <div className={styles.filter_dot} /> */}
						<IcMDoubleFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>

				</div>
			</div>

			<div
				className={styles.list_container}
				onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
			>
				{ACTIVITY_COMPONENT_CALLING[activityTab]}
			</div>
			{!loading && <LoadingState activityTab={activityTab} />}

		</div>
	);
}
export default UserActivities;
