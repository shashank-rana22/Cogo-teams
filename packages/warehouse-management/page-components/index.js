import { useDebounceQuery } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import WarehouseOperations from './WarehouseOperations';

function WarehouseManagement() {
	const [activeTab, setActiveTab] = useState('schedules');

	const [truckStatus, setTruckStatus] = useState('truck_in');
	const [date, setDate] = useState(new Date());

	const [selectedTimeInterval, setSelectedTimeInterval] = useState('daily_report');

	const [selectedWarehouseLocation, setSelectedWarehouseLocation] = useState('delhi');
	const [addNewZone, setAddNewZone] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	useEffect(() => {
		setSearchValue('');
	}, [activeTab, setSearchValue]);

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
				searchValue={searchValue}
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
