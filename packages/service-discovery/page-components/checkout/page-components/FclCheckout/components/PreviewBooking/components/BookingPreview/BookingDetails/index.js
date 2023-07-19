import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMLock } from '@cogoport/icons-react';
import { useContext, useRef, useEffect } from 'react';

import ContainerDetails from '../../../../../../../../../common/ContainerDetails';
import LocationDetails from '../../../../../../../../../common/LocationDetails';
import { CheckoutContext } from '../../../../../../../context';
import handleTimer from '../../../../../../../utils/handleTimer';

import ShippingLineDetails from './ShippingLineDetails';
import styles from './styles.module.css';

const SECOND_TO_MILLISECOND = 1000;

function BookingDetails({ setShowBreakup = () => {}, showBreakup = false }) {
	const {
		detail = {},
		rate = {},
	} = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const { validity_end, services = {}, primary_service } = detail;

	const mainServiceObject = Object.values(services).find((item) => item.service_type	=== primary_service);

	const { shipping_line = {} } = mainServiceObject || {};

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

	const { tax_total_price_discounted = 0, tax_total_price_currency = '' } = rate;

	const handleShowDetails = () => {
		setShowBreakup((prev) => !prev);
	};

	const BUTTON_MAPPING = [
		{
			key       : 'coupon_code',
			label     : 'Have a Coupon Code?',
			themeType : 'link',
			style     : {},
			onClick   : () => {},
		},
		{
			key       : 'view_details',
			label     : showBreakup ? 'Hide Details & Break Up' : 'View Details & Break Up',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			onClick   : handleShowDetails,
		},
		{
			key       : 'latest_rate',
			label     : 'Unlock Latest rate',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			onClick   : () => {},
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.main_content}>
				<ShippingLineDetails shipping_line={shipping_line} />

				<LocationDetails data={mainServiceObject} />

				<ContainerDetails primary_service={primary_service} services={services} />

				<div className={styles.total_price}>
					<IcMLock style={{ marginRight: '6px' }} />

					{formatAmount({
						amount   : tax_total_price_discounted,
						currency : tax_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			</div>

			<div className={styles.bottom_container}>
				<div className={styles.bottom_content}>
					<div className={styles.quotation_expiry}>
						Quotation Expiry:
						{' '}
						<div className={styles.validity_time}>
							<span
								id="timer"
								className={hasExpired ? styles.hidden : ''}
								ref={timerRef}
							/>
							<span style={{ fontWeight: 400, marginLeft: '4px' }}>
								{hasExpired
									? 'This Quotation has expired'
									: ''}
							</span>
						</div>
					</div>

					<div className={styles.button_container}>
						{BUTTON_MAPPING.map((item) => {
							const { key, label, ...restProps } = item || {};

							return (
								<Button
									key={key}
									type="button"
									{...restProps}
								>
									{label}
								</Button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookingDetails;
