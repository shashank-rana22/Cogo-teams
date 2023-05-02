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
	const [filters, setFilters] = useState({});

	const [activeTab, setActiveTab] = useState('export');

	const [service, setService] = useState('fcl_freight');

	const [bucket, setBucket] = useState('eligible');

	const { data, loading } = useListAuthorityDeskDocuments({ activeTab, service, bucket });

	const { count_stats } = data;

	const stateProps = { bucket, setBucket, filters, setFilters };

	return (
		<div className={styles.container}>
			<div className={styles.heading}> Authority Desk</div>

			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
				className={styles.tab_panel}
				fullWidth
			>
				<TabPanel
					name="export"
					title="BLs"
				/>

				<TabPanel
					name="import"
					title="DOs"
				/>

			</Tabs>

			<div className={styles.service_tabs}>
				{ services.map((item) => (
					<div
						role="button"
						tabIndex={0}
						onClick={() => setService(item)}
						className={cl`${service === item ? styles.active : ''} ${styles.service_tab} `}
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
							className={cl`${bucket === item ? styles.active : ''} ${styles.bucket} `}
							onClick={() => setBucket(item?.name)}
						>
							{item.title}
							{' '}
							<span className={`cl${bucket === item ? styles.active : ''} ${styles.count}`}>
								{count_stats[item.count] || 0}
							</span>
						</div>
					))}
				</div>

				<Filters stateProps={stateProps} />
			</div>

			<List data={data} loading={loading} stateProps={stateProps} />

		</div>

	);
}

export default Ocean;
