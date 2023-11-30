import { Modal, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
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
			<Modal.Body>
				{loading && <Header />}
				{!loading && isEmpty(shipment_plan_data) && (
					<div className={styles.empty_state}>
						<Image src={GLOBAL_CONSTANTS.image_url.empty_state} width={293} height={192} />
						<span>No Shipment Plans Found!</span>
					</div>
				)}
				{!loading && !isEmpty(shipment_plan_data) && (shipment_plan_data || []).map((value) => (
					<div className={styles.plan_card} key={value?.id}>
						<div className={styles.heading}>{value?.trade_party_data?.business_name}</div>
						<Table columns={columns} data={value?.plan_details} />
					</div>
				))}
			</Modal.Body>
		</Modal>
	);
}

export default ShipmentDataModal;
