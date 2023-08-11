import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

const renderButton = (itemData, field, router) => {
	const { query = {} } = router;

	const isNewS2C = itemData?.tags?.[GLOBAL_CONSTANTS.zeroth_index]?.includes('new_admin');

	const searchUrl = `/book/${itemData?.latest_spot_search_id || itemData?.id}${isNewS2C
		? '' : `/${itemData?.importer_exporter_id}`}`;
	const shipmentsUrl = `/shipments/${itemData?.shipment_id}`;
	const checkoutUrl = `/checkout/${itemData?.checkout_id}`;

	const URL_MAPPING = {
		most_searched   : searchUrl,
		most_booked     : searchUrl,
		spot_search     : searchUrl,
		quotations      : itemData?.shipment_id ? shipmentsUrl : checkoutUrl,
		saved_for_later : itemData?.shipment_id ? shipmentsUrl : checkoutUrl,
	};

	const BUTTON_LABEL_MAPPING = {
		most_searched   : field?.btnLabel,
		most_booked     : field?.btnLabel,
		spot_search     : field?.btnLabel,
		quotations      : itemData?.shipment_id ? 'See Booking' : 'View Quote',
		saved_for_later : itemData?.shipment_id ? 'See Booking' : 'View Quote',
	};

	const onClick = (relativeUrl) => {
		if (field.inDifferentWindow) {
			const url = `/${query.partner_id}${relativeUrl}`;
			const redirectToNewS2c = isNewS2C && !itemData?.shipment_id;
			const finalUrl = redirectToNewS2c ? `/v2${url}` : url;

			return window.open(finalUrl, '_blank');
		}
		return router.push(relativeUrl);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: 'max-content', alignItems: 'center' }}>
			<Button
				size="md"
				themeType="primary"
				onClick={() => onClick(URL_MAPPING[field.key])}
				disabled={field.disabled}
			>
				<span>
					{BUTTON_LABEL_MAPPING[field.key] || 'Show Rates'}
				</span>
			</Button>

			{field.showPrice ? (
				<span style={{ fontSize: 12, fontWeight: 500 }}>
					{formatAmount({
						amount   : itemData?.total_price || GLOBAL_CONSTANTS.zeroth_index,
						currency : itemData?.total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</span>
			) : null}
		</div>
	);
};

export default renderButton;
