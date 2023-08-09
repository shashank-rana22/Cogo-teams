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
	activeTab = 'schedule',
	truckStatus = 'truck_in',
	selectedTimeInterval = 'daily',
	searchValue = '',
	addNewZone = false,
	setAddNewZone = () => {},
	date = new Date(),
	selectedWarehouse = 'delhi',
}) {
	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;
	const [item, setItem] = useState({});

	return (
		<div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					activeTab={activeTab}
					truckStatus={truckStatus}
					selectedTimeInterval={selectedTimeInterval}
					searchValue={searchValue}
					addNewZone={addNewZone}
					setAddNewZone={setAddNewZone}
					date={date}
					selectedWarehouse={selectedWarehouse}
					setItem={setItem}
					item={item}
				/>
			)}
		</div>
	);
}

export default WarehouseOperations;
