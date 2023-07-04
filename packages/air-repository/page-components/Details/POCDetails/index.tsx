import { Loader, Button, Modal } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

// import { HawbFields } from '../../configurations/hawb_fields';
// import useGetHawbList from '../../hooks/useGetHawbList';
// import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

// import HawbListItem from './HawbListItem';
import styles from './styles.module.css';

function POCDetails({ data }) {
	// const { fields } = HawbFields;

	console.log('data', data);

	const { e_booking_availability: eBooking } = data || {};

	return (
		<div className={styles.poc_detail_container}>
			<div className={styles.poc_list}>
				<div className={styles.basic_info}>
					<div className={styles.basic_info_heading}>
						E-Booking
						<span>:</span>
					</div>

					{eBooking === 'available' ? 'Yes' : 'No'}
				</div>
				{/* <header className={styles.header}>
						{fields.map((field) => (
							<div
								className={styles.col}
								style={{ '--span': field.span || 1 } as React.CSSProperties}
							>
								{ field.label }
							</div>
						))}
					</header>
					{(hawbData?.data?.shipmentPendingTasks || []).map((item) => (
						<HawbListItem
							item={item}
							fields={fields}
							loading={loading}
							functions={functions}
						/>
					))} */}

			</div>
		</div>
	);
}

export default POCDetails;
