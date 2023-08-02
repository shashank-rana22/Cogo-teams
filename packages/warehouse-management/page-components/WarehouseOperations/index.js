import Configure from './Configure';
import Inventory from './Inventory';
import Schedules from './Schedules';

// import Loader from '../../commons/Loader';

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
	setSearchValue = () => {},
	addNewZone = false,
	setAddNewZone = () => {},
	date = new Date(),
	selectedWarehouse = 'delhi',
}) {
	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;

	return (
		<div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					activeTab={activeTab}
					truckStatus={truckStatus}
					selectedTimeInterval={selectedTimeInterval}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					addNewZone={addNewZone}
					setAddNewZone={setAddNewZone}
					date={date}
					selectedWarehouse={selectedWarehouse}
				/>
			)}
		</div>
	);
}

export default WarehouseOperations;
