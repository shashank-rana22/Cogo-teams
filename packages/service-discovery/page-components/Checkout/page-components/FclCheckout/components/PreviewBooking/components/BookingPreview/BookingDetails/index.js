import { Button, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMUnlock, IcMLock } from '@cogoport/icons-react';
import { useContext } from 'react';

import ContainerDetails from '../../../../../../../../../common/ContainerDetails';
import LocationDetails from '../../../../../../../../../common/LocationDetails';
import PromocodesModal from '../../../../../../../commons/Promocodes/components/PromocodesModal';
import { CheckoutContext } from '../../../../../../../context';

import ShippingLineDetails from './ShippingLineDetails';
import styles from './styles.module.css';
import useHandleBookingDetails from './useHandleBookingDetails';

function BookingDetails({ setShowBreakup = () => {}, showBreakup = false }) {
	const {
		rate = {},
		checkout_id = '',
		getCheckout = () => {},
		detail = {},
	} = useContext(CheckoutContext);

	const { tax_total_price_discounted = 0, tax_total_price_currency = '' } = rate;

	const { quotation_email_sent_at = '' } = detail;

	const {
		shipping_line = {},
		BUTTON_MAPPING = [],
		primary_service = {},
		mainServiceObject = {},
		services = {},
		hasExpired = false,
		timerRef,
		showCouponCode = false,
		setShowCouponCode = () => {},
		isCouponApplied = false,
		setCouponApplied = () => {},
		appliedPromotion = {},
		onClickButtonDiv,
	} = useHandleBookingDetails({ setShowBreakup, showBreakup });

	return (
		<div className={styles.container}>
			<div className={styles.main_content}>
				<ShippingLineDetails shipping_line={shipping_line} />

				<LocationDetails data={mainServiceObject} />

				<ContainerDetails
					primary_service={primary_service}
					services={services}
				/>

				<div className={cl`${styles.total_price} ${quotation_email_sent_at && styles.locked}`}>
					{quotation_email_sent_at ? (
						<IcMLock style={{ marginRight: '6px' }} />
					) : <IcMUnlock style={{ marginRight: '6px' }} />}

					{formatAmount({
						amount   : tax_total_price_discounted,
						currency : tax_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
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
								{hasExpired ? 'This Quotation has expired' : ''}
							</span>
						</div>
					</div>

					<PromocodesModal
						checkout_id={checkout_id}
						setShowCoupons={setShowCouponCode}
						setCouponApplied={setCouponApplied}
						refetch={getCheckout}
						appliedPromotion={appliedPromotion}
						isCouponApplied={isCouponApplied}
						showCoupons={showCouponCode}
					/>

					<div
						role="presentation"
						onClick={onClickButtonDiv}
						className={styles.button_container}
					>
						{BUTTON_MAPPING.map((item) => {
							const { key, label, ...restProps } = item || {};

							return (
								<Button key={key} type="button" {...restProps}>
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
