import { Tabs, TabPanel, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import BUCKET_MAPPING from '../../config/BUCKET_MAPPING.json';
import useListAuthorityDeskDocuments from '../../hooks/useListAuthorityDeskDocuments';

import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

const services = ['fcl_freight', 'lcl_freight', 'fcl_local'];

function Ocean() {
	const { buckets } = BUCKET_MAPPING;

	const [allFilters, setAllFilters] = useState({
		activeTab : 'bl',
		service   : 'fcl_freight',
		bucket    : 'eligible',
		filters   : { is_job_closed: 'no', page: 1 },

	});
	console.log({allFilters},"out")

	const { data, loading } = useListAuthorityDeskDocuments({ ...allFilters });

	const { count_stats } = data;

	return (
		<div className={styles.container}>
			<div className={styles.heading}> Authority Desk</div>

			<Tabs
				activeTab={allFilters.activeTab}
				themeType="primary"
				onChange={(val) => setAllFilters({ ...allFilters, activeTab: val })}
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

			<div className={styles.service_tabs}>
				{ services.map((item) => (
					<div
						role="button"
						tabIndex={0}
						onClick={() => setAllFilters({ ...allFilters, service: item })}
						className={cl`${allFilters.service === item ? styles.active : ''} ${styles.service_tab} `}
					>
						{startCase(item)}
					</div>
				))}
			</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{ buckets.map((item) => (
						<div
							role="button"
							tabIndex={0}
							className={cl`${allFilters.bucket === item?.name ? styles.active : ''} ${styles.bucket} `}
							onClick={() => setAllFilters({ ...allFilters, bucket: item?.name })}
						>
							{item.title}
							{' '}
							<span className={`cl${allFilters.bucket === item ? styles.active : ''} ${styles.count}`}>
								{count_stats[item.count] || 0}
							</span>
						</div>
					))}
				</div>

				<Filters allFilters={allFilters} setAllFilters={setAllFilters} />
			</div>

			<List data={data} loading={loading} allFilters={allFilters} setAllFilters={setAllFilters} />

		</div>

	);
}

export default Ocean;
