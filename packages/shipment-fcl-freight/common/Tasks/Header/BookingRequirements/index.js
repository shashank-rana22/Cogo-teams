import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { getByKey } from '@cogoport/utils';
import { useContext } from 'react';

import { renderValue } from '../../../CargoDetails/RenderCargoPills/renderValue';

import serviceMapping from './mapping.json';
import styles from './styles.module.css';

function BookingRequirements({ showBookingReq = false, setShowBookingReq = () => {} }) {
	const { servicesList = [], primary_service = {}, bookingRequirements = {} } = useContext(ShipmentDetailContext);

	const main_service = {
		...servicesList?.find((s) => s?.main_service_id === null),
		...bookingRequirements,
	};

	const bookingDeskDetails = serviceMapping?.booking_desk_details;
	const multiServiceDetails = serviceMapping?.multi_service_details;
	const supplyDetails = serviceMapping?.supply_details;

	const renderDetail = ({ obj, key }) => {
		const value = renderValue(key, main_service, primary_service);
		return (
			<div className={styles.render_container}>
				<div className={styles.label}>{obj.label}</div>
				<div className={styles.value}>{value}</div>
			</div>
		);
	};

	return (
		<div>
			<Modal
				show={showBookingReq}
				onClose={() => setShowBookingReq(false)}
				placement="top"
				closeOnOuterClick={false}
				className={styles.modal_content}
			>
				<Modal.Header title="Booking Requirements" />

				<Modal.Body>
					<div className={styles.heading}>Demand Side :</div>

					<div className={styles.detail_container}>
						{multiServiceDetails?.map((obj) => (
							getByKey(main_service, obj.key)
								? renderDetail({
									obj,
									key: obj.key,
								}) : null))}

						{bookingDeskDetails?.map((obj) => (
							getByKey(main_service, obj.key)
								? renderDetail({
									obj,
									key: obj.key,
								}) : null))}
					</div>

					<hr />

					<div className={styles.heading}>Supply Side :</div>

					<div className={styles.detail_container}>
						{supplyDetails?.map((obj) => {
							if (obj.key === 'remarks') {
								return getByKey(primary_service, 'booking_preferences')
									? renderDetail({
										obj,
										key: obj.key,
									}) : null;
							}

							return getByKey(main_service, obj.key)
								? renderDetail({
									obj,
									key: obj.key,
								}) : null;
						})}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default BookingRequirements;
