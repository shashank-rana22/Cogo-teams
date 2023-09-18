import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import List from '../../../commons/List';
import scheduleFields from '../../../configurations/schedule-fields';
import useListSchedules from '../../../hooks/useListSchedules';

import SIDList from './SIDList';
import styles from './styles.module.css';
import TruckStatusUpdateModal from './TruckStatusUpdateModal';
import CargoAcknowledgmentModal from './TruckStatusUpdateModal/CargoAcknowledgmentModal';

function Schedules({
	activeTab = 'configure',
	truckStatus = 'truck_in',
	searchValue = '',
	warehouseLocationId = '',
}) {
	const { fields } = scheduleFields(truckStatus);
	const [showTruckStatusModal, setShowTruckStatusModal] = useState({});
	const [showCargoAcknowledgmentModal, setShowCargoAcknowledgmentModal] = useState(false);
	const [acknowlegmentData, setAcknowlegmentData] = useState([]);

	const {
		data = {},
		loading = false,
		page = 1,
		setPage = () => {},
		listAPI = () => {},
	} = useListSchedules({ activeTab, truckStatus, searchValue, warehouseLocationId });

	const handleStatusChange = ({ singleItem }) => (
		!isEmpty(showTruckStatusModal)
		&& singleItem?.warehouseTransferId === showTruckStatusModal?.warehouseTransferId && (
			<TruckStatusUpdateModal
				item={singleItem}
				showTruckStatusModal={showTruckStatusModal}
				setAcknowlegmentData={setAcknowlegmentData}
				setShowCargoAcknowledgmentModal={setShowCargoAcknowledgmentModal}
				setShowTruckStatusModal={setShowTruckStatusModal}
				truckStatus={truckStatus}
				listAPI={listAPI}
				warehouseLocationId={warehouseLocationId}
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
				{ showCargoAcknowledgmentModal
					&& (
						<CargoAcknowledgmentModal
							setShowCargoAcknowledgmentModal={setShowCargoAcknowledgmentModal}
							cargoData={acknowlegmentData}
						/>
					)}
			</div>
		</div>
	);
}

export default Schedules;
