import { Tabs, TabPanel, cl, Toggle } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';
import ClickableDiv from '../../commons/ClickableDiv';

import { BucketsMapping } from '../../config/BucketMapping';
import useListAuthorityDeskDocuments from '../../hooks/useListAuthorityDeskDocuments';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

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

	const router = useRouter();

	const [tabsState, setTabsState] = useState({
		activeTab         : 'bl',
		service           : 'fcl_freight',
		bucket            : 'eligible',
		subApprovedBucket : '',
	});

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
	}, [router.asPath]);

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
						<ClickableDiv
							onClick={() => setTabsState({ ...tabsState, service: item })}
							className={cl`${tabsState.service === item ? styles.active : ''} ${styles.service_tab}`}
						>
							{startCase(item)}
						</ClickableDiv>
					))}
				</div>

				<div className={styles.version}>
					<Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
				</div>

				{role === 'kam' ? <ScopeSelect size="md" /> : null}
			</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{buckets.map((item) => (
						<ClickableDiv
							className={cl`${tabsState.bucket === item?.name ? styles.active : ''} ${styles.bucket} `}
							onClick={() => setTabsState({
								...tabsState,
								bucket            : item?.name,
								subApprovedBucket : item?.name === 'approved' ? 'approved' : '',
							})}
						>
							{item.title}
							{' '}
							<span className={`cl${tabsState.bucket === item ? styles.active : ''} ${styles.count}`}>
								{item.count || 0}
							</span>
						</ClickableDiv>
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
