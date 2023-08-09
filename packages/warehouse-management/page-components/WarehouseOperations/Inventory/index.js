import List from '../../../commons/List';
import inventoryFields from '../../../configurations/inventory-fields';
import useListInventory from '../../../hooks/useListInventory';

import CargoList from './CargoList';
import styles from './styles.module.css';

function Inventory({
	activeTab = '',
	searchValue = '',
}) {
	const { fields } = inventoryFields;
	const {
		data,
		loading,
		page,
		setPage,
		listAPI,
	} = useListInventory({ searchValue });
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
			return (
				<div>
					-
				</div>
			);
		},
		handleServices: (singleItem) => {
			let services = [];
			singleItem?.details?.forEach((item) => {
				services.push(item?.service);
			});
			services = [...new Set(services)];
			services.join(', ');
			return (
				<div>
					{services}
				</div>
			);
		},
		handleStatus: (singleItem) => {
			let flag = true;
			singleItem?.details?.forEach((item) => {
				if (item?.serviceStatus === 'not_recieved') {
					flag = false;
				}
			});
			return (
				<div>
					{flag ? 'Received' : 'Not recieved'}
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
