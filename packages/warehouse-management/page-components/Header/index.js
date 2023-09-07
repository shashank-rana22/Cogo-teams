import {
	Tabs, TabPanel, Input, ButtonIcon, Button,
} from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMAppSearch, IcMCross, IcMAppTruck } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import TRUCK_STATUS_MAPPINGS from '../../constants/truck-status-mappings';
import WAREHOUSE_TABS_MAPPINGS from '../../constants/warehouse-tabs-mappings';

import styles from './styles.module.css';

const SEARCH_BAR_PLACEHOLDER_MAPPING = {
	schedules : 'Search via Transfer ID/Truck number',
	inventory : 'Search via SID',
	configure : 'Search via Zone name/Commodity Type',
};

const getComponentMapping = ({
	activeTab = '',
	truckStatus = '',
	setTruckStatus = () => {},
	searchValue = '',
	setSearchValue = () => {},
	setAddNewZone = () => {},
}) => {
	const COMPONENT_MAPPING = {
		schedules: (
			<>
				<Tabs
					tabIcon={<IcMAppTruck />}
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
				onChange={setSearchValue}
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
					onChange={setSearchValue}
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
	return COMPONENT_MAPPING[activeTab];
};

function Header({
	activeTab = 'schedules',
	setActiveTab = () => {},
	truckStatus = 'truck_in',
	setTruckStatus = () => {},
	searchValue = '',
	setSearchValue = () => {},
	setAddNewZone = () => {},
	setSelectedWarehouseLocation = () => {},
}) {
	const { watch, control } = useForm();
	const warehouseLocationId = watch('warehouseLocationId');

	setSelectedWarehouseLocation(warehouseLocationId);

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
					<AsyncSelectController
						control={control}
						initialCall
						className={styles.select_input}
						asyncKey="list_locations"
						name="warehouseLocationId"
						placeholder="Choose warehouse"
						params={{
							filters: {
								type   : ['warehouse'],
								status : 'active',
							},
						}}
					/>
				</div>
			</div>
			<div className={styles.header_footer_part}>
				{getComponentMapping({
					activeTab,
					truckStatus,
					setTruckStatus,
					searchValue,
					setSearchValue,
					setAddNewZone,
				})}
			</div>

		</>
	);
}

export default Header;
