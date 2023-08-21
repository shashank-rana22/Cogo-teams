import { useState, useEffect } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import WarehouseOperations from './WarehouseOperations';

function WarehouseManagement() {
	const [activeTab, setActiveTab] = useState('schedules');

	const [truckStatus, setTruckStatus] = useState('truck_in');
	const [date, setDate] = useState(new Date());

	const [selectedWarehouseLocation, setSelectedWarehouseLocation] = useState('delhi');
	const [addNewZone, setAddNewZone] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		setSearchValue('');
	}, [activeTab, setSearchValue]);

	return (
		<div className={styles.container}>
			<h1>
				Warehouse Management Dashboard
			</h1>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				truckStatus={truckStatus}
				setTruckStatus={setTruckStatus}
				addNewZone={addNewZone}
				setAddNewZone={setAddNewZone}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				date={date}
				setDate={setDate}
				selectedWarehouseLocation={selectedWarehouseLocation}
				setSelectedWarehouseLocation={setSelectedWarehouseLocation}
			/>
			<WarehouseOperations
				activeTab={activeTab}
				truckStatus={truckStatus}
				searchValue={searchValue}
				addNewZone={addNewZone}
				setAddNewZone={setAddNewZone}
				date={date}
				selectedWarehouse={selectedWarehouseLocation}
			/>
		</div>

	);
}

export default WarehouseManagement;
