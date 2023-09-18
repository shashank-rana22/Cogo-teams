import { Input, Modal, Table, Pagination } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

// import useGetTruckMilestones from '../../../hooks/useGetTruckMilestones';
import { columns } from '../configurations/truck-tracking-columns';

// import Map from './Map';
// import MilestoneDetail from './MilestoneData';

function TruckTracking({
	searchValue,
	setSearchValue,
	data,
	loading,
	list,
	setPagination,
	showData,
	setshowData,
	sortType,
	setSortType,
	activeTab,
}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	// const {
	// 	milestoneData = {},
	// 	loading: milestoneLoading,
	// 	getMilestones,
	// } = useGetTruckMilestones();

	// const handleShowModal = (item) => {
	// 	getMilestones({ trip_id: item?.trip_id });
	// 	setShowUpdate({ show: true, data: item });
	// };

	const column = columns({
		// handleShowModal,
		// showData,
		// setshowData,
		// sortType,
		// setSortType,
		// activeTab,
	});

	const handleSearch = (e) => {
		setSearchValue(e?.target?.value);
		setPagination(1);
	};

	return (
		<div>

			<Table columns={column} data={list || []} loading={loading} />

		</div>
	);
}

export default TruckTracking;
