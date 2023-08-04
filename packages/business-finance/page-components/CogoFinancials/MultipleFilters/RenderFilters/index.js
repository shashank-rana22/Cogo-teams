import { Button, Pill, Radio, RadioGroup, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const SERVICE_CATEGORY = ['Import', 'Export', 'Local', 'Domestic'];

const SHIPMENT_TYPES = GLOBAL_CONSTANTS.shipment_types;

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

function RenderFilters({
	filter = {}, setFilter = () => {}, entity = '',
}) {
	const [activeFilter, setActiveFilter] = useState('channel');

	const DEFAULT_CURRENCY = GLOBAL_CONSTANTS.cogoport_entities[entity].currency;

	const handleReset = () => {
		setFilter({});
		setActiveFilter('channel');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>Filters</div>
				<div style={{ display: 'flex' }}>
					<Button
						themeType="secondary"
						onClick={handleReset}
						disabled={isEmpty(filter)}
					>
						Reset

					</Button>

				</div>
			</div>

			<div className={styles.main_content}>
				<div style={{ width: '100%' }}>
					<Tabs
						activeTab={activeFilter}
						fullWidth
						themeType="primary"
						onChange={setActiveFilter}
						className={styles.tabs_container_element}
					>

						<TabPanel name="channel" title="Channel">
							<RadioGroup
								options={CHANNEL_OPTIONS}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filter[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>

						<TabPanel name="service" title="Service">
							<div className={styles.btn_group_section}>
								{SERVICE_CATEGORY.map((item) => (
									<div
										key={item}
										role="presentation"
										onClick={() => setFilter((prev) => ({
											...prev,
											serviceCategory: item,
										}))}
									>
										<Pill
											size="sm"
											color={filter.serviceCategory === item ? '#cfeaed'
												: 'white'}
										>
											{item}

										</Pill>
									</div>
								))}

							</div>
							<RadioGroup
								options={SHIPMENT_TYPES}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filter[activeFilter]}
								className={styles.radio_group_section}
								style={{ margin: 0 }}
							/>
						</TabPanel>
						<TabPanel name="segment" title="Segment">
							<RadioGroup
								options={SEGMENT_OPTIONS}
								onChange={(val) => setFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filter[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>

						<TabPanel name="currency" title="Currency">
							<Radio
								name="currency"
								label={DEFAULT_CURRENCY}
								disabled
								checked
								style={{ marginTop: '12px' }}
							/>
						</TabPanel>
					</Tabs>
				</div>

			</div>
		</div>
	);
}

export default RenderFilters;
