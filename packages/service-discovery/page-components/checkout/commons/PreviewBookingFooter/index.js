import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { useRef, useEffect } from 'react';

import useControlBookingApproval from '../../hooks/useControlBookingApproval';
import handleTimer from '../../utils/handleTimer';

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

function PreviewBookingFooter({
	detail = {},
	updateCheckout = () => {},
	updateLoading = false,
	isVeryRisky = false,
	checkoutMethod = '',
	disableButtonConditions = {},
	isControlBookingDetailsFilled = false,
}) {
	const timerRef = useRef(null);

	const {
		validity_end,
		checkout_approvals = [],
		importer_exporter_id,
		importer_exporter,
	} = detail;

	const { booking_status = '' } =		checkout_approvals[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { controlBookingApproval, loading } = useControlBookingApproval({
		checkout_approvals,
		importer_exporter_id,
		importer_exporter,
	});

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

	const handleSubmit = () => {
		if (checkoutMethod === 'controlled_checkout') {
			controlBookingApproval();
		}
	};

	const MAPPING = [
		{
			label     : 'Save For Later',
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
		},
		{
			label     : getButtonLabel({ checkoutMethod, booking_status }),
			themeType : 'primary',
			size      : 'lg',
			loading   : updateLoading || loading,
			disabled:
				isVeryRisky
				|| Object.values(disableButtonConditions).some((val) => val)
				|| !isControlBookingDetailsFilled,
			style   : { marginLeft: '16px' },
			key     : 'place_booking',
			onClick : () => handleSubmit(),
		},
	];

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
				{MAPPING.map((item) => {
					const { key, label, ...restProps } = item;

					if (hasExpired) {
						return null;
					}

					return (
						<Button key={key} {...restProps}>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default PreviewBookingFooter;
