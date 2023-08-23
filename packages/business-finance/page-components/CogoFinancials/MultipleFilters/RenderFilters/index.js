import { Button, Pill, Radio, RadioGroup, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const SERVICE_CATEGORY = ['Import', 'Export', 'Local', 'Domestic'];

const SHIPMENT_TYPES_OPTIONS = GLOBAL_CONSTANTS.shipment_types.map((item) => ({
	label : item?.label,
	value : (item.value).toUpperCase(),
}));

const SEGMENT_OPTIONS = [
	{ label: 'Air', value: 'AIR' },
	{ label: 'Ocean', value: 'OCEAN' },
	{ label: 'Surface', value: 'SURFACE' },
	{ label: 'Rail', value: 'RAIL' },
];

const CHANNEL_OPTIONS = [
	{ label: 'SME', value: 'mid_size' },
	{ label: 'Enterprise', value: 'enterprise' },
	{ label: 'Channel Partners', value: 'channel_partner' },
	{ label: 'Longtail', value: 'long_tail' },
	{ label: 'Others', value: 'other' },
];

function RenderFilters({
	setFilter = () => {}, entity = '', setVisible = () => {},
}) {
	const [internalFilter, setInternalFilter] = useState({});
	const [activeFilter, setActiveFilter] = useState('channel');

	const DEFAULT_CURRENCY = GLOBAL_CONSTANTS.cogoport_entities[entity].currency;

	const handleReset = () => {
		setFilter({});
		setInternalFilter({});
		setActiveFilter('channel');
		setVisible(false);
	};

	const handleApply = () => {
		setFilter((prev) => ({
			...prev,
			...internalFilter,
		}));
		setVisible(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>Filters</div>
				<div style={{ display: 'flex' }}>
					<Button
						themeType="secondary"
						onClick={handleReset}
						disabled={isEmpty(internalFilter)}
						style={{ marginRight: '8px' }}
					>
						Reset
					</Button>

					<Button
						onClick={handleApply}
						disabled={isEmpty(internalFilter)}
					>
						Apply

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
								onChange={(val) => setInternalFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={internalFilter[activeFilter]}
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
										onClick={() => setInternalFilter((prev) => ({
											...prev,
											serviceCategory: item,
										}))}
									>
										<Pill
											size="sm"
											color={internalFilter.serviceCategory === item ? '#cfeaed'
												: '#fff'}
											style={{ cursor: 'pointer' }}
										>
											{item}

										</Pill>
									</div>
								))}

							</div>
							<RadioGroup
								options={SHIPMENT_TYPES_OPTIONS}
								onChange={(val) => setInternalFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={internalFilter[activeFilter]}
								className={styles.radio_group_section}
								style={{ margin: 0 }}
							/>
						</TabPanel>
						<TabPanel name="segment" title="Segment">
							<RadioGroup
								options={SEGMENT_OPTIONS}
								onChange={(val) => setInternalFilter((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={internalFilter[activeFilter]}
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
