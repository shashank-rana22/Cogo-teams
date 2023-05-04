import { Tabs, TabPanel, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import ScopeSelect from '@cogoport/scope-select';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { BucketsMapping } from '../../config/BucketMapping';
import useListAuthorityDeskDocuments from '../../hooks/useListAuthorityDeskDocuments';

import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

const services = ['fcl_freight', 'lcl_freight', 'fcl_local'];
const roleName = {
	kam            : 'KAM',
	so2            : 'SO2',
	credit_control : '',
};

function Ocean() {
	const { role } = useStakeholderCheck();
	const { buckets, additionalTabs } = BUCKET_MAPPING;

	const [tabsState, setTabsState] = useState({
		activeTab : 'bl',
		service   : 'fcl_freight',
		bucket    : 'eligible',
	});

	const [filters, setFilters] = useState({
		is_job_closed : 'no',
		page          : 1,
	});

	const { data, loading } = useListAuthorityDeskDocuments({ ...tabsState, filters });

	const { count_stats } = data;

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
							onClick={() => setTabsState({ ...tabsState, bucket: item?.name })}
						>
							{item.title}
							{' '}
							<span className={`cl${tabsState.bucket === item ? styles.active : ''} ${styles.count}`}>
								{count_stats[item.count] || 0}
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
				additionalTabs={additionalTabs}
				role={role}
			/>

		</div>
	);
}

export default Ocean;
