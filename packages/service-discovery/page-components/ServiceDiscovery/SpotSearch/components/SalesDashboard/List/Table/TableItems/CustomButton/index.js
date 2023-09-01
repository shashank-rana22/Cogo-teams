import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

function CustomButton({ item = {}, field = {}, router = {} }) {
	const { query = {} } = router;

	const isNewS2C = item?.tags?.[GLOBAL_CONSTANTS.zeroth_index]?.includes('version2');

	const searchUrl = `/book/${item?.latest_spot_search_id || item?.id}${isNewS2C
		? '' : `/${item?.importer_exporter_id}`}`;
	const shipmentsUrl = `/shipments/${item?.shipment_id}`;
	const checkoutUrl = `/checkout/${item?.checkout_id}`;

	const URL_MAPPING = {
		most_searched   : searchUrl,
		most_booked     : searchUrl,
		spot_search     : searchUrl,
		quotations      : item?.shipment_id ? shipmentsUrl : checkoutUrl,
		saved_for_later : item?.shipment_id ? shipmentsUrl : checkoutUrl,
	};

	const BUTTON_LABEL_MAPPING = {
		most_searched   : field?.btnLabel,
		most_booked     : field?.btnLabel,
		spot_search     : field?.btnLabel,
		quotations      : item?.shipment_id ? 'See Booking' : 'View Quote',
		saved_for_later : item?.shipment_id ? 'See Booking' : 'View Quote',
	};

	const onClick = (relativeUrl) => {
		if (field.inDifferentWindow) {
			const url = `/${query.partner_id}${relativeUrl}`;
			const redirectToNewS2c = isNewS2C && !item?.shipment_id;
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
						amount   : item?.total_price || GLOBAL_CONSTANTS.zeroth_index,
						currency : item?.total_price_currency,
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
}

export default CustomButton;
