import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { getByKey } from '@cogoport/utils';
import { useContext } from 'react';

import { renderValue } from '../../../../commons/CargoDetails/RenderCargoPills/renderValue';

import serviceMapping from './mapping.json';
import styles from './styles.module.css';

function BookingRequirements({ showBookingReq = false, setShowBookingReq = () => {} }) {
	const { servicesList = [] } = useContext(ShipmentDetailContext);

	const main_service = servicesList?.find((s) => s?.main_service_id === null);

	const { booking_desk_details, multi_service_details, supply_details } = serviceMapping;

	const renderDetail = ({ obj, key }) => {
		const value = renderValue(key, main_service);

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
					<div>
						<div className={styles.heading}>Demand Side :</div>

						<div>
							<div className={styles.detail_container}>
								{multi_service_details?.map((obj) => (
									getByKey(main_service, obj.key)
										? renderDetail({
											obj,
											key: obj.key,
										}) : null))}

								{booking_desk_details?.map((obj) => (
									getByKey(main_service, obj.key)
										? renderDetail({
											obj,
											key: obj.key,
										}) : null))}
							</div>
						</div>

						<div>
							<hr />

							<div className={styles.heading}>Supply Side :</div>

							<div className={styles.detail_container}>
								{supply_details?.map((obj) => (
									getByKey(main_service, obj.key)
										? renderDetail({
											obj,
											key: obj.key,
										}) : null))}
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default BookingRequirements;
