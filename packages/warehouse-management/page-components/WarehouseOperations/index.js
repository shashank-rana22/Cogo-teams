import { useState } from 'react';

import Configure from './Configure';
import Inventory from './Inventory';
import Schedules from './Schedules';

const TABS_COMPONENT_MAPPING = {
	schedules : Schedules,
	inventory : Inventory,
	configure : Configure,
};

function WarehouseOperations({
	activeTab = 'schedules',
	truckStatus = 'truck_in',
	searchValue = '',
	addNewZone = false,
	setAddNewZone = () => {},
	selectedWarehouse = '',
}) {
	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab];
	const [item, setItem] = useState({});

	return (
		<ActiveTabComponent
			activeTab={activeTab}
			truckStatus={truckStatus}
			searchValue={searchValue}
			addNewZone={addNewZone}
			setAddNewZone={setAddNewZone}
			warehouseLocationId={selectedWarehouse}
			setItem={setItem}
			item={item}
		/>
	);
}

export default WarehouseOperations;
