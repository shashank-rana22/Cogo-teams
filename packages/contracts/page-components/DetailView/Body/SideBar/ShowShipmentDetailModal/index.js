import { Modal, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import Header from '../../../Loader/Header';
import styles from '../styles.module.css';

function ShipmentDataModal({
	shipmentDetailData = {},
	setShipmentDetailData = false,
	showShipmentDetialData = () => {},
	loading = false,
}) {
	const { data } = shipmentDetailData || {};
	const { shipment_plan_data } = data || [];

	const formatDateAccessor = (dateField) => (row) => {
		const dateValue = row?.[dateField];
		return formatDate({
			date       : dateValue,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		});
	};

	const columns = [
		{
			Header   : 'Start Date',
			accessor : formatDateAccessor('sailing_period_start_date'),
		},
		{
			Header   : 'End Date',
			accessor : formatDateAccessor('sailing_period_end_date'),
		},
		{ Header: 'Booking Count', accessor: 'booking_count' },
	];

	return (
		<Modal
			size="md"
			show={shipmentDetailData}
			onClose={() => setShipmentDetailData(!showShipmentDetialData)}
			placement="top"
		>
			<Modal.Header title="Shipment Plan Data" />
			{loading && <Header />}
			{!loading && (shipment_plan_data || []).map((value) => (
				<Modal.Body key={value?.id}>
					<div className={styles.heading}>{value?.trade_party_data?.display_name}</div>
					<Table columns={columns} data={value?.plan_details} />
				</Modal.Body>
			))}
		</Modal>
	);
}

export default ShipmentDataModal;
