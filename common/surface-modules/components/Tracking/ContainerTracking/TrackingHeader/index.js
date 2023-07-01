import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import FtlTracker from './ftlTracker';
import styles from './styles.module.css';

const SELECTED_TRUCK_DATA = GLOBAL_CONSTANTS.zeroth_index;

function TrackingHeader({
	trackingLoading,
	setContainerNo = () => {},
	containerNo = '',
	truckOptions = [],
	serialId,
	data,
	refetch = () => {},
	listShipments = () => {},
	ftlServices,
}) {
	const servicesData = (ftlServices || []).filter(
		(item) => item?.truck_number === containerNo,
	);

	useEffect(() => {
		listShipments();
	}, [listShipments, containerNo]);

	return (
		<div className={styles.Container}>
			<div className={styles.RowContainer}>
				<div className={styles.Text}>Tracking Information</div>
				<Select
					size="sm"
					style={{ width: '200px' }}
					placeholder="Truck No"
					value={containerNo}
					onChange={(e) => setContainerNo(e)}
					options={truckOptions || []}
				/>
			</div>

			<div className={styles.SecondRow}>

				{!data?.is_trip_completed && (
					<FtlTracker
						trackingLoading={trackingLoading}
						serialId={serialId}
						data={data}
						servicesData={servicesData?.[SELECTED_TRUCK_DATA] || {}}
						listShipments={listShipments}
						refetch={refetch}
					/>
				)}
			</div>
		</div>
	);
}

export default TrackingHeader;
