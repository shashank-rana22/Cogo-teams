import { Button, RadioGroup, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import styles from './styles.module.css';

const SEGMENT_OPTIONS = [
	{ label: 'Air', value: 'air' },
	{ label: 'Ocean', value: 'ocean' },
	{ label: 'Surface', value: 'surface' },
	{ label: 'Rail', value: 'rail' },
];

const CHANNEL_OPTIONS = [
	{ label: 'SME', value: 'SME' },
	{ label: 'Enterprise', value: 'enterprise' },
	{ label: 'Channel Partners', value: 'channelPartners' },
	{ label: 'Cogoverse', value: 'cogoverse' },
	{ label: 'Longtail', value: 'longtail' },
	{ label: 'FTL/LTL', value: 'ftl-ltl' },
	{ label: 'Others', value: 'others' },
];

const CURRENCY_OPTIONS = Object.values(GLOBAL_CONSTANTS.currency_code).map((item) => (
	{
		label : item,
		value : item,
	}
));

function RenderFilters() {
	const [activeFilter, setActiveFilter] = useState('currency');
	const [filter, setFilter] = useState({
		filterValue     : null,
		serviceCategory : null,
	});
	const { filterValue } = filter;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>Filters</div>
				<div style={{ display: 'flex' }}>
					<Button themeType="secondary">Reset</Button>
					<Button style={{ marginLeft: '8px' }}>Apply</Button>
				</div>
			</div>

			<div style={{ display: 'flex', width: '100%' }}>
				<div style={{ width: '90%' }}>
					<Tabs
						activeTab={activeFilter}
						fullWidth
						themeType="primary"
						onChange={setActiveFilter}
						className={styles.tabs_container_element}
					>
						<TabPanel name="currency" title="Currency">
							<RadioGroup
								options={CURRENCY_OPTIONS}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									filterValue: val,
								}))}
								value={filterValue}
								className={styles.radio_group_section}
							/>
						</TabPanel>

						<TabPanel name="channel" title="Channel">
							<RadioGroup
								options={CHANNEL_OPTIONS}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									filterValue: val,
								}))}
								value={filterValue}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>

						<TabPanel name="service" title="Service">
							Service
						</TabPanel>
						<TabPanel name="segment" title="Segment">
							<RadioGroup
								options={SEGMENT_OPTIONS}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									filterValue: val,
								}))}
								value={filterValue}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>
					</Tabs>
				</div>

			</div>
		</div>
	);
}

export default RenderFilters;
