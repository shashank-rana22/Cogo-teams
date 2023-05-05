import { Tabs, TabPanel, cl } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { BucketsMapping } from '../../config/BucketMapping';
import useListAuthorityDeskDocuments from '../../hooks/useListAuthorityDeskDocuments';

import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

const services = ['fcl_freight', 'lcl_freight', 'fcl_local'];
const roleName = {
	kam            : 'KAM',
	so2            : 'SO2',
	credit_control : '',
};

function Ocean() {
	const { role } = useStakeholderCheck();
	
	const [tabsState, setTabsState] = useState({
		activeTab : 'bl',
		service   : 'fcl_freight',
		bucket    : 'eligible',  
		subApprovedBucket : ''

	});
	
	const [filters, setFilters] = useState({
		is_job_closed : 'no',
		page          : 1,
	});
	
	const { data, loading } = useListAuthorityDeskDocuments({ ...tabsState, filters });
	const { count_stats } = data;
	
	const { buckets, additionalTabs } = BucketsMapping({ role, count_stats });
	

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{`${roleName[role]} Authority Desk`}</div>

			<Tabs
				activeTab={tabsState.activeTab}
				themeType="primary"
				onChange={(val) => setTabsState({ ...tabsState, activeTab: val })}
				className={styles.tab_panel}
				fullWidth
			>
				<TabPanel
					name="bl"
					title="Bill of Ladings"
				/>

				<TabPanel
					name="do"
					title="Delivery Orders"
				/>
			</Tabs>

			<div className={styles.second_stepper}>
				<div className={styles.service_tabs}>
					{services.map((item) => (
						<div
							role="button"
							tabIndex={0}
							onClick={() => setTabsState({ ...tabsState, service: item })}
							className={cl`${tabsState.service === item ? styles.active : ''} ${styles.service_tab}`}
						>
							{startCase(item)}
						</div>
					))}
				</div>

				{ role === 'kam' ? <ScopeSelect size="md" /> : null}
			</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{buckets.map((item) => (
						<div
							role="button"
							tabIndex={0}
							className={cl`${tabsState.bucket === item?.name ? styles.active : ''} ${styles.bucket} `}
							onClick={() => setTabsState({ ...tabsState,
								 bucket: item?.name,
								  subApprovedBucket : item?.name === 'approved' ? 'approved' : '',
								})}
						>
							{item.title}
							{' '}
							<span className={`cl${tabsState.bucket === item ? styles.active : ''} ${styles.count}`}>
								{item.count || 0}
							</span>
						</div>
					))}
				</div>

				<Filters filters={filters} setFilters={setFilters} />
			</div>

			<List
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
				tabsState={tabsState}
				setTabsState={setTabsState}
				additionalTabs={additionalTabs}
				role={role}
			/>

		</div>
	);
}

export default Ocean;
