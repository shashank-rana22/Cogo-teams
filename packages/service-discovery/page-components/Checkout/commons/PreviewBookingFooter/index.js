import { Button } from '@cogoport/components';
import { IcCWaitForTimeSlots, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { useRef, useEffect, useContext } from 'react';

import { CheckoutContext } from '../../context';
import handleTimer from '../../utils/handleTimer';

import styles from './styles.module.css';
import TotalCost from './TotalCost';

const SECOND_TO_MILLISECOND = 1000;

function SubmitButton({ rate = {}, disabled = false }) {
	return (
		<div className={styles.flex}>
			Select Invoicing Parties

			<TotalCost rate={rate} disabled={disabled} />

			<IcMArrowDoubleRight width={14} height={14} />
		</div>
	);
}

function PreviewBookingFooter({
	updateLoading = false,
	isVeryRisky = false,
	agreeTandC = false,
	noRatesPresent = false,
	updateCheckoutServiceLoading = false,
	onClickNextButton = () => {},
	onClickSaveForLater = () => {},
}) {
	const { detail = {}, rate } = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const { validity_end } = detail;

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	const disableButton = isVeryRisky || !agreeTandC || noRatesPresent;

	const MAPPING = [
		{
			label     : 'Save For Later',
			themeType : 'secondary',
			size      : 'lg',
			key       : 'save_for_later',
			onClick   : onClickSaveForLater,
			loading   : updateLoading,
			disabled  : updateCheckoutServiceLoading,
		},
		{
			label     : <SubmitButton rate={rate} disabled={isVeryRisky || !agreeTandC || disableButton} />,
			themeType : 'accent',
			size      : 'lg',
			loading   : updateLoading || updateCheckoutServiceLoading,
			disabled  : isVeryRisky || !agreeTandC || disableButton,
			style     : { marginLeft: '16px' },
			key       : 'place_booking',
			onClick   : onClickNextButton,
		},
	];

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
		<div className={styles.container} id="proceed_button">
			{noRatesPresent ? (
				<div className={styles.error}>
					Please remove services with no rates
				</div>
			) : null}

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
