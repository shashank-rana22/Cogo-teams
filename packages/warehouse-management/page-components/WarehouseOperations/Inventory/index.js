import List from '../../../commons/List';
import inventoryFields from '../../../configurations/inventory-fields';
import useListInventory from '../../../hooks/useListInventory';

import CargoList from './CargoList';
import styles from './styles.module.css';

function Inventory({
	activeTab = '',
	searchValue = '',
	warehouseLocationId = '',
}) {
	const { fields } = inventoryFields;
	const {
		data = {},
		loading = false,
		page = 1,
		setPage = () => {},
		listAPI = () => {},
	} = useListInventory({ searchValue, warehouseLocationId });
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	const functions = {
		handleWarehouseLocation: (singleItem) => {
			let locations = [];
			singleItem?.details?.forEach((item) => {
				locations.push(item?.warehouseLocation?.zoneNumber);
			});
			locations = [...new Set(locations)];
			locations = locations.join(', ');
			return (
				<div>
					{locations}
				</div>
			);
		},
		handleServices: (singleItem) => {
			let uniqueServices = [];
			singleItem?.details?.forEach((item) => {
				item?.services?.forEach((service) => {
					uniqueServices.push(service?.serviceName);
				});
			});
			uniqueServices = [...new Set(uniqueServices)];
			uniqueServices = uniqueServices.join(', ');
			return (
				<div>
					{uniqueServices}
				</div>
			);
		},
		handleStatus: (singleItem) => {
			let isReceived = true;
			singleItem?.details?.forEach((item) => {
				item?.services?.forEach((service) => {
					if (service?.serviceStatus === 'not_received') {
						isReceived = false;
					}
				});
			});
			return (
				<div>
					{isReceived
						? 'Received'
						: 'Not received'}
				</div>
			);
		},
	};

	return (
		<div className={styles.body_container}>
			<div className={styles.details_list}>
				<List
					fields={fields}
					activeTab={activeTab}
					data={data}
					loading={loading}
					functions={functions}
					page={page}
					setPage={setPage}
					listAPI={listAPI}
					Child={CargoList}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default Inventory;
