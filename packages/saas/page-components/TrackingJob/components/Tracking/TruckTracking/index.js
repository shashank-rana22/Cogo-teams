import { Modal, Table, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import getColumns from '../../../config/truck-tracking-columns';
import useListSaasSurfaceShipmentDetails from '../../../hooks/useListSaasSurfaceShipmentDetails';
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
	} = useListSaasSurfaceShipmentDetails();

	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item });
	};

	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};

	const columns = useMemo(() => getColumns({
		handleShowModal,
		filters,
		setFilters,
	}), [filters, setFilters]);

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

			<Table columns={columns} data={data?.list || []} loading={loading} className={styles.table} />

			{!loading && isEmpty(data?.list)
				? <EmptyState /> : null}

			<ListPagination filters={filters} setFilters={setFilters} data={data} />

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

		</div>
	);
}

export default TruckTracking;
