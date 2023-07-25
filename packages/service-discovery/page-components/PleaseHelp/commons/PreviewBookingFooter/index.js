import { Button } from '@cogoport/components';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { useRef, useEffect } from 'react';

import handleTimer from '../../utils/handleTimer';

import styles from './styles.module.css';

const SECOND_TO_MILLISECOND = 1000;

function PreviewBookingFooter({
	detail = {},
	updateCheckout = () => {},
	updateLoading = false,
	isVeryRisky = false,
	agreeTandC = false,
	cargoDetails = {},
	additionalRemark = '',
}) {
	const timerRef = useRef(null);

	const {
		validity_end,
		id = '',
	} = detail;

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

	const MAPPING = [
		{
			label     : 'Save For Later',
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
		},
		{
			label     : 'Select Invoicing Parties',
			themeType : 'primary',
			size      : 'lg',
			loading   : updateLoading,
			disabled  : isVeryRisky || !agreeTandC,
			style     : { marginLeft: '16px' },
			key       : 'place_booking',
			onClick   : () => updateCheckout({ values: { id, state: 'booking_confirmation', margin_approval_request_remarks: additionalRemark ? [additionalRemark] : undefined, ...cargoDetails } }),
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
