import Configure from './Configure';
import Inventory from './Inventory';
import Schedules from './Schedules';

// import Loader from '../../commons/Loader';

const tabsComponentMapping = {
	schedules : Schedules,
	inventory : Inventory,
	configure : Configure,
};

function WarehouseOperations({
	activeTab = 'schedule',
	truckStatus = 'truck_in',
	selectedTimeInterval = 'daily',
	addNewZone = false,
	setAddNewZone = () => {},
	date = new Date(),
	selectedWarehouse = 'delhi',
}) {
	// const {
	// 	data, filters, setFilters,
	// 	loading, setPage,
	// } = useListTruckSchedules({ activeTab, truckStatus, searchQuery });

	// activeTab === 'inventory' ? (
	// 	const {
	// 		data, loading, setPage,
	// 		searchValue, setSearchValue
	// 	} = useListWarehouseInvenotory({ })
	// ) : ()

	// const { list = [], total_count = 0, page = 0 } = data;
	const ActiveTabComponent = tabsComponentMapping[activeTab] || null;

	return (
		<div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					activeTab={activeTab}
					truckStatus={truckStatus}
					selectedTimeInterval={selectedTimeInterval}
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
