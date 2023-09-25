import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { useContext, useEffect, useRef, useState } from 'react';

import getPrefillForm from '../../../../../../../../SearchResults/utils/getPrefillForm';
import useCreateSearch from '../../../../../../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';
import { CheckoutContext } from '../../../../../../../context';
import handleTimer from '../../../../../../../utils/handleTimer';

const SECOND_TO_MILLISECOND = 1000;

const useHandleBookingDetails = ({ setShowBreakup = () => {}, showBreakup = false }) => {
	const router = useRouter();

	const {
		detail = {},
		primaryService = {},
		rate = {},
	} = useContext(CheckoutContext);

	const timerRef = useRef({});

	const [showCouponCode, setShowCouponCode] = useState(false);

	const {
		validity_end,
		services = {},
		primary_service,
		importer_exporter_id = '',
		importer_exporter_branch_id = '',
		user = {},
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

	const { createSearch, loading } = useCreateSearch();

	const { destination_port = {}, origin_port = {}, shipping_line = {} } = primaryService;

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

	const handleUnlockLatestRate = async () => {
		const formValues = getPrefillForm(
			{
				...detail,
				service_details : services,
				services        : undefined,
			},
			'primary_service',
		);

		const values = {
			organization_branch_id : importer_exporter_branch_id,
			organization_id        : importer_exporter_id,
			service_type           : primary_service,
			user_id                : user.id,
			origin                 : origin_port,
			destination            : destination_port,
			formValues,
		};

		const spot_search_id = await createSearch({ action: 'edit', values });

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	const BUTTON_MAPPING = [
		{
			key   : 'coupon_code',
			id    : 'coupon_code',
			label : !discount ? 'Have a Coupon Code?' : (
				<div style={{ color: '#849e4c' }}>
					Coupon Applied -
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
			loading,
		},
		{
			key       : 'latest_rate',
			id        : 'latest_rate',
			label     : 'Unlock Latest rate',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			loading,
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
		shipping_line,
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
