import { Modal, Table, Button, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import { columns } from '../../../config/truck-tracking-columns';
import useGetSurfaceTrackingList from '../../../hooks/useGetSurfaceTrackingList';
import SearchFilters from '../../Filter/Search/search';

import styles from './styles.module.css';
import TrackingInfo from './TrackerDetails/TrackingInfo';

function TruckTracking() {
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
		refetch,
	} = useGetSurfaceTrackingList();
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item });
	};

	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};
	const column = columns({
		handleShowModal,
		filters,
		setFilters,
	});

	return (
		<div>
			<SearchFilters
				searchString={searchString}
				serialId={serialId}
				setSearchString={setSearchString}
				activeTab="truck_tracking"
				filters={filters}
				setFilters={setFilters}
				setSerialId={setSerialId}
			/>
			<ListPagination filters={filters} setFilters={setFilters} data={data} />
			{!loading && isEmpty(data?.list)
				? <EmptyState /> : null}

			{loading
				? <Loader className={styles.loader} />
				: null}
			{!loading
			&& !isEmpty(data?.list)
				? <Table columns={column} data={data?.list || []} loading={loading} className={styles.table} /> : null}
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header title="Add Tracking Details" />
				<Modal.Body>
					<TrackingInfo
						id={showUpdate?.data?.trip_id}
						trackingType="surface"
						refetch={refetch}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => handleCloseModal()}>Close</Button>
				</Modal.Footer>
			</Modal>
			<ListPagination filters={filters} setFilters={setFilters} data={data} />
		</div>
	);
}

export default TruckTracking;
