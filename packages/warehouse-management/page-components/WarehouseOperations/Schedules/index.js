import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import List from '../../../commons/List';
import scheduleFields from '../../../configurations/schedule-fields';
import useListSchedules from '../../../hooks/useListSchedules';

import SIDList from './SIDList';
import styles from './styles.module.css';
import TruckStatusUpdateModal from './TruckStatusUpdateModal';

function Schedules({
	activeTab = 'configure',
	truckStatus = 'truck_in',
	searchValue = '',
}) {
	const { fields } = scheduleFields(truckStatus);
	const [showTruckStatusModal, setShowTruckStatusModal] = useState({});

	const {
		data,
		loading,
		page,
		setPage,
		listAPI,
	} = useListSchedules({ activeTab, truckStatus, searchValue });

	const handleStatusChange = ({ singleItem }) => (
		!isEmpty(showTruckStatusModal)
		&& singleItem?.warehouseTransferId === showTruckStatusModal?.warehouseTransferId && (
			<TruckStatusUpdateModal
				item={singleItem}
				showTruckStatusModal={showTruckStatusModal}
				setShowTruckStatusModal={setShowTruckStatusModal}
				truckStatus={truckStatus}
				listAPI={listAPI}
			/>
		)
	);

	const functions = {
		handleTruckStatus: (singleItem) => (
			<>
				{truckStatus === 'truck_in' && (
					<Button
						style={{ fontSize: 12 }}
						onClick={() => setShowTruckStatusModal(singleItem)}
					>
						Truck-in
					</Button>
				)}
				{truckStatus === 'truck_out' && (
					<Button
						style={{ fontSize: 12 }}
						onClick={() => setShowTruckStatusModal(singleItem)}
					>
						Truck-out
					</Button>
				)}
				{handleStatusChange({ singleItem })}
			</>
		),
	};

	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	return (
		<div className={styles.body_container}>
			<div className={styles.details_list}>
				<List
					fields={fields}
					activeTab={activeTab}
					truckStatus={truckStatus}
					data={data}
					loading={loading}
					page={page}
					setPage={setPage}
					functions={functions}
					handlePageChange={handlePageChange}
					Child={SIDList}
				/>
			</div>
		</div>
	);
}

export default Schedules;
