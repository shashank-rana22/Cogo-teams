import {
	Button, RadioGroup, Pill, TabPanel, Tabs,
} from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import {
	JOB_TYPE_OPTIONS, SHIPMENTS_TYPES,
	SERVICE_CATEGORY, MILESTONE_TYPES, SHIPMENT_TYPES,
	getEntityOptions,
} from '../../../../constants/accruals-more-filters';

import ProfitabilityContent from './ProfitabilityContent';
import styles from './styles.module.css';

function MoreFilter({
	setFilters = () => {}, filters = {},
	setProfitNumber = () => {}, profitNumber = '',
}) {
	const entityOptions = getEntityOptions();
	const [activeFilter, setActiveFilter] = useState('jobState');

	const handleReset = () => {
		setFilters({});
		setActiveFilter('jobState');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>Filters</div>
				<div style={{ display: 'flex' }}>
					<Button
						themeType="secondary"
						onClick={handleReset}
						disabled={isEmpty(filters)}
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

						<TabPanel name="jobState" title="Job Type">
							<RadioGroup
								options={JOB_TYPE_OPTIONS}
								onChange={(val) => setFilters((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filters[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>
						<TabPanel name="entity" title="Entity">
							<RadioGroup
								options={entityOptions}
								onChange={(val) => setFilters((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filters[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>

						<TabPanel name="service" title="Service">
							<div className={styles.btn_group_section}>
								{SERVICE_CATEGORY?.map((item) => (
									<div
										key={item?.label}
										role="presentation"
										onClick={() => setFilters((prev) => ({
											...prev,
											tradeType: item?.value,
										}))}
									>
										<Pill
											size="sm"
											color={filters.tradeType === item?.value ? '#cfeaed'
												: '#fff'}
										>
											{item?.label}

										</Pill>
									</div>
								))}

							</div>
							<RadioGroup
								options={SHIPMENT_TYPES}
								onChange={(val) => setFilters((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filters[activeFilter]}
								className={styles.radio_group_section}
								style={{ margin: 0 }}
							/>
						</TabPanel>
						<TabPanel name="shipmentType" title="Shipment Type">
							<RadioGroup
								options={SHIPMENTS_TYPES}
								onChange={(val) => setFilters((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filters[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>
						<TabPanel name="milestone" title="Milestone">
							<RadioGroup
								options={MILESTONE_TYPES}
								onChange={(val) => setFilters((prev) => ({
									...prev,
									[activeFilter]: val,
								}))}
								value={filters[activeFilter]}
								className={styles.radio_group_section}
								style={{ flexDirection: 'column' }}
							/>
						</TabPanel>
						<TabPanel name="profitability" title="Profitability">
							<div>
								<ProfitabilityContent
									setFilters={setFilters}
									filters={filters}
									setProfitNumber={setProfitNumber}
									profitNumber={profitNumber}
								/>
							</div>
						</TabPanel>

					</Tabs>
				</div>

			</div>
		</div>
	);
}
export default MoreFilter;
