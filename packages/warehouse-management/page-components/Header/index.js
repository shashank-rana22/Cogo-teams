/* eslint-disable no-unused-vars */
import { Tabs, TabPanel, Input, ButtonIcon, Button, Datepicker, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppSearch, IcMCross, IcMCalendar, IcMProfile } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import TRUCK_STATUS_MAPPINGS from '../../constants/truck-status-mappings';
import WAREHOUSE_TABS_MAPPINGS from '../../constants/warehouse-tabs-mappings';

import styles from './styles.module.css';

function Header({
	activeTab = 'schedules',
	setActiveTab = () => {},
	truckStatus = 'truck_in',
	setTruckStatus = () => {},
	debounceQuery = () => {},
	searchValue = '',
	setSearchValue = () => {},
	date = new Date(),
	setDate = () => {},
	addNewZone = false,
	setAddNewZone = () => {},
	selectedTimeInterval = 'daily',
	setSelectedTimeInterval = () => {},
	selectedWarehouseLocation = 'delhi',
	setSelectedWarehouseLocation = () => {},
}) {
	const [dateFilterPopover, setDateFilterPopover] = useState(false);
	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	const COMPONENT_MAPPING = {
		schedules: (
			<Tabs
				tabIcon={<IcMProfile />}
				themeType="tertiary"
				activeTab={truckStatus}
				onChange={setTruckStatus}
			>
				{TRUCK_STATUS_MAPPINGS.map((item) => {
					const { key = '', label = '' } = item;
					return (
						<TabPanel
							key={key}
							name={key}
							title={label}
						/>
					);
				})}
			</Tabs>
		),
		inventory: (
			<Select
				className={styles.select_input}
				onChange={(val) => setSelectedTimeInterval({ val })}
				placeholder="Daily report"
				value={selectedTimeInterval}
				isClearable
				size="sm"
			/>
		),
		configure: (
			<Select
				className={styles.select_input}
				value={selectedWarehouseLocation}
				onChange={(val) => setSelectedWarehouseLocation({ val })}
				placeholder="Choose warehouse"
				isClearable
				size="sm"
			/>
		),
	};

	return (
		<div>
			<div className={styles.header_part}>
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{WAREHOUSE_TABS_MAPPINGS.map((item) => {
						const { name = '', title = '' } = item;
						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							/>
						);
					})}
				</Tabs>
				<div className={styles.header_search_filter}>
					<Input
						size="sm"
						prefix={<IcMAppSearch />}
						placeholder="Search via SID/Transfer ID/Truck No"
						className={styles.search_text}
						onChange={(val) => setSearchValue(val)}
						value={searchValue}
						suffix={(
							<ButtonIcon
								onClick={() => setSearchValue('')}
								size="sm"
								icon={<IcMCross />}
								disabled={isEmpty(searchValue)}
							/>
						)}
					/>
				</div>
			</div>
			<div className={styles.header_footer_part}>
				{COMPONENT_MAPPING[activeTab]}
				{activeTab === 'configure'
					? (
						<Button
							onClick={() => setAddNewZone(true)}
						>
							<div className={styles.add_icon}>+</div>
							Add New Zone
						</Button>
					)
					: undefined}
				{activeTab === 'schedules'
					? (
						<div className={styles.date_picker}>
							<Datepicker
								placeholder="Select Date"
								showTimeSelect
								dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
								name="date"
								value={date}
								onChange={setDate}
								isPreviousDaysAllowed
							/>
							<IcMCalendar className={styles.calendar_icon} />
						</div>
					) : undefined}
			</div>

		</div>
	);
}

export default Header;
