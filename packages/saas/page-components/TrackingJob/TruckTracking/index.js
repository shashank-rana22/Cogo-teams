import { Input, Modal, Table, Pagination, TabPanel, Tabs } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { columns } from '../configurations/truck-tracking-columns';
import useGetTruckMilestones from '../hooks/useGetTruckMilestones';

import TrackerDetails from './TrackerDetails';

// import Map from './Map';
// import MilestoneDetail from './MilestoneData';

function TruckTracking({
	searchValue,
	setSearchValue,
	list,
	setPagination,
	showData,
	setshowData,
	sortType,
	setSortType,
	activeTab,
}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item });
	};

	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};
	const column = columns({
		handleShowModal,
	});

	return (
		<div>

			<Table columns={column} data={list || []} />
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header title={`Airway Bill NO. -
				${showUpdate?.data?.trip_id}`}
				/>

				<Modal.Body>

					<TrackerDetails id={showUpdate?.data?.trip_id} trackingType="surface" />

					<div />

				</Modal.Body>

			</Modal>
		</div>
	);
}

export default TruckTracking;
