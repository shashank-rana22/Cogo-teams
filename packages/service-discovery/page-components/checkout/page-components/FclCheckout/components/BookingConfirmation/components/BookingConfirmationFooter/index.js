import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { useRef, useEffect } from 'react';

import useBookShipment from '../../../../../../hooks/useBookShipment';
import useControlBookingApproval from '../../../../../../hooks/useControlBookingApproval';
import handleTimer from '../../../../../../utils/handleTimer';

import styles from './styles.module.css';

const SECOND_TO_MILLISECOND = 1000;

const getButtonLabel = ({ checkoutMethod, booking_status }) => {
	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'pending_approval'
	) {
		return 'Sent For Approval, Please wait...';
	}

	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'rejected'
	) {
		return 'This Booking has been Rejected';
	}

	if (checkoutMethod === 'controlled_checkout') {
		return 'Send for Approval';
	}

	return 'Place Booking';
};

const getDisabledCondition = ({
	checkoutMethod,
	booking_status,
	manager_approval_proof,
	isControlBookingDetailsFilled,
}) => {
	if (checkoutMethod === 'controlled_checkout') {
		return ['pending_approval', 'rejected'].includes(booking_status)
			|| !manager_approval_proof
			|| !isControlBookingDetailsFilled;
	}

	return false;
};

function BookingConfirmationFooter({
	detail = {},
	checkoutMethod = '',
	isControlBookingDetailsFilled = false,
}) {
	const timerRef = useRef(null);

	const {
		validity_end,
		checkout_approvals = [],
		importer_exporter_id,
		importer_exporter,
		id,
	} = detail;

	const {
		booking_status = '',
		manager_approval_proof = '',
	} = checkout_approvals[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { controlBookingApproval, loading } = useControlBookingApproval({
		checkout_approvals,
		importer_exporter_id,
		importer_exporter,
	});

	const {
		bookShipment,
		loading:bookCheckoutLoading,
	} = useBookShipment({ checkout_id: id });

	const handleSubmit = () => {
		if (checkoutMethod === 'controlled_checkout') {
			controlBookingApproval();
			return;
		}

		bookShipment();
	};

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	useEffect(() => {
		let time;

		if (!hasExpired) {
			const interval = setInterval(() => {
				time = handleTimer(validity_end);

				if (time) {
					timerRef.current.innerText = time;
				}
			}, SECOND_TO_MILLISECOND);

			if (!validity_end) {
				return () => clearInterval(interval);
			}
			return () => clearInterval(interval);
		}
		return () => {};
	}, [hasExpired, validity_end]);

	return (
		<div className={styles.container}>
			<div className={styles.validity_time}>
				{!hasExpired ? (
					<div className={styles.flex}>
						<IcCWaitForTimeSlots
							height={24}
							width={24}
							style={{ marginRight: '8px' }}
						/>
						Expires in
					</div>
				) : null}

				<span
					id="timer"
					className={hasExpired ? styles.hidden : styles.visible}
					ref={timerRef}
				/>

				<span style={{ fontWeight: 400, marginLeft: '4px', color: '#eb3425' }}>
					{hasExpired ? 'This Quotation has expired' : ''}
				</span>
			</div>

			<div className={styles.button_container}>
				{!hasExpired ? (
					<Button
						type="button"
						size="lg"
						onClick={handleSubmit}
						loading={loading || bookCheckoutLoading}
						disabled={getDisabledCondition({
							checkoutMethod,
							booking_status,
							manager_approval_proof,
							isControlBookingDetailsFilled,
						})}
					>
						{getButtonLabel({ checkoutMethod, booking_status })}
					</Button>
				) : null}
			</div>
		</div>
	);
}

export default BookingConfirmationFooter;
