import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useContext, useEffect, useRef, useState } from 'react';

import { CheckoutContext } from '../../../../../../../context';
import handleTimer from '../../../../../../../utils/handleTimer';

const SECOND_TO_MILLISECOND = 1000;

const useHandleBookingDetails = ({ setShowBreakup = () => {}, showBreakup = false }) => {
	const {
		detail = {},
		primaryService = {},
		rate = {},
		handleUnlockLatestRate = () => {},
		createSearchLoading = false,
	} = useContext(CheckoutContext);

	const timerRef = useRef({});

	const [showCouponCode, setShowCouponCode] = useState(false);

	const {
		validity_end,
		services = {},
		primary_service,
	} = detail;

	const {
		tax_total_price = 0,
		tax_total_price_discounted = 0,
		total_price_currency = '',
		promotions = {},
	} = rate;

	const { promocodes = [] } = promotions;

	const totalBeforeDiscount = tax_total_price;
	const totalPrice = tax_total_price_discounted;

	const discount = totalPrice - totalBeforeDiscount;

	const localedDiscount = formatAmount({
		amount   : discount,
		currency : total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
			minimumFractionDigits : 2,
		},
	});

	const { airline = {} } = primaryService;

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	const appliedPromotion = promocodes.find(
		(x) => x.consumption_mode === 'manual',
	);

	const [isCouponApplied, setCouponApplied] = useState(
		appliedPromotion?.id !== undefined,
	);

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

	const BUTTON_MAPPING = [
		{
			key   : 'coupon_code',
			id    : 'coupon_code',
			label : !discount ? 'Have a Coupon Code?' : (
				<div style={{ color: '#849e4c' }}>
					Coupon Applied:
					{' '}
					{localedDiscount}
				</div>
			),
			themeType : 'link',
			style     : {},
		},
		{
			key   : 'view_details',
			id    : 'view_details',
			label : showBreakup
				? 'Hide Details & Break Up'
				: 'View Details & Break Up',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			loading   : createSearchLoading,
		},
		{
			key       : 'latest_rate',
			id        : 'latest_rate',
			label     : 'Unlock Latest rate',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			loading   : createSearchLoading,
		},
	];

	const onClickButtonDiv = (event) => {
		const funcMapping = {
			coupon_code  : () => setShowCouponCode(true),
			view_details : () => setShowBreakup((prev) => !prev),
			latest_rate  : handleUnlockLatestRate,
		};

		const button = event.target.closest('BUTTON');

		if (button) {
			event.stopPropagation();
			event.preventDefault();

			funcMapping[button.getAttribute('id')]();
		}
	};

	return {
		airline,
		BUTTON_MAPPING,
		primary_service,
		primaryService,
		services,
		hasExpired,
		timerRef,
		showCouponCode,
		setShowCouponCode,
		isCouponApplied,
		setCouponApplied,
		appliedPromotion,
		onClickButtonDiv,
	};
};

export default useHandleBookingDetails;
