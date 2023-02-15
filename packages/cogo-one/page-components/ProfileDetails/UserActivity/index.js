import { Tabs, TabPanel, Input, Popover } from '@cogoport/components';
import { IcMFdollar, IcMDoubleFilter, IcMSearchlight, IcMCampaignTool } from '@cogoport/icons-react';
import { useState } from 'react';

import ActivityCard from '../../../common/ActivityCard';

import Filters from './Filters';
import styles from './styles.module.css';

function UserActivities() {
	const [activeTab, setActiveTab] = useState('transactional');
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	return (
		<div className={styles.container}>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel
						name="transactional"
						title={<IcMFdollar width={20} height={20} />}
					/>
					<TabPanel name="platform" title={<IcMFdollar width={20} height={20} />} />
					<TabPanel name="communication" title={<IcMCampaignTool width={20} height={20} />} />
				</Tabs>
			</div>
			<div className={styles.title}>Transactional Activity</div>
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
						caret={false}
						render={(
							<Filters />
						)}
						visible={filterVisible}
					>
						{/* <div className={styles.filter_dot} /> */}
						<IcMDoubleFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>

				</div>
			</div>
			<ActivityCard />
		</div>
	);
}
export default UserActivities;
