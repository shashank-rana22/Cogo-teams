import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ControlledBookingDetails from './components/ControlledBookingDetails';
import styles from './styles.module.css';

function ControlledBooking({
	detail,
	getCheckout,
}) {
	const { services, checkout_approvals = [] } = detail;

	const {
		booking_status: bookingStatus,
		explanation = '',
		explanation_checks = '',
	} = checkout_approvals[0] || {};

	const [showForm, setShowForm] = useState(false);

	const servicesApplicable = Object.values(services).filter(
		(service) => (
			service.service_type === 'fcl_freight'
				&& service.container_type === 'refer'
		),
	);

	return (
		<div className={styles.container}>
			{bookingStatus !== 'pending' ? (
				<div className={`${styles.status} ${styles[bookingStatus]}`}>{startCase(bookingStatus)}</div>
			) : null}

			<div className={styles.heading}>
				<div className={styles.title}>Controlled Booking Details </div>

				{!['pending_approval', 'rejected'].includes(bookingStatus) ? (
					<IcMEdit
						style={{ cursor: 'pointer' }}
						onClick={() => setShowForm((pv) => !pv)}
					/>
				) : null}
			</div>

			{bookingStatus !== 'rejected' ? (
				<ControlledBookingDetails
					checkout_approvals={checkout_approvals}
					bookingStatus={bookingStatus}
					setShowForm={setShowForm}
					showForm={showForm}
					refetchCheckout={getCheckout}
					servicesControlledBooking={servicesApplicable}
				/>
			) : null}

			{bookingStatus === 'rejected' ? (
				<div>
					<div className={styles.rejection_check}>
						<b> Rejection Category:</b>
						{explanation_checks.map((item) => (
							<div key={item} style={{ marginLeft: 8 }}>
								{startCase(item)}
							</div>
						))}
					</div>

					<div>
						<b>Rejection Reason:</b>
						{' '}
						{explanation}
					</div>
				</div>
			) : null}

			<div className={styles.text}>
				Note* -
				{' '}
				<i>
					An advance payment may be required for this booking. Booking Note will
					be handed over only after payment status is confirmed in case an
					advance payment is needed. Payment amount and details can be viewed on
					the shipments page after this booking is accepted.
				</i>
			</div>
		</div>
	);
}

export default ControlledBooking;
