import React, { useState } from 'react';

import ApplyLeave from '../../../common/ApplyLeave';
import useGetLeaveRequestListing from '../../../hooks/useGetLeaveRequestListing';

import DeleteLeave from './DeleteLeave';
import DesktopView from './DesktopView';
import MobileView from './MobileView';
import styles from './styles.module.css';

function LeaveRequestListing({ leaveData, refetchLeaves }) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedData, setSelectedData] = useState({});
	const { data, filters, setFilters } = useGetLeaveRequestListing();

	const onClose = () => {
		setOpenLeaveModal(false);
	};

	const refetchList = () => {
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
	};

	const handleOpenModal = (itemData) => {
		setSelectedData(itemData);
		setOpenLeaveModal(true);
	};

	const handleDeleteModal = (itemData) => {
		setSelectedData(itemData);
		setOpenDeleteModal(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<div className={styles.heading}>Leave requests</div>
				<div className={styles.sub_heading}>
					Status of all leaves applied
				</div>
			</div>
			<div className={styles.desktop_view}>
				<DesktopView
					dataArr={data}
					filters={filters}
					setFilters={setFilters}
					handleOpenModal={handleOpenModal}
					handleDeleteModal={handleDeleteModal}
				/>
			</div>
			<div className={styles.mobile_view}>
				<MobileView data={data} setFilters={setFilters} />
			</div>
			{openLeaveModal && (
				<ApplyLeave
					show={openLeaveModal}
					data={leaveData}
					onClose={onClose}
					selectedData={selectedData}
					refetchList={refetchList}
					setSelectedData={setSelectedData}
				/>
			)}
			{ openDeleteModal && (
				<DeleteLeave
					show={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					refetch={refetchLeaves}
					refetchList={refetchList}
					selectedData={selectedData}
				/>
			) }
		</div>
	);
}

export default LeaveRequestListing;
