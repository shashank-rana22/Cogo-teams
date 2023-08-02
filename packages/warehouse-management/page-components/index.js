import { useDebounceQuery } from '@cogoport/forms';
import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import WarehouseOperations from './WarehouseOperations';

// const truckStatusMapping = [
// 	{
// 		key   : 'truck_in',
// 		label : 'Truck in',
// 		count : 'truckInCount',
// 	},
// 	{
// 		key   : 'truck_out',
// 		label : 'Truck out',
// 		count : 'truckOutCount',
// 	},
// ];

// const TRUCK_STATUS_STATS_MAPPING = {
// 	truckInCount  : 'truck_in',
// 	truckOutCount : 'truck_out',
// };

function WarehouseManagement() {
	const [activeTab, setActiveTab] = useState('schedules');
	const [truckStatus, setTruckStatus] = useState('truck_in');
	const [selectedTimeInterval, setSelectedTimeInterval] = useState('daily_report');
	const [selectedWarehouseLocation, setSelectedWarehouseLocation] = useState('delhi');
	const [addNewZone, setAddNewZone] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [date, setDate] = useState(new Date());

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	return (
		<div className={styles.container}>
			<h1>
				Warehouse management Dashboard
			</h1>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				truckStatus={truckStatus}
				setTruckStatus={setTruckStatus}
				debounceQuery={debounceQuery}
				addNewZone={addNewZone}
				setAddNewZone={setAddNewZone}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				date={date}
				setDate={setDate}
				selectedTimeInterval={selectedTimeInterval}
				setSelectedTimeInterval={setSelectedTimeInterval}
				selectedWarehouseLocation={selectedWarehouseLocation}
				setSelectedWarehouseLocation={setSelectedWarehouseLocation}
			/>
			<WarehouseOperations
				activeTab={activeTab}
				truckStatus={truckStatus}
				selectedTimeInterval={selectedTimeInterval}
				addNewZone={addNewZone}
				setAddNewZone={setAddNewZone}
				date={date}
				selectedWarehouse={selectedWarehouseLocation}
				searchQuery={searchQuery}
			/>
		</div>

	);
}

export default WarehouseManagement;
