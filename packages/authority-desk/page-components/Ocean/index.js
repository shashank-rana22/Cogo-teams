import { Tabs, TabPanel, cl, Placeholder } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import React, { useState } from 'react';

import ClickableDiv from '../../commons/ClickableDiv';
import { BucketsMapping } from '../../config/BucketMapping';
import useListAuthorityDeskShipments from '../../hooks/useListAuthorityDeskShipments';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

const DEFAULT_COUNT = 0;

const SERVICES = { fcl_freight: 'FCL Freight', lcl_freight: 'LCL Freight', fcl_local: 'FCL Locals' };

function Ocean() {
	const { role } = useStakeholderCheck();

	const [tabsState, setTabsState] = useState({
		activeTab         : 'bl',
		service           : 'fcl_freight',
		bucket            : 'eligible',
		subApprovedBucket : '',
	});

	const [filters, setFilters] = useState({
		is_job_closed : 'no',
		page          : 1,
	});

	const { data, loading, refetch } = useListAuthorityDeskShipments({ ...tabsState, filters });

	const { count_stats } = data;

	const { buckets, additionalTabs } = BucketsMapping({ role, count_stats });

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={tabsState.activeTab}
				themeType="primary"
				onChange={(val) => {
					setTabsState({ ...tabsState, activeTab: val });
					setFilters({ ...filters, page: 1 });
				}}
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
					{Object.keys(SERVICES).map((item) => (
						<ClickableDiv
							key={item}
							onClick={() => {
								setTabsState({ ...tabsState, service: item });
								setFilters({ ...filters, page: 1 });
							}}
							className={cl`${tabsState.service === item ? styles.active : ''}
							${styles.service_tab}`}
						>
							{SERVICES[item]}
						</ClickableDiv>
					))}
				</div>

				<div className={styles.right_content}>
					{role === 'kam' ? <ScopeSelect size="md" /> : null}
				</div>

			</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{buckets.map((item) => (

						loading ? <Placeholder key={item} className={styles.loader} /> : 	(
							<ClickableDiv
								key={item}
								className={cl`${tabsState.bucket === item?.name ? styles.active : ''} 
								${styles.bucket} `}
								onClick={() => {
									setTabsState({
										...tabsState,
										bucket            : item?.name,
										subApprovedBucket : item?.name === 'approved' ? 'approved' : '',
									});
									setFilters({ ...filters, page: 1 });
								}}
							>
								{item.title}
								{' '}
								<span className={`cl${tabsState.bucket === item ? styles.active : ''} 
										${styles.count}`}
								>
									{item.count || DEFAULT_COUNT}
								</span>
							</ClickableDiv>
						)

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
				refetch={refetch}
			/>

		</div>
	);
}

export default Ocean;
