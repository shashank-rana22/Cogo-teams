import { Tabs, TabPanel, Input, ButtonIcon, Button, Datepicker, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppSearch, IcMCross, IcMCalendar, IcMProfile } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import TRUCK_STATUS_MAPPINGS from '../../constants/truck-status-mappings';
import WAREHOUSE_TABS_MAPPINGS from '../../constants/warehouse-tabs-mappings';

import styles from './styles.module.css';

const SEARCH_BAR_PLACEHOLDER_MAPPING = {
	schedules : 'Search via Transfer ID/Truck number',
	inventory : 'Search via SID',
	configure : 'Search via Zone name/Commodity Type',
};

function Header({
	activeTab = 'schedules',
	setActiveTab = () => {},
	truckStatus = 'truck_in',
	setTruckStatus = () => {},
	searchValue = '',
	setSearchValue = () => {},
	date = new Date(),
	setDate = () => {},
	setAddNewZone = () => {},
	selectedWarehouseLocation = 'delhi',
	setSelectedWarehouseLocation = () => {},
}) {
	const COMPONENT_MAPPING = {
		schedules: (
			<>
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
				<div className={styles.date_picker}>
					<Datepicker
						placeholder="Select Date"
						showTimeSelect
						dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
						name="date"
						value={date}
						onChange={setDate}
						isPreviousDaysAllowed
						prefix={(
							<IcMCalendar className={styles.calendar_icon} />
						)}
					/>

				</div>
				<Input
					size="sm"
					prefix={<IcMAppSearch />}
					placeholder={SEARCH_BAR_PLACEHOLDER_MAPPING[activeTab]}
					className={styles.search_text}
					onChange={(val) => {
						setSearchValue(val);
					}}
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
			</>
		),
		inventory: (
			<Input
				size="sm"
				prefix={<IcMAppSearch />}
				placeholder={SEARCH_BAR_PLACEHOLDER_MAPPING[activeTab]}
				className={styles.search_text}
				onChange={(val) => {
					setSearchValue(val);
				}}
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
		),
		configure: (
			<>
				<Button
					onClick={() => setAddNewZone(true)}
				>
					<div className={styles.add_icon}>+</div>
					Add New Zone
				</Button>
				<Input
					size="sm"
					prefix={<IcMAppSearch />}
					placeholder={SEARCH_BAR_PLACEHOLDER_MAPPING[activeTab]}
					className={styles.search_text}
					onChange={(val) => {
						setSearchValue(val);
					}}
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
			</>
		),
	};

	return (
		<>
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
					<Select
						className={styles.select_input}
						value={selectedWarehouseLocation}
						onChange={(val) => setSelectedWarehouseLocation({ val })}
						placeholder="Choose warehouse"
						size="sm"
					/>
				</div>
			</div>
			<div className={styles.header_footer_part}>
				{COMPONENT_MAPPING[activeTab]}
			</div>

		</>
	);
}

export default Header;
