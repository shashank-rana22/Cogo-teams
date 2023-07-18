import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

const renderButton = (itemData, field, router) => {
	const { query } = router;

	const searchUrl = `/book/${itemData?.id}/${itemData?.importer_exporter_id}`;
	const shipmentsUrl = `/shipments/${itemData?.shipment_id}`;
	const checkoutUrl = `/checkout/${itemData?.checkout_id}`;

	const URL_MAPPING = {
		spot_search : searchUrl,
		quotations  : itemData?.shipment_id ? shipmentsUrl : checkoutUrl,
	};

	const BUTTON_LABEL_MAPPING = {
		spot_search : field?.btnLabel,
		quotations  : itemData?.shipment_id ? 'See Booking' : 'View Quote',
	};

	const onClick = (relativeUrl) => {
		if (field.inDifferentWindow) {
			const url = `/v2/${query.partner_id}${relativeUrl}`;
			return window.open(url, '_blank');
		}
		return router.push(relativeUrl);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: 'max-content', alignItems: 'center' }}>
			<Button
				size="md"
				themeType="primary"
				onClick={() => onClick(URL_MAPPING[field.key])}
			>
				<span>
					{BUTTON_LABEL_MAPPING[field.key] || 'Show Rates'}
				</span>
			</Button>
			{field.showPrice ? (
				<span style={{ fontSize: 12, fontWeight: 500 }}>
					{formatAmount({
						amount   : itemData.total_price || 0,
						currency : itemData.total_price_currency,
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
